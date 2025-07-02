import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import React from "react";
import type { TooltipProps } from "recharts";
import type { ChartDataRow } from "../../types";

// Default area keys for fallback
const defaultAreaKeys = [
  { key: "whale", color: "#276EF1", name: "Whale" },
  { key: "dolphin", color: "#F37D38", name: "Dolphin" },
  { key: "fish", color: "#66C2A5", name: "Fish" },
];
const colorPalette = [
  "#276EF1", "#F37D38", "#66C2A5", "#5E72E4", "#F1C40F", "#8E44AD", "#2ECC71"
];
function getAreaKeysFromData(data: ChartDataRow[]): { key: string, color: string, name: string }[] {
  if (!data || data.length === 0) return defaultAreaKeys;
  const allKeys = Object.keys(data[0]).filter(k => k !== "date");
  return allKeys.map((key, idx) => ({
    key,
    color: colorPalette[idx % colorPalette.length],
    name: key.charAt(0).toUpperCase() + key.slice(1)
  }));
}

const CustomLegend = ({ areaKeys }: { areaKeys: { key: string, color: string, name: string }[] }) => (
  <div className="flex justify-center gap-6 pt-2 text-sm">
    {areaKeys.map(({ key, color, name }) => (
      <div key={key} className="flex items-center gap-2">
        <div className="w-3 h-3" style={{ backgroundColor: color }} />
        <span style={{ color }}>{name}</span>
      </div>
    ))}
  </div>
);
const CustomTooltip = ({
  active,
  payload,
  label,
  coordinate,
}: TooltipProps<number, string>) => {
  if (
    !active ||
    !payload?.length ||
    !coordinate ||
    coordinate.x == null ||
    coordinate.y == null
  ) {
    return null;
  }
  const tooltipWidth = 260;
  const tooltipHeight = 200;
  const minMargin = 10;

  const chartContainer = document.querySelector(".recharts-wrapper") as HTMLElement;
  const containerBox = chartContainer?.getBoundingClientRect();
  if (!containerBox) return null;

  const containerWidth = containerBox.width;
  const containerHeight = chartContainer?.clientHeight || 400;

  let left = coordinate.x + 10;
  let top = coordinate.y - 50;

  if (left + tooltipWidth > containerWidth - minMargin) {
    left = coordinate.x - tooltipWidth - 10;
  }
  if (left < minMargin) {
    left = minMargin;
  }
  if (top + tooltipHeight > containerHeight) {
    top = containerHeight - tooltipHeight - 10;
  }
  if (top < minMargin) {
    top = minMargin;
  }

  return (
    <div
      className="absolute z-50 min-w-[260px] p-3"
      style={{
        left,
        top,
        pointerEvents: "none",
        border: "1px solid #eee",
        borderRadius: "6px",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        fontSize: "12px",
      }}
    >
      <p className="font-semibold text-gray-800 mb-2">{label}</p>
      <div className="grid gap-2">
        {payload.map((entry) => {
          return (
            <div
              key={entry.dataKey}
              className="flex items-center justify-between px-2"
              style={{ padding: "2px 0" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-700">{entry.dataKey}</span>
              </div>
              <span className="font-medium text-gray-800">
                {Number(entry.value).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface MultilineAreaChartProps {
  chartData?: ChartDataRow[];
  isLoading?: boolean;
  error?: string | null;
  areaKeys?: { key: string, color: string, name: string }[];
}

const MultilineAreaChart: React.FC<MultilineAreaChartProps> = ({ chartData, isLoading, error, areaKeys }) => {
  let data: ChartDataRow[] = chartData && chartData.length > 0 ? chartData : [];

  // Detect suit-sdk format (array of group_0/data_map_0)
  type GroupApiData = { group_0: string; data_map_0: Record<string, number> };
  function isGroupApiDataArray(arr: unknown[]): arr is GroupApiData[] {
    return arr.length > 0 &&
      typeof arr[0] === 'object' && arr[0] !== null &&
      'group_0' in arr[0] && typeof (arr[0] as { group_0: unknown }).group_0 === 'string' &&
      'data_map_0' in arr[0] && typeof (arr[0] as { data_map_0: unknown }).data_map_0 === 'object';
  }
  if (Array.isArray(data) && isGroupApiDataArray(data)) {
    // Transform to date-centric array
    const dateMap: Record<string, ChartDataRow> = {};
    const allGroups = new Set<string>();
    data.forEach((item) => {
      const group = String(item.group_0);
      allGroups.add(group);
      const dataMap = item.data_map_0 || {};
      Object.entries(dataMap).forEach(([date, value]) => {
        const dateStr = String(date);
        if (!dateMap[dateStr]) dateMap[dateStr] = { date: dateStr };
        dateMap[dateStr][group] = Number(value);
      });
    });
    // Fill missing group values with 0 for each date
    const groupList: string[] = Array.from(allGroups);
    data = Object.values(dateMap).map((row) => {
      groupList.forEach(group => {
        if (!(group in row)) row[group] = 0;
      });
      return row;
    });
    // Sort by date
    data.sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime());
  }

  // Use areaKeys prop if provided, otherwise generate from data
  const usedAreaKeys = areaKeys && areaKeys.length > 0 ? areaKeys : getAreaKeysFromData(data);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
  }
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full">No data available</div>;
  }

  // Find max value for Y axis
  const maxDataValue = Math.max(
    ...data.flatMap((d) => usedAreaKeys.map(({ key }) => Number(d[key]) || 0))
  );
  const tickStep = maxDataValue > 1 ? Math.ceil(maxDataValue / 5) : 10;
  const maxTick = Math.ceil(maxDataValue / tickStep) * tickStep;
  const ticks = Array.from(
    { length: Math.ceil(maxTick / tickStep) + 1 },
    (_, i) => i * tickStep
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#999", fontSize: 11, dx: 10 }}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
          tickLine={false}
        />
        <YAxis
          domain={[0, maxTick]}
          ticks={ticks}
          tick={{ fill: "#999", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="bottom" height={36} content={<CustomLegend areaKeys={usedAreaKeys} />} />
        {usedAreaKeys.map(({ key, color, name }) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stackId="1"
            stroke={color}
            fill={color}
            name={name}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MultilineAreaChart;
