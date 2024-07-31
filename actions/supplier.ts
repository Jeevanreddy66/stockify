"use server";

import type { SupplierDataType } from "@/types";

import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

export async function createSupplier(supplierData: SupplierDataType) {
  const slug = supplierData.slug;

  try {
    const isSupplierExists = await prisma.supplier.findUnique({
      where: { slug },
    });

    if (isSupplierExists) return isSupplierExists;

    const newSupplier = await prisma.supplier.create({
      data: supplierData,
    });

    revalidatePath("/dashboard/suppliers");

    return newSupplier;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function createBulkSuppliers(suppliersData: SupplierDataType[]) {
  try {
    for (const supplier of suppliersData) {
      await createSupplier(supplier);
    }
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getAllSuppliers() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return suppliers;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getSupplierById(id: string) {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id },
    });

    return supplier;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function updateSupplierById(
  id: string,
  supplierData: SupplierDataType
) {
  try {
    const slug = supplierData.slug;
    const isSupplierExists = await prisma.supplier.findUnique({
      where: {
        slug,
      },
    });

    if (isSupplierExists)
      return {
        message: `Supplier already exists with this name. Please use another name`,
      };

    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: supplierData,
    });

    revalidatePath("/dashboard/suppliers");

    return updatedSupplier;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function deleteSupplier(id: string) {
  try {
    const deletedSupplier = await prisma.supplier.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedSupplier,
    };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}
