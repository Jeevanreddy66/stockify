"use client";

import { FC } from "react";

export const InfoColumn: FC<{ row: any; accessorKey: string }> = ({
  row,
  accessorKey,
}) => {
  const text = row.getValue(`${accessorKey}`);

  return <p className="text-md font-normal">{text ? text : `--`}</p>;
};
