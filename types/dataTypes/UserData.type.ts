import type { UserStatus } from "@prisma/client";

export type UserDataType = {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  roleId: string;
  status: UserStatus;
  profileImage: string;
};
