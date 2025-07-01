import { Select } from "antd";
import type { FilterItem, FilterState } from "../../../../types";

interface ChannelProps {
  allChannels:FilterItem[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isLoading: boolean;
}

const Channel = ({
  isLoading,
  allChannels,
  filters,
  setFilters,
}: ChannelProps) => {
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
      maxTagPlaceholder={(selected) =>
        selected.length > 1 ? `${selected.length} channels selected` : undefined
      }
      options={
        allChannels.length
          ? [
              {
                label:
                  filters.channels.length !== allChannels.length
                    ? "Select All"
                    : "Unselect All",
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
