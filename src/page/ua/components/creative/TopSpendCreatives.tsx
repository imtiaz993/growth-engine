import { Table } from "antd";
import type { FC } from "react";
import { customToFixed } from "../../../../utils";

interface TableRow {
  channel: string;
  creative_network: string;
  cost: number;
  ipm: number;
  ctr: number;
  cvr: number;
  roas_d0: number;
  roas_d7: number;
  roas_d30: number;
  skan_roas: number;
}

interface TopSpendCreativesProps {
  top10Data: TableRow[];
  isLoading: boolean;
}

const top10columns = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel",
    sorter: (a: TableRow, b: TableRow) => a.channel.localeCompare(b.channel),
  },
  {
    title: "Creative",
    dataIndex: "creative_network",
    key: "creative_network",
    sorter: (a: TableRow, b: TableRow) =>
      a.creative_network.localeCompare(b.creative_network),
  },
  {
    title: "Cost Share",
    dataIndex: "cost",
    key: "cost",
    sorter: (a: TableRow, b: TableRow) => a.cost - b.cost,
    render: (value: number) => value && customToFixed(value),
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
    title: "SkAN ROAS",
    dataIndex: "skan_roas",
    key: "skan_roas",
    sorter: (a: TableRow, b: TableRow) => a.skan_roas - b.skan_roas,
    render: (value: number) => value && customToFixed(value),
  },
];

const TopSpendCreatives: FC<TopSpendCreativesProps> = ({ top10Data, isLoading }) => {
  return (
    <div className="bg-white p-3 rounded-md shadow-xl">
      <p className="font-medium !my-3">
        Top 10 Spend Creatives Table (under selected filter)
      </p>
      <Table
        columns={top10columns}
        dataSource={top10Data}
        pagination={false}
        scroll={{ x: "max-content" }}
        size="small"
        loading={isLoading}
        rowKey="creative_network" // optional: helps avoid React key warning
      />
    </div>
  );
};

export default TopSpendCreatives;
