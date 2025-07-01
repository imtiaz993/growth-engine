import { sabreService } from "./service";
import type { ProductFilterState } from "../types";
export const getFilters = () => {
  return sabreService.get("/mockdata.json");
};

export const getIapArppuByInstallAge = (filters: ProductFilterState) => {
  return sabreService.get("/api/v1/product-dashboard/rodeo_ios/iap_arppu_by_install_age", {
    params: {
      game: filters.game,
      start_date: filters.dateRange[0],
      end_date: filters.dateRange[1],
      platforms: filters.platforms,
      countries: filters.countries,
    },
  });
};

export const getDailyIapRevenueByInstallAge = (filters: ProductFilterState) => {
  return sabreService.get("/api/v1/product-dashboard/rodeo_ios/daily_iap_revenue_by_install_age", {
    params: {
      game: filters.game,
      start_date: filters.dateRange[0],
      end_date: filters.dateRange[1],
      platforms: filters.platforms,
      countries: filters.countries,
    },
  });
};

export const getDauByInstallAge = (filters: ProductFilterState) => {
  return sabreService.get("/api/v1/product-dashboard/rodeo_ios/dau_by_install_age", {
    params: {
      game: filters.game,
      start_date: filters.dateRange[0],
      end_date: filters.dateRange[1],
      platforms: filters.platforms,
      countries: filters.countries,
    },
  });
};

export const getDailyIapPayerConversion = (filters: ProductFilterState) => {
  return sabreService.get("/api/v1/product-dashboard/rodeo_ios/daily_iap_payer_conversion", {
    params: {
      game: filters.game,
      start_date: filters.dateRange[0],
      end_date: filters.dateRange[1],
      platforms: filters.platforms,
      countries: filters.countries,
    },
  });
};

export const getDailyIapRevenueStacked = (filters: ProductFilterState) => {
  return sabreService.get("/api/v1/product-dashboard/suit_sdk/daily_iap_revenue_stacked", {
    params: {},
  });
};

export const getDauByPayUser = (filters: ProductFilterState) => {
  return sabreService.get("/api/v1/product-dashboard/suit_sdk/dau_by_pay_user", {
    params: {},
  });
};

export const getDailyIapConversionRate = (filters: ProductFilterState) => {
  return sabreService.get("/api/v1/product-dashboard/suit_sdk/daily_iap_conversion_rate", {
    params: {},
  });
};

export const getDailyArppu = (filters: ProductFilterState) => {
  return sabreService.get("/api/v1/product-dashboard/suit_sdk/daily_arppu", {
    params: {},
  });
};
