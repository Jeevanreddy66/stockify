"use client";

import { ReactNode } from "react";
import { Header, Sidebar } from "@/components/dashboard";

const BackOfficeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full grid">
      <Sidebar />

      <div className="ml-0 md:ml-[220px] lg:ml-[280px] flex flex-col">
        <Header />

        <main className="mt-14 lg:mt-[60px] flex-1 flex flex-col gap-4 lg:gap-6 w-full max-w-[96%] lg:max-w-[92%] mx-auto py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BackOfficeLayout;
