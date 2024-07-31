import type { SupplierStatus } from "@prisma/client";

export type SupplierDataType = {
  name: string;
  slug: string;
  companyName: string;
  vatNumber: string;
  imageUrl: string;
  status: SupplierStatus;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};
