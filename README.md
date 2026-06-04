# Instagram & TikTok Public Engagement Analyzer

Professional tool untuk menganalisis engagement rate Instagram & TikTok dengan deteksi bot canggih, fraud detection, dan authenticity scoring.

## ✨ Fitur Utama

- **Engagement Rate Calculator**: Hitung ER akurat dari data publik
- **Bot Detection Engine**: Deteksi injeksi like menggunakan algoritma pola anomali
- **Authenticity Score**: Skor 0-100 berdasarkan kombinasi fraud metrics
- **Visual Analytics**: Dashboard iOS-style dengan Recharts visualizations
- **PDF Export**: Download report professional dengan CSS print-friendly
- **Multi-platform**: Support Instagram & TikTok dengan validasi URL otomatis

## 🚀 Teknologi

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Styling**: Glassmorphism iOS design, responsive design
- **Charts**: Recharts untuk visualisasi interaktif
- **Backend**: Vercel Serverless Functions (API Routes)
- **Deployment**: Vercel (zero-config)

## 📋 Fraud Detection Algorithms

### 1. Like Injection Detection
- **Normal Range**: Like/View ratio 1-15%
- **Warning**: 15-30%
- **Danger**: 30%+

### 2. Comment Injection Detection
- **Normal**: Like:Comment ratio 20:1 - 100:1
- **Suspicious**: 100:1 - 200:1
- **Danger**: 200:1+

### 3. Engagement Consistency Analysis
- Analisis Coefficient of Variation (CV)
- Normal CV: >15%
- Suspicious: 5-15% (pola konsistensi tinggi = auto-like)
- Danger: <5%

### 4. Authenticity Score (0-100)
Kombinasi weighted:
- Like Injection: 40%
- Comment Injection: 35%
- Consistency: 25%

## 🛠️ Setup Lokal

### Prerequisites
- Node.js 18+ (versi terbaru recommended)
- npm atau yarn
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/engagement-analyzer.git
cd engagement-analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Buat file `.env.local`:
```
# .env.local
# Production API (ganti dengan RapidAPI credentials nanti)
NEXT_PUBLIC_API_URL=http://localhost:3000

# RapidAPI (untuk production dengan real data)
# RAPIDAPI_KEY=your_key
# RAPIDAPI_HOST=instagram-api.p.rapidapi.com
```

### 4. Run Development Server
```bash
npm run dev
```

Buka http://localhost:3000 di browser.

### 5. Build untuk Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
engagement-analyzer/
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout
│   │   ├── page.js                # Landing page
│   │   ├── globals.css            # Global CSS + print styles
│   │   ├── dashboard/
│   │   │   └── page.js            # Dashboard page
│   │   └── api/
│   │       └── analyze/
│   │           └── route.js       # Serverless API endpoint
│   ├── components/
│   │   ├── GlassCard.jsx          # iOS glass wrapper
│   │   ├── ERWidget.jsx           # Engagement rate display
│   │   ├── FraudDetector.jsx      # Fraud analysis widget
│   │   ├── PerformanceChart.jsx   # Recharts visualization
│   │   └── PrintReport.jsx        # PDF export component
│   └── utils/
│       └── helpers.js            # Fraud detection algorithms
├── public/                        # Static assets
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🎨 Design System

### Colors (iOS Pastel)
- Safe: `rgba(34, 197, 94, 0.12)` (green)
- Warning: `rgba(251, 191, 36, 0.12)` (yellow)
- Danger: `rgba(248, 113, 113, 0.12)` (red)

### Typography
- Display: Playfair Display (serif)
- Body: Outfit (sans-serif)
- Fallback: System fonts

### Components
- Cards: Glassmorphism dengan backdrop-filter blur
- Border radius: 24px (ios), 12px (ios-sm)
- Shadows: Soft iOS shadows

## 📊 PDF Export

Gunakan CSS `@media print` untuk export PDF professional:

```bash
1. Klik "Export as PDF" button
2. Browser print dialog akan muncul
3. Pilih "Save as PDF"
4. Report akan terdownload
```

**PDF Features**:
- Hirarki tipografi yang jelas (22pt judul, 36pt metrics)
- Status highlight dengan pastel colors
- Page break control untuk card integrity
- A4 format optimized

## 🔌 Integrasi RapidAPI (Production)

Untuk menggunakan data real Instagram & TikTok:

### 1. Sign up di RapidAPI
- Buka https://rapidapi.com
- Cari "Instagram API" atau "TikTok API"
- Subscribe ke API (free tier available)

