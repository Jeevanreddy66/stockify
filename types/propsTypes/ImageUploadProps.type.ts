import type { ourFileRouter } from "@/app/api/uploadthing/core";

export type ImageUploadPropsType = {
  label: string;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export type MultipleImageUploadPropsType = {
  label: string;
  images: string[];
  setImages: (images: string[]) => void;
  endpoint: keyof typeof ourFileRouter;
};
