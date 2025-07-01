import LastUpdate from "./LastUpdate";
import ROASCard from "./ROASCard";
import RevenueCard from "./RevenueCard";
import RevenueChart from "./WeeklyRevenue";
import MainChannelsChart from "./MainChannels";
import MainGeosChart from "./MainGeos";
import LTVCard from "./LTVCard";
import type { FilterState } from "../../../../types";

interface OverviewProps {
  filters: FilterState;
}

const Overview = ({ filters }: OverviewProps) => {
  return (
    <div>
      <div className="flex justify-between pt-5">
        <h1 className="font-semibold text-xl">Overview</h1>
        <LastUpdate />
      </div>
      <div className="flex gap-5 mt-4">
        <div className="w-1/4 space-y-5">
          <RevenueCard />
          <ROASCard />
        </div>
        <div className="w-3/4">
          <RevenueChart filters={filters} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-4 text-center">
        <MainChannelsChart filters={filters} />
        <MainGeosChart filters={filters} />
      </div>
      <LTVCard />
    </div>
  );
};

export default Overview;
