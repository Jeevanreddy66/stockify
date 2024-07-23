"use client";

import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./ThemeProvider";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </ThemeProvider>
    </>
  );
};
