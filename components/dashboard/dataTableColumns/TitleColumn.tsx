"use client";

import { FC } from "react";

export const TitleColumn: FC<{ row: any; accessorKey: string }> = ({
  row,
  accessorKey,
}) => {
  const title = row.getValue(`${accessorKey}`);

  return <h2 className="text-md font-medium">{title}</h2>;
};
