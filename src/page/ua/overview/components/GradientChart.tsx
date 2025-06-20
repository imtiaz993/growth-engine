import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
  Legend,
} from "recharts";

interface BubbleData {
  name: string;
  roi: number; // ROAS_D7
  investment: number; // LTV_D7
  contribution: number; // Cost
  color: string;
  key: string;
}

interface ApiBubbleData {
  name: string;
  roas_d7: number;
  ltv_d7: number;
  cost: number;
}

interface FilterState {
  appToken: string | null;
  channels: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
}

interface QuadrantBubbleChartsProps {
  filters: FilterState;
}

interface TooltipPayloadItem {
  payload: BubbleData;
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-md shadow-lg min-w-[200px]">
      <p className="font-bold text-gray-800 mb-2">{data.name}</p>
      <div className="grid grid-cols-2 gap-2">
        <span className="text-gray-600 text-sm">ROAS D7:</span>
        <span className="font-semibold text-sm">{data.roi.toFixed(2)}</span>
        <span className="text-gray-600 text-sm">LTV D7:</span>
        <span className="font-semibold text-sm">
          $
          {data.investment.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="text-gray-600 text-sm">Cost:</span>
        <span className="font-semibold text-sm">
          $
          {data.contribution.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
    </div>
  );
};

const generateColors = (items: string[]): Record<string, string> => {
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
    "#20b2aa",
    "#9370db",
    "#00ced1",
    "#fa8072",
    "#66cdaa",
    "#d8bfd8",
    "#bc8f8f",
    "#87cefa",
    "#e9967a",
  ];
  const colors: Record<string, string> = {};
  items.forEach((item, index) => {
    colors[item] = baseColors[index % baseColors.length];
  });
  return colors;
};

const calculateAverages = (data: BubbleData[]) => {
  if (!data.length) {
    return {
      avgRoi: 0,
      avgInvestment: 0,
      minRoi: 0,
      maxRoi: 0,
      minInvestment: 0,
      maxInvestment: 1,
    };
  }
  const roiValues = data.map((d) => d.roi);
  const investmentValues = data.map((d) => d.investment);
  return {
    avgRoi: roiValues.reduce((sum, val) => sum + val, 0) / roiValues.length,
    avgInvestment:
      investmentValues.reduce((sum, val) => sum + val, 0) /
      investmentValues.length,
    minRoi: Math.min(...roiValues),
    maxRoi: Math.max(...roiValues),
    minInvestment: Math.min(...investmentValues),
    maxInvestment: Math.max(...investmentValues),
  };
};

