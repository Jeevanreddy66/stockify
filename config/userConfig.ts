import { SelectOptionsType } from "@/types";

export const userStatusOptions: SelectOptionsType[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "In-Active" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "PENDING", label: "Pending" },
  { value: "DEACTIVATED", label: "De-Activated" },
  { value: "BANNED", label: "Banned" },
];
