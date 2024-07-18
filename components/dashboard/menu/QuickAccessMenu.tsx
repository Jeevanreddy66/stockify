"use client";

import { FC } from "react";
import { LayoutGrid, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const QuickAccessMenu: FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-10 h-10 rounded-md bg-slate-900 text-slate-50 flex items-center justify-center border dark:border-slate-500">
          <Plus className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          <div>
            <h3 className="flex items-center gap-2 uppercase mb-4 font-medium text-sm">
              <LayoutGrid className="w-4 h-4" /> General
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="flex items-center gap-3 font-light text-sm hover:text-indigo-600"
              >
                <Plus className="w-3 h-3" /> Products
              </Link>

              <Link href="#" className="flex items-center gap-4">
                <Plus className="w-4 h-4" /> Products
              </Link>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 uppercase mb-4 font-medium text-sm">
              <LayoutGrid className="w-4 h-4" /> General
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="flex items-center gap-3 font-light text-sm hover:text-indigo-600"
              >
                <Plus className="w-3 h-3" /> Products
              </Link>

              <Link href="#" className="flex items-center gap-4">
                <Plus className="w-4 h-4" /> Products
              </Link>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
