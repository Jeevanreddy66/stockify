import { CategoryStatus } from "@prisma/client";

export type CategoryDataType = {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  status: CategoryStatus;
};

export type ExcelCategoryDataType = {
  Image?: string;
  Title: string;
  Description?: string;
  Status?: string;
};
