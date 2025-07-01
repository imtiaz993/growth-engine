import { Select } from "antd";
import type { FilterItem, FilterState } from "../../../../types";

interface AppTokenProps {
  allAppTokens: FilterItem[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isLoading: boolean;
}

const AppToken = ({
  allAppTokens,
  isLoading,
  filters,
  setFilters,
}: AppTokenProps) => {
  return (
    <Select
      placeholder="Select App"
      options={allAppTokens.map((app) => ({
        label: app.name,
        value: app.value,
      }))}
      className="w-64"
      value={filters.appToken}
      onChange={(value) => setFilters((prev) => ({ ...prev, appToken: value }))}
      disabled={isLoading || !allAppTokens.length}
      loading={isLoading}
    />
  );
};

export default AppToken;
