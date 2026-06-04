/**
 * Print Report Component - Export dashboard ke PDF
 */

'use client';

import GlassCard from './GlassCard';
import { formatNumber } from '../utils/helpers';

export default function PrintReport({ data, username, platform, engagementRate, authenticityScore }) {
  const handlePrint = () => {
    // Trigger browser print dialog
    window.print();
  };

  const downloadAsImage = () => {
    // Future feature: save as image via canvas
    alert('Feature coming soon: Download as image');
  };

  return (
    <>
      {/* Print Button - Visible only on screen */}
      <div className="no-print mb-6 flex gap-4">
        <button
          onClick={handlePrint}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-ios font-semibold hover:shadow-lg transition-all duration-300"
        >
          🖨️ Export as PDF
        </button>
        <button
          onClick={downloadAsImage}
          className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-ios font-semibold hover:shadow-lg transition-all duration-300"
        >
          📸 Save as Image
        </button>
      </div>

      {/* Hidden Print Content */}
      <style>{`
        @media print {
          body {
            background: white;
            padding: 0;
            margin: 0;
          }
          
          .print-header {
            border-bottom: 2px solid #cbd5e1;
            padding-bottom: 12pt;
            margin-bottom: 20pt;
          }
          
          .print-section {
            page-break-inside: avoid;
            margin-bottom: 20pt;
          }
          
          .print-divider {
            border-top: 1px solid #e2e8f0;
            margin: 20pt 0;
          }
        }
      `}</style>

      {/* PDF Content */}
      <div className="hidden print:block p-8 bg-white text-slate-800">
        {/* Header */}
        <div className="print-header">
          <h1 className="text-3xl font-bold mb-2">ENGAGEMENT AUDIT REPORT</h1>
          <p className="text-sm text-slate-600">
            Report generated on {new Date().toLocaleDateString('id-ID', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Account Info */}
        <div className="print-section">
          <h2 className="pdf-h2">Account Information</h2>
          <div className="mt-4 space-y-2 pdf-description">
            <p><strong>Username:</strong> @{username}</p>
            <p><strong>Platform:</strong> {platform.toUpperCase()}</p>
            <p><strong>Report Type:</strong> Public Engagement Analysis</p>
          </div>
        </div>

        <div className="print-divider" />

        {/* Key Metrics */}
        <div className="print-section">
          <h2 className="pdf-h2">Key Performance Metrics</h2>
          <div className="mt-4 grid grid-cols-2 gap-8">
            <div className="pdf-safe">
              <p className="pdf-metric-label">Engagement Rate</p>
              <p className="pdf-metric-value text-2xl">{engagementRate}%</p>
            </div>
            <div className="pdf-safe">
              <p className="pdf-metric-label">Authenticity Score</p>
              <p className="pdf-metric-value text-2xl">{authenticityScore.score}</p>
            </div>
          </div>
        </div>

        <div className="print-divider" />

        {/* Health Status */}
        <div className="print-section">
          <h2 className="pdf-h2">Account Health Status</h2>
          <div className="mt-4">
            {authenticityScore.score >= 80 && (
              <div className="pdf-safe">
                <p className="font-semibold">✓ Very Healthy</p>
                <p className="text-sm mt-2">This account shows strong signs of authentic engagement from real followers. No indicators of bot activity detected.</p>
              </div>
            )}
            {authenticityScore.score >= 60 && authenticityScore.score < 80 && (
              <div className="pdf-safe">
                <p className="font-semibold">✓ Healthy</p>
                <p className="text-sm mt-2">This account has good engagement metrics. Continue monitoring for consistency.</p>
              </div>
            )}
            {authenticityScore.score >= 40 && authenticityScore.score < 60 && (
              <div className="pdf-warning">
                <p className="font-semibold">⚠ Suspicious Indicators</p>
                <p className="text-sm mt-2">This account shows some patterns consistent with bot engagement services. Manual review recommended.</p>
              </div>
            )}
            {authenticityScore.score < 40 && (
              <div className="pdf-danger">
                <p className="font-semibold">❌ High Risk</p>
                <p className="text-sm mt-2">Strong indicators of artificial engagement detected. Recommend discontinuing bot services immediately.</p>
              </div>
            )}
          </div>
        </div>

        <div className="print-divider" />

        {/* Disclaimer */}
        <div className="print-section mt-12 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            <strong>Disclaimer:</strong> This report analyzes publicly available data only. Results are based on pattern analysis and should not be considered as definitive proof. This tool is for informational purposes only and not affiliated with Instagram, TikTok, or any official platform.
          </p>
        </div>
      </div>

      {/* Screen View Content */}
      <GlassCard variant="light" className="w-full no-print">
        <div className="text-center py-8">
          <p className="text-slate-600 text-sm">
            Click "Export as PDF" button above to download this report in professional PDF format.
          </p>
          <p className="text-slate-400 text-xs mt-4">
            The PDF will include all metrics, fraud analysis, and health status assessment.
          </p>
        </div>
      </GlassCard>
    </>
  );
}
