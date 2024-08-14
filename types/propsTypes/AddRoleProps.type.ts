import type { Role } from "@prisma/client";

export type AddRolePropsType = {
  isEdit?: boolean;
  initialData?: Role;
};
