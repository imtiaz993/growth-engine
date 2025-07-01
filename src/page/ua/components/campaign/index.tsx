import { useEffect, useState } from "react";
import type { FC } from "react";

import PerformanceCard from "./PerformanceCard";
import AlertCard from "./AlertCard";
import OptimizationCard from "./OptimizationCard";
import TopSpendCampaigns from "./TopSpendCampaigns";
import TopIncreasingCampaigns from "./TopIncreasingCampaigns";
import TopDecreasingCampaigns from "./TopDecreasingCampaigns";
import { getCampaignCamparison, getTop10Campaigns } from "../../../../api/ua";
import { customToFixed } from "../../../../utils";
import type { FilterState } from "../../../../types";

interface CampaignProps {
  filters: FilterState;
}
interface TableRow {
  channel: string;
  campaign_network: string;
  daily_spend: number;
  daily_spend_last_week: number;
  diff_last_week_percentage_change: number;
  daily_installs: number;
  cpi: number;
  roas_d0: number;
  roas_d0_last_week: number;
  roas_d7: number;
  roas_d7_previous_week: number;
  roas_d30: number;
  skan_roas: number;
}

const comparingColumns = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
    sorter: (a: TableRow, b: TableRow) => a.channel.localeCompare(b.channel),
  },
  {
    title: "Campaign",
    dataIndex: "campaign_network",
    key: "campaign_network",
    sorter: (a: TableRow, b: TableRow) =>
      a.campaign_network.localeCompare(b.campaign_network),
  },
  {
    title: "Daily Spend This Week",
    dataIndex: "daily_spend",
    key: "daily_spend",
    sorter: (a: TableRow, b: TableRow) => a.daily_spend - b.daily_spend,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "Daily Spend Last Week",
    dataIndex: "daily_spend_last_week",
    key: "daily_spend_last_week",
    sorter: (a: TableRow, b: TableRow) =>
      a.daily_spend_last_week - b.daily_spend_last_week,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "Diff Last Week",
    dataIndex: "diff_last_week_percentage_change",
    key: "diff_last_week_percentage_change",
    sorter: (a: TableRow, b: TableRow) =>
      (a.diff_last_week_percentage_change || 0) -
      (b.diff_last_week_percentage_change || 0),
    render: (value: number) => value && customToFixed(value * 100) + "%",
  },
  {
    title: "Daily Install",
    dataIndex: "daily_installs",
    key: "daily_installs",
    sorter: (a: TableRow, b: TableRow) => a.daily_installs - b.daily_installs,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "CPI",
    dataIndex: "cpi",
    key: "cpi",
    sorter: (a: TableRow, b: TableRow) => a.cpi - b.cpi,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D0",
    dataIndex: "roas_d0",
    key: "roas_d0",
    sorter: (a: TableRow, b: TableRow) => a.roas_d0 - b.roas_d0,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D0 Last Week",
    dataIndex: "roas_d0_last_week",
    key: "roas_d0_last_week",
    sorter: (a: TableRow, b: TableRow) =>
      (a.roas_d0_last_week || 0) - (b.roas_d0_last_week || 0),
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D7",
    dataIndex: "roas_d7",
    key: "roas_d7",
    sorter: (a: TableRow, b: TableRow) => a.roas_d7 - b.roas_d7,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D7 Last Week",
    dataIndex: "roas_d7_previous_week",
    key: "roas_d7_previous_week",
    sorter: (a: TableRow, b: TableRow) =>
      (a.roas_d7_previous_week || 0) - (b.roas_d7_previous_week || 0),
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D30",
    dataIndex: "roas_d30",
    key: "roas_d30",
    sorter: (a: TableRow, b: TableRow) => a.roas_d30 - b.roas_d30,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "SkAN_ROAS",
    dataIndex: "skan_roas",
    key: "skan_roas",
    sorter: (a: TableRow, b: TableRow) => a.skan_roas - b.skan_roas,
    render: (value: number) => value && customToFixed(value),
  },
];

const Campaign: FC<CampaignProps> = ({ filters }) => {
  const [top10Data, setTop10Data] = useState<TableRow[]>([]);
  const [increasingData, setIncreasingData] = useState<TableRow[]>([]);
  const [decliningData, setDecliningData] = useState<TableRow[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTop10 = async () => {
    if (!filters.appToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getTop10Campaigns(filters);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data;
      setTop10Data(data.data.top_campaigns || []);
    } catch (error) {
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
      const response = await getCampaignCamparison(filters);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data;
      setIncreasingData(data.data.top5_increasing || []);
      setDecliningData(data.data.top5_declining || []);
    } catch (error) {
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
      <h1 className="font-semibold text-xl pt-10">Top Campaigns</h1>
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      <div>
        <div className="flex space-x-5">
          <PerformanceCard />
          <AlertCard />
          <OptimizationCard />
        </div>

        <div className="mt-5">
          <TopSpendCampaigns isLoading={isLoading} top10Data={top10Data} />
          <TopIncreasingCampaigns
            isLoading={isLoading}
            increasingData={increasingData}
            comparingColumns={comparingColumns}
          />
          <TopDecreasingCampaigns
            isLoading={isLoading}
            decliningData={decliningData}
            comparingColumns={comparingColumns}
          />
        </div>
      </div>
    </>
  );
};

export default Campaign;
