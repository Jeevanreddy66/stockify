"use client";

import Link from "next/link";
import { FC } from "react";
import { footerConfig } from "@/config";

export const Footer: FC = () => {
  const { Logo, summary, contacts, navigation, policies, mediaLinks } =
    footerConfig;

  return (
    <>
      <footer className="border-t border-b py-8">
        <div className="container grid grid-cols-12 gap-4">
          <div className="col-span-full lg:col-span-4">
            <Logo />

            <p className="my-3 text-xs dark:text-slate-300 font-light line-clamp-3">
              {summary}
            </p>

            <div className="space-y-3 my-4">
              {contacts.map(({ label, Icon }, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <p className="text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {navigation.map(({ title, links }, i: number) => (
            <div key={i} className="col-span-full sm:col-span-6 lg:col-span-2">
              <h2 className="font-semibold text-base mb-4">{title}</h2>

              <div className="flex flex-col gap-3 text-xs">
                {links.map(({ name, path }, i: number) => (
                  <Link key={i} href={path}>
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>

      <div className="container py-6 flex items-center justify-between gap-3 flex-wrap font-light text-xs">
        <p>&copy; Stockify {new Date().getFullYear()} - All rights reserved.</p>

        <div className="flex items-center gap-3">
          {policies.map(({ label, path }, i: number) => (
            <Link key={i} href={path}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {mediaLinks.map(({ Icon, path }, i: number) => (
            <Link key={i} href={path}>
              <Icon className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
