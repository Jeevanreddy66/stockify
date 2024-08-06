import type { SelectOptionsType } from "../globalTypes";

export type FormSelectPropsType = {
  label: string;
  value: any;
  setValue: (value: any) => void;
  options: SelectOptionsType[];
  isMultiple?: boolean;
  href?: string;
  tooltipText?: string;
  isEdit?: boolean;
};
