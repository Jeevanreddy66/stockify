"use client";

import type { SelectOptionsType } from "@/types";
import type { User } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getAllRoles, getUserById } from "@/actions";
import { AddUser } from "@/components/dashboard";

const EditUserPage: FC<{ params: { id: string } }> = ({ params: { id } }) => {
  const [user, setUser] = useState<User>();
  const [roleOptions, setRoleOptions] = useState<SelectOptionsType[]>([]);

  useEffect(() => {
    async function getUser(id: string) {
      try {
        const user = await getUserById(id);

        const roles = await getAllRoles();

        const roleOptions = roles?.map((role) => {
          return { value: role.id, label: role.displayName };
        });

        setRoleOptions(roleOptions!);

        setUser(user!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AddUser isEdit initialData={user} roleOptions={roleOptions} />;
};

export default EditUserPage;
