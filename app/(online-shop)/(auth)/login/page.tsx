"use client";

import Link from "next/link";
import { FC } from "react";
import { Lock, Mail } from "lucide-react";
import { FormInput } from "@/components/global";

const LoginPage: FC = () => {
  return (
    <div className="p-4">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold">Login to your Account</h2>
        <p className="font-thin text-sm">
          Welcome Back! Fill in your details to login:
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

          <FormInput
            type="password"
            Icon={Lock}
            label="Password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Not yet Registered?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
