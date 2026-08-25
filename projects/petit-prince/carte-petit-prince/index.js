// --- État + persistance ---
const state = {
  theme: localStorage.getItem("lpp_theme") || "Roi",
  lastModule: localStorage.getItem("lpp_last") || "",
};

// --- Thème ---
function applyTheme(name) {
  document.body.className = "";
  document.body.classList.add("theme-" + name);
  const sel = document.getElementById("themeSel");
  if (sel) sel.value = name;
  localStorage.setItem("lpp_theme", name);
}

// --- Ouverture + reprise ---
function openModule(href, key) {
  try {
    localStorage.setItem("lpp_last", key);
  } catch (e) {}
  window.location.href = href;
}
function updateResume() {
  const btn = document.getElementById("resumeBtn");
  const map = {
    carte: { label: "Carte", href: "Carte_Petit_Prince.html" },
    perso: {
      label: "Personnages",
      href: "Personnages_Petit_Prince.html",
    },
  };
  const last = state.lastModule || localStorage.getItem("lpp_last");
  if (last && map[last]) {
    btn.disabled = false;
    btn.textContent = "Reprendre: " + map[last].label;
    btn.onclick = () => openModule(map[last].href, last);
  } else {
    btn.disabled = true;
    btn.textContent = "Reprendre: —";
  }
}

// --- Aperçus (toasts simples) ---
let toastTimer = null;
function toast(text) {
  clearTimeout(toastTimer);
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.bottom = "24px";
    el.style.transform = "translateX(-50%)";
    el.style.background = "rgba(15,22,50,.9)";
    el.style.border = "1px solid var(--line)";
    el.style.padding = "10px 12px";
    el.style.borderRadius = "10px";
    el.style.fontSize = "13px";
    el.style.color = "var(--text)";
    el.style.zIndex = "10000";
    el.style.backdropFilter = "blur(6px)";
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.style.opacity = "1";
  toastTimer = setTimeout(() => {
    el.style.opacity = "0";
  }, 1800);
}

// --- Canvas étoiles (fond animé léger) ---
function starfield() {
  const c = document.getElementById("stars");
  if (!c) return;
  const ctx = c.getContext("2d");
  if (!ctx) return;

  let w = 0,
    h = 0,
    stars = [];
  let running = true;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = c.clientWidth = window.innerWidth;
    h = c.clientHeight = window.innerHeight;
    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.max(60, Math.floor((w * h) / 14000)); // densité stable
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.9 + 0.3, // profondeur
      t: Math.random() * Math.PI * 2, // phase de twinkle
      s: Math.random() * 0.7 + 0.3, // vitesse
    }));
  }

  function tick() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.t += 0.03 * s.s;
      const tw = 0.55 + 0.45 * Math.sin(s.t);
      const r = (0.7 + 0.5 * Math.sin(s.t * 1.3)) * (1.2 * s.z);
      ctx.fillStyle = `rgba(255,255,255,${(tw * 0.95).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fill();

      // drift horizontal très léger
      s.x += 0.05 * s.z;
      if (s.x > w + 2) {
        s.x = -2;
        s.y = Math.random() * h;
      }
    }
    requestAnimationFrame(tick);
  }

  document.addEventListener("visibilitychange", () => {
    running = document.visibilityState !== "hidden";
    if (running) requestAnimationFrame(tick);
  });

  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(tick);
}

// --- Animations de survol des cartes (tilt 3D + shine) ---
function cardHoverEffects() {
  const cards = [
    document.getElementById("cardCarte"),
    document.getElementById("cardPerso"),
  ];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  cards.forEach((card) => {
    if (!card) return;

    function setVars(e) {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const mx = (x / r.width) * 100;
      const my = (y / r.height) * 100;
      card.style.setProperty("--mx", mx + "%");
      card.style.setProperty("--my", my + "%");

      if (!reduce) {
        const ry = ((x - r.width / 2) / r.width) * 8; // rotateY
        const rx = -((y - r.height / 2) / r.height) * 6; // rotateX
        card.style.setProperty("--rx", rx.toFixed(2) + "deg");
        card.style.setProperty("--ry", ry.toFixed(2) + "deg");
      }
    }

    card.addEventListener("pointermove", setVars);
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    });
  });
}

// --- Interactions ---
function wire() {
  // Thème
  document.getElementById("themeSel").addEventListener("change", (e) => {
    state.theme = e.target.value;
    applyTheme(state.theme);
  });

  // Boutons ouvrir + aperçu
  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const href = btn.getAttribute("data-open");
      const key = href.includes("Personnages") ? "perso" : "carte";
      state.lastModule = key;
      openModule(href, key);
    });
  });
  document.querySelectorAll("[data-preview]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const k = btn.getAttribute("data-preview");
      if (k === "carte") {
        toast("Carte: itinéraire interactif, fiches + galerie.");
      } else {
        toast("Personnages: diaporama avec citations et images.");
      }
    });
  });

  // Reprendre / hasard
  document.getElementById("randomBtn").addEventListener("click", () => {
    const pick = Math.random() < 0.5 ? "carte" : "perso";
    const href =
      pick === "carte"
        ? "Carte_Petit_Prince.html"
        : "Personnages_Petit_Prince.html";
    openModule(href, pick);
  });

  // Cartes focusables + clavier
  const cards = [
    document.getElementById("cardCarte"),
    document.getElementById("cardPerso"),
  ];
  cards.forEach((card) => {
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const btn = card.querySelector("[data-open]");
        btn?.click();
      }
    });
  });

  // Raccourcis globaux
  document.addEventListener("keydown", (e) => {
    const tag = ((e.target && e.target.tagName) || "").toUpperCase();
    if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag)) return;
    const k = e.key.toLowerCase();
    if (k === "1" || k === "c") {
      openModule("Carte_Petit_Prince.html", "carte");
    } else if (k === "2" || k === "p") {
      openModule("Personnages_Petit_Prince.html", "perso");
    }
  });

  updateResume();
  cardHoverEffects();
}

// --- Splash ---
function hideSplash() {
  const splash = document.getElementById("splash");
  splash.classList.add("hide");
}

// --- Init ---
window.addEventListener("DOMContentLoaded", () => {
  applyTheme(state.theme);
  starfield();
  wire();
  setTimeout(hideSplash, 600);
});
