import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  categoryImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "JEEVAN" };
    }
  ),
  brandLogo: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "JEEVAN" };
    }
  ),
  warehouseLogo: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "JEEVAN" };
    }
  ),
  supplierImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "JEEVAN" };
    }
  ),
  productImages: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ file }) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log("file url", file.url);

    // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
    return { uploadedBy: "JEEVAN" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
