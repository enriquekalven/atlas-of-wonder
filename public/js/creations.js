/**
 * The single source of truth for the portal tiles.
 *
 * Facts below were checked against each live site and local project on 2026-10-23.
 * To add a creation: append an entry, drop its image in assets/tiles/,
 * then run `npm test` (it validates every field) and `npm run check:links`.
 *
 * size:   'feature' (big), 'tall' (portrait) or 'standard'
 * status: 'live' renders a link; 'coming-soon' renders a "Not live yet" tile
 */

export const AUDIENCES = Object.freeze({
  kids: 'Kids',
  students: 'Students',
  parents: 'Parents',
  clinicians: 'Clinicians',
});

export const CREATIONS = Object.freeze([
  {
    id: 'cosmic-explorer',
    title: 'Cosmic Explorer 3D',
    kind: '3D universe',
    url: 'https://cosmic-explorer-universe.web.app/',
    status: 'live',
    size: 'feature',
    accent: 'cosmic',
    description:
      'Fly from Earth and the Moon past the Voyager probes to nearby exoplanets, the Milky Way and the edge of the observable universe, with real NASA and ESO imagery.',
    facts: ['6,451 exoplanets', 'Guided tour', 'Space quiz'],
    audiences: ['kids', 'students'],
    image: {
      src: 'assets/tiles/cosmic-explorer.webp',
      alt: 'Cosmic Explorer 3D showing Earth from space, with the International Space Station labeled, against a field of stars.',
      width: 1600,
      height: 900,
    },
  },
  {
    id: 'human-body-atlas',
    title: 'Human Body 3D Atlas',
    kind: '3D anatomy',
    url: 'https://human-body-atlas.web.app/',
    status: 'live',
    size: 'tall',
    accent: 'anatomy',
    description:
      'Realistic 3D anatomy you can peel back layer by layer: skin, muscles, skeleton, organs, brain and nerves, with live blood flow.',
    facts: ['2,225 named structures', 'Kids & clinical modes', 'EN · ES · 中文'],
    audiences: ['kids', 'students', 'clinicians'],
    image: {
      src: 'assets/tiles/human-body-atlas.webp',
      alt: 'Human Body 3D Atlas showing a standing 3D figure with its muscles and skeleton visible.',
      width: 900,
      height: 1200,
    },
  },
  {
    id: 'timeline-of-everything-3d',
    title: 'ChronoVerse 3D',
    kind: '3D deep-time timeline',
    // Not deployed yet: it only runs as a local preview (http://127.0.0.1:8090/).
    // To go live, add its https url, set status: 'live', and restore its facts here and in i18n.js.
    status: 'coming-soon',
    size: 'standard',
    accent: 'chronoverse',
    description:
      'Fly through 13.8 billion years of history across 30 3D dioramas — from the Big Bang and Pangaea splitting into seven continents to dinosaurs, human evolution and Year 3000.',
    facts: [],
    audiences: ['kids', 'students'],
    image: {
      src: 'assets/tiles/timeline-of-everything-3d.webp',
      alt: 'ChronoVerse 3D scene of the newborn Sun and molten proto-Earth glowing inside a swirling solar nebula.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'dino-portal-3d',
    title: 'DinoVerse 3D',
    kind: '3D paleontology & fossils',
    url: 'https://dino-portal-3d.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'dino',
    description:
      'Explore 29 prehistoric species across six geological eras with 3-layer 3D X-ray dissection, bio-acoustic dinosaur calls, Chirp 3 HD read-alouds and a 66 MYA Chicxulub impact lab.',
    facts: ['29 prehistoric species', '3-layer 3D X-ray', 'Chicxulub impact lab'],
    audiences: ['kids', 'students'],
    image: {
      src: 'assets/tiles/dino-portal-3d.webp',
      alt: 'DinoVerse 3D showing a 3D Tyrannosaurus rex with detailed scales and teeth on a glowing turntable.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'inside-out-studio',
    title: 'Inside Out Studio',
    kind: '3D engineering & CAD lab',
    url: 'https://inside-out-explorer.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'studio',
    description:
      'Explode and test-drive iconic real-world machines across 18 categories — supercars, airliners, submarines, rockets, Mars rovers, bullet trains and mechanical watches.',
    facts: ['18 machine categories', '5 interactive modes', 'Drive, fly & launch'],
    audiences: ['kids', 'students'],
    image: {
      src: 'assets/tiles/inside-out-studio.webp',
      alt: 'Inside Out Studio 3D exploded view of a red Ferrari SF90 Stradale revealing its twin-turbo V8 engine and hybrid motors.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'take-it-apart',
    title: 'Take It Apart!',
    kind: '3D exploded-view workshop',
    // Not deployed yet: it only runs as a local preview (http://127.0.0.1:4173/).
    // To go live, add its https url, set status: 'live', and restore its facts here and in i18n.js.
    status: 'coming-soon',
    size: 'standard',
    accent: 'storybook',
    description:
      'Pull apart seven everyday machines with Bolt the robot — car, house, jet engine, iPhone, laptop, TV and airplane — then race the clock to snap every piece back home.',
    facts: [],
    audiences: ['kids'],
    image: {
      src: 'assets/tiles/take-it-apart.webp',
      alt: 'Take It Apart 3D exploded view of a red car with floating name tags on the engine, hood, seats, battery and wheels.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'curious-little-minds',
    title: 'Curious Little Minds',
    kind: 'Picture books & read-alouds',
    url: 'https://curious-little-minds.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'storybook',
    description:
      'Cozy watercolor bedtime stories that make AI make sense, starting with Lily & Robo: Day & Night Adventures.',
    facts: ['Ages 3–7', 'EN · ES · 中文', 'Free read-alouds'],
    audiences: ['kids', 'parents'],
    image: {
      src: 'assets/tiles/curious-little-minds.webp',
      alt: 'Cover of Lily & Robo: Day & Night Adventures, a watercolor picture book with a girl and a small round robot under a starry sky.',
      width: 960,
      height: 600,
    },
  },
  {
    id: 'safekids-portal',
    title: 'SafeKids Portal',
    kind: 'Parent guide',
    url: 'https://safe-kids.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'safekids',
    description:
      'A calm, research-backed guide for parents: low-stimulus shows, ad-free games, whole-food swaps and screen-free audio, filtered by your child’s age.',
    facts: ['119 curated picks', 'Ages 0–12', '30 studies cited'],
    audiences: ['parents'],
    image: {
      src: 'assets/tiles/safekids-portal.webp',
      alt: 'Illustration from SafeKids Portal: a child builds with wooden blocks next to a screen-free audio player and a stack of picture books.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'prenatal-clinical-atlas',
    title: 'Prenatal Clinical Atlas',
    kind: 'Clinical OB/GYN & embryology',
    url: 'https://prenatal-clinical-atlas.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'prenatal',
    description:
      'ACOG-aligned conception-to-birthday clinical reference spanning Weeks 1–42 with 3D embryology, Doppler heartbeat audio, 15-visit care roadmap and symptom triage.',
    facts: ['Weeks 1–42', '3D · Photo · SVG', '8 languages'],
    audiences: ['parents', 'clinicians'],
    image: {
      src: 'assets/tiles/prenatal-clinical-atlas.webp',
      alt: 'Prenatal Clinical Atlas showing a third-trimester fetus curled peacefully in utero next to the placenta and umbilical cord.',
      width: 1200,
      height: 750,
    },
  },
]);
