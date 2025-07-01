
import { useState } from "react";
import { Select } from "antd";
import SingleAreaChart from "../../../../components/charts/SingleAreaChart";
const RevenueTrends = () => {
    const [selectedMetric, setSelectedMetric] = useState("adRevenue");
    const metricOptions = [
        { label: "Ad Revenue", value: "adRevenue" },
        { label: "IAP Revenue", value: "iapRevenue" },
        { label: "Total Revenue", value: "totalRevenue" },
    ];

    return (
        <div className="h-[480px] p-6 bg-white rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Ad Revenue Trends
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Metric:</span>
                    <Select
                        value={selectedMetric}
                        options={metricOptions}
                        className="w-52"
                        onChange={(value) => setSelectedMetric(value)}
                    />
                </div>
            </div>
            <SingleAreaChart />
        </div>
    );
};

export default RevenueTrends;
