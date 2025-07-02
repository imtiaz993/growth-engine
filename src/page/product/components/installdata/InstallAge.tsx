import { useState, useEffect } from "react";
import type { FC } from "react";

import { getDailyIapRevenueByInstallAge } from "../../../../api/product";
import BarCharts from "../../../../components/charts/BarChart";
import type { ProductFilterState } from "../../../../types";

const colorPalette = [
  "#276EF1", "#F37D38", "#66C2A5", "#5E72E4", "#F1C40F", "#8E44AD", "#2ECC71"
];

type GroupApiData = {
  [key: string]: any;
  group_0: string;
  data_map_0: Record<string, number>;
};

function pivotGroupApiData(
  apiData: GroupApiData[],
  groupKey: string = "group_0",
  valueKey: string = "data_map_0"
): { chartData: any[]; groupNames: string[] } {
  const allDatesSet = new Set<string>();
  apiData.forEach((group: GroupApiData) => {
    Object.keys(group[valueKey]).forEach((date: string) => {
      const dateOnly = date.split(' ')[0];
      allDatesSet.add(dateOnly);
    });
  });
  const allDates = Array.from(allDatesSet).sort();
  const groupNames = apiData.map((group: GroupApiData) => group[groupKey]);
  const dateMap: Record<string, any> = {};
  allDates.forEach((date: string) => {
    dateMap[date] = { date };
    apiData.forEach((group: GroupApiData) => {
      // Find the value for this date (may need to search original keys)
      const valueEntry = Object.entries(group[valueKey]).find(([k]) => k.split(' ')[0] === date);
      dateMap[date][group[groupKey]] = valueEntry ? valueEntry[1] : 0;
    });
  });
  return {
    chartData: Object.values(dateMap),
    groupNames,
  };
}

interface InstallAgeProps {
  filters: ProductFilterState;
}

const InstallAge:FC<InstallAgeProps> = ({ filters }: InstallAgeProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [barError, setBarError] = useState<string | null>(null);
  const [groupNames, setGroupNames] = useState<string[]>([]);

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
      const { chartData, groupNames } = pivotGroupApiData(data);
      setChartData(chartData);
      setGroupNames(groupNames);
    } catch (error) {
      setBarError("Failed to load install age data.");
      setChartData([]);
      setGroupNames([]);
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

  const barKeys = groupNames.map((name, idx) => ({
    key: name,
    color: colorPalette[idx % colorPalette.length],
    name
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
