/**
 * Atlas of Wonder: renders the tiles and wires four small interactions.
 *   1. Multi-language switcher (EN, ES, 中文, 粵語, 日本語, 한국어, PT, FR, IT) with ?lang= and localStorage.
 *   2. "Show worlds for" chips: dim tiles that don't match (shareable ?for=).
 *   3. Explorer passport: a tile gets a "Visited" stamp once it's opened.
 *   4. Day / Night toggle.
 * All DOM is built with createElement/textContent. There are no HTML strings.
 */
import { AUDIENCES, CREATIONS } from './creations.js';
import {
  DEFAULT_LANG,
  LANGUAGES,
  UI_STRINGS,
  isSupportedLanguage,
  localizeCreation,
  resolveLanguage,
} from './i18n.js';
import { validateCreation } from './validate.js';

const KEYS = Object.freeze({ theme: 'aow-theme', visited: 'aow-visited', lang: 'aow-lang' });
const THEME_COLORS = Object.freeze({ day: '#f5f0e6', night: '#0c121d' });
const SVG_NS = 'http://www.w3.org/2000/svg';
const ICONS = Object.freeze({ external: 'M7 17 17 7M8 7h9v9', check: 'm5 12.5 4.5 4.5L19 7.5' });
const ALL = 'all';

const $ = (id) => document.getElementById(id);
const audienceKeys = Object.keys(AUDIENCES);
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Fail closed: an entry that doesn't validate is skipped, never half-rendered.
const creations = CREATIONS.filter((creation) => {
  const problems = validateCreation(creation, { audiences: audienceKeys });
  if (problems.length > 0) console.warn(`Skipped tile "${String(creation?.id)}": ${problems.join('; ')}`);
  return problems.length === 0;
});
const creationById = new Map(creations.map((creation) => [creation.id, creation]));
const liveIds = new Set(creations.filter((c) => c.status === 'live').map((c) => c.id));
const tiles = new Map();
const pendingStamps = new Set();
let visited = new Set();
let currentAudience = ALL;
let currentLang = DEFAULT_LANG;

function t() {
  return UI_STRINGS[currentLang] ?? UI_STRINGS[DEFAULT_LANG];
}

// ---------- storage: non-sensitive UI state only; tolerate blocked storage ----------

function readStore(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStore(key, value) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Storage blocked (private mode, policy): the page still works, it just forgets.
  }
}

// ---------- DOM helpers ----------

function el(tag, { className, text, attrs } = {}, children = []) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  for (const [name, value] of Object.entries(attrs ?? {})) node.setAttribute(name, value);
  node.append(...children);
  return node;
}

function icon(name) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', ICONS[name]);
  svg.append(path);
  return svg;
}

// ---------- tiles ----------

function renderMedia(creation) {
  const { src, alt, width, height } = creation.image;
  const isFeature = creation.size === 'feature';
  const img = el('img', {
    attrs: { src, alt, width: String(width), height: String(height), decoding: 'async', loading: isFeature ? 'eager' : 'lazy' },
  });
  if (isFeature) img.setAttribute('fetchpriority', 'high');
  const stamp = el('span', { className: 'stamp', attrs: { hidden: '' } }, [
    icon('check'),
    el('span', { text: t().stampVisited }),
  ]);
  stamp.addEventListener('animationend', () => stamp.classList.remove('is-stamping'));
  return el('div', { className: 'tile__media' }, [img, stamp]);
}

function renderLink(creation) {
  const link = el(
    'a',
    { className: 'tile__link', text: creation.title, attrs: { href: creation.url, target: '_blank', rel: 'noopener' } },
    [el('span', { className: 'sr-only', text: t().opensInNewTab })],
  );
  link.addEventListener('click', () => stampPassport(creation.id));
  link.addEventListener('auxclick', (event) => {
    if (event.button === 1) stampPassport(creation.id);
  });
  return link;
}

function renderFooter(creation, isLive) {
  const status = isLive
    ? el('span', { className: 'tile__cta', attrs: { 'aria-hidden': 'true' } }, [t().openCta, icon('external')])
    : el('span', { className: 'badge', text: t().notLiveYet });
  return el('div', { className: 'tile__footer' }, [
    el('span', { text: t().formatAudiencePhrase(creation.audiences) }),
    status,
  ]);
}

function renderBody(creation, isLive) {
  const children = [
    el('p', { className: 'tile__kind', text: creation.kind }),
    el('h3', { className: 'tile__title' }, [isLive ? renderLink(creation) : creation.title]),
    el('p', { className: 'tile__desc', text: creation.description }),
  ];
  if (creation.facts.length > 0) {
    const facts = creation.facts.map((fact) => el('li', { text: fact }));
    children.push(el('ul', { className: 'tile__facts', attrs: { 'aria-label': t().highlightsLabel } }, facts));
  }
  children.push(renderFooter(creation, isLive));
  return el('div', { className: 'tile__body' }, children);
}

