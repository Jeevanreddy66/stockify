"use client";

import type { CategoryDataType } from "@/types";

import Link from "next/link";
import { ChangeEvent, FC, useState } from "react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import {
  Check,
  FileDown,
  FileSpreadsheet,
  Loader,
  UploadCloud,
  X,
} from "lucide-react";
import { createBulkCategories } from "@/actions";
import { formatSize, generateSlug } from "@/lib";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ImportModal: FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<string>("");
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setUploadedFile(e.target.files ? e.target.files[0] : null);

  const deleteUploadedFile = (): void => {
    setUploadedFile(null);
    setJsonData("");
  };

  const previewData = (): void => {
    if (uploadedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;

        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });

          // SheetName
          const sheetName = workbook.SheetNames[0];

          // WorkSheet
          const workSheet = workbook.Sheets[sheetName];

          // JSON Data
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(uploadedFile);
      setIsPreview(true);
    }
  };

  const submitData = (): void => {
    if (uploadedFile) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = e.target?.result;

        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });

          // SheetName
          const sheetName = workbook.SheetNames[0];

          // WorkSheet
          const workSheet = workbook.Sheets[sheetName];

          // JSON Data
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));

          const categories: CategoryDataType[] = json.map(
            ({
              Image = "",
              Title,
              Description = "",
              Status = "ACTIVE",
            }: any) => {
              return {
                title: Title,
                slug: generateSlug(Title),
                description: Description,
                status: Status,
                imageUrl: Image,
              };
            }
          );

          try {
            setLoading(true);
            await createBulkCategories(categories);
            setIsUploadComplete(true);
            toast.success("Created Categories Successfully!🔥");
            setLoading(false);
          } catch (error: any) {
            console.log(`Error : ${error.message}`);
            setIsUploadComplete(false);
            toast.error("Something went wrong, Please try again!🙁");
            setLoading(false);
          }
        }
      };
      reader.readAsBinaryString(uploadedFile);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsUploadComplete(false)}
          className="flex items-center gap-1"
        >
          <FileDown className="w-4 h-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Import
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excel Upload</DialogTitle>
          <DialogDescription className="text-xs">
            You can bring all your data from excel, Please download the sample
            file first to make sure you have required data columns.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="w-full h-56 flex items-center justify-center gap-3 border rounded">
            <Loader className="w-4 h-4 mr-1 animate-spin" /> Saving Data, Please
            wait...
          </div>
        ) : (
          <>
            {isUploadComplete ? (
              <div className="w-full h-56 flex flex-col items-center justify-center gap-3 border rounded">
                <div className="flex items-center justify-center p-4 bg-green-100 rounded-full shadow-md">
                  <Check className="w-7 h-7 text-green-600" />
                </div>
                <p className="text-xs font-light text-gray-500">
                  Data Synced Successfully. You can close the window now.
                </p>

                <DialogClose asChild>
                  <Button size="sm">Close</Button>
                </DialogClose>
              </div>
            ) : (
              <>
                {isPreview && jsonData ? (
                  <ScrollArea className="h-64 w-full p-2 text-sm rounded-md border">
                    <pre>{jsonData}</pre>
                  </ScrollArea>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full"
                    >
                      <Link href="/categories.xlsx" download>
                        Download Sample Data
                      </Link>
                    </Button>

                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-20 md:h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex md:flex-col gap-2 items-center justify-center py-3 text-gray-500">
                          <UploadCloud className="w-7 h-7" />
                          <p className="text-sm dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            <span className="hidden md:inline">
                              or drag and drop
                            </span>
                          </p>
                          <p className="text-xs dark:text-gray-400">
                            Only Excel Files (.xlsx)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          accept=".xls,.xlsx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {uploadedFile && (
                      <div className="bg-slate-200 dark:bg-slate-800 shadow-md rounded-md px-4 py-2 flex items-center gap-3">
                        <div className="flex items-center justify-center p-2 rounded-full bg-slate-400 dark:bg-slate-600">
                          <FileSpreadsheet className="w-4 h-4" />
                        </div>

                        <div className="flex flex-col gap-0.5 text-xs font-light">
                          <span>{uploadedFile.name}</span>
                          <span>{formatSize(uploadedFile.size)}</span>
                        </div>

                        <button
                          onClick={deleteUploadedFile}
                          className="ml-auto rounded-full cursor-pointer"
                        >
                          <X className="w-5 h-5 hover:text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!loading && !isUploadComplete && (
          <div className="w-full flex flex-col md:flex-row items-center justify-end gap-4">
            {isPreview ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(false)}
                disabled={loading}
              >
                Close Preview
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={previewData}
                disabled={!uploadedFile}
                className="w-full md:w-fit"
              >
                Preview
              </Button>
            )}
            <Button
              size="sm"
              onClick={submitData}
              disabled={!uploadedFile}
              className="w-full md:w-fit"
            >
              Submit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
