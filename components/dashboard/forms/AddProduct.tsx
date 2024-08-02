"use client";

import type {
  AddProductFormType,
  AddProductPropsType,
  SelectOptionsType,
} from "@/types";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { RefreshCcw } from "lucide-react";
import JsBarcode from "jsbarcode";
import placholderImage from "@/public/placeholder.svg";
import { generateBarcode } from "@/lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormSelect,
  ImageUpload,
  MultipleImageUpload,
  TextArea,
  TextInput,
} from "@/components/global";
import { FormHeader } from "./FormHeader";
import Image from "next/image";

export const AddProduct: FC<AddProductPropsType> = ({
  isEdit = false,
  initialData,
  formOptionsData,
}) => {
  const taxMethodOptions: SelectOptionsType[] = [
    { value: "INCLUSIVE", label: "Inclusive" },
    { value: "EXCLUSIVE", label: "Exclusive" },
  ];

  const statusOptions: SelectOptionsType[] = [
    { value: "AVAILABLE", label: "Available" },
    { value: "FEATURED", label: "Featured" },
    { value: "PENDING", label: "Pending" },
    { value: "OUT_OF_STOCK", label: "Out of Stock" },
    { value: "DISCONTINUED", label: "Discontinued" },
  ];

  const barcodeTypeOptions: SelectOptionsType[] = [
    { value: "CODE128", label: "CODE128" },
    { value: "EAN13", label: "EAN13" },
    { value: "UPC", label: "UPC" },
    { value: "ITF14", label: "ITF14" },
  ];

  const {
    brandsOptions,
    categoriesOptions,
    suppliersOptions,
    warehousesOptions,
    unitsOptions,
  } = formOptionsData;

  const [brandValue, setBrandValue] = useState<any>(null);
  const [categoryValue, setCategoryValue] = useState<any>(null);
  const [supplierValue, setSupplierValue] = useState<any>(null);
  const [warehouseValue, setWarehouseValue] = useState<any>(null);
  const [taxMethod, setTaxMethod] = useState<any>(null);

  const [statusValue, setStatusValue] = useState<any>(null);

  const [barcodeType, setBarcodeType] = useState<any>(barcodeTypeOptions[0]);
  const [barcodeValue, setBarcodeValue] = useState<string>("");

  const [productImages, setProductImages] = useState<string[]>(
    new Array(4).fill(placholderImage)
  );

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormType>({ defaultValues: {} });

  const handleBack = (): void => router.back();

  const handleGenerateBarcode = (): void => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, generateBarcode(), {
      format: barcodeType.value,
    });
    const barcode = canvas.toDataURL("image/png");
    setBarcodeValue(generateBarcode());
  };

  const saveProduct = async (data: AddProductFormType): Promise<void> => {};

  return (
    <form onSubmit={handleSubmit(saveProduct)}>
      <FormHeader
        title="Product"
        goBack={handleBack}
        loading={loading}
        isEdit={isEdit}
      />

      <div className="grid grid-cols-12 gap-6 my-6">
        <div className="col-span-full lg:col-span-8 space-y-6">
          <Card>
            <CardContent className="mt-3">
              <div className="grid gap-4">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Product Title"
                  name="title"
                  required
                />

                <TextArea
                  register={register}
                  errors={errors}
                  label="Product Details"
                  name="details"
                  placeholder="Enter Product Details.."
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Brand"
                value={brandValue}
                setValue={setBrandValue}
                options={brandsOptions}
                href="/dashboard/brands/new"
                tooltipText="New Brand"
              />

              <FormSelect
                label="Category"
                value={categoryValue}
                setValue={setCategoryValue}
                options={categoriesOptions}
                href="/dashboard/categories/new"
                tooltipText="New Category"
              />

              <FormSelect
                label="Supplier"
                value={supplierValue}
                setValue={setSupplierValue}
                options={suppliersOptions}
                href="/dashboard/suppliers/new"
                tooltipText="New Supplier"
                isMultiple
              />

              <FormSelect
                label="Warehouse"
                value={warehouseValue}
                setValue={setWarehouseValue}
                options={warehousesOptions}
                href="/dashboard/warehouses/new"
                tooltipText="New Warehouse"
                isMultiple
              />

              <FormSelect
                label="Unit"
                value={warehouseValue}
                setValue={setWarehouseValue}
                options={unitsOptions}
                href="/dashboard/units/new"
                tooltipText="New Unit"
              />

              <TextInput
                register={register}
                errors={errors}
                label="Alert Quantity"
                name="alertQty"
                type="number"
                required
                tooltipText="Below this stock quantity, it will enable low stock warning"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                register={register}
                errors={errors}
                label="Product Cost"
                name="productCost"
                type="number"
                required
              />

              <TextInput
                register={register}
                errors={errors}
                label="Product Price"
                name="productPrice"
                type="number"
                required
              />

              <TextInput
                register={register}
                errors={errors}
                label="Product Tax"
                name="productTax"
                type="number"
                required
                tooltipText="Tax entered is in percentage. Eg: 3 => 3%"
                unit="%"
              />

              <FormSelect
                label="Tax Method"
                value={taxMethod}
                setValue={setTaxMethod}
                options={taxMethodOptions}
              />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 grid md:grid-cols-2 lg:grid-cols-1 gap-6">
          <Card className="w-full h-fit">
            <CardContent className="mt-3">
              <FormSelect
                label="Status"
                value={statusValue}
                setValue={setStatusValue}
                options={statusOptions}
              />
            </CardContent>
          </Card>

          <Card className="w-full h-fit">
            <CardContent className="mt-3">
              <FormSelect
                label="Barcode Symbology"
                value={barcodeType}
                setValue={setBarcodeType}
                options={barcodeTypeOptions}
              />

              <div className="mt-4 w-full flex items-center gap-2 flex-nowrap">
                <input
                  type="text"
                  value={barcodeValue}
                  placeholder="Generated Barcode"
                  readOnly
                  className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleGenerateBarcode}
                >
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full h-fit">
            <CardContent className="mt-3">
              <TextInput
                register={register}
                errors={errors}
                label="Stock Quantity"
                name="stockQty"
                type="number"
                required
              />
            </CardContent>
          </Card>

          <Card className="overflow-hidden w-full">
            <CardContent>
              <MultipleImageUpload
                label="Product Images"
                images={productImages}
                setImages={setProductImages}
                endpoint="productImages"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};
