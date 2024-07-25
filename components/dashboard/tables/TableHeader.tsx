"use client";

import type { SelectOptionsType, TableHeaderPropsType } from "@/types";

import Link from "next/link";
import { FC } from "react";
import { ListFilter, PlusCircle, Search, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImportModal } from "./ImportModal";

export const TableHeader: FC<TableHeaderPropsType> = ({
  title,
  href,
  hrefText,
}) => {
  const statusOptions: SelectOptionsType[] = [
    { value: "ACTIVE", label: "Active" },
    { value: "ARCHIVED", label: "Archived" },
    { value: "BLOCKED", label: "Blocked" },
    { value: "FEATURED", label: "Featured" },
    { value: "INACTIVE", label: "In-Active" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between pb-2 border-b border-gray-300 dark:border-gray-600">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Table className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>

          <ImportModal />

          <Button asChild size="sm" className="flex items-center gap-1">
            <Link href={href}>
              <PlusCircle className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {hrefText}
              </span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="flex-1 relative md:max-w-[50%]">
          <Search className="absolute w-4 h-4 left-2 top-1/4 text-slate-400" />
          <input
            type="text"
            placeholder="Search for Products, Categories..."
            className="w-full px-8 py-2 text-sm outline-none border-none rounded-md ring-1 ring-slate-400 focus:ring-indigo-600"
          />
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <ListFilter className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter Status
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusOptions.map(({ label, value }, i: number) => (
                <DropdownMenuCheckboxItem key={i} checked>
                  {label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
