"use server";

import type { ProductDataType, ProductWithRelations } from "@/types";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib";

export async function createProduct(productData: ProductDataType) {
  const productCode = productData.productCode;
  try {
    const isProductExists = await prisma.product.findUnique({
      where: {
        productCode,
      },
    });

    if (isProductExists)
      return {
        error: "This Product already Exists",
        data: isProductExists,
        success: false,
      };

    const newProduct = await prisma.product.create({
      data: {
        title: productData.title,
        barcodeType: productData.barcodeType,
        productCode: productData.productCode,
        details: productData.details,
        productCost: productData.productCost,
        productPrice: productData.productPrice,
        alertQty: productData.alertQty,
        productTax: productData.productTax,
        stockQty: productData.stockQty,
        status: productData.status,
        taxMethod: productData.taxMethod,
        images: productData.images,
        expiryDate: productData.expiryDate,
        batchNumber: productData.batchNumber,
        isFeatured: productData.isFeatured,
        category: { connect: { id: productData.categoryId } },
        brand: { connect: { id: productData.brandId } },
        unit: { connect: { id: productData.unitId } },
        warehouses: {
          create: productData.warehouses?.map((warehouse) => ({
            warehouse: { connect: { id: warehouse.warehouseId } },
          })),
        },
        suppliers: {
          create: productData.suppliers?.map((supplier) => ({
            supplier: { connect: { id: supplier.supplierId } },
          })),
        },
      },
      include: {
        warehouses: true,
        suppliers: true,
      },
    });

    revalidatePath("/dashboard/products");

    return { error: "", data: newProduct, success: true };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return {
      error: "Something went wrong, Please try again!",
      data: null,
      success: false,
    };
  }
}

export async function createBulkProducts(
  productsproductData: ProductDataType[]
) {
  try {
    for (const product of productsproductData) {
      await createProduct(product);
    }
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getAllProducts(): Promise<ProductWithRelations[] | null> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        warehouses: {
          include: {
            warehouse: true,
          },
        },
        suppliers: {
          include: {
            supplier: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        warehouses: true,
        suppliers: true,
        category: true,
      },
    });

    if (!product) return null;

    return product;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function updateProductById(
  id: string,
  productData: ProductDataType
) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: productData.title,
        barcodeType: productData.barcodeType,
        productCode: productData.productCode,
        details: productData.details,
        productCost: productData.productCost,
        productPrice: productData.productPrice,
        alertQty: productData.alertQty,
        productTax: productData.productTax,
        stockQty: productData.stockQty,
        status: productData.status,
        taxMethod: productData.taxMethod,
        images: productData.images,
        expiryDate: productData.expiryDate,
        batchNumber: productData.batchNumber,
        isFeatured: productData.isFeatured,
        category: { connect: { id: productData.categoryId } },
        brand: { connect: { id: productData.brandId } },
        unit: { connect: { id: productData.unitId } },
        warehouses: {
          deleteMany: {}, // Remove all existing warehouse associations
          create: productData.warehouses.map((warehouse) => ({
            warehouse: { connect: { id: warehouse.warehouseId } },
          })),
        },
        suppliers: {
          deleteMany: {}, // Remove all existing supplier associations
          create: productData.suppliers.map((supplier) => ({
            supplier: { connect: { id: supplier.supplierId } },
          })),
        },
      },
    });

    revalidatePath("/dashboard/products");

    return updatedProduct;
  } catch (error: any) {
    console.log(`Error : ${error.message}`);

    return null;
  }
}

export async function deleteProduct(id: string) {
  try {
    const deletedProduct = // Start a transaction to ensure atomic operations
      await prisma.$transaction([
        // Delete WarehouseProduct entries
        prisma.warehouseProduct.deleteMany({
          where: {
            productId: id,
          },
        }),
        // Delete SupplierProduct entries
        prisma.supplierProduct.deleteMany({
          where: {
            productId: id,
          },
        }),
        // Delete the Product entry
        prisma.product.delete({
          where: {
            id: id,
          },
        }),
      ]);

    return {
      success: true,
      productData: deletedProduct,
    };
  } catch (error: any) {
    console.log(`Error : ${error.message}`);
  }
}

// const newProductData: ProductDataType = {
//   title: "New Product",
//   barcodeType: BarcodeType.CODE128,
//   productCode: "P1234567890",
//   details: "This is a new product",
//   productCost: 100.0,
//   productPrice: 150.0,
//   alertQty: 10,
//   productTax: 15.0,
//   stockQty: 50,
//   status: ProductStatus.AVAILABLE,
//   taxMethod: ProductTaxMethod.INCLUSIVE,
//   images: ["image1.png", "image2.png"],
//   categoryId: "category-id",
//   brandId: "brand-id",
//   unitId: "unit-id",
//   warehouses: [{ warehouseId: "warehouse-id-1" }],
//   suppliers: [{ supplierId: "supplier-id-1" }]
// };
