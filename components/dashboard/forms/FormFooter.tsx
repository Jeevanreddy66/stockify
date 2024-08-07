"use client";

import type { FormFooterPropsType } from "@/types";

import { FC } from "react";
import { CloseButton, SubmitButton } from "@/components/global";

export const FormFooter: FC<FormFooterPropsType> = ({
  isEdit,
  loading,
  href,
  title,
}) => {
  return (
    <div className="flex items-center justify-end gap-4 lg:hidden">
      <CloseButton href={href} loading={loading} />
      <SubmitButton title={title} loading={loading} isEdit={isEdit} />
    </div>
  );
};
