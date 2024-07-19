"use client";

import { FC } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationLinks } from "./NavigationLinks";
import { AvatarMenu, QuickAccessMenu } from "./menu";
import { ThemeToggle } from "../global";

export const Header: FC = () => {
  return (
    <header className="fixed w-full md:w-[calc(100%-220px)] lg:w-[calc(100%-280px)] flex items-center justify-between gap-4 border-b bg-muted/100 z-10 h-14 lg:h-[60px] px-4 lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="pt-4">
          <NavigationLinks />
        </SheetContent>
      </Sheet>

      <div className="flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search Products, Categories etc.,"
              className="w-full appearance-none bg-background pl-8 border focus:ring-1 focus:ring-indigo-600 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <QuickAccessMenu />
        <ThemeToggle />
        <AvatarMenu />
      </div>
    </header>
  );
};
