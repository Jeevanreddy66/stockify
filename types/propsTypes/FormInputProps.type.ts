import type { LucideIcon } from "lucide-react";

export type FormInputPropsType = {
  type: string;
  Icon: LucideIcon;
  label: string;
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
};
