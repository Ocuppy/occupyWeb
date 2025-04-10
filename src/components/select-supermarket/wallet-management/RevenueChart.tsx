import CustomTooltip from "@/components/shared/CustomTooltip";
import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
  { month: "Jan", revenue: 1500 },
  { month: "Feb", revenue: 1200 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 1300 },
  { month: "May", revenue: 1600 },
  { month: "Jun", revenue: 1400 },
  { month: "Jul", revenue: 1900 },
  { month: "Aug", revenue: 1250 },
  { month: "Sep", revenue: 1700 },
  { month: "Oct", revenue: 1100 },
  { month: "Nov", revenue: 1550 },
  { month: "Dec", revenue: 1450 },
];

export default function RevenueChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 159, 94, 0.28)" />
              <stop offset="100%" stopColor="rgba(0, 159, 94, 0)" />
            </linearGradient>
          </defs>
          <XAxis axisLine={false} tickLine={false} dataKey="month" />
          {/* <YAxis axisLine={false} tickLine={false} /> */}
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#009F5E"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
