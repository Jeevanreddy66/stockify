"use client";

import Link from "next/link";
import { FC } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { FormInput } from "@/components/global";

const ForgotPasswordPage: FC = () => {
  return (
    <>
      <div className="p-4">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl font-bold">Forgot your Password?</h2>
          <p className="font-thin text-sm">
            No worries, we`ll send you reset instructions:
          </p>
        </div>

        <div className="">
          <form className="space-y-6">
            <FormInput
              type="email"
              Icon={Mail}
              label="Email Address"
              name="email"
              id="email"
              placeholder="Email Address"
              required
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Reset Password
              </button>
            </div>
          </form>

          <p className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <Link
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
