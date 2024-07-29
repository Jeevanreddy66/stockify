import type { Brand } from "@prisma/client";

export type AddBrandPropsType = {
  isEdit?: boolean;
  initialData?: Brand;
};
