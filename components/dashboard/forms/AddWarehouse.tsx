"use client";

import type { SelectValue } from "react-tailwindcss-select/dist/components/type";
import type {
  AddWarehouseFormType,
  AddWarehousePropsType,
  SelectOptionsType,
} from "@/types";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { generateSlug } from "@/lib";
import { createWarehouse, updateWarehouseById } from "@/actions";
import placeholderImage from "@/public/placeholder.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageUpload, TextInput } from "@/components/global";
import { FormHeader } from "./FormHeader";
import { FormFooter } from "./FormFooter";

export const AddWarehouse: FC<AddWarehousePropsType> = ({
  isEdit = false,
  initialData,
}) => {
  const options: SelectOptionsType[] = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "In-Active" },
    { value: "UNDER_MAINTENANCE", label: "Under Maintenance" },
    { value: "CLOSED", label: "Closed" },
  ];

  const [formData, setFormData] = useState<AddWarehouseFormType>({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    contactPerson: "",
    zipCode: "",
  });
  const [statusValue, setStatusValue] = useState<any>(null);
  const [logo, setLogo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddWarehouseFormType>({
    defaultValues: formData,
  });

  const handleBack = (): void => router.back();

  const handleStatusChange = (value: SelectValue): void =>
    setStatusValue(value);

  useEffect(() => {
    reset(formData);

    initialData &&
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        city: initialData.city!,
        country: initialData.country!,
        contactPerson: initialData.contactPerson,
        zipCode: initialData.zipCode,
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

  const saveWarehouse = async (data: AddWarehouseFormType): Promise<void> => {
    try {
      setLoading(true);

      let warehouseData: any = {};

      warehouseData.slug = generateSlug(data.name);
      warehouseData.logo = typeof logo == "string" ? logo : "";
      warehouseData.status = statusValue.value;

      warehouseData = { ...data, ...warehouseData };

      if (isEdit) {
        const response: any = await updateWarehouseById(
          initialData?.id!,
          warehouseData
        );

        if (response.message) toast.error(response.message);
        else toast.success("Warehouse Updated Successfully!👍");
      } else {
        await createWarehouse(warehouseData);

        // Send Success Toast Message
        toast.success("Warehouse Created Successfully!👍");
      }

      setLoading(false);

      // Reset Form Data
      reset();
      setStatusValue(null);
      setLogo(placeholderImage);

      // Route back to Brands page
      router.push("/dashboard/warehouses");
    } catch (error: any) {
      console.log(`Error is: ${error.message}`);
      setLoading(false);

      toast.error(`Error Occured : ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveWarehouse)}>
      <FormHeader
        title="Warehouse"
        goBack={handleBack}
        href="/warehouses"
        loading={loading}
        isEdit={isEdit}
      />

      <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Details</CardTitle>
              <CardDescription>
                Please enter the warehouse details below:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Warehouse Title"
                  name="name"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Phone"
                    name="phone"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="City"
                    name="city"
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Country"
                    name="country"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Contact Person"
                    name="contactPerson"
                    required
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Zip Code"
                    name="zipCode"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 flex lg:flex-col flex-wrap md:flex-nowrap gap-6">
          <Card className="w-full md:w-[50%] lg:w-full h-fit">
            <CardContent>
              <div className="grid gap-3">
                <Label htmlFor="status" className="font-semibold text-lg mt-3">
                  Warehouse Status
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
                imageUrl={logo}
                setImageUrl={setLogo}
                endpoint="warehouseLogo"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <FormFooter
        isEdit={isEdit}
        loading={loading}
        href="/warehouses"
        title="Warehouse"
      />
    </form>
  );
};
