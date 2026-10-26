/**
 * Google Analytics 4 (GA4) & Firebase Web Analytics telemetry module for Atlas of Wonder.
 * Loaded as an external ES module so Content-Security-Policy remains strict without 'unsafe-inline'.
 * Configured with privacy-preserving defaults (anonymized IP, no Google signals, no ad personalization).
 */

export const GA_MEASUREMENT_ID = 'G-8G4WWQX7N4';
export const FIREBASE_APP_ID = '1:697625214430:web:834e51e9c305c66982f14f';
export const PROPERTY_ID = '521061448';
export const PRODUCTION_HOSTS = Object.freeze([
  'atlas-of-wonder.web.app',
  'atlas-of-wonder.firebaseapp.com',
]);

let initialized = false;

export function initAnalytics() {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  const isProdHost = PRODUCTION_HOSTS.includes(window.location.hostname);
  const isDebugGa = /[?&]debug_ga=1/.test(window.location.search);
  if (!isProdHost && !isDebugGa) {
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  }

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname + window.location.search,
    site_name: 'atlas-of-wonder',
    firebase_app_id: FIREBASE_APP_ID,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    restricted_data_processing: true,
  });

  window.__atlasAnalytics = {
    measurementId: GA_MEASUREMENT_ID,
    firebaseAppId: FIREBASE_APP_ID,
    propertyId: PROPERTY_ID,
    productionHosts: PRODUCTION_HOSTS,
    disabledOnLocal: Boolean(window[`ga-disable-${GA_MEASUREMENT_ID}`]),
  };
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Ignore telemetry errors so UI never breaks.
  }
}

export function trackWorldOpen({ id = '', title = '', language = 'en', audience = 'all' } = {}) {
  trackEvent('open_world', {
    world_id: String(id),
    world_title: String(title),
    language: String(language),
    audience_filter: String(audience),
  });
}

export function trackAudienceFilter({ audience = 'all', matchCount = 0, language = 'en' } = {}) {
  trackEvent('filter_audience', {
    audience: String(audience),
    match_count: Number.isFinite(matchCount) ? matchCount : 0,
    language: String(language),
  });
}

export function trackLanguageSwitch({ toLanguage = 'en', fromLanguage = '' } = {}) {
  trackEvent('switch_language', {
    to_language: String(toLanguage),
    ...(fromLanguage ? { from_language: String(fromLanguage) } : {}),
  });
}

export function trackThemeToggle({ theme = 'day', language = 'en' } = {}) {
  trackEvent('toggle_theme', {
    theme: String(theme),
    language: String(language),
  });
}

export function trackPassportReset({ language = 'en' } = {}) {
  trackEvent('reset_passport', {
    language: String(language),
  });
}

initAnalytics();
