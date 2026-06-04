'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Read data dari localStorage
    try {
      const storedData = localStorage.getItem('dashboardData');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setData(parsed);
      } else {
        setError('Tidak ada data. Silakan kembali ke halaman analisis.');
      }
    } catch (err) {
      setError('Gagal memuat data. Silakan analisis ulang.');
    }
  }, []);

  if (!data && !error) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 font-medium text-sm"
          >
            ← Kembali
          </button>
        </div>
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
  } = data;

  const progressPercentage = Math.min(followers / 100000 * 100, 100);

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">@{username}</h1>
            <p className="text-xs text-gray-500 mt-1">{platform.toUpperCase()} • {totalPosts} postingan</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="no-print text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Analisis Lain
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Analytics Cards - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: Followers */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-900 font-semibold">Total Followers</h3>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{followers.toLocaleString('id-ID')}</p>
            <p className="text-xs text-green-600 font-medium mb-4">↑ Growing</p>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all" 
                style={{width: `${Math.min(progressPercentage, 100)}%`}}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Total pengikut akun</p>
          </div>

          {/* Card 2: Engagement Rate */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-900 font-semibold">Engagement Rate</h3>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{metrics.engagementRate}%</p>
            <p className={`text-xs font-medium mb-4 ${parseFloat(metrics.engagementRate) >= 5 ? 'text-green-600' : 'text-orange-600'}`}>
              {parseFloat(metrics.engagementRate) >= 5 ? '↑ Excellent' : '→ Average'}
            </p>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all" 
                style={{width: `${Math.min(parseFloat(metrics.engagementRate) * 10, 100)}%`}}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Per postingan</p>
          </div>

          {/* Card 3: Total Likes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-900 font-semibold">Total Likes</h3>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{metrics.totalLikes.toLocaleString('id-ID')}</p>
            <p className="text-xs text-green-600 font-medium mb-4">↑ {parseInt(metrics.avgLikesPerPost).toLocaleString('id-ID')} avg</p>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-500 h-2 rounded-full transition-all" 
                style={{width: '75%'}}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Semua postingan</p>
          </div>

          {/* Card 4: Authenticity Score */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-900 font-semibold">Authenticity Score</h3>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-bold text-gray-900 mb-2">{authenticityScore.score}/100</p>
            <p className={`text-xs font-medium mb-4 ${authenticityScore.score >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
              {authenticityScore.healthLabel}
            </p>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all" 
                style={{width: `${authenticityScore.score}%`}}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Authenticity level</p>
          </div>

        </div>

        {/* Detailed Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Detailed Stats */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Comments & Ratio */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Breakdown</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">Total Comments</p>
                  <p className="text-3xl font-bold text-gray-900">{metrics.totalComments.toLocaleString('id-ID')}</p>
                  <p className="text-xs text-gray-500 mt-2">Avg {parseInt(metrics.avgCommentsPerPost)}/post</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">Avg Likes/Post</p>
                  <p className="text-3xl font-bold text-gray-900">{parseInt(metrics.avgLikesPerPost).toLocaleString('id-ID')}</p>
                  <p className="text-xs text-gray-500 mt-2">Per postingan</p>
                </div>
              </div>
            </div>

            {/* Fraud Detection */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Fraud Detection Analysis</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Like Injection Risk</p>
                    <p className="text-sm font-bold text-gray-900">{fraudMetrics.likeInjection.score}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${fraudMetrics.likeInjection.score > 50 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{width: `${fraudMetrics.likeInjection.score}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{fraudMetrics.likeInjection.status}</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Comment Injection Risk</p>
                    <p className="text-sm font-bold text-gray-900">{fraudMetrics.commentInjection.score}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${fraudMetrics.commentInjection.score > 50 ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{width: `${fraudMetrics.commentInjection.score}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{fraudMetrics.commentInjection.status}</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Consistency Score</p>
                    <p className="text-sm font-bold text-gray-900">{fraudMetrics.consistency.score}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${fraudMetrics.consistency.score > 50 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{width: `${fraudMetrics.consistency.score}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{fraudMetrics.consistency.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Summary */}
          <div className="space-y-6">
            
            {/* Account Summary */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Platform</p>
                  <p className="text-gray-900 font-semibold">{platform.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Posts</p>
                  <p className="text-gray-900 font-semibold">{totalPosts.toLocaleString('id-ID')}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Followers</p>
                  <p className="text-gray-900 font-semibold">{followers.toLocaleString('id-ID')}</p>
                </div>
              </div>
            </div>

            {/* PDF Export */}
            <button
              onClick={() => window.print()}
              className="w-full py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-colors text-sm no-print"
            >
              🖨️ Export PDF
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-xs no-print">
          <p>Data dianalisis pada: {new Date().toLocaleString('id-ID')}</p>
          <p className="mt-3">Made with ❤️ from <span className="font-medium text-gray-900">Marcomm Baba Rafi</span></p>
        </div>
      </div>
    </main>
  );
}
