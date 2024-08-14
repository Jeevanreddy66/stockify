"use client";

import type { SelectValue } from "react-tailwindcss-select/dist/components/type";
import type { AddUserFormType, AddUserPropsType } from "@/types";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-tailwindcss-select";
import placeholderImage from "@/public/placeholder.svg";
import { userStatusOptions } from "@/config";
import {
  FormSelect,
  ImageUpload,
  PasswordInput,
  TextInput,
} from "@/components/global";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FormHeader } from "./FormHeader";
import { FormFooter } from "./FormFooter";
import toast from "react-hot-toast";
import { createUser, updateUserById } from "@/actions";

export const AddUser: FC<AddUserPropsType> = ({
  isEdit = false,
  initialData,
  roleOptions,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<AddUserFormType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [roleValue, setRoleValue] = useState<any>(null);

  const [statusValue, setStatusValue] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>(placeholderImage);

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserFormType>({ defaultValues: formData });

  const handleBack = (): void => router.back();

  const handleStatusChange = (value: SelectValue): void =>
    setStatusValue(value);

  const saveUser = async (data: AddUserFormType): Promise<void> => {
    try {
      setLoading(true);

      let userData: any = {};

      userData.name = `${data.firstName} ${data.lastName}`;
      userData.roleId = roleValue.value;
      userData.status = statusValue.value || "ACTIVE";
      userData.profileImage = typeof imageUrl === "string" ? imageUrl : "";

      userData = { ...userData, ...data };

      if (isEdit) {
        const response: any = await updateUserById(initialData?.id!, userData);

        setLoading(false);

        if (response.message) toast.error(response.message);
        else {
          toast.success("User Updated Successfully!👍");

          // Route to users
          router.push("/dashboard/users");
        }
      } else {
        await createUser(userData);
        setLoading(false);

        // Reset Form
        reset();
        setRoleValue(null);
        setStatusValue(null);
        setImageUrl(placeholderImage);

        toast.success("User Created Successfully!👍");
      }
    } catch (error: any) {
      console.log(`Error : ${error.message}`);

      setLoading(false);

      toast.error(`Something went wrong!.. ${error.message}`);
    }
  };

  useEffect(() => {
    reset(formData);

    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone,
        password: initialData.password,
      });

      setRoleValue({
        value: roleOptions.find(({ value }) => value === initialData.roleId)
          ?.value,
        label: roleOptions.find(({ value }) => value === initialData.roleId)
          ?.label,
      });

      setStatusValue({
        value: initialData.status,
        label:
          initialData.status.charAt(0).toUpperCase() +
          initialData.status.slice(1).toLowerCase(),
      });

      setImageUrl(initialData.profileImage! || placeholderImage);
    } else {
      setRoleValue(null);
      setStatusValue(null);
      setImageUrl(placeholderImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(saveUser)}>
      <FormHeader
        title="User"
        goBack={handleBack}
        isEdit={isEdit}
        href="/users"
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <TextInput
                  register={register}
                  errors={errors}
                  label="First Name"
                  name="firstName"
                  required
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="Last Name"
                  name="lastName"
                  required
                />

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
                  label="Phone Number"
                  name="phone"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {!isEdit && (
                  <PasswordInput
                    register={register}
                    errors={errors}
                    label="Password"
                    name="password"
                    required
                  />
                )}

                <FormSelect
                  label="Role"
                  value={roleValue}
                  setValue={setRoleValue}
                  options={roleOptions}
                  href="/dashboard/roles/new"
                  tooltipText="Add New Role"
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
                  User Status
                </Label>

                <Select
                  primaryColor="skyblue"
                  value={statusValue}
                  onChange={handleStatusChange}
                  options={userStatusOptions}
                  isSearchable
                  placeholder="Select Status"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden w-full md:w-[50%] lg:w-full">
            <CardContent>
              <ImageUpload
                label="Profile Image"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                endpoint="profileImage"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <FormFooter
        isEdit={isEdit}
        loading={loading}
        title="User"
        href="/users"
      />
    </form>
  );
};
