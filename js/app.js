// Shared across all pages: current user + navbar.

async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return { ...user, username: profile?.username || "Guest", is_admin: !!profile?.is_admin };
}

async function renderNavbar() {
  const user = await getCurrentUser();
  const slot = document.getElementById("nav-user");
  if (!slot) return;
  if (user) {
    slot.innerHTML = `<a href="profile.html">${user.username}${user.is_admin ? " (admin)" : ""}</a> <button id="logout-btn">Logout</button>`;
    document.getElementById("logout-btn").onclick = async () => {
      await supabase.auth.signOut();
      location.reload();
    };
  } else {
    slot.innerHTML = `<a href="profile.html">Guest (Login)</a>`;
  }
}

document.addEventListener("DOMContentLoaded", renderNavbar);
