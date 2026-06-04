/**
 * Fraud Detection & Engagement Analytics Utilities
 * Based on pattern anomaly detection methods
 */

/**
 * Hitung Engagement Rate dari metrik publik
 * Formula: ((Likes + Comments) / Followers) * 100
 */
export const calculateEngagementRate = (likes, comments, followers) => {
  if (!followers || followers === 0) return 0;
  const totalEngagement = likes + comments;
  return ((totalEngagement / followers) * 100).toFixed(2);
};

/**
 * Deteksi injeksi like berdasarkan rasio Like/View
 * Pola Normal: 1% - 15%
 * Indikasi Curang: 30% - 50%+
 */
export const detectLikeInjection = (likes, views) => {
  if (!views || views === 0) return { score: 0, status: 'unknown' };
  
  const likeViewRatio = (likes / views) * 100;
  
  let score = 0;
  let status = 'safe';
  let message = '';
  
  if (likeViewRatio > 30) {
    score = 90;
    status = 'danger';
    message = `Rasio Like/View ${likeViewRatio.toFixed(2)}% sangat tinggi. Indikasi kuat bot like.`;
  } else if (likeViewRatio > 20) {
    score = 70;
    status = 'warning';
    message = `Rasio Like/View ${likeViewRatio.toFixed(2)}% di atas normal (1-15%).`;
  } else if (likeViewRatio > 15) {
    score = 50;
    status = 'warning';
    message = `Rasio Like/View ${likeViewRatio.toFixed(2)}% sedikit tinggi.`;
  } else {
    score = 20;
    status = 'safe';
    message = `Rasio Like/View ${likeViewRatio.toFixed(2)}% terlihat natural.`;
  }
  
  return { score, status, message, ratio: likeViewRatio.toFixed(2) };
};

/**
 * Deteksi injeksi berdasarkan Like/Comment Ratio
 * Pola Normal: 20:1 hingga 100:1
 * Indikasi Curang: Ratio > 200:1
 */
export const detectCommentInjection = (likes, comments) => {
  if (comments === 0 && likes > 100) {
    return {
      score: 85,
      status: 'danger',
      message: 'Likes tanpa komentar. Indikasi injeksi massal tanpa interaksi asli.',
      ratio: 'infinite'
    };
  }
  
  if (comments === 0) {
    return { score: 10, status: 'safe', message: 'Postingan baru, belum ada komentar.', ratio: 'N/A' };
  }
  
  const likeCommentRatio = likes / comments;
  
  let score = 0;
  let status = 'safe';
  let message = '';
  
  if (likeCommentRatio > 500) {
    score = 80;
    status = 'danger';
    message = `Ratio Like:Comment ${likeCommentRatio.toFixed(0)}:1 sangat ekstrem. Kemungkinan besar injeksi.`;
  } else if (likeCommentRatio > 200) {
    score = 70;
    status = 'warning';
    message = `Ratio Like:Comment ${likeCommentRatio.toFixed(0)}:1 cukup tinggi, cek manual.`;
  } else if (likeCommentRatio > 100) {
    score = 50;
    status = 'warning';
    message = `Ratio Like:Comment ${likeCommentRatio.toFixed(0)}:1 sedikit tinggi.`;
  } else {
    score = 15;
    status = 'safe';
    message = `Ratio Like:Comment ${likeCommentRatio.toFixed(0)}:1 sehat.`;
  }
  
  return { score, status, message, ratio: likeCommentRatio.toFixed(2) };
};

/**
 * Analisis konsistensi engagement antar postingan
 * Pola Curang: Semua postingan persis sama engagement
 */
