"use client";

import Link from "next/link";
import { FC } from "react";
import { FacebookIcon, Headset } from "lucide-react";
import { footerConfig } from "@/config";

export const Footer: FC = () => {
  const { Logo, summary, contacts, navigation, policies, mediaLinks } =
    footerConfig;

  return (
    <>
      <footer>
        <div className="border-b border-gray-200 py-8">
          <div className="container grid grid-cols-12 gap-6">
            <div className="col-span-full lg:col-span-4">
              <Logo />

              <p className="text-sm my-3 line-clamp-3">{summary}</p>

              <div className="my-4 space-y-2">
                {contacts.map(({ label, Icon }, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />

                    <p className="text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {navigation.map(({ title, links }, i: number) => (
              <div
                key={i}
                className="col-span-full sm:col-span-6 lg:col-span-2"
              >
                <h2 className="text-base font-semibold">{title}</h2>

                <div className="mt-4 flex flex-col gap-2 text-sm">
                  {links.map(({ name, path }, j: number) => (
                    <Link key={j} href={path}>
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container my-3 flex items-center justify-between text-sm">
          <p>
            &copy; {new Date().getFullYear()} Stockify - All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            {policies.map(({ item, url }, i: number) => (
              <Link key={i} href={url}>
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mediaLinks.map(({ Icon, path }, j: number) => (
              <Link key={j} href={path}>
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};
