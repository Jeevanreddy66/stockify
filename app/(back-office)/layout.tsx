"use client";

import { ReactNode } from "react";

const BackOfficeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="min-h-screen">{children}</div>
    </>
  );
};

export default BackOfficeLayout;
