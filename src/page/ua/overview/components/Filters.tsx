import { DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;

interface FilterItem {
  name: string;
  value: string;
}

interface FilterState {
  appToken: string | null;
  channels: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
}

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  allChannels: FilterItem[];
  allCountries: FilterItem[];
  allAppTokens: FilterItem[];
  isLoading: boolean;
  error: string | null;
}

const Filters = ({
  filters,
  setFilters,
  allChannels,
  allCountries,
  allAppTokens,
  isLoading,
  error,
}: FiltersProps) => {
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

  // Fixed the type signature for handleDateChange
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setFilters((prev) => ({
      ...prev,
      startDate: dates?.[0]?.format("YYYY-MM-DD") || null,
      endDate: dates?.[1]?.format("YYYY-MM-DD") || null,
    }));
  };

  return (
    <div className="flex justify-between">
      <div>
        <Select
          placeholder="Select App"
          options={allAppTokens.map((app) => ({
            label: app.name,
            value: app.value,
          }))}
          className="w-40"
          value={filters.appToken}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, appToken: value }))
          }
          disabled={isLoading || !allAppTokens.length}
          loading={isLoading}
        />
      </div>
      <div className="flex gap-5">
        <Select
          mode="multiple"
          placeholder="Channel"
          className="w-48"
          value={filters.channels}
          onChange={handleChannelChange}
          maxTagCount={0}
          maxTagPlaceholder={(selected) =>
            selected.length ? `${selected.length} channels selected` : undefined
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
        />
        <Select
          mode="multiple"
          placeholder="Country"
          className="w-48"
          value={filters.countries}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, countries: value }))
          }
          maxTagCount={filters.countries.length === 1 ? 1 : 0}
          maxTagPlaceholder={(selected) =>
            selected.length
              ? `${selected.length} countries selected`
              : undefined
          }
          options={
            allCountries.length
              ? allCountries.map((country) => ({
                  label: country.name,
                  value: country.value,
                }))
              : []
          }
          disabled={isLoading || !allCountries.length}
          loading={isLoading}
        />
        <RangePicker
          className="w-56"
          value={
            filters.startDate && filters.endDate
              ? [
                  dayjs(filters.startDate, "YYYY-MM-DD"),
                  dayjs(filters.endDate, "YYYY-MM-DD"),
                ]
              : null
          }
          onChange={handleDateChange}
          disabled={isLoading}
        />
      </div>
      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
    </div>
  );
};

export default Filters;
