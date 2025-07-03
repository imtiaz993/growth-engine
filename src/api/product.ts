import { sabreService } from "./service";
export const getFilters = () => {
  return sabreService.get("/mockdata.json");
};

export const getIapArppuByInstallAge = () => {
  return sabreService.get(
    "/api/v1/product-dashboard/install/iap_arppu_by_install_age"
  );
};

export const getDailyIapRevenueByInstallAge = () => {
  return sabreService.get(
    "/api/v1/product-dashboard/install/daily_iap_revenue_by_install_age",
    {}
  );
};

export const getDauByInstallAge = () => {
  return sabreService.get(
    "/api/v1/product-dashboard/install/dau_by_install_age",
    {}
  );
};

export const getDailyIapPayerConversion = () => {
  return sabreService.get(
    "/api/v1/product-dashboard/install/daily_iap_payer_conversion",
    {}
  );
};

export const getDailyIapRevenueStacked = () => {
  return sabreService.get(
    "/api/v1/product-dashboard/pay-user/daily_iap_revenue_stacked",
    {}
  );
};

export const getDauByPayUser = () => {
  return sabreService.get(
    "/api/v1/product-dashboard/pay-user/dau_by_pay_user",
    {}
  );
};

export const getDailyIapConversionRate = () => {
  return sabreService.get(
    "/api/v1/product-dashboard/pay-user/daily_iap_conversion_rate",
    {}
  );
};

export const getDailyArppu = () => {
  return sabreService.get("/api/v1/product-dashboard/pay-user/daily_arppu", {});
};

export const getOverviewTrends = () => {
  return sabreService.get("/api/v1/product-dashboard/overview", {});
};

export const getIapLtvDetail = () => {
  return sabreService.get("/api/v1/product-dashboard/ltv/iap_ltv_detail", {});
};

export const getAdsLtvDetail = () => {
  return sabreService.get("/api/v1/product-dashboard/ltv/ads_ltv_detail", {});
};
