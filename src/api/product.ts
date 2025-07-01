import { sabreService } from "./service";
import type { ProductFilterState } from "../types";
export const getFilters = () => {
  return sabreService.get("/mockdata.json");
};
export const getIAPData = (filters: ProductFilterState) => {
  return sabreService.post(`/api/v1/dashboard/chart/platform-bubble`, {
    game: filters.game,
    start_date: filters.dateRange,
    end_date: filters.dateRange,

    filters: {
      platforms: filters.platforms.length ? filters.platforms : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};
export const getIapArppuByInstallAge = (filters: ProductFilterState) => {
  return sabreService.post(`/api/v1/dashboard/chart/platform-bubble`, {
    game: filters.game,
    start_date: filters.dateRange,
    end_date: filters.dateRange,
    filters: {
      platforms: filters.platforms.length ? filters.platforms : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};

export const getDailyIapRevenueByPayUser = (filters: ProductFilterState) => {
  return sabreService.post(`/api/v1/dashboard/chart/platform-bubble`, {
    game: filters.game,
    start_date: filters.dateRange,
    end_date: filters.dateRange,
    filters: {
      platforms: filters.platforms.length ? filters.platforms : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};
export const getDAUTrends = (filters: ProductFilterState) => {
  return sabreService.post(`/api/v1/dashboard/chart/platform-bubble`, {
    game: filters.game,
    start_date: filters.dateRange,
    end_date: filters.dateRange,
    filters: {
      platforms: filters.platforms.length ? filters.platforms : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};
export const getLtvDetailedCurve = (filters: ProductFilterState) => {
  return sabreService.post(`/api/v1/dashboard/chart/platform-bubble`, {
    game: filters.game,
    start_date: filters.dateRange,
    end_date: filters.dateRange,
    filters: {
      platforms: filters.platforms.length ? filters.platforms : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};
