import { useState, useEffect } from "react";
import { getDailyIapPayerConversion } from "../../../../api/product";
import LineChart1 from "../../../../components/charts/LineChart1";
import type { ProductFilterState } from "../../../../types";

const colorPalette = [
  "#276EF1", "#F37D38", "#66C2A5", "#5E72E4", "#F1C40F", "#8E44AD", "#2ECC71"
];

interface ConversionInstallProps {
  filters: ProductFilterState;
}

const ConversionInstall = ({ filters }: ConversionInstallProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<any[]>([]);

  const fetchData = async () => {
    // if (!filters.game || !filters.dateRange[0] || !filters.dateRange[1]) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDailyIapPayerConversion(filters);
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const { data } = response.data;
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }
      setApiData(data);
      const dateMap: Record<string, any> = {};
      data.forEach((item: any) => {
        const date = item.$part_date;
        if (!dateMap[date]) {
          dateMap[date] = { date };
        }
        dateMap[date][item.age_install_bucket] = item.daily_payer_percentage;
      });
      setChartData(Object.values(dateMap));
    } catch (err) {
      setError("Failed to load payer conversion data.");
      setChartData([]);
      setApiData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    filters.game,
    filters.platforms,
    filters.countries,
    filters.dateRange[0],
    filters.dateRange[1],
  ]);

  // Dynamic legend/value label
  const bucketNames = Array.from(new Set(apiData.map((item: any) => item.age_install_bucket)));
  const lineKeys = bucketNames.map((bucket, idx) => ({
    key: bucket,
    color: colorPalette[idx % colorPalette.length],
    name: bucket
  }));

  return (
    <div className="h-[500px] p-6 bg-white rounded-md shadow-lg flex flex-col justify-between relative z-10">
      <div className="flex-1">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Daily IAP Payer % conversion - Last 40 days
        </h2>
        <LineChart1 chartData={chartData} isLoading={isLoading} error={error} lineKeys={lineKeys} />
      </div>
    </div>
  );
};

export default ConversionInstall;
