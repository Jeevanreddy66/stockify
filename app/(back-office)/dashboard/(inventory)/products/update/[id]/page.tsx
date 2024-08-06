"use client";

import type { Product } from "@prisma/client";
import type {
  FormOptionsDataType,
  InitialFormDataType,
  ProductWithRelations,
} from "@/types";

import { FC, useCallback, useEffect, useState } from "react";
import {
  getAllBrands,
  getAllCategories,
  getAllSuppliers,
  getAllUnits,
  getAllWarehouses,
  getProductById,
} from "@/actions";
import { AddProduct } from "@/components/dashboard";

const EditProductPage: FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const [product, setProduct] = useState<ProductWithRelations | null>(null);

  const [initialFormData, setInitialFormData] = useState<InitialFormDataType>({
    brands: [],
    categories: [],
    warehouses: [],
    suppliers: [],
    units: [],
  });

  const [formOptionsData, setFormOptionsData] = useState<FormOptionsDataType>({
    categoriesOptions: [],
    brandsOptions: [],
    warehousesOptions: [],
    suppliersOptions: [],
    unitsOptions: [],
  });

  const getAllInitialData = useCallback(async () => {
    try {
      const [brands, categories, warehouses, suppliers, units] =
        await Promise.all([
          getAllBrands(),
          getAllCategories(),
          getAllWarehouses(),
          getAllSuppliers(),
          getAllUnits(),
        ]);

      setInitialFormData({
        brands: brands || [],
        categories: categories || [],
        warehouses: warehouses || [],
        suppliers: suppliers || [],
        units: units || [],
      });
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    getAllInitialData();
  }, [getAllInitialData]);

  useEffect(() => {
    async function getProduct(id: string) {
      try {
        const product = await getProductById(id);

        setProduct(product!);
      } catch (error: any) {
        console.log(`Error : ${error.message}`);
      }
    }

    getProduct(id!);
  }, [id]);

  useEffect(() => {
    const brandOptions = initialFormData.brands.map(({ id, title }) => ({
      value: id,
      label: title,
    }));

    const categoryOptions = initialFormData.categories.map(({ id, title }) => ({
      value: id,
      label: title,
    }));

    const warehouseOptions = initialFormData.warehouses.map(({ id, name }) => ({
      value: id,
      label: name,
    }));

    const supplierOptions = initialFormData.suppliers.map(({ id, name }) => ({
      value: id,
      label: name,
    }));

    const unitOptions = initialFormData.units.map(({ id, name, shortName }) => {
      return { value: id, label: `${name}(${shortName})` };
    });

    setFormOptionsData({
      brandsOptions: brandOptions,
      categoriesOptions: categoryOptions,
      warehousesOptions: warehouseOptions,
      suppliersOptions: supplierOptions,
      unitsOptions: unitOptions,
    });
  }, [initialFormData]);

  return (
    <AddProduct
      isEdit
      initialData={product}
      formOptionsData={formOptionsData}
    />
  );
};

export default EditProductPage;
