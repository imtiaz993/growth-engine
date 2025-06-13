import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ExclamationCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Filters from "./components/Filters";
import WeeklyROASChart from "./components/WeeklyROASChart";

const Overview = () => {
  return (
    <div className="p-4">
      <Filters />
      <h1 className="font-semibold text-xl pt-5">Overview</h1>

      <div className="flex gap-5 mt-4">
        <div className="w-1/4 space-y-5">
          <div className="p-5 rounded-md shadow-lg border border-green-200 bg-green-50">
            <div className="flex justify-between">
              <h3 className="font-medium">Weekly Revenue</h3>
              <div className="flex items-center gap-1 text-green-600">
                <span>5% increase</span>
                <ArrowUpOutlined />
              </div>
            </div>
            <p className="mt-3 text-sm">
              Your Revenue increase by 5% last week, the key contributors on
              channels are from Tiktok and Snapchat, with your campaign scaling
              on Korea and China
            </p>
          </div>

          <div className="p-5 rounded-md shadow-lg border border-amber-200 bg-amber-50">
            <div className="flex justify-between">
              <h3 className="font-medium">ROAS D0</h3>
              <div className="flex items-center gap-1 text-red-600">
                <span>30% → 25%</span>
                <ArrowDownOutlined />
              </div>
            </div>
            <p className="mt-3 text-sm">
              Your overall ROAS D0 decreased from 30% to 25%, the reason was
              ROAS D0 on Apple decreased, please check your campaign details to
              optimize
            </p>
            <button className="mt-3 text-sm font-medium flex items-center cursor-pointer">
              Campaign Details <RightOutlined className="ml-1 text-xs" />
            </button>
          </div>
        </div>

        <div className="w-3/4">
          <WeeklyROASChart />
        </div>
      </div>

      <div className="my-8 p-6 bg-gray-50 rounded-md">
        <div className="text-gray-500 text-center py-8 rounded-lg">
          Quadrant visualization will appear here
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 p-5 rounded-md shadow-lg flex items-start">
        <div className="bg-red-100 p-2 rounded-lg mr-4">
          <ExclamationCircleOutlined className="text-red-600 text-lg" />
        </div>
        <div>
          <h4 className="font-semibold text-red-700 text-base">LTV D0 Alert</h4>
          <p className="text-sm mt-2">
            Your overall LTV D0 decreased from 30% to 25%, the reason was LTV D0
            on Apple decreased and LTV D7 on Applovin decreased, please check
            your campaign details to optimize.
          </p>
          <button className="mt-3 !text-red-700 text-sm font-medium flex items-center hover:!text-red-900 cursor-pointer">
            Review Campaign Details <RightOutlined className="ml-1 text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
