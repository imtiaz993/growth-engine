import type { FC } from "react";
import { Select } from "antd";

interface PlatformProps {
  value: string[];
  onChange: (val: string[]) => void;
  options: { label: string; value: string }[];
}

const PlatformFilter: FC<PlatformProps> = ({ value, onChange, options }) => {
  const handleChange = (val: string[]) => {
    if (val.includes("all")) {
      const isAllSelected = value.length === options.length;
      onChange(isAllSelected ? [] : options.map((opt) => opt.value));
      return;
    }
    onChange(val);
  };

  const dropdownOptions = options.length
    ? [
        {
          label: value.length !== options.length ? "Select All" : "Unselect All",
          value: "all",
        },
        ...options,
      ]
    : [];

  return (
    <Select
      mode="multiple"
      placeholder="Select Platform"
      options={dropdownOptions}
      className="w-52"
      value={value}
      onChange={handleChange}
      allowClear
      maxTagCount={0}
      maxTagPlaceholder={() => {
        if (value.length === options.length) return "All Selected";
        if (value.length === 1) {
          return options.find((opt) => opt.value === value[0])?.label;
        }
        return `${value.length} platforms selected`;
      }}
    />
  );
};

export default PlatformFilter;
