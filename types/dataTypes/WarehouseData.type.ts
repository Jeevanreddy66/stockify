import type { WarehouseStatus } from "@prisma/client";

export type WarehouseDataType = {
  name: string;
  slug: string;
  logo: string;
  contactPerson: string;
  status: WarehouseStatus;
  email: string;
  phone: string;
  city: string;
  country: string;
  zipCode: string;
};
