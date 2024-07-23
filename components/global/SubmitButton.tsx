"use client";

import type { SubmitButtonPropsType } from "@/types";

import { FC } from "react";
import { Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SubmitButton: FC<SubmitButtonPropsType> = ({
  title,
  loading,
  loadingText = "Saving, Please wait...",
}) => {
  return (
    <Button type="submit" size="sm" disabled={loading}>
      {loading ? (
        <>
          <Loader className="w-4 h-4 animate-spin mr-2" /> {loadingText}
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 mr-2" />
          Save {title}
        </>
      )}
    </Button>
  );
};
