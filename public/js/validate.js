/**
 * Validation for portal tile data.
 *
 * Shared by the browser (fail-closed rendering: an invalid entry is skipped,
 * never half-rendered) and the Node test suite (`npm test`).
 */

export const STATUSES = Object.freeze(['live', 'coming-soon']);
export const SIZES = Object.freeze(['feature', 'tall', 'standard']);
export const ACCENTS = Object.freeze([
  'cosmic',
  'storybook',
  'anatomy',
  'prenatal',
  'safekids',
  'chronoverse',
  'dino',
  'studio',
]);

/**
 * Tiles may only link to these host suffixes (over HTTPS) or local loopback
 * servers (http://127.0.0.1:<port>). This catches typos and pasted
 * third-party links before a kid can click them. It does NOT prove you own
 * the site (anyone can create a *.web.app site), so still review new URLs.
 * Add your custom domain here if you move a creation off Firebase Hosting.
 */
export const ALLOWED_HOST_SUFFIXES = Object.freeze(['.web.app', '.firebaseapp.com']);

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Relative path under assets/ with no dots before the extension, so no "../".
const IMAGE_PATTERN = /^assets\/[a-z0-9][a-z0-9/-]*\.(?:webp|svg|png|jpg)$/;
const MAX = Object.freeze({ title: 60, kind: 40, description: 240, fact: 32, alt: 220 });

/** True only for https URLs on an allowed host (without ports) or local http://127.0.0.1:<port> without credentials. */
export function isAllowedUrl(value) {
  if (typeof value !== 'string') return false;
  let url;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.username || url.password) return false;
  if (url.protocol === 'http:' && url.hostname === '127.0.0.1' && url.port !== '') {
    return true;
  }
  if (url.protocol !== 'https:' || url.port) return false;
  return ALLOWED_HOST_SUFFIXES.some(
    (suffix) => url.hostname.endsWith(suffix) && url.hostname.length > suffix.length,
  );
}

function checkText(errors, value, key, max) {
  if (typeof value !== 'string' || value.trim() === '') errors.push(`${key} is required`);
  else if (value.length > max) errors.push(`${key} must be at most ${max} characters`);
}

function checkEnum(errors, value, key, allowed) {
  if (!allowed.includes(value)) errors.push(`${key} must be one of: ${allowed.join(', ')}`);
}

function checkList(errors, value, key, { min, max, isValid }) {
  if (!Array.isArray(value) || value.length < min || value.length > max) {
    errors.push(`${key} must list ${min}-${max} items`);
    return;
  }
  if (!value.every(isValid)) errors.push(`${key} has an invalid item`);
  if (new Set(value).size !== value.length) errors.push(`${key} has duplicates`);
}

function checkUrl(errors, creation) {
  const hasUrl = creation.url !== undefined;
  if (creation.status === 'live' && !hasUrl) errors.push('url is required for live creations');
  if (hasUrl && !isAllowedUrl(creation.url)) {
    errors.push(`url must be https:// on an allowed host (${ALLOWED_HOST_SUFFIXES.join(', ')})`);
  }
}

function checkImage(errors, image) {
  if (image === null || typeof image !== 'object') {
    errors.push('image is required');
    return;
  }
  if (typeof image.src !== 'string' || !IMAGE_PATTERN.test(image.src)) {
    errors.push('image.src must be a relative path under assets/');
  }
  checkText(errors, image.alt, 'image.alt', MAX.alt);
  for (const key of ['width', 'height']) {
    if (!Number.isInteger(image[key]) || image[key] <= 0) errors.push(`image.${key} must be a positive integer`);
  }
}

/**
 * Returns a list of human-readable problems; an empty list means valid.
 * @param {object} creation one entry from CREATIONS
 * @param {{audiences: string[]}} options allowed audience keys
 */
export function validateCreation(creation, { audiences }) {
  if (creation === null || typeof creation !== 'object') return ['entry must be an object'];
  const errors = [];
  if (typeof creation.id !== 'string' || !ID_PATTERN.test(creation.id)) {
    errors.push('id must be lowercase kebab-case');
  }
  checkText(errors, creation.title, 'title', MAX.title);
  checkText(errors, creation.kind, 'kind', MAX.kind);
  checkText(errors, creation.description, 'description', MAX.description);
  checkEnum(errors, creation.status, 'status', STATUSES);
  checkEnum(errors, creation.size, 'size', SIZES);
  checkEnum(errors, creation.accent, 'accent', ACCENTS);
  checkUrl(errors, creation);
  // Facts are optional: a coming-soon tile shouldn't carry unverified claims.
  checkList(errors, creation.facts, 'facts', {
    min: 0,
    max: 4,
    isValid: (fact) => typeof fact === 'string' && fact.trim() !== '' && fact.length <= MAX.fact,
  });
  checkList(errors, creation.audiences, 'audiences', {
    min: 1,
    max: audiences.length,
    isValid: (key) => audiences.includes(key),
  });
  checkImage(errors, creation.image);
  return errors;
}
