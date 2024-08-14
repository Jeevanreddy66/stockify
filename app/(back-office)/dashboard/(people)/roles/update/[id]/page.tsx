"use client";

import type { Role } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getRoleById } from "@/actions";
import { AddRole } from "@/components/dashboard";

const EditRolePage: FC<{ params: { id: string } }> = ({ params: { id } }) => {
  const [role, setRole] = useState<Role>();

  useEffect(() => {
    async function getRole(id: string) {
      try {
        const role = await getRoleById(id);

        setRole(role!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getRole(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AddRole isEdit initialData={role} />;
};

export default EditRolePage;
