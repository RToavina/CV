// ============ Données ============

// Ordre du trajet à respecter pour illuminer les segments
const ROUTE_ORDER = [
  "B612",
  "Roi",
  "Vaniteux",
  "Buveur",
  "Businessman",
  "Allumeur",
  "Geographe",
  "Terre",
];

// Planètes et contenu
const PLANETS = {
  B612: {
    name: "Astéroïde B‑612",
    tags: ["Départ", "Rose", "Mouton"],
    description:
      "Le foyer du Petit Prince. Il y laisse sa rose bien-aimée et part explorer les autres mondes.",
    images: [
      {
        src: "https://preview.redd.it/asteroid-b612-space-art-by-me-v0-cdu0bp88y8m91.png?width=1080&crop=smart&auto=webp&s=dcc54cead19249ff92d15b6877761ad8c7005b60",
        caption: "Le Petit Prince et sa rose sur la planète B‑612",
      },
      {
        src: "https://www.milan-magazine.de/wp-content/uploads/2015/09/01-le-petit-prince-osborne-bb1-900x563.jpg",
        caption: "Le lever du soleil sur la planète B-612",
      },
    ],
  },
  Roi: {
    name: "Planète du Roi",
    tags: ["Autorité", "Pouvoir"],
    description:
      "Un monarque qui ne commande que ce qui est possible, comme un coucher de soleil.",
    images: [
      {
        src: "https://www.monpetitprince.fr/wp-content/uploads/2021/12/roi-petit-prince.jpg",
        caption: "Le Roi sur son trône",
      },
    ],
  },
  Vaniteux: {
    name: "Planète du Vaniteux",
    tags: ["Égo", "Admiration"],
    description:
      "Habitant qui ne veut que des applaudissements et de l'admiration.",
    images: [
      {
        src: "https://www.monpetitprince.fr/wp-content/uploads/2021/12/vaniteux-petit-prince.jpg",
        caption: "Le Vaniteux et son chapeau",
      },
    ],
  },
  Buveur: {
    name: "Planète du Buveur",
    tags: ["Oubli", "Solitude"],
    description:
      "Un homme qui boit pour oublier qu'il a honte de boire. Cercle vicieux.",
    images: [
      {
        src: "https://www.monpetitprince.fr/wp-content/uploads/2021/12/buveur-petit-prince.jpg",
        caption: "Le Buveur et ses bouteilles",
      },
    ],
  },
  Businessman: {
    name: "Planète du Businessman",
    tags: ["Possession", "Étoiles"],
    description:
      "Il compte les étoiles pour les posséder, sans jamais les admirer.",
    images: [
      {
        src: "https://www.monpetitprince.fr/wp-content/uploads/2021/12/businessman-petit-prince.jpg",
        caption: "Businessman comptant les étoiles",
      },
    ],
  },
  Allumeur: {
    name: "Planète de l'Allumeur",
    tags: ["Devoir", "Rythme"],
    description:
      "Il allume et éteint son réverbère sans cesse, suivant un rythme absurde.",
    images: [
      {
        src: "https://www.monpetitprince.fr/wp-content/uploads/2021/12/allumeur-reverberes-petit-prince.jpg",
        caption: "Réverbère et nuit",
      },
    ],
  },
  Geographe: {
    name: "Planète du Géographe",
    tags: ["Connaissance", "Exploration"],
    description:
      "Le Géographe écrit les choses éternelles mais ne sort jamais voir le monde.",
    images: [
      {
        src: "https://www.monpetitprince.fr/wp-content/uploads/2021/12/geographe-petit-prince.jpg",
        caption: "Atlas stellaire",
      },
    ],
  },
  Terre: {
    name: "La Terre",
    tags: ["Rencontres", "Renard", "Puits"],
    description:
      "Dernière étape: désert, renard, serpent, aviateur. L'essentiel est invisible pour les yeux.",
    images: [
      {
        src: "https://cloudfront-eu-central-1.images.arcpublishing.com/lexpress/QXZMZF56NRFH5CP42OHGCPFWQ4.jpg",
        caption: "Désert et étoiles",
      },
    ],
  },
};

// ============ Etat & stockage ============
const KEY = "pp-map-progress-v1";
let state = { visited: {}, progressIndex: -1 };
let currentId = null;

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {}
}
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      state = JSON.parse(raw) || state;
    }
  } catch (e) {}
}

