import { Spin } from "antd";
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
import { customToFixed } from "../../utils";

interface ChartDataItem {
  week_to_date_range: string;
  channels: Record<string, number>;
  ROAS_D0: number;
  ROAS_D7: number;
  [key: string]: string | number | Record<string, number>;
}

interface ChannelsChartProps {
  isLoading: boolean;
  error: string | null;
  chartData: ChartDataItem[];
  activeChannels: Set<string>;
  setActiveChannels: React.Dispatch<React.SetStateAction<Set<string>>>;
  channelColors: Record<string, string>;
}

const ChannelsChart = ({
  isLoading,
  error,
  chartData,
  activeChannels,
  setActiveChannels,
  channelColors,
}: ChannelsChartProps) => {
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
    const sortedChannelData = [...channelData].sort(
      (a, b) => (b.value || 0) - (a.value || 0)
    );
    const tooltipWidth = 300;
    const windowWidth = window.innerWidth;
    let leftPos = coordinate.x + 10;
    let topPos = coordinate.y - 10;
    if (leftPos + tooltipWidth > windowWidth) {
      leftPos = coordinate.x - tooltipWidth - 10;
    }
    const chartContainer = document.querySelector(".recharts-wrapper");
    const chartHeight = chartContainer?.clientHeight || 400;
    if (topPos + 200 > chartHeight) {
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
                {roasD0.value !== null && customToFixed(roasD0.value * 100)}%
              </p>
            </div>
          )}
          {roasD7 && (
            <div className="bg-green-50 p-2 rounded">
              <p className="text-xs text-gray-500">ROAS D7</p>
              <p className="font-semibold">
                {roasD7.value !== null && customToFixed(roasD7.value * 100)}%
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
                  ${entry.value && customToFixed(entry.value).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Spin spinning={isLoading} className="!top-1/10">
      <div className="h-[500px] p-6 bg-white rounded-md shadow-lg flex relative z-10">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
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
                    style: {
                      textAnchor: "middle",
                      fill: "#666",
                      fontSize: 14,
                    },
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
                    style: {
                      textAnchor: "middle",
                      fill: "#666",
                      fontSize: 14,
                    },
                    offset: 0,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />

                {Object.keys(channelColors).map((channel) =>
                  activeChannels.has(channel) ? (
                    <Bar
                      key={channel}
                      yAxisId="revenue"
                      dataKey={`channels.${channel}`}
                      stackId="revenue"
                      name={channel}
                      fill={channelColors[channel]}
                      barSize={60}
                    >
                      {processedData.map((_, index: number) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={channelColors[channel]}
                        />
                      ))}
                    </Bar>
                  ) : null
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
          ) : (
            !isLoading && (
              <div className="text-gray-500 text-sm mb-4 mt-20">
                No data available for the selected filters.
              </div>
            )
          )}
        </div>

        <div className="w-64 ml-6 pl-6 border-l border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Channels</h3>
          <div className="max-h-[400px] overflow-y-auto pr-2">
            {Object.entries(channelColors).map(([channel]) => (
              <div
                key={channel}
                className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleLegendClick(channel)}
              >
                <div
                  className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: channelColors[channel] || "#ccc" }}
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
    </Spin>
  );
};
export default ChannelsChart;
