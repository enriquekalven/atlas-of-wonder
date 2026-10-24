#!/usr/bin/env node
// Local preview: serves public/ on 127.0.0.1 only, with the same security
// headers as production (read from firebase.json), so CSP problems show up
// here first. Usage: npm start   (PORT=8080 npm start to change the port)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = '127.0.0.1';
const PORT = Number.parseInt(process.env.PORT ?? '5173', 10);
const ROOT = resolve(fileURLToPath(new URL('../public', import.meta.url)));
const TYPES = Object.freeze({
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
});

async function loadHeaders() {
  const config = JSON.parse(await readFile(new URL('../firebase.json', import.meta.url), 'utf8'));
  const rule = config.hosting.headers.find((entry) => entry.source === '**');
  // HSTS means nothing over plain http://127.0.0.1, so it stays production-only.
  return Object.fromEntries(
    rule.headers.filter(({ key }) => key !== 'Strict-Transport-Security').map(({ key, value }) => [key, value]),
  );
}

/** Maps a request URL to a file inside ROOT, or null if it would escape ROOT. */
export function resolveRequestPath(rawUrl, root = ROOT) {
  const { pathname } = new URL(rawUrl, `http://${HOST}`);
  const decoded = decodeURIComponent(pathname); // throws on malformed escapes -> 400
  if (decoded.includes('\0') || decoded.split('/').some((part) => part.startsWith('.'))) return null;
  const candidate = resolve(root, `.${decoded}`);
  // Trailing separator so a sibling like "public-evil" can't pass a prefix check.
  return candidate === root || candidate.startsWith(root + sep) ? candidate : null;
}

async function findFile(candidate) {
  const info = await stat(candidate).catch(() => null);
  if (info?.isDirectory()) return findFile(join(candidate, 'index.html'));
  if (info?.isFile()) return TYPES[extname(candidate)] ? candidate : null;
  if (!extname(candidate)) return findFile(`${candidate}.html`); // cleanUrls, like Firebase
  return null;
}

function reply(res, headers, status, body) {
  res.writeHead(status, { ...headers, 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(body);
}

async function handle(req, res, headers) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    reply(res, { ...headers, Allow: 'GET, HEAD' }, 405, 'Method not allowed');
    return;
  }
  let candidate;
  try {
    candidate = resolveRequestPath(req.url ?? '/');
  } catch {
    reply(res, headers, 400, 'Bad request');
    return;
  }
  const file = candidate && (await findFile(candidate));
  if (!file) {
    reply(res, headers, 404, 'Not found');
    return;
  }
  const body = await readFile(file);
  res.writeHead(200, { ...headers, 'Content-Type': TYPES[extname(file)], 'Cache-Control': 'no-cache' });
  res.end(req.method === 'HEAD' ? undefined : body);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const headers = await loadHeaders();
  createServer((req, res) => {
    handle(req, res, headers).catch(() => reply(res, headers, 500, 'Server error'));
  }).listen(PORT, HOST, () => {
    console.log(`Atlas of Wonder preview: http://${HOST}:${PORT}/`);
  });
}
