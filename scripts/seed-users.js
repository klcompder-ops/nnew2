// Sekali jalan untuk bikin 2 akun siap pakai. Butuh service_role key
// (Project Settings > API > service_role) — JANGAN taruh key ini di kode client.
// Run: node scripts/seed-users.js

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SERVICE_ROLE_KEY = "YOUR-SERVICE-ROLE-KEY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const users = [
  { email: "admin@aura-dev.local", password: "admin123", username: "admin", is_admin: true },
  { email: "user@aura-dev.local", password: "user1234", username: "demo_user", is_admin: false },
];

(async () => {
  for (const u of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
    });
    if (error) { console.error(`Gagal buat ${u.email}:`, error.message); continue; }

    await supabase.from("profiles").insert({ id: data.user.id, username: u.username, is_admin: u.is_admin });
    console.log(`OK: ${u.email} / ${u.password} (${u.is_admin ? "admin" : "user"})`);
  }
})();
