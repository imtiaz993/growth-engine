import { Table } from "antd";
import type { FC } from "react";
import type { ColumnsType } from "antd/es/table";

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

interface TopIncreasingCampaignsProps {
  comparingColumns: ColumnsType<TableRow>;
  increasingData: TableRow[];
  isLoading: boolean;
}

const TopIncreasingCampaigns: FC<TopIncreasingCampaignsProps> = ({
  comparingColumns,
  increasingData,
  isLoading,
}) => {
  return (
    <div className="mt-5 bg-white p-3 rounded-md shadow-xl">
      <p className="font-medium !my-5">
        Top 5 Avg Daily Spend Increasing compared with last week
      </p>
      <Table
        columns={comparingColumns}
        dataSource={increasingData}
        pagination={false}
        scroll={{ x: "max-content" }}
        size="small"
        loading={isLoading}
        rowKey="campaign_network" // Optional: helps prevent key warnings
      />
    </div>
  );
};

export default TopIncreasingCampaigns;
