import LTVChart from "./LTVChart";
import AdsLtvDx from "./AdsLtvDx";
import IapLtvDx from "./IapLtvDx";
import LTVInsightCard from "./LTVInsightCard";

const LTVReport = () => {
  return (
    <div className="">
      <h1 className="font-bold text-xl pt-10">LTV Report</h1>

      <div className="grid grid-cols-1 gap-5 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 ">
          <LTVInsightCard />
          <LTVChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AdsLtvDx />
          <IapLtvDx />
        </div>
      </div>
    </div>
  );
};

export default LTVReport;
