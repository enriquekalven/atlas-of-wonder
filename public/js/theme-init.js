// Runs synchronously in <head> (external file, so the strict CSP needs no
// 'unsafe-inline') to apply saved language and Day/Night choice before first paint.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var allowedLangs = { en: 1, es: 1, zh: 1, yue: 1, ja: 1, ko: 1, pt: 1, fr: 1, it: 1, de: 1, ar: 1 };
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
    if (chosenLang) {
      root.setAttribute('lang', chosenLang);
      root.setAttribute('dir', chosenLang === 'ar' ? 'rtl' : 'ltr');
    }
  } catch (err) {
    // Storage or URLSearchParams unavailable: keep default lang="en".
  }
  try {
    var saved = window.localStorage.getItem('aow-theme');
    if (saved === 'day' || saved === 'night') root.setAttribute('data-theme', saved);
  } catch (err) {
    // Storage blocked (private mode, policy): fall back to the system theme.
  }
  try {
    var allowedSeasons = {
      spring: 1, summer: 1, fall: 1, winter: 1, 'new-year': 1, 'mlk-day': 1,
      'lunar-new-year': 1, valentines: 1, 'presidents-day': 1, holi: 1,
      'st-patricks': 1, easter: 1, 'mothers-day': 1, 'memorial-day': 1,
      juneteenth: 1, 'fathers-day': 1, 'independence-day': 1, 'labor-day': 1,
      'mid-autumn': 1, 'indigenous-peoples-day': 1, halloween: 1, diwali: 1,
      'veterans-day': 1, thanksgiving: 1, christmas: 1
    };
    var paramSeason = new URLSearchParams(window.location.search).get('season');
    var storedSeason = window.localStorage.getItem('aow-season');
    if (paramSeason && allowedSeasons[paramSeason]) {
      root.setAttribute('data-season', paramSeason);
    } else if (storedSeason && allowedSeasons[storedSeason]) {
      root.setAttribute('data-season', storedSeason);
    } else {
      var m = new Date().getMonth() + 1;
      var d = new Date().getDate();
      var approx = (m === 3 && d >= 20) || m === 4 || m === 5 || (m === 6 && d <= 19)
        ? 'spring'
        : (m === 6 && d >= 20) || m === 7 || m === 8 || (m === 9 && d <= 21)
          ? 'summer'
          : (m === 9 && d >= 22) || m === 10 || m === 11 || (m === 12 && d <= 20)
            ? 'fall'
            : 'winter';
      root.setAttribute('data-season', approx);
    }
  } catch (err) {
    // Fallback if storage or URLSearchParams is unavailable.
  }
})();
