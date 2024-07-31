"use client";

import { getSupplierById } from "@/actions";
import { AddSupplier } from "@/components/dashboard";
import { Supplier } from "@prisma/client";
import { FC, useEffect, useState } from "react";

const EditSupplierPage: FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const [supplier, setSupplier] = useState<Supplier>();

  useEffect(() => {
    async function getSupplier(id: string) {
      try {
        const supplier = await getSupplierById(id);

        setSupplier(supplier!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getSupplier(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AddSupplier isEdit initialData={supplier!} />;
};

export default EditSupplierPage;
