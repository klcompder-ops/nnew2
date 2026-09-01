# Quick Start: Deploy to Netlify

**Estimasi waktu: 10 menit**

## Step 1: Prepare Supabase (5 menit)

```bash
# 1. Login to https://supabase.com
# 2. Create new project
# 3. Di SQL Editor, paste dan run semua isi dari: supabase-schema.sql
# 4. Di Project Settings > API, salin:
#    - Project URL (contoh: https://xxxxx.supabase.co)
#    - anon public key (key yang panjang)
```

Simpan 2 nilai ini untuk step 3.

## Step 2: Prepare Git Repository (3 menit)

```bash
cd ~/your-project-folder

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - aura-dev Supabase app"

# Push ke GitHub (create repo di github.com terlebih dahulu)
git remote add origin https://github.com/YOUR-USERNAME/aura-dev.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Netlify (2 menit)

**Option A: Simple Drag & Drop** (untuk testing cepat)
1. Go to https://app.netlify.com
2. Drag-drop folder ke area yang diminta
3. Site akan live tapi tanpa auto-update dari Git

**Option B: Git Integration** (recommended)
1. Go to https://app.netlify.com
2. Click "Add new site" > "Import an existing project"
3. Select GitHub (authorize jika perlu)
4. Select repo `aura-dev`
5. Deploy

## Step 4: Set Environment Variables (hanya 2 variable!)

Di Netlify dashboard site Anda:
1. Go to **Site settings** tab
2. Go to **Build & deploy** > **Environment**
3. Click **Edit variables**
4. Add 2 variables:

```
SUPABASE_URL = https://xxxxx.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIs...
```

5. Click **Save**
6. Go back ke **Deployments** tab
7. Click **Trigger deploy** > **Deploy site**

## Step 5: Verify It Works!

Wait ~30 detik untuk deploy selesai.

```bash
# Cek di browser:
1. Buka https://YOUR-NETLIFY-SITE.netlify.app
2. Halaman "Kode" muncul dengan data lokal? ✅
3. Coba login? (buat akun atau gunakan: admin@aura-dev.local / admin123)
4. Coba upload kode? ✅
5. Coba like/dislike? ✅
6. Coba komentar? ✅
```

Jika ada error, lihat:
- Netlify deploy logs: **Deployments** > Click status
- Browser console: F12 > Console tab

## Troubleshooting

### "window.supabase is undefined"
✅ **Fix**: Supabase library link sudah ada di HTML. Tunggu 1 menit, refresh, coba lagi.

### "CORS error from Supabase"
✅ **Fix**: Di Supabase Project Settings > API, pastikan Netlify domain di CORS list. Add jika perlu:
```
https://YOUR-NETLIFY-SITE.netlify.app
```

### "Connection refused" / "Network error"
✅ **Fix**: 
1. Verifikasi SUPABASE_URL dan SUPABASE_ANON_KEY di Netlify env var
2. Refresh browser (hard refresh: Ctrl+Shift+R)
3. Check Netlify function logs

### Deployment tidak update setelah push
✅ **Fix**: 
1. Check Netlify Deployments tab untuk status
2. Biasanya auto-deploy dalam 30 detik
3. Jika lambat, trigger manual: **Deployments** > **Trigger deploy**

## Next Steps

### Setup Admin + Demo Users

```bash
npm install
# Edit scripts/seed-users.js dengan:
# - SUPABASE_URL
# - SERVICE_ROLE_KEY (dari Project Settings > API)

npm run seed
```

Akun yg dibuat:
- admin@aura-dev.local / admin123 → Admin
- user@aura-dev.local / user1234 → Regular user

### Update Code

```bash
# Make changes locally
git add .
git commit -m "Your message"
git push origin main

# Netlify akan auto-deploy dalam 30 detik
```

## Useful Links

- **Netlify Dashboard**: https://app.netlify.com
- **Supabase Dashboard**: https://app.supabase.com
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Schema File**: `supabase-schema.sql`

---

**Questions?** Check `DEPLOYMENT.md` untuk guide lengkap atau lihat error messages di browser console.
