import { Select } from "antd";
import type { FC } from "react";

interface GameProps {
  value: string[];
  onChange: (val: string[]) => void;
  options: { label: string; value: string }[];
}

const GameFilter: FC<GameProps> = ({ value, onChange, options }) => {
  const isAllSelected = value.length === options.length;

  const handleChange = (val: string[]) => {
    if (val.includes("all")) {
      onChange(isAllSelected ? [] : options.map((opt) => opt.value));
      return;
    }
    onChange(val);
  };

  const dropdownOptions = options.length
    ? [
        {
          label: isAllSelected ? "✅ All Selected" : "Select All",
          value: "all",
        },
        ...options,
      ]
    : [];

  return (
    <Select
      mode="multiple"
      placeholder="Select Game"
      options={dropdownOptions}
      className="w-52"
      value={value}
      onChange={handleChange}
      allowClear
      showArrow
      maxTagCount="responsive"
      maxTagPlaceholder={() => {
        if (isAllSelected) return "All Selected";
        if (value.length === 1) {
          return options.find((opt) => opt.value === value[0])?.label;
        }
        return `${value.length} games selected`;
      }}
    />
  );
};

export default GameFilter;
