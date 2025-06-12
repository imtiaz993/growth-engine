import Filters from "./components/Filters";
import WeeklyROASChart from "./components/WeeklyROASChart";

const Overview = () => {
  return (
    <div>
      <Filters />
      <p className="font-semibold text-xl pt-5">Overview</p>
      <div className="flex gap-5">
        <div className="w-1/4 bg-blue-100 shadow-lg p-5 rounded-xl">
          <p className="font-semibold">Campaign AI Summary</p>
          <div className="">
            <p className="">
              Your Revenue increase by 5% last week, the key contributors on
              channels are from Tiktok and Snapchat, with you campagin scaling
              on Korea and China
            </p>
            <br />
            <p className="">
              Your overall ROAS D0 decreased from 30% to 25%, the reason was
              ROAS D0 on Apple decreased, please check your campaign details to
              optimize
            </p>
          </div>
        </div>
        <WeeklyROASChart />
      </div>
      <div className="my-12 text-center">Quadrant Charts Here...</div>
      <div className="w-full bg-blue-100 shadow-lg p-5 rounded-xl mt-5">
        <p>
          Your overall LTV D0 decreased from 30% to 25%, the reason was LTV D0
          on Apple decreased and LTV D7 on Applovin decreased, please check your
          campaign details to optimize.
        </p>
      </div>
    </div>
  );
};

export default Overview;
