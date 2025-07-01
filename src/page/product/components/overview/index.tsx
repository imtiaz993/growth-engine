import DauTrends from "./DauTrends";
import ARPUTrends from "./ARPUTrends";
import RevenueTrends from "./RevenueTrends";
const Overview = () => {
    return (
        <div className="pt-5">
            <h1 className="font-semibold text-xl mb-6">Overview</h1>
            <div className="mt-6">
                <RevenueTrends />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 mt-4">
                <DauTrends/>
                <ARPUTrends />
            </div>
        </div>
    );
};

export default Overview;
