"use client";

import { FC, ReactNode } from "react";
import { Footer, Header } from "@/components/frontend";

const ShopLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <section className="container">{children}</section>
      <Footer />
    </>
  );
};

export default ShopLayout;