// ============ Helpers ============
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function nextPlanetId(id) {
  const idx = ROUTE_ORDER.indexOf(id);
  return ROUTE_ORDER[Math.min(ROUTE_ORDER.length - 1, idx + 1)];
}
function prevPlanetId(id) {
  const idx = ROUTE_ORDER.indexOf(id);
  return ROUTE_ORDER[Math.max(0, idx - 1)];
}

// Active visuels visited et route
function initVisitedStyles() {
  // Planètes déjà visitées
  Object.keys(state.visited || {}).forEach((pid) => {
    const g = document.querySelector(`.planet[data-id="${pid}"]`);
    if (g) g.classList.add("visited");
  });
  // Segments déjà allumés (si on a progressIndex >= 0)
  if (state.progressIndex > 0) {
    for (let i = 0; i < state.progressIndex; i++) {
      const a = ROUTE_ORDER[i],
        b = ROUTE_ORDER[i + 1];
      const seg = document.getElementById(`${a}-${b}`);
      if (seg) seg.classList.add("active");
    }
  }
}

// ============ Changement de thème ============
function setTheme(planetId) {
  // Retirer tous les thèmes précédents
  document.body.className = "";
  // Ajouter le nouveau thème
  if (planetId) {
    document.body.classList.add(`theme-${planetId}`);
  }
}

// ============ Rendu fiche ============
function renderInfo(id) {
  const data = PLANETS[id];
  if (!data) return;

  currentId = id;

  // Changer le thème selon la planète
  setTheme(id);

  // Marquer la planète comme visitée
  state.visited[id] = true;

  // Gestion du chemin: on n'allume le segment que si l'utilisateur suit l'ordre
  // Exemple: si l'on vient d'allumer jusqu'à index k, et que l'utilisateur ouvre ROUTE_ORDER[k+1], on allume le segment k->k+1
  const expectedNext = ROUTE_ORDER[Math.max(0, state.progressIndex + 1)];
  if (id === expectedNext) {
    const a = ROUTE_ORDER[state.progressIndex < 0 ? 0 : state.progressIndex]; // point précédent (si -1, on part de B612)
    const prev =
      state.progressIndex < 0 ? null : ROUTE_ORDER[state.progressIndex];
    // Allumer le segment entre le précédent et celui-ci (si ce n'est pas le tout premier)
    if (prev) {
      const seg = document.getElementById(`${prev}-${id}`);
      if (seg) seg.classList.add("active");
    }
    // Avancer l'index au nouvel id
    state.progressIndex = ROUTE_ORDER.indexOf(id);
  }
  save();

  // Styles carte
  $$(".planet").forEach((p) => p.classList.remove("recent"));
  const g = document.querySelector(`.planet[data-id="${id}"]`);
  if (g) {
    g.classList.add("visited", "recent");
  }

  // Mise à jour de la fiche
  document.getElementById("infoTitle").textContent = data.name;

  // Tags
  const chips = document.getElementById("chips");
  chips.innerHTML = "";
  if (data.tags && data.tags.length) {
    data.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "chip";
      span.textContent = tag;
      chips.appendChild(span);
    });
  }

  // Description et galerie
  const infoContent = document.getElementById("infoContent");
  let galleryHTML = "";
  let imgIdx = 0;

  if (data.images && data.images.length) {
    galleryHTML = `
            <div class="gallery">
              <div class="view">
                <img src="${data.images[0].src}" alt="${data.images[0].caption}" />
              </div>
              <div class="caption">${data.images[0].caption}</div>
              <div class="nav">
                <button class="btn secondary" id="prevImgBtn">←</button>
                <button class="btn secondary" id="nextImgBtn">→</button>
              </div>
            </div>
          `;
  }

  infoContent.innerHTML = `
          <p>${data.description}</p>
          ${galleryHTML}
        `;

  // Navigation galerie
  if (data.images && data.images.length) {
    // câbler nav images
    const total = data.images.length;
    $("#prevImgBtn").disabled = total <= 1;
    $("#nextImgBtn").disabled = total <= 1;
    $("#prevImgBtn").onclick = () => {
      imgIdx = (imgIdx - 1 + total) % total;
      renderGallery();
    };
    $("#nextImgBtn").onclick = () => {
      imgIdx = (imgIdx + 1) % total;
      renderGallery();
    };
  }

  function renderGallery() {
    if (data.images && data.images.length) {
      const view = $(".gallery .view");
      const caption = $(".gallery .caption");
      if (view && caption) {
        view.innerHTML = `<img src="${data.images[imgIdx].src}" alt="${data.images[imgIdx].caption}" />`;
        caption.textContent = data.images[imgIdx].caption;
      }
    }
  }

  renderGallery();

  // états des boutons planète
  const idx = ROUTE_ORDER.indexOf(id);
  $("#prevPlanetBtn").disabled = idx <= 0;
  $("#nextPlanetBtn").disabled = idx >= ROUTE_ORDER.length - 1;
}

