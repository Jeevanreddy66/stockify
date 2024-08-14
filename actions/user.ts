"use server";

import type { UserDataType } from "@/types";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { prisma } from "@/lib";

export async function createUser(userData: UserDataType) {
  try {
    const email = userData.email;
    const isUserExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserExists) return isUserExists;

    // Hash User Password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        plainPassword: userData.password,
      },
    });

    revalidatePath("/dashboard/users");

    return newUser;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: { role: true },
    });

    return users;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function updateUserById(id: string, userData: UserDataType) {
  try {
    const email = userData.email;
    const isUserExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    let updatedUser;

    // Hash User Password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    if (isUserExists) {
      if (isUserExists.id === id)
        updatedUser = await prisma.user.update({
          where: { id, email },
          data: {
            ...userData,
            password: hashedPassword,
            plainPassword: userData.password,
          },
        });
      else {
        return {
          message: `User already exists with this email. Please use another email`,
        };
      }
    } else {
      updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...userData,
          password: hashedPassword,
          plainPassword: userData.password,
        },
      });
    }

    revalidatePath("/dashboard/users");

    return updatedUser;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedUser,
    };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);
  }
}
