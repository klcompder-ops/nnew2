# 🚀 READY TO DEPLOY - Next Steps

Credentials sudah dikonfigurasi! Berikut ini tahapan deployment ke Netlify:

## ✅ Status Sekarang
- Supabase URL: `https://fuenxjengxezbqnemcjr.supabase.co` ✅
- Supabase Key: Sudah set ✅
- Database schema: Ready untuk di-run ✅
- Verification: PASSED ✅

---

## 📝 Step 1: Setup Database Schema di Supabase (PENTING!)

**Jangan lewatkan step ini!** Schema perlu di-run sekali saja di Supabase.

```bash
1. Login ke https://app.supabase.com
2. Select project "fuenxjengxezbqnemcjr"
3. Go to SQL Editor (sidebar)
4. Click "New query"
5. Copy-paste SELURUH isi file: supabase-schema.sql
6. Click "Run" (atau Ctrl+Enter)
7. Wait sampai status berubah hijau ✅

Jika ada error, balas error message-nya. Biasanya karena tabel sudah ada.
```

**Schema yang di-create:**
- `profiles` table — user data
- `uploads` table — uploaded code
- `likes` table — like/dislike system
- `comments` table — comments
- RLS policies — security rules
- Admin function — `is_admin()`

---

## 🔐 Step 2: Disable Email Confirmation (Optional, untuk testing)

Jika ingin user bisa signup & login instant tanpa email verification:

```bash
1. Di Supabase > Project "fuenxjengxezbqnemcjr"
2. Go to Authentication (sidebar)
3. Click Providers > Email
4. Toggle OFF "Confirm email"
5. Save
```

Ini optional — bisa skip kalau ingin email verification di production.

---

## 🌐 Step 3: Setup Git & Push (Jika belum)

```bash
# Navigate ke project folder
cd c:\aura2

# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Deploy aura-dev to Netlify"

# Push ke GitHub (pastikan sudah punya repo di GitHub)
git remote add origin https://github.com/YOUR-USERNAME/aura-dev.git
git branch -M main
git push -u origin main
```

---

## 🚀 Step 4: Deploy ke Netlify (FINAL!)

### Option A: Drag & Drop (Cepat, tapi no auto-update)
```
1. Go to https://app.netlify.com
2. Drag-drop folder ke area yang diminta
3. Site akan live di URL seperti: https://brave-hopper-abc123.netlify.app
4. TAPI: Tidak auto-update ketika push ke Git
```

### Option B: Git Integration (RECOMMENDED)
```
1. Go to https://app.netlify.com
2. Click "Add new site" > "Import an existing project"
3. Click GitHub (authorize jika perlu)
4. Select repository: aura-dev
5. Leave build settings default (publish = ".")
6. Click "Deploy site"
7. Tunggu ~30 detik
```

**Result:**
- Site akan live di: `https://YOUR-SITE-NAME.netlify.app`
- Auto-deploy on every push to main branch ✅
- Deployment logs tersedia untuk troubleshooting

---

## ⚙️ Step 5: Set Environment Variables di Netlify

**PENTING untuk production!** Ini akan override hardcoded values.

```
1. Di Netlify > Select site
2. Go to "Site settings" tab
3. Go to "Build & deploy" > "Environment"
4. Click "Edit variables"
5. Add 2 variables:

   Name: SUPABASE_URL
   Value: https://fuenxjengxezbqnemcjr.supabase.co
   
   Name: SUPABASE_ANON_KEY
   Value: sb_publishable_Cvoh-ak6hr1JFMej2SrL-Q_W5GMeOHP

6. Click "Save"
7. Go back to "Deployments" tab
8. Click "Trigger deploy" > "Deploy site"
9. Tunggu selesai
```

**Why?** Jadi hardcoded values hanya untuk local testing. Production akan gunakan Netlify env vars.

---

## ✅ Step 6: Test Deployment

Setelah deploy selesai, test fitur:

```bash
1. Open site URL: https://YOUR-SITE-NAME.netlify.app
2. Homepage load dengan data kode? ✅
3. Coba login/signup ✅
4. Coba upload kode ✅
5. Coba like/dislike ✅
6. Coba comment ✅

Jika ada error:
- Open browser console (F12 > Console)
- Look for error messages
- Check Netlify deployment logs
```

---

## 🎯 What Happens Next (Auto-Deploy)

Setelah setup selesai, workflow-nya:

```
1. Make changes locally
   git add .
   git commit -m "Your message"
   git push origin main

2. Netlify detects push → Auto-deploy starts
   
3. Deployment status visible di Netlify dashboard
   
4. Site updated in ~30-60 seconds
   
5. Your users see new version automatically
```

---

## 📱 Setup Demo Accounts (Local Only)

Untuk create admin & user demo accounts:

```bash
# Install dependencies
npm install

# Edit scripts/seed-users.js:
# - Fill SUPABASE_URL (you already have it)
# - Fill SERVICE_ROLE_KEY (from Project Settings > API)
#   ⚠️ JANGAN push SERVICE_ROLE_KEY ke Git!

# Run seed script
npm run seed

# Creates:
# - admin@aura-dev.local / admin123 (admin)
# - user@aura-dev.local / user1234 (user)
```

---

## 🔒 Security Checklist

```
✅ Credentials di supabase-config.js (untuk local dev)
✅ Environment variables di Netlify (untuk production)
✅ .env file di .gitignore (so not committed)
✅ SERVICE_ROLE_KEY tidak di client code
✅ RLS policies enabled di Supabase
✅ CORS configured di Supabase (if needed)
```

---

## 📋 Summary: What You Have Now

```
Local Development:
  - Site berjalan di localhost
  - Config: js/supabase-config.js (hardcoded)
  - Database: Supabase remote

Netlify Production:
  - Site auto-updates on Git push
  - Config: Environment variables di Netlify
  - Database: Same Supabase (shared)
  - URL: *.netlify.app
```

---

## 🆘 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| "Tables not found" | Run supabase-schema.sql in SQL Editor |
| "Auth fails" | Disable email confirmation OR verify email |
| "Supabase undefined" | Check Supabase library link di HTML |
| "Deployment fails" | Check Netlify logs in Deployments tab |
| "Config not loading" | Hard refresh browser (Ctrl+Shift+R) |

---

## 📖 Reference Files

Need more info? Check these:
- `QUICK-START-NETLIFY.md` — Quick guide
- `DEPLOYMENT.md` — Full detailed guide
- `PRODUCTION-CHECKLIST.md` — Pre-flight checks
- `FILES-GUIDE.md` — Overview semua files

---

**Status: ✅ ALL SET FOR DEPLOYMENT!**

Next step: Run schema di Supabase, then deploy to Netlify 🚀

Generated: 2024-09-02