export const analyzeEngagementConsistency = (postings) => {
  if (!postings || postings.length < 3) {
    return { score: 20, status: 'safe', message: 'Data postingan kurang untuk analisis.', variance: 0 };
  }
  
  const likes = postings.map(p => p.likes);
  const mean = likes.reduce((a, b) => a + b, 0) / likes.length;
  const variance = likes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / likes.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = (stdDev / mean) * 100;
  
  let score = 0;
  let status = 'safe';
  let message = '';
  
  if (coefficientOfVariation < 5) {
    score = 75;
    status = 'danger';
    message = `Engagement sangat konsisten (CV: ${coefficientOfVariation.toFixed(2)}%). Pola auto-like bulanan.`;
  } else if (coefficientOfVariation < 15) {
    score = 50;
    status = 'warning';
    message = `Engagement cukup konsisten (CV: ${coefficientOfVariation.toFixed(2)}%).`;
  } else {
    score = 20;
    status = 'safe';
    message = `Engagement natural dengan variasi wajar (CV: ${coefficientOfVariation.toFixed(2)}%).`;
  }
  
  return { score, status, message, variance: variance.toFixed(2), coefficientOfVariation: coefficientOfVariation.toFixed(2) };
};

/**
 * Hitung Authenticity Score (0-100)
 * Menggabungkan semua metrik fraud detection
 */
export const calculateAuthenticityScore = (fraudMetrics) => {
  const weights = {
    likeInjection: 0.4,
    commentInjection: 0.35,
    consistency: 0.25,
  };
  
  const likeScore = 100 - fraudMetrics.likeInjection.score;
  const commentScore = 100 - fraudMetrics.commentInjection.score;
  const consistencyScore = 100 - fraudMetrics.consistency.score;
  
  const totalScore = 
    (likeScore * weights.likeInjection) +
    (commentScore * weights.commentInjection) +
    (consistencyScore * weights.consistency);
  
  let healthStatus = 'safe';
  if (totalScore >= 80) {
    healthStatus = 'very_safe';
  } else if (totalScore >= 60) {
    healthStatus = 'safe';
  } else if (totalScore >= 40) {
    healthStatus = 'suspicious';
  } else {
    healthStatus = 'danger';
  }
  
  return {
    score: Math.round(totalScore),
    status: healthStatus,
    healthLabel: getHealthLabel(healthStatus)
  };
};

/**
 * Label untuk health status
 */
export const getHealthLabel = (status) => {
  const labels = {
    very_safe: 'Sangat Sehat ✓',
    safe: 'Sehat ✓',
    suspicious: 'Mencurigakan ⚠️',
    danger: 'Berbahaya ❌'
  };
  return labels[status] || 'Unknown';
};

/**
 * Format angka dengan separator (1000 -> 1.000)
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(num);
};

/**
 * Validasi URL Instagram atau TikTok
 */
export const validateSocialURL = (url) => {
  const instagramRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([a-zA-Z0-9_.-]+)\/?/;
  const tiktokRegex = /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@([a-zA-Z0-9_.-]+)\/?/;
  
  if (instagramRegex.test(url)) {
    const match = url.match(instagramRegex);
    return { platform: 'instagram', username: match[1] };
  } else if (tiktokRegex.test(url)) {
    const match = url.match(tiktokRegex);
    return { platform: 'tiktok', username: match[1] };
  }
  
  return { platform: null, username: null };
};

/**
 * Get recommendation based on metrics
 */
export const getAIRecommendations = (metrics) => {
  const recommendations = [];
  
  if (metrics.engagementRate < 1) {
    recommendations.push('Engagement rate sangat rendah. Coba posting lebih konsisten dan interaktif.');
  } else if (metrics.engagementRate > 10) {
    recommendations.push('Engagement rate sangat tinggi. Pertahankan konsistensi posting berkualitas.');
  }
  
  if (metrics.commentRatio < 50) {
    recommendations.push('Rasio komentar rendah. Buat pertanyaan di caption atau ajak diskusi.');
  }
  
  if (metrics.likeInjectionScore > 70) {
    recommendations.push('Deteksi kuat: Kemungkinan menggunakan jasa bot like. Hentikan sekarang untuk menghindari penalti platform.');
  }
  
  return recommendations.length > 0 ? recommendations : ['Engagement metrics terlihat sehat!'];
};
