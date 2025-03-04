import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TopHistories } from "@/components/Histories/top-histories";
import { TopHistoriesSkeleton } from "@/components/Histories/top-histories/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: " تاریخچه مکالمات",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="تاریخچه مکالمات" />

      <div className="space-y-10">
        <Suspense fallback={<TopHistoriesSkeleton />}>
          <TopHistories />
        </Suspense>
      </div>
    </>
  );
};

export default TablesPage;
