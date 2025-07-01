import { useState, useEffect } from "react";
import type { FC } from "react";

import { getDailyIapRevenueByInstallAge } from "../../../../api/product";
import BarCharts from "../../../../components/charts/BarChart";
import type { ProductFilterState } from "../../../../types";

const colorPalette = [
  "#276EF1", "#F37D38", "#66C2A5", "#5E72E4", "#F1C40F", "#8E44AD", "#2ECC71"
];

interface BarData {
  date: string;
  age_install_bucket: string;
  daily_iap_rev?: number;
  dau?: number;
  payers?: number;
  daily_payer_percentage?: number;
  arppu?: number;
  key: string;
}

interface InstallAgeProps {
  filters: ProductFilterState;
}

const InstallAge:FC<InstallAgeProps> = ({ filters }: InstallAgeProps) => {
  const [chartData, setChartData] = useState<BarData[]>([]);
  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [barError, setBarError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<any[]>([]);

  const fetchInstallAgeData = async () => {
    try {
      setIsLoadingBar(true);
      setBarError(null);
      const response = await getDailyIapRevenueByInstallAge(filters);
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const { data } = response.data;
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }
      setApiData(data);
      // Group by date
      const dateMap: Record<string, any> = {};
      data.forEach((item: any) => {
        const date = item.$part_date;
        if (!dateMap[date]) {
          dateMap[date] = { date };
        }
        dateMap[date][item.age_install_bucket] = item.daily_iap_rev;
      });
      const processedData = Object.values(dateMap);
      setChartData(processedData);
    } catch (error) {
      setBarError("Failed to load install age data.");
      setChartData([]);
      setApiData([]);
    } finally {
      setIsLoadingBar(false);
    }
  };

  useEffect(() => {
    fetchInstallAgeData();
  }, [
    filters.game,
    filters.platforms,
    filters.countries,
    filters.dateRange[0],
    filters.dateRange[1],
  ]);

  // Dynamic legend/value label
  const bucketNames = Array.from(new Set(apiData.map((item: any) => item.age_install_bucket)));
  const barKeys = bucketNames.map((bucket, idx) => ({
    key: bucket,
    color: colorPalette[idx % colorPalette.length],
    name: bucket
  }));

  return (
    <div className="h-[500px] p-6 bg-white rounded-md shadow-lg flex relative z-10 overflow-visible">
      <div className="flex-1 overflow-visible">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Daily IAP Revenue by Install Age - last 40 days
        </h2>
        <BarCharts
          chartData={chartData}
          isLoading={isLoadingBar}
          error={barError}
          barKeys={barKeys}
        />
      </div>
    </div>
  );
};

export default InstallAge;
