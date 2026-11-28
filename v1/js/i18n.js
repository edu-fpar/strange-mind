// Langue du jeu (français par défaut, anglais et espagnol disponibles) — module commun à toutes les versions.
//
// Choix de la langue : ?lang=en, ?lang=es ou ?lang=fr dans l'adresse, sinon le dernier choix (mémorisé pour
// toutes les versions), sinon la langue du navigateur.
//
// Utilisation :
//   import { t, LANG, setDictionary, translateDom, langToggle, speechLang } from './i18n.js';
//   setDictionary(EN, ES);             // dictionnaires { 'phrase française': 'English sentence' } (anglais, espagnol)
//   t('Bravo !')                       // → 'Well done!' en anglais, 'Bravo !' en français
//   t('Série de {n} !', { n: 5 })      // variables entre accolades
//   <h2 data-t="help-title">…</h2>     // HTML : clé explicite (data-t="clé") ou, sans valeur, le texte français
//   <button data-t-title="Son">        // attribut title traduit
//   translateDom()                     // à appeler une fois au démarrage
//   langToggle(bouton)                 // bouton qui passe à la langue suivante (FR → EN → ES → FR)

const KEY = 'strange-mind:lang';
const LANGS = ['fr', 'en', 'es'];

function detect() {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) { try { localStorage.setItem(KEY, q); } catch { /* */ } return q; }
  } catch { /* */ }
  try { const s = localStorage.getItem(KEY); if (LANGS.includes(s)) return s; } catch { /* */ }
  const nav = (navigator.language || 'fr').toLowerCase();
  return nav.startsWith('fr') ? 'fr' : nav.startsWith('es') ? 'es' : 'en';
}

export const LANG = detect();
document.documentElement.lang = LANG;

const DICTS = { en: {}, es: {} };
export function setDictionary(en, es) { DICTS.en = en || {}; DICTS.es = es || {}; }

const norm = (s) => String(s).trim().replace(/\s+/g, ' ');

/** Texte dans la langue choisie (l'anglais sert de secours si l'espagnol manque), ou null. */
function lookup(k) {
  if (LANG === 'fr') return null;
  for (const d of [DICTS[LANG], DICTS.en]) {
    const hit = d[k] ?? d[norm(k)];
    if (hit != null) return hit;
  }
  return null;
}

/** Traduit une phrase française (clé) ; remplace {variables}. */
export function t(fr, vars) {
  let s = fr;
  const hit = lookup(fr);
  if (hit != null) s = hit;
  if (vars) s = String(s).replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));
  return s;
}

/** Traduit les éléments marqués data-t / data-t-title (y compris dans les <template>). */
export function translateDom(root = document) {
  if (LANG === 'fr') return;
  const roots = [root, ...[...root.querySelectorAll('template')].map((tp) => tp.content)];
  for (const r of roots) {
    r.querySelectorAll('[data-t]').forEach((el) => {
      const k = el.getAttribute('data-t') || norm(el.innerHTML);
      const v = lookup(k);
      if (v != null) el.innerHTML = v;
    });
    r.querySelectorAll('[data-t-title]').forEach((el) => {
      const k = el.getAttribute('data-t-title') || el.getAttribute('title');
      const v = lookup(k);
      if (v != null) el.setAttribute('title', v);
    });
  }
  const tt = lookup(document.title);
  if (tt) document.title = tt;
}

export function setLang(l) {
  try { localStorage.setItem(KEY, l); } catch { /* */ }
  const u = new URL(location.href);
  u.searchParams.delete('lang');
  location.href = u.toString();
}

/** Transforme un bouton en sélecteur de langue : il affiche et ouvre la langue suivante (FR → EN → ES → FR). */
export function langToggle(btn) {
  if (!btn) return;
  const next = LANGS[(LANGS.indexOf(LANG) + 1) % LANGS.length];
  btn.textContent = next.toUpperCase();
  btn.style.fontWeight = '800'; btn.style.fontSize = '16px';
  btn.title = { fr: 'Version française', en: 'English version', es: 'Versión en español' }[next];
  btn.addEventListener('click', () => setLang(next));
}

/** Langue pour la synthèse vocale : 'en-GB', 'es-ES' ou 'fr-FR' (et préfixe pour choisir la voix). */
export const speechLang = () => ({ en: 'en-GB', es: 'es-ES' }[LANG] || 'fr-FR');
export const voicePrefix = () => LANG;
