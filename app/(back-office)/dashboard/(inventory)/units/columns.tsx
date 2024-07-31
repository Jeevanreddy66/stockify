"use client";

import type { Unit } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableColumn,
  ImageColumn,
  DateColumn,
  TitleColumn,
  ActionColumn,
  StatusColumn,
  InfoColumn,
} from "@/components/dashboard/dataTableColumns";

export const columns: ColumnDef<Unit>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
    cell: ({ row }) => <TitleColumn row={row} accessorKey="name" />,
  },
  {
    accessorKey: "shortName",
    header: "Abbreviation",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="shortName" />,
  },
  {
    accessorKey: "type",
    header: "Unit Type",
    cell: ({ row }) => <StatusColumn row={row} accessorKey="type" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unit = row.original;

      return (
        <ActionColumn
          row={row}
          model="unit"
          editEndpoint={`units/update/${unit.id}`}
          id={unit.id}
        />
      );
    },
  },
];
