"use client";

import type { TableHeaderPropsType } from "@/types";

import Link from "next/link";
import { FC } from "react";
import { PlusCircle, Table } from "lucide-react";
import { convertDataToExcel, formatFilename } from "@/lib";
import { Button } from "@/components/ui/button";
import { ImportModal } from "./ImportModal";

export const TableHeader: FC<TableHeaderPropsType> = ({
  data,
  title,
  href,
  hrefText,
  model,
  isImportModalShown = true,
}) => {
  const handleDataExport = (): void => {
    const formattedName = formatFilename(title);

    convertDataToExcel(data, formattedName);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between pb-2 border-b border-gray-300 dark:border-gray-600">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDataExport}
            className="flex items-center gap-1"
          >
            <Table className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>

          {isImportModalShown && <ImportModal model={model} title={title} />}

          <Button asChild size="sm">
            <Link href={href} className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {hrefText}
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
