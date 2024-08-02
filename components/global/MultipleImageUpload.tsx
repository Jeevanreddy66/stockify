"use client";

import type { MultipleImageUploadPropsType } from "@/types";

import Image from "next/image";
import { FC } from "react";
import { UploadButton } from "@/lib";
import { Label } from "@/components/ui/label";

export const MultipleImageUpload: FC<MultipleImageUploadPropsType> = ({
  label,
  images,
  setImages,
  endpoint,
}) => {
  return (
    <div className="grid gap-3 mt-3">
      <Label
        htmlFor="image"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </Label>

      <div className="grid gap-2">
        <Image
          alt={`${label}1`}
          className="h-40 w-full rounded-md object-cover"
          height="300"
          src={images[0]}
          width="300"
        />
        <div className="grid grid-cols-3 gap-2">
          <Image
            alt={`${label}2`}
            className="aspect-square w-full rounded-md object-cover"
            height="80"
            src={images[1]}
            width="80"
          />
          <Image
            alt={`${label}3`}
            className="aspect-square w-full rounded-md object-cover"
            height="80"
            src={images[2]}
            width="80"
          />
          <Image
            alt={`${label}4`}
            className="aspect-square w-full rounded-md object-cover"
            height="80"
            src={images[3]}
            width="80"
          />
        </div>
      </div>

      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          let imagesArray = [...images];

          res.map((item, i) => {
            imagesArray[i] = item.url;
          });
          setImages(imagesArray);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};
