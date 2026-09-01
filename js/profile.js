function loginRegisterForm() {
  document.getElementById("profile-slot").innerHTML = `
    <h1>Guest</h1>
    <p class="notice">Belum login. Login atau daftar untuk upload, like, dan komentar.</p>
    <h3>Login</h3>
    <form class="stack" id="login-form">
      <input name="email" type="email" placeholder="Email" required>
      <input name="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <h3>Daftar</h3>
    <form class="stack" id="register-form">
      <input name="username" placeholder="Username" required>
      <input name="email" type="email" placeholder="Email" required>
      <input name="password" type="password" placeholder="Password (min 6 karakter)" required minlength="6">
      <button type="submit">Daftar</button>
    </form>
    <p id="auth-status" class="notice"></p>
  `;

  document.getElementById("login-form").onsubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const { error } = await window.supabase.auth.signInWithPassword({ email: f.email.value, password: f.password.value });
    if (error) document.getElementById("auth-status").textContent = "Gagal login: " + error.message;
    else location.reload();
  };

  document.getElementById("register-form").onsubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const { data, error } = await window.supabase.auth.signUp({ email: f.email.value, password: f.password.value });
    if (error) { document.getElementById("auth-status").textContent = "Gagal daftar: " + error.message; return; }

    if (data.session) {
      await window.supabase.from("profiles").insert({ id: data.user.id, username: f.username.value });
      location.reload();
    } else {
      document.getElementById("auth-status").textContent = "Cek email untuk konfirmasi, lalu login.";
    }
  };
}

async function profileView(user) {
  const { data: uploads } = await window.supabase.from("uploads").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
  document.getElementById("profile-slot").innerHTML = `
    <h1>${user.username}</h1>
    <p class="notice">${user.email}</p>
    <h3>Kode yang kamu upload</h3>
    <div class="grid">
      ${(uploads || []).map(u => `
        <div class="card" onclick="location.href='code.html?src=upload&id=${u.id}'">
          <h3>${u.title}</h3>
          <span class="tag">${u.language}</span>
        </div>
      `).join("") || `<p class="notice">Belum ada upload.</p>`}
    </div>
  `;
}

(async () => {
  const user = await getCurrentUser();
  if (user) profileView(user);
  else loginRegisterForm();
})();
