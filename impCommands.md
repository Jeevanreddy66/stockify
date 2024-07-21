1. code . -r --> This command will open the vscode folder in a separate window.

2. Command for installing & initializing prisma in our application
   --> npm install prisma @prisma/client
   --> npx prisma init --datasource-provider mongodb

   --> Create a Prisma Client Global Instance
   In lib folder -- db.ts file
   import { PrismaClient } from "@prisma/client";

   declare global {
   var prisma: PrismaClient | undefined;
   }

   export const prismaClient = globalThis.prisma || new PrismaClient();
   if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;

   --> To Format Prisma Models and make prettier.
   -- npx prisma format
