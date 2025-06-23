import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BulbOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import WeeklyROASChart from "./WeeklyROASChart";
import QuadrantBubbleCharts from "./GradientChart";
import { useEffect, useState } from "react";

interface FilterState {
  appToken: string | null;
  channels: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
}

interface OverviewProps {
  filters: FilterState;
}

interface BasicData {
  adjust_latest_data_date: string;
}

const Overview = ({ filters }: OverviewProps) => {
  const [basicData, setBasicData] = useState<BasicData | null>(null);
  const getBasicData = async () => {
    const response = await fetch(
      "https://sabre-api.yodo1.me/api/v1/info/basic",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setBasicData(data.data);
  };

  useEffect(() => {
    getBasicData();
  }, []);
  return (
    <div>
      <div className="flex justify-between pt-5">
        <h1 className="font-semibold text-xl">Overview</h1>
        {basicData && (
          <p>Data updated by {basicData?.adjust_latest_data_date}</p>
        )}
      </div>

      <div className="flex gap-5 mt-4">
        <div className="w-1/4 space-y-5">
          <div className="p-5 rounded-md shadow-lg border border-green-200 bg-green-50">
            <div className="flex">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <BulbOutlined className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-medium !mb-0">Weekly Revenue</h3>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <span>5% increase</span>
                  <ArrowUpOutlined />
                </div>
              </div>
            </div>
            <p className="!mt-2 text-sm leading-[1.6]">
              Your Revenue increase by 5% last week, the key contributors on
              channels are from Tiktok and Snapchat, with your campaign scaling
              on Korea and China
            </p>
          </div>

          <div className="p-5 rounded-md shadow-lg border border-amber-200 bg-amber-50">
            <div className="flex">
              <div className="bg-amber-100 p-2 rounded-lg mr-3">
                <BulbOutlined className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-medium !mb-0">ROAS D0</h3>
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <span>30% → 25%</span>
                  <ArrowDownOutlined />
                </div>
              </div>
            </div>
            <p className="!mt-2 text-sm leading-[1.6]">
              Your overall ROAS D0 decreased from 30% to 25%, the reason was
              ROAS D0 on Apple decreased, please check your campaign details to
              optimize
            </p>
          </div>
        </div>

        <div className="w-3/4">
          <WeeklyROASChart filters={filters} />
        </div>
      </div>

      <div className="">
        <QuadrantBubbleCharts filters={filters} />
      </div>

      <div className="bg-red-50 border border-red-200 p-5 rounded-md shadow-lg flex items-start mt-5">
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
        </div>
      </div>
    </div>
  );
};

export default Overview;
