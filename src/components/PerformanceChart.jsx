/**
 * Performance Chart Component - Visualisasi trend engagement
 */

'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart
} from 'recharts';
import GlassCard from './GlassCard';

export default function PerformanceChart({ postings = [] }) {
  if (!postings || postings.length === 0) {
    return (
      <GlassCard variant="light">
        <p className="text-slate-500 text-center py-8">No posting data available</p>
      </GlassCard>
    );
  }

  // Prepare data untuk chart
  const chartData = postings.slice(0, 20).map((post, idx) => ({
    name: `Post ${idx + 1}`,
    likes: post.likes || 0,
    comments: post.comments || 0,
    engagement: ((post.likes + post.comments) / 1000) * 100, // Simplified calculation
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism-light rounded-ios-sm p-3 text-sm">
          <p className="font-semibold text-slate-800">{payload[0].payload.name}</p>
          {payload.map((entry, idx) => (
            <p key={idx} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString('id-ID')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard variant="light" className="w-full">
      <h3 className="text-slate-700 font-semibold mb-6 pdf-h2">
        📊 Engagement Trend (Last 20 Posts)
      </h3>

      <div className="bg-white/40 rounded-ios-sm p-4">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="likes" 
              fill="#667eea" 
              radius={[8, 8, 0, 0]}
              opacity={0.8}
            />
            <Bar 
              dataKey="comments" 
              fill="#764ba2" 
              radius={[8, 8, 0, 0]}
              opacity={0.8}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ fill: '#22c55e', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center pt-4 border-t border-white/20 pdf-section">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 pdf-metric-label">Avg Likes</p>
          <p className="text-lg font-bold text-slate-700 mt-2">
            {Math.round(chartData.reduce((a, b) => a + b.likes, 0) / chartData.length).toLocaleString('id-ID')}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 pdf-metric-label">Avg Comments</p>
          <p className="text-lg font-bold text-slate-700 mt-2">
            {Math.round(chartData.reduce((a, b) => a + b.comments, 0) / chartData.length).toLocaleString('id-ID')}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500 pdf-metric-label">Peak Engagement</p>
          <p className="text-lg font-bold text-slate-700 mt-2">
            {Math.max(...chartData.map(d => d.likes + d.comments)).toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
