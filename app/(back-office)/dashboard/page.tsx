"use client";

import { FC } from "react";
import {
  AnalyticsCard,
  AnalyticsTabs,
  TransactionsList,
} from "@/components/dashboard";

const DashboardPage: FC = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        <AnalyticsCard />
        <AnalyticsCard />
        <AnalyticsCard />
        <AnalyticsCard />
      </div>

      <AnalyticsTabs />

      <div className="grid grid-cols-1 gap-4 md:gap-8">
        <TransactionsList />
      </div>
    </>
  );
};

export default DashboardPage;
