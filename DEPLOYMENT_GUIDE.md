# Step-by-Step Deployment Guide: GitHub → Vercel

Panduan lengkap untuk upload ke GitHub dan deploy ke Vercel. Ikuti step ini dengan teliti! 🚀

---

## 📌 OVERVIEW: Kenapa GitHub + Vercel?

```
Your Computer (Local Development)
         ↓ git push
    GitHub Repository (Version Control)
         ↓ webhook trigger
    Vercel (Automatic Build & Deploy)
         ↓
    🌐 Live Website (example.vercel.app)
```

**Keuntungan:**
- Version control lengkap
- Auto-deploy setiap push (CI/CD)
- Preview deployments untuk testing
- Environment variables aman di Vercel dashboard

---

## 🟢 STEP 1: Siapkan Lokal Repository

### 1.1 Buka Terminal di Project Folder

```bash
# Navigate ke engagement-analyzer folder
cd ~/projects/engagement-analyzer
# atau lokasi dimana Anda menyimpan project

# Verify struktur folder
ls -la
# Anda harus melihat: src/, public/, package.json, tailwind.config.js, dll
```

### 1.2 Initialize Git Lokal

```bash
# Jika belum ada .git folder, jalankan:
git init

# Verify
git status
# Output: "On branch main", "nothing to commit"
```

### 1.3 Configure Git User (First Time Only)

```bash
# Set global git config (jika belum pernah setup)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Verify
git config --global user.name
git config --global user.email
```

---

## 🟢 STEP 2: Commit Project ke Git Lokal

```bash
# 1. Stage semua file
git add .

# 2. Verify apa yang akan di-commit
git status
# Output: Hijau = file baru, kuning = file belum di-stage

# 3. Commit dengan message
git commit -m "Initial commit: Engagement Analyzer with iOS design, fraud detection, and PDF export"

# 4. Verify commit
git log --oneline
# Output: Anda akan melihat commit message di atas
```

---

## 🟢 STEP 3: Buat GitHub Repository

### 3.1 Login ke GitHub

- Buka https://github.com
- Login dengan akun Anda (atau buat akun baru jika belum punya)

### 3.2 Buat Repository Baru

1. Di dashboard GitHub, klik **"New"** (tombol hijau)
2. Isi form:
   - **Repository name**: `engagement-analyzer`
   - **Description**: "Instagram & TikTok Public Engagement Analyzer"
   - **Public atau Private**: Public (agar bisa deploy ke Vercel free tier)
   - **Initialize this repository with**: JANGAN CENTANG APAPUN
3. Klik **"Create repository"**

### 3.3 Verify Repository URL

Setelah create, GitHub akan show:

```
https://github.com/yourusername/engagement-analyzer.git
```

**Copy URL ini!** Anda butuh di step 4.

---

## 🟢 STEP 4: Push Code ke GitHub

### 4.1 Add Remote GitHub

```bash
# Copy-paste dari GitHub (ganti yourusername)
git remote add origin https://github.com/yourusername/engagement-analyzer.git

# Verify
git remote -v
# Output: 
# origin  https://github.com/yourusername/engagement-analyzer.git (fetch)
# origin  https://github.com/yourusername/engagement-analyzer.git (push)
```

### 4.2 Rename Branch ke "main" (jika perlu)

```bash
# Check current branch
git branch

# Jika masih "master", rename ke "main"
git branch -M main
```

### 4.3 Push ke GitHub

```bash
# Push semua commits ke GitHub
git push -u origin main

# Verify di browser: refresh https://github.com/yourusername/engagement-analyzer
# Anda sekarang bisa lihat semua file di GitHub!
```

---

## 🟣 STEP 5: Deploy ke Vercel

### 5.1 Sign Up / Login ke Vercel

- Buka https://vercel.com
- **Sign up** (atau login jika sudah punya akun)
- Recommended: Sign up dengan GitHub account (lebih mudah)

### 5.2 Create Project di Vercel

1. Di Vercel dashboard, klik **"Add New"** → **"Project"**
2. Klik **"Continue with GitHub"**
3. Authorize Vercel to access GitHub (ikuti popup)
4. Pilih repository: `engagement-analyzer`
5. Klik **"Import"**

### 5.3 Configure Project Settings

Vercel akan auto-detect Next.js project. Settings akan seperti:

- **Project Name**: `engagement-analyzer` (oke)
- **Framework Preset**: `Next.js` (oke)
- **Root Directory**: `./` (oke)
- **Build Command**: `next build` (auto-filled, oke)
- **Output Directory**: `.next` (auto-filled, oke)

**Scroll ke bawah → klik "Deploy"**

---

## ⏳ Step 6: Tunggu Build & Deploy Complete

