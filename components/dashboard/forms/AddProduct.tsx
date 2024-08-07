"use client";

import type {
  AddProductFormType,
  AddProductPropsType,
  ProductDataType,
} from "@/types";

import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import placeholderImage from "@/public/placeholder.svg";
import { createProduct, updateProductById } from "@/actions";
import { taxMethodOptions, statusOptions, barcodeTypeOptions } from "@/config";
import { convertDateToISO } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormSelect,
  GenerateBarcode,
  MultipleImageUpload,
  TextArea,
  TextInput,
} from "@/components/global";
import { FormHeader } from "./FormHeader";
import { FormFooter } from "./FormFooter";

export const AddProduct: FC<AddProductPropsType> = ({
  isEdit = false,
  initialData,
  formOptionsData,
}) => {
  const {
    brandsOptions,
    categoriesOptions,
    suppliersOptions,
    warehousesOptions,
    unitsOptions,
  } = formOptionsData;

  const [formData, setFormData] = useState<AddProductFormType>({
    title: "",
    details: "",
    productCost: 0,
    productPrice: 0,
    stockQty: 1,
    alertQty: 1,
    productTax: 0,
    expiryDate: Date.now().toString(),
    batchNumber: "",
    isFeatured: false,
  });

  const [brandValue, setBrandValue] = useState<any>(null);
  const [categoryValue, setCategoryValue] = useState<any>(null);
  const [supplierValue, setSupplierValue] = useState<any>(null);
  const [warehouseValue, setWarehouseValue] = useState<any>(null);
  const [unitValue, setUnitValue] = useState<any>(null);
  const [taxMethod, setTaxMethod] = useState<any>(null);

  const [statusValue, setStatusValue] = useState<any>(null);

  const [barcodeType, setBarcodeType] = useState<any>(barcodeTypeOptions[0]);
  const [barcodeValue, setBarcodeValue] = useState<string>("");

  const [productImages, setProductImages] = useState<string[]>(
    new Array(4).fill(placeholderImage)
  );

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormType>({ defaultValues: formData });

  const handleBack = (): void => router.back();

  const saveProduct = async (data: AddProductFormType): Promise<void> => {
    try {
      setLoading(true);

      const {
        title,
        details,
        productCost,
        productPrice,
        stockQty,
        alertQty,
        productTax,
        expiryDate,
        batchNumber,
        isFeatured,
      } = data;

      const productData: ProductDataType = {
        title,
        barcodeType: barcodeType.value,
        productCode: barcodeValue,
        details,
        productCost: Number(productCost),
        productPrice: Number(productPrice),
        alertQty: Number(alertQty),
        stockQty: Number(stockQty),
        productTax: Number(productTax),
        status: statusValue.value,
        taxMethod: taxMethod.value,
        images: productImages.filter((item) => typeof item === "string"),
        expiryDate: convertDateToISO(expiryDate),
        batchNumber,
        isFeatured,
        categoryId: categoryValue.value,
        brandId: brandValue.value,
        unitId: unitValue.value,
        warehouses: warehouseValue.map(({ value }: any) => {
          return { warehouseId: value };
        }),
        suppliers: supplierValue.map(({ value }: any) => {
          return { supplierId: value };
        }),
      };

      if (isEdit) {
        const response: any = await updateProductById(
          initialData?.id!,
          productData
        );
        toast.success("Product Updated Successfully!👍");
      } else {
        const res = await createProduct(productData);

        if (res.error)
          // Send Success Toast Message
          toast.error(res.error);
        else toast.success("Product Created Successfully!👍");
      }

      setLoading(false);

      // Reset Form Data
      reset();
      setStatusValue(null);
      setProductImages(new Array(4).fill(placeholderImage));

      // Route back to categories page
      router.push("/dashboard/products");
    } catch (error: any) {
      console.log(`Error is: ${error.message}`);
      toast.error("⚠️ Please enter all the fields!");
      setLoading(false);

      toast.error(`Error Occured : ${error.message}`);
    }
  };

  useEffect(() => {
    reset(formData);

    if (initialData) {
      setFormData({
        title: initialData.title,
        details: initialData.details,
        productCost: initialData.productCost,
        productPrice: initialData.productPrice,
        stockQty: initialData.stockQty,
        alertQty: initialData.alertQty,
        productTax: initialData.productTax,
        expiryDate: new Date(initialData?.expiryDate)
          .toISOString()
          .split("T")[0],
        batchNumber: initialData.batchNumber,
        isFeatured: initialData.isFeatured,
      });

      setBrandValue({
        value: initialData.brandId,
        label: brandsOptions.find(({ value }) => value === initialData.brandId)
          ?.label,
      });

      setCategoryValue({
        value: initialData.categoryId,
        label: categoriesOptions.find(
          ({ value }) => value === initialData.categoryId
        )?.label,
      });

      setUnitValue({
        value: initialData.unitId,
        label: unitsOptions.find(({ value }) => value === initialData.unitId)
          ?.label,
      });

      setWarehouseValue(
        initialData.warehouses.map((warehouse: any) => {
          const warehouseOption = warehousesOptions.find(
            ({ value }) => value === warehouse.warehouseId
          );
          return {
            value: warehouseOption?.value,
            label: warehouseOption?.label,
          };
        })
      );

      setSupplierValue(
        initialData.suppliers.map((supplier: any) => {
          const supplierOption = suppliersOptions.find(
            ({ value }) => value === supplier.supplierId
          );
          return {
            value: supplierOption?.value,
            label: supplierOption?.label,
          };
        })
      );

      setTaxMethod(
        initialData
          ? {
              value: initialData.taxMethod,
              label:
                initialData.taxMethod.charAt(0).toUpperCase() +
                initialData.taxMethod.slice(1).toLowerCase(),
            }
          : null
      );

      setStatusValue(() => {
        return initialData
          ? {
              value: initialData.status,
              label:
                initialData.status.charAt(0).toUpperCase() +
                initialData.status.slice(1).toLowerCase(),
            }
          : null;
      });

      setBarcodeType({
        value: initialData.barcodeType,
        label: initialData.barcodeType,
      });

      setBarcodeValue(initialData.productCode);

      const filledImages = new Array(4)
        .fill(placeholderImage)
        .map((_, i) => initialData.images[i] || placeholderImage);

      setProductImages(filledImages);
    } else {
      setBrandValue(null);
      setCategoryValue(null);
      setUnitValue(null);
      setWarehouseValue(null);
      setWarehouseValue(null);
      setSupplierValue(null);
      setTaxMethod(null);
      setStatusValue(null);
      setBarcodeType(barcodeTypeOptions[0]);
      setBarcodeValue("");
      setProductImages(new Array(4).fill(placeholderImage));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialData,
    reset,
    brandsOptions,
    categoriesOptions,
    warehousesOptions,
    suppliersOptions,
    unitsOptions,
  ]);

  return (
    <form onSubmit={handleSubmit(saveProduct)}>
      <FormHeader
        title="Product"
        goBack={handleBack}
        href="/products"
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
                value={unitValue}
                setValue={setUnitValue}
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

              <TextInput
                register={register}
                errors={errors}
                label="Expiry Date"
                name="expiryDate"
                type="date"
                required
              />

              <TextInput
                register={register}
                errors={errors}
                label="Batch Number"
                name="batchNumber"
                required
              />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-full lg:col-span-4 grid md:grid-cols-2 lg:grid-cols-1 gap-6">
          <Card className="w-full h-fit">
            <CardContent className="mt-3 space-y-3">
              <FormSelect
                label="Status"
                value={statusValue}
                setValue={setStatusValue}
                options={statusOptions}
              />

              <div className="flex items-center gap-3">
                <input
                  {...register("isFeatured")}
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  className="h-4 w-4 text-indigo-600 rounded focus:ring-0"
                />

                <div className="flex flex-col justify-start">
                  <label htmlFor="isFeatured" className="text-sm font-medium">
                    Featured
                  </label>
                  <p className="text-xs text-thin text-muted-foreground italic">
                    Featured products will be shown in POS.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full h-fit">
            <CardContent className="mt-3">
              <GenerateBarcode
                isEdit={isEdit}
                barcodeType={barcodeType}
                setBarcodeType={setBarcodeType}
                barcodeValue={barcodeValue}
                setBarcodeValue={setBarcodeValue}
              />
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

      <FormFooter
        isEdit={isEdit}
        loading={loading}
        href="/products"
        title="Product"
      />
    </form>
  );
};
