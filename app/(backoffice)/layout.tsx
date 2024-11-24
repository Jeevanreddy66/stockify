"use client";

import { FC, ReactNode } from "react";

const BackofficeLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default BackofficeLayout;
