"use client";

import type { TextInputPropsType } from "@/types";

import { FC, useState } from "react";
import { CircleHelp, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TextInput: FC<TextInputPropsType> = ({
  register,
  errors,
  label,
  type = "text",
  name,
  required = false,
  tooltipText = "",
  unit,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleShowPassword = (): void =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2 flex-nowrap">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>

        {tooltipText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleHelp className="w-4 h-4 text-slate-500 dark:text-slate-200" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-muted-foreground">{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative">
        <input
          id={name}
          type={isPasswordVisible ? "text" : type}
          placeholder={label}
          {...register(`${name}`, { required })}
          className={cn(
            "block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            errors[`${name}`] && "!ring-red-600"
          )}
        />
        {unit && (
          <p className="absolute right-3 top-2 text-gray-400 bg-white">
            {unit}
          </p>
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={handleShowPassword}
            className="absolute right-4 top-3 text-gray-400 bg-white"
          >
            {isPasswordVisible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {errors[`${name}`] && (
        <span className="font-light text-xs text-red-600">
          {label} is required
        </span>
      )}
    </div>
  );
};
