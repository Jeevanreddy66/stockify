"use client";

import { FC } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SortableColumn: FC<{
  column: any;
  title: string;
}> = ({ column, title }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="text-left"
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
