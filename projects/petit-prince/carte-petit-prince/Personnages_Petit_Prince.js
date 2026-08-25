// NOTE droits: mini-citations ≤ 90 caractères. Remplace par tes images locales si besoin.
const LPP = {
  prince: {
    title: "Le Petit Prince",
    meta: "Héros — regard d’enfant",
    text: "« S'il te plaît... dessine-moi un mouton. »",
    imgs: [
      "https://i.ytimg.com/vi/JOWw5OaaZf8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDF9qpj0v7PJswPt67SMwssqrwlBA",
      "https://i.pinimg.com/736x/ab/18/ae/ab18ae92280522be8f663fce58db4128.jpg",
      "https://mobile-img.lpcdn.ca/lpca/924x/90d3bb1d/05e907a4f5513be295d96713abc5a4dc.jpeg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu5eGG3MnvQ7QkpZW_XXU20ZRXezm8m1kVLg&s",
      "https://www.lepetitprince.com/wp-content/uploads/2023/02/img-fb-1.jpg",
    ],
  },
  rose: {
    title: "La Rose",
    meta: "Beauté et fragilité",
    text: "« Il faut bien que je supporte deux ou trois chenilles. »",
    imgs: [
      "https://www.blog.lepetitprince.com/wp-content/uploads/2010/11/actu2010_grose3.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMDoSvtjzblXij3xjkhxnux29oOVFii6YEg&s",
      "https://www.monpetitprince.fr/wp-content/uploads/2021/12/rose-petit-prince.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOukQjVF8zPp72dSc2BcT1LZZ6XwsULnVhmA&s",
      "https://www.fariboles.fr/1313-extra_large_default/le-petit-prince-et-sa-rose.jpg",
    ],
  },
  renard: {
    title: "Le Renard",
    meta: "Amitié — apprivoiser",
    text: "« Tu deviens responsable pour toujours de ce que tu as apprivoisé. »",
    imgs: [
      "https://www.monpetitprince.fr/wp-content/uploads/2021/11/petit-prince-renard-dos-herbe.jpg",
      "https://www.teamingup.ch/wp-content/uploads/2020/05/Petit-prince1-848x440.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaHu03mxe04hzlq0RVKoAzETCQwsWg7FUVZQ&s",
      "https://www.monpetitprince.fr/wp-content/uploads/2021/12/renard-petit-prince.jpg",
      "https://www.fariboles.fr/1314-extra_large_default/le-petit-prince-et-le-renard.jpg",
    ],
  },
  coeur: {
    title: "L’essentiel",
    meta: "Leçon du renard",
    text: "« On ne voit bien qu’avec le cœur. »",
    imgs: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCz09T25HIcRjS3xLpjF078suP2H5FjymTQ&s",
    ],
  },
  aviateur: {
    title: "L’Aviateur",
    meta: "Narrateur",
    text: "« J'ai ainsi vécu seul, sans personne. »",
    imgs: [
      "https://www.radiofrance.fr/s3/cruiser-production/2015/05/a805d89d-ffb1-11e4-bab6-005056a87c30/860_petit-prince-b.jpg",
      "https://www.culture31.com/wp-content/uploads/2023/11/2324-bascala-petitprince-affiche-1419x2048-2.jpg",
      "https://www.cineteleandco.fr/wp-content/uploads/2015/07/sc0205_sh027-5_jcp_v01_L_0979.jpg",
    ],
  },
  roi: {
    title: "Le Roi",
    meta: "Autorité",
    text: "« Il faut exiger de chacun ce que chacun peut donner. »",
    imgs: [
      "https://arbrealettres.wordpress.com/wp-content/uploads/2017/01/roi-petit-prince.jpg",
    ],
  },
  vaniteux: {
    title: "Le Vaniteux",
    meta: "Quête d’admiration",
    text: "« Les grandes personnes sont bien étranges. »",
    imgs: [
      "https://images.squarespace-cdn.com/content/v1/5b681ecd3917eeea09becd4e/1542011689966-24DIDJ8PUGEK6KAO97BZ/Conceited-Man-Little-Prince-Art-Collection-Nazare-Aga-sculpture-SaintEx.JPG",
    ],
  },
  buveur: {
    title: "Le Buveur",
    meta: "Cercle vicieux",
    text: "« Pour oublier que j’ai honte de boire. »",
    imgs: [
      "https://www.monpetitprince.fr/wp-content/uploads/2021/12/buveur-petit-prince.jpg",
    ],
  },
  businessman: {
    title: "Le Businessman",
    meta: "Possession",
    text: "« Je possède des étoiles. »",
    imgs: [
      "https://images.squarespace-cdn.com/content/v1/5b681ecd3917eeea09becd4e/1591610518648-H36PPEKC7UESIWL90TQ8/Businessman+AC+1+comp.jpg",
    ],
  },
  allumeur: {
    title: "L’Allumeur",
    meta: "Devoir",
    text: "« Bonjour. — Bonjour. »",
    imgs: [
      "https://www.monpetitprince.fr/wp-content/uploads/2021/12/allumeur-reverberes-petit-prince.jpg",
    ],
  },
  geographe: {
    title: "Le Géographe",
    meta: "Savoir et expérience",
    text: "« Les géographes ne vont pas voir les villes. »",
    imgs: [
      "https://www.monpetitprince.fr/wp-content/uploads/2021/12/geographe-petit-prince.jpg",
    ],
  },
  serpent: {
    title: "Le Serpent",
    meta: "Mystère",
    text: "« Je puis t’emporter plus loin qu’un navire. »",
    imgs: [
      "https://www.monpetitprince.fr/wp-content/uploads/2022/01/serpent-petit-prince.jpg",
      "https://www.blog.lepetitprince.com/wp-content/uploads/2010/11/actu2010_gserpent2.jpg",
      "https://www.blog.lepetitprince.com/wp-content/uploads/2010/11/actu2010_gserpent_final11.jpg",
    ],
  },
};

