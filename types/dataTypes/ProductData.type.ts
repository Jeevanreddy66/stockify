import type {
  BarcodeType,
  ProductStatus,
  ProductTaxMethod,
  Product,
  WarehouseProduct,
  SupplierProduct,
} from "@prisma/client";

export type ProductWithRelations = Product & {
  warehouses: WarehouseProduct[];
  suppliers: SupplierProduct[];
};

export type ProductDataType = {
  id?: string;
  title: string;
  barcodeType: BarcodeType;
  productCode: string;
  details: string;
  productCost: number;
  productPrice: number;
  alertQty: number;
  productTax: number;
  stockQty: number;
  status: ProductStatus;
  taxMethod: ProductTaxMethod;
  images: string[];
  expiryDate: string;
  batchNumber: string;
  isFeatured: boolean;
  categoryId: string;
  brandId: string;
  unitId: string;
  warehouses: { warehouseId: string }[];
  suppliers: { supplierId: string }[];
};
