"use client";

import { ReactNode } from "react";
import { Header, Sidebar } from "@/components/dashboard";

const BackOfficeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />

      <div className="flex flex-col">
        <Header />

        <main className="flex-1 flex flex-col gap-4 p-4 lg:gap-8 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BackOfficeLayout;
