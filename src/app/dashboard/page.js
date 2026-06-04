/**
 * Dashboard Page - Hasil analisis dengan iOS widgets
 */

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import ERWidget from '@/components/ERWidget';
import FraudDetector from '@/components/FraudDetector';
import PerformanceChart from '@/components/PerformanceChart';
import PrintReport from '@/components/PrintReport';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const encodedData = searchParams.get('data');
    if (encodedData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(encodedData));
        setData(parsed);
      } catch (err) {
        setError('Gagal memuat data. Silakan analisis ulang.');
      }
    } else {
      setError('Tidak ada data. Silakan kembali ke halaman analisis.');
    }
  }, [searchParams]);

  if (!data && !error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block animate-spin text-4xl mb-4">⟳</div>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <GlassCard variant="light" className="max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="w-full py-2 bg-purple-500 text-white rounded-ios font-semibold hover:bg-purple-600"
          >
            ← Kembali ke Awal
          </button>
        </GlassCard>
      </main>
    );
  }

  const {
    platform,
    username,
    followers,
    totalPosts,
    metrics,
    fraudMetrics,
    authenticityScore,
    postings
  } = data;

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-white mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              @{username}
            </h1>
            <p className="text-white/70 text-lg">
              {platform.toUpperCase()} Engagement Analysis
            </p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="no-print px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-ios transition-all"
          >
            ← Analisis Akun Lain
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 no-print">
          <GlassCard variant="light" className="text-center">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Followers</p>
            <p className="text-2xl font-bold text-slate-700">{followers.toLocaleString('id-ID')}</p>
          </GlassCard>

          <GlassCard variant="light" className="text-center">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Total Posts</p>
            <p className="text-2xl font-bold text-slate-700">{totalPosts}</p>
          </GlassCard>

          <GlassCard variant="light" className="text-center">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Total Likes</p>
            <p className="text-2xl font-bold text-slate-700">{metrics.totalLikes.toLocaleString('id-ID')}</p>
          </GlassCard>

          <GlassCard variant="light" className="text-center">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Total Comments</p>
            <p className="text-2xl font-bold text-slate-700">{metrics.totalComments.toLocaleString('id-ID')}</p>
          </GlassCard>
        </div>

        {/* Main Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Engagement Rate Widget */}
          <ERWidget
            engagementRate={metrics.engagementRate}
            totalLikes={metrics.totalLikes}
            totalComments={metrics.totalComments}
            followers={followers}
          />

          {/* Fraud Detector Widget */}
          <FraudDetector
            fraudMetrics={fraudMetrics}
            authenticityScore={authenticityScore}
          />
        </div>

        {/* Performance Chart */}
        <div className="mb-8">
          <PerformanceChart postings={postings} />
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassCard variant="light">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 pdf-metric-label">
              Avg Likes/Post
            </p>
            <p className="text-3xl font-bold text-slate-700 pdf-metric-value">
              {parseInt(metrics.avgLikesPerPost).toLocaleString('id-ID')}
            </p>
          </GlassCard>

          <GlassCard variant="light">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 pdf-metric-label">
              Avg Comments/Post
            </p>
            <p className="text-3xl font-bold text-slate-700 pdf-metric-value">
              {parseInt(metrics.avgCommentsPerPost).toLocaleString('id-ID')}
            </p>
          </GlassCard>

          <GlassCard variant="light">
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-2 pdf-metric-label">
              Authenticity Score
            </p>
            <p className="text-3xl font-bold text-slate-700 pdf-metric-value">
              {authenticityScore.score}/100
            </p>
          </GlassCard>
        </div>

        {/* Print Report Section */}
        <div className="mb-8">
          <PrintReport
            data={data}
            username={username}
            platform={platform}
            engagementRate={metrics.engagementRate}
            authenticityScore={authenticityScore}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-white/60 text-sm mt-12 no-print">
          <p>Data terakhir diupdate: {new Date().toLocaleString('id-ID')}</p>
        </div>
      </div>
    </main>
  );
}