Vercel akan:
1. Pull code dari GitHub
2. Install dependencies (`npm install`)
3. Build aplikasi (`npm run build`)
4. Deploy ke Vercel servers
5. Generate URL (format: `https://engagement-analyzer-yourusername.vercel.app`)

**Status page:**
- 🔵 Initializing
- 🟡 Building
- 🟢 Deployment Successful!

Tunggu ~3-5 menit. Setelah selesai, klik **"Visit"** untuk buka live website!

---

## 🟣 STEP 7: Set Environment Variables di Vercel (Optional, untuk Production)

Jika ingin menggunakan RapidAPI untuk real Instagram/TikTok data:

### 7.1 Go to Project Settings

1. Di Vercel dashboard, pilih project `engagement-analyzer`
2. Klik **"Settings"**
3. Cari tab **"Environment Variables"**

### 7.2 Add Environment Variables

Klik **"Add"** dan isi:

1. **Name**: `RAPIDAPI_KEY`
   **Value**: `your_rapidapi_key_here`

2. **Name**: `RAPIDAPI_HOST`
   **Value**: `instagram-api.p.rapidapi.com`

Klik **"Save"**

### 7.3 Redeploy

Setelah add env vars, Vercel otomatis akan redeploy. Tunggu build selesai.

---

## 🟢 STEP 8: Update Code & Auto-Redeploy

Setelah setup, workflow menjadi super simple:

### 8.1 Edit Code Lokal

```bash
# Edit file, misal src/app/page.js
nano src/app/page.js
# Atau buka dengan IDE favorit Anda
```

### 8.2 Commit & Push

```bash
# Stage changes
git add .

# Commit
git commit -m "Fix: Update engagement rate calculation"

# Push ke GitHub
git push origin main
```

### 8.3 Vercel Auto Deploy

- Vercel mendeteksi push via webhook
- Auto-trigger build
- Deploy dalam 2-3 menit
- Website updated! 🎉

**Verify di:**
- Production: `https://engagement-analyzer-yourusername.vercel.app`
- Preview (per commit): GitHub commit page → "Environments" → Vercel link

---

## 🔍 Troubleshooting

### ❌ Error: "Repository not found"
**Solution**: 
- Verify GitHub URL dengan `git remote -v`
- Confirm repo name di GitHub (typo?)
- Re-add remote:
  ```bash
  git remote remove origin
  git remote add origin https://github.com/yourusername/engagement-analyzer.git
  git push -u origin main
  ```

### ❌ Build fails: "Module not found"
**Solution**:
- Check `package.json` ada semua dependencies
- Lokal: `npm install` lalu `npm run build`
- Jika lokal bisa build, push ke GitHub, Vercel otomatis rebuild

### ❌ Deployment stuck at "Building"
**Solution**:
- Tunggu 5-10 menit (server sedang busy)
- Refresh page (`F5`)
- Jika masih stuck, klik "Redeploy" button di Vercel dashboard

### ❌ Website 404 atau blank
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Check Vercel build logs (klik deployment → Logs)
- Verify `.next` folder exists after build

---

## ✅ Success Checklist

Jika semua ini ✓, deployment sukses:

- ✅ GitHub repo visible di https://github.com/yourusername/engagement-analyzer
- ✅ Vercel dashboard shows "Deployment Successful"
- ✅ Live URL accessible tanpa 404 error
- ✅ Homepage muncul dengan purple gradient background
- ✅ Bisa input Instagram/TikTok URL dan analyze
- ✅ Dashboard shows engagement metrics & fraud detection

---

## 🎯 Daily Workflow setelah Deploy

```bash
# 1. Edit code lokal
vim src/app/page.js

# 2. Test lokal
npm run dev
# Buka http://localhost:3000

# 3. Commit & push
git add .
git commit -m "Feature: Update fraud detection algorithm"
git push

# 4. Vercel auto-deploy (tunggu 2-3 min)
# 5. Check production: https://engagement-analyzer-yourusername.vercel.app

# Done! 🚀
```

---

## 📚 Useful Vercel Commands & Features

### View Deployment History
```
Vercel Dashboard → Deployments → List semua deployments dengan timestamp
```

### Rollback ke Deployment Sebelumnya
```
Deployments → click older version → click "Promote to Production"
```

### View Build Logs
```
Deployments → click specific deployment → Logs tab
```

### Custom Domain
```
Settings → Domains → Add custom domain → Update DNS records
```

---

## 🎓 Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **RapidAPI**: https://rapidapi.com

---

## 📞 Need Help?

1. Check Vercel build logs (Dashboard → Deployments → Logs)
2. Google error message
3. Check GitHub issues
4. Ask in communities (Reddit, Discord, Stack Overflow)

**Good luck! 🚀 Your app should be live now!**
