import { BulbOutlined } from "@ant-design/icons";
import { Table } from "antd";

const Creative = () => {
  const top10columns = [
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
      title: "Cost Share",
      dataIndex: "costShare",
      key: "costShare",
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
      channel: "Channel 1",
      creative: "Creative 1",
      createMonth: "Create Month 1",
      type: "Type 1",
      language: "Language 1",
      costShare: "Cost Share 1",
      IPM: "IPM 1",
      CTR: "CTR 1",
      CVR: "CVR 1",
      ROAS_D0: "ROAS_D0 1",
      ROAS_D7: "ROAS_D7 1",
      ROAS_D30: "ROAS_D30 1",
      SkAN_ROAS: "SkAN_ROAS 1",
    },
    {
      key: "2",
      channel: "Channel 2",
      creative: "Creative 2",
      createMonth: "Create Month 2",
      type: "Type 2",
      language: "Language 2",
      costShare: "Cost Share 2",
      IPM: "IPM 2",
      CTR: "CTR 2",
      CVR: "CVR 2",
      ROAS_D0: "ROAS_D0 2",
      ROAS_D7: "ROAS_D7 2",
      ROAS_D30: "ROAS_D30 2",
      SkAN_ROAS: "SkAN_ROAS 2",
    },
  ];

  const camparingColumns = [
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
      title: "Cost Share",
      dataIndex: "costShare",
      key: "costShare",
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
      creative: "Creative 1",
      createMonth: "Create Month 1",
      type: "Type 1",
      language: "Language 1",
      costShare: "Cost Share 1",
      IPM: "IPM 1",
      CTR: "CTR 1",
      CVR: "CVR 1",
      ROAS_D0: "ROAS_D0 1",
      ROAS_D0LastWeek: "ROAS_D0LastWeek 1",
      ROAS_D7: "ROAS_D7 1",
      ROAS_D7LastWeek: "ROAS_D7LastWeek 1",
      ROAS_D30: "ROAS_D30 1",
      SkAN_ROAS: "SkAN_ROAS 1",
    },
  ];

  const decliningData = [
    {
      key: "1",
      channel: "Channel",
      creative: "Creative 1",
      createMonth: "Create Month 1",
      type: "Type 1",
      language: "Language 1",
      costShare: "Cost Share 1",
      IPM: "IPM 1",
      CTR: "CTR 1",
      CVR: "CVR 1",
      ROAS_D0: "ROAS_D0 1",
      ROAS_D0LastWeek: "ROAS_D0LastWeek 1",
      ROAS_D7: "ROAS_D7 1",
      ROAS_D7LastWeek: "ROAS_D7LastWeek 1",
      ROAS_D30: "ROAS_D30 1",
      SkAN_ROAS: "SkAN_ROAS 1",
    },
  ];

  return (
    <>
      <p className="font-semibold text-xl">Top Creatives</p>
      <div className="flex gap-5">
        <div className="w-2/3 ">
          <div className="bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium text-lg !my-3">Top 10 Spend Creatives</p>
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
            <p className="font-medium text-lg !my-5">
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
              style={{ overflow: "auto" }}
            />
          </div>

          <div className="mt-5 bg-white p-3 rounded-md shadow-xl">
            <p className="font-medium text-lg !my-5">
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
              style={{ overflow: "auto" }}
            />
          </div>
        </div>
        <div className="p-3 bg-blue-100 rounded-md shadow-xl">
          <p>
            <BulbOutlined /> Creative A recently performing great, spends
            Increasing 50% on Tiktok, scale and expand it to more campaigns!
          </p>
          <p>
            <BulbOutlined /> Creative B & Creative C declined 20% week by week
            on Applovin, please replace with new Creatives
          </p>
        </div>
      </div>
    </>
  );
};

export default Creative;
