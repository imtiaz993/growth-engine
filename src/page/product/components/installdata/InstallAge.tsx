import { useState, useEffect } from "react";
import type { FC } from "react";

import { getIAPData } from "../../../../api/product";
import BarCharts from "../../../../components/charts/BarChart";
import type { ProductFilterState } from "../../../../types";

interface BarData {
  date: string;
  day0?: number;
  week1?: number;
  month1?: number;
  before3?: number;
  after3?: number;
  key: string;
}

interface InstallAgeProps {
  filters: ProductFilterState;
}

const InstallAge:FC<InstallAgeProps> = ({ filters }: InstallAgeProps) => {
  const [chartData, setChartData] = useState<BarData[]>([]);
  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [barError, setBarError] = useState<string | null>(null);

  const fetchInstallAgeData = async () => {
    if (!filters.game || !filters.dateRange[0] || !filters.dateRange[1]) return;

    try {
      setIsLoadingBar(true);
      setBarError(null);

      const response = await getIAPData(filters);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = response.data;
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      const processedData: BarData[] = data.map((item: any, index: number) => ({
        date: item.date,
        ...(item.values || {}),
        key: index.toString(),
      }));

      setChartData(processedData);
    } catch (error) {
      setBarError("Failed to load install age data.");
      setChartData([]);
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
        />
      </div>
    </div>
  );
};

export default InstallAge;
