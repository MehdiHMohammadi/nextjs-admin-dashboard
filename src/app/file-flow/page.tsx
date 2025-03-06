import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { FileFlows } from "@/components/FileFlow/top-fileflow";
import { TopHistoriesSkeleton } from "@/components/Histories/top-histories/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: " پرونده های در جریان",
};

const FileFlow = () => {
  return (
    <>
      <Breadcrumb pageName="پرونده های در جریان" />

      <div className="space-y-10">
        <Suspense fallback={<TopHistoriesSkeleton />}>
          <FileFlows />
        </Suspense>
      </div>
    </>
  );
};

export default FileFlow;
