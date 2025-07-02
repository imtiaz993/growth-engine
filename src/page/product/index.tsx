import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { getFilters } from "../../api/product";

import ProductFilters from "./components/filters";
import InstallData from "./components/installdata";
import LTVReport from "./components/ltvreports";
import Overview from "./components/overview";
import PayUserData from "./components/payuserdata";

interface FilterState {
  game: string | null;
  platforms: string[];
  countries: string[];
  dateRange: [string | null, string | null];
}

interface FilterItem {
  label: string;
  value: string;
}

const Product = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterState>({
    game: searchParams.get("game") || null,
    platforms: searchParams.get("platforms")?.split(",").filter(Boolean) || [],
    countries: searchParams.get("countries")?.split(",").filter(Boolean) || [],
    dateRange: [
      searchParams.get("start_date") ||
        dayjs().subtract(30, "day").format("YYYY-MM-DD"),
      searchParams.get("end_date") || dayjs().format("YYYY-MM-DD"),
    ],
  });

  const [allGames, setAllGames] = useState<FilterItem[]>([]);
  const [allPlatforms, setAllPlatforms] = useState<FilterItem[]>([]);
  const [allCountries, setAllCountries] = useState<FilterItem[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [filterError, setFilterError] = useState<string | null>(null);

  const getFiltersData = async () => {
    setIsLoadingFilters(true);
    setFilterError(null);

    try {
      const response = await getFilters();
      const data = response.data.data;

      const gameOptions = data.games.map((g: string) => ({
        label: g,
        value: g.toLowerCase().replace(/\s+/g, "_"),
      }));
      const platformOptions = data.platforms.map((p: string) => ({
        label: p,
        value: p.toLowerCase(),
      }));
      const countryOptions = data.countries.map((c: string) => ({
        label: c,
        value: c.toLowerCase(),
      }));

      setAllGames(gameOptions);
      setAllPlatforms(platformOptions);
      setAllCountries(countryOptions);

      // handle ?platforms=all
      if (
        searchParams.get("platforms") === "all" &&
        platformOptions.length > 0
      ) {
        setFilters((prev) => ({
          ...prev,
          platforms: platformOptions.map(
            (p: { label: string; value: string }) => p.value
          ),
        }));
      }

      if (
        searchParams.get("countries") === "all" &&
        countryOptions.length > 0
      ) {
        setFilters((prev) => ({
          ...prev,
          countries: countryOptions.map(
            (c: { label: string; value: string }) => c.value
          ),
        }));
      }

      if (!searchParams.get("game") && gameOptions.length > 0) {
        setFilters((prev) => ({
          ...prev,
          game: gameOptions[0].value,
        }));
      }
      setFilterError("Failed to load filters.");
      setAllGames([]);
      setAllPlatforms([]);
      setAllCountries([]);
    } finally {
      setIsLoadingFilters(false);
    }
  };

  useEffect(() => {
    getFiltersData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (filters.game) queryParams.set("game", filters.game);

    if (
      filters.platforms.length === allPlatforms.length &&
      allPlatforms.length > 0
    ) {
      queryParams.set("platforms", "all");
    } else if (filters.platforms.length) {
      queryParams.set("platforms", filters.platforms.join(","));
    }

    if (
      filters.countries.length === allCountries.length &&
      allCountries.length > 0
    ) {
      queryParams.set("countries", "all");
    } else if (filters.countries.length) {
      queryParams.set("countries", filters.countries.join(","));
    }

    if (filters.dateRange[0])
      queryParams.set("start_date", filters.dateRange[0]);
    if (filters.dateRange[1]) queryParams.set("end_date", filters.dateRange[1]);

    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [filters, allCountries, allPlatforms, navigate]);

  return (
    <div className="p-4 pt-0">
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        allGames={allGames}
        allPlatforms={allPlatforms}
        allCountries={allCountries}
        isLoading={isLoadingFilters}
        error={filterError}
      />
      <Overview filters={filters} />
      <InstallData filters={filters} />
      <PayUserData />
      <LTVReport />
    </div>
  );
};

export default Product;
