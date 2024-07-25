"use client";

import { FC } from "react";
import { Badge } from "@/components/ui/badge";

export const StatusColumn: FC<{
  row: any;
  accessorKey: string;
}> = ({ row, accessorKey }) => {
  const status = row.getValue(`${accessorKey}`);

  return (
    <Badge variant="secondary" className="text-xs">
      {status}
    </Badge>
  );
};