// --- Helpers DOM ----------------------------------------------------------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// --- État + persistance ---------------------------------------------------
const state = {
  currentId: null,
  visited: {},
  carouselIndex: {}, // { id: index }
  auto: { on: true, ms: 4000 },
  _runtime: { timerId: null, hover: false },
};

function save() {
  try {
    localStorage.setItem(
      "lpp_state",
      JSON.stringify({
        currentId: state.currentId,
        visited: state.visited,
        carouselIndex: state.carouselIndex,
        auto: { on: state.auto.on, ms: state.auto.ms },
      })
    );
  } catch (e) {}
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem("lpp_state") || "null");
    if (!s) return;
    if (s.currentId) state.currentId = s.currentId;
    if (s.visited && typeof s.visited === "object") state.visited = s.visited;
    if (s.carouselIndex && typeof s.carouselIndex === "object")
      state.carouselIndex = s.carouselIndex;
    if (s.auto && typeof s.auto === "object") {
      state.auto.on = !!s.auto.on;
      if (Number.isFinite(s.auto.ms) && s.auto.ms >= 1500)
        state.auto.ms = s.auto.ms;
    }
  } catch (e) {}
}

// --- Sélection + index image ---------------------------------------------
function setCurrent(id) {
  state.currentId = id;
  save();
}
function getImgIndex(id) {
  return state.carouselIndex[id] ?? 0;
}
function setImgIndex(id, i) {
  state.carouselIndex[id] = i;
  save();
}

// --- Auto-play helpers ----------------------------------------------------
function stopCarouselAuto() {
  if (state._runtime.timerId) {
    clearTimeout(state._runtime.timerId);
    state._runtime.timerId = null;
  }
}
function scheduleNextTick(id) {
  stopCarouselAuto();
  const imgs = LPP[id]?.imgs || [];
  if (!state.auto.on || state._runtime.hover || imgs.length < 2) return;
  state._runtime.timerId = setTimeout(() => {
    const len = imgs.length;
    const cur = getImgIndex(id);
    const nxt = (cur + 1) % len;
    setImgIndex(id, nxt);
    renderCarousel(id); // relance et reprogramme
  }, state.auto.ms);
}
function bumpAfterInteraction() {
  if (!state.currentId) return;
  scheduleNextTick(state.currentId);
}
function syncAutoBtnState(imgsLen) {
  const btn = $("#autoToggle");
  if (!btn) return;
  const playing = !!state.auto.on;
  btn.textContent = playing ? "❚❚" : "▶";
  btn.setAttribute("aria-pressed", String(playing));
  btn.setAttribute(
    "aria-label",
    playing ? "Pause diaporama" : "Lecture auto du diaporama"
  );
  btn.title = playing ? "Pause (lecture auto)" : "Lecture auto";
  btn.disabled = imgsLen < 2;
}

// --- Rendu liste ----------------------------------------------------------
function renderList() {
  const list = $("#entryList");
  list.innerHTML = "";
  Object.keys(LPP).forEach((id) => {
    const it = document.createElement("button");
    it.className = "item";
    it.textContent = LPP[id].title || id;
    it.setAttribute("aria-current", id === state.currentId ? "true" : "false");
    it.addEventListener("click", () => {
      openEntry(id);
    });
    list.appendChild(it);
  });
}

// --- Rendu infos + carrousel ---------------------------------------------
function renderInfo(id) {
  stopCarouselAuto(); // propre pendant le switch
  const data = LPP[id];
  const info = $("#infoBox");
  $("#pTitle").textContent = data.title || id;
  $("#pMeta").textContent = data.meta || "";
  $("#pText").textContent = data.text || "";
  info.hidden = false;
  renderCarousel(id);
}

