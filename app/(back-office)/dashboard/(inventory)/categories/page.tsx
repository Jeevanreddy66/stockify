"use client";

import Link from "next/link";
import { FC } from "react";
import { Button } from "@/components/ui/button";

const CategoriesPage: FC = () => {
  return (
    <>
      <Button asChild>
        <Link href="/dashboard/categories/new">Add Category</Link>
      </Button>
    </>
  );
};

export default CategoriesPage;
