import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LANGUAGE_CODES } from '../public/js/i18n.js';
import {
  SEASON_IDS,
  SEASON_THEMES,
  SEASON_THEME_COLORS,
  SEASON_UI,
  getSeasonTheme,
  isSeasonId,
  resolveCalendarSeason,
} from '../public/js/seasons.js';

const seasonsCss = readFileSync(new URL('../public/css/seasons.css', import.meta.url), 'utf8');

test('defines all 25 seasonal and global/USA holiday themes with Day/Night meta colors', () => {
  assert.equal(SEASON_THEMES.length, 25);
  assert.equal(SEASON_THEMES.filter((t) => t.category === 'season').length, 4);
  assert.equal(SEASON_THEMES.filter((t) => t.category === 'holiday').length, 21);

  for (const id of SEASON_IDS) {
    assert.equal(isSeasonId(id), true);
    assert.ok(SEASON_THEME_COLORS[id]?.day, `missing day meta color for ${id}`);
    assert.ok(SEASON_THEME_COLORS[id]?.night, `missing night meta color for ${id}`);
    assert.match(seasonsCss, new RegExp(`data-season="${id}"`), `seasons.css missing selector for ${id}`);
  }
  assert.equal(isSeasonId('__proto__'), false);
  assert.equal(isSeasonId('unknown-holiday'), false);
});

test('localizes all 25 themes and picker UI across all 11 supported languages', () => {
  const uiKeys = Object.keys(SEASON_UI.en).sort();
  for (const lang of LANGUAGE_CODES) {
    assert.ok(SEASON_UI[lang], `missing SEASON_UI for ${lang}`);
    assert.deepEqual(Object.keys(SEASON_UI[lang]).sort(), uiKeys, `SEASON_UI keys mismatch for ${lang}`);
    for (const [k, val] of Object.entries(SEASON_UI[lang])) {
      assert.ok(typeof val === 'string' && val.trim().length > 0, `${lang}.${k} is empty`);
    }

    for (const theme of SEASON_THEMES) {
      assert.ok(theme.labels[lang]?.trim().length > 0, `missing ${lang} label for ${theme.id}`);
      assert.ok(theme.greetings[lang]?.trim().length > 0, `missing ${lang} greeting for ${theme.id}`);
    }
  }
});

test('resolveCalendarSeason accurately detects seasons and movable/fixed holidays', () => {
  // 4 Astronomical Seasons
  assert.equal(resolveCalendarSeason(new Date(2026, 3, 22)), 'spring');   // Apr 22, 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 6, 20)), 'summer');   // Jul 20, 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 10, 16)), 'fall');    // Nov 16, 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 0, 25)), 'winter');   // Jan 25, 2026

  // Global & USA Holidays
  assert.equal(resolveCalendarSeason(new Date(2026, 0, 1)), 'new-year');              // Jan 1
  assert.equal(resolveCalendarSeason(new Date(2026, 0, 19)), 'mlk-day');              // MLK Day 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 1, 17)), 'lunar-new-year');       // Chinese New Year 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 1, 16)), 'lunar-new-year');       // Chinese New Year's Eve 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 1, 14)), 'valentines');           // Feb 14
  assert.equal(resolveCalendarSeason(new Date(2027, 1, 15)), 'presidents-day');       // Presidents' Day 2027
  assert.equal(resolveCalendarSeason(new Date(2026, 2, 4)), 'holi');                  // Holi 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 2, 17)), 'st-patricks');          // St. Patrick's Day
  assert.equal(resolveCalendarSeason(new Date(2026, 3, 5)), 'easter');                // Easter 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 4, 10)), 'mothers-day');          // Mother's Day 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 4, 25)), 'memorial-day');         // Memorial Day 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 5, 19)), 'juneteenth');           // Juneteenth
  assert.equal(resolveCalendarSeason(new Date(2026, 5, 21)), 'fathers-day');          // Father's Day 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 6, 4)), 'independence-day');      // July 4th
  assert.equal(resolveCalendarSeason(new Date(2026, 8, 7)), 'labor-day');             // Labor Day 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 8, 25)), 'mid-autumn');           // Mid-Autumn 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 9, 12)), 'indigenous-peoples-day'); // Indigenous Peoples' Day 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 9, 31)), 'halloween');            // Halloween
  assert.equal(resolveCalendarSeason(new Date(2026, 10, 8)), 'diwali');               // Diwali 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 10, 11)), 'veterans-day');        // Veterans Day
  assert.equal(resolveCalendarSeason(new Date(2026, 10, 26)), 'thanksgiving');        // Thanksgiving 2026
  assert.equal(resolveCalendarSeason(new Date(2026, 11, 25)), 'christmas');           // Christmas
  assert.equal(getSeasonTheme('fall').id, 'fall');
});
