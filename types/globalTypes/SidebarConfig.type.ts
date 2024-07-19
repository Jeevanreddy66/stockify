import type { LucideIcon } from "lucide-react";

export type SidebarConfigType = {
  title: string;
  Icon: LucideIcon;
  href?: string;
  dropdown: boolean;
  dropdownMenu?: { name: string; path: string }[];
};
