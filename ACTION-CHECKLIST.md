# 🎯 ACTION CHECKLIST - Deploy Now!

Ini adalah checklist yang harus dikerjakan untuk deploy aplikasi ke Netlify.
**Estimasi waktu: 15 menit**

---

## ✅ Checklist (Lakukan sesuai urutan!)

### Stage 1: Setup Database (5 menit)

- [ ] Login ke https://app.supabase.com
- [ ] Select project: `fuenxjengxezbqnemcjr`
- [ ] Go to **SQL Editor**
- [ ] Click **"New query"**
- [ ] Open `supabase-schema.sql` dari project folder
- [ ] **Copy-paste SELURUH isi** ke SQL Editor
- [ ] Click **"Run"** (atau Ctrl+Enter)
- [ ] ✅ Wait sampai status berubah hijau (selesai tanpa error)

**Expected output:** Tables `profiles`, `uploads`, `likes`, `comments` sudah ada

---

### Stage 2: Git Push (3 menit)

```bash
# Buka terminal di project folder (c:\aura2)
cd c:\aura2

# Check status
git status

# Add semua files
git add .

# Commit
git commit -m "Setup Supabase + Netlify configuration"

# Push ke GitHub
git push origin main
```

- [ ] `git status` executed (check files)
- [ ] `git add .` executed
- [ ] `git commit` executed
- [ ] `git push origin main` executed successfully

**Expected:** All changes pushed ke GitHub repo

---

### Stage 3: Deploy to Netlify (5 menit)

#### Option A: Git Integration (RECOMMENDED)

- [ ] Login ke https://app.netlify.com
- [ ] Click **"Add new site"** > **"Import an existing project"**
- [ ] Select GitHub (authorize jika perlu)
- [ ] Select repository: **aura-dev**
- [ ] Leave build settings default
- [ ] Click **"Deploy site"**
- [ ] Wait ~30 detik sampai deploy selesai

**Result:** Site live di `https://YOUR-SITE-NAME.netlify.app`

#### Option B: Drag & Drop (Cepat untuk testing)

- [ ] Go to https://app.netlify.com
- [ ] Drag-drop folder `c:\aura2` ke area yang diminta
- [ ] Wait sampai upload selesai

**Result:** Site live tapi no auto-update

---

### Stage 4: Environment Variables (2 menit)

**PENTING untuk production!**

- [ ] Di Netlify, go to **"Site settings"** tab
- [ ] Click **"Build & deploy"** > **"Environment"**
- [ ] Click **"Edit variables"**
- [ ] Add variable:
  - **Name:** `SUPABASE_URL`
  - **Value:** `https://fuenxjengxezbqnemcjr.supabase.co`
- [ ] Add variable:
  - **Name:** `SUPABASE_ANON_KEY`
  - **Value:** `sb_publishable_Cvoh-ak6hr1JFMej2SrL-Q_W5GMeOHP`
- [ ] Click **"Save"**
- [ ] Go to **"Deployments"** tab
- [ ] Click **"Trigger deploy"** > **"Deploy site"**

**Result:** Production environment configured ✅

---

### Stage 5: Testing (2 menit)

- [ ] Open site URL: `https://YOUR-SITE.netlify.app`
- [ ] Homepage load dengan data kode? **✅**
- [ ] Try login/signup **✅**
- [ ] Try upload kode **✅**
- [ ] Try like/dislike **✅**
- [ ] Try comment **✅**
- [ ] Check browser console (F12) — no red errors? **✅**

**If error:** Check:
1. Netlify deployment logs (Deployments tab)
2. Browser console (F12 > Console)
3. Supabase logs (Project Dashboard)

---

## 🎉 SUCCESS CRITERIA

Deployment berhasil jika:
```
✅ Site live di *.netlify.app
✅ Homepage load dengan kode lokal
✅ Can login/signup
✅ Can upload kode
✅ Database operations work
✅ No JavaScript errors di console
```

---

## 📝 Notes to Remember

| Item | What | Where |
|------|------|-------|
| Supabase URL | https://fuenxjengxezbqnemcjr.supabase.co | js/supabase-config.js |
| Anon Key | sb_publishable_Cvoh-ak6hr1JFMej2SrL-Q_W5GMeOHP | js/supabase-config.js |
| Database Schema | supabase-schema.sql | Run di Supabase SQL Editor |
| Git Repo | Your GitHub repo | Set as Netlify deploy source |
| Netlify Env Vars | SUPABASE_URL, SUPABASE_ANON_KEY | Set via Netlify dashboard |

---

## 🔗 Quick Links

- **Supabase Dashboard:** https://app.supabase.com
- **Netlify Dashboard:** https://app.netlify.com
- **GitHub Repository:** https://github.com/YOUR-USERNAME/aura-dev
- **Your Site (after deploy):** https://YOUR-SITE.netlify.app

---

## 🆘 Troubleshooting

**Error: "Tables don't exist"**
→ Run supabase-schema.sql di SQL Editor

**Error: "SUPABASE_URL undefined"**
→ Set environment variables di Netlify dashboard

**Error: "CORS error"**
→ Add Netlify domain ke Supabase CORS settings

**Deployment stuck**
→ Check Netlify logs in Deployments tab

**Auth fails**
→ Disable email confirmation di Supabase Authentication > Providers > Email

---

## 📖 More Help?

- `DEPLOYMENT-INSTRUCTIONS.md` — Detailed instructions
- `QUICK-START-NETLIFY.md` — Quick start guide
- `PRODUCTION-CHECKLIST.md` — Full checklist
- `DEPLOYMENT.md` — Complete guide

---

## ✨ Timeline

```
Start → Schema Setup (5 min)
     → Git Push (3 min)
     → Netlify Deploy (5 min)
     → Environment Variables (2 min)
     → Testing (2 min)
     → LIVE! 🚀 (Total: ~15 min)
```

---

**Ready?** Start with **Stage 1** above! 🚀

Printed: 2024-09-02
