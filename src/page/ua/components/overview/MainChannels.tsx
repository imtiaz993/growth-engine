import { useState, useEffect } from "react";
import { getChannelBubble } from "../../../../api/ua";
import QuadrantChart from "../../../../components/charts/QuadrantChart";
import type { ApiBubbleData, BubbleData, FilterState } from "../../../../types";
import { generateColors } from "../../../../utils";

interface QuadrantBubbleChartsProps {
  filters: FilterState;
}

const MainChannels = ({ filters }: QuadrantBubbleChartsProps) => {
  const [channelData, setChannelData] = useState<BubbleData[]>([]);
  const [isLoadingChannels, setIsLoadingChannels] = useState(false);
  const [channelError, setChannelError] = useState<string | null>(null);

  const fetchBubbleData = async () => {
    if (!filters.appToken || !filters.startDate || !filters.endDate) {
      return;
    }
    try {
      setIsLoadingChannels(true);
      setChannelError(null);

      const response = await getChannelBubble(filters);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = await response.data;
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      const processedData: BubbleData[] = data.map(
        (item: ApiBubbleData, index: number) => ({
          name: item.name,
          roi: item.roas_d7, // ROAS D7 for X-axis
          investment: Math.min(item.ltv_d7, 10000), // LTV D7 for Y-axis, capped at 10,000
          contribution: item.cost, // Cost for bubble size
          color: "",
          key: index.toString(),
        })
      );

      const names = processedData.map((item) => item.name);
      const colors = generateColors(names);

      const finalData = processedData.map((item) => ({
        ...item,
        color: colors[item.name],
      }));

      setChannelData(finalData);
    } catch (error) {
      console.error(error);
      const errorMessage = `Failed to load channel bubble data.`;
      setChannelError(errorMessage);
      setChannelData([]);
    } finally {
      setIsLoadingChannels(false);
    }
  };

  useEffect(() => {
    fetchBubbleData();
  }, [
    filters.appToken,
    filters.channels,
    filters.countries,
    filters.startDate,
    filters.endDate,
  ]);

  return (
    <QuadrantChart
      title={"Quadrant of Main Channels"}
      data={channelData}
      isLoading={isLoadingChannels}
      error={channelError}
    />
  );
};

export default MainChannels;
