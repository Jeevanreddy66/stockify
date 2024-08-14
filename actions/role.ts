"use server";

import type { RoleDataType } from "@/types";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";

export async function createRole(roleData: RoleDataType) {
  const roleName = roleData.roleName;
  try {
    const isRoleExists = await prisma.role.findUnique({ where: { roleName } });

    if (isRoleExists) return isRoleExists;

    const newRole = await prisma.role.create({ data: roleData });

    revalidatePath("/dashboard/roles");

    return newRole;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getAllRoles() {
  try {
    const roles = await prisma.role.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return roles;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getRoleById(id: string) {
  try {
    const role = await prisma.role.findUnique({
      where: { id },
    });

    return role;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function updateRoleById(id: string, roleData: RoleDataType) {
  try {
    const roleName = roleData.roleName;
    const isRoleExists = await prisma.role.findUnique({
      where: {
        roleName,
      },
    });

    let updatedRole;

    if (isRoleExists) {
      if (isRoleExists.id === id)
        updatedRole = await prisma.role.update({
          where: { id, roleName },
          data: roleData,
        });
      else {
        return {
          message: `Role already exists with this title. Please use another title`,
        };
      }
    } else {
      updatedRole = await prisma.role.update({
        where: { id },
        data: roleData,
      });
    }

    revalidatePath("/dashboard/roles");

    return updatedRole;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function deleteRole(id: string) {
  try {
    const deletedRole = await prisma.role.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedRole,
    };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);
  }
}
