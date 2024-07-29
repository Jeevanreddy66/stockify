import { BrandStatus } from "@prisma/client";

export type BrandDataType = {
  title: string;
  slug: string;
  status: BrandStatus;
  logo: string;
};
