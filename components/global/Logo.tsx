"use client";

import { FC } from "react";
import { Luggage } from "lucide-react";

export const Logo: FC = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-slate-900 text-white p-1 rounded-lg flex items-center justify-center">
          <Luggage className="w-5 h-5" />
        </div>

        <h2 className="text-xl font-semibold">Stockify</h2>
      </div>
    </>
  );
};
