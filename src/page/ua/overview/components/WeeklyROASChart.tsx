import { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Data structure with proper typing
interface ChartData {
  week_to_date_range: string;
  channels: { [key: string]: number };
  ROAS_D0: number;
  ROAS_D7: number;
}

interface FilterState {
  appToken: string | null;
  channels: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
}

interface WeeklyROASChartProps {
  filters: FilterState;
}

// Function to generate colors for channels dynamically
const generateChannelColors = (channels: string[]): Record<string, string> => {
  const baseColors = [
    "#8884d8",
    "#f08080",
    "#82ca9d",
    "#87ceeb",
    "#4682b4",
    "#f4a460",
    "#dda0dd",
    "#6495ed",
    "#ffb6c1",
    "#ffa07a",
    "#cd5c5c",
    "#6b7280",
    "#10b981",
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];
  const colors: Record<string, string> = {};
  channels.forEach((channel, index) => {
    colors[channel] = baseColors[index % baseColors.length];
  });
  return colors;
};

const WeeklyROASChart = ({ filters }: WeeklyROASChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [channelColors, setChannelColors] = useState<Record<string, string>>(
    {}
  );
  const [activeChannels, setActiveChannels] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChartData = async () => {
    if (!filters.appToken || !filters.startDate || !filters.endDate) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://sabre-api.yodo1.me/api/v1/dashboard/chart/channel-weekly-roas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            app_token: filters.appToken,
            start_date: filters.startDate ?? "",
            end_date: filters.endDate ?? "",
            filters: {
              channels: filters.channels.length ? filters.channels : [],
              countries: filters.countries.length ? filters.countries : [],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      const processedData: ChartData[] = data.map((item, index: number) => ({
        week_to_date_range: item.week_to_date_range,
        channels: item.channels,
        ROAS_D0: item.roas_d0,
        ROAS_D7: item.roas_d7,
        key: index.toString(),
      }));

      const allChannels = Array.from(
        new Set(processedData.flatMap((item) => Object.keys(item.channels)))
      );
      const newChannelColors = generateChannelColors(allChannels);

      setChartData(processedData);
      setChannelColors(newChannelColors);
      setActiveChannels(new Set(allChannels));
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setError("Failed to load chart data.");
      setChartData([]);
      setChannelColors({});
      setActiveChannels(new Set());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [
    filters.appToken,
    filters.channels,
    filters.countries,
    filters.startDate,
    filters.endDate,
  ]);

  const processedData = chartData.map((weekData) => ({
    ...weekData,
    totalRevenue: Object.values(weekData.channels).reduce(
      (sum, val) => sum + val,
      0
    ),
  }));

  const handleLegendClick = (channel: string) => {
    setActiveChannels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(channel)) {
        newSet.delete(channel);
      } else {
        newSet.add(channel);
      }
      return newSet;
    });
  };

  interface TooltipPayloadItem {
    dataKey: string;
    value: number;
    name: string;
    color: string;
    payload: {
      week_to_date_range: string;
      channels: Record<string, number>;
      ROAS_D0: number;
      ROAS_D7: number;
      totalRevenue: number;
    };
  }

  interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
    coordinate?: { x: number; y: number };
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
    coordinate,
  }: CustomTooltipProps) => {
    if (!active || !payload || !coordinate) return null;

    const revenuePayload = payload.find((p) => p.dataKey === "totalRevenue");
    const roasD0 = payload.find((p) => p.dataKey === "ROAS_D0");
    const roasD7 = payload.find((p) => p.dataKey === "ROAS_D7");
    const channelData = payload.filter((p) => p.name in channelColors);

    // Sort channel data in descending order
    const sortedChannelData = [...channelData].sort(
      (a, b) => (b.value || 0) - (a.value || 0)
    );

    // Calculate tooltip position
    const tooltipWidth = 300; // Approximate width of tooltip
    const windowWidth = window.innerWidth;
    let leftPos = coordinate.x + 10; // Position to the right of cursor
    let topPos = coordinate.y - 10; // Align with top of bar
    if (leftPos + tooltipWidth > windowWidth) {
      leftPos = coordinate.x - tooltipWidth - 10; // Move to left if overflow
    }
    const chartContainer = document.querySelector(".recharts-wrapper");
    const chartHeight = chartContainer?.clientHeight || 400;
    if (topPos + 200 > chartHeight) {
      // 200 is approximate tooltip height
      topPos = chartHeight - 210;
    } else if (topPos < 0) {
      topPos = 0;
    }

    return (
      <div
        className="bg-white p-4 border border-gray-200 shadow-lg rounded-md min-w-[300px] absolute z-50"
        style={{
          top: `${topPos}px`,
          left: `${leftPos}px`,
        }}
      >
        <p className="font-bold text-gray-800 mb-2">{label}</p>

        <div className="grid grid-cols-3 gap-4 mb-3">
          {revenuePayload && (
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="font-semibold">
                ${revenuePayload.value.toLocaleString()}
              </p>
            </div>
          )}
          {roasD0 && (
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-xs text-gray-500">ROAS D0</p>
              <p className="font-semibold">
                {(roasD0.value * 100).toFixed(0)}%
              </p>
            </div>
          )}
          {roasD7 && (
            <div className="bg-green-50 p-2 rounded">
              <p className="text-xs text-gray-500">ROAS D7</p>
              <p className="font-semibold">
                {(roasD7.value * 100).toFixed(0)}%
              </p>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Channel Revenue:
          </p>
          <div className="grid grid-cols-1 gap-1">
            {sortedChannelData.map((entry) => (
              <div
                key={entry.name}
                className="flex items-center py-1 px-2 hover:bg-gray-50 rounded"
              >
                <div
                  className="w-3 h-3 mr-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm truncate flex-grow min-w-0">
                  {entry.name}
                </span>
                <span className="text-sm font-semibold ml-2 flex-shrink-0">
                  ${entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[500px] p-6 bg-white rounded-md shadow-lg flex relative z-10">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Total Revenue, ROAS_D0 and ROAS_D7 by Week and Channel
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Stacked bars show revenue by channel, lines show ROAS metrics
        </p>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {processedData && processedData.length > 0 ? (
          <ResponsiveContainer width="100%" height="80%">
            <ComposedChart data={processedData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="week_to_date_range"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 10 }}
              />
              <YAxis
                yAxisId="revenue"
                orientation="left"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                label={{
                  value: "Total Revenue (USD)",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#666", fontSize: 14 },
                  offset: 2,
                }}
              />
              <YAxis
                yAxisId="roas"
                orientation="right"
                domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.2)]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#666", fontSize: 12 }}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                label={{
                  value: "ROAS (%)",
                  angle: -90,
                  position: "insideRight",
                  style: { textAnchor: "middle", fill: "#666", fontSize: 14 },
                  offset: 0,
                }}
              />
              <Tooltip content={<CustomTooltip />} />

              {Object.keys(channelColors).map(
                (channel) =>
                  activeChannels.has(channel) && (
                    <Bar
                      key={channel}
                      yAxisId="revenue"
                      dataKey={`channels.${channel}`}
                      stackId="revenue"
                      name={channel}
                      fill={channelColors[channel]}
                      barSize={60}
                    >
                      {processedData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={channelColors[channel]}
                        />
                      ))}
                    </Bar>
                  )
              )}
              <Line
                yAxisId="roas"
                type="monotone"
                dataKey="ROAS_D0"
                stroke="#4a5568"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name="ROAS D0"
              />
              <Line
                yAxisId="roas"
                type="monotone"
                dataKey="ROAS_D7"
                stroke="#2e8b57"
                strokeWidth={3}
                dot={{ r: 5, fill: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
                name="ROAS D7"
              />
            </ComposedChart>
          </ResponsiveContainer>
        ) : isLoading ? (
          <div className="text-gray-500 text-sm mb-4 mt-20">
            Loading data...
          </div>
        ) : (
          <div className="text-gray-500 text-sm mb-4 mt-20">
            No data available for the selected filters.
          </div>
        )}
      </div>

      <div className="w-64 ml-6 pl-6 border-l border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Channels</h3>
        <div className="max-h-[400px] overflow-y-auto pr-2">
          {Object.entries(channelColors).map(([channel, color]) => (
            <div
              key={channel}
              className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleLegendClick(channel)}
            >
              <div
                className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm font-medium text-gray-700 truncate">
                {channel}
              </span>
              <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                  checked={activeChannels.has(channel)}
                  onChange={() => handleLegendClick(channel)}
                  disabled={isLoading}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyROASChart;
