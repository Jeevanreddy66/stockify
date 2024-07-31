import type { UnitType } from "@prisma/client";

export type UnitDataType = {
  name: string;
  shortName: string;
  type: UnitType;
};
