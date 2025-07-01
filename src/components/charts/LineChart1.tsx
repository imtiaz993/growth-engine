import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import type { TooltipProps } from 'recharts';
const rawData = [
    { date: '2025-04-27', day0: 3486, week1: 2210, month1: 1810, before3: 2235, after3: 7225 },
    { date: '2025-04-28', day0: 2919, week1: 2714, month1: 2285, before3: 2737, after3: 7782 },
    { date: '2025-04-29', day0: 2710, week1: 2813, month1: 2037, before3: 2250, after3: 7878 },
    { date: '2025-05-31', day0: 2776, week1: 2277, month1: 2800, before3: 2971, after3: 8617 },
    { date: '2025-04-28', day0: 2919, week1: 2714, month1: 2285, before3: 2737, after3: 7782 },
    { date: '2025-04-29', day0: 2710, week1: 2813, month1: 2037, before3: 2250, after3: 7878 },
    { date: '2025-04-30', day0: 3816, week1: 2576, month1: 1900, before3: 2391, after3: 8094 },
    { date: '2025-05-01', day0: 2661, week1: 2243, month1: 2430, before3: 2954, after3: 8319 },
    { date: '2025-05-02', day0: 3130, week1: 2288, month1: 2362, before3: 2906, after3: 7353 },
    { date: '2025-05-03', day0: 3906, week1: 1604, month1: 1919, before3: 2876, after3: 8728 },
    { date: '2025-05-04', day0: 2512, week1: 2787, month1: 1903, before3: 2895, after3: 8443 },
    { date: '2025-05-05', day0: 3951, week1: 1591, month1: 2740, before3: 2495, after3: 8339 },
    { date: '2025-05-06', day0: 3710, week1: 2896, month1: 1951, before3: 2373, after3: 8161 },
    { date: '2025-05-07', day0: 2766, week1: 2505, month1: 2204, before3: 2054, after3: 8547 },
    { date: '2025-05-08', day0: 3454, week1: 2411, month1: 2375, before3: 2319, after3: 8475 },
    { date: '2025-05-09', day0: 2816, week1: 2397, month1: 2548, before3: 2781, after3: 7727 },
    { date: '2025-05-10', day0: 2502, week1: 2716, month1: 2292, before3: 2774, after3: 7159 },
    { date: '2025-05-11', day0: 3741, week1: 2251, month1: 1893, before3: 2961, after3: 7237 },

];

const data = rawData.map((d) => ({
    ...d,
    day0: d.day0 / 10000,
    week1: d.week1 / 10000,
    month1: d.month1 / 10000,
    before3: d.before3 / 10000,
    after3: d.after3 / 10000,
}));

const lineKeys = [
    { key: "day0", color: "#1f77b4", name: "0. Day" },
    { key: "week1", color: "#ff7f0e", name: "1. Week 1" },
    { key: "month1", color: "#1fc9ff", name: "2. Month 1" },
    { key: "before3", color: "#9467bd", name: "3. Before month 3" },
    { key: "after3", color: "#fdbf00", name: "4. After month 3" },
];

const maxDataValue = Math.max(
    ...data.flatMap((d) =>
        lineKeys.map(({ key }) => d[key as keyof Omit<typeof d, 'date'>])
    )
);

const tickStep = 0.3;
const maxTick = Math.ceil(maxDataValue / tickStep) * tickStep;
const ticks = Array.from(
    { length: Math.ceil(maxTick / tickStep) + 1 },
    (_, i) => parseFloat((i * tickStep).toFixed(2))
);
const barKeys = [
    { key: "day0", color: "#1f77b4", name: "0. Day" },
    { key: "week1", color: "#ff7f0e", name: "1. Week 1" },
    { key: "month1", color: "#1fc9ff", name: "2. Month 1" },
    { key: "before3", color: "#9467bd", name: "3. Before month 3" },
    { key: "after3", color: "#fdbf00", name: "4. After month 3" },
] as const;
const CustomTooltip = ({
    active,
    payload,
    label,
    coordinate,
}: TooltipProps<number, string>) => {
    if (!active || !payload?.length || !coordinate) return null;

    const tooltipWidth = 200;
    const tooltipHeight = 140;
    const minMargin = 8;

    const chartWrapper = document.querySelector(".recharts-wrapper") as HTMLElement;
    const chartWidth = chartWrapper?.offsetWidth || 800;
    const chartHeight = chartWrapper?.offsetHeight || 400;
    const x = coordinate?.x ?? 0;
    const y = coordinate?.y ?? 0;

    // Default position: right of cursor
    let leftPos = x + 12;
    let topPos = y - tooltipHeight / 2;

    // Smart position handling
    const canFitRight = x + 12 + tooltipWidth <= chartWidth - minMargin;
    const canFitLeft = x - tooltipWidth - 12 >= minMargin;

    if (!canFitRight && canFitLeft) {
        leftPos = x - tooltipWidth - 12;
    } else if (!canFitRight && !canFitLeft) {
        leftPos = Math.max(minMargin, chartWidth - tooltipWidth - minMargin);
    }

    // Y-axis safety
    if (topPos + tooltipHeight > chartHeight) {
        topPos = chartHeight - tooltipHeight - 10;
    }
    if (topPos < minMargin) {
        topPos = minMargin;
    }

    return (
        <div
            className="bg-white p-2 border border-gray-300 shadow-md rounded text-xs absolute z-50"
            style={{
                left: `${leftPos}px`,
                top: `${topPos}px`,
                minWidth: tooltipWidth,
                maxWidth: tooltipWidth,
                pointerEvents: "none",
            }}
        >
            <p className="font-semibold text-gray-700 mb-1 text-sm">{label}</p>
            <div className="space-y-1">
                {payload.map((entry) => {
                    const barInfo = barKeys.find((b) => b.key === entry.dataKey);
                    if (!barInfo) return null;

                    return (
                        <div
                            key={entry.dataKey}
                            className="flex justify-between items-center px-1"
                        >
                            <div className="flex items-center gap-1">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: barInfo.color }}
                                />
                                <span className="text-[11px] text-gray-700">{barInfo.name}</span>
                            </div>
                            <span className="text-[11px] font-medium text-gray-800">
                                {Number(entry.value).toLocaleString()}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const CustomLegend = () => (
    <div className="flex flex-wrap gap-1 justify-center pt-2">
        {lineKeys.map(({ key, color, name }) => (
            <div key={key} className="flex items-center gap-2">
                <div
                    className="w-3 h-3"
                    style={{ backgroundColor: color }}
                />
                <span className="text-[12px]" style={{ color }}>{name}</span>
            </div>
        ))}
    </div>
);
const LineChart1 = () => {
    return (

        <ResponsiveContainer width="100%" height="90%">
            <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal
                    vertical={false}
                    stroke="#f0f0f0"
                />
                <XAxis
                    dataKey="date"
                    tick={{ fill: "#999", fontSize: 11, dx: 10 }}
                    padding={{ left: 20, right: 20 }}
                    interval={3}
                    axisLine={false}
                    tickLine={false}
                />

                <YAxis
                    domain={[0, maxTick]}
                    ticks={ticks}
                    tick={{ fill: "#666", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}

                />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                />
                <Legend verticalAlign="bottom" height={40} content={<CustomLegend />} />
                {lineKeys.map(({ key, color, name }) => (
                    <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={color}
                        name={name}
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>

    );
};

export default LineChart1;
