"use server";

import type { BrandDataType } from "@/types";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";

export async function createBrand(brandData: BrandDataType) {
  const slug = brandData.slug;

  try {
    const isBrandExists = await prisma.brand.findUnique({
      where: {
        slug,
      },
    });

    if (isBrandExists) return isBrandExists;

    const newBrand = await prisma.brand.create({
      data: brandData,
    });

    revalidatePath("/dashboard/brands");

    return newBrand;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function createBulkBrands(brandsData: BrandDataType[]) {
  try {
    for (const brand of brandsData) {
      await createBrand(brand);
    }
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getAllBrands() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return brands;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getBrandById(id: string) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    return brand;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function updateBrandById(id: string, brandData: BrandDataType) {
  try {
    const slug = brandData.slug;
    const isBrandExists = await prisma.brand.findUnique({
      where: {
        slug,
      },
    });

    if (isBrandExists)
      return {
        message: `Brand already exists with this title. Please use another title`,
      };

    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: brandData,
    });

    revalidatePath("/dashboard/brands");

    return updatedBrand;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function deleteBrand(id: string) {
  try {
    const deletedBrand = await prisma.brand.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedBrand,
    };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);
  }
}
