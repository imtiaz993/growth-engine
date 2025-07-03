import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { getFilters } from "../../api/product";
import { useLocation } from "react-router-dom";
import ProductFilters from "./components/filters";
import InstallData from "./components/installdata";
import LTVReport from "./components/ltvreports";
import Overview from "./components/overview";
import PayUserData from "./components/payuserdata";
import type { ProductFilterState } from "../../types";

interface FilterItem {
  label: string;
  value: string;
}

const Product = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState<ProductFilterState>({
    game: searchParams.get("game") || null,
    countries: searchParams.get("countries")?.split(",").filter(Boolean) || [],
    dateRange: [
      searchParams.get("start_date") ||
        dayjs().subtract(30, "day").format("YYYY-MM-DD"),
      searchParams.get("end_date") || dayjs().format("YYYY-MM-DD"),
    ],
  });

  const [allGames, setAllGames] = useState<FilterItem[]>([]);
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

      const countryOptions = data.countries.map((c: string) => ({
        label: c,
        value: c.toLowerCase(),
      }));

      setAllGames(gameOptions);
      setAllCountries(countryOptions);

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
      setAllCountries([]);
    } finally {
      setIsLoadingFilters(false);
    }
  };
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);
  useEffect(() => {
    getFiltersData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (filters.game) queryParams.set("game", filters.game);

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
  }, [filters, allCountries, navigate]);

  return (
    <div className="p-4 pt-0">
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        allGames={allGames}
        allCountries={allCountries}
        isLoading={isLoadingFilters}
        error={filterError}
      />
      {/* <div id="product-overview">
        <Overview />
      </div>

      <div id="product-installdata">
        <InstallData />
      </div>

      <div id="product-payuserdata">
        <PayUserData />
      </div> */}

      <div id="product-ltv">
        <LTVReport />
      </div>
    </div>
  );
};

export default Product;
