import React from "react";
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

// Type definitions
interface BubbleData {
  name: string;
  roi: number;
  investment: number;
  contribution: number;
  color: string;
}

// Define proper types for tooltip payload
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

// Custom Tooltip Component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md min-w-[220px]">
      <p className="font-bold text-gray-800 mb-2">{data.name}</p>
      <div className="grid grid-cols-2 gap-2">
        <span className="text-gray-600">ROI:</span>
        <span className="font-semibold">{data.roi.toFixed(2)}</span>

        <span className="text-gray-600">Investment:</span>
        <span className="font-semibold">
          ${data.investment.toLocaleString()}
        </span>

        <span className="text-gray-600">Contribution:</span>
        <span className="font-semibold">{data.contribution}%</span>
      </div>
    </div>
  );
};

// 🎯 All channels data
const channels: BubbleData[] = [
  {
    name: "TikTok for Business",
    roi: 2.8,
    investment: 35000,
    contribution: 45,
    color: "#8884d8",
  },
  {
    name: "Google Ads",
    roi: 1.5,
    investment: 27000,
    contribution: 32,
    color: "#82ca9d",
  },
  {
    name: "Ocean Engine",
    roi: 1.6,
    investment: 23000,
    contribution: 28,
    color: "#ffc658",
  },
  {
    name: "Apple",
    roi: 1.8,
    investment: 21000,
    contribution: 26,
    color: "#ff7f50",
  },
  {
    name: "Mintegral",
    roi: 1.2,
    investment: 19000,
    contribution: 20,
    color: "#a4de6c",
  },
  {
    name: "Facebook",
    roi: 1.0,
    investment: 16000,
    contribution: 18,
    color: "#d0ed57",
  },
  {
    name: "Applovin",
    roi: 1.1,
    investment: 15000,
    contribution: 17,
    color: "#8dd1e1",
  },
  {
    name: "IronSource",
    roi: 0.9,
    investment: 14000,
    contribution: 15,
    color: "#ffd700",
  },
  {
    name: "Bilibili",
    roi: 1.3,
    investment: 18000,
    contribution: 22,
    color: "#a28fd0",
  },
  {
    name: "Persona.ly",
    roi: 0.8,
    investment: 13000,
    contribution: 13,
    color: "#f08080",
  },
  {
    name: "Unity Ads",
    roi: 0.9,
    investment: 12000,
    contribution: 11,
    color: "#ffb6c1",
  },
  {
    name: "Snapchat",
    roi: 1.0,
    investment: 11000,
    contribution: 12,
    color: "#20b2aa",
  },
  {
    name: "Kuaishou Domestic",
    roi: 0.7,
    investment: 10000,
    contribution: 10,
    color: "#9370db",
  },
];

