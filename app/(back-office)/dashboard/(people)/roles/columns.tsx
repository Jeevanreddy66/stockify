"use client";

import type { Role } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableColumn,
  DateColumn,
  TitleColumn,
  ActionColumn,
  InfoColumn,
} from "@/components/dashboard";

export const columns: ColumnDef<Role>[] = [
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
    accessorKey: "displayName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Role Title" />
    ),
    cell: ({ row }) => <TitleColumn row={row} accessorKey="displayName" />,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="description" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original;

      return (
        <ActionColumn
          row={row}
          model="role"
          editEndpoint={`roles/update/${role.id}`}
          id={role.id}
        />
      );
    },
  },
];
