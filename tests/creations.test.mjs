import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { AUDIENCES, CREATIONS } from '../public/js/creations.js';
import { validateCreation } from '../public/js/validate.js';

const audiences = Object.keys(AUDIENCES);

test('every creation passes validation', () => {
  for (const creation of CREATIONS) {
    assert.deepEqual(validateCreation(creation, { audiences }), [], `${creation.id} is invalid`);
  }
});

test('creation ids are unique', () => {
  const ids = CREATIONS.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every tile image exists on disk', () => {
  for (const { id, image } of CREATIONS) {
    assert.ok(existsSync(new URL(`../public/${image.src}`, import.meta.url)), `${id}: missing ${image.src}`);
  }
});

test('the bento layout has exactly one feature tile', () => {
  assert.equal(CREATIONS.filter((c) => c.size === 'feature').length, 1);
});

test('every audience filter matches at least one creation', () => {
  for (const key of audiences) {
    assert.ok(CREATIONS.some((c) => c.audiences.includes(key)), `no creation for "${key}"`);
  }
});

test('coming-soon tiles carry no highlight facts (nothing unverified)', () => {
  for (const c of CREATIONS.filter((entry) => entry.status === 'coming-soon')) {
    assert.deepEqual(c.facts, [], `${c.id} lists facts before it is live`);
  }
});
