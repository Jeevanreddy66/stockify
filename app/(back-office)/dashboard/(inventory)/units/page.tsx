"use client";

import type { Unit } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getAllUnits } from "@/actions";
import { TableHeader } from "@/components/dashboard";
import { DataTable } from "@/components/dashboard/dataTableComponents";
import { columns } from "./columns";

const UnitsPage: FC = () => {
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    async function getUnits() {
      try {
        const units = await getAllUnits();

        setUnits(units!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getUnits();
  }, []);

  return (
    <>
      <TableHeader
        data={units}
        title="Units"
        href="/dashboard/units/new"
        hrefText="New Unit"
        model="unit"
      />

      <DataTable data={units} columns={columns} />
    </>
  );
};

export default UnitsPage;
