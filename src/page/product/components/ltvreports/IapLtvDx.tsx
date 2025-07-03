import { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import DynamicLineChart from "../../../../components/charts/LineCharts";
import type { ChartDataRow } from "../../../../types";
import { getIapLtvDetail } from "../../../../api/product";

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

const IapLtvDx = () => {
  const [selectedLtv, setSelectedLtv] = useState<string | null>("LTV D30");
  const [selectedRange, setSelectedRange] = useState<string | null>("Last 30 days");
  const [chartData, setChartData] = useState<ChartDataRow[]>([]);
  const [lineKeys, setLineKeys] = useState<{ key: string; color: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getIapLtvDetail();
        if (response.status !== 200) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = response.data.data || [];
        if (!Array.isArray(data)) throw new Error("Invalid response format");
        setChartData(data);
        // Dynamically get all keys except 'date' and 'ta_app_install_count'
        const keys = Object.keys(data[0] || {}).filter(
          (k) => k !== "date" && k !== "ta_app_install_count"
        );
        setLineKeys(
          keys.map((key, idx) => ({
            key,
            color: colors[idx % colors.length],
            name: key,
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load LTV data.");
        setChartData([]);
        setLineKeys([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <div className="h-[400px] p-6 bg-white rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <h2 className="text-lg font-bold text-gray-800">
          IAP LTV Detailed Curve
        </h2>
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
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Spin tip="Loading chart..." size="large" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <DynamicLineChart
          data={chartData}
          lineKeys={lineKeys}
          xKey="date"
        />
      )}
    </div>
  );
};

export default IapLtvDx;
