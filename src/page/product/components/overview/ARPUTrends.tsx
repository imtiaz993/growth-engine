import SingleAreaChart from "../../../../components/charts/SingleAreaChart";
const ARPUTrends = () => {
    return (
        <div className="h-[480px] p-6 bg-white rounded-md shadow-lg relative">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
                ARPU Trends
            </h2>
          <SingleAreaChart/>
        </div>
    );
};

export default ARPUTrends;
