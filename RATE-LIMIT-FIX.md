# 🔐 Fix Rate Limit untuk Register

**Masalah:** Saat register dari ponsel dengan wifi yang sama, ponsel ke-2 kena rate limit dan tidak bisa register user baru.

---

## 📍 Solusi: Configure di Supabase Dashboard

### **Langkah 1: Buka Supabase Dashboard**
1. Kunjungi: https://supabase.com/dashboard
2. Pilih Project: **fuenxjengxezbqnemcjr**

### **Langkah 2: Masuk ke Auth Settings**
1. Di sidebar kiri → **Authentication** → **Policies**
2. Pilih tab **Email** atau **Password**

### **Langkah 3: Kurangi Rate Limit**

Cari opsi:
- **Email signup rate limit** (default: ketat sekali)
- **IP-based rate limiting** (bisa disable untuk testing)

**Opsi Rekomendasi:**

#### ✅ **Untuk Production (Keamanan + User Friendly):**
```
- Signup per email: 5 attempts / hour
- Signup per IP: 20 attempts / hour
- Disable email verification (opsional, tapi recommend)
```

#### ⚡ **Untuk Testing (Permissive):**
```
- Signup rate limit: NONE (disable semua)
- Atau set ke maksimal angka (999 attempts/hour)
```

---

## 🔧 **Jika Supabase Dashboard tidak ada opsi:**

Gunakan **SQL di SQL Editor**:

```sql
-- Cek rate limiting config
SELECT * FROM auth.audit_log_entries LIMIT 10;

-- Disable rate limiting untuk testing (HANYA untuk testing!)
-- Ini memerlukan SQL yang custom sesuai Supabase version
```

---

## 📱 **Temporary Fix untuk Sekarang:**

### **Opsi A: Gunakan Email Berbeda per Ponsel**
```
Ponsel 1: user1@gmail.com
Ponsel 2: user2@gmail.com
```

### **Opsi B: Tunggu 1 Jam**
Rate limit biasanya reset setiap jam.

### **Opsi C: Gunakan VPN**
Setiap VPN/IP beda akan punya rate limit terpisah.

---

## ✅ **Verifikasi Fix Berhasil:**

Setelah ubah settings, test di 2 ponsel:
1. **Ponsel 1:** Register → ✅ Sukses
2. **Ponsel 2:** Register → ✅ Harus Sukses (sebelumnya error)

---

## 🆘 **Jika Masih Error:**

1. Cek di Supabase Dashboard → **Project Settings** → **API**
   - Lihat `anon` key, pastikan tidak ada rate limit custom
2. Buka **Browser DevTools** (F12) → **Console**
   - Cari error message yang detail
3. Hubungi Supabase Support jika masalah berlanjut

---

## 💡 **Best Practice:**

- **Development:** Disable rate limit (testing lebih lancar)
- **Production:** Enable rate limit (proteksi dari abuse)
- **Mobile users:** Gunakan IP-based limit, bukan email-based
