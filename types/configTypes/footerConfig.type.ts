import type { LucideIcon } from "lucide-react";

export type FooterConfigType = {
  summary: string;
  contacts: { label: string; Icon: LucideIcon }[];
  navigation: { title: string; links: { label: string; path: string }[] }[];
  policies: { name: string; url: string }[];
  mediaLinks: { Icon: LucideIcon; href: string }[];
};
