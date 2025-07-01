import { useState, useEffect } from "react";
import { getChannelWeeklyROAS } from "../../../../api/ua";
import { generateChannelColors } from "../../../../utils";
import ChannelsChart from "../../../../components/charts/ChannelsChart";
import type { FilterState } from "../../../../types";
interface ChartData {
  week_to_date_range: string;
  channels: Record<string, number>;
  ROAS_D0: number;
  ROAS_D7: number;
  [key: string]: string | number | Record<string, number>;
}
interface WeeklyROASChartProps {
  filters: FilterState;
}

const WeeklyRevenue = ({ filters }: WeeklyROASChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [channelColors, setChannelColors] = useState<Record<string, string>>(
    {}
  );
  const [activeChannels, setActiveChannels] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChartData = async () => {
    if (!filters.appToken || !filters.startDate || !filters.endDate) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getChannelWeeklyROAS(filters);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = await response.data;
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      const processedData: ChartData[] = data.map((item, index: number) => ({
        week_to_date_range: item.week_to_date_range,
        channels: item.channels,
        ROAS_D0: item.roas_d0,
        ROAS_D7: item.roas_d7,
        key: index.toString(),
      }));

      const allChannels = Array.from(
        new Set(processedData.flatMap((item) => Object.keys(item.channels)))
      );
      const newChannelColors = generateChannelColors(allChannels);

      setChartData(processedData);
      setChannelColors(newChannelColors);
      setActiveChannels(new Set(allChannels));
    } catch (error) {
      setError("Failed to load chart data.");
      setChartData([]);
      setChannelColors({});
      setActiveChannels(new Set());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [
    filters.appToken,
    filters.channels,
    filters.countries,
    filters.startDate,
    filters.endDate,
  ]);

  return (
    <ChannelsChart
      isLoading={isLoading}
      error={error}
      chartData={chartData}
      activeChannels={activeChannels}
      setActiveChannels={setActiveChannels}
      channelColors={channelColors}
    />
  );
};

export default WeeklyRevenue;
