"use server";

import type { CategoryDataType } from "@/types";

import { revalidatePath } from "next/cache";
import { ModelType, prisma } from "@/lib";

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

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    return category;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function updateCategoryById(
  id: string,
  categoryData: CategoryDataType
) {
  try {
    const slug = categoryData.slug;
    const isCategoryExists = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (isCategoryExists)
      return {
        message: `Category already exists with this title. Please use another title`,
      };

    const updatedcategory = await prisma.category.update({
      where: { id },
      data: categoryData,
    });

    revalidatePath("/dashboard/categories");

    return updatedcategory;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function deleteItem(id: string, model: ModelType) {
  try {
    const deletedItem = await prisma[`${model}`].delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedItem,
    };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);
  }
}
