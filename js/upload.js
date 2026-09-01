(async () => {
  const user = await getCurrentUser();
  const slot = document.getElementById("upload-slot");

  if (!user) {
    slot.innerHTML = `<p class="notice"><a href="profile.html">Login</a> dulu untuk upload kode.</p>`;
    return;
  }

  slot.innerHTML = `
    <form class="stack" id="upload-form">
      <input name="title" placeholder="Judul kode" required>
      <input name="game" placeholder="Nama game (opsional)">
      <select name="language">
        <option value="Luau">Luau</option>
        <option value="Lua">Lua</option>
      </select>
      <textarea name="description" placeholder="Deskripsi singkat" rows="3"></textarea>
      <textarea name="code" placeholder="Kode Roblox..." rows="10" required></textarea>
      <button type="submit">Upload</button>
    </form>
    <p id="upload-status" class="notice"></p>
  `;

  document.getElementById("upload-form").onsubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const { data, error } = await supabase.from("uploads").insert({
      user_id: user.id,
      title: f.title.value,
      game: f.game.value,
      language: f.language.value,
      description: f.description.value,
      code: f.code.value,
    }).select().single();

    if (error) { document.getElementById("upload-status").textContent = "Gagal: " + error.message; return; }
    location.href = `code.html?src=upload&id=${data.id}`;
  };
})();
