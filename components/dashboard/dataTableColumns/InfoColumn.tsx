"use client";

import { FC } from "react";

export const InfoColumn: FC<{ row: any; accessorKey: string }> = ({
  row,
  accessorKey,
}) => {
  const title = row.getValue(`${accessorKey}`);

  return <p className="text-md font-normal">{title}</p>;
};
