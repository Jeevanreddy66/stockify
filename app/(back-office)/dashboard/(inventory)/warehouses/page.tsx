"use client";

import type { Warehouse } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getAllWarehouses } from "@/actions";
import { TableHeader } from "@/components/dashboard";
import { DataTable } from "@/components/dashboard/dataTableComponents";
import { columns } from "./columns";

const WarehousesPage: FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    async function getWarehouses() {
      try {
        const warehouses = await getAllWarehouses();

        setWarehouses(warehouses!);
      } catch (error) {}
    }

    getWarehouses();
  }, []);

  return (
    <>
      <TableHeader
        data={warehouses}
        title="Warehouses"
        href="/dashboard/warehouses/new"
        hrefText="New Warehouse"
        model="warehouse"
      />

      <DataTable data={warehouses} columns={columns} />
    </>
  );
};

export default WarehousesPage;
