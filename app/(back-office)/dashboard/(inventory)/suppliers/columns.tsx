"use client";

import type { Supplier } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableColumn,
  ImageColumn,
  TitleColumn,
  ActionColumn,
  StatusColumn,
  InfoColumn,
  DateColumn,
} from "@/components/dashboard/dataTableColumns";

export const columns: ColumnDef<Supplier>[] = [
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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
    cell: ({ row }) => <TitleColumn row={row} accessorKey="name" />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusColumn row={row} accessorKey="status" />,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="email" />,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="phone" />,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="city" />,
  },
  {
    accessorKey: "zipCode",
    header: "Zipcode",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="zipCode" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const supplier = row.original;

      return (
        <ActionColumn
          row={row}
          model="supplier"
          editEndpoint={`suppliers/update/${supplier.id}`}
          id={supplier.id}
        />
      );
    },
  },
];