const renderChart = (
  title: string,
  data: BubbleData[],
  isLoading: boolean,
  error: string | null
) => {
  if (isLoading) {
    return (
      <div className="w-full md:w-1/2">
        <div className="bg-white p-4 rounded-md shadow-md h-[500px]">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
          <div className="text-gray-500 text-sm text-center mt-20">
            Loading data...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full md:w-1/2">
        <div className="bg-white p-4 rounded-md shadow-md h-[500px]">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
          <div className="text-red-500 text-sm text-center mt-20">{error}</div>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="w-full md:w-1/2">
        <div className="bg-white p-4 rounded-md shadow-md h-[500px]">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
          <div className="text-gray-500 text-sm text-center mt-20">
            No data available for the selected filters.
          </div>
        </div>
      </div>
    );
  }

  const {
    avgRoi,
    avgInvestment,
    minRoi,
    maxRoi,
    minInvestment,
    maxInvestment,
  } = calculateAverages(data);

  return (
    <div className="w-full md:w-1/2">
      <div className="bg-white p-4 rounded-md shadow-md h-[500px]">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height="80%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 40 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
              vertical={false}
            />
            <XAxis
              type="number"
              dataKey="roi"
              name="ROAS D7"
              label={{
                value: "ROAS D7",
                position: "insideBottom",
                offset: 0,
                style: { fill: "#666", fontSize: 14 },
              }}
              domain={[minRoi * 0.9, maxRoi * 1.1]}
              tickCount={6}
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <YAxis
              type="number"
              dataKey="investment"
              name="LTV D7"
              scale="log"
              label={{
                value: "LTV D7 (USD)",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#666", fontSize: 14, textAnchor: "middle" },
                offset: 10,
              }}
              tickFormatter={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v.toFixed(2)}`
              }
              domain={[
                Math.max(minInvestment * 0.9, 0.01),
                maxInvestment * 1.1,
              ]}
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={false}
              tickLine={false}
            />
            <ZAxis dataKey="contribution" range={[20, 2000]} name="Cost" />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              x={avgRoi}
              stroke="#888"
              strokeDasharray="3 3"
              label={{
                value: `Avg ROAS: ${avgRoi.toFixed(2)}`,
                position: "top",
                fill: "#888",
                fontSize: 12,
              }}
            />
            <ReferenceLine
              y={avgInvestment}
              stroke="#888"
              strokeDasharray="3 3"
              label={{
                value: `Avg LTV: $${(avgInvestment / 1000).toFixed(1)}K`,
                position: "right",
                fill: "#888",
                fontSize: 12,
              }}
            />
            {data.map((entry) => (
              <Scatter
                key={entry.name}
                name={entry.name}
                data={[entry]}
                fill={entry.color}
                opacity={0.8}
              >
                <LabelList
                  dataKey="name"
                  position="top"
                  fontSize={10}
                  fill="#666"
                />
              </Scatter>
            ))}
            <Legend
              align="right"
              verticalAlign="top"
              height={40}
              content={() => (
                <div className="text-xs text-gray-600 mt-2">
                  Bubble size = Cost
                </div>
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const QuadrantBubbleCharts = ({ filters }: QuadrantBubbleChartsProps) => {
  const [channelData, setChannelData] = useState<BubbleData[]>([]);
  const [geoData, setGeoData] = useState<BubbleData[]>([]);
  const [isLoadingChannels, setIsLoadingChannels] = useState(false);
  const [isLoadingGeos, setIsLoadingGeos] = useState(false);
  const [channelError, setChannelError] = useState<string | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const fetchBubbleData = async (type: "channel" | "geo") => {
    if (!filters.appToken || !filters.startDate || !filters.endDate) {
      return;
    }

    const endpoint =
      type === "channel"
        ? "https://sabre-api.yodo1.me/api/v1/dashboard/chart/channel-bubble"
        : "https://sabre-api.yodo1.me/api/v1/dashboard/chart/geo-bubble";

    try {
      if (type === "channel") {
        setIsLoadingChannels(true);
        setChannelError(null);
      } else {
        setIsLoadingGeos(true);
        setGeoError(null);
      }

      const response = await fetch(endpoint, {
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
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      const processedData: BubbleData[] = data.map(
        (item: ApiBubbleData, index: number) => ({
          name: item.name,
          roi: item.roas_d7, // ROAS D7 for X-axis
          investment: Math.min(item.ltv_d7, 10000), // LTV D7 for Y-axis, capped at 10,000
          contribution: item.cost, // Cost for bubble size
          color: "",
          key: index.toString(),
        })
      );

      const names = processedData.map((item) => item.name);
      const colors = generateColors(names);

      const finalData = processedData.map((item) => ({
        ...item,
        color: colors[item.name],
      }));

      if (type === "channel") {
        setChannelData(finalData);
      } else {
        setGeoData(finalData);
      }
    } catch (error) {
      console.error(`Error fetching ${type} bubble data:`, error);
      const errorMessage = `Failed to load ${type} bubble data.`;
      if (type === "channel") {
        setChannelError(errorMessage);
        setChannelData([]);
      } else {
        setGeoError(errorMessage);
        setGeoData([]);
      }
    } finally {
      if (type === "channel") {
        setIsLoadingChannels(false);
      } else {
        setIsLoadingGeos(false);
      }
    }
  };

  useEffect(() => {
    fetchBubbleData("channel");
    fetchBubbleData("geo");
  }, [
    filters.appToken,
    filters.channels,
    filters.countries,
    filters.startDate,
    filters.endDate,
  ]);

  return (
    <div className="flex flex-col md:flex-row gap-5 mt-4 text-center">
      {renderChart(
        "Quadrant of Main Channels",
        channelData,
        isLoadingChannels,
        channelError
      )}
      {renderChart("Quadrant of Main GEOs", geoData, isLoadingGeos, geoError)}
    </div>
  );
};

export default QuadrantBubbleCharts;
