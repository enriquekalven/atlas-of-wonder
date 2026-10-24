import { test } from 'node:test';
import assert from 'node:assert/strict';
import { AUDIENCES, CREATIONS } from '../public/js/creations.js';
import {
  CREATION_TRANSLATIONS,
  DEFAULT_LANG,
  LANGUAGES,
  LANGUAGE_CODES,
  UI_STRINGS,
  isSupportedLanguage,
  localizeCreation,
  matchLanguageTag,
  resolveLanguage,
} from '../public/js/i18n.js';
import { validateCreation } from '../public/js/validate.js';

const audiences = Object.keys(AUDIENCES);
const expectedCodes = ['en', 'es', 'zh', 'ja', 'ko', 'fr'];

test('supports all 6 requested languages (en, es, zh, ja, ko, fr)', () => {
  assert.deepEqual(LANGUAGE_CODES, expectedCodes);
  for (const entry of LANGUAGES) {
    assert.ok(entry.label.trim().length > 0);
    assert.ok(entry.nativeName.trim().length > 0);
    // WCAG 2.5.3 Label in Name: accessible name starts with the visible button label.
    assert.ok(
      entry.ariaLabel.startsWith(entry.label),
      `${entry.code}: ariaLabel "${entry.ariaLabel}" must start with visible label "${entry.label}"`,
    );
  }
});

test('UI_STRINGS has complete key parity and non-empty strings across all 6 languages', () => {
  const enKeys = Object.keys(UI_STRINGS.en).sort();
  for (const lang of LANGUAGE_CODES) {
    const bundle = UI_STRINGS[lang];
    assert.ok(bundle, `missing UI_STRINGS for ${lang}`);
    assert.deepEqual(Object.keys(bundle).sort(), enKeys, `${lang} keys differ from en`);

    for (const [key, value] of Object.entries(bundle)) {
      if (typeof value === 'string') {
        assert.ok(value.trim().length > 0, `${lang}.${key} is empty`);
      }
    }

    assert.deepEqual(Object.keys(bundle.audiences).sort(), [...audiences].sort());
    assert.deepEqual(Object.keys(bundle.audienceNouns).sort(), [...audiences].sort());
    for (const aud of audiences) {
      assert.ok(bundle.audiences[aud].trim().length > 0, `${lang}.audiences.${aud} is empty`);
      assert.ok(bundle.audienceNouns[aud].trim().length > 0, `${lang}.audienceNouns.${aud} is empty`);
    }

    assert.ok(bundle.formatSummary(4, 1).includes('4'));
    assert.ok(bundle.formatAudiencePhrase(['kids', 'students']).length > 0);
    assert.ok(bundle.formatFilterStatus('all', 5, 5).includes('5'));
    assert.ok(bundle.formatFilterStatus('kids', 3, 5).includes('3'));
    assert.ok(bundle.formatPassport(2, 4).includes('2'));
    assert.ok(bundle.formatPassport(4, 4).includes('4'));
  }
});

test('every creation has valid localized data in all 6 languages', () => {
  for (const creation of CREATIONS) {
    for (const lang of LANGUAGE_CODES) {
      if (lang !== DEFAULT_LANG) {
        assert.ok(
          CREATION_TRANSLATIONS[creation.id]?.[lang],
          `missing ${lang} translation for creation "${creation.id}"`,
        );
      }
      const localized = localizeCreation(creation, lang);
      assert.deepEqual(
        validateCreation(localized, { audiences }),
        [],
        `${creation.id} (${lang}) failed validation`,
      );
      assert.equal(localized.facts.length, creation.facts.length, `${creation.id} (${lang}) fact count mismatch`);
    }
  }
});

test('resolveLanguage enforces allow-list precedence and rejects untrusted input', () => {
  assert.equal(resolveLanguage({ search: '?lang=es', stored: 'fr', navigatorLanguages: ['ja-JP'] }), 'es');
  assert.equal(resolveLanguage({ search: '?lang=zh', stored: null, navigatorLanguages: [] }), 'zh');
  assert.equal(resolveLanguage({ search: '?lang=ja', stored: null, navigatorLanguages: [] }), 'ja');
  assert.equal(resolveLanguage({ search: '?lang=ko', stored: null, navigatorLanguages: [] }), 'ko');
  assert.equal(resolveLanguage({ search: '?lang=fr', stored: null, navigatorLanguages: [] }), 'fr');

  // Invalid query param falls back to stored preference, then navigatorLanguages, then en.
  assert.equal(resolveLanguage({ search: '?lang=<script>', stored: 'ko', navigatorLanguages: ['es-MX'] }), 'ko');
  assert.equal(resolveLanguage({ search: '?lang=de', stored: 'invalid', navigatorLanguages: ['pt-BR', 'ja-JP'] }), 'ja');
  assert.equal(resolveLanguage({ search: '', stored: null, navigatorLanguages: ['zh-Hant-HK', 'en-US'] }), 'zh');
  assert.equal(resolveLanguage({ search: '', stored: null, navigatorLanguages: ['de-DE', 'it-IT'] }), 'en');
  assert.equal(resolveLanguage({}), 'en');

  assert.equal(isSupportedLanguage('es'), true);
  assert.equal(isSupportedLanguage('de'), false);
  assert.equal(isSupportedLanguage('__proto__'), false);
  assert.equal(matchLanguageTag('fr-CA'), 'fr');
  assert.equal(matchLanguageTag('ko_KR'), 'ko');
  assert.equal(matchLanguageTag('de-DE'), null);
});
