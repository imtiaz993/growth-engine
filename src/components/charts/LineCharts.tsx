import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { TooltipProps } from "recharts";
import { customToFixed } from "../../utils";
import { useEffect, useState } from "react";

interface LineKey {
  key: string;
  color: string;
  name: string;
}
interface DynamicLineChartProps {
  data: unknown[];
  lineKeys: LineKey[];
  xKey: string;
  yDomain?: [number, number];
}

const CustomLegend = ({
  lineKeys,
  toggleLine,
  visibleBars,
}: {
  lineKeys: LineKey[];
  toggleLine: (key: string) => void;
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
          onClick={() => toggleLine(key)}
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
}: TooltipProps<number, string>) => {
  if (
    !active ||
    !payload?.length ||
    !coordinate ||
    coordinate.x === undefined ||
    coordinate.y === undefined
  ) {
    return null;
  }

  const tooltipWidth = 260;
  const tooltipHeight = 200;
  const minMargin = 10;
  const chartContainer = document.querySelector(
    ".recharts-wrapper"
  ) as HTMLElement;
  const containerBox = chartContainer?.getBoundingClientRect();
  if (!containerBox) return null;

  const containerWidth = containerBox.width;
  const containerHeight = chartContainer?.clientHeight || 400;

  let left = coordinate.x + 10;
  let top = coordinate.y - 50;

  if (left + tooltipWidth > containerWidth - minMargin) {
    left = coordinate.x - tooltipWidth - 10;
  }
  if (left < minMargin) left = minMargin;
  if (top + tooltipHeight > containerHeight)
    top = containerHeight - tooltipHeight - 10;
  if (top < minMargin) top = minMargin;

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
        {payload.map((entry) => (
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
              <span className="text-gray-700">{entry.name}</span>
            </div>
            <span className="font-medium text-gray-800">
              {customToFixed(Number(entry.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineCharts = ({
  data,
  lineKeys,
  xKey,
  yDomain,
}: DynamicLineChartProps) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    setVisibleLines(lineKeys.map((l) => l.key));
  }, [lineKeys]);

  const toggleLine = (key: string) => {
    setVisibleLines((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "#999", fontSize: 11, dx: 10 }}
            padding={{ left: 10, right: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={yDomain || ["auto", "auto"]}
            tick={{ fill: "#999", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Legend
            verticalAlign="bottom"
            height={10}
            content={
              <CustomLegend
                lineKeys={lineKeys}
                toggleLine={toggleLine}
                visibleBars={visibleLines}
              />
            }
          />

          {lineKeys.map(
            ({ key, color, name }) =>
              visibleLines.includes(key) && (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  strokeWidth={2}
                  name={name}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;