function renderTile(baseCreation) {
  const localized = localizeCreation(baseCreation, currentLang);
  const problems = validateCreation(localized, { audiences: audienceKeys });
  const creation = problems.length === 0 ? localized : baseCreation;
  const tile = el(
    'li',
    {
      className: `tile tile--${creation.size}`,
      attrs: { 'data-id': creation.id, 'data-accent': creation.accent, 'data-status': creation.status, 'data-match': 'true' },
    },
    [renderMedia(creation), renderBody(creation, creation.status === 'live')],
  );
  tiles.set(creation.id, tile);
  return tile;
}

function renderTiles() {
  tiles.clear();
  const items = creations.length > 0
    ? creations.map(renderTile)
    : [el('li', { className: 'empty', text: t().emptyWorlds })];
  $('worlds').replaceChildren(...items);
}

function renderSummary() {
  const live = liveIds.size;
  const soon = creations.length - live;
  $('summary').textContent = t().formatSummary(live, soon);
}

// ---------- audience chips ----------

function countFor(key) {
  return key === ALL ? creations.length : creations.filter((c) => c.audiences.includes(key)).length;
}

function renderChips() {
  const strings = t();
  const entries = [
    [ALL, strings.everyone],
    ...audienceKeys.map((key) => [key, strings.audiences[key]]),
  ];
  const chips = entries
    .filter(([key]) => countFor(key) > 0)
    .map(([key, label]) => {
      const chip = el(
        'button',
        { className: 'chip', attrs: { type: 'button', 'data-audience': key, 'aria-pressed': 'false' } },
        [el('span', { text: label }), el('span', { className: 'chip__count', text: String(countFor(key)) })],
      );
      // Pressing the active chip again goes back to everyone.
      chip.addEventListener('click', () => applyAudience(key === currentAudience ? ALL : key, { fromUser: true }));
      return chip;
    });
  $('audience-chips').replaceChildren(...chips);
}

function applyAudience(value, { fromUser }) {
  currentAudience = value === ALL || audienceKeys.includes(value) ? value : ALL;
  for (const [id, tile] of tiles) {
    const match = currentAudience === ALL || creationById.get(id).audiences.includes(currentAudience);
    tile.dataset.match = String(match);
  }
  for (const chip of document.querySelectorAll('.chip')) {
    chip.setAttribute('aria-pressed', String(chip.dataset.audience === currentAudience));
  }
  if (!fromUser) return;
  $('filter-status').textContent = t().formatFilterStatus(
    currentAudience,
    countFor(currentAudience),
    creations.length,
  );
  const url = new URL(window.location.href);
  if (currentAudience === ALL) url.searchParams.delete('for');
  else url.searchParams.set('for', currentAudience);
  window.history.replaceState(null, '', url);
}

// ---------- explorer passport ----------

function readVisited() {
  try {
    const parsed = JSON.parse(readStore(KEYS.visited) ?? '[]');
    // Allow-list validation: keep only ids of tiles that are live right now.
    return new Set(Array.isArray(parsed) ? parsed.filter((id) => liveIds.has(id)) : []);
  } catch {
    return new Set();
  }
}

function stampPassport(id) {
  if (!liveIds.has(id) || visited.has(id)) return;
  visited.add(id);
  writeStore(KEYS.visited, JSON.stringify([...visited]));
  pendingStamps.add(id);
  // The new tab usually takes focus, so the stamp lands when the visitor comes back.
  window.setTimeout(() => {
    if (document.visibilityState === 'visible') flushStamps();
  }, 400);
}

function flushStamps() {
  if (pendingStamps.size === 0) return;
  for (const id of pendingStamps) {
    const stamp = tiles.get(id)?.querySelector('.stamp');
    if (!stamp) continue;
    stamp.hidden = false;
    if (!reducedMotion.matches) stamp.classList.add('is-stamping');
  }
  pendingStamps.clear();
  renderPassport();
}

function syncStamps() {
  for (const [id, tile] of tiles) tile.querySelector('.stamp').hidden = !visited.has(id);
}

function renderPassport() {
  const total = liveIds.size;
  $('passport').hidden = total === 0;
  if (total === 0) return;
  const dots = [...liveIds].map((id) =>
    el('span', { className: 'passport__dot', attrs: { 'data-accent': creationById.get(id).accent, 'data-visited': String(visited.has(id)) } }),
  );
  $('passport-dots').replaceChildren(...dots);
  $('passport-text').textContent = t().formatPassport(visited.size, total);
  $('passport-reset').hidden = visited.size === 0;
}

