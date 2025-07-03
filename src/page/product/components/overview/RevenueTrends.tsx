import BarCharts from "../../../../components/charts/BarChart";
import type { ChartDataRow } from "../../../../types";

const metricOptions = [
  { label: "Ad Revenue", value: "adRevenue", color: "#276EF1" },
  { label: "IAP Revenue", value: "iapRevenue", color: "#F37D38" },
];

// Add select-all logic to barKeys too
const barKeys = metricOptions.map((opt) => ({
  key: opt.value,
  color: opt.color,
  name: opt.label,
}));

const RevenueTrends = ({
  chartData,
  loading,
  error,
}: {
  chartData: ChartDataRow[];
  loading: boolean;
  error: string | null;
}) => {
  return (
    <div className="h-[470px] p-6 bg-white rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Ad Revenue Trends
        </h2>
      </div>
      <BarCharts
        chartData={chartData}
        isLoading={loading}
        error={error}
        barKeys={barKeys}
        height={350}
      />
    </div>
  );
};

export default RevenueTrends;
