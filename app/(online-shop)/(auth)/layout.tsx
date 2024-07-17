"use client";

import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <section className="container my-6 lg:my-10">
        <div className="w-full lg:w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-2 border rounded-lg shadow-lg">
          {children}

          <div className="bg-blue-600 p-6 rounded-bl-lg lg:rounded-bl-none lg:rounded-tr-lg rounded-br-lg text-slate-200 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Connect with every application
              </h3>
              <p className="text-sm font-thin">
                Everything you need is customizable on the dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
