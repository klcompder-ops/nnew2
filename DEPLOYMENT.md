# Panduan Deploy ke Netlify

## Prerequisites
- Akun Supabase (https://supabase.com)
- Akun Netlify (https://netlify.com)
- Git repository (GitHub, GitLab, atau Bitbucket)

## Langkah 1: Setup Supabase (Sekali Saja)

### 1.1 Buat Project Supabase
1. Login ke https://supabase.com
2. Klik "New project"
3. Pilih nama project dan region terdekat
4. Tunggu sampai project selesai

### 1.2 Setup Database Schema
1. Buka **SQL Editor** di project Supabase
2. Klik **"New query"**
3. Copy-paste seluruh isi dari file `supabase-schema.sql`
4. Klik **"Run"** (atau tekan Ctrl+Enter)
5. Pastikan tidak ada error — status akan berubah menjadi hijau

### 1.3 Disable Email Confirmation (Opsional, untuk dev)
1. Buka **Authentication > Providers > Email**
2. Matikan "Confirm email" jika ingin signup instant
3. Save

### 1.4 Ambil Credentials
1. Buka **Project Settings > API**
2. Salin:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon public key** (mulai dengan `eyJhbG...`)
3. Simpan untuk step 2

## Langkah 2: Setup di Netlify

### 2.1 Push Repo ke Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/aura-dev.git
git branch -M main
git push -u origin main
```

### 2.2 Connect ke Netlify
1. Login ke https://netlify.com
2. Klik **"Add new site"** > **"Import an existing project"**
3. Pilih Git provider (GitHub/GitLab/Bitbucket)
4. Authorize dan select repository `aura-dev`
5. Leave build settings default (publish directory sudah di `netlify.toml`)
6. Klik **"Deploy site"**

### 2.3 Set Environment Variables di Netlify
1. Buka site settings di Netlify
2. Buka **"Build & deploy"** > **"Environment"**
3. Klik **"Edit variables"**
4. Tambah 2 variables:
   - **SUPABASE_URL** = Project URL dari step 1.4
   - **SUPABASE_ANON_KEY** = anon public key dari step 1.4
5. Save & **redeploy** site

### 2.4 Update File Config
Edit `js/supabase-config.js`:
```javascript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR-ANON-KEY";
```

Atau untuk production di Netlify, bisa langsung hardcode dari environment variables di Netlify:
```javascript
const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## Langkah 3: Setup Admin Account (Local)

Untuk membuat akun admin & user demo:
```bash
npm install
```

Edit `scripts/seed-users.js` dan isi:
- `SUPABASE_URL`
- `SERVICE_ROLE_KEY` (dari Project Settings > API)

Jalankan:
```bash
npm run seed
```

Akun yang dibuat:
- admin@aura-dev.local / admin123
- user@aura-dev.local / user1234

## Langkah 4: Verify Deployment

### Check di Netlify
1. Site akan live di URL seperti `https://YOUR-SITE-NAME.netlify.app`
2. Buka site tersebut
3. Test fitur:
   - Buka halaman "Kode" — pastikan data lokal muncul
   - Coba login dengan akun yang sudah dibuat
   - Coba upload kode, like, komentar

### Troubleshooting
- **"Supabase undefined"**: Pastikan Supabase library sudah di CDN atau bundled
- **CORS Error**: Setup Supabase Project Settings > API > CORS
- **Auth error**: Pastikan SUPABASE_URL dan SUPABASE_ANON_KEY benar

## Langkah 5: Enable Supabase CDN di HTML

Pastikan file HTML menginclude Supabase library. Contoh di `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabase-config.js"></script>
<script src="js/app.js"></script>
```

## Catatan Keamanan

⚠️ **JANGAN pernah commit:**
- `.env` atau `.env.local`
- `SERVICE_ROLE_KEY` di file JS
- Private keys atau passwords

✅ **Selalu gunakan:**
- Netlify environment variables untuk credentials
- `anon public key` saja di client-side code
- Row Level Security (RLS) di Supabase (sudah setup di schema)

## Monitoring & Updates

Setiap kali ada perubahan:
1. Commit ke main branch
2. Netlify auto-deploy (bisanya dalam 30 detik)
3. Check deployment logs di Netlify

Jika perlu update schema:
1. Edit `supabase-schema.sql`
2. Run di SQL Editor Supabase
3. Test di local dulu sebelum push ke prod
