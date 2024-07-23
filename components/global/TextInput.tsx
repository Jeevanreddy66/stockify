"use client";

import type { TextInputPropsType } from "@/types";

import { FC } from "react";
import { cn } from "@/lib/utils";

export const TextInput: FC<TextInputPropsType> = ({
  register,
  errors,
  label,
  type = "text",
  name,
  required = false,
}) => {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={label}
        {...register(`${name}`, { required })}
        className={cn(
          "block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          errors[`${name}`] && "!ring-red-600"
        )}
      />
      {errors[`${name}`] && (
        <span className="font-light text-xs text-red-600">
          {label} is required
        </span>
      )}
    </div>
  );
};
