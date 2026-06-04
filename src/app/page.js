'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

      // Store data di localStorage, bukan URL params
      localStorage.setItem('dashboardData', JSON.stringify(data));
      router.push('/dashboard');

    } catch (err) {
      setError('Gagal terhubung ke server. Coba lagi.');
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Centered Search Box */}
        <form onSubmit={handleAnalyze} className="space-y-4 mb-12">
          <div className="relative">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Masukkan URL profil..."
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 text-lg transition-all"
              disabled={loading}
            />
            {loading && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <div className="animate-spin">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <p className="text-sm text-red-700">⚠️ {error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
          >
            {loading ? 'Menganalisis...' : 'Analisis'}
          </button>
        </form>

        {/* Examples - Minimal */}
        <div className="text-center space-y-3">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Contoh</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setUrl('https://instagram.com/instagram')}
              className="flex-1 text-xs text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              instagram.com/instagram
            </button>
            <button
              type="button"
              onClick={() => setUrl('https://tiktok.com/@tiktok')}
              className="flex-1 text-xs text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              tiktok.com/@tiktok
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-8 left-0 right-0 text-center">
        <p className="text-xs text-gray-500">
          Made with ❤️ from <span className="font-medium text-gray-900">Marcomm Baba Rafi</span>
        </p>
      </div>
    </main>
  );
}
