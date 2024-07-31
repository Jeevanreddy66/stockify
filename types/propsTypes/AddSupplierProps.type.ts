import type { Supplier } from "@prisma/client";

export type AddSupplierPropsType = {
  isEdit?: boolean;
  initialData?: Supplier;
};
