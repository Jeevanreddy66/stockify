"use client";

import type { Warehouse } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getWarehouseById } from "@/actions";
import { AddWarehouse } from "@/components/dashboard";

const EditWarehousePage: FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const [warehouse, setWarehouse] = useState<Warehouse>();

  useEffect(() => {
    async function getWarehouse(id: string) {
      try {
        const warehouse = await getWarehouseById(id);

        setWarehouse(warehouse!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getWarehouse(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AddWarehouse isEdit initialData={warehouse} />;
};

export default EditWarehousePage;
