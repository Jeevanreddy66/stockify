"use client";

import { type ThemeProviderProps } from "next-themes";

import { FC } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      <NextThemeProvider {...props}>{children}</NextThemeProvider>
    </>
  );
};
