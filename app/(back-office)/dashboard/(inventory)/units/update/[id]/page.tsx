"use client";

import type { Unit } from "@prisma/client";

import { FC, useEffect, useState } from "react";
import { getUnitById } from "@/actions";
import { AddUnit } from "@/components/dashboard";

const EditUnitPage: FC<{ params: { id: string } }> = ({ params: { id } }) => {
  const [unit, setUnit] = useState<Unit>();

  useEffect(() => {
    async function getUnit(id: string) {
      try {
        const unit = await getUnitById(id);

        setUnit(unit!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getUnit(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AddUnit isEdit initialData={unit!} />;
};

export default EditUnitPage;
