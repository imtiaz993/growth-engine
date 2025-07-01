import type { FC } from "react";

interface PayLabelItem {
  label: string;
  color: string;
  value: number | string;
}

interface PayValueLabelsProps {
  items: PayLabelItem[];
}

const PayValueLabels: FC<PayValueLabelsProps> = ({ items }) => {
  return (
    <div className="flex justify-between items-end mt-1 font-semibold text-gray-900">
      {items.map(({ label, color, value }) => (
        <div key={label} className="flex flex-col items-start">
          <div className="text-lg mb-1">{value}</div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-3 h-3" style={{ backgroundColor: color }} />
            <span>{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayValueLabels;
