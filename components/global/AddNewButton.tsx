"use client";

import { AddNewButtonPropsType } from "@/types";

import Link from "next/link";
import { FC } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const AddNewButton: FC<AddNewButtonPropsType> = ({
  href,
  tooltipText,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" asChild>
            <Link href={href}>
              <Plus className="w-5 h-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
