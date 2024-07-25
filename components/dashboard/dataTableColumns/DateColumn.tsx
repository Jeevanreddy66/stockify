"use client";

import { FC } from "react";
import { formatDateTime } from "@/lib";

export const DateColumn: FC<{
  row: any;
  accessorKey: string;
}> = ({ row, accessorKey }) => {
  const createdAt = row.getValue(`${accessorKey}`);

  return <div className="">{formatDateTime(createdAt)}</div>;
};
