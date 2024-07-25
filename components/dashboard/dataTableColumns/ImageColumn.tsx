"use client";

import Image from "next/image";
import { FC } from "react";

export const ImageColumn: FC<{
  row: any;
  accessorKey: string;
}> = ({ row, accessorKey }) => {
  const imageUrl = row.getValue(`${accessorKey}`);

  return (
    <Image
      src={imageUrl}
      width="64"
      height="64"
      alt={`${accessorKey}`}
      className="w-14 h-14 rounded-md object-cover shrink-0"
    />
  );
};
