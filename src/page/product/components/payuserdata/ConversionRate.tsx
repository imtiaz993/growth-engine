import LineCharts from "../../../../components/charts/LineCharts";
import PayValueLabels from "./PayValueLabels";
const conversionData = [
  { date: "Jun 13", whale: 0.45, dolphin: 0.26, minnow: 0.18 },
  { date: "Jun 14", whale: 0.6, dolphin: 0.38, minnow: 0.28 },
  { date: "Jun 15", whale: 0.41, dolphin: 0.44, minnow: 0.33 },
  { date: "Jun 16", whale: 0.46, dolphin: 0.32, minnow: 0.31 },
  { date: "Jun 17", whale: 0.59, dolphin: 0.31, minnow: 0.3 },
  { date: "Jun 18", whale: 0.53, dolphin: 0.33, minnow: 0.33 },
  { date: "Jun 19", whale: 0.61, dolphin: 0.39, minnow: 0.28 },
];
const payGroups = [
  { label: "Whale", color: "#276EF1", value: 48.07 },
  { label: "Dolphin", color: "#F37D38", value: 31.82 },
  { label: "Fish", color: "#66C2A5", value: 8.89 },
];

const lineKeys = [
  { key: "whale", color: "#276EF1", name: "Whale" },
  { key: "dolphin", color: "#F37D38", name: "Dolphin" },
  { key: "minnow", color: "#5E72E4", name: "Minnow" },
];
const ConversionRate = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full  mx-auto">
      <div className="text-start mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Daily IAP Conversion Rate
        </h2>
        <div className="text-xs text-gray-500 mt-1">
          Daily &nbsp; | &nbsp; Groups (4/4) &nbsp; | &nbsp; Last 7D
        </div>
        <div className="text-xs text-gray-500 mt-4">Jun 19, 2025</div>
        <PayValueLabels items={payGroups} />
      </div>
      <LineCharts
        data={conversionData}
        lineKeys={lineKeys}
        xKey="date"
        yDomain={[0.1, 0.7]}
      />
    </div>
  );
};

export default ConversionRate;
