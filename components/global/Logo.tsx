"use client";

import Link from "next/link";
import { FC } from "react";
import { Luggage } from "lucide-react";

export const Logo: FC = () => {
  return (
    <>
      <Link href="/" className="flex items-center gap-2">
        <div className="flex items-center justify-center w-9 h-9 rounded-md bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900">
          <Luggage className="w-5 h-5" />
        </div>

        <h2 className="text-lg font-semibold">Stockify</h2>
      </Link>
    </>
  );
};
