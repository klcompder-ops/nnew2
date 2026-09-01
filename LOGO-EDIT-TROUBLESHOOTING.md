# Editing Logo & Troubleshooting Items Not Showing

Panduan lengkap untuk edit logo dan fix bug items code tidak muncul.

---

## 1️⃣ EDIT LOGO WEBSITE

Logo sekarang adalah **SVG inline** di semua HTML files. Ada 2 cara untuk edit:

### ✅ CARA 1: Edit SVG Direct (Recommended untuk perubahan cepat)

**Lokasi:** Setiap HTML file memiliki logo, contoh di `index.html`:

```html
<a class="logo" href="index.html">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#3b82f6"/>
    <path d="M8 12l3 3 5-6" stroke="#0b1220" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  aura-dev
</a>
```

**Untuk Edit:**

1. **File yang perlu diedit:**
   - `index.html` (line 10-12)
   - `code.html` (line 10-12)
   - `profile.html` (line 10-12)
   - `upload.html` (line 10-12)

2. **Edit SVG:**
   - Ubah warna: `fill="#3b82f6"` → ubah hex code
   - Ubah bentuk: Edit `<circle>` atau `<path>` 
   - Ubah ukuran: Ubah `width="28"` dan `height="28"`

**Contoh: Ubah warna dari biru menjadi merah**
```html
<circle cx="12" cy="12" r="10" fill="#ef4444"/>
```

**Contoh: Ubah bentuk ke logo text sederhana**
```html
<text x="12" y="14" text-anchor="middle" font-size="16" font-weight="bold" fill="#3b82f6">A</text>
```

---

### ✅ CARA 2: Ganti dengan Gambar PNG (Recommended untuk logo kompleks)

**Step 1: Siapkan file gambar**
- Buat logo.png (rekomendasi: 256x256 px, background transparent)
- Letakkan di folder `assets/logo.png`

**Step 2: Edit HTML untuk setiap file**

Ganti dari:
```html
<a class="logo" href="index.html">
  <svg width="28" height="28" ...></svg>
  aura-dev
</a>
```

Menjadi:
```html
<a class="logo" href="index.html">
  <img src="assets/logo.png" alt="aura-dev logo" style="width: 28px; height: 28px; object-fit: contain;">
  aura-dev
</a>
```

**Step 3: Edit di semua 4 HTML files:**
- `index.html`
- `code.html`
- `profile.html`
- `upload.html`

---

## 2️⃣ FIX BUG: ITEMS CODE TIDAK MUNCUL

Jika items/code tidak muncul di homepage, ikuti troubleshooting ini:

### 🔍 Step 1: Check Browser Console

1. **Buka site di browser**
2. Press **F12** (DevTools)
3. Go to **Console** tab
4. Cari ada error merah?

**Common errors:**
```
❌ "Supabase library tidak ditemukan"
→ FIX: Pastikan Supabase CDN di-include di HTML

❌ "Cannot read property 'from'"
→ FIX: Supabase client tidak initialized

❌ "Failed to fetch data/local-scripts.json"
→ FIX: File tidak ada atau path salah
```

---

### 🔍 Step 2: Verify Local Data File

Check bahwa file `data/local-scripts.json` ada dan berisi data:

```bash
# Lihat file ada?
ls data/local-scripts.json

# Lihat isinya
cat data/local-scripts.json
```

**Harus ada struktur seperti:**
```json
[
  {
    "id": "local-1",
    "title": "Script Name",
    "game": "Game Name",
    "language": "Luau",
    "description": "...",
    "code": "..."
  }
]
```

---

### 🔍 Step 3: Check Supabase Connection

1. **Di browser console, ketik:**
```javascript
console.log(supabase)
```

**Expected:** Akan print object Supabase

**If undefined:** Berarti Supabase library atau config tidak load.

2. **Verify credentials di config:**
```bash
# Check file
cat js/supabase-config.js
```

