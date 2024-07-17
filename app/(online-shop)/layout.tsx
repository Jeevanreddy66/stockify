"use client";

import { Footer, Header } from "@/components/frontend";
import { ReactNode } from "react";

const ShopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default ShopLayout;
