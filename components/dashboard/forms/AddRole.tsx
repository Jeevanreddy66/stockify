"use client";

import type { AddRoleFormType, AddRolePropsType } from "@/types";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { defaultRoleFormData, permissions } from "@/config";
import { generateRoleName } from "@/lib";
import { createRole, updateRoleById } from "@/actions";
import { TextInput } from "@/components/global";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormHeader } from "./FormHeader";
import { FormFooter } from "./FormFooter";

export const AddRole: FC<AddRolePropsType> = ({
  isEdit = false,
  initialData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] =
    useState<AddRoleFormType>(defaultRoleFormData);

  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRoleFormType>({ defaultValues: formData });

  const handleBack = (): void => router.back();

  const saveRole = async (data: AddRoleFormType): Promise<void> => {
    try {
      setLoading(true);

      let roleData: any = {};

      roleData.roleName = generateRoleName(data.displayName);

      roleData = { ...roleData, ...data };

      if (isEdit) {
        const response: any = await updateRoleById(initialData?.id!, roleData);

        if (response.message) toast.error(response.message);
        else toast.success("Role Updated Successfully!👍");

        setLoading(false);

        // route to roles
        router.push("/dashboard/roles");
      } else {
        await createRole(roleData);

        setLoading(false);

        // Send Success Toast Message
        toast.success("Role Created Successfully!👍");

        // Reset Form
        reset();
      }
    } catch (error: any) {
      console.log(`Error is: ${error.message}`);
      setLoading(false);

      toast.error(`Error Occured : ${error.message}`);
    }
  };

  useEffect(() => {
    reset(formData);

    if (initialData) {
      const {
        displayName,

        canAccessDashboard,
        canManageRoles,

        canViewBrands,
        canAddBrands,
        canEditBrands,
        canDeleteBrands,

        canViewCategories,
        canAddCategories,
        canEditCategories,
        canDeleteCategories,

        canViewProducts,
        canAddProducts,
        canEditProducts,
        canDeleteProducts,

        canViewSuppliers,
        canAddSuppliers,
        canEditSuppliers,
        canDeleteSuppliers,

        canManageUnits,

        canViewUsers,
        canAddUsers,
        canEditUsers,
        canDeleteUsers,

        canViewWarehouses,
        canAddWarehouses,
        canEditWarehouses,
        canDeleteWarehouses,
      } = initialData;
      setFormData({
        displayName,
        description: initialData.description!,

        canAccessDashboard,
        canManageRoles,

        canViewBrands,
        canAddBrands,
        canEditBrands,
        canDeleteBrands,

        canViewCategories,
        canAddCategories,
        canEditCategories,
        canDeleteCategories,

        canViewProducts,
        canAddProducts,
        canEditProducts,
        canDeleteProducts,

        canViewSuppliers,
        canAddSuppliers,
        canEditSuppliers,
        canDeleteSuppliers,

        canManageUnits,

        canViewUsers,
        canAddUsers,
        canEditUsers,
        canDeleteUsers,

        canViewWarehouses,
        canAddWarehouses,
        canEditWarehouses,
        canDeleteWarehouses,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(saveRole)}>
      <FormHeader
        title="Role"
        goBack={handleBack}
        isEdit={isEdit}
        href="/roles"
        loading={loading}
      />

      <Card className="my-6">
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <TextInput
              register={register}
              errors={errors}
              label="Role Name"
              name="displayName"
              required
            />

            <TextInput
              register={register}
              errors={errors}
              label="Role Description"
              name="description"
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Module</TableHead>
                <TableHead>Previleges</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {permissions.length &&
                permissions.map(({ model, actions }: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{model}</TableCell>

                    <TableCell>
                      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {actions.map(({ name, action }: any, j: number) => (
                          <li
                            key={j}
                            className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                          >
                            <div className="flex items-center ps-3">
                              <input
                                id={action}
                                type="checkbox"
                                {...register(
                                  `${action}` as keyof AddRoleFormType
                                )}
                                className="w-4 h-4 rounded outline-none focus:ring-0 cursor-pointer"
                              />
                              <label
                                htmlFor={action}
                                className="w-fit py-3 ms-2 text-sm font-medium text-muted-foreground"
                              >
                                {name}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <FormFooter
        isEdit={isEdit}
        loading={loading}
        title="Role"
        href="/roles"
      />
    </form>
  );
};
