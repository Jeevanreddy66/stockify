"use client";

import { FC, ReactNode } from "react";

import { Footer } from "@/components/global";
import { ShopHeader } from "@/components/online-shop";

const OnlineShopLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <ShopHeader />

      <main className="container mt-8">{children}</main>

      <Footer />
    </>
  );
};

export default OnlineShopLayout;
