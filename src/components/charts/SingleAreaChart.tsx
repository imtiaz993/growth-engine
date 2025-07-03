import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { ChartDataRow } from "../../types";
import { customToFixed } from "../../utils";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md text-sm">
      <p className="font-semibold text-gray-800 mb-2">{label}</p>
      <div className="flex justify-between gap-4">
        <span className="text-gray-600">DAU</span>
        <span className="font-medium text-gray-800">
          {customToFixed(Number(payload[0].value))}
        </span>
      </div>
    </div>
  );
};
const SingleAreaChart = ({ chartData }: { chartData: ChartDataRow[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e5e7eb"
          horizontal={true}
          vertical={false}
        />
        <XAxis
          dataKey="date"
          textAnchor="end"
          tickMargin={12}
          tick={{ fill: "#666", fontSize: 11, dx: 10 }}
          padding={{ left: 0, right: 10 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fill: "#666", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />

        <Area
          type="monotone"
          dataKey="value"
          name="DAU"
          stroke="#000055"
          fill="#e7f4fc"
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default SingleAreaChart;
