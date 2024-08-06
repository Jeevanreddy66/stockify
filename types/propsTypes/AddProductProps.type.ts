import type {
  Brand,
  Category,
  Supplier,
  Unit,
  Warehouse,
} from "@prisma/client";
import type { SelectOptionsType } from "../globalTypes";
import { ProductWithRelations } from "../dataTypes";

export type FormOptionsDataType = {
  categoriesOptions: SelectOptionsType[];
  brandsOptions: SelectOptionsType[];
  warehousesOptions: SelectOptionsType[];
  suppliersOptions: SelectOptionsType[];
  unitsOptions: SelectOptionsType[];
};

export type InitialFormDataType = {
  brands: Brand[];
  categories: Category[];
  suppliers: Supplier[];
  warehouses: Warehouse[];
  units: Unit[];
};

export type AddProductPropsType = {
  isEdit?: boolean;
  initialData?: ProductWithRelations | null;
  formOptionsData: FormOptionsDataType;
};
