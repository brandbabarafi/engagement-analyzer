/**
 * Landing Page - Input & Search
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!url.trim()) {
      setError('Silakan masukkan URL Instagram atau TikTok');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Terjadi kesalahan');
        setLoading(false);
        return;
      }

      // Pass data to dashboard via URL params (or use context/localStorage)
      const encodedData = encodeURIComponent(JSON.stringify(data));
      router.push(`/dashboard?data=${encodedData}`);

    } catch (err) {
      setError('Gagal terhubung ke server. Coba lagi.');
      setLoading(false);
    }
  };

  const exampleLinks = [
    'https://instagram.com/username',
    'https://tiktok.com/@username',
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Engagement Analyzer
          </h1>
          <p className="text-xl text-white/80">
            Analisis authentic engagement Instagram & TikTok dengan deteksi bot canggih
          </p>
        </div>

        {/* Main Card */}
        <GlassCard variant="light" className="mb-6">
          <form onSubmit={handleAnalyze} className="space-y-6">
            {/* URL Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                📱 Masukkan URL Profil
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://instagram.com/username atau https://tiktok.com/@username"
                className="w-full px-4 py-3 rounded-ios-sm border border-white/30 bg-white/60 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white transition-all"
              />
              <p className="text-xs text-slate-500 mt-2">
                ✓ Data publik saja yang dianalisis. Tidak perlu login.
              </p>
            </div>

            {/* Example Links */}
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-600 mb-3 font-semibold">
                Contoh Format
              </p>
              <div className="space-y-2">
                {exampleLinks.map((link, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUrl(link)}
                    className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-white/40 rounded-ios-sm transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-ios-danger-light border border-red-300 rounded-ios-sm p-3">
                <p className="text-sm text-red-700">⚠️ {error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-ios hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Menganalisis...
                </>
              ) : (
                '🔍 Analisis Sekarang'
              )}
            </button>
          </form>
        </GlassCard>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
          <GlassCard variant="light">
            <h3 className="font-semibold text-slate-700 mb-3">✨ Fitur Utama</h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>✓ Hitung Engagement Rate akurat</li>
              <li>✓ Deteksi like bot & injeksi</li>
              <li>✓ Analisis konsistensi engagement</li>
              <li>✓ Skor authenticity 0-100</li>
            </ul>
          </GlassCard>

          <GlassCard variant="light">
            <h3 className="font-semibold text-slate-700 mb-3">📊 Apa yang Dianalisis</h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>✓ Like/View ratio</li>
              <li>✓ Like/Comment ratio</li>
              <li>✓ Konsistensi engagement</li>
              <li>✓ Export PDF professional</li>
            </ul>
          </GlassCard>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/60 text-xs">
          <p>
            Made with ❤️ for digital marketers & influencers
          </p>
          <p className="mt-2">
            Disclaimer: Tool ini untuk analisis data publik saja. Bukan afiliasi resmi Instagram atau TikTok.
          </p>
        </div>
      </div>
    </main>
  );
}
