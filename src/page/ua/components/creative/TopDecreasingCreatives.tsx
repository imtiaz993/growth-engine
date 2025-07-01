import { Table } from "antd";
import type { FC } from "react";
import type { ColumnsType } from "antd/es/table";

interface TableRow {
  channel: string;
  creatives: string;
  daily_spend: number;
  daily_spend_last_period: number;
  diff_daily_spend_percentage_change: number;
  ipm: number;
  ctr: number;
  cvr: number;
  ecpm: number;
  roas_d0: number;
  roas_d0_previous_week: number;
  roas_d0_wow_percentage_change: number;
  roas_d7: number;
  roas_d7_previous_week: number;
  roas_d7_wow_percentage_change: number;
  roas_d30: number;
  roas_d30_previous_week: number;
  roas_d30_wow_percentage_change: number;
  skan_roas: number;
}

interface TopDecreasingCreativesProps {
  comparingColumns: ColumnsType<TableRow>;
  decliningData: TableRow[];
  isLoading: boolean;
}

const TopDecreasingCreatives: FC<TopDecreasingCreativesProps> = ({
  comparingColumns,
  decliningData,
  isLoading,
}) => {
  return (
    <div className="mt-5 bg-white p-3 rounded-md shadow-xl">
      <p className="font-medium !my-5">Top 5 Decreasing trending Creatives</p>
      <Table
        columns={comparingColumns}
        dataSource={decliningData}
        pagination={false}
        scroll={{ x: "max-content" }}
        size="small"
        loading={isLoading}
      />
    </div>
  );
};

export default TopDecreasingCreatives;
