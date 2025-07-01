import type { FC } from "react";
import { Select } from "antd";

interface PlatformProps {
  value: string[];
  onChange: (val: string[]) => void;
  options: { label: string; value: string }[];
}
const PlatformFilter:FC<PlatformProps> =({ value, onChange, options }: PlatformProps) => {
  return (
    <Select
      mode="multiple"
      placeholder="Select Platform"
      options={options}
      className="w-52"
      value={value}
      onChange={onChange}
      allowClear
    />
  );
};

export default PlatformFilter;
