/**
 * The single source of truth for the portal tiles.
 *
 * Facts below were checked against each live site and local project on 2026-10-23;
 * ChronoVerse 3D, DinoVerse 3D and Human Body 3D Atlas were re-checked, and Dragon Ball 3D Portal,
 * One Piece Grand Line Atlas and PokéVerse 3D were checked, on 2026-11-07;
 * Shinobi World Atlas and Hominin Atlas were checked on 2026-11-12.
 * To add a creation: append an entry, drop its image in assets/tiles/,
 * then run `npm test` (it validates every field) and `npm run check:links`.
 *
 * size:   'feature' (big), 'tall' (portrait) or 'standard'
 * status: 'live' renders a link; 'coming-soon' renders a "Not live yet" tile
 * section: the themed shelf it sits on: 'explore', 'play' or 'grow' (see SECTIONS in validate.js)
 */

/** Accent color for each section's heading and jump-bar link. */
export const SECTION_ACCENTS = Object.freeze({
  explore: 'cosmic',
  play: 'pokeverse',
  grow: 'safekids',
});

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
    section: 'explore',
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
    section: 'explore',
    description:
      'Realistic 3D anatomy you can peel back layer by layer: skin, muscles, skeleton, organs, brain and nerves, with live blood flow.',
    facts: ['2,225 named structures', 'Kids & clinical modes', '11 languages'],
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
    url: 'https://chronoverse-3d.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'chronoverse',
    section: 'explore',
    description:
      'Fly through 13.8 billion years of history across 30 3D dioramas — from the Big Bang and Pangaea splitting into seven continents to dinosaurs, human evolution and Year 3000.',
    facts: ['30 3D dioramas', '13.8B YA → 3000 CE', 'Pangaea Split Lab'],
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
    section: 'explore',
    description:
      'Explore 74 prehistoric species across six geological eras with 3-layer 3D X-ray dissection, bio-acoustic dinosaur calls, Chirp 3 HD read-alouds and a 66 MYA Chicxulub impact lab.',
    facts: ['74 prehistoric species', '3-layer 3D X-ray', 'Chicxulub impact lab'],
    audiences: ['kids', 'students'],
    image: {
      src: 'assets/tiles/dino-portal-3d.webp',
      alt: 'DinoVerse 3D showing a 3D Tyrannosaurus rex with detailed scales and teeth on a glowing turntable.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'hominin-atlas',
    title: 'Hominin Atlas',
    kind: '3D human evolution & fossils',
    url: 'https://hominin-atlas.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'hominin',
    section: 'explore',
    description:
      'Explore 21 hominin and hominid species across 7 million years in 3D: compare skeletons, museum fossil scans and lifelike portraits, and scrub 31 real bone injuries as they heal.',
    facts: ['21 hominin & hominid taxa', '31 fossil bone lesions', '13 languages'],
    audiences: ['kids', 'students', 'clinicians'],
    image: {
      src: 'assets/tiles/hominin-atlas.webp',
      alt: 'Hominin Atlas home page showing a 3D Neanderthal skeleton with amber injury markers beside a lifelike portrait and a 7-million-year human evolution timeline.',
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
    section: 'explore',
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
    id: 'dragonball-3d-portal',
    title: 'Dragon Ball 3D Portal',
    kind: '3D anime multiverse',
    url: 'https://dragonball-3d-portal.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'dragonball',
    section: 'play',
    description:
      'Power up 25 fighters through their canon transformations in 3D, fuse heroes in the Capsule Corp lab, battle head-to-head, hunt all seven Dragon Balls and follow the story from Dragon Ball to Super.',
    facts: ['25 fighters', 'Fusion lab & VS battles', '13 languages'],
    audiences: ['kids'],
    image: {
      src: 'assets/tiles/dragonball-3d-portal.webp',
      alt: 'Dragon Ball 3D Portal showing a 3D Son Goku powering up in a blazing orange aura on a glowing arena grid, with a Dragon Ball floating beside him.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'onepiece-grand-line-atlas',
    title: 'One Piece Grand Line Atlas',
    kind: '3D anime world atlas',
    url: 'https://onepiece-grand-line-atlas.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'onepiece',
    section: 'play',
    description:
      'Spin a 3D globe of the Grand Line, sail the Log Pose timeline, meet 38 characters on their Vivre Cards, build a dream pirate crew and collect Devil Fruits, with a spoiler shield for every era.',
    facts: ['38 characters', 'Spoiler-safe eras', '11 languages'],
    audiences: ['kids'],
    image: {
      src: 'assets/tiles/onepiece-grand-line-atlas.webp',
      alt: 'One Piece Grand Line Atlas showing a 3D globe crossed by the Red Line and the Grand Line, with labeled seas and islands such as East Blue, Alabasta and Skypiea.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'pokeverse-3d-atlas',
    title: 'PokéVerse 3D',
    kind: '3D Pokédex & flashcards',
    url: 'https://pokeverse-3d-atlas.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'pokeverse',
    section: 'play',
    description:
      'Browse all 1,025 Pokémon across nine generations and 18 types, spin evolutions and forms in a 3D viewer, hear their cries, and test what you know with flashcards and quizzes.',
    facts: ['1,025 Pokémon', '9 generations', '11 languages'],
    audiences: ['kids'],
    image: {
      src: 'assets/tiles/pokeverse-3d-atlas.webp',
      alt: 'PokéVerse 3D home page with Pikachu on a glowing 3D stage next to a grid of Pokémon cards, from Bulbasaur and Charmander to Squirtle and Butterfree.',
      width: 1200,
      height: 750,
    },
  },
  {
    id: 'shinobi-atlas',
    title: 'Shinobi World Atlas',
    kind: 'Anime world & power atlas',
    url: 'https://shinobi-atlas.web.app/',
    status: 'live',
    size: 'standard',
    accent: 'shinobi',
    section: 'play',
    description:
      'Meet 43 ninjas from Naruto, Shippuden and Boruto in kid or databook mode, clash 1v1, tour the Five Great Nations map and 10 Tailed Beasts, fuse chakra natures and take the Chunin quiz, with a spoiler shield by era.',
    facts: ['43 characters', '1v1 arena & chakra lab', '11 languages'],
    audiences: ['kids'],
    image: {
      src: 'assets/tiles/shinobi-atlas.webp',
      alt: 'Shinobi World Atlas home page showing character cards for Isshiki Otsutsuki, Hagoromo Otsutsuki and Naruto Uzumaki alongside Seventh Hokage Naruto’s databook dossier.',
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
    section: 'grow',
    description:
      'Cozy watercolor bedtime stories that make AI make sense, starting with Lily & Robo: Day & Night Adventures.',
    facts: ['Ages 3–7', 'EN · ES · 中文', 'Free read-alouds'],
    audiences: ['kids', 'parents'],
    image: {
      src: 'assets/tiles/curious-little-minds.webp',
      alt: 'Curious Little Minds home page: the cozy bedtime-stories headline and read-aloud button beside the watercolor cover of Lily & Robo: Day & Night Adventures.',
      width: 1200,
      height: 750,
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
    section: 'grow',
    description:
      'A calm, research-backed guide for parents: low-stimulus shows, ad-free games, whole-food swaps and screen-free audio, filtered by your child’s age.',
    facts: ['119 curated picks', 'Ages 0–12', '30 studies cited'],
    audiences: ['parents'],
    image: {
      src: 'assets/tiles/safekids-portal.webp',
      alt: 'SafeKids Portal home page: a parent hub headline, counts of calm channels, games, whole-food swaps and screen-free audio, and illustrated cards for Watch, Play, Nourish and Listen.',
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
    section: 'grow',
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
