import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ARPUTrends = ({ chartData, loading }: { chartData: any[]; loading: boolean }) => {
  return (
    <div className="h-[480px] p-6 bg-white rounded-md shadow-lg relative">
      <h2 className="text-lg font-bold text-gray-800 mb-4">ARPU Trends</h2>
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} tickMargin={12} tick={{ fill: "#666", fontSize: 11, dx: 10 }} padding={{ left: 0, right: 10 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#666", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#F37D38" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ARPUTrends;
