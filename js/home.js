let mode = "newest"; // newest | popular | rated

async function loadLocal() {
  const res = await fetch("data/local-scripts.json");
  return (await res.json()).map(s => ({ ...s, source: "local" }));
}

async function loadUploads() {
  const { data } = await window.supabase.from("uploads").select("*").order("created_at", { ascending: false });
  return (data || []).map(u => ({ ...u, source: "upload" }));
}

function setStatus(msg) {
  document.getElementById("status").textContent = msg || "";
}

async function attachScores(items) {
  const ids = items.map(i => i.id);
  if (!ids.length) return items;
  const { data } = await window.supabase.from("likes").select("script_id, value").in("script_id", ids);
  const score = {}, total = {};
  (data || []).forEach(r => {
    score[r.script_id] = (score[r.script_id] || 0) + r.value;
    total[r.script_id] = (total[r.script_id] || 0) + 1;
  });
  return items.map(i => ({ ...i, rating: score[i.id] || 0, votes: total[i.id] || 0 }));
}

async function loadItems() {
  setStatus("Memuat...");
  let items = [...(await loadLocal()), ...(await loadUploads())];

  const q = document.getElementById("search-input").value.trim().toLowerCase();
  if (q) items = items.filter(i => i.title.toLowerCase().includes(q));

  const lang = document.getElementById("filter-language").value;
  if (lang) items = items.filter(i => i.language === lang);

  if (mode === "popular" || mode === "rated") {
    items = await attachScores(items);
    if (mode === "popular") items.sort((a, b) => b.votes - a.votes);
    else items.sort((a, b) => b.rating - a.rating);
  }

  render(items);
  setStatus(items.length ? "" : "Tidak ada kode ditemukan.");
}

function render(items) {
  const grid = document.getElementById("script-grid");
  grid.innerHTML = items.map(i => `
    <div class="card" onclick="location.href='code.html?src=${i.source}&id=${encodeURIComponent(i.id)}'">
      <h3>${escapeHtml(i.title)}</h3>
      <div class="meta">${escapeHtml(i.game || "")}</div>
      <span class="tag">${i.language}</span>
    </div>
  `).join("");
}

function escapeHtml(s) {
  return (s || "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function setMode(m) {
  mode = m;
  document.querySelectorAll(".toolbar button").forEach(b => b.classList.remove("active"));
  document.getElementById(`filter-${m}`).classList.add("active");
  loadItems();
}

document.getElementById("filter-newest").onclick = () => setMode("newest");
document.getElementById("filter-popular").onclick = () => setMode("popular");
document.getElementById("filter-rated").onclick = () => setMode("rated");
document.getElementById("filter-language").onchange = loadItems;
let searchTimer;
document.getElementById("search-input").oninput = () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(loadItems, 400);
};

loadItems();
