"use client";

import type { SelectValue } from "react-tailwindcss-select/dist/components/type";
import type {
  AddCategoryFormType,
  AddCategoryPropsType,
  SelectOptionsType,
} from "@/types";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import placeholderImage from "@/public/placeholder.svg";
import { generateSlug } from "@/lib";
import { createCategory, updateCategoryById } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload, TextArea, TextInput } from "@/components/global";
import { FormHeader } from "./FormHeader";

export const AddCategory: FC<AddCategoryPropsType> = ({
  isEdit,
  initialData,
}) => {
  const options: SelectOptionsType[] = [
    { value: "ACTIVE", label: "Active" },
    { value: "ARCHIVED", label: "Archived" },
    { value: "BLOCKED", label: "Blocked" },
    { value: "FEATURED", label: "Featured" },
    { value: "INACTIVE", label: "In-Active" },
  ];

  const [formData, setFormData] = useState<AddCategoryFormType>({
    title: "",
    description: "",
  });
  const [statusValue, setStatusValue] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryFormType>({
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);

    initialData &&
      setFormData({
        title: initialData.title,
        description: initialData.description!,
      });

    setStatusValue(() => {
      return initialData
        ? {
            value: initialData.status,
            label:
              initialData.status.charAt(0).toUpperCase() +
              initialData.status.slice(1).toLowerCase(),
          }
        : null;
    });
    setImageUrl(() => {
      return initialData?.imageUrl || placeholderImage;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, reset]);

  const handleBack = (): void => router.back();

  const handleStatusChange = (value: SelectValue): void =>
    setStatusValue(value);

  const saveCategory = async (data: AddCategoryFormType): Promise<void> => {
    try {
      setLoading(true);

      let categoryData: any = {};

      categoryData.slug = generateSlug(data.title);
      categoryData.imageUrl = typeof imageUrl == "string" ? imageUrl : "";
      categoryData.status = statusValue.value;

      categoryData = { ...data, ...categoryData };

      if (isEdit) {
        const response: any = await updateCategoryById(
          initialData?.id!,
          categoryData
        );

        if (response.message) toast.error(response.message);
        else toast.success("Category Updated Successfully!👍");
      } else {
        await createCategory(categoryData);

        // Send Success Toast Message
        toast.success("Category Created Successfully!👍");
      }

      setLoading(false);

      // Reset Form Data
      reset();
      setStatusValue(null);
      setImageUrl(placeholderImage);

      // Route back to categories page
      router.push("/dashboard/categories");
    } catch (error: any) {
      console.log(`Error is: ${error.message}`);
      setLoading(false);

      toast.error(`Error Occured : ${error.message}`);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(saveCategory)}>
      <FormHeader
        title="Category"
        goBack={handleBack}
        loading={loading}
        isEdit={isEdit}
      />

      <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Details</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Category Title"
                  name="title"
                  required
                />

                <TextArea
                  register={register}
                  errors={errors}
                  label="Description"
                  name="description"
                  placeholder="Enter Category Description"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 flex lg:flex-col flex-wrap md:flex-nowrap gap-6">
          <Card className="w-full md:w-[50%] lg:w-full h-fit">
            <CardContent>
              <div className="grid gap-3">
                <Label htmlFor="status" className="font-semibold text-lg mt-3">
                  Category Status
                </Label>

                <Select
                  primaryColor="skyblue"
                  value={statusValue}
                  onChange={handleStatusChange}
                  options={options}
                  isSearchable
                  placeholder="Select Status"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden w-full md:w-[50%] lg:w-full">
            <CardContent>
              <ImageUpload
                label="Category Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="categoryImage"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 lg:hidden">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleBack}
          disabled={loading}
        >
          Discard
        </Button>
        <Button type="submit" size="sm" disabled={loading}>
          {isEdit ? "Update" : "Save"} Category
        </Button>
      </div>
    </form>
  );
};
