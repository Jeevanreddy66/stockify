"use server";

import type { WarehouseDataType } from "@/types";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";

export async function createWarehouse(warehouseData: WarehouseDataType) {
  const slug = warehouseData.slug;

  try {
    const isWarehouseExists = await prisma.warehouse.findUnique({
      where: {
        slug,
      },
    });

    if (isWarehouseExists) return isWarehouseExists;

    const newWarehouse = await prisma.warehouse.create({
      data: warehouseData,
    });

    revalidatePath("/dashboard/warehouses");

    return newWarehouse;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function createBulkWarehouses(
  warehousesData: WarehouseDataType[]
) {
  try {
    for (const warehouse of warehousesData) {
      await createWarehouse(warehouse);
    }
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getAllWarehouses() {
  try {
    const warehouses = await prisma.warehouse.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return warehouses;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getWarehouseById(id: string) {
  try {
    const warehouse = await prisma.warehouse.findUnique({
      where: { id },
    });

    return warehouse;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function updateWarehouseById(
  id: string,
  warehouseData: WarehouseDataType
) {
  try {
    const slug = warehouseData.slug;
    const isWarehouseExists = await prisma.warehouse.findUnique({
      where: {
        slug,
      },
    });

    if (isWarehouseExists)
      return {
        message: `Warehouse already exists with this name. Please use another name`,
      };

    const updatedWarehouse = await prisma.warehouse.update({
      where: { id },
      data: warehouseData,
    });

    revalidatePath("/dashboard/warehouses");

    return updatedWarehouse;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function deleteWarehouse(id: string) {
  try {
    const deletedWarehouse = await prisma.warehouse.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedWarehouse,
    };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}
