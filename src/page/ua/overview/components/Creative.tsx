import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { useEffect, useState } from "react";

interface FilterState {
  appToken: string | null;
  channels: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
}

interface CreativeProps {
  filters: FilterState;
}

const top10columns = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
  },
  {
    title: "Creative",
    dataIndex: "creative_network",
    key: "creative_network",
  },
  {
    title: "Create Month",
    dataIndex: "createMonth",
    key: "createMonth",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Cost Share",
    dataIndex: "cost",
    key: "cost",
  },
  {
    title: "IPM",
    dataIndex: "ipm",
    key: "ipm",
  },
  {
    title: "CTR",
    dataIndex: "ctr",
    key: "ctr",
  },
  {
    title: "CVR",
    dataIndex: "cvr",
    key: "cvr",
  },
  {
    title: "ROAS_D0",
    dataIndex: "ROAS_D0",
    key: "ROAS_D0",
  },
  {
    title: "ROAS_D7",
    dataIndex: "ROAS_D7",
    key: "ROAS_D7",
  },
  {
    title: "ROAS_D30",
    dataIndex: "ROAS_D30",
    key: "ROAS_D30",
  },
  {
    title: "SkAN_ROAS",
    dataIndex: "SkAN_ROAS",
    key: "SkAN_ROAS",
  },
];

const increasingColumns = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
  },
  {
    title: "Creative",
    dataIndex: "creative",
    key: "creative",
  },
  {
    title: "Create Month",
    dataIndex: "createMonth",
    key: "createMonth",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Daily Spend",
    dataIndex: "dailySpend",
    key: "dailySpend",
  },
  {
    title: "Daily Spend Last Period",
    dataIndex: "dailySpendLastPeriod",
    key: "dailySpendLastPeriod",
  },
  {
    title: "Diff_Daily Spend",
    dataIndex: "diffDailySpend",
    key: "diffDailySpend",
  },
  {
    title: "IPM",
    dataIndex: "IPM",
    key: "IPM",
  },
  {
    title: "CTR",
    dataIndex: "CTR",
    key: "CTR",
  },
  {
    title: "CVR",
    dataIndex: "CVR",
    key: "CVR",
  },
  {
    title: "eCPM",
    dataIndex: "eCPM",
    key: "eCPM",
  },
  {
    title: "ROAS_D0",
    dataIndex: "ROAS_D0",
    key: "ROAS_D0",
  },
  {
    title: "ROAS_D0 Prior Week",
    dataIndex: "ROAS_D0PriorWeek",
    key: "ROAS_D0PriorWeek",
  },
  {
    title: "ROAS_D0 WoW",
    dataIndex: "ROAS_D0WoW",
    key: "ROAS_D0WoW",
  },
  {
    title: "ROAS_D7",
    dataIndex: "ROAS_D7",
    key: "ROAS_D7",
  },
  {
    title: "ROAS_D7 Previous Week",
    dataIndex: "ROAS_D7PreviousWeek",
    key: "ROAS_D7PreviousWeek",
  },
  {
    title: "ROAS_D7 WoW",
    dataIndex: "ROAS_D7WoW",
    key: "ROAS_D7WoW",
  },
  {
    title: "ROAS_D30",
    dataIndex: "ROAS_D30",
    key: "ROAS_D30",
  },
  {
    title: "SkAN_ROAS",
    dataIndex: "SkAN_ROAS",
    key: "SkAN_ROAS",
  },
];

const decliningColumns = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
  },
  {
    title: "Creative",
    dataIndex: "creative",
    key: "creative",
  },
  {
    title: "Create Month",
    dataIndex: "createMonth",
    key: "createMonth",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Daily Spend",
    dataIndex: "dailySpend",
    key: "dailySpend",
  },
  {
    title: "Daily Spend Last Period",
    dataIndex: "dailySpendLastPeriod",
    key: "dailySpendLastPeriod",
  },
  {
    title: "Diff_Daily Cost",
    dataIndex: "diffDailyCost",
    key: "diffDailyCost",
  },
  {
    title: "IPM",
    dataIndex: "IPM",
    key: "IPM",
  },
  {
    title: "CTR",
    dataIndex: "CTR",
    key: "CTR",
  },
  {
    title: "CVR",
    dataIndex: "CVR",
    key: "CVR",
  },
  {
    title: "eCPM",
    dataIndex: "eCPM",
    key: "eCPM",
  },
  {
    title: "ROAS_D0",
    dataIndex: "ROAS_D0",
    key: "ROAS_D0",
  },
  {
    title: "ROAS_D0 Last Week",
    dataIndex: "ROAS_D0LastWeek",
    key: "ROAS_D0LastWeek",
  },
  {
    title: "ROAS_D7",
    dataIndex: "ROAS_D7",
    key: "ROAS_D7",
  },
  {
    title: "ROAS_D7 Previous Week",
    dataIndex: "ROAS_D7PreviousWeek",
    key: "ROAS_D7PreviousWeek",
  },
  {
    title: "ROAS_D30",
    dataIndex: "ROAS_D30",
    key: "ROAS_D30",
  },
  {
    title: "SkAN_ROAS",
    dataIndex: "SkAN_ROAS",
    key: "SkAN_ROAS",
  },
];

