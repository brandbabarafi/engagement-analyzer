/**
 * Fraud Detector Widget - Deteksi bot & injeksi like
 */

import GlassCard from './GlassCard';
import clsx from 'clsx';

export default function FraudDetector({ fraudMetrics, authenticityScore }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'safe':
        return { bg: 'bg-ios-safe-light', text: 'text-ios-safe', border: 'border-green-300' };
      case 'warning':
        return { bg: 'bg-ios-warning-light', text: 'text-orange-700', border: 'border-yellow-300' };
      case 'danger':
        return { bg: 'bg-ios-danger-light', text: 'text-red-700', border: 'border-red-300' };
      default:
        return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300' };
    }
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'bg-ios-safe-light border-green-300 text-ios-safe';
    if (score >= 60) return 'bg-ios-warning-light border-yellow-300 text-orange-700';
    return 'bg-ios-danger-light border-red-300 text-red-700';
  };

  const MetricCard = ({ title, score, status, message }) => {
    const colors = getStatusColor(status);
    
    return (
      <div className={clsx(
        'rounded-ios-sm p-4 border',
        colors.bg,
        colors.border,
        'no-print mb-3'
      )}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mb-2">
              {title}
            </p>
            <p className={clsx('text-sm', colors.text)}>
              {message}
            </p>
          </div>
          <div className={clsx(
            'text-2xl font-bold ml-3',
            colors.text
          )}>
            {score}
          </div>
        </div>
      </div>
    );
  };

  return (
    <GlassCard variant="light" className="w-full">
      <div className="space-y-4">
        {/* Authenticity Score Header */}
        <div className={clsx(
          'rounded-ios-sm p-6 border text-center mb-6',
          'pdf-card',
          getHealthColor(authenticityScore.score)
        )}>
          <p className="text-xs uppercase tracking-wider font-semibold mb-2">Authenticity Score</p>
          <p className="text-4xl font-bold">{authenticityScore.score}</p>
          <p className="text-sm mt-2">{authenticityScore.healthLabel}</p>
        </div>

        {/* Detection Metrics */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Fraud Detection Analysis
          </h3>

          <MetricCard
            title="Like Injection Detection"
            score={fraudMetrics.likeInjection.score}
            status={fraudMetrics.likeInjection.status}
            message={fraudMetrics.likeInjection.message}
          />

          <MetricCard
            title="Comment Injection Detection"
            score={fraudMetrics.commentInjection.score}
            status={fraudMetrics.commentInjection.status}
            message={fraudMetrics.commentInjection.message}
          />

          <MetricCard
            title="Engagement Consistency"
            score={fraudMetrics.consistency.score}
            status={fraudMetrics.consistency.status}
            message={fraudMetrics.consistency.message}
          />
        </div>

        {/* Recommendation */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-600 mb-3">
            ⚡ Rekomendasi
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            {authenticityScore.score >= 80 && 
              'Akun terlihat sangat sehat dan authentic. Engagement natural dari followers asli.'}
            {authenticityScore.score >= 60 && authenticityScore.score < 80 &&
              'Akun terlihat sehat dengan engagement yang baik. Monitor terus pertumbuhan.'}
            {authenticityScore.score >= 40 && authenticityScore.score < 60 &&
              'Ada indikasi penggunaan layanan bot/auto-like. Pertimbangkan untuk mengurangi penggunaan.'}
            {authenticityScore.score < 40 &&
              'Kemungkinan besar menggunakan bot like masif. Hentikan sekarang untuk menghindari shadow ban platform.'}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
