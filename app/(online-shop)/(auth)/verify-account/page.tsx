"use client";

import Link from "next/link";
import { FC } from "react";
import { ArrowLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyAccount: FC = () => {
  return (
    <>
      <div className="p-4">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl font-bold">Verify your Email</h2>
          <p className="font-thin text-sm">
            We sent a one-time code to your email address to confirm
          </p>
        </div>

        <div className="">
          <form className="space-y-6 w-[70%] mx-auto">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
              >
                Verify Email
              </button>
            </div>
          </form>
        </div>

        <p className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Back to Signup
          </Link>
        </p>
      </div>
    </>
  );
};

export default VerifyAccount;