function resetPassport() {
  visited = new Set();
  pendingStamps.clear();
  writeStore(KEYS.visited, null);
  syncStamps();
  renderPassport();
  $('passport-text').focus(); // the Reset button just disappeared; keep focus nearby
}

// ---------- language switcher ----------

function renderLangSwitch() {
  const buttons = LANGUAGES.map((lang) => {
    const btn = el('button', {
      className: 'lang-btn',
      text: lang.label,
      attrs: {
        type: 'button',
        'data-lang': lang.code,
        lang: lang.code,
        title: lang.nativeName,
        'aria-label': lang.ariaLabel,
        'aria-pressed': String(lang.code === currentLang),
      },
    });
    btn.addEventListener('click', () => applyLanguage(lang.code, { fromUser: true }));
    return btn;
  });
  $('lang-switch').replaceChildren(...buttons);
}

function paintStaticChrome() {
  const strings = t();
  document.documentElement.lang = currentLang;
  document.title = strings.pageTitle;
  document.querySelector('meta[name="description"]')?.setAttribute('content', strings.metaDescription);
  $('skip-link').textContent = strings.skipLink;
  $('lang-switch').setAttribute('aria-label', strings.langGroupLabel);
  $('theme-label').textContent = strings.nightMode;
  $('title').textContent = strings.mastheadTitle;
  $('lede').textContent = strings.mastheadLede;
  $('worlds-heading').textContent = strings.worldsHeading;
  $('filter-label').textContent = strings.filterLabel;
  $('passport-label').textContent = strings.passportLabel;
  $('passport-reset').textContent = strings.passportReset;
  $('footer-calm').textContent = strings.footerCalm;
  $('footer-credits').textContent = strings.footerCredits;
  for (const btn of document.querySelectorAll('.lang-btn')) {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === currentLang));
  }
}

function applyLanguage(code, { fromUser }) {
  currentLang = isSupportedLanguage(code) ? code : DEFAULT_LANG;
  paintStaticChrome();
  renderTiles();
  renderSummary();
  renderChips();
  applyAudience(currentAudience, { fromUser: false });
  syncStamps();
  renderPassport();
  if (!fromUser) return;
  writeStore(KEYS.lang, currentLang);
  const url = new URL(window.location.href);
  if (currentLang === DEFAULT_LANG) url.searchParams.delete('lang');
  else url.searchParams.set('lang', currentLang);
  window.history.replaceState(null, '', url);
}

// ---------- Day / Night ----------

function effectiveTheme() {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'day' || chosen === 'night') return chosen;
  return darkQuery.matches ? 'night' : 'day';
}

function paintTheme() {
  const theme = effectiveTheme();
  $('theme-toggle').setAttribute('aria-pressed', String(theme === 'night'));
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

function toggleTheme() {
  const next = effectiveTheme() === 'night' ? 'day' : 'night';
  document.documentElement.dataset.theme = next;
  writeStore(KEYS.theme, next);
  paintTheme();
}

function adoptStoredTheme() {
  const saved = readStore(KEYS.theme);
  if (saved === 'day' || saved === 'night') document.documentElement.dataset.theme = saved;
  else delete document.documentElement.dataset.theme;
  paintTheme();
}

// ---------- wiring ----------

function onStorage(event) {
  // Keep several open tabs in sync (event.key is null after storage.clear()).
  if (event.key === KEYS.visited || event.key === null) {
    visited = readVisited();
    syncStamps();
    renderPassport();
  }
  if (event.key === KEYS.theme || event.key === null) adoptStoredTheme();
  if (event.key === KEYS.lang || event.key === null) {
    const nextLang = resolveLanguage({
      search: window.location.search,
      stored: readStore(KEYS.lang),
      navigatorLanguages: window.navigator.languages,
    });
    if (nextLang !== currentLang) applyLanguage(nextLang, { fromUser: false });
  }
}

function init() {
  currentLang = resolveLanguage({
    search: window.location.search,
    stored: readStore(KEYS.lang),
    navigatorLanguages: window.navigator.languages,
  });
  currentAudience = new URLSearchParams(window.location.search).get('for') ?? ALL;
  visited = readVisited();
  renderLangSwitch();
  applyLanguage(currentLang, { fromUser: false });
  paintTheme();
  $('theme-toggle').addEventListener('click', toggleTheme);
  $('passport-reset').addEventListener('click', resetPassport);
  darkQuery.addEventListener('change', paintTheme);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') flushStamps();
  });
  window.addEventListener('storage', onStorage);
}

init();
