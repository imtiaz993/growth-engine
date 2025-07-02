import { useState, useEffect } from "react";
import LineCharts from "../../../../components/charts/LineCharts";
import PayValueLabels from "./PayValueLabels";
import { getDailyIapConversionRate } from "../../../../api/product";
import type { ProductFilterState } from "../../../../types";

const colorPalette = [
  "#276EF1", "#F37D38", "#66C2A5", "#5E72E4", "#F1C40F", "#8E44AD", "#2ECC71"
];
function extractGroupsFromApiData(apiData: any[]): string[] {
  if (Array.isArray(apiData) && apiData.length > 0 && apiData[0].group_0) {
    return apiData.map((item: any) => item.group_0);
  }
  return [];
}
function groupDataToDateCentric(data: any[]): any[] {
  const dateMap: Record<string, any> = {};
  const allGroups = new Set<string>();
  data.forEach((item: any) => {
    const group = item.group_0;
    allGroups.add(group);
    const dataMapObj = item.data_map_0 || {};
    Object.entries(dataMapObj).forEach(([date, value]) => {
      const dateOnly = date.split(' ')[0];
      if (!dateMap[dateOnly]) dateMap[dateOnly] = { date: dateOnly };
      dateMap[dateOnly][group] = value;
    });
  });
  // Fill missing group values with 0 for each date
  const groupList = Array.from(allGroups);
  const processedData = Object.values(dateMap).map((row: any) => {
    groupList.forEach(group => {
      if (!(group in row)) row[group] = 0;
    });
    return row;
  });
  // Sort by date
  processedData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return processedData;
}

interface ConversionRateProps {
  filters: ProductFilterState;
}

const ConversionRate = ({ filters }: ConversionRateProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getDailyIapConversionRate(filters);
        if (response.status !== 200) throw new Error(`HTTP error! Status: ${response.status}`);
        const { data } = response.data;
        if (!Array.isArray(data)) throw new Error("Invalid response format");
        setApiData(data);
        const processedData = groupDataToDateCentric(data);
        setData(processedData);
      } catch (err) {
        setError("Failed to load conversion rate data.");
        setData([]);
        setApiData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  const groupNames = extractGroupsFromApiData(apiData);
  const payGroups = groupNames.map((name, idx) => {
    const groupObj = apiData.find((item: any) => item.group_0 === name);
    return {
      label: name,
      color: colorPalette[idx % colorPalette.length],
      value: groupObj ? groupObj.total_amount.toFixed(2) : 0
    };
  });
  const lineKeys = groupNames.map((name, idx) => ({
    key: name,
    color: colorPalette[idx % colorPalette.length],
    name
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full  mx-auto">
      <div className="text-start mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Daily IAP Conversion Rate
        </h2>
        <PayValueLabels items={payGroups} />
      </div>
      <LineCharts data={data} lineKeys={lineKeys} xKey="date" />
    </div>
  );
};

export default ConversionRate;
