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

interface CampaignProps {
  filters: FilterState;
}

const top10columns = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
  },
  {
    title: "Campaign",
    dataIndex: "campaign_network",
    key: "campaign_network",
  },
  {
    title: "Avg Daily Spend",
    dataIndex: "daily_spend",
    key: "daily_spend",
  },
  {
    title: "Daily Install",
    dataIndex: "daily_installs",
    key: "daily_installs",
  },
  {
    title: "CPI",
    dataIndex: "cpi",
    key: "cpi",
  },
  {
    title: "ROAS_D0",
    dataIndex: "roas_d0",
    key: "roas_d0",
  },
  {
    title: "ROAS_D7",
    dataIndex: "roas_d7",
    key: "roas_d7",
  },
  {
    title: "ROAS_D30",
    dataIndex: "roas_d30",
    key: "roas_d30",
  },
  {
    title: "SkAN_ROAS",
    dataIndex: "skan_roas",
    key: "skan_roas",
  },
];

const camparingColumns = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
  },
  {
    title: "Campaign",
    dataIndex: "campaign_network",
    key: "campaign_network",
  },
  {
    title: "Daily Spend",
    dataIndex: "daily_spend",
    key: "daily_spend",
  },
  {
    title: "Diff Last Week",
    dataIndex: "diff_last_week",
    key: "diff_last_week",
  },
  {
    title: "Daily Install",
    dataIndex: "daily_installs",
    key: "daily_installs",
  },
  {
    title: "CPI",
    dataIndex: "cpi",
    key: "cpi",
  },
  {
    title: "ROAS_D0",
    dataIndex: "roas_d0",
    key: "roas_d0",
  },
  {
    title: "ROAS_D0 Last Week",
    dataIndex: "roas_d0_last_week",
    key: "roas_d0_last_week",
  },
  {
    title: "ROAS_D7",
    dataIndex: "roas_d7",
    key: "roas_d7",
  },
  {
    title: "ROAS_D7 Last Week",
    dataIndex: "roas_d7_previous_week",
    key: "roas_d7_previous_week",
  },
  {
    title: "ROAS_D30",
    dataIndex: "roas_d30",
    key: "roas_d30",
  },
  {
    title: "SkAN_ROAS",
    dataIndex: "skan_roas",
    key: "skan_roas",
  },
];

const Campaign = ({ filters }: CampaignProps) => {
  const [top10Data, setTop10Data] = useState([]);
  const [increasingData, setIncreasingData] = useState([]);
  const [decliningData, setDecliningData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTop10 = async () => {
    if (!filters.appToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://sabre-api.yodo1.me/api/v1/dashboard/top10-campaigns",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_token: filters.appToken,
            start_date: filters.startDate,
            end_date: filters.endDate,
            filters: {
              channels: filters.channels.length ? filters.channels : [],
              countries: filters.countries.length ? filters.countries : [],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTop10Data(data.data.top_campaigns || []);
    } catch (error) {
      console.error("Error fetching top 10 campaigns:", error);
      setError("Failed to load top campaigns data.");
      setTop10Data([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComparing = async () => {
    if (!filters.appToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://sabre-api.yodo1.me/api/v1/dashboard/wow-comparison",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_token: filters.appToken,
            start_date: filters.startDate,
            end_date: filters.endDate,
            filters: {
              channels: filters.channels.length ? filters.channels : [],
              countries: filters.countries.length ? filters.countries : [],
            },
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
      console.error("Error fetching comparison data:", error);
      setError("Failed to load comparison data.");
      setIncreasingData([]);
      setDecliningData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTop10();
    fetchComparing();
  }, [
    filters.appToken,
    filters.channels,
    filters.countries,
    filters.startDate,
    filters.endDate,
  ]);

  return (
    <>
      <p className="font-semibold text-xl pt-5">Top Campaigns</p>
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      <div className="flex gap-5">
        <div className="w-2/3">
          <div className="bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium !my-3">
              Top 10 Spend Campaigns (under selected filter)
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
              Top 5 Avg Daily Spend{" "}
              <span className="text-red-600"> Increasing </span> compare with{" "}
              <span className="text-red-600"> last week </span>
            </p>
            <Table
              columns={camparingColumns}
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
              Top 5 Avg Daily Spend{" "}
              <span className="text-red-600">Declining</span> compare with{" "}
              <span className="text-red-600">last week </span>
            </p>
            <Table
              columns={camparingColumns}
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

export default Campaign;
