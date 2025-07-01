import { useEffect } from "react";
import AppToken from "./AppToken";
import Channel from "./Channel";
import Country from "./Country";
import DateRange from "./DateRange";
import type { FilterItem, FilterState } from "../../../../types";

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
  // Set first app token when allAppTokens changes and appToken is null
  useEffect(() => {
    if (!filters.appToken && allAppTokens.length > 0 && !isLoading) {
      setFilters((prev) => ({
        ...prev,
        appToken: allAppTokens[0].value,
      }));
    }
  }, [allAppTokens, filters.appToken, isLoading, setFilters]);

  return (
    <div className="flex justify-between">
      <div>
        <AppToken
          isLoading={isLoading}
          allAppTokens={allAppTokens}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className="flex gap-5">
        <Channel
          isLoading={isLoading}
          allChannels={allChannels}
          filters={filters}
          setFilters={setFilters}
        />
        <Country
          isLoading={isLoading}
          allCountries={allCountries}
          filters={filters}
          setFilters={setFilters}
        />
        <DateRange
          isLoading={isLoading}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
    </div>
  );
};

export default Filters;
