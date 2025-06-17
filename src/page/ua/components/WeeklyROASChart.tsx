import { useState } from "react";
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
  week: string;
  channels: {
    [key: string]: number;
  };
  ROAS_D0: number;
  ROAS_D7: number;
}

const mockData: ChartData[] = [
  {
    week: "2024年11月",
    channels: {
      Appier: 1200,
      Apple: 800,
      Applovin: 900,
      "Bilibili (呼噜哔哩)": 600,
      Facebook: 1000,
      "Google Ads": 1100,
      IronSource: 800,
      MOLOCO: 900,
      Mintegral: 700,
      "Ocean Engine": 600,
      "Persona.ly": 500,
    },
    ROAS_D0: 0.2,
    ROAS_D7: 0.3,
  },
  {
    week: "2024年12月",
    channels: {
      Appier: 1000,
      Apple: 500,
      Applovin: 600,
      "Bilibili (呼噜哔哩)": 400,
      Facebook: 700,
      "Google Ads": 800,
      IronSource: 600,
      MOLOCO: 700,
      Mintegral: 500,
      "Ocean Engine": 400,
      "Persona.ly": 300,
    },
    ROAS_D0: 0.2,
    ROAS_D7: 0.3,
  },
  {
    week: "2025年1月",
    channels: {
      Appier: 1500,
      Apple: 1000,
      Applovin: 1200,
      "Bilibili (呼噜哔哩)": 800,
      Facebook: 1100,
      "Google Ads": 1300,
      IronSource: 900,
      MOLOCO: 1100,
      Mintegral: 1000,
      "Ocean Engine": 800,
      "Persona.ly": 700,
    },
    ROAS_D0: 0.3,
    ROAS_D7: 0.4,
  },
  {
    week: "2025年2月",
    channels: {
      Appier: 2000,
      Apple: 1500,
      Applovin: 1800,
      "Bilibili (呼噜哔哩)": 1200,
      Facebook: 1700,
      "Google Ads": 1900,
      IronSource: 1100,
      MOLOCO: 1400,
      Mintegral: 1300,
      "Ocean Engine": 1000,
      "Persona.ly": 900,
    },
    ROAS_D0: 0.25,
    ROAS_D7: 0.35,
  },
  {
    week: "2025年3月",
    channels: {
      Appier: 2200,
      Apple: 1700,
      Applovin: 1900,
      "Bilibili (呼噜哔哩)": 1500,
      Facebook: 1800,
      "Google Ads": 2100,
      IronSource: 1300,
      MOLOCO: 1600,
      Mintegral: 1500,
      "Ocean Engine": 1200,
      "Persona.ly": 1100,
    },
    ROAS_D0: 0.28,
    ROAS_D7: 0.42,
  },
  {
    week: "2025年4月",
    channels: {
      Appier: 2400,
      Apple: 1800,
      Applovin: 2100,
      "Bilibili (呼噜哔哩)": 1600,
      Facebook: 1900,
      "Google Ads": 2300,
      IronSource: 1500,
      MOLOCO: 1700,
      Mintegral: 1600,
      "Ocean Engine": 1300,
      "Persona.ly": 1200,
    },
    ROAS_D0: 0.3,
    ROAS_D7: 0.5,
  },
  {
    week: "2025年5月",
    channels: {
      Appier: 2600,
      Apple: 2000,
      Applovin: 2300,
      "Bilibili (呼噜哔哩)": 1700,
      Facebook: 2000,
      "Google Ads": 2500,
      IronSource: 1600,
      MOLOCO: 1900,
      Mintegral: 1700,
      "Ocean Engine": 1400,
      "Persona.ly": 1300,
    },
    ROAS_D0: 0.33,
    ROAS_D7: 0.53,
  },
];

const channelColors: Record<string, string> = {
  Appier: "#8884d8",
  Apple: "#f08080",
  Applovin: "#82ca9d",
  "Bilibili (呼噜哔哩)": "#87ceeb",
  Facebook: "#4682b4",
  "Google Ads": "#f4a460",
  IronSource: "#dda0dd",
  MOLOCO: "#6495ed",
  Mintegral: "#ffb6c1",
  "Ocean Engine": "#ffa07a",
  "Persona.ly": "#cd5c5c",
};

const WeeklyROASChart = () => {
  const [activeChannels, setActiveChannels] = useState<Set<string>>(
    new Set(Object.keys(channelColors))
  );
  // Calculate total revenue for each week
  const processedData = mockData.map((weekData) => ({
    ...weekData,
    totalRevenue: Object.values(weekData.channels).reduce(
      (sum, val) => sum + val,
      0
    ),
  }));

  // Toggle channel visibility
  const handleLegendClick = (channel: string) => {
    console.log("Clicked Channel:", channel);
    console.log("Active Channels:", activeChannels);
    setActiveChannels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(channel)) {
        newSet.delete(channel);
      } else {
        newSet.add(channel);
      }
      console.log("New Active Channels:", newSet);
      return newSet;
    });
  };

  // Add these interfaces above your WeeklyROASChart component
  interface TooltipPayloadItem {
    dataKey: string;
    value: number;
    name: string;
    color: string;
    payload: {
      week: string;
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
  }
  // Custom tooltip without scrolling
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload) return null;

    const revenuePayload = payload.find((p) => p.dataKey === "totalRevenue");
    const roasD0 = payload.find((p) => p.dataKey === "ROAS_D0");
    const roasD7 = payload.find((p) => p.dataKey === "ROAS_D7");

    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md min-w-[300px]">
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
          <div className="grid grid-cols-1 gap-1 max-h-[300px]">
            {payload
              .filter((p) => p.name in channelColors)
              .map((entry) => (
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
      {/* Left Column - Chart */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Total Revenue, ROAS_D0 and ROAS_D7 by Week and Channel
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Stacked bars show revenue by channel, lines show ROAS metrics
        </p>

        <ResponsiveContainer width="100%" height="80%">
          <ComposedChart data={processedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
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
              domain={[0, 0.6]}
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

            {/* Stacked revenue bars */}
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
            {/* ROAS Lines */}
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
      </div>

      {/* Right Column - Channel List */}
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
              <div
                className="ml-auto"
                onClick={(e) => e.stopPropagation()} // Prevent checkbox click from bubbling
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                  checked={activeChannels.has(channel)}
                  onChange={() => handleLegendClick(channel)}
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
