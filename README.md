# Atlas of Wonder

*Interactive worlds for curious minds, from a first heartbeat to the edge of the universe.*

A tile portal for Enrique Chan's learning projects. It's a static site with no build step and no dependencies.

| Tile | Status (checked 2026-10-21) |
|---|---|
| [Cosmic Explorer 3D](https://cosmic-explorer-universe.web.app/) | Live (feature tile) |
| [Human Body 3D Atlas](https://human-body-atlas.web.app/) | Live |
| [Curious Little Minds](https://curious-little-minds.web.app/) | Live |
| [SafeKids Portal](https://safe-kids.web.app/) | Live |
| Prenatal Clinical Atlas | **Not live yet**: `prenatal-clinical-atlas.web.app` returns Firebase "Site Not Found" |

## Run it

```bash
npm start            # preview at http://127.0.0.1:5173 (same security headers as production)
npm test             # 45 offline tests: data, validator, security hardening
npm run check:links  # live check: every URL vs. its declared status (needs network)
```

You need Node 20 or newer. There's nothing to install.

## What the visitor can do

- **Show worlds for**: Everyone, Kids, Students, Parents or Clinicians. Tiles that don't match are dimmed rather than hidden, so the layout never jumps. The choice is kept in the URL (`?for=kids`), so you can share a filtered view.
- **Explorer passport**: opening a world stamps its tile "Visited" (the stamp lands when you come back to the tab). The counter shows "2 of 4 worlds explored". Stamps stay in this browser only, and there's a Reset link.
- **Day / Night**: follows the system setting until the visitor picks one.

## Add a new creation

1. Add a screenshot to `public/assets/tiles/` (WebP, about 1200×750; portrait 900×1200 for a `tall` tile).
2. Append an entry to `public/js/creations.js`.
3. Add its link to the `<noscript>` list in `public/index.html`. A test fails if the two drift apart.
4. Run `npm test` and `npm run check:links`.

Links must be `https://` on `*.web.app` or `*.firebaseapp.com`, so a typo or pasted third-party link can't reach kids. To use a custom domain, add it to `ALLOWED_HOST_SUFFIXES` in `public/js/validate.js`.

## When the Prenatal Clinical Atlas goes live

`npm run check:links` will print `ACTION ... it's live now`. Then, in `creations.js`:

1. Set `status: 'live'`.
2. Replace the placeholder SVG with a real screenshot.
3. Add 1–3 facts and confirm the description. The current one-liner is inferred from the name only.
4. Add its link to the `<noscript>` list.

## Deploy (Firebase Hosting)

Use your **personal** Firebase project, the same one that hosts the other kids' sites, not a work account.

```bash
firebase login
firebase use --add                              # pick your personal project
firebase hosting:sites:create atlas-of-wonder   # optional: gives you atlas-of-wonder.web.app
firebase target:apply hosting portal atlas-of-wonder
# then add  "target": "portal"  inside "hosting" in firebase.json
npm run deploy                                  # runs the tests first, then deploys
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
firebase.json           hosting config + security headers
```

## Credits

Tile images are screenshots of each project. Space imagery: NASA & ESO. Anatomy model: BodyParts3D © DBCLS & NIH HuBMAP, CC BY 4.0.
