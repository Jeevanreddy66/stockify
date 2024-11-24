import type { LucideIcon } from "lucide-react";

import { FC } from "react";

export type FooterConfigType = {
  Logo: FC;
  summary: string;
  contacts: { label: string; Icon: LucideIcon }[];
  navigation: { title: string; links: { label: string; path: string }[] }[];
  policies: { name: string; url: string }[];
  mediaLinks: { Icon: LucideIcon; href: string }[];
};
