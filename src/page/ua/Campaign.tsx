import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { Table } from "antd";

const Campaign = () => {
  const top10columns = [
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "Campaign",
      dataIndex: "campaign",
      key: "campaign",
    },
    {
      title: "Avg Daily Spend",
      dataIndex: "avgDailySpend",
      key: "avgDailySpend",
    },
    {
      title: "Daily Install",
      dataIndex: "dailyInstall",
      key: "dailyInstall",
    },
    {
      title: "CPI",
      dataIndex: "CPI",
      key: "CPI",
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

  const top10data = [
    {
      key: "1",
      channel: "Channel",
      campaign: "Campaign",
      avgDailySpend: "Avg DailySpend",
      dailyInstall: "Daily Install",
      CPI: "CPI",
      ROAS_D0: "ROAS_D0",
      ROAS_D7: "ROAS_D7",
      ROAS_D30: "ROAS_D30",
      SkAN_ROAS: "SkAN_ROAS",
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
      dataIndex: "campaign",
      key: "campaign",
    },
    {
      title: "Daily Spend",
      dataIndex: "dailySpend",
      key: "dailySpend",
    },
    { title: "Diff Last Week", dataIndex: "diffLastWeek", key: "diffLastWeek" },
    {
      title: "Daily Install",
      dataIndex: "dailyInstall",
      key: "dailyInstall",
    },
    {
      title: "CPI",
      dataIndex: "CPI",
      key: "CPI",
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
      title: "ROAS_D7 Last Week",
      dataIndex: "ROAS_D7LastWeek",
      key: "ROAS_D7LastWeek",
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

  const increasingData = [
    {
      key: "1",
      channel: "Channel",
      campaign: "Campaign",
      dailySpend: "Daily Spend",
      diffLastWeek: "Diff Last Week",
      dailyInstall: "Daily Install",
      CPI: "CPI",
      ROAS_D0: "ROAS_D0",
      ROAS_D0LastWeek: "ROAS_D0 Last Week",
      ROAS_D7: "ROAS_D7",
      ROAS_D7LastWeek: "ROAS_D7 Last Week",
      ROAS_D30: "ROAS_D30",
      SkAN_ROAS: "SkAN_ROAS",
    },
  ];

  const decliningData = [
    {
      key: "1",
      channel: "Channel",
      campaign: "Campaign",
      dailySpend: "Daily Spend",
      diffLastWeek: "Diff Last Week",
      dailyInstall: "Daily Install",
      CPI: "CPI",
      ROAS_D0: "ROAS_D0",
      ROAS_D0LastWeek: "ROAS_D0 Last Week",
      ROAS_D7: "ROAS_D7",
      ROAS_D7LastWeek: "ROAS_D7 Last Week",
      ROAS_D30: "ROAS_D30",
      SkAN_ROAS: "SkAN_ROAS",
    },
  ];

  return (
    <>
      <p className="font-semibold text-xl">Top Campaigns</p>

      <div className="flex gap-5">
        <div className="w-2/3">
          <div className="bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium !my-3">Top 10 Spend Campaigns</p>
            <Table
              columns={top10columns}
              dataSource={top10data}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
              }}
              scroll={{ x: "max-content" }}
              size="small"
              style={{ overflow: "auto" }}
            />
          </div>
          <div className="mt-5 bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium !my-5">
              Top 5 Avg Daily Spend Increasing compare with last week
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
            />
          </div>

          <div className="mt-5 bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium !my-5">
              Top 5 Avg Daily Spend Declining compare with last week
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
