import { sabreService } from "./service";
import type { FilterState } from "./type";

export const getFilters = () => {
  return sabreService.get(`/api/v1/filters/all`);
};

export const getCampaignCamparison = (filters: FilterState) => {
  return sabreService.post(`/api/v1/dashboard/wow-comparison`, {
    app_token: filters.appToken,
    start_date: filters.startDate,
    end_date: filters.endDate,
    filters: {
      channels: filters.channels.length ? filters.channels : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};

export const getTop10Campaigns = (filters: FilterState) => {
  return sabreService.post(`/api/v1/dashboard/top10-campaigns`, {
    app_token: filters.appToken,
    start_date: filters.startDate,
    end_date: filters.endDate,
    filters: {
      channels: filters.channels.length ? filters.channels : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};

export const getCreativeTrending = (filters: FilterState) => {
  return sabreService.post(`/api/v1/dashboard/creative-trending`, {
    app_token: filters.appToken,
    start_date: filters.startDate,
    end_date: filters.endDate,
    filters: {
      channels: filters.channels.length ? filters.channels : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};

export const getTop10Creatives = (filters: FilterState) => {
  return sabreService.post(`/api/v1/dashboard/top10-creatives`, {
    app_token: filters.appToken,
    start_date: filters.startDate,
    end_date: filters.endDate,
    filters: {
      channels: filters.channels.length ? filters.channels : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};

export const getGeoBubble = (filters: FilterState) => {
  return sabreService.post(`/api/v1/dashboard/chart/geo-bubble`, {
    app_token: filters.appToken,
    start_date: filters.startDate,
    end_date: filters.endDate,
    filters: {
      channels: filters.channels.length ? filters.channels : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};

export const getChannelBubble = (filters: FilterState) => {
  return sabreService.post(`/api/v1/dashboard/chart/channel-bubble`, {
    app_token: filters.appToken,
    start_date: filters.startDate,
    end_date: filters.endDate,
    filters: {
      channels: filters.channels.length ? filters.channels : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};

export const getChannelWeeklyROAS = (filters: FilterState) => {
  return sabreService.post(`/api/v1/dashboard/chart/channel-weekly-roas`, {
    app_token: filters.appToken,
    start_date: filters.startDate,
    end_date: filters.endDate,
    filters: {
      channels: filters.channels.length ? filters.channels : [],
      countries: filters.countries.length ? filters.countries : [],
    },
  });
};

export const getBasicInfo = () => {
  return sabreService.get(`/api/v1/info/basic`);
};
