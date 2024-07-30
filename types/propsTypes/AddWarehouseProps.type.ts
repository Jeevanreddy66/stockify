import type { Warehouse } from "@prisma/client";

export type AddWarehousePropsType = {
  isEdit?: boolean;
  initialData?: Warehouse;
};
