/**
 * Engagement Rate Widget - Central metric display
 */

import clsx from 'clsx';
import GlassCard from './GlassCard';
import { formatNumber } from '../utils/helpers';

export default function ERWidget({ engagementRate, totalLikes, totalComments, followers }) {
  const getERColor = (rate) => {
    const numRate = parseFloat(rate);
    if (numRate >= 10) return 'text-ios-safe';
    if (numRate >= 5) return 'text-orange-500';
    if (numRate >= 1) return 'text-slate-600';
    return 'text-slate-400';
  };

  const getERLabel = (rate) => {
    const numRate = parseFloat(rate);
    if (numRate >= 10) return 'Excellent ⭐';
    if (numRate >= 5) return 'Very Good';
    if (numRate >= 1) return 'Good';
    return 'Low';
  };

  return (
    <GlassCard variant="light" className="w-full">
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-slate-500 text-sm uppercase tracking-wider mb-3 pdf-metric-label">
          Engagement Rate
        </p>
        
        <div className={clsx('pdf-metric-value', getERColor(engagementRate))}>
          {engagementRate}%
        </div>

        <p className="text-slate-600 text-base mt-4 font-semibold">
          {getERLabel(engagementRate)}
        </p>

        {/* Engagement Breakdown */}
        <div className="grid grid-cols-3 gap-4 mt-8 w-full pt-6 border-t border-white/20">
          <div className="text-center">
            <p className="text-slate-500 text-xs uppercase tracking-wider">Likes</p>
            <p className="text-lg font-bold text-slate-700 mt-2">{formatNumber(totalLikes)}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-xs uppercase tracking-wider">Comments</p>
            <p className="text-lg font-bold text-slate-700 mt-2">{formatNumber(totalComments)}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-500 text-xs uppercase tracking-wider">Followers</p>
            <p className="text-lg font-bold text-slate-700 mt-2">{formatNumber(followers)}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
