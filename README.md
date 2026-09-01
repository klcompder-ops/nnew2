# aura-dev

Situs share kode Roblox — kode default lokal + kode upload user, like/dislike, komentar, admin moderation.

## 🚀 Quick Deploy ke Netlify

**Baru pertama kali?** Lihat: [QUICK-START-NETLIFY.md](QUICK-START-NETLIFY.md) (10 menit)

**Butuh guide lengkap?** Lihat: [DEPLOYMENT.md](DEPLOYMENT.md)

## Setup Lengkap

### 1. Setup Supabase
1. Buat project baru di https://supabase.com
2. Buka SQL Editor, paste isi `supabase-schema.sql`, run.
3. Buka Authentication > Settings, matikan "Confirm email" supaya signup langsung bisa login.
4. Buka Project Settings > API, salin `Project URL` dan `anon public key` ke `js/supabase-config.js`.

### 2. Bikin 2 akun siap pakai (1 admin, 1 user biasa)
```
npm install
```
Isi `SUPABASE_URL` dan `SERVICE_ROLE_KEY` (Project Settings > API > service_role — jangan pernah taruh ini di kode client) di `scripts/seed-users.js`, lalu:
```
npm run seed
```
Hasilnya:
- `admin@aura-dev.local` / `admin123` — admin
- `user@aura-dev.local` / `user1234` — user biasa

### 3. Jalankan di local
Situs ini full static, buka pakai server statis apa saja, contoh:
```
npx serve .
```
atau ekstensi "Live Server" di VS Code.

### 4. Deploy ke Netlify
Lihat [QUICK-START-NETLIFY.md](QUICK-START-NETLIFY.md) untuk deploy dalam 10 menit.

Atau manual: Drag-drop folder ini ke Netlify, atau hubungkan repo Git-nya. `netlify.toml` sudah set publish root.

## Fitur admin
Akun dengan `is_admin = true` di tabel `profiles` bisa edit/hapus kode upload siapa saja dan edit/hapus komentar siapa saja (tombol Edit/Hapus muncul otomatis di halaman detail kode saat login sebagai admin).

## Catatan
- Filter "Bahasa" cuma berlaku untuk kode lokal & upload (pilihan Lua/Luau saat upload).
- "Populer" = diurutkan dari total like+dislike (paling ramai). "Rating Tertinggi" = diurutkan dari like dikurangi dislike.
- Kode default (`data/local-scripts.json`) itu file statis, admin tidak bisa edit/hapus lewat UI — edit file-nya langsung kalau perlu.

## Utility Scripts

### Verify Deployment
Sebelum push ke production:
```bash
npm run verify
```

### Run Seed Script
Setup demo users di Supabase:
```bash
npm run seed
```

## Documentation Files
- `DEPLOYMENT.md` — Guide lengkap setup + deployment
- `QUICK-START-NETLIFY.md` — Quick guide 10 menit
- `supabase-schema.sql` — Database schema (run di Supabase SQL Editor)
- `.env.example` — Environment variables template