const Creative = ({ filters }: CreativeProps) => {
  const [top10Data, setTop10Data] = useState([]);
  const [increasingData, setIncreasingData] = useState([]);
  const [decliningData, setDecliningData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTop10Creatives = async () => {
    if (!filters.appToken || !filters.startDate || !filters.endDate) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://sabre-api.yodo1.me/api/v1/dashboard/top10-creatives",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_token: filters.appToken,
            start_date: filters.startDate,
            end_date: filters.endDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTop10Data(data.data.top_creatives || []);
    } catch (error) {
      console.error("Error fetching top 10 creatives:", error);
      setError("Failed to load top creatives data.");
      setTop10Data([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCreativeTrending = async () => {
    if (!filters.appToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://sabre-api.yodo1.me/api/v1/dashboard/creative-trending",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_token: filters.appToken,
            start_date: filters.startDate,
            end_date: filters.endDate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIncreasingData(data.data.top5_increasing || []);
      setDecliningData(data.data.top5_declining || []);
    } catch (error) {
      console.error("Error fetching creative trending data:", error);
      setError("Failed to load creative trending data.");
      setIncreasingData([]);
      setDecliningData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTop10Creatives();
    fetchCreativeTrending();
  }, [
    filters.appToken,
    filters.channels,
    filters.countries,
    filters.startDate,
    filters.endDate,
  ]);

  return (
    <>
      <p className="font-semibold text-xl pt-10">Top Creatives</p>
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      <div className="flex gap-5">
        <div className="w-2/3">
          <div className="bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium !my-3">
              Top 10 Spend Creatives Table (under selected filter)
            </p>
            <Table
              columns={top10columns}
              dataSource={top10Data}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
              }}
              scroll={{ x: "max-content" }}
              size="small"
              loading={isLoading}
            />
          </div>
          <div className="mt-5 bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium !my-5">
              Top 5 Increasing% trending Creatives(ordered by{" "}
              <span className="text-red-600"> Diff Daily Spend</span>)
            </p>
            <Table
              columns={increasingColumns}
              dataSource={increasingData}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
              }}
              scroll={{ x: "max-content" }}
              size="small"
              loading={isLoading}
            />
          </div>
          <div className="mt-5 bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium !my-5">
              Top 5 Decreasing% trending Creatives(minus, ordered by{" "}
              <span className="text-red-600"> Diff Daily Spend</span>)
            </p>
            <Table
              columns={decliningColumns}
              dataSource={decliningData}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
              }}
              scroll={{ x: "max-content" }}
              size="small"
              loading={isLoading}
            />
          </div>
        </div>
        <div className="w-1/3 space-y-5">
          <div className="p-5 rounded-md shadow-lg border border-green-200 bg-green-50">
            <div className="flex justify-between gap-2">
              <h3 className="font-medium">Creative Performance</h3>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <span>50% increase</span>
                <ArrowUpOutlined />
              </div>
            </div>
            <p className="mt-3 text-sm">
              <BulbOutlined className="mr-2" /> Creative A recently performing
              great, spends Increasing 50% on Tiktok, scale and expand it to
              more campaigns!
            </p>
          </div>
          <div className="p-5 rounded-md shadow-lg border border-amber-200 bg-amber-50">
            <div className="flex justify-between gap-2">
              <h3 className="font-medium">Creative Alert</h3>
              <div className="flex items-center gap-1 text-sm text-red-600">
                <span>20% decline</span>
                <ArrowDownOutlined />
              </div>
            </div>
            <p className="mt-3 text-sm">
              <BulbOutlined className="mr-2" /> Creative B & Creative C declined
              20% week by week on Applovin, please replace with new Creatives
            </p>
          </div>
          <div className="p-5 rounded-md shadow-lg border border-blue-200 bg-blue-50">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <BulbOutlined className="text-blue-600 text-lg" />
              </div>
              <div>
                <h3 className="font-medium">Optimization Tip</h3>
                <p className="mt-2 text-sm">
                  Consider reallocating 15% of budget from underperforming
                  creatives to Creative A for better overall ROAS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Creative;
