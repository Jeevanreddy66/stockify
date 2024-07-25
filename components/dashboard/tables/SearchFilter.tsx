"use client";

import type { SearchFilterPropsType } from "@/types";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { Search, X } from "lucide-react";

export const SearchFilter: FC<SearchFilterPropsType> = ({
  data,
  setSearchResults,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setSearchValue(e.target.value);

  useEffect(() => {
    const filteredResults = data.filter((item: any) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    setSearchResults(filteredResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="flex-1 relative md:max-w-[50%]">
      <Search className="absolute w-4 h-4 left-2 top-1/4 text-slate-400" />
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search Here.."
        className="w-full px-8 py-2 text-sm outline-none border-none rounded-md ring-1 ring-slate-400 focus:ring-indigo-600"
      />

      {searchValue && (
        <button
          onClick={() => setSearchValue("")}
          className="absolute w-4 h-4 right-4 top-1/4 hover:text-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
