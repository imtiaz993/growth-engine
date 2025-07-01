import MultilineAreaChart from "../../../../components/charts/MultilineAreaChart";
 import PayValueLabels from "./PayValueLabels";

const PayAge = () => {
  const payGroups = [
    { label: "Whale", color: "#276EF1", value: 48.07 },
    { label: "Dolphin", color: "#F37D38", value: 31.82 },
    { label: "Fish", color: "#66C2A5", value: 8.89 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
      <div className="text-start mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Daily IAP Revenue (stacked by pay user)
        </h2>
        <div className="text-xs text-gray-500 mt-1">
          Daily &nbsp; | &nbsp; Groups (4/4) &nbsp; | &nbsp; 2025/06/13 — 2025/06/19
        </div>
        <div className="text-xs text-gray-500 mt-4">Jun 19, 2025</div>

        <PayValueLabels items={payGroups} />
      </div>
      <MultilineAreaChart />
    </div>
  );
};

export default PayAge;
