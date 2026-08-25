// ============================================================
// script.js — comportements du site CV
// ============================================================

// --- Année automatique dans le pied de page ---
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Menu mobile ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const nav = navToggle.closest('.nav');
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  // Ferme le menu au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.closest('.nav').classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Gestion des images manquantes (photo de profil) ---
// Si l'image indiquée dans le HTML (ex: assets/images/photo.jpg) n'existe
// pas encore, on affiche un cadre "à remplacer" au lieu d'une icône cassée.
document.querySelectorAll('img[data-fallback]').forEach(img => {
  const wrapper = img.closest('.photo-frame');
  if (wrapper) wrapper.setAttribute('data-fallback', img.dataset.fallback);
  img.addEventListener('error', () => {
    img.classList.add('img-missing');
  }, { once: true });
});

// --- Révélation au scroll ---
const revealTargets = document.querySelectorAll('.section, .hero__aside, .card, .trace__node');
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));

// --- Formulaire de contact ---
// Voir README.md : ce formulaire pointe vers Formspree (service gratuit).
// Remplacez l'URL "action" dans index.html par votre propre endpoint.
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.action.includes('VOTRE_ID_FORMSPREE')) {
      status.textContent = "⚠️ Formulaire non configuré : remplacez l'URL Formspree dans index.html (voir README.md).";
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.textContent = 'Envoi en cours…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        status.textContent = '✓ Message envoyé, merci ! Je vous répondrai rapidement.';
        form.reset();
      } else {
        status.textContent = "Une erreur est survenue. Réessayez ou écrivez-moi directement par e-mail.";
      }
    } catch (err) {
      status.textContent = "Une erreur réseau est survenue. Réessayez ou écrivez-moi directement par e-mail.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
