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
import React from "react";
import type { ChartDataRow } from "../../types";

// Default line keys for fallback
const defaultLineKeys = [
    { key: "day0", color: "#1f77b4", name: "0. Day" },
    { key: "week1", color: "#ff7f0e", name: "1. Week 1" },
    { key: "month1", color: "#1fc9ff", name: "2. Month 1" },
    { key: "before3", color: "#9467bd", name: "3. Before month 3" },
    { key: "after3", color: "#fdbf00", name: "4. After month 3" },
];

const colorPalette = [
    "#1f77b4", "#ff7f0e", "#1fc9ff", "#9467bd", "#fdbf00",
    "#e377c2", "#2ca02c", "#d62728", "#8c564b", "#bcbd22"
];

function getLineKeysFromData(data: ChartDataRow[]): { key: string, color: string, name: string }[] {
    if (!data || data.length === 0) return defaultLineKeys;
    const allKeys = Object.keys(data[0]).filter(k => k !== "date");
    return allKeys.map((key, idx) => ({
        key,
        color: colorPalette[idx % colorPalette.length],
        name: key
    }));
}

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
                    return (
                        <div
                            key={entry.dataKey}
                            className="flex justify-between items-center px-1"
                        >
                            <div className="flex items-center gap-1">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                />
                                <span className="text-[11px] text-gray-700">{entry.dataKey}</span>
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

const CustomLegend = ({ lineKeys }: { lineKeys: { key: string, color: string, name: string }[] }) => (
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

export interface LineKey {
    key: string;
    color: string;
    name: string;
}

export interface LineChart1Props {
    chartData?: ChartDataRow[];
    isLoading?: boolean;
    error?: string | null;
    lineKeys?: LineKey[];
}

const LineChart1: React.FC<LineChart1Props> = ({ chartData, isLoading, error, lineKeys }) => {
    const data = chartData && chartData.length > 0 ? chartData : [];
    const keys = lineKeys && lineKeys.length > 0 ? lineKeys : getLineKeysFromData(data);
    const maxDataValue = data.length > 0
        ? Math.max(
            ...data.flatMap((d) =>
                keys.map(({ key }) => Number(d[key]) || 0)
            )
        )
        : 1;

    // Use a dynamic step for small values
    let tickStep: number;
    if (maxDataValue > 1) tickStep = Math.ceil(maxDataValue / 5);
    else if (maxDataValue > 0.1) tickStep = 0.05;
    else if (maxDataValue > 0.01) tickStep = 0.01;
    else tickStep = 0.001;

    const maxTick = Math.ceil(maxDataValue / tickStep) * tickStep;
    const ticks = Array.from(
        { length: Math.ceil(maxTick / tickStep) + 1 },
        (_, i) => parseFloat((i * tickStep).toFixed(4))
    );

    if (isLoading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }
    if (error) {
        return <div className="flex items-center justify-center h-full text-red-500">{error}</div>;
    }
    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full">No data available</div>;
    }

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
                    padding={{ left: 20, right: 20 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tickMargin={12}
                    tick={(props) => {
                        // If too many ticks, skip every other
                        const { x, y, payload, index } = props;
                        const total = props && props.payload && props.payload.length ? props.payload.length : (chartData?.length || 0);
                        const shouldShow = total > 20 ? index % 2 === 0 : true;
                        if (!shouldShow) return <g />;
                        return (
                            <g transform={`translate(${x},${y})`}>
                                <text
                                    x={0}
                                    y={0}
                                    dy={8}
                                    textAnchor="middle"
                                    fill="#999"
                                    fontSize={11}
                                    // transform="rotate(-45)"
                                >
                                    {payload.value}
                                </text>
                            </g>
                        );
                    }}
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
                <Legend verticalAlign="bottom" height={40} content={<CustomLegend lineKeys={keys} />} />
                {keys.map(({ key, color, name }) => (
                    <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={color}
                        name={name}
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 4 }}
                        isAnimationActive={false}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChart1;
