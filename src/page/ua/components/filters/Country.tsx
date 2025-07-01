import { Select } from "antd";
import type { FilterItem, FilterState } from "../../../../types";
interface CountryProps {
  allCountries:FilterItem[]
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isLoading: boolean;
}

const Country = ({
  isLoading,
  allCountries,
  filters,
  setFilters,
}: CountryProps) => {
  const handleCountryChange = (value: string[]) => {
    if (value.includes("all")) {
      setFilters((prev) => ({
        ...prev,
        countries:
          prev.countries.length === allCountries.length
            ? []
            : allCountries.map((country) => country.value),
      }));
      return;
    }
    setFilters((prev) => ({ ...prev, countries: value }));
  };

  return (
    <Select
      mode="multiple"
      placeholder="Country"
      className="w-52"
      value={filters.countries}
      onChange={handleCountryChange}
      maxTagCount={filters.countries.length === 1 ? 1 : 0}
      maxTagPlaceholder={(selected) =>
        selected.length ? `${selected.length} countries selected` : undefined
      }
      allowClear
      options={
        allCountries.length
          ? [
              {
                label:
                  filters.countries.length !== allCountries.length
                    ? "Select All"
                    : "Unselect All",
                value: "all",
              },
              ...allCountries.map((country) => ({
                label: country.name,
                value: country.value,
              })),
            ]
          : []
      }
      disabled={isLoading || !allCountries.length}
      loading={isLoading}
    />
  );
};

export default Country;
