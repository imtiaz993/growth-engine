import { useState, useEffect } from "react";
import LineCharts from "../../../../components/charts/LineCharts";
import { getDauByPayUser } from "../../../../api/product";
import type { ProductFilterState, ChartDataRow } from "../../../../types";
import PayValueLabels from "./PayValueLabels";

const colorPalette = [
    "#276EF1", "#F37D38", "#66C2A5", "#5E72E4", "#F1C40F", "#8E44AD", "#2ECC71"
];

type GroupApiData = {
    group_0: string;
    data_map_0: Record<string, number>;
    total_amount?: number;
};

function extractGroupsFromApiData(apiData: GroupApiData[]): string[] {
    if (Array.isArray(apiData) && apiData.length > 0 && apiData[0].group_0) {
        return apiData.map((item: GroupApiData) => item.group_0);
    }
    return [];
}

function groupDataToDateCentric(data: GroupApiData[]): ChartDataRow[] {
    const dateMap: Record<string, ChartDataRow> = {};
    const allGroups = new Set<string>();
    data.forEach((item: GroupApiData) => {
        const group = item.group_0;
        allGroups.add(group);
        const dataMap = item.data_map_0 || {};
        Object.entries(dataMap).forEach(([date, value]) => {
            const dateOnly = date.split(' ')[0];
            if (!dateMap[dateOnly]) dateMap[dateOnly] = { date: dateOnly };
            dateMap[dateOnly][group] = Number(value);
        });
    });
    // Fill missing group values with 0 for each date
    const groupList = Array.from(allGroups);
    const processedData = Object.values(dateMap).map((row) => {
        groupList.forEach(group => {
            if (!(group in row)) row[group] = 0;
        });
        return row;
    });
    // Sort by date
    processedData.sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime());
    return processedData;
}

interface ConversionUserProps {
    filters: ProductFilterState;
}

const ConversionUser = ({ filters }: ConversionUserProps) => {
    const [data, setData] = useState<ChartDataRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    console.log("error", error);
    const [apiData, setApiData] = useState<GroupApiData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getDauByPayUser(filters);
                if (response.status !== 200) throw new Error(`HTTP error! Status: ${response.status}`);
                const { data } = response.data;
                if (!Array.isArray(data)) throw new Error("Invalid response format");
                setApiData(data);
                const processedData = groupDataToDateCentric(data);
                setData(processedData);
            } catch (err) {
                console.error(err);
                setError("Failed to load DAU by pay user data.");
                setData([]);
                setApiData([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [filters]);

    const groupNames = extractGroupsFromApiData(apiData);
    const payGroups = groupNames.map((name, idx) => {
        const groupObj = apiData.find((item: GroupApiData) => item.group_0 === name);
        return {
            label: name,
            color: colorPalette[idx % colorPalette.length],
            value: groupObj ? groupObj.total_amount?.toFixed(2) || "0.00" : "0.00"
        };
    });
    const lineKeys = groupNames.map((name, idx) => ({
        key: name,
        color: colorPalette[idx % colorPalette.length],
        name
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full  mx-auto">
            <div className="text-start mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                    DAU by pay user
                </h2>
                <PayValueLabels items={payGroups} />

            </div>
            {isLoading ? <div className="text-center py-8">Loading chart...</div> : <LineCharts data={data} lineKeys={lineKeys} xKey="date" />}
        </div>
    );
};

export default ConversionUser;
