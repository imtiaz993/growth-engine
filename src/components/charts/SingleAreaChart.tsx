import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";
const dauData = [
    { date: "2024-05-25", dau: 13500 },
    { date: "2024-05-26", dau: 8900 },
    { date: "2024-05-27", dau: 14500 },
    { date: "2024-05-28", dau: 10200 },
    { date: "2024-05-29", dau: 13100 },
    { date: "2024-05-30", dau: 9700 },
    { date: "2024-05-31", dau: 11900 },
    { date: "2024-06-01", dau: 10800 },
    { date: "2024-06-02", dau: 12900 },
    { date: "2024-06-03", dau: 11600 },
    { date: "2024-06-04", dau: 8900 },
    { date: "2024-06-05", dau: 12500 },
    { date: "2024-06-06", dau: 13500 },
    { date: "2024-06-07", dau: 10100 },
    { date: "2024-06-08", dau: 11200 },
    { date: "2024-06-09", dau: 9400 },
    { date: "2024-06-10", dau: 14200 },
    { date: "2024-06-11", dau: 10600 },
    { date: "2024-06-12", dau: 11700 },
    { date: "2024-06-13", dau: 12300 },
    { date: "2024-06-14", dau: 9600 },
    { date: "2024-06-15", dau: 12800 },
];
const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<number, string>) => {
    if (!active || !payload || !payload.length) return null;
    return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md text-sm">
            <p className="font-semibold text-gray-800 mb-2">{label}</p>
            <div className="flex justify-between gap-4">
                <span className="text-gray-600">DAU</span>
                <span className="font-medium text-gray-800">{payload[0].value}</span>
            </div>
        </div>
    );
};
const SingleAreaChart = () => {
    return (
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart
                    data={dauData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 60 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"
                        horizontal={true}
                        vertical={false}
                    />
                    <XAxis
                        dataKey="date"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        tickMargin={12}
                        tick={{ fill: "#666", fontSize: 11, dx: 10 }}
                        padding={{ left: 0, right: 10 }}

                        label={{
                            value: "Date",
                            position: "insideBottom",
                            offset: -30,
                            fill: "#666",
                            fontSize: 13,
                        }}

                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{ fill: "#666", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        label={{
                            value: "Users",
                            angle: -90,
                            position: "insideLeft",
                            fill: "#666",
                            fontSize: 14,
                        }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={false} />
                    <Area
                        type="monotone"
                        dataKey="dau"
                        name="DAU"
                        stroke="#000055"
                        fill="#e7f4fc"
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>

    );
};
export default SingleAreaChart;
