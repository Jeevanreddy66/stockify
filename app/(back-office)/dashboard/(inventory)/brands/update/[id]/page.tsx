"use client";

import type { Brand } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getBrandById } from "@/actions";
import { AddBrand } from "@/components/dashboard";

const EditBrandPage: FC<{ params: { id: string } }> = ({ params: { id } }) => {
  const [brand, setBrand] = useState<Brand>();

  useEffect(() => {
    async function getBrand(id: string) {
      try {
        const brand = await getBrandById(id);

        setBrand(brand!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getBrand(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AddBrand isEdit initialData={brand!} />;
};

export default EditBrandPage;
