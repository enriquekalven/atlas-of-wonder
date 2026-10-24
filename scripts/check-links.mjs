#!/usr/bin/env node
// Checks every tile URL against its declared status. Needs the network, so it
// is NOT part of the offline `npm test` suite. Usage: npm run check:links
//
//   live        -> must answer HTTP 200, otherwise exit code 1
//   coming-soon -> 404 is expected; a 200 means "flip it to live"
//
// A timeout or DNS failure is reported as UNVERIFIED, never as dead:
// only an HTTP 404 proves a site is missing.
import { fileURLToPath } from 'node:url';
import { CREATIONS } from '../public/js/creations.js';

const TIMEOUT_MS = 15_000;

async function probe(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS) });
    const body = await res.text();
    return { status: res.status, siteNotFound: body.includes('<title>Site Not Found</title>') };
  } catch (error) {
    return { status: null, error: error.name };
  }
}

/** Pure decision logic, exported so the test suite can cover every branch. */
export function verdict(status, result) {
  if (result.status === null) {
    return { level: 'UNVERIFIED', fail: false, note: `request failed (${result.error}); not proof the site is down` };
  }
  const missing = result.siteNotFound ? 'Firebase "Site Not Found" (nothing deployed)' : `HTTP ${result.status}`;
  if (status === 'live') {
    return result.status === 200
      ? { level: 'OK', fail: false, note: 'HTTP 200' }
      : { level: 'FAIL', fail: true, note: `${missing}; fix the site or set status: 'coming-soon'` };
  }
  if (result.status === 200) {
    return { level: 'ACTION', fail: false, note: "HTTP 200: it's live now, set status: 'live' and add a screenshot" };
  }
  return { level: 'OK', fail: false, note: `${missing}, as expected for coming-soon` };
}

async function main() {
  const rows = await Promise.all(
    CREATIONS.filter((c) => c.url).map(async (c) => ({ c, v: verdict(c.status, await probe(c.url)) })),
  );
  for (const { c, v } of rows) console.log(`${v.level.padEnd(10)} ${c.title.padEnd(26)} ${c.url}  ${v.note}`);
  process.exitCode = rows.some(({ v }) => v.fail) ? 1 : 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
