"use client";

import Image from "next/image";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const AvatarMenu: FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-10 h-10 rounded-full p-0.5 border"
        >
          <Image
            src="/avatar.jpeg"
            width={512}
            height={512}
            className="object-cover rounded-full"
            alt="user-image"
          />
          <span className="sr-only">Toggle User Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] md:w-[300px]">
        {/* Content Here */}
      </SheetContent>
    </Sheet>
  );
};
