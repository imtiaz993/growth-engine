import type { FC } from "react";
import type { ProductFilterState } from "../../../../types";
import GameFilter from "./Game";
import CountryFilter from "./Country";
import DateFilter from "./Date";

interface ProductFiltersProps {
  filters: ProductFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ProductFilterState>>;
  allGames: { label: string; value: string }[];
  allCountries: { label: string; value: string }[];
  isLoading: boolean;
  error: string | null;
}

const Filters: FC<ProductFiltersProps> = ({
  filters,
  setFilters,
  allGames,
  allCountries,
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4 w-full">
      <GameFilter
        value={filters.game ? [filters.game] : []}
        onChange={(val) =>
          setFilters((prev) => ({ ...prev, game: val[0] || null }))
        }
        options={allGames}
      />
      <div className="flex items-center gap-4 flex-wrap justify-end">
        <CountryFilter
          value={filters.countries}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, countries: val }))
          }
          options={allCountries}
        />
        <DateFilter
          value={filters.dateRange}
          onChange={(val) =>
            setFilters((prev) => ({ ...prev, dateRange: val }))
          }
        />
      </div>
    </div>
  );
};

export default Filters;
