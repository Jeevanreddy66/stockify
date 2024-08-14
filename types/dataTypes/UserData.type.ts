import type { Role, User, UserStatus } from "@prisma/client";

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

export type UserWithRole = User & {
  role: Role;
};
