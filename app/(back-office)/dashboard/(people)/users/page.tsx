"use client";

import type { User } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { TableHeader, DataTable } from "@/components/dashboard";
import { columns } from "./columns";
import { getAllUsers } from "@/actions";

const UsersPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const users = await getAllUsers();

        setUsers(users!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getUsers();
  }, []);

  return (
    <>
      <TableHeader
        data={users}
        title="Users"
        href="/dashboard/users/new"
        hrefText="New User"
        model="user"
      />

      <DataTable data={users} columns={columns} />
    </>
  );
};

export default UsersPage;
