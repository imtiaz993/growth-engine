import LTVChart from "./LTVChart";
import LtvDx from "./LtvDx";
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

        <LtvDx />
      </div>
    </div>
  );
};

export default LTVReport;
