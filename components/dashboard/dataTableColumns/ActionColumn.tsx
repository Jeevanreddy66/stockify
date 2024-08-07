"use client";

import type { ActionColumnPropsType } from "@/types";

import Link from "next/link";
import { FC } from "react";
import toast from "react-hot-toast";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  deleteCategory,
  deleteBrand,
  deleteWarehouse,
  deleteSupplier,
  deleteUnit,
  deleteProduct,
} from "@/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ActionColumn: FC<ActionColumnPropsType> = ({
  row,
  model,
  editEndpoint,
  id = "",
}) => {
  const isActive = row.isActive;

  const handleDeleteItem = async (): Promise<void> => {
    try {
      let res: any;
      switch (model) {
        case "category":
          res = await deleteCategory(id);
          break;
        case "brand":
          res = await deleteBrand(id);
          break;
        case "warehouse":
          res = await deleteWarehouse(id);
          break;
        case "supplier":
          res = await deleteSupplier(id);
          break;
        case "unit":
          res = await deleteUnit(id);
          break;
        case "product":
          res = await deleteProduct(id);
          break;
        default:
          break;
      }
      toast.success(`${model} Deleted Successfully!`);

      if (res?.success) window.location.reload();
    } catch (error: any) {
      console.log(`Error : ${error.message}`);

      toast.error(`Error: Failed to delete the ${model}!`);
    }
  };

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
        <DropdownMenuItem asChild>
          <Link
            href={editEndpoint}
            className="flex items-center justify-between px-4 flex-nowrap cursor-pointer"
          >
            <span className="text-blue-500">Edit</span>
            <Pencil className="w-3.5 h-3.5 text-blue-500" />
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex items-center justify-between px-4 flex-nowrap"
            >
              <span className="text-red-500">Delete</span>
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the{" "}
                {model}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant="destructive" onClick={handleDeleteItem}>
                Yes, Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
