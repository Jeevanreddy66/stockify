"use client";

import type { ImageUploadPropsType } from "@/types";

import Image from "next/image";
import { FC } from "react";
import { UploadButton } from "@/lib";
import { Label } from "@/components/ui/label";

export const ImageUpload: FC<ImageUploadPropsType> = ({
  label,
  imageUrl,
  setImageUrl,
  endpoint,
}) => {
  return (
    <div className="grid gap-3 pt-1">
      <Label htmlFor="image" className="font-semibold text-lg mt-3">
        {label}
      </Label>
      <Image
        alt={label}
        className="h-40 w-full rounded-md object-cover"
        height="300"
        src={imageUrl}
        width="300"
      />

      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => setImageUrl(res[0].url)}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};
