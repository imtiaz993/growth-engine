import LineChart1 from "../../../../components/charts/LineChart1";
const IAPInstall = () => {
  return (
    <div className="h-[500px] p-6 bg-white rounded-md shadow-lg flex flex-col justify-between relative z-10">
      <div className="flex-1">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          IAP ARPPU by Install Age - Last 40 days
        </h2>
        <LineChart1/>
      </div>
    </div>
  );
};
export default IAPInstall;
