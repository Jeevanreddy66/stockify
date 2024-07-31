"use client";

import type { SelectValue } from "react-tailwindcss-select/dist/components/type";
import type {
  AddSupplierPropsType,
  SelectOptionsType,
  AddSupplierFormType,
} from "@/types";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { generateSlug } from "@/lib";
import { createSupplier, updateSupplierById } from "@/actions";
import placeholderImage from "@/public/placeholder.svg";
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

export const AddSupplier: FC<AddSupplierPropsType> = ({
  isEdit = false,
  initialData,
}) => {
  const options: SelectOptionsType[] = [
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "In-Active" },
    { value: "SUSPENDED", label: "Suspended" },
    { value: "TERMINATED", label: "Terminated" },
  ];

  const [formData, setFormData] = useState<AddSupplierFormType>({
    name: "",
    companyName: "",
    vatNumber: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [statusValue, setStatusValue] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddSupplierFormType>({
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
        companyName: initialData.companyName,
        vatNumber: initialData.vatNumber!,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address,
        city: initialData.city,
        state: initialData.state!,
        country: initialData.country!,
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
    setImageUrl(() => {
      return initialData?.imageUrl || placeholderImage;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, reset]);

  const saveSupplier = async (data: AddSupplierFormType): Promise<void> => {
    try {
      setLoading(true);

      let supplierData: any = {};

      supplierData.slug = generateSlug(data.name);
      supplierData.imageUrl = typeof imageUrl == "string" ? imageUrl : "";
      supplierData.status = statusValue.value;

      supplierData = { ...data, ...supplierData };

      if (isEdit) {
        const response: any = await updateSupplierById(
          initialData?.id!,
          supplierData
        );

        if (response.message) toast.error(response.message);
        else toast.success("Supplier Updated Successfully!👍");
      } else {
        await createSupplier(supplierData);

        // Send Success Toast Message
        toast.success("Supplier Created Successfully!👍");
      }

      setLoading(false);

      // Reset Form Data
      reset();
      setStatusValue(null);
      setImageUrl(placeholderImage);

      // Route back to Brands page
      router.push("/dashboard/suppliers");
    } catch (error: any) {
      console.log(`Error is: ${error.message}`);
      setLoading(false);

      toast.error(`Error Occured : ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveSupplier)}>
      <FormHeader
        title="Supplier"
        goBack={handleBack}
        loading={loading}
        isEdit={isEdit}
      />

      <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Details</CardTitle>
              <CardDescription>
                Please enter the supplier details below:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Supplier Name"
                  name="name"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="CompanyName"
                    name="companyName"
                    required
                  />
                  <TextInput
                    register={register}
                    errors={errors}
                    label="VAT Number"
                    name="vatNumber"
                  />
                </div>

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
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Supplier Address"
                    name="address"
                    placeholder="Enter Supplier Address"
                    required
                  />

                  <div className="flex flex-col gap-2">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="City"
                      name="city"
                      required
                    />

                    <TextInput
                      register={register}
                      errors={errors}
                      label="State"
                      name="state"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Country"
                    name="country"
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
                  Supplier Status
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
                label="Supplier Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="supplierImage"
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
