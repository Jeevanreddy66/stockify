"use client";

import type { FormOptionsDataType, InitialFormDataType } from "@/types";

import { FC, useCallback, useEffect, useState } from "react";
import {
  getAllBrands,
  getAllCategories,
  getAllSuppliers,
  getAllUnits,
  getAllWarehouses,
} from "@/actions";
import { AddProduct } from "@/components/dashboard";

const AddProductPage: FC = () => {
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

  return <AddProduct formOptionsData={formOptionsData} />;
};

export default AddProductPage;
