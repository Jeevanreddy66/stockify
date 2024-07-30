"use client";

import type { SelectValue } from "react-tailwindcss-select/dist/components/type";
import type {
  AddBrandFormType,
  AddBrandPropsType,
  SelectOptionsType,
} from "@/types";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-tailwindcss-select";
import toast from "react-hot-toast";
import placeholderImage from "@/public/placeholder.svg";
import { createBrand, updateBrandById } from "@/actions";
import { generateSlug } from "@/lib";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUpload, TextInput } from "@/components/global";
import { FormHeader } from "./FormHeader";

export const AddBrand: FC<AddBrandPropsType> = ({
  isEdit = false,
  initialData,
}) => {
  const options: SelectOptionsType[] = [
    { value: "ACTIVE", label: "Active" },
    { value: "ARCHIVED", label: "Archived" },
    { value: "BLOCKED", label: "Blocked" },
    { value: "FEATURED", label: "Featured" },
    { value: "INACTIVE", label: "In-Active" },
  ];

  const [formData, setFormData] = useState<AddBrandFormType>({
    title: "",
  });
  const [statusValue, setStatusValue] = useState<any>(null);
  const [logo, setLogo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBrandFormType>({
    defaultValues: formData,
  });

  const router = useRouter();
  const handleBack = (): void => router.back();

  const handleStatusChange = (value: SelectValue): void =>
    setStatusValue(value);

  useEffect(() => {
    reset(formData);

    initialData &&
      setFormData({
        title: initialData.title,
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
    setLogo(() => {
      return initialData?.logo || placeholderImage;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, reset]);

  const saveBrand = async (data: AddBrandFormType): Promise<void> => {
    try {
      setLoading(true);

      let brandData: any = {};

      brandData.slug = generateSlug(data.title);
      brandData.logo = typeof logo == "string" ? logo : "";
      brandData.status = statusValue.value;

      brandData = { ...data, ...brandData };

      if (isEdit) {
        const response: any = await updateBrandById(
          initialData?.id!,
          brandData
        );

        if (response.message) toast.error(response.message);
        else toast.success("Brand Updated Successfully!👍");
      } else {
        await createBrand(brandData);

        // Send Success Toast Message
        toast.success("Brand Created Successfully!👍");
      }

      setLoading(false);

      // Reset Form Data
      reset();
      setStatusValue(null);
      setLogo(placeholderImage);

      // Route back to Brands page
      router.push("/dashboard/brands");
    } catch (error: any) {
      console.log(`Error is: ${error.message}`);
      setLoading(false);

      toast.error(`Error Occured : ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveBrand)}>
      <FormHeader
        title="Brand"
        goBack={handleBack}
        loading={loading}
        isEdit={isEdit}
      />

      <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Details</CardTitle>
              <CardDescription>
                Please enter the brand details below:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TextInput
                register={register}
                errors={errors}
                label="Brand Title"
                name="title"
                required
              />

              <div className="grid gap-2 mt-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand Status
                </label>

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
        </div>

        <div className="col-span-full lg:col-span-4 flex lg:flex-col flex-wrap md:flex-nowrap gap-6">
          <Card className="overflow-hidden w-full">
            <CardContent>
              <ImageUpload
                label="Brand Logo"
                imageUrl={logo}
                setImageUrl={setLogo}
                endpoint="brandLogo"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};
