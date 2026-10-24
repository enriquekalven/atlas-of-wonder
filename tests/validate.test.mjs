import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedUrl, validateCreation } from '../public/js/validate.js';

const options = { audiences: ['kids', 'students', 'parents', 'clinicians'] };

function goodFixture() {
  return {
    id: 'demo-world',
    title: 'Demo World',
    kind: '3D demo',
    url: 'https://demo-world.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'cosmic',
    description: 'A small demo world.',
    facts: ['One fact'],
    audiences: ['kids'],
    image: { src: 'assets/tiles/demo-world.webp', alt: 'Demo screenshot', width: 1200, height: 750 },
  };
}

test('a known-good fixture is valid', () => {
  assert.deepEqual(validateCreation(goodFixture(), options), []);
});

test('a coming-soon fixture may omit url and facts', () => {
  const c = { ...goodFixture(), status: 'coming-soon', facts: [] };
  delete c.url;
  assert.deepEqual(validateCreation(c, options), []);
});

// Verify the verifier: each broken fixture must be rejected for the right reason.
const BROKEN = [
  ['plain http', (c) => { c.url = 'http://demo-world.web.app/'; }, /url/],
  ['javascript: scheme', (c) => { c.url = 'javascript:alert(1)'; }, /url/],
  ['data: scheme', (c) => { c.url = 'data:text/html,hi'; }, /url/],
  ['credentials in url', (c) => { c.url = 'https://user:pass@demo-world.web.app/'; }, /url/],
  ['custom port', (c) => { c.url = 'https://demo-world.web.app:8443/'; }, /url/],
  ['third-party host', (c) => { c.url = 'https://example.com/'; }, /url/],
  ['lookalike host', (c) => { c.url = 'https://web.app.example.com/'; }, /url/],
  ['live without url', (c) => { delete c.url; }, /url is required/],
  ['bad id', (c) => { c.id = 'Demo World'; }, /id/],
  ['blank title', (c) => { c.title = '   '; }, /title/],
  ['overlong description', (c) => { c.description = 'x'.repeat(241); }, /description/],
  ['unknown status', (c) => { c.status = 'beta'; }, /status/],
  ['unknown size', (c) => { c.size = 'huge'; }, /size/],
  ['unknown accent', (c) => { c.accent = 'purple'; }, /accent/],
  ['unknown audience', (c) => { c.audiences = ['aliens']; }, /audiences/],
  ['no audience', (c) => { c.audiences = []; }, /audiences/],
  ['duplicate audience', (c) => { c.audiences = ['kids', 'kids']; }, /duplicates/],
  ['too many facts', (c) => { c.facts = ['a', 'b', 'c', 'd', 'e']; }, /facts/],
  ['non-string fact', (c) => { c.facts = [42]; }, /facts/],
  ['image path traversal', (c) => { c.image.src = 'assets/../secrets.webp'; }, /image\.src/],
  ['absolute image url', (c) => { c.image.src = 'https://example.com/x.webp'; }, /image\.src/],
  ['missing alt text', (c) => { c.image.alt = ''; }, /image\.alt/],
  ['fractional width', (c) => { c.image.width = 10.5; }, /image\.width/],
  ['missing image', (c) => { delete c.image; }, /image is required/],
];

for (const [name, breakIt, expected] of BROKEN) {
  test(`rejects: ${name}`, () => {
    const fixture = goodFixture();
    breakIt(fixture);
    const errors = validateCreation(fixture, options);
    assert.ok(errors.some((e) => expected.test(e)), `expected ${expected}, got ${JSON.stringify(errors)}`);
  });
}

test('rejects non-object entries', () => {
  for (const entry of [null, undefined, 'tile', 42]) {
    assert.deepEqual(validateCreation(entry, options), ['entry must be an object']);
  }
});

test('isAllowedUrl accepts only https on allowed hosts', () => {
  assert.equal(isAllowedUrl('https://cosmic-explorer-universe.web.app/'), true);
  assert.equal(isAllowedUrl('https://my-app.firebaseapp.com/path?q=1'), true);
  for (const bad of ['https://web.app/', 'https://evil.com/?x=.web.app', 'not a url', '', undefined, 42]) {
    assert.equal(isAllowedUrl(bad), false, String(bad));
  }
});