function renderCarousel(id) {
  const box = $("#carousel");
  const imgEl = $("#imgView");
  const prev = $("#imgPrev");
  const next = $("#imgNext");
  const dots = $("#dots");

  // (corrigé) une seule déclaration
  const imgs = LPP[id]?.imgs || [];
  box.hidden = !imgs.length;

  // Image courante
  const len = imgs.length;
  let cur = Math.max(0, Math.min(getImgIndex(id), Math.max(0, len - 1)));
  if (len === 0) {
    imgEl.removeAttribute("src");
    imgEl.alt = "Aucune image disponible";
  } else {
    imgEl.src = imgs[cur];
    imgEl.alt = `${LPP[id].title || id} — image ${cur + 1}/${len}`;
  }

  // Dots
  dots.innerHTML = "";
  imgs.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === cur ? " active" : "");
    dots.appendChild(d);
  });

  // Boutons (wrap infini)
  if (len <= 1) {
    prev.disabled = true;
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }

  if (!prev._wired) {
    prev._wired = true;
    prev.addEventListener("click", () => {
      const imgs = LPP[state.currentId]?.imgs || [];
      if (!imgs.length) return;
      const len = imgs.length;
      const cur = getImgIndex(state.currentId);
      const nxt = (cur - 1 + len) % len;
      setImgIndex(state.currentId, nxt);
      renderCarousel(state.currentId);
      bumpAfterInteraction();
    });
  }
  if (!next._wired) {
    next._wired = true;
    next.addEventListener("click", () => {
      const imgs = LPP[state.currentId]?.imgs || [];
      if (!imgs.length) return;
      const len = imgs.length;
      const cur = getImgIndex(state.currentId);
      const nxt = (cur + 1) % len;
      setImgIndex(state.currentId, nxt);
      renderCarousel(state.currentId);
      bumpAfterInteraction();
    });
  }

  // Hover pause
  if (!box._hoverWired) {
    box._hoverWired = true;
    box.addEventListener("mouseenter", () => {
      state._runtime.hover = true;
      stopCarouselAuto();
    });
    box.addEventListener("mouseleave", () => {
      state._runtime.hover = false;
      if (state.currentId) scheduleNextTick(state.currentId);
    });
  }

  // Bouton Play/Pause
  const autoBtn = $("#autoToggle");
  if (autoBtn && !autoBtn._wired) {
    autoBtn._wired = true;
    autoBtn.addEventListener("click", () => {
      state.auto.on = !state.auto.on;
      save();
      syncAutoBtnState((LPP[state.currentId]?.imgs || []).length);
      if (state.auto.on && state.currentId) {
        scheduleNextTick(state.currentId);
      } else {
        stopCarouselAuto();
      }
    });
  }

  // Synchro bouton + (re)programmation auto
  syncAutoBtnState(imgs.length);
  scheduleNextTick(id);
}

// --- Navigation / ouverture ----------------------------------------------
function openEntry(id) {
  setCurrent(id);
  $$("#entryList .item").forEach((btn) => {
    const title = btn.textContent;
    btn.setAttribute("aria-current", String(title === (LPP[id].title || id)));
  });
  renderInfo(id);
}

// --- Clavier --------------------------------------------------------------
function setupKeyboard() {
  window.addEventListener("keydown", (e) => {
    if (!state.currentId) return;
    if (e.key === "ArrowLeft") {
      const imgs = LPP[state.currentId]?.imgs || [];
      if (!imgs.length) return;
      const len = imgs.length;
      const cur = getImgIndex(state.currentId);
      setImgIndex(state.currentId, (cur - 1 + len) % len);
      renderCarousel(state.currentId);
      bumpAfterInteraction();
    } else if (e.key === "ArrowRight") {
      const imgs = LPP[state.currentId]?.imgs || [];
      if (!imgs.length) return;
      const len = imgs.length;
      const cur = getImgIndex(state.currentId);
      setImgIndex(state.currentId, (cur + 1) % len);
      renderCarousel(state.currentId);
      bumpAfterInteraction();
    }
  });
}

// --- Visibilité onglet ----------------------------------------------------
function setupVisibility() {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      stopCarouselAuto();
    } else if (state.currentId) {
      scheduleNextTick(state.currentId);
    }
  });
  window.addEventListener("beforeunload", stopCarouselAuto);
}

// --- Init -----------------------------------------------------------------
function init() {
  load();
  renderList();
  setupKeyboard();
  setupVisibility();
  const firstId = Object.keys(LPP)[0];
  openEntry(state.currentId || firstId);
}

init();
