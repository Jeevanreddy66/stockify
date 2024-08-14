import type { User } from "@prisma/client";
import type { SelectOptionsType } from "../globalTypes";

export type AddUserPropsType = {
  isEdit?: boolean;
  initialData?: User;
  roleOptions: SelectOptionsType[];
};
