import type { Category } from "@prisma/client";

export type AddCategoryPropsType = {
  isEdit?: boolean;
  initialData?: Category | undefined;
};
