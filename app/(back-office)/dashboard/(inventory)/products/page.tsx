"use client";

import type { ProductWithRelations } from "@/types";

import { FC, useEffect, useState } from "react";
import { getAllProducts } from "@/actions";
import { TableHeader } from "@/components/dashboard";
import { DataTable } from "@/components/dashboard/dataTableComponents";
import { columns } from "./columns";

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await getAllProducts();

        setProducts(products!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }
    getProducts();
  }, []);
  return (
    <>
      <TableHeader
        data={products}
        title="Product"
        href="/dashboard/products/new"
        hrefText="New Product"
        model="product"
      />

      <DataTable data={products} columns={columns} />
    </>
  );
};

export default ProductsPage;
