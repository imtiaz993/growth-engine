import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { FC } from "react";

const { RangePicker } = DatePicker;

interface DateProps {
  value: [string | null, string | null];
  onChange: (val: [string | null, string | null]) => void;
}

const Date: FC<DateProps> = ({ value, onChange }) => {
  return (
    <RangePicker
      className="w-64"
      value={value[0] && value[1] ? [dayjs(value[0]), dayjs(value[1])] : null}
      onChange={(dates) => {
        const start = dates?.[0]?.format("YYYY-MM-DD") || null;
        const end = dates?.[1]?.format("YYYY-MM-DD") || null;
        onChange([start, end]);
      }}
    />
  );
};

export default Date;