Harus ada:
```javascript
const SUPABASE_URL = "https://fuenxjengxezbqnemcjr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_...";
```

---

### 🔍 Step 4: Check HTML Files Include Supabase

Setiap HTML harus include Supabase library **SEBELUM** app.js:

```html
<!-- Harus ada ini SEBELUM app.js -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabase-config.js"></script>
<script src="js/app.js"></script>
```

**Order penting!**
1. ✅ Supabase CDN (library)
2. ✅ supabase-config.js (credentials & init)
3. ✅ app.js (app code)
4. ✅ page-specific.js (home.js, code.js, etc)

---

### 🔍 Step 5: Check Network Requests

1. **Di DevTools, go to Network tab**
2. **Refresh halaman**
3. **Lihat ada request ke:**
   - `data/local-scripts.json` → status 200? ✅
   - Supabase API → status 200? ✅
   - CDN Supabase library → status 200? ✅

Jika ada error (404, 500), itu penyebab items tidak muncul.

---

### 🔍 Step 6: Check CSS Display

Mungkin items muncul tapi tidak terlihat. Check di CSS:

```bash
# Buka css/style.css dan cari:
grep -i "script-grid\|card\|display" css/style.css
```

Pastikan:
- `.script-grid` ada dan tidak `display: none`
- `.card` ada dan styling benar

---

## ✅ Checklist Troubleshooting

### Untuk Local Development:
```
☐ Browser console - no red errors?
☐ data/local-scripts.json - file exists?
☐ Supabase config - credentials filled?
☐ Supabase library - di-include di HTML?
☐ Order of scripts - CDN → config → app → page?
☐ Network tab - requests returning 200?
☐ CSS - script-grid visible?
☐ Refresh browser - Ctrl+Shift+R hard refresh?
```

### Untuk Netlify Deployment:
```
☐ data/local-scripts.json - di-push ke GitHub?
☐ Environment variables - SUPABASE_URL & SUPABASE_ANON_KEY set?
☐ Netlify build - deploy successful?
☐ Browser console (F12) - no errors?
☐ Network tab (F12) - requests to Supabase successful?
```

---

## 🐛 Common Issues & Fixes

| Problem | Cause | Fix |
|---------|-------|-----|
| "No code found" muncul | No data di JSON atau Supabase | Check file & Supabase |
| Blank page | Supabase undefined | Check Supabase CDN link |
| Cards tidak terlihat | CSS display: none | Check css/style.css |
| Items hanya lokal | Supabase not connected | Check credentials & RLS |
| Logo disappear | SVG/image broken | Verify file path & format |

---

## 📁 File Locations

```
c:\aura2\
├── index.html           (Logo di line 10-12)
├── code.html            (Logo di line 10-12)
├── profile.html         (Logo di line 10-12)
├── upload.html          (Logo di line 10-12)
├── css/
│   └── style.css        (Logo styling)
├── data/
│   └── local-scripts.json (Local items data)
├── js/
│   ├── app.js           (Navbar render)
│   ├── home.js          (Items loading & render)
│   ├── supabase-config.js (Supabase init)
│   └── ...
└── assets/
    └── logo.png         (If using image)
```

---

## 🚀 Quick Fixes

**Cepat fix tanpa edit:**
1. Hard refresh browser: **Ctrl+Shift+R**
2. Clear browser cache: **Ctrl+Shift+Delete**
3. Check DevTools Console: **F12**

**Cepat fix dengan edit:**
1. Edit SVG color di HTML files (5 menit)
2. Atau add PNG gambar di assets/ (10 menit)

---

**Need help?** Check:
- `DEPLOYMENT-INSTRUCTIONS.md` — for deployment issues
- `NETLIFY-ENVIRONMENT-VARIABLES.md` — for env vars
- Browser Console (F12) — for error messages

**Ready?** Pick option 1 (edit SVG) atau option 2 (add PNG image) untuk edit logo! 🎨
