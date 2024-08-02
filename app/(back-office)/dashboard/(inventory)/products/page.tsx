"use client";

import { FC } from "react";
import { TableHeader } from "@/components/dashboard";

const ProductsPage: FC = () => {
  return (
    <>
      <TableHeader
        data={[]}
        title="Product"
        href="/dashboard/products/new"
        hrefText="New Product"
        model=""
      />
    </>
  );
};

export default ProductsPage;
