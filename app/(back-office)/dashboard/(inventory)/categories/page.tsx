"use client";

import { FC, useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { getAllCategories } from "@/actions";
import { TableHeader } from "@/components/dashboard";
import { DataTable } from "@/components/dashboard/dataTableComponents";
import { columns } from "./columns";

const CategoriesPage: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await getAllCategories();

        setCategories(categories!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }
    getCategories();
  }, []);

  return (
    <>
      <TableHeader
        title="Categories"
        href="/dashboard/categories/new"
        hrefText="New Category"
      />

      <DataTable data={categories} columns={columns} />
    </>
  );
};

export default CategoriesPage;
