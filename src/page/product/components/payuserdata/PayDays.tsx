import { useState, useEffect } from "react";
import MultilineAreaChart from "../../../../components/charts/MultilineAreaChart";
import PayValueLabels from "./PayValueLabels";
import { getDailyArppu } from "../../../../api/product";
import type { ChartDataRow } from "../../../../types";

const colorPalette = [
  "#276EF1", "#F37D38", "#66C2A5", "#5E72E4", "#F1C40F", "#8E44AD", "#2ECC71"
];

type GroupApiData = {
  group_0: string;
  data_map_0: Record<string, number>;
  total_amount?: number;
};

function extractGroupsFromApiData(apiData: GroupApiData[]): string[] {
  if (Array.isArray(apiData) && apiData.length > 0 && apiData[0].group_0) {
    return apiData.map((item: GroupApiData) => item.group_0);
  }
  return [];
}

function groupDataToDateCentric(data: GroupApiData[]): ChartDataRow[] {
  const dateMap: Record<string, ChartDataRow> = {};
  const allGroups = new Set<string>();
  data.forEach((item: GroupApiData) => {
    const group = item.group_0;
    allGroups.add(group);
    const dataMap = item.data_map_0 || {};
    Object.entries(dataMap).forEach(([date, value]) => {
      const dateOnly = date.split(' ')[0];
      if (!dateMap[dateOnly]) dateMap[dateOnly] = { date: dateOnly };
      dateMap[dateOnly][group] = Number(value);
    });
  });
  // Fill missing group values with 0 for each date
  const groupList = Array.from(allGroups);
  const processedData = Object.values(dateMap).map((row) => {
    groupList.forEach(group => {
      if (!(group in row)) row[group] = 0;
    });
    return row;
  });
  // Sort by date
  processedData.sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime());
  return processedData;
}

const PayDays = () => {
  const [chartData, setChartData] = useState<ChartDataRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<GroupApiData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getDailyArppu();
        if (response.status !== 200) throw new Error(`HTTP error! Status: ${response.status}`);
        const { data } = response.data;
        if (!Array.isArray(data)) throw new Error("Invalid response format");
        setApiData(data);
        const processedData = groupDataToDateCentric(data);
        setChartData(processedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load ARPPU data.");
        setChartData([]);
        setApiData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const groupNames = extractGroupsFromApiData(apiData);
  const payGroups = groupNames.map((name, idx) => {
    const groupObj = apiData.find((item: GroupApiData) => item.group_0 === name);
    return {
      label: name,
      color: colorPalette[idx % colorPalette.length],
      value: groupObj ? groupObj.total_amount?.toFixed(2) || "0.00" : "0.00"
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
        <h2 className="text-lg font-bold text-gray-800 mb-2">Daily ARPPU</h2>
        <PayValueLabels items={payGroups} />
      </div>
      <MultilineAreaChart chartData={chartData} isLoading={isLoading} error={error} areaKeys={lineKeys} />
    </div>
  );
};

export default PayDays;
