"use client";

import type { SelectValue } from "react-tailwindcss-select/dist/components/type";
import type {
  AddUnitFormType,
  AddUnitPropsType,
  SelectOptionsType,
} from "@/types";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-tailwindcss-select";
import toast from "react-hot-toast";
import { createUnit, updateUnitById } from "@/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextInput } from "@/components/global";
import { FormHeader } from "./FormHeader";

export const AddUnit: FC<AddUnitPropsType> = ({
  isEdit = false,
  initialData,
}) => {
  const options: SelectOptionsType[] = [
    { value: "PIECE", label: "Piece" },
    { value: "KILOGRAM", label: "Kilogram" },
    { value: "LITER", label: "Litre" },
    { value: "METER", label: "Meter" },
    { value: "SQUARE_METER", label: "Sq-Meter" },
  ];

  const [formData, setFormData] = useState<AddUnitFormType>({
    name: "",
    shortName: "",
  });
  const [typeValue, setTypeValue] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUnitFormType>({
    defaultValues: formData,
  });

  const router = useRouter();
  const handleBack = (): void => router.back();

  const handleTypeChange = (value: SelectValue): void => setTypeValue(value);

  useEffect(() => {
    reset(formData);

    initialData &&
      setFormData({
        name: initialData.name,
        shortName: initialData.shortName,
      });

    setTypeValue(() => {
      return initialData
        ? {
            value: initialData.type,
            label:
              initialData.type.charAt(0).toUpperCase() +
              initialData.type.slice(1).toLowerCase(),
          }
        : null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, reset]);

  const saveUnit = async (data: AddUnitFormType): Promise<void> => {
    try {
      setLoading(true);

      let unitData: any = {};
      unitData.type = typeValue.value;

      unitData = { ...data, ...unitData };

      if (isEdit) {
        const response: any = await updateUnitById(initialData?.id!, unitData);

        if (response.message) toast.error(response.message);
        else toast.success("Unit Updated Successfully!👍");
      } else {
        await createUnit(unitData);

        // Send Success Toast Message
        toast.success("Unit Created Successfully!👍");
      }

      setLoading(false);

      // Reset Form Data
      reset();
      setTypeValue(null);

      // Route back to Brands page
      router.push("/dashboard/units");
    } catch (error: any) {
      console.log(`Error is: ${error.message}`);
      setLoading(false);

      toast.error(`Error Occured : ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveUnit)}>
      <FormHeader
        title="Unit"
        goBack={handleBack}
        loading={loading}
        isEdit={isEdit}
      />

      <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unit Details</CardTitle>
              <CardDescription>
                Please enter the unit details below:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TextInput
                register={register}
                errors={errors}
                label="Unit Name"
                name="name"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Unit Abbreviation"
                  name="shortName"
                  required
                />

                <div className="grid gap-2 mt-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Unit Type
                  </label>

                  <Select
                    primaryColor="skyblue"
                    value={typeValue}
                    onChange={handleTypeChange}
                    options={options}
                    isSearchable
                    placeholder="Select Type"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};
