"use client";

import Link from "next/link";
import { FC } from "react";
import { footerConfig } from "@/config";

import { Logo } from "./Logo";

const { summary, contacts, navigation, policies, mediaLinks } = footerConfig;

export const Footer: FC = () => {
  return (
    <>
      <footer className="container">
        <div className="grid grid-cols-12 gap-6 border-b border-gray-200 py-10">
          <div className="col-span-full sm:col-span-8 lg:col-span-4">
            <Logo />

            <p className="text-sm font-thin line-clamp-3 my-3">{summary}</p>

            <div className="space-y-2 mt-6">
              {contacts.map(({ Icon, label }, i: number) => (
                <div key={i} className="flex items-center flex-nowrap gap-3">
                  <Icon className="w-4 h-4" />

                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {navigation.map(({ title, links }, i: number) => (
            <div key={i} className="col-span-full sm:col-span-4 lg:col-span-2">
              <h2 className="text-base font-semibold">{title}</h2>

              <div className="flex flex-col gap-2 text-sm mt-4">
                {links.map(({ label, path }, j: number) => (
                  <Link key={j} href={path}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 py-4 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Stockify - All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm font-light">
            {policies.map(({ name, url }, i: number) => (
              <Link key={i} href={url}>
                {name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm">
            {mediaLinks.map(({ Icon, href }, i: number) => (
              <Link key={i} href={href}>
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};
