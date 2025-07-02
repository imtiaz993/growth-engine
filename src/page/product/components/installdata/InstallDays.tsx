import { useState, useEffect } from "react";
import type { FC } from "react";

import { getDauByInstallAge } from "../../../../api/product";
import BarCharts from "../../../../components/charts/BarChart";
import type { ProductFilterState, ChartDataRow } from "../../../../types";

const colorPalette = [
  "#276EF1", "#F37D38", "#66C2A5", "#5E72E4", "#F1C40F", "#8E44AD", "#2ECC71"
];

type GroupApiData = {
  group_0: string;
  data_map_0: Record<string, number>;
};

function pivotGroupApiData(
  apiData: GroupApiData[],
 groupKey: keyof GroupApiData = "group_0",
  valueKey: keyof GroupApiData = "data_map_0"
): { chartData: ChartDataRow[]; groupNames: string[] } {
  const allDatesSet = new Set<string>();
  apiData.forEach((group: GroupApiData) => {
    const valueMap = group[valueKey];
    if (typeof valueMap === 'object' && valueMap !== null) {
      Object.keys(valueMap).forEach((date: string) => {
        const dateOnly = date.split(' ')[0];
        allDatesSet.add(dateOnly);
      });
    }
  });
  const allDates = Array.from(allDatesSet).sort();
  const groupNames = apiData.map((group: GroupApiData) => String(group[groupKey]));
  const dateMap: Record<string, ChartDataRow> = {};
  allDates.forEach((date: string) => {
    dateMap[date] = { date };
    apiData.forEach((group: GroupApiData) => {
      const valueMap = group[valueKey];
      if (typeof valueMap === 'object' && valueMap !== null) {
        const valueEntry = Object.entries(valueMap).find(([k]) => k.split(' ')[0] === date);
        dateMap[date][String(group[groupKey])] = valueEntry ? Number(valueEntry[1]) : 0;
      }
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

const InstallDays: FC<InstallAgeProps> = ({ filters }: InstallAgeProps) => {
  const [chartData, setChartData] = useState<ChartDataRow[]>([]);
  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [barError, setBarError] = useState<string | null>(null);
  const [groupNames, setGroupNames] = useState<string[]>([]);

  const fetchInstallAgeData = async () => {
    try {
      setIsLoadingBar(true);
      setBarError(null);
      const response = await getDauByInstallAge(filters);
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
      console.error(error);
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
         DAU by Install Age - Last 40 days
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

export default InstallDays;
