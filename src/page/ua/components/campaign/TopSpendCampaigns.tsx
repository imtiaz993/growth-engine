import type { FC } from "react";
import { Table } from "antd";
import { customToFixed } from "../../../../utils";

interface TopSpendCampaignsProps {
  top10Data: TableRow[];
  isLoading: boolean;
}

interface TableRow {
  channel: string;
  campaign_network: string;
  daily_spend: number;
  daily_installs: number;
  cpi: number;
  roas_d0: number;
  roas_d7: number;
  roas_d30: number;
  skan_roas: number;
}

const top10columns = [
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
    title: "Avg Daily Spend",
    dataIndex: "daily_spend",
    key: "daily_spend",
    sorter: (a: TableRow, b: TableRow) => a.daily_spend - b.daily_spend,
    render: (value: number) => value && customToFixed(value),
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
    title: "ROAS_D7",
    dataIndex: "roas_d7",
    key: "roas_d7",
    sorter: (a: TableRow, b: TableRow) => a.roas_d7 - b.roas_d7,
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

const TopSpendCampaigns: FC<TopSpendCampaignsProps> = ({
  top10Data,
  isLoading,
}) => {
  return (
    <div className="bg-white p-3 rounded-md shadow-xl">
      <p className="font-medium !my-3">
        Top 10 Spend Campaigns (under selected filter)
      </p>
      <Table
        columns={top10columns}
        dataSource={top10Data}
        pagination={false}
        scroll={{ x: "max-content" }}
        size="small"
        loading={isLoading}
      />
    </div>
  );
};

export default TopSpendCampaigns;
