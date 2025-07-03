import { useState, useEffect } from "react";
import { Spin } from "antd";
import DynamicLineChart from "../../../../components/charts/LineCharts";
import { getOverallLtvDetail } from "../../../../api/product";

const colors = ["#1f77b4", "#FC8969"];
const lineKeys = [
  { key: "adsLTV", color: colors[0], name: "Ads LTV" },
  { key: "iapLTV", color: colors[1], name: "IAP LTV" },
];

interface LtvPoint {
  retention_day: number;
  overall_cumulative_ltv: number;
}

interface ChartRow {
  day: number;
  adsLTV: number | null;
  iapLTV: number | null;
}

const LTVChart = () => {
  const [chartData, setChartData] = useState<ChartRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maxY, setMaxY] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getOverallLtvDetail();
        if (response.status !== 200) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = response.data.data;
        if (!data || !data.ads_ltv || !data.iap_ltv) throw new Error("Invalid response format");
        const ads: LtvPoint[] = data.ads_ltv;
        const iap: LtvPoint[] = data.iap_ltv;
        const merged: ChartRow[] = [];
        let max = 1;
        for (let i = 0; i <= ads.length; i++) {
          const adsObj = ads.find((a) => a.retention_day === i);
          const iapObj = iap.find((a) => a.retention_day === i);
          const adsVal = adsObj ? adsObj.overall_cumulative_ltv : null;
          const iapVal = iapObj ? iapObj.overall_cumulative_ltv : null;
          if (adsVal !== null && adsVal > max) max = adsVal;
          if (iapVal !== null && iapVal > max) max = iapVal;
          merged.push({
            day: i,
            adsLTV: adsVal,
            iapLTV: iapVal,
          });
        }
        setChartData(merged);
        setMaxY(Math.ceil(max * 1.1 * 1000) / 1000); // 10% headroom, rounded
      } catch (err) {
        console.error(err);
        setError("Failed to load LTV data.");
        setChartData([]);
        setMaxY(1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[390px] p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-ls font-bold text-gray-800 !mb-4">
        Ads LTV vs IAP LTV by Days Since Install
      </h2>
      <div className="relative w-full h-[300px]">
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
            xKey="day"
            yDomain={[0, maxY]}
          />
        )}
      </div>
    </div>
  );
};

export default LTVChart;