// 🎯 All GEOs data
const geos: BubbleData[] = [
  {
    name: "US",
    roi: 2.4,
    investment: 42000,
    contribution: 50,
    color: "#8884d8",
  },
  {
    name: "CN",
    roi: 2.1,
    investment: 37000,
    contribution: 45,
    color: "#82ca9d",
  },
  {
    name: "KR",
    roi: 1.9,
    investment: 24000,
    contribution: 28,
    color: "#ffc658",
  },
  {
    name: "ROW",
    roi: 2.0,
    investment: 27000,
    contribution: 30,
    color: "#ff7f50",
  },
  {
    name: "DE",
    roi: 1.6,
    investment: 17000,
    contribution: 18,
    color: "#a4de6c",
  },
  {
    name: "MX",
    roi: 1.7,
    investment: 26000,
    contribution: 19,
    color: "#d0ed57",
  },
  {
    name: "FR",
    roi: 1.5,
    investment: 16000,
    contribution: 17,
    color: "#8dd1e1",
  },
  {
    name: "UK",
    roi: 1.8,
    investment: 24000,
    contribution: 22,
    color: "#ffd700",
  },
  {
    name: "AU",
    roi: 1.7,
    investment: 21500,
    contribution: 20,
    color: "#a28fd0",
  },
  {
    name: "CA",
    roi: 1.6,
    investment: 17000,
    contribution: 18,
    color: "#f08080",
  },
  {
    name: "IT",
    roi: 1.4,
    investment: 30000,
    contribution: 15,
    color: "#ffb6c1",
  },
  {
    name: "SA",
    roi: 1.3,
    investment: 22000,
    contribution: 14,
    color: "#20b2aa",
  },
  {
    name: "NL",
    roi: 1.5,
    investment: 22000,
    contribution: 17,
    color: "#9370db",
  },
  {
    name: "JP",
    roi: 1.7,
    investment: 18000,
    contribution: 19,
    color: "#00ced1",
  },
  {
    name: "SG",
    roi: 1.2,
    investment: 29000,
    contribution: 13,
    color: "#fa8072",
  },
  {
    name: "ES",
    roi: 1.3,
    investment: 19000,
    contribution: 14,
    color: "#66cdaa",
  },
  {
    name: "TH",
    roi: 1.1,
    investment: 12000,
    contribution: 12,
    color: "#d8bfd8",
  },
  {
    name: "HK",
    roi: 0.9,
    investment: 10000,
    contribution: 10,
    color: "#bc8f8f",
  },
  {
    name: "BR",
    roi: 1.0,
    investment: 13000,
    contribution: 12,
    color: "#87cefa",
  },
  {
    name: "TW",
    roi: 1.2,
    investment: 14000,
    contribution: 14,
    color: "#f4a460",
  },
  { name: "SZ", roi: 0.8, investment: 8000, contribution: 8, color: "#e9967a" },
];

// Helper functions
const calculateAverages = (data: BubbleData[]) => {
  const roiValues = data.map((d) => d.roi);
  const investmentValues = data.map((d) => d.investment);

  return {
    avgRoi: roiValues.reduce((a, b) => a + b, 0) / roiValues.length,
    avgInvestment:
      investmentValues.reduce((a, b) => a + b, 0) / investmentValues.length,
    minRoi: Math.min(...roiValues),
    maxRoi: Math.max(...roiValues),
    minInvestment: Math.min(...investmentValues),
    maxInvestment: Math.max(...investmentValues),
  };
};

const renderChart = (title: string, data: BubbleData[]) => {
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
      <div className="bg-white p-4 rounded-md shadow-lg h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>

        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 0, right: 30, bottom: 30, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis
              type="number"
              dataKey="roi"
              name="ROI"
              label={{
                value: "ROI",
                position: "insideBottom",
                offset: -5,
                style: { fill: "#666", fontSize: 14 },
              }}
              domain={[minRoi * 0.9, maxRoi * 1.1]}
              tickCount={6}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value.toFixed(2)}`}
            />

            <YAxis
              type="number"
              dataKey="investment"
              name="Investment Volume"
              label={{
                value: "Investment Volume (USD)",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#666", fontSize: 14, textAnchor: "middle" },
                offset: 10,
              }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              domain={[minInvestment * 0.9, maxInvestment * 1.1]}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <ZAxis
              dataKey="contribution"
              range={[20, 2000]}
              name="Contribution"
            />

            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine
              x={avgRoi}
              stroke="#888"
              strokeDasharray="3 3"
              label={{
                value: `Avg ROI: ${avgRoi.toFixed(2)}`,
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
                value: `Avg Inv: $${(avgInvestment / 1000).toFixed(0)}K`,
                position: "right",
                fill: "#888",
                fontSize: 12,
              }}
            />

            {/* Fixed scatter plot rendering */}
            {data.map((entry) => (
              <Scatter
                key={entry.name}
                name={entry.name}
                data={[entry]}
                fill={entry.color}
                opacity={0.8}
              >
                <LabelList dataKey="name" position="top" fontSize={10} />
              </Scatter>
            ))}

            <Legend
              align="right"
              verticalAlign="top"
              height={40}
              content={() => (
                <div className="text-xs text-gray-600 mt-2">
                  Bubble size = Contribution %
                </div>
              )}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const QuadrantBubbleCharts = () => (
  <div className="flex flex-col md:flex-row text-center space-x-5 mt-5">
    {renderChart("Quadrant of Main Channels", channels)}
    {renderChart("Quadrant of Main GEOs", geos)}
  </div>
);

export default QuadrantBubbleCharts;
