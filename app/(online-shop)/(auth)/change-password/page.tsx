"use client";

import { FC } from "react";
import { Lock } from "lucide-react";
import { FormInput } from "@/components/global";
import Link from "next/link";

const ChangePasswordPage: FC = () => {
  return (
    <>
      <div className="p-4">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl font-bold">Change your Password</h2>
          <p className="font-thin text-sm">
            Woohah! Fill in your details to change password:
          </p>
        </div>

        <div className="">
          <form className="space-y-6">
            <FormInput
              type="password"
              Icon={Lock}
              label="New Password"
              name="password"
              id="password"
              placeholder="New Password"
              required
            />

            <FormInput
              type="password"
              Icon={Lock}
              label="Confirm Password"
              name="password"
              id="password"
              placeholder="Confirm Password"
              required
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Change Password
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Changed your mind?{" "}
            <Link
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
