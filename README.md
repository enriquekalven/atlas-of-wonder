# Atlas of Wonder

*Interactive worlds for curious minds, from a first heartbeat to the edge of the universe.*

A tile portal for Enrique Chan's learning projects, live at **https://atlas-of-wonder.web.app**. It's a static site with no build step and no dependencies.

| Tile | Status (checked 2026-10-23) |
|---|---|
| [Cosmic Explorer 3D](https://cosmic-explorer-universe.web.app/) | Live (feature tile) |
| [Human Body 3D Atlas](https://human-body-atlas.web.app/) | Live |
| ChronoVerse 3D | **Not live yet**: only runs as a local preview |
| [DinoVerse 3D](https://dino-portal-3d.web.app/) | Live |
| [Inside Out Studio](https://inside-out-explorer.web.app/) | Linked, but nothing is deployed there yet (Firebase "Site Not Found") |
| Take It Apart! | **Not live yet**: only runs as a local preview |
| [Curious Little Minds](https://curious-little-minds.web.app/) | Live |
| [SafeKids Portal](https://safe-kids.web.app/) | Live |
| [Prenatal Clinical Atlas](https://prenatal-clinical-atlas.web.app/) | Live |

## Run it

```bash
npm start            # preview at http://127.0.0.1:5173 (same security headers as production)
npm test             # 50 offline tests: data, validator, security hardening
npm run check:links  # live check: every URL vs. its declared status (needs network)
```

You need Node 20 or newer. There's nothing to install.

## What the visitor can do

- **Languages (9)**: switch between English (`en`), Español (`es`), 中文 (`zh`), 粵語 (`yue`), 日本語 (`ja`), 한국어 (`ko`), Português (`pt`), Français (`fr`), and Italiano (`it`) — matching the union of all languages across the sibling apps. Auto-detects from `?lang=`, saved preference, or browser locale (`zh-HK` / `yue` resolves to Cantonese).
- **Show worlds for**: Everyone, Kids, Students, Parents or Clinicians. Tiles that don't match are dimmed rather than hidden, so the layout never jumps. The choice is kept in the URL (`?for=kids`), so you can share a filtered view.
- **Explorer passport**: opening a world stamps its tile "Visited" (the stamp lands when you come back to the tab). The counter shows "2 of 6 worlds explored". Stamps stay in this browser only, and there's a Reset link.
- **Day / Night**: follows the system setting until the visitor picks one.

## Add a new creation

1. Add a screenshot to `public/assets/tiles/` (WebP, about 1200×750; portrait 900×1200 for a `tall` tile).
2. Append an entry to `public/js/creations.js` and its translations in `public/js/i18n.js`.
3. Add its link to the `<noscript>` list in `public/index.html`. A test fails if the two drift apart.
4. Run `npm test` and `npm run check:links`.

Links must be `https://` on `*.web.app` or `*.firebaseapp.com`, so a typo or pasted third-party link can't reach kids. To use a custom domain, add it to `ALLOWED_HOST_SUFFIXES` in `public/js/validate.js`.

## When a "Not live yet" creation goes live

ChronoVerse 3D and Take It Apart! only run as local previews for now. Once one is on Firebase Hosting:

1. In `creations.js`, add its `https://` url, set `status: 'live'` and add 1–3 facts. The comment on the entry has its old preview address.
2. Add the same number of facts to each of its eight translations in `i18n.js`. A test checks that the counts match.
3. Add its link to the `<noscript>` list in `public/index.html`.
4. Run `npm test` and `npm run check:links`.

A live tile can't link to a preview server on your Mac (`http://127.0.0.1:...`): that's a dead link for every visitor, and a test blocks it.

## Deploy (Firebase Hosting)

The repo is already set up: `.firebaserc` points at your **personal** Firebase project, `project-maui` (the one that hosts the other kids' sites), and `firebase.json` deploys to the `atlas-of-wonder` site.

```bash
firebase login     # once, with your personal Google account (not a work account)
npm run deploy     # runs the tests first, then deploys to https://atlas-of-wonder.web.app
```

Once you know the final URL, add `og:image` and `og:url` meta tags (they must be absolute URLs) for nicer link previews.

## Security

- **Strict CSP** (`default-src 'none'`, self-only scripts, styles and images) sent as a header in `firebase.json` and mirrored in a `<meta>` tag. A test keeps the two in sync.
- **No inline code**: no inline scripts, styles or event handlers. The theme pre-paint script is an external file.
- **XSS-safe rendering**: all DOM is built with `createElement` and `textContent`. A test fails on `innerHTML`, `document.write`, `eval`, `alert` or `confirm`.
- **Clickjacking and sniffing**: `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, a locked-down `Permissions-Policy`, and HSTS.
- **Storage**: only the theme choice and visited-tile ids. When read back, entries are validated against the live tile ids. No accounts, no cookies, no analytics.
- **Preview server**: binds to `127.0.0.1` only, serves GET/HEAD for known file types, and rejects path traversal, dotfiles and null bytes. All of this is covered by tests.

To add analytics later, add your GA4 ID and extend the CSP in **both** `firebase.json` and the `<meta>` tag. The test will remind you if you only change one.

## Rename the portal

The name appears in `public/index.html` in three places: `<title>`, `og:title` and the `<h1>`.

## Layout

```
public/
  index.html            page shell + no-JS fallback
  css/styles.css        tokens (light-dark), bento grid, states
  js/creations.js       ← edit this to add or change tiles
  js/validate.js        shared validator (browser fails closed, tests enforce)
  js/app.js             rendering, filter, passport, theme
  js/theme-init.js      applies the saved theme before first paint
  assets/               favicon + tile images
scripts/serve.mjs       local preview server
scripts/check-links.mjs live link checker
tests/                  node:test suites
firebase.json           hosting config + security headers (deploys to the atlas-of-wonder site)
.firebaserc             Firebase project: project-maui
```

## Credits

Tile images are screenshots of each project. Space imagery: NASA & ESO. Anatomy model: BodyParts3D © DBCLS & NIH HuBMAP, CC BY 4.0.
