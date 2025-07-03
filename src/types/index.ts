export type FilterItem = {
  name: string;
  value: string;
};

export type FilterState = {
  appToken: string | null;
  channels: string[];
  countries: string[];
  startDate: string | null;
  endDate: string | null;
};
  export type ProductFilterState = { 
  game: string | null;
  countries: string[];
  dateRange: [string | null, string | null];
};

export type BubbleData = {
  name: string;
  roi: number; // ROAS_D7
  investment: number; // LTV_D7
  contribution: number; // Cost
  color: string;
  key: string;
};

export type ApiBubbleData = {
  name: string;
  roas_d7: number;
  ltv_d7: number;
  cost: number;
};

// Represents a single row of chart data, with a date and dynamic group keys
export type ChartDataRow = {
  date: string;
  [group: string]: number | string;
};
