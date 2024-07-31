"use client";

import type { Brand } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getAllBrands } from "@/actions";
import { TableHeader } from "@/components/dashboard";
import { DataTable } from "@/components/dashboard/dataTableComponents";
import { columns } from "./columns";

const BrandsPage: FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    async function getBrands() {
      try {
        const brands = await getAllBrands();

        setBrands(brands!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getBrands();
  }, []);

  return (
    <>
      <TableHeader
        data={brands}
        title="Brands"
        href="/dashboard/brands/new"
        hrefText="New Brand"
        model="brand"
      />

      <DataTable data={brands} columns={columns} />
    </>
  );
};

export default BrandsPage;
