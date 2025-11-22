import { motion } from 'framer-motion';
import { SheetData } from '@/hooks/useGoogleSheets';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface StatusChartProps {
  data: SheetData[];
}

export const StatusChart = ({ data }: StatusChartProps) => {
  // Count status occurrences
  const statusCounts = data.reduce((acc, item) => {
    const status = item.Status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    'hsl(var(--neon-cyan))',
    'hsl(var(--neon-blue))',
    'hsl(var(--neon-purple))',
    'hsl(var(--neon-green))',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6 rounded-xl"
    >
      <h2 className="text-2xl font-bold text-primary mb-6 font-display flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse-glow" />
        Status Distribution
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
                color: 'hsl(var(--foreground))',
              }}
            />
            <Legend
              wrapperStyle={{
                color: 'hsl(var(--foreground))',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
