"use client";

import { FC } from "react";
import { NavigationLinks } from "./NavigationLinks";

export const Sidebar: FC = () => {
  return (
    <div className="hidden md:block fixed md:w-[220px] lg:w-[280px] h-full min-h-screen border-r bg-muted/40">
      <NavigationLinks />
    </div>
  );
};
