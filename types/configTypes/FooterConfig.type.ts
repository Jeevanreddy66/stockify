import type { LucideIcon } from "lucide-react";

import { FC } from "react";

export type FooterConfigType = {
  Logo: FC;
  summary: string;
  contacts: { label: string; Icon: LucideIcon }[];
  navigation: { title: string; links: { name: string; path: string }[] }[];
  policies: { item: string; url: string }[];
  mediaLinks: { Icon: LucideIcon; path: string }[];
};
