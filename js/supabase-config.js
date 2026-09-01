/**
 * Supabase Configuration
 * 
 * SETUP:
 * 1. Local development: Edit nilai di bawah atau set di .env
 * 2. Netlify deployment: Set via Netlify dashboard > Site settings > Build & deploy > Environment
 * 
 * Sumber: Supabase Dashboard > Project Settings > API
 */

// Try to get from environment first (untuk Netlify), fallback ke default
const SUPABASE_URL = window.SUPABASE_URL || "https://fuenxjengxezbqnemcjr.supabase.co";
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "sb_publishable_Cvoh-ak6hr1JFMej2SrL-Q_W5GMeOHP";

// Validate configuration
if (SUPABASE_URL.includes("YOUR-PROJECT") || SUPABASE_ANON_KEY.includes("YOUR-ANON-KEY")) {
  console.warn(
    "⚠️ Supabase belum dikonfigurasi!\n" +
    "Edit js/supabase-config.js atau set environment variables.\n" +
    "Lihat DEPLOYMENT.md untuk petunjuk."
  );
}

// Initialize Supabase client
// Pastikan Supabase library sudah diload di HTML sebelum script ini
if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
  // CDN already loaded Supabase, override the default export with our instance
  window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.error("❌ Supabase library tidak ditemukan. Pastikan @supabase/supabase-js@2 sudah di-include di HTML");
}
