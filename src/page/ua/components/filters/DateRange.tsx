import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import type { FC } from "react";
import type { FilterState } from "../../../../types";

const { RangePicker } = DatePicker;

interface DateRangeProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isLoading: boolean;
}

const DateRange: FC<DateRangeProps> = ({ isLoading, filters, setFilters }) => {
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setFilters((prev: FilterState) => ({
      ...prev,
      startDate: dates?.[0]?.format("YYYY-MM-DD") || null,
      endDate: dates?.[1]?.format("YYYY-MM-DD") || null,
    }));
  };
  return (
    <RangePicker
      className="w-60"
      value={
        filters.startDate && filters.endDate
          ? [
              dayjs(filters.startDate, "YYYY-MM-DD"),
              dayjs(filters.endDate, "YYYY-MM-DD"),
            ]
          : null
      }
      onChange={handleDateChange}
      disabled={isLoading}
    />
  );
};

export default DateRange;
