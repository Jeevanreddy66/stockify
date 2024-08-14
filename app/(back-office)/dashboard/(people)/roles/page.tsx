"use client";

import type { Role } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getAllRoles } from "@/actions";
import { TableHeader, DataTable } from "@/components/dashboard";
import { columns } from "./columns";

const RolesPage: FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    async function getRoles() {
      try {
        const roles = await getAllRoles();

        setRoles(roles!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getRoles();
  }, []);

  return (
    <>
      <TableHeader
        data={roles}
        title="Roles"
        href="/dashboard/roles/new"
        hrefText="New Role"
        model="role"
        isImportModalShown={false}
      />

      <DataTable data={roles} columns={columns} />
    </>
  );
};

export default RolesPage;
