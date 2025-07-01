import { Select } from "antd";
import type { FC } from "react";

interface CountryProps {
  value: string[];
  onChange: (val: string[]) => void;
  options: { label: string; value: string }[];
}

const CountryFilter: FC<CountryProps> = ({ value, onChange, options }) => {
  return (
    <Select
      mode="multiple"
      placeholder="Select Country"
      options={options}
      className="w-52"
      value={value}
      onChange={onChange}
      allowClear
      maxTagCount={0}
      maxTagPlaceholder={() => {
        return value.length === 1
          ? options.find((opt) => opt.value === value[0])?.label
          : `${value.length} countries selected`;
      }}
    />
  );
};

export default CountryFilter;
