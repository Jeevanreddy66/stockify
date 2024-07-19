"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { Bell, ChevronDown, ChevronRight, Plus, Power } from "lucide-react";
import { sidebarConfig } from "@/config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Logo } from "../global";

export const NavigationLinks: FC = () => {
  const pathname = usePathname();

  const [openIndices, setOpenIndices] = useState<boolean[]>(
    new Array(sidebarConfig.length).fill(false)
  );

  const handleCollapsibleTrigger = (index: number): void => {
    setOpenIndices((prev) => {
      const newOpenIndices = [...prev];

      newOpenIndices[index] = !newOpenIndices[index];
      return newOpenIndices;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center border-b px-4 lg:px-6 h-14 lg:h-[60px]">
        <Logo />

        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>

      <div className="w-full h-[83vh] overflow-y-auto">
        <nav className="grid items-start gap-1 text-sm font-medium px-2 lg:px-4">
          {sidebarConfig.map(
            (
              { title, Icon, href = "#", dropdown, dropdownMenu },
              i: number
            ) => (
              <div key={i}>
                {dropdown ? (
                  <Collapsible>
                    <CollapsibleTrigger
                      onClick={() => handleCollapsibleTrigger(i)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                        dropdownMenu?.some(({ path }) => path === pathname) &&
                          "bg-muted !text-primary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        {title}
                      </div>

                      {openIndices[i] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1 px-6 py-2 space-y-0.5 border dark:border-gray-800 rounded bg-muted/70 dark:bg-black">
                      {dropdownMenu?.map(({ name, path }, i: number) => (
                        <Link
                          key={i}
                          href={path}
                          className={cn(
                            "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-all hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-800",
                            pathname === path &&
                              "bg-slate-200 text-primary dark:bg-slate-800"
                          )}
                        >
                          {name}
                          <Plus className="h-4 w-4" />
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    href={href!}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                      pathname === href && "bg-muted text-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {title}
                  </Link>
                )}
              </div>
            )
          )}
        </nav>
      </div>

      <div className="mt-auto px-2 lg:px-4">
        <Button size="sm" className="w-full flex items-center gap-2">
          <Power className="w-4 h-4" /> Logout
        </Button>
      </div>
    </div>
  );
};
