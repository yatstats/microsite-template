// assets/js/layout.js

async function injectPartial(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const res = await fetch(filePath);
  const html = await res.text();
  container.innerHTML = html;
}

// Load header & footer
injectPartial("site-header", "/partials/header.html");
injectPartial("site-footer", "/partials/footer.html");

// Basic nav (will become dynamic later)
const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "team", label: "Current Team", path: "/team" },
  { id: "alumni", label: "All-Time List", path: "/alumni" },
  { id: "news", label: "Alumni News", path: "/news" },
  { id: "marketplace", label: "Marketplace", path: "/marketplace" },
  { id: "partners", label: "Partner Program", path: "/partners" },
  { id: "faq", label: "FAQ", path: "/faq" }
];

function renderNav() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;

  nav.innerHTML = navItems
    .map(item => `<a href="${item.path}" data-page="${item.id}">${item.label}</a>`)
    .join("");
}

renderNav();

