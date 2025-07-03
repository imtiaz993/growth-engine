import { Spin } from "antd";
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
import type { ChartDataRow } from "../../types";
import { useEffect, useState } from "react";
import { customToFixed } from "../../utils";

export interface BarKey {
  key: string;
  color: string;
  name: string;
}

interface BarChartsProps {
  chartData: ChartDataRow[];
  isLoading: boolean;
  error: string | null;
  barKeys: BarKey[];
  height?: number;
}

const CustomLegend = ({
  lineKeys,
  toggleBar,
  visibleBars,
}: {
  lineKeys: BarKey[];
  toggleBar: (key: string) => void;
  visibleBars: string[];
}) => (
  <div className="flex justify-center">
    <div className="flex gap-6 overflow-auto justify-start pt-2">
      {lineKeys.map(({ key, color, name }) => (
        <div
          key={key}
          className={`flex items-center gap-2 cursor-pointer ${
            visibleBars.includes(key) ? "" : "line-through"
          }`}
          onClick={() => toggleBar(key)}
        >
          <div className="w-3 h-3" style={{ backgroundColor: color }} />
          <span className="text-[12px] whitespace-nowrap" style={{ color }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const CustomTooltip = ({
  active,
  payload,
  label,
  coordinate,
  barKeys,
}: TooltipProps<number, string> & { barKeys: BarKey[] }) => {
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
                {customToFixed(Number(entry.value))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BarCharts = ({
  chartData,
  isLoading,
  error,
  barKeys,
  height,
}: BarChartsProps) => {
  const [visibleBars, setVisibleBars] = useState<string[]>([]);

  useEffect(() => {
    setVisibleBars(barKeys.map((b) => b.key));
  }, [barKeys]);

  const toggleBar = (key: string) => {
    setVisibleBars((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin tip="Loading chart..." className="!top-1/10" size="large" />
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!chartData.length)
    return <div className="text-center py-8">No data available.</div>;

  const maxValue = Math.max(
    ...chartData.map((item) =>
      barKeys.reduce(
        (sum, { key }) => sum + (typeof item[key] === "number" ? item[key] : 0),
        0
      )
    )
  );
  const autoStep =
    maxValue > 10000
      ? 5000
      : maxValue > 1000
      ? 1000
      : maxValue > 100
      ? 100
      : 10;
  const tickStep = autoStep;
  const maxTick = Math.ceil(maxValue / tickStep) * tickStep;
  const ticks = Array.from(
    { length: maxTick / tickStep + 1 },
    (_, i) => i * tickStep
  );

  return (
    <ResponsiveContainer width="100%" height={height ? height : 300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
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
          interval={0}
          angle={-45}
          textAnchor="end"
          tickMargin={12}
          tick={(props) => {
            const { x, y, payload, index } = props;
            const total =
              props && props.payload && props.payload.length
                ? props.payload.length
                : chartData?.length || 0;
            const shouldShow = total > 20 ? index % 2 === 0 : true;
            if (!shouldShow) return <g />;
            return (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={8}
                  textAnchor="middle"
                  fill="#999"
                  fontSize={11}
                >
                  {payload.value}
                </text>
              </g>
            );
          }}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#666", fontSize: 12 }}
          domain={[0, maxTick]}
          ticks={ticks}
        />

        <Tooltip content={<CustomTooltip barKeys={barKeys} />} cursor={false} />
        <Legend
          verticalAlign="bottom"
          height={10}
          content={
            <CustomLegend
              lineKeys={barKeys}
              toggleBar={toggleBar}
              visibleBars={visibleBars}
            />
          }
        />
        {barKeys.map(
          ({ key, color, name }) =>
            visibleBars.includes(key) && (
              <Bar
                key={key}
                dataKey={key}
                fill={color}
                name={name}
                stackId={1}
              />
            )
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
