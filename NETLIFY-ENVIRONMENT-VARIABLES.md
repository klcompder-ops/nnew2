# Netlify Environment Variables Setup

Environment variables yang **WAJIB** ditambahkan di Netlify untuk production deployment.

---

## 📋 Environment Variables yang Dibutuhkan

Hanya **2 variables** yang perlu di-set:

### 1. SUPABASE_URL
```
Name:  SUPABASE_URL
Value: https://fuenxjengxezbqnemcjr.supabase.co
```
**Deskripsi:** URL endpoint Supabase project Anda

### 2. SUPABASE_ANON_KEY
```
Name:  SUPABASE_ANON_KEY
Value: sb_publishable_Cvoh-ak6hr1JFMej2SrL-Q_W5GMeOHP
```
**Deskripsi:** Public/Anonymous key untuk client-side authentication

---

## ✅ Cara Set di Netlify

**Step-by-step:**

1. **Login ke Netlify**
   - Go to https://app.netlify.com
   - Select site Anda (nnew2)

2. **Buka Site Settings**
   - Click tab **"Site settings"**

3. **Buka Build & Deploy**
   - Left sidebar > **"Build & deploy"**
   - Click **"Environment"**

4. **Edit Variables**
   - Click **"Edit variables"**

5. **Add Variable 1 (SUPABASE_URL)**
   - Click **"Add a variable"** atau **"New variable"**
   - **Name:** `SUPABASE_URL`
   - **Value:** `https://fuenxjengxezbqnemcjr.supabase.co`
   - Click **"Save"**

6. **Add Variable 2 (SUPABASE_ANON_KEY)**
   - Click **"Add a variable"** lagi
   - **Name:** `SUPABASE_ANON_KEY`
   - **Value:** `sb_publishable_Cvoh-ak6hr1JFMej2SrL-Q_W5GMeOHP`
   - Click **"Save"**

7. **Trigger Redeploy**
   - Go back ke **"Deployments"** tab
   - Click **"Trigger deploy"** > **"Deploy site"**
   - Wait ~30 detik

---

## 🔍 Verify Environment Variables

Setelah set, Netlify akan inject variables ke app Anda. Untuk verify:

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Ketik:** `SUPABASE_URL` dan `SUPABASE_ANON_KEY`
4. Pastikan values muncul correctly

Atau check di Network tab → inspect requests ke Supabase.

---

## 📝 Catatan Penting

### ✅ Safe to Use
- **SUPABASE_ANON_KEY** adalah **public key** — boleh di-expose
- Ini hanya untuk client-side authentication (browser)
- Tidak ada security risk karena RLS policies di-enable di Supabase

### ❌ JANGAN Add
- **SERVICE_ROLE_KEY** — ini adalah admin key, jangan pernah di-Netlify/client
- Private credentials
- Database password

### 🔄 Local vs Production
```
Local Development (js/supabase-config.js):
- SUPABASE_URL = "https://fuenxjengxezbqnemcjr.supabase.co"
- SUPABASE_ANON_KEY = "sb_publishable_Cvoh-ak6hr1JFMej2SrL-Q_W5GMeOHP"

Netlify Production:
- SUPABASE_URL = (dari Netlify env var)
- SUPABASE_ANON_KEY = (dari Netlify env var)

app menggunakan values dari Netlify env var jika available,
fallback ke hardcoded jika tidak.
```

---

## 📊 Summary

| Variable | Value | Purpose |
|----------|-------|---------|
| SUPABASE_URL | https://fuenxjengxezbqnemcjr.supabase.co | Database endpoint |
| SUPABASE_ANON_KEY | sb_publishable_Cvoh-ak6hr1JFMej2SrL-Q_W5GMeOHP | Public authentication key |

**Total: 2 variables** — Simple & secure! ✅

---

## ✅ Checklist

- [ ] Login ke Netlify sebagai klcompder-ops
- [ ] Select site: nnew2
- [ ] Go to Site settings > Build & deploy > Environment
- [ ] Add SUPABASE_URL dengan value yang benar
- [ ] Add SUPABASE_ANON_KEY dengan value yang benar
- [ ] Click Save
- [ ] Go to Deployments tab
- [ ] Trigger deploy
- [ ] Wait 30 detik
- [ ] Open site URL
- [ ] Test login/upload/like/comment
- [ ] All working? ✅ DONE!

---

**Ready?** Set 2 variables di Netlify dan trigger deploy! 🚀
