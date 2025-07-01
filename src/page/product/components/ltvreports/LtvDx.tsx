import { useState } from "react";
import { Select } from "antd";
import DynamicLineChart from "../../../../components/charts/LineCharts";
const colors = [
  "#f57c00",
  "#1976d2",
  "#0288d1",
  "#fbc02d",
  "#8e24aa",
  "#388e3c",
  "#d32f2f",
  "#5e35b1",
];
const lines = [
  "2025-05-20",
  "2025-05-21",
  "2025-05-22",
  "2025-05-23",
  "2025-05-24",
  "2025-05-25",
  "2025-05-26",
];
type ChartData = {
  day: number;
  dayLabel: string;
  [key: string]: number | string | null;
};
const chartData: ChartData[] = Array.from({ length: 31 }, (_, i) => {
  const entry: ChartData = { day: i, dayLabel: `Day ${i}` };
  lines.forEach((line, idx) => {
    const maxDaysAvailable = 31 - idx;
    entry[line] =
      i <= maxDaysAvailable
        ? Math.max(
            0,
            Math.round(
              100 + i * 20 + Math.sin(i + idx) * 50 + Math.random() * 40 - 20
            )
          )
        : null;
  });
  return entry;
});

const ltvLineKeys = lines.map((line, index) => ({
  key: line,
  color: colors[index % colors.length],
  name: line,
}));

const LtvDx = () => {
  const [selectedLtv, setSelectedLtv] = useState<string | null>("LTV D30");
  const [selectedRange, setSelectedRange] = useState<string | null>(
    "Last 30 days"
  );

  const ltvOptions = [
    { label: "LTV D0", value: "LTV D0" },
    { label: "LTV D7", value: "LTV D7" },
    { label: "LTV D14", value: "LTV D14" },
    { label: "LTV D30", value: "LTV D30" },
  ];

  const rangeOptions = [
    { label: "Last 7 days", value: "Last 7 days" },
    { label: "Last 14 days", value: "Last 14 days" },
    { label: "Last 30 days", value: "Last 30 days" },
  ];

  return (
    <div className="h-[600px] p-6 bg-white rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-gray-800">LTV Detailed Curve</h2>

        <div className="flex gap-3 items-center flex-wrap">
          <Select
            value={selectedLtv}
            options={ltvOptions}
            className="min-w-[150px]"
            onChange={(value) => setSelectedLtv(value)}
          />
          <Select
            value={selectedRange}
            options={rangeOptions}
            className="min-w-[150px]"
            onChange={(value) => setSelectedRange(value)}
          />
        </div>
      </div>

      <DynamicLineChart
        data={chartData}
        lineKeys={ltvLineKeys}
        xKey="dayLabel"
        yDomain={[0, 800]}
      />
    </div>
  );
};

export default LtvDx;
