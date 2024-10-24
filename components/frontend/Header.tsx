"use client";

import Image from "next/image";
import { FC } from "react";
import { LayoutGrid, Search, ShoppingBasket } from "lucide-react";
import UserAvatar from "@/public/avatar.jpeg";

import { Button } from "@/components/ui/button";
import { Logo, ThemeToggle } from "../global";

export const Header: FC = () => {
  return (
    <>
      <header className="p-0 w-full h-[60px] border-b border-gray-200 flex items-center justify-center">
        <div className="container flex items-center gap-6">
          <Logo />

          <Button size="sm">
            <LayoutGrid className="w-4 h-4" /> <span>Catalog</span>
          </Button>

          <div className="flex-1 relative">
            <Search className="absolute w-4 h-4 left-1 top-1/4 text-gray-400 font-light" />
            <input
              type="text"
              placeholder="Search for Products, Categories, Brands etc.,"
              className="py-2 px-7 w-full border-none outline-none rounded-md text-sm ring-1 ring-gray-300 focus:ring-indigo-600 placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline">
              <ShoppingBasket className="w-4 h-4" />
            </Button>

            <ThemeToggle />

            <Button
              variant="outline"
              className="rounded-full p-0.5 border border-gray-200"
            >
              <Image
                src={UserAvatar}
                width={512}
                height={512}
                className="object-cover rounded-full w-10 h-10"
                alt="user-avatar"
              />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};
