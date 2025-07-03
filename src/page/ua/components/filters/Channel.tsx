import { Select } from "antd";
import type { FC } from "react";
import type { FilterItem, FilterState } from "../../../../types";

interface ChannelProps {
  allChannels: FilterItem[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isLoading: boolean;
}

const Channel: FC<ChannelProps> = ({
  isLoading,
  allChannels,
  filters,
  setFilters,
}) => {
  const isAllSelected = filters.channels.length === allChannels.length;

  const handleChannelChange = (value: string[]) => {
    if (value.includes("all")) {
      setFilters((prev) => ({
        ...prev,
        channels:
          prev.channels.length === allChannels.length
            ? []
            : allChannels.map((channel) => channel.value),
      }));
      return;
    }
    setFilters((prev) => ({ ...prev, channels: value }));
  };
  return (
    <Select
      mode="multiple"
      placeholder="Channel"
      className="w-52"
      value={filters.channels}
      onChange={handleChannelChange}
      maxTagCount={filters.channels.length === 1 ? 1 : 0}
      maxTagPlaceholder={() =>
        isAllSelected
          ? "All Selected Channel"
          : `${filters.channels.length} channels selected`
      }
      options={
        allChannels.length
          ? [
              {
                label: isAllSelected ? "Unselect All" : "Select All",
                value: "all",
              },
              ...allChannels.map((channel) => ({
                label: channel.name,
                value: channel.value,
              })),
            ]
          : []
      }
      disabled={isLoading || !allChannels.length}
      loading={isLoading}
      allowClear
    />
  );
};

export default Channel;
