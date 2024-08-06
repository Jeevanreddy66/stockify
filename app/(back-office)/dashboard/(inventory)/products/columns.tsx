"use client";

import type { ProductWithRelations } from "@/types";
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

export const columns: ColumnDef<ProductWithRelations>[] = [
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
    accessorKey: "images",
    header: "Product Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="images" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
    cell: ({ row }) => <TitleColumn row={row} accessorKey="title" />,
  },
  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="productCode" />,
  },
  {
    accessorKey: "stockQty",
    header: "Quantity",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="stockQty" />,
  },
  {
    accessorKey: "status",
    header: "Status",
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
      const product = row.original;

      return (
        <ActionColumn
          row={row}
          model="product"
          editEndpoint={`products/update/${product.id}`}
          id={product.id}
        />
      );
    },
  },
];
