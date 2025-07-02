import { useState, useEffect } from "react";
import { getIapArppuByInstallAge } from "../../../../api/product";
import LineChart1 from "../../../../components/charts/LineChart1";
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

interface IAPInstallProps {
  filters: ProductFilterState;
}

const IAPInstall = ({ filters }: IAPInstallProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groupNames, setGroupNames] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getIapArppuByInstallAge(filters);
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
    } catch (err) {
      setError("Failed to load ARPPU data.");
      setChartData([]);
      setGroupNames([]);
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

  const lineKeys = groupNames.map((name, idx) => ({
    key: name,
    color: colorPalette[idx % colorPalette.length],
    name
  }));

  return (
    <div className="h-[500px] p-6 bg-white rounded-md shadow-lg flex flex-col justify-between relative z-10">
      <div className="flex-1">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          IAP ARPPU by Install Age - Last 40 days
        </h2>
        <LineChart1 chartData={chartData} isLoading={isLoading} error={error} lineKeys={lineKeys} />
      </div>
    </div>
  );
};
export default IAPInstall;
