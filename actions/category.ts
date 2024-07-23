"use server";

import type { CategoryDataType } from "@/types";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";

export async function createCategory(categoryData: CategoryDataType) {
  try {
    const newCategory = await prisma.category.create({
      data: categoryData,
    });

    revalidatePath("/dashboard/categories");

    return newCategory;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}
