import { Spin } from "antd";
import { useState } from "react";
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
  Legend,
} from "recharts";
import type { BubbleData } from "../../types";
import { customToFixed } from "../../utils";

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
      <p className="font-bold text-gray-800 mb-2 text-left">{data.name}</p>
      <div className="grid grid-cols-2 gap-2 text-left">
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

// Calculate percentiles for outlier trimming
const calculatePercentile = (data: BubbleData[], percentile: number) => {
  const roiValues = data.map((d) => d.roi).sort((a, b) => a - b);
  const investmentValues = data.map((d) => d.investment).sort((a, b) => a - b);
  const roiIndex = Math.floor(roiValues.length * percentile);
  const investmentIndex = Math.floor(investmentValues.length * percentile);
  return {
    pRoi: roiValues[roiIndex] || 0,
    pInvestment: investmentValues[investmentIndex] || 0,
  };
};

const QuadrantChart = ({
  title,
  data,
  isLoading,
  error,
}: {
  title: string;
  data: BubbleData[];
  isLoading: boolean;
  error: string | null;
}) => {
  const [percentile, setPercentile] = useState<number>(0.9); // Default percentile set to 0.9 (90%)

  const percentileOptions = [
    { label: "95%", value: 0.95 },
    { label: "90%", value: 0.9 },
    { label: "85%", value: 0.85 },
    { label: "80%", value: 0.8 },
    { label: "75%", value: 0.75 },
    { label: "70%", value: 0.7 },
    { label: "60%", value: 0.6 },
    { label: "50%", value: 0.5 },
  ];

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

  if (!isLoading && !data.length) {
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

  const { avgRoi, avgInvestment } = calculateAverages(data);
  const { pRoi, pInvestment } = calculatePercentile(data, percentile);

  // Filter data for normalized view
  const displayData = data.filter(
    (d) => d.roi <= pRoi && d.investment <= pInvestment
  );

  // Calculate axis domains
  const roiDomain = [0, pRoi * 1.1];
  const investmentDomain = [0, pInvestment * 1.1];

  // Count trimmed outliers
  const trimmedCount = data.length - displayData.length;

  return (
    <div className="w-full md:w-1/2">
      <Spin spinning={isLoading} className="!top-1/10">
        <div className="bg-white p-4 rounded-md shadow-md h-[500px]">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <div>
              {trimmedCount > 0 && (
                <div className="text-xs text-yellow-600 mb-2">
                  ⚠️ {trimmedCount} outlier{trimmedCount > 1 ? "s" : ""} trimmed
                  (top {customToFixed((1 - percentile) * 100)}%)
                </div>
              )}
              <div className="flex justify-end items-center gap-4">
                <label className="flex items-center text-sm text-gray-600">
                  Percentile:
                  <select
                    value={percentile}
                    onChange={(e) => setPercentile(parseFloat(e.target.value))}
                    className="!ml-2 border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                  >
                    {percentileOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>

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
                  offset: -10,
                  style: { fill: "#666", fontSize: 14 },
                }}
                domain={roiDomain}
                tickCount={6}
                tick={{ fontSize: 12, fill: "#666" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) =>
                  value >= 1000
                    ? `${(value / 1000).toFixed(1)}K`
                    : value.toFixed(2)
                }
              />
              <YAxis
                type="number"
                dataKey="investment"
                name="LTV D7"
                label={{
                  value: "LTV D7 (USD)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#666", fontSize: 14, textAnchor: "middle" },
                  offset: -10,
                }}
                tickFormatter={(v) =>
                  v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v.toFixed(2)}`
                }
                domain={investmentDomain}
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
              {displayData.map((entry) => (
                <Scatter
                  key={entry.name}
                  name={entry.name}
                  data={[entry]}
                  fill={entry.color}
                  opacity={0.8}
                />
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
      </Spin>
    </div>
  );
};
export default QuadrantChart;
