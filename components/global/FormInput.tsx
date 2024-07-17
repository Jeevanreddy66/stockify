"use client";

import type { FormInputPropsType } from "@/types";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const FormInput: FC<FormInputPropsType> = ({
  type,
  name,
  Icon,
  label,
  id,
  placeholder,
  required = false,
}) => {
  const pathname = usePathname();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleShowPasswordChange = (): void =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>

        {type === "password" && pathname === "/login" && (
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
        )}
      </div>
      <div className="mt-2 relative">
        <Icon className="w-4 h-4 absolute left-2 top-3 text-gray-400" />
        <input
          id={id}
          name={name}
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          required={required}
          autoComplete={type}
          className="block w-full rounded-md border-0 px-8 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={handleShowPasswordChange}
            className="absolute right-4 top-3 text-gray-400"
          >
            {isPasswordVisible ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
