"use client";

import type { UserWithRole } from "@/types";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SortableColumn,
  ImageColumn,
  TitleColumn,
  ActionColumn,
  InfoColumn,
  ButtonColumn,
} from "@/components/dashboard";

export const columns: ColumnDef<UserWithRole>[] = [
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
    accessorKey: "profileImage",
    header: "Profile Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="profileImage" />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
    cell: ({ row }) => <TitleColumn row={row} accessorKey="name" />,
  },
  {
    accessorKey: "role",
    header: "Role Name",
    cell: ({ row }) => {
      const user = row.original;

      const roleName = user.role.displayName;

      return <h2>{roleName}</h2>;
    },
  },
  {
    id: "invite",
    header: "Invite",
    cell: ({ row }) => <ButtonColumn row={row} text="Invite User" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
    cell: ({ row }) => <InfoColumn row={row} accessorKey="email" />,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => <InfoColumn row={row} accessorKey="phone" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <ActionColumn
          row={row}
          model="user"
          editEndpoint={`users/update/${user.id}`}
          id={user.id}
        />
      );
    },
  },
];
