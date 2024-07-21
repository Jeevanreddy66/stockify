"use client";

import { FC } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FormHeader: FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" className="w-8 h-8">
        <ChevronLeft className="w-4 h-4" />
        <span className="sr-only">Back</span>
      </Button>

      <h2 className="text-lg font-semibold shrink-0">Add Category</h2>

      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="sm">
          Discard
        </Button>
        <Button size="sm">Add Category</Button>
      </div>
    </div>
  );
};
