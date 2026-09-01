const params = new URLSearchParams(location.search);
const src = params.get("src");
const id = params.get("id");
let currentUser = null;
let currentItem = null;

async function loadScript() {
  let item;
  if (src === "local") {
    const list = await (await fetch("data/local-scripts.json")).json();
    item = list.find(s => s.id === id);
  } else if (src === "upload") {
    const { data } = await window.supabase.from("uploads").select("*").eq("id", id).single();
    item = data;
  }

  currentItem = item;
  if (!item) {
    document.getElementById("title").textContent = "Kode tidak ditemukan";
    return;
  }
  document.getElementById("title").textContent = item.title;
  document.getElementById("meta").textContent = item.game || "";
  document.getElementById("description").textContent = item.description || "";
  document.getElementById("code-block").textContent = item.code || "";
}

function canManageUpload() {
  return src === "upload" && currentUser && currentItem &&
    (currentUser.id === currentItem.user_id || currentUser.is_admin);
}

function renderOwnerActions() {
  const slot = document.getElementById("owner-actions");
  if (!canManageUpload()) { slot.innerHTML = ""; return; }
  slot.innerHTML = `<button id="edit-btn">Edit Kode</button> <button id="delete-btn">Hapus Kode</button>`;

  document.getElementById("edit-btn").onclick = async () => {
    const title = prompt("Judul:", currentItem.title);
    if (title === null) return;
    const code = prompt("Kode:", currentItem.code);
    if (code === null) return;
    await window.supabase.from("uploads").update({ title, code }).eq("id", id);
    loadScript();
  };

  document.getElementById("delete-btn").onclick = async () => {
    if (!confirm("Hapus kode ini?")) return;
    await window.supabase.from("uploads").delete().eq("id", id);
    location.href = "index.html";
  };
}

async function loadVotes() {
  const { data } = await window.supabase.from("likes").select("value").eq("script_source", src).eq("script_id", id);
  const likes = (data || []).filter(r => r.value === 1).length;
  const dislikes = (data || []).filter(r => r.value === -1).length;
  document.getElementById("like-count").textContent = likes;
  document.getElementById("dislike-count").textContent = dislikes;

  if (currentUser) {
    const { data: mine } = await window.supabase.from("likes").select("value")
      .eq("script_source", src).eq("script_id", id).eq("user_id", currentUser.id).maybeSingle();
    document.getElementById("like-btn").classList.toggle("liked", mine?.value === 1);
    document.getElementById("dislike-btn").classList.toggle("disliked", mine?.value === -1);
  }
}

async function vote(value) {
  if (!currentUser) { alert("Login dulu untuk vote."); location.href = "profile.html"; return; }
  await window.supabase.from("likes").upsert(
    { script_source: src, script_id: id, user_id: currentUser.id, value },
    { onConflict: "script_source,script_id,user_id" }
  );
  loadVotes();
}

async function loadComments() {
  const { data } = await window.supabase.from("comments").select("*, profiles(username)")
    .eq("script_source", src).eq("script_id", id).order("created_at");

  document.getElementById("comments").innerHTML = (data || []).map(c => {
    const canManage = currentUser && (currentUser.id === c.user_id || currentUser.is_admin);
    return `
      <div class="comment">
        <div class="author">${c.profiles?.username || "Guest"}</div>
        <div>${(c.content || "").replace(/</g, "&lt;")}</div>
        ${canManage ? `<button class="edit-comment" data-id="${c.id}" data-content="${encodeURIComponent(c.content)}">Edit</button>
          <button class="delete-comment" data-id="${c.id}">Hapus</button>` : ""}
      </div>
    `;
  }).join("") || `<p class="notice">Belum ada komentar.</p>`;

  document.querySelectorAll(".delete-comment").forEach(b => b.onclick = async () => {
    await window.supabase.from("comments").delete().eq("id", b.dataset.id);
    loadComments();
  });
  document.querySelectorAll(".edit-comment").forEach(b => b.onclick = async () => {
    const content = prompt("Edit komentar:", decodeURIComponent(b.dataset.content));
    if (content === null) return;
    await window.supabase.from("comments").update({ content }).eq("id", b.dataset.id);
    loadComments();
  });
}

function renderCommentForm() {
  const slot = document.getElementById("comment-form-slot");
  if (!currentUser) {
    slot.innerHTML = `<p class="notice"><a href="profile.html">Login</a> untuk berkomentar.</p>`;
    return;
  }
  slot.innerHTML = `<form class="stack" id="comment-form">
    <textarea name="content" placeholder="Tulis komentar..." required></textarea>
    <button type="submit">Kirim</button>
  </form>`;
  document.getElementById("comment-form").onsubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value.trim();
    if (!content) return;
    await window.supabase.from("comments").insert({ script_source: src, script_id: id, user_id: currentUser.id, content });
    e.target.content.value = "";
    loadComments();
  };
}

document.getElementById("like-btn").onclick = () => vote(1);
document.getElementById("dislike-btn").onclick = () => vote(-1);

(async () => {
  currentUser = await getCurrentUser();
  await loadScript();
  renderOwnerActions();
  await loadVotes();
  renderCommentForm();
  await loadComments();
})();
