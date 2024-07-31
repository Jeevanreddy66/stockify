"use server";

import type { UnitDataType } from "@/types";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";

export async function createUnit(unitData: UnitDataType) {
  try {
    const shortName = unitData.shortName;

    const isUnitExists = await prisma.unit.findUnique({ where: { shortName } });

    if (isUnitExists) return isUnitExists;

    const newUnit = await prisma.unit.create({ data: unitData });

    revalidatePath("/dashboard/units");

    return newUnit;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function createBulkUnits(unitsData: UnitDataType[]) {
  try {
    for (const unit of unitsData) {
      await createUnit(unit);
    }
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getAllUnits() {
  try {
    const units = await prisma.unit.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return units;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getUnitById(id: string) {
  try {
    const unit = await prisma.unit.findUnique({
      where: { id },
    });

    return unit;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function updateUnitById(id: string, unitData: UnitDataType) {
  try {
    const shortName = unitData.shortName;

    const isUnitExists = await prisma.unit.findUnique({ where: { shortName } });

    if (isUnitExists)
      return {
        message: `This Unit already exists. No need to add another`,
      };

    const updatedUnit = await prisma.unit.update({
      where: { id },
      data: unitData,
    });

    revalidatePath("/dashboard/units");

    return updatedUnit;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function deleteUnit(id: string) {
  try {
    const deletedUnit = await prisma.unit.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedUnit,
    };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);
  }
}
