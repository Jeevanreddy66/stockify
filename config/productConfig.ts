import type { SelectOptionsType } from "@/types";

export const taxMethodOptions: SelectOptionsType[] = [
  { value: "INCLUSIVE", label: "Inclusive" },
  { value: "EXCLUSIVE", label: "Exclusive" },
];

export const statusOptions: SelectOptionsType[] = [
  { value: "AVAILABLE", label: "Available" },
  { value: "PENDING", label: "Pending" },
  { value: "OUT_OF_STOCK", label: "Out of Stock" },
  { value: "DISCONTINUED", label: "Discontinued" },
];

const barcodeTypes = ["CODE128", "EAN13", "UPC", "ITF14", "EAN8", "CODE39"];

export const barcodeTypeOptions: SelectOptionsType[] = barcodeTypes.map(
  (item) => {
    return { value: item, label: item };
  }
);
