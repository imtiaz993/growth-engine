import { useEffect, useState } from "react";
import DauTrends from "./DauTrends";
import ARPUTrends from "./ARPUTrends";
import RevenueTrends from "./RevenueTrends";
import { getOverviewTrends } from "../../../../api/product";
import type { ProductFilterState, ChartDataRow } from "../../../../types";

function stripTime(dateStr: string) {
    return dateStr.split(" ")[0];
}

function objectToDateArray(obj: Record<string, number>): { date: string, value: number }[] {
    return Object.entries(obj).map(([date, value]) => ({ date: stripTime(date), value }));
}

type RevenueTrend = {
    ad_revenue?: Record<string, number>;
    iap_revenue?: Record<string, number>;
    total_revenue?: Record<string, number>;
};

function pivotRevenueTrends(revenueTrend: RevenueTrend) {
    const allDatesSet = new Set<string>();
    ["ad_revenue", "iap_revenue", "total_revenue"].forEach(key => {
        Object.keys(revenueTrend[key as keyof RevenueTrend] || {}).forEach(date => allDatesSet.add(date));
    });
    const allDates = Array.from(allDatesSet).sort();
    return allDates.map(date => ({
        date: stripTime(date),
        adRevenue: revenueTrend.ad_revenue?.[date] ?? 0,
        iapRevenue: revenueTrend.iap_revenue?.[date] ?? 0,
        totalRevenue: revenueTrend.total_revenue?.[date] ?? 0,
    }));
}

const Overview = ({ filters }: { filters: ProductFilterState }) => {
    const [dauData, setDauData] = useState<ChartDataRow[]>([]);
    const [arpuData, setArpuData] = useState<ChartDataRow[]>([]);
    const [revenueData, setRevenueData] = useState<ChartDataRow[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOverviewTrends(filters).then(res => {
            const data = res.data.data;
            setDauData(objectToDateArray(data.dau_trend.data_map_0));
            setArpuData(objectToDateArray(data.arpu_trend.data));
            setRevenueData(pivotRevenueTrends(data.revenue_trend));
            setLoading(false);
        });
    }, [filters]);

    return (
        <div className="pt-5">
            <h1 className="font-semibold text-xl mb-6">Overview</h1>
            <div className="mt-6">
                <RevenueTrends chartData={revenueData} loading={loading} error={null} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-5 mt-4">
                <DauTrends chartData={dauData} loading={loading} />
                <ARPUTrends chartData={arpuData} loading={loading} />
            </div>
        </div>
    );
};

export default Overview;
