// Runs synchronously in <head> (external file, so the strict CSP needs no
// 'unsafe-inline') to apply saved language and Day/Night choice before first paint.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var allowedLangs = { en: 1, es: 1, zh: 1, ja: 1, ko: 1, fr: 1 };
  try {
    var paramLang = new URLSearchParams(window.location.search).get('lang');
    var storedLang = window.localStorage.getItem('aow-lang');
    var chosenLang = null;
    if (paramLang && allowedLangs[paramLang]) {
      chosenLang = paramLang;
    } else if (storedLang && allowedLangs[storedLang]) {
      chosenLang = storedLang;
    } else if (Array.isArray(window.navigator.languages)) {
      for (var i = 0; i < window.navigator.languages.length; i++) {
        var primary = String(window.navigator.languages[i] || '').toLowerCase().split(/[-_]/)[0];
        if (allowedLangs[primary]) {
          chosenLang = primary;
          break;
        }
      }
    }
    if (chosenLang) root.setAttribute('lang', chosenLang);
  } catch (err) {
    // Storage or URLSearchParams unavailable: keep default lang="en".
  }
  try {
    var saved = window.localStorage.getItem('aow-theme');
    if (saved === 'day' || saved === 'night') root.setAttribute('data-theme', saved);
  } catch (err) {
    // Storage blocked (private mode, policy): fall back to the system theme.
  }
})();
