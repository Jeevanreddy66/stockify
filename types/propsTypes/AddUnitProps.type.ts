import type { Unit } from "@prisma/client";

export type AddUnitPropsType = {
  isEdit?: boolean;
  initialData?: Unit;
};