### 2. Update .env.local
```
RAPIDAPI_KEY=your_rapidapi_key
RAPIDAPI_HOST=instagram-api.p.rapidapi.com
```

### 3. Update `/src/app/api/analyze/route.js`
Ganti mock data dengan:
```javascript
import axios from 'axios';

const options = {
  method: 'GET',
  url: `https://instagram-api.p.rapidapi.com/api/profile/${username}`,
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.RAPIDAPI_HOST
  }
};

const response = await axios.request(options);
const accountData = response.data;
```

## 🚢 Deployment ke Vercel

### Step 1: Buat GitHub Repository

```bash
# Di folder project
git init
git add .
git commit -m "Initial commit: Engagement Analyzer app"

# Buat repo di https://github.com/new
# Lalu push:
git remote add origin https://github.com/yourusername/engagement-analyzer.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy ke Vercel

**Option A: Via Vercel Dashboard (Recommended)**

1. Buka https://vercel.com dan login
2. Klik "Add New" → "Project"
3. Pilih GitHub repository
4. Vercel akan auto-detect Next.js project
5. Klik "Deploy"
6. Tunggu ~2 menit, then live!

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### Step 3: Set Environment Variables

Di Vercel Dashboard:

1. Project Settings → Environment Variables
2. Tambahkan:
   - `RAPIDAPI_KEY`: your_key
   - `RAPIDAPI_HOST`: instagram-api.p.rapidapi.com
3. Klik "Save"
4. Redeploy: klik "Redeploy" atau push ke GitHub

### Step 4: Custom Domain (Opsional)

1. Project Settings → Domains
2. Tambahkan custom domain
3. Update DNS records sesuai petunjuk Vercel
4. Wait 24-48 jam untuk propagasi

## 🔄 CI/CD & Auto-Deploy

Setelah terhubung ke GitHub, setiap kali Anda:

```bash
git push origin main
```

Vercel **otomatis**:
1. Rebuild aplikasi
2. Run tests (jika ada)
3. Deploy ke production
4. Preview deployment di URL temporary

## 📱 Mobile Responsiveness

Aplikasi ini 100% responsive:
- Desktop: 2-column grid layout
- Tablet: Adaptive cards
- Mobile: Single column, full-width widgets

Test dengan:
```bash
npm run dev
# Open DevTools (F12) → Toggle device toolbar
```

## 🐛 Troubleshooting

### API Error: "RapidAPI not configured"
**Solution**: Pastikan `.env.local` sudah benar dan server direstart setelah edit env.

### Styling tidak muncul setelah deploy
**Solution**: Clear Vercel cache di Project Settings → Deployments → Redeploy

### Build error: "Module not found"
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📈 Performance Tips

1. **Image Optimization**: Next.js auto-optimize images
2. **Code Splitting**: Recharts lazy-loaded
3. **Caching**: Implement Redis (Upstash) untuk cache API responses
4. **CDN**: Vercel Edge Network untuk global fast delivery

## 📚 API Documentation

### POST /api/analyze
Analyze Instagram/TikTok public engagement.

**Request:**
```json
{
  "url": "https://instagram.com/username"
}
```

**Response:**
```json
{
  "success": true,
  "platform": "instagram",
  "username": "example_user",
  "followers": 15000,
  "metrics": {
    "engagementRate": "5.42",
    "totalLikes": 10245,
    "totalComments": 845
  },
  "fraudMetrics": {
    "likeInjection": { "score": 20, "status": "safe", "message": "..." },
    "commentInjection": { "score": 15, "status": "safe", "message": "..." },
    "consistency": { "score": 25, "status": "safe", "message": "..." }
  },
  "authenticityScore": {
    "score": 85,
    "status": "very_safe",
    "healthLabel": "Sangat Sehat ✓"
  }
}
```

## 🔐 Security & Privacy

- ✅ Zero account login needed (analyze public data only)
- ✅ No sensitive data collected
- ✅ No cookies or tracking
- ✅ HTTPS only
- ✅ Vercel's trusted infrastructure

## 📄 License

MIT License - Silakan gunakan dan modifikasi sesuai kebutuhan.

## 🤝 Contributing

Contributions welcome! Silakan fork, buat feature branch, dan submit PR.

## 📞 Support

- 📧 Email: your-email@example.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Made with ❤️ for digital marketers & creators**

Untuk pertanyaan atau saran, buat issue di GitHub repository ini!
