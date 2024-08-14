"use client";

import { FC, useEffect, useState } from "react";
import { AddUser } from "@/components/dashboard";
import { SelectOptionsType } from "@/types";
import { getAllRoles } from "@/actions";

const AddUserPage: FC = () => {
  const [roleOptions, setRoleOptions] = useState<SelectOptionsType[]>([]);

  useEffect(() => {
    async function getRoles() {
      try {
        const roles = await getAllRoles();

        const roleOptions = roles?.map((role) => {
          return { value: role.id, label: role.displayName };
        });

        setRoleOptions(roleOptions!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getRoles();
  }, []);
  return <AddUser roleOptions={roleOptions} />;
};

export default AddUserPage;
