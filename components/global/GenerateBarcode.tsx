"use client";

import type { GenerateBarcodePropsType } from "@/types";

import Image from "next/image";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { useReactToPrint } from "react-to-print";
import { Barcode, RefreshCcw } from "lucide-react";
import { barcodeTypeOptions } from "@/config";
import { generateBarcode } from "@/lib";
import { Button } from "@/components/ui/button";
import { FormSelect } from "./FormSelect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const GenerateBarcode: FC<GenerateBarcodePropsType> = ({
  isEdit,
  barcodeType,
  setBarcodeType,
  barcodeValue,
  setBarcodeValue,
}) => {
  const [barcodeImage, setBarcodeImage] = useState<string>("");

  const printRef = useRef<HTMLDivElement>(null);

  const generateBarcodeImage = (value: string): string => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, value, { format: barcodeType.value });
    return canvas.toDataURL("image/png");
  };

  const handleGenerateBarcode = (): void => {
    const newBarcodeValue = generateBarcode(barcodeType.value);
    setBarcodeValue(newBarcodeValue);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    if (barcodeValue) {
      setBarcodeImage(generateBarcodeImage(barcodeValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodeValue, barcodeType.value]);

  const getNewBarcode = useCallback(() => {
    handleGenerateBarcode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodeType.value]);

  useEffect(() => {
    getNewBarcode();
  }, [getNewBarcode]);

  return (
    <>
      <FormSelect
        label="Barcode Symbology"
        value={barcodeType}
        setValue={setBarcodeType}
        options={barcodeTypeOptions}
        isEdit={isEdit}
      />

      <div className="mt-4 w-full flex items-center gap-2 flex-nowrap">
        <input
          type="text"
          value={barcodeValue}
          placeholder="Generated Barcode"
          readOnly
          className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleGenerateBarcode}
          disabled={isEdit}
          className="w-10 h-10 p-2"
        >
          <RefreshCcw className="w-4 h-4" />
        </Button>

        {barcodeValue && (
          <Dialog>
            <DialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className="border rounded-md w-9 h-9 p-2"
                  >
                    <Barcode className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show Barcode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generated Barcode</DialogTitle>
                <DialogDescription>
                  Below shown is the barcode preview, you can go ahead and print
                  it.
                </DialogDescription>
              </DialogHeader>
              <div className="barcode-preview">
                <Image
                  src={barcodeImage}
                  alt="barcode_image"
                  width="300"
                  height="200"
                  className="mx-auto w-auto h-auto"
                />
              </div>

              <div ref={printRef} className="barcode-container">
                {[...Array(24)].map((_, index) => (
                  <div key={index} className="barcode-wrapper">
                    <Image
                      src={barcodeImage}
                      alt="barcode_image"
                      width="300"
                      height="200"
                      className="mx-auto w-auto h-auto"
                    />
                  </div>
                ))}
              </div>

              <style jsx>{`
                .barcode-container {
                  display: none;
                }

                @media print {
                  .barcode-container {
                    display: flex;
                    flex-wrap: wrap;
                  }
                  .barcode-wrapper {
                    flex: 1 0 33%;
                    text-align: center;
                    margin-bottom: 10px;
                  }
                }
              `}</style>

              <DialogFooter>
                <Button type="button" size="sm" onClick={handlePrint}>
                  Print Barcode
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};
