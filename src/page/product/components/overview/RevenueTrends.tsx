import { useState } from "react";
import { Select } from "antd";
import BarCharts from "../../../../components/charts/BarChart";

const metricOptions = [
    { label: "Ad Revenue", value: "adRevenue", color: "#276EF1" },
    { label: "IAP Revenue", value: "iapRevenue", color: "#F37D38" },
    { label: "Total Revenue", value: "totalRevenue", color: "#2ECC71" },
];

const barKeys = metricOptions.map((opt) => ({
    key: opt.value,
    color: opt.color,
    name: opt.label,
}));

const RevenueTrends = ({ chartData, loading, error }: { chartData: any[]; loading: boolean, error: string | null }) => {
    const [selectedMetrics, setSelectedMetrics] = useState(metricOptions.map(opt => opt.value));

    return (
        <div className="h-[480px] p-6 bg-white rounded-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Ad Revenue Trends
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Metric:</span>

                    <Select
                        mode="multiple"
                        value={selectedMetrics}
                        options={metricOptions}
                        className="w-52"
                        onChange={setSelectedMetrics}
                        maxTagCount={0}
                        maxTagPlaceholder={() => {
                            return selectedMetrics.length === 1
                                ? metricOptions.find((opt) => opt.value === selectedMetrics[0])?.label
                                : `${selectedMetrics.length} metrics selected`;
                        }}
                    />
                </div>
            </div>
            <BarCharts chartData={chartData} isLoading={loading} error={error} barKeys={barKeys} />
        </div>
    );
};

export default RevenueTrends;
