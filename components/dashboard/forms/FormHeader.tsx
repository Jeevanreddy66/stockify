"use client";

import type { FormHeaderPropsType } from "@/types";

import { FC } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/global";

export const FormHeader: FC<FormHeaderPropsType> = ({
  title,
  goBack,
  loading,
  isEdit,
}) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="w-8 h-8"
        onClick={goBack}
        disabled={loading}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="sr-only">Back</span>
      </Button>

      <h2 className="text-lg font-semibold shrink-0">
        {isEdit ? "Update" : "New"} {title}
      </h2>

      <div className="ml-auto flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={goBack}
          disabled={loading}
        >
          Discard
        </Button>

        <SubmitButton title={title} loading={loading} isEdit={isEdit} />
      </div>
    </div>
  );
};
