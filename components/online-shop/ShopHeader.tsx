"use client";

import { FC } from "react";
import { Bell, LayoutGrid, Search, ShoppingBasket } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo, ThemeToggle } from "../global";

export const ShopHeader: FC = () => {
  return (
    <>
      <header className="h-16 w-full border-b border-gray-200">
        <div className="container flex items-center justify-between gap-6 py-3">
          <Logo />

          <Button size="sm">
            <LayoutGrid className="w-4 h-4" />{" "}
            <span className="sr-only sm:not-sr-only text-sm">Catalog</span>
          </Button>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for Products, Brands, Categories etc.,"
              className="px-8 py-2 md:w-[70%] text-sm border-none outline-none rounded-lg ring-1 ring-gray-200 focus:ring-indigo-500 placeholder:text-gray-500"
            />
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button size="icon" variant="outline">
              <Bell className="w-4 h-4" />
            </Button>

            <Button size="icon" variant="outline">
              <ShoppingBasket className="w-4 h-4" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="border border-gray-300 rounded-full">
              <Avatar>
                <AvatarImage src="" alt="user-avatar" />

                <AvatarFallback className="font-medium">JR</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="bottom"
              align="end"
            ></DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};
