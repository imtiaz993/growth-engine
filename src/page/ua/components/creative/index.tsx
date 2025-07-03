import { useEffect, useState } from "react";
import type { FC } from "react";
import { getCreativeTrending, getTop10Creatives } from "../../../../api/ua";
import { customToFixed } from "../../../../utils";
import type { FilterState } from "../../../../types";
import PerformanceCard from "./PerformanceCard";
import AlertCard from "./AlertCard";
import OptimizationCard from "./OptimizationCard";
import TopSpendCreatives from "./TopSpendCreatives";
import TopIncreasingCreatives from "./TopIncreasingCreatives";
import TopDecreasingCreatives from "./TopDecreasingCreatives";

interface CreativeProps {
  filters: FilterState;
}
interface TableRow {
  channel: string;
  creatives: string;
  daily_spend: number;
  daily_spend_last_period?: number;
  diff_daily_spend_percentage_change?: number;
  ipm: number;
  ctr: number;
  cvr: number;
  ecpm?: number;
  roas_d0: number;
  roas_d0_previous_week?: number;
  roas_d0_wow_percentage_change?: number;
  roas_d7: number;
  roas_d7_previous_week?: number;
  roas_d7_wow_percentage_change?: number;
  roas_d30: number;
  roas_d30_previous_week?: number;
  roas_d30_wow_percentage_change?: number;
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
    title: "Creative",
    dataIndex: "creatives",
    key: "creatives",
    sorter: (a: TableRow, b: TableRow) =>
      a.creatives.localeCompare(b.creatives),
  },
  {
    title: "Daily Spend",
    dataIndex: "daily_spend",
    key: "daily_spend",
    sorter: (a: TableRow, b: TableRow) => a.daily_spend - b.daily_spend,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "Daily Spend Last Period",
    dataIndex: "daily_spend_last_period",
    key: "daily_spend_last_period",
    sorter: (a: TableRow, b: TableRow) =>
      (a.daily_spend_last_period || 0) - (b.daily_spend_last_period || 0),
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "Diff Daily Spend",
    dataIndex: "diff_daily_spend_percentage_change",
    key: "diff_daily_spend_percentage_change",
    render: (value: number) => value && customToFixed(value * 100) + "%",
    sorter: (a: TableRow, b: TableRow) =>
      (a.diff_daily_spend_percentage_change || 0) -
      (b.diff_daily_spend_percentage_change || 0),
  },
  {
    title: "IPM",
    dataIndex: "ipm",
    key: "ipm",
    sorter: (a: TableRow, b: TableRow) => a.ipm - b.ipm,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "CTR",
    dataIndex: "ctr",
    key: "ctr",
    sorter: (a: TableRow, b: TableRow) => a.ctr - b.ctr,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "CVR",
    dataIndex: "cvr",
    key: "cvr",
    sorter: (a: TableRow, b: TableRow) => a.cvr - b.cvr,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "eCPM",
    dataIndex: "ecpm",
    key: "ecpm",
    sorter: (a: TableRow, b: TableRow) => (a.ecpm || 0) - (b.ecpm || 0),
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
    title: "ROAS_D0 Previous Week",
    dataIndex: "roas_d0_previous_week",
    key: "roas_d0_previous_week",
    sorter: (a: TableRow, b: TableRow) =>
      (a.roas_d0_previous_week || 0) - (b.roas_d0_previous_week || 0),
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D0 WoW",
    dataIndex: "roas_d0_wow_percentage_change",
    key: "roas_d0_wow_percentage_change",
    sorter: (a: TableRow, b: TableRow) =>
      (a.roas_d0_wow_percentage_change || 0) -
      (b.roas_d0_wow_percentage_change || 0),
    render: (value: number) => value && customToFixed(value * 100) + "%",
  },
  {
    title: "ROAS_D7",
    dataIndex: "roas_d7",
    key: "roas_d7",
    sorter: (a: TableRow, b: TableRow) => a.roas_d7 - b.roas_d7,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D7 Previous Week",
    dataIndex: "roas_d7_previous_week",
    key: "roas_d7_previous_week",
    sorter: (a: TableRow, b: TableRow) =>
      (a.roas_d7_previous_week || 0) - (b.roas_d7_previous_week || 0),
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D7 WoW",
    dataIndex: "roas_d7_wow_percentage_change",
    key: "roas_d7_wow_percentage_change",
    sorter: (a: TableRow, b: TableRow) =>
      (a.roas_d7_wow_percentage_change || 0) -
      (b.roas_d7_wow_percentage_change || 0),
    render: (value: number) => value && customToFixed(value * 100) + "%",
  },
  {
    title: "ROAS_D30",
    dataIndex: "roas_d30",
    key: "roas_d30",
    sorter: (a: TableRow, b: TableRow) => a.roas_d30 - b.roas_d30,
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D30 Previous Week",
    dataIndex: "roas_d30_previous_week",
    key: "roas_d30_previous_week",
    sorter: (a: TableRow, b: TableRow) =>
      (a.roas_d30_previous_week || 0) - (b.roas_d30_previous_week || 0),
    render: (value: number) => value && customToFixed(value),
  },
  {
    title: "ROAS_D30 WoW",
    dataIndex: "roas_d30_wow_percentage_change",
    key: "roas_d30_wow_percentage_change",
    sorter: (a: TableRow, b: TableRow) =>
      (a.roas_d30_wow_percentage_change || 0) -
      (b.roas_d30_wow_percentage_change || 0),
    render: (value: number) => value && customToFixed(value * 100) + "%",
  },
  {
    title: "SkAN ROAS",
    dataIndex: "skan_roas",
    key: "skan_roas",
    sorter: (a: TableRow, b: TableRow) => a.skan_roas - b.skan_roas,
    render: (value: number) => value && customToFixed(value),
  },
];

const Creative: FC<CreativeProps> = ({ filters }) => {
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
      const response = await getTop10Creatives(filters);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data;
      setTop10Data(data.data.top_creatives || []);
    } catch (error) {
      console.error(error);
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
      const response = await getCreativeTrending(filters);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data;
      setIncreasingData(data.data.top5_increasing || []);
      setDecliningData(data.data.top5_declining || []);
    } catch (error) {
      console.error(error);
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
      <h1 className="font-semibold text-xl pt-10">Top Creatives</h1>
      {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
      <div>
        <div className="flex space-x-5">
          <PerformanceCard />
          <AlertCard />
          <OptimizationCard />
        </div>

        <div className="mt-5">
          <TopSpendCreatives isLoading={isLoading} top10Data={top10Data} />
          <TopIncreasingCreatives
            isLoading={isLoading}
            increasingData={increasingData}
            comparingColumns={comparingColumns}
          />
          <TopDecreasingCreatives
            isLoading={isLoading}
            decliningData={decliningData}
            comparingColumns={comparingColumns}
          />
        </div>
      </div>
    </>
  );
};

export default Creative;
