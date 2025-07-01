import { Select } from "antd";
import type { FC } from "react";

interface GameProps {
  value: string | null;
  onChange: (val: string | null) => void;
  options: { label: string; value: string }[];
}

const GameFilter: FC<GameProps> = ({ value, onChange, options }) => {
  return (
    <Select
      placeholder="Select Game"
      options={options}
      className="w-52"
      value={value}
      onChange={onChange}
      allowClear
    />
  );
};

export default GameFilter;
