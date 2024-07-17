"use client";

import { FC } from "react";
import { BaggageClaim } from "lucide-react";

export const Logo: FC = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-500 text-slate-50 dark:text-slate-200">
          <BaggageClaim className="w-5 h-5" />
        </div>

        <h2 className="text-lg font-semibold">Stockify</h2>
      </div>
    </>
  );
};
