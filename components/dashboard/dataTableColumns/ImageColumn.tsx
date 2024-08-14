"use client";

import Image from "next/image";
import { FC } from "react";
import placeholderImage from "@/public/placeholder.svg";

export const ImageColumn: FC<{
  row: any;
  accessorKey: string;
}> = ({ row, accessorKey }) => {
  const imageUrl = row.getValue(`${accessorKey}`);

  return (
    <Image
      src={
        (typeof imageUrl == "string" ? imageUrl : imageUrl[0]) ||
        placeholderImage
      }
      width="64"
      height="64"
      alt={`${accessorKey}`}
      className="w-14 h-14 rounded-md object-cover shrink-0"
    />
  );
};
