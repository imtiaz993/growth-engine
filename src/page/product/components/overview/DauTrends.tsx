import { Spin } from "antd";
import type { ChartDataRow } from "../../../../types";
import SingleAreaChart from "../../../../components/charts/SingleAreaChart";

const DauTrends = ({
  chartData,
  loading,
}: {
  chartData: ChartDataRow[];
  loading: boolean;
}) => {
  return (
    <div className="h-[350px] p-6 bg-white rounded-md shadow-lg relative">
      <h2 className="text-lg font-bold text-gray-800 mb-4">DAU Trends</h2>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin tip="Loading chart..." size="large" />
        </div>
      ) : (
        <SingleAreaChart chartData={chartData} />
      )}
    </div>
  );
};

export default DauTrends;
