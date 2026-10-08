/* ===== Programación II — app.js ===== */
document.addEventListener("DOMContentLoaded", () => {

  /* ---- Tema claro / oscuro ---- */
  const themeBtn = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "light") document.body.classList.add("light");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  });
  themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";

  /* ---- Menú móvil ---- */
  const menuBtn = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
  document.querySelectorAll("#nav a").forEach(a =>
    a.addEventListener("click", () => sidebar.classList.remove("open"))
  );

  /* ---- Botones de copiar código ---- */
  document.querySelectorAll(".copy").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.closest(".codeblock").querySelector("code").innerText;
      navigator.clipboard.writeText(code).then(() => {
        const old = btn.textContent;
        btn.textContent = "✔ ¡Copiado!";
        setTimeout(() => (btn.textContent = old), 1600);
      });
    });
  });

  /* ---- Búsqueda ---- */
  const searchInput = document.getElementById("search");
  const noResults = document.getElementById("no-results");
  const topics = Array.from(document.querySelectorAll(".topic"));
  const navLinks = Array.from(document.querySelectorAll("#nav a"));

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    let visible = 0;
    topics.forEach(t => {
      const hay = t.textContent.toLowerCase();
      const match = !q || hay.includes(q);
      t.style.display = match ? "" : "none";
      if (match) visible++;
    });
    // Ocultar enlaces del menú cuyo tema quedó oculto
    navLinks.forEach(a => {
      const target = document.querySelector(a.getAttribute("href"));
      a.style.display = target && target.style.display !== "none" ? "" : "none";
    });
    noResults.style.display = visible === 0 ? "block" : "none";
  });

  /* ---- Resaltar sección activa en el menú ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-15% 0px -70% 0px" });
  topics.forEach(t => observer.observe(t));
});
