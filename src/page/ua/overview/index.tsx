import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "./components/Filters";
import Overview from "./components/Overview";
import Campaign from "./components/Campaign";
import Creative from "./components/Creative";

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

interface FiltersResponse {
  status: string;
  message: string;
  data: {
    channels: FilterItem[];
    countries: FilterItem[];
    app_tokens: FilterItem[];
  };
  meta: {
    timestamp: string;
    request_id: string | null;
    version: string;
    execution_time_ms: number | null;
  };
  pagination: null;
  errors: null;
}

const Page = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    appToken: searchParams.get("app_token") || null,
    channels: searchParams.get("channels")?.split(",").filter(Boolean) || [],
    countries: searchParams.get("countries")?.split(",").filter(Boolean) || [],
    startDate: searchParams.get("start_date") || null,
    endDate: searchParams.get("end_date") || null,
  });
  const [allChannels, setAllChannels] = useState<FilterItem[]>([]);
  const [allCountries, setAllCountries] = useState<FilterItem[]>([]);
  const [allAppTokens, setAllAppTokens] = useState<FilterItem[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState<boolean>(false);
  const [filterError, setFilterError] = useState<string | null>(null);

  const getFiltersData = async () => {
    setIsLoadingFilters(true);
    setFilterError(null);

    try {
      const response = await fetch(
        "https://sabre-api.yodo1.me/api/v1/filters/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: FiltersResponse = await response.json();

      if (
        Array.isArray(responseData.data.channels) &&
        Array.isArray(responseData.data.countries) &&
        Array.isArray(responseData.data.app_tokens)
      ) {
        setAllChannels(responseData.data.channels);
        setAllCountries(responseData.data.countries);
        setAllAppTokens(responseData.data.app_tokens);

        // If URL has channels=all, set channels to all values after API fetch
        if (
          searchParams.get("channels") === "all" &&
          responseData.data.channels.length > 0
        ) {
          setFilters((prev) => ({
            ...prev,
            channels: responseData.data.channels.map(
              (channel) => channel.value
            ),
          }));
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching filters data:", error);
      setFilterError("Failed to load filters. Please try again.");
      setAllChannels([]);
      setAllCountries([]);
      setAllAppTokens([]);
    } finally {
      setIsLoadingFilters(false);
    }
  };

  useEffect(() => {
    getFiltersData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (filters.appToken) queryParams.set("app_token", filters.appToken);
    if (
      filters.channels.length &&
      filters.channels.length === allChannels.length &&
      allChannels.length > 0
    ) {
      queryParams.set("channels", "all");
    } else if (filters.channels.length) {
      queryParams.set("channels", filters.channels.join(","));
    }
    if (filters.countries.length)
      queryParams.set("countries", filters.countries.join(","));
    if (filters.startDate) queryParams.set("start_date", filters.startDate);
    if (filters.endDate) queryParams.set("end_date", filters.endDate);
    const queryString = queryParams.toString();
    navigate(queryString ? `?${queryString}` : "", { replace: true });
  }, [filters, allChannels, navigate]);

  return (
    <div className="p-4">
      <Filters
        filters={filters}
        setFilters={setFilters}
        allChannels={allChannels}
        allCountries={allCountries}
        allAppTokens={allAppTokens}
        isLoading={isLoadingFilters}
        error={filterError}
      />
      <Overview filters={filters} />
      <Campaign filters={filters} />
      <Creative filters={filters} />
    </div>
  );
};

export default Page;
