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

import type { TooltipProps } from "recharts";
const chartData = [
  { date: "Jun 13", whale: 48, dolphin: 20, fish: 8 },
  { date: "Jun 14", whale: 62, dolphin: 25, fish: 10 },
  { date: "Jun 15", whale: 58, dolphin: 31, fish: 11 },
  { date: "Jun 16", whale: 64, dolphin: 32, fish: 9 },
  { date: "Jun 17", whale: 98, dolphin: 35, fish: 15 },
  { date: "Jun 18", whale: 55, dolphin: 30, fish: 12 },
  { date: "Jun 19", whale: 48.07, dolphin: 31.82, fish: 8.89 },
];
const areaKeys = [
  { key: "whale", color: "#276EF1", name: "Whale" },
  { key: "dolphin", color: "#F37D38", name: "Dolphin" },
  { key: "fish", color: "#66C2A5", name: "Fish" },
];

const CustomLegend = () => (
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
          const info = areaKeys.find((k) => k.key === entry.dataKey);
          if (!info) return null;

          return (
            <div
              key={entry.dataKey}
              className="flex items-center justify-between px-2"
              style={{ padding: "2px 0" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: info.color }}
                />
                <span className="text-gray-700">{info.name}</span>
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
const MultilineAreaChart = () => {
  return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis
            dataKey="date"
             tick={{ fill: "#999", fontSize: 11, dx: 10 }}
            axisLine={false}
             padding={{ left: 10, right: 10 }} 
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            
            tick={{ fill: "#999", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} content={<CustomLegend />} />
          {areaKeys.map(({ key, color, name }) => (
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
