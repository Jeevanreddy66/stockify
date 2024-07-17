"use client";

import { FC } from "react";
import { Logo, ThemeToggle } from "../global";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBasket } from "lucide-react";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <>
      <header className="border-b">
        <div className="container py-4 flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Logo />
            <Button size="sm" className="space-x-2">
              <LayoutGrid className="w-4 h-4" /> <span>Catalog</span>
            </Button>
          </div>

          <div className="flex-1 relative">
            <Search className="absolute w-4 h-4 left-2 top-1/4 text-slate-400" />
            <input
              type="text"
              placeholder="Search for Products, Categories..."
              className="w-full px-8 py-2 text-sm outline-none border-none rounded-md ring-1 ring-slate-400 focus:ring-indigo-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <ShoppingBasket className="w-4 h-4" />
            </Button>

            <ThemeToggle />

            <Button
              variant="outline"
              className="w-11 h-11 rounded-full p-0.5 border"
            >
              <Image
                src="/avatar.jpeg"
                width={512}
                height={512}
                className="object-cover rounded-full"
                alt="user-image"
              />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};
