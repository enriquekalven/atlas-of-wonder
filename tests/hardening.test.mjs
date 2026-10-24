import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { CREATIONS } from '../public/js/creations.js';
import { resolveRequestPath } from '../scripts/serve.mjs';
import { verdict } from '../scripts/check-links.mjs';

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8');
const html = read('public/index.html');
const globalHeaders = JSON.parse(read('firebase.json')).hosting.headers.find((rule) => rule.source === '**').headers;
const header = (key) => globalHeaders.find((h) => h.key === key)?.value;
const directives = (csp) => csp.split(';').map((d) => d.trim()).filter(Boolean);

test('CSP header is strict: self-only scripts, no inline or eval, framing denied', () => {
  const csp = header('Content-Security-Policy');
  assert.ok(directives(csp).includes("default-src 'none'"));
  assert.ok(directives(csp).includes("script-src 'self'"));
  assert.ok(directives(csp).includes("frame-ancestors 'none'"));
  assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval|\*|https?:/);
});

test('meta CSP matches the header, minus header-only frame-ancestors', () => {
  const meta = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
  const headerOnly = directives(header('Content-Security-Policy')).filter((d) => !d.startsWith('frame-ancestors'));
  assert.deepEqual(directives(meta).sort(), headerOnly.sort());
});

test('other security headers are set', () => {
  assert.equal(header('X-Content-Type-Options'), 'nosniff');
  assert.equal(header('X-Frame-Options'), 'DENY');
  assert.equal(header('Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.match(header('Permissions-Policy'), /camera=\(\).*microphone=\(\).*geolocation=\(\)/);
});

test('index.html has no inline scripts, styles or event handlers', () => {
  for (const [, attrs] of html.matchAll(/<script\b([^>]*)>/g)) assert.match(attrs, /\ssrc="/);
  assert.doesNotMatch(html, /<style\b/);
  assert.doesNotMatch(html, /\sstyle="/);
  assert.doesNotMatch(html, /\son[a-z]+="/i);
});

test('page structure: lang, a single h1, a skip link that targets the grid', () => {
  assert.match(html, /<html lang="en">/);
  assert.equal(html.match(/<h1\b/g).length, 1);
  assert.match(html, /class="skip-link" href="#worlds"/);
  assert.match(html, /id="worlds"/);
});

test('every local asset referenced by index.html exists', () => {
  for (const [, ref] of html.matchAll(/(?:href|src)="(?!https?:|#|\.\/")([^"]+)"/g)) {
    assert.ok(existsSync(new URL(`../public/${ref}`, import.meta.url)), `missing ${ref}`);
  }
});

test('JS never uses unsafe DOM sinks, eval or native dialogs', () => {
  const sinks = [/\.innerHTML\b/, /\.outerHTML\b/, /insertAdjacentHTML/, /document\.write/, /\beval\(/, /new Function\(/, /\balert\(/, /\bconfirm\(/, /\bprompt\(/];
  for (const file of readdirSync(new URL('../public/js/', import.meta.url))) {
    const source = read(`public/js/${file}`);
    for (const sink of sinks) assert.doesNotMatch(source, sink, `${file} uses ${sink}`);
  }
});

test('external tile links open in a new tab with rel="noopener"', () => {
  assert.match(read('public/js/app.js'), /target: '_blank', rel: 'noopener'/);
});

test('the no-JS fallback links exactly the live creations', () => {
  const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/)[1];
  const hrefs = [...noscript.matchAll(/href="([^"]+)"/g)].map(([, href]) => href).sort();
  const live = CREATIONS.filter((c) => c.status === 'live').map((c) => c.url).sort();
  assert.deepEqual(hrefs, live);
});

test('preview server refuses paths that escape public/', () => {
  const root = '/srv/site/public';
  assert.equal(resolveRequestPath('/', root), root);
  assert.equal(resolveRequestPath('/css/styles.css', root), `${root}/css/styles.css`);
  assert.equal(resolveRequestPath('/..%2f..%2fetc/passwd', root), null);
  assert.equal(resolveRequestPath('/.env', root), null);
  assert.equal(resolveRequestPath('/assets/%00.svg', root), null);
  assert.throws(() => resolveRequestPath('/%E0%A4%A', root), URIError);
});

test('link checker: only a 404 proves a site is missing; network errors stay unverified', () => {
  assert.equal(verdict('live', { status: 200 }).level, 'OK');
  assert.equal(verdict('live', { status: 404, siteNotFound: true }).fail, true);
  assert.equal(verdict('live', { status: 503 }).fail, true);
  const offline = verdict('live', { status: null, error: 'TimeoutError' });
  assert.equal(offline.level, 'UNVERIFIED');
  assert.equal(offline.fail, false);
  assert.equal(verdict('coming-soon', { status: 404, siteNotFound: true }).level, 'OK');
  assert.equal(verdict('coming-soon', { status: 200 }).level, 'ACTION');
});
