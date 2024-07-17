import type { LucideIcon } from "lucide-react";

import { FC } from "react";

export type FooterConfigType = {
  Logo: FC;
  summary: string;
  contacts: { label: string; Icon: LucideIcon }[];
  navigation: { title: string; links: { name: string; path: string }[] }[];
  policies: { label: string; path: string }[];
  mediaLinks: { Icon: LucideIcon; path: string }[];
};
