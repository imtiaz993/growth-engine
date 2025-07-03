// InstallData.tsx
import type { FC } from "react";
import InstallAge from "./InstallAge";
import InstallDays from "./InstallDays";
import IAPInstall from "./IAPInstall";
import ConversionInstall from "./ConversionInstall";
import SegmentationCard from "./SegmentationCard";
import MetricBreakdownCard from "./MetricBreakdownCard";


const InstallData:FC = () => {
  return (
    <div>
      <h1 className="font-bold text-xl pt-10">Install Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SegmentationCard />
        <MetricBreakdownCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
        <InstallAge />
        <InstallDays />
        <IAPInstall />
        <ConversionInstall />
      </div>
    </div>
  );
};

export default InstallData;