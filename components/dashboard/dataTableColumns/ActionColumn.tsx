"use client";

import type { ActionColumnPropsType } from "@/types";

import { FC } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ActionColumn: FC<ActionColumnPropsType> = ({
  row,
  title,
  editEndpoint,
  id,
}) => {
  const isActive = row.isActive;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit Here</DropdownMenuItem>
        <DropdownMenuItem>Delete Here</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