// ============ Interactions carte ============
function onPlanetClick(e) {
  const g = e.currentTarget;
  const id = g.getAttribute("data-id");
  renderInfo(id);
}
function wireMap() {
  $$(".planet").forEach((g) => {
    g.addEventListener("click", onPlanetClick);
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPlanetClick(e);
      }
    });
  });
  // clic fond pour retirer l'effet recent
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".planet"))
      $$(".planet").forEach((p) => p.classList.remove("recent"));
  });
}

function wirePanelButtons() {
  $("#prevPlanetBtn").addEventListener("click", () => {
    if (currentId) {
      renderInfo(prevPlanetId(currentId));
    } else if (state.progressIndex >= 0) {
      renderInfo(ROUTE_ORDER[state.progressIndex]);
    } else {
      renderInfo(ROUTE_ORDER[0]);
    }
  });
  $("#nextPlanetBtn").addEventListener("click", () => {
    if (currentId) {
      renderInfo(nextPlanetId(currentId));
    } else if (state.progressIndex >= 0) {
      const nextIdx = Math.min(ROUTE_ORDER.length - 1, state.progressIndex + 1);
      renderInfo(ROUTE_ORDER[nextIdx]);
    } else {
      renderInfo(ROUTE_ORDER[0]);
    }
  });
}

/* ----------------------------------------
       Réinitialisation du trajet et de l'état
       ---------------------------------------- */
function resetProgress(hard = false) {
  // hard=true efface aussi le localStorage
  state = { visited: {}, progressIndex: -1 };
  if (hard) {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
  } else {
    save();
  }
  // nettoyer le style des planètes et du chemin
  $$(".planet").forEach((p) => p.classList.remove("visited", "recent"));
  $$(".route line").forEach((l) => l.classList.remove("active"));
  // vider la fiche
  currentId = null;
  const hint =
    '<p class="empty">Progression réinitialisée.</p><p class="hint">Clique une planète pour recommencer. Astuce: N = planète suivante • P = planète précédente</p>';
  const box = document.getElementById("infoContent");
  if (box) box.innerHTML = hint;
  document.getElementById("infoTitle").textContent = "Fiche planète";
  const chips = document.getElementById("chips");
  if (chips) chips.innerHTML = "";
  // Réactiver les boutons (au cas où)
  document.getElementById("prevPlanetBtn").disabled = true;
  document.getElementById("nextPlanetBtn").disabled = false;
  // Réinitialiser le thème
  setTheme("");
}

// ============ Init + Splash ============
function init() {
  load();
  initVisitedStyles();
  wireMap();
  wirePanelButtons();

  // Raccourcis clavier globaux
  document.addEventListener("keydown", (e) => {
    const tag = ((e.target && e.target.tagName) || "").toUpperCase();
    if (["INPUT", "TEXTAREA", "BUTTON"].includes(tag)) return;
    if (e.key.toLowerCase() === "n") {
      const id = currentId || ROUTE_ORDER[Math.max(0, state.progressIndex)];
      renderInfo(nextPlanetId(id || ROUTE_ORDER[0]));
    } else if (e.key.toLowerCase() === "p") {
      const id = currentId || ROUTE_ORDER[0];
      renderInfo(prevPlanetId(id));
    }
  });

  // bouton reset
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const ok = confirm(
        "Réinitialiser le trajet, les segments illuminés et les planètes visitées ?"
      );
      if (ok) resetProgress(true);
    });
  }

  // Bouton Accueil
  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // Raccourci clavier: Échap => retour accueil
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.location.href = "index.html";
    }
  });

  // Splash: petite attente pour le confort visuel
  const splash = document.getElementById("splash");
  setTimeout(() => splash.classList.add("hide"), 700);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
