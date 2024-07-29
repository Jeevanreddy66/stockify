"use client";

import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableColumn,
  ImageColumn,
  DateColumn,
  TitleColumn,
  ActionColumn,
  StatusColumn,
} from "@/components/dashboard/dataTableColumns";

export const columns: ColumnDef<Brand>[] = [
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
    accessorKey: "logo",
    header: "Brand Logo",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="logo" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
    cell: ({ row }) => <TitleColumn row={row} accessorKey="title" />,
  },
  {
    accessorKey: "status",
    header: "Brand Status",
    cell: ({ row }) => <StatusColumn row={row} accessorKey="status" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <ActionColumn
          row={row}
          model="brand"
          editEndpoint={`brands/update/${brand.id}`}
          id={brand.id}
        />
      );
    },
  },
];
