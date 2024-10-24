"use client";

import { FC, ReactNode } from "react";

import { ThemeProvider } from "./ThemeProvider";

export const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};
