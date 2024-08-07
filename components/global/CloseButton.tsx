"use client";

import type { CloseButtonPropsType } from "@/types";

import Link from "next/link";
import { FC } from "react";
import { Button } from "@/components/ui/button";

export const CloseButton: FC<CloseButtonPropsType> = ({ href, loading }) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={loading}
      asChild
    >
      <Link href={`/dashboard${href}`}>Close</Link>
    </Button>
  );
};
