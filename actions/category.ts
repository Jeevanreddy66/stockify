"use server";

import type { CategoryDataType } from "@/types";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";

export async function createCategory(categoryData: CategoryDataType) {
  const slug = categoryData.slug;
  try {
    const isCategoryExists = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (isCategoryExists) return isCategoryExists;

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
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return categories;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function createBulkCategories(categoriesData: CategoryDataType[]) {
  try {
    for (const category of categoriesData) {
      await createCategory(category);
    }
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}
