"use client";

import type { ButtonColumnPropsType } from "@/types";

import { FC } from "react";
import { Button } from "@/components/ui/button";

export const ButtonColumn: FC<ButtonColumnPropsType> = ({ row, text }) => {
  const item = row.original;

  const handleOnClick = (): void => {
    if (item.firstName) {
      const inviteData = {
        loginPage: "http://localhost:3000/login",
        password: item.plainPassword,
        email: item.email,
        firstName: item.firstName,
      };

      console.log(inviteData);
    }
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleOnClick}>
      {text}
    </Button>
  );
};
