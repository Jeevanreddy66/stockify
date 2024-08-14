"use client";

import type { PasswordInputPropsType } from "@/types";

import { FC, useState } from "react";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import { cn, generatePassword } from "@/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const PasswordInput: FC<PasswordInputPropsType> = ({
  register,
  errors,
  label,
  name,
  required = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleShowPassword = (): void =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleGeneratePassword = (): void => {
    const newPassword = generatePassword();
    setPassword(newPassword);
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-2 flex-nowrap">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" onClick={handleGeneratePassword}>
                <RefreshCcw className="w-4 h-4 text-slate-500 dark:text-slate-200 mr-1" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-muted-foreground">Generate Strong Password</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="relative">
        <input
          id={name}
          type={isPasswordVisible ? "text" : "password"}
          placeholder={label}
          {...register(`${name}`, {
            required,
            minLength: {
              value: 8,
              message: `${label} must be at least 8 characters long`,
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
              message: `${label} must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol`,
            },
          })}
          defaultValue={password}
          className={cn(
            "block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            errors[`${name}`] && "!ring-red-600"
          )}
        />

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
      </div>
      {errors[`${name}`] && (
        <span className="font-light text-xs text-red-600">
          {errors[`${name}`].message || `${label} is Required`}
        </span>
      )}
    </div>
  );
};
