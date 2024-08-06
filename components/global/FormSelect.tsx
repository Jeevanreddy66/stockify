"use client";

import type { SelectValue } from "react-tailwindcss-select/dist/components/type";
import type { FormSelectPropsType } from "@/types";

import { FC } from "react";
import Select from "react-tailwindcss-select";
import { AddNewButton } from "./AddNewButton";

export const FormSelect: FC<FormSelectPropsType> = ({
  label,
  value,
  setValue,
  options,
  isMultiple = false,
  href = "#",
  tooltipText = "",
  isEdit,
}) => {
  const handleValueChange = (option: SelectValue): void => setValue(option);

  return (
    <div className="w-full">
      <h2 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Select {label}
      </h2>

      <div className="flex items-center gap-2">
        <Select
          primaryColor="skyblue"
          value={value}
          onChange={handleValueChange}
          options={options}
          isSearchable
          isMultiple={isMultiple}
          isDisabled={isEdit}
          placeholder={`Select ${label}`}
        />

        {href && tooltipText && (
          <AddNewButton href={href} tooltipText={tooltipText} />
        )}
      </div>
    </div>
  );
};
