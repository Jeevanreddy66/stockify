"use client";

import type { Category } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getCategoryById } from "@/actions";
import { AddCategory } from "@/components/dashboard";

const EditCategoryPage: FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    async function getCategory(id: string) {
      try {
        const category = await getCategoryById(id);

        setCategory(category!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getCategory(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AddCategory isEdit initialData={category} />;
};

export default EditCategoryPage;
