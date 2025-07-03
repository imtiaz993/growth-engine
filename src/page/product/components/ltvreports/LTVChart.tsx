import DynamicLineChart from "../../../../components/charts/LineCharts";
const ltvData = [
  { day: 0, adsLTV: 0.005, iapLTV: 0.004 },
  { day: 2, adsLTV: 0.012, iapLTV: 0.01 },
  { day: 4, adsLTV: 0.017, iapLTV: 0.015 },
  { day: 6, adsLTV: 0.021, iapLTV: 0.018 },
  { day: 10, adsLTV: 0.025, iapLTV: 0.02 },
  { day: 14, adsLTV: 0.028, iapLTV: 0.023 },
  { day: 18, adsLTV: 0.03, iapLTV: 0.025 },
  { day: 22, adsLTV: 0.031, iapLTV: 0.024 },
  { day: 26, adsLTV: 0.028, iapLTV: 0.021 },
  { day: 30, adsLTV: 0.026, iapLTV: 0.022 },
];
const ltvLineKeys = [
  { key: "adsLTV", color: "#1f77b4", name: "Ads LTV" },
  { key: "iapLTV", color: "#FC8969", name: "IAP LTV" },
];

const LTVChart = () => {
  return (
 <div className="h-[390px] p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-ls font-bold text-gray-800 !mb-4">
        Ads LTV vs IAP LTV by Days Since Install
      </h2>
      {/* 👇 this relative wrapper is required */}
      <div className="relative w-full h-[300px]">
        <DynamicLineChart
          data={ltvData}
          lineKeys={ltvLineKeys}
          xKey="day"
        />
      </div>
    </div>
  );
};

export default LTVChart;
