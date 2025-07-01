import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";

type BarData = {
  date: string;
  day0?: number;
  week1?: number;
  month1?: number;
  before3?: number;
  after3?: number;
};

interface BarChartsProps {
  chartData: BarData[];
  isLoading: boolean;
  error: string | null;
}

const barKeys = [
  { key: "day0", color: "#1f77b4", name: "0. Day" },
  { key: "week1", color: "#ff7f0e", name: "1. Week 1" },
  { key: "month1", color: "#1fc9ff", name: "2. Month 1" },
  { key: "before3", color: "#9467bd", name: "3. Before month 3" },
  { key: "after3", color: "#fdbf00", name: "4. After month 3" },
] as const;

const CustomTooltip = ({
  active,
  payload,
  label,
  coordinate,
}: TooltipProps<number, string>) => {
  if (!active || !payload?.length || !coordinate) return null;

  const tooltipWidth = 200;
  const tooltipHeight = 140;
  const minMargin = 8;

  const chartWrapper = document.querySelector(
    ".recharts-wrapper"
  ) as HTMLElement;
  const chartWidth = chartWrapper?.offsetWidth || 800;
  const chartHeight = chartWrapper?.offsetHeight || 400;
  const x = coordinate?.x ?? 0;
  const y = coordinate?.y ?? 0;

  let leftPos = x + 12;
  let topPos = y - tooltipHeight / 2;

  const canFitRight = x + 12 + tooltipWidth <= chartWidth - minMargin;
  const canFitLeft = x - tooltipWidth - 12 >= minMargin;

  if (!canFitRight && canFitLeft) {
    leftPos = x - tooltipWidth - 12;
  } else if (!canFitRight && !canFitLeft) {
    leftPos = Math.max(minMargin, chartWidth - tooltipWidth - minMargin);
  }

  if (topPos + tooltipHeight > chartHeight) {
    topPos = chartHeight - tooltipHeight - 10;
  }
  if (topPos < minMargin) {
    topPos = minMargin;
  }

  return (
    <div
      className="bg-white p-2 border border-gray-300 shadow-md rounded text-xs absolute z-50"
      style={{
        left: `${leftPos}px`,
        top: `${topPos}px`,
        minWidth: tooltipWidth,
        maxWidth: tooltipWidth,
        pointerEvents: "none",
      }}
    >
      <p className="font-semibold text-gray-700 mb-1 text-sm">{label}</p>
      <div className="space-y-1">
        {payload.map((entry) => {
          const barInfo = barKeys.find((b) => b.key === entry.dataKey);
          if (!barInfo) return null;

          return (
            <div
              key={entry.dataKey}
              className="flex justify-between items-center px-1"
            >
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: barInfo.color }}
                />
                <span className="text-[11px] text-gray-700">
                  {barInfo.name}
                </span>
              </div>
              <span className="text-[11px] font-medium text-gray-800">
                {Number(entry.value).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BarCharts = ({ chartData, isLoading, error }: BarChartsProps) => {
  if (isLoading)
    return <div className="text-center py-8">Loading chart...</div>;
  if (error)
    return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!chartData.length)
    return <div className="text-center py-8">No data available.</div>;

  const tickStep = 5000;
  const maxValue = Math.max(
    ...chartData.map((item) =>
      barKeys.reduce((sum, { key }) => sum + (item[key] || 0), 0)
    )
  );
  const maxTick = Math.ceil(maxValue / tickStep) * tickStep;
  const ticks = Array.from(
    { length: maxTick / tickStep + 1 },
    (_, i) => i * tickStep
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 10, left: 5, bottom: 60 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal
          vertical={false}
          stroke="#f0f0f0"
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          interval={3}
          tick={{ fill: "#999", fontSize: 11, dx: 10 }}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#666", fontSize: 12 }}
          domain={[0, maxTick]}
          ticks={ticks}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "transparent" }}
          wrapperStyle={{ overflow: "visible", pointerEvents: "none" }}
        />
        <Legend
          verticalAlign="bottom"
          height={70}
          wrapperStyle={{
            paddingTop: 8,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            rowGap: 12,
            columnGap: 24,
            fontSize: 12,
            width: "100%",
          }}
        />
        {barKeys.map(({ key, color, name }) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={color}
            name={name}
            barSize={50}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
