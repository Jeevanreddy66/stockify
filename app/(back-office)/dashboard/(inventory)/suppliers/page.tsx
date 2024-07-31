"use client";

import type { Supplier } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getAllSuppliers } from "@/actions";
import { TableHeader } from "@/components/dashboard";
import { DataTable } from "@/components/dashboard/dataTableComponents";
import { columns } from "./columns";

const SuppliersPage: FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    async function getSuppliers() {
      try {
        const suppliers = await getAllSuppliers();

        setSuppliers(suppliers!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getSuppliers();
  }, []);

  return (
    <>
      <TableHeader
        data={suppliers}
        title="Suppliers"
        href="/dashboard/suppliers/new"
        hrefText="New Supplier"
        model="supplier"
      />

      <DataTable data={suppliers} columns={columns} />
    </>
  );
};

export default SuppliersPage;
