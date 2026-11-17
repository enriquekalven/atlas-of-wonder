/**
 * Seasonal & Global Holiday Theme Engine for Atlas of Wonder.
 * Covers all 4 seasons + 21 Global & USA Holidays across all 11 supported languages.
 * Built strictly with createElement / textContent and Canvas 2D (zero unsafe DOM sinks, zero inline styles).
 */
import { trackEvent } from './analytics.js';

export const SEASON_STORAGE_KEY = 'aow-season';
export const SEASON_CALM_KEY = 'aow-season-calm';

export const SEASON_THEME_COLORS = Object.freeze({
  spring: Object.freeze({ day: '#fbf5f8', night: '#0c1312' }),
  summer: Object.freeze({ day: '#fcf8ec', night: '#08141b' }),
  fall: Object.freeze({ day: '#fbf3e6', night: '#140d09' }),
  winter: Object.freeze({ day: '#f2f7fc', night: '#080f1c' }),
  'new-year': Object.freeze({ day: '#faf8f0', night: '#090c16' }),
  'mlk-day': Object.freeze({ day: '#faf8f0', night: '#090c16' }),
  'lunar-new-year': Object.freeze({ day: '#fff6ec', night: '#170809' }),
  valentines: Object.freeze({ day: '#fdf5f8', night: '#140911' }),
  'presidents-day': Object.freeze({ day: '#f5f8fc', night: '#080f1d' }),
  holi: Object.freeze({ day: '#fcf5ff', night: '#12091d' }),
  'st-patricks': Object.freeze({ day: '#f2fbf6', night: '#06150e' }),
  easter: Object.freeze({ day: '#fdf5f8', night: '#140911' }),
  'mothers-day': Object.freeze({ day: '#fdf5f8', night: '#140911' }),
  'memorial-day': Object.freeze({ day: '#f5f8fc', night: '#080f1d' }),
  juneteenth: Object.freeze({ day: '#fcf8f0', night: '#130b0a' }),
  'fathers-day': Object.freeze({ day: '#faf8f0', night: '#090c16' }),
  'independence-day': Object.freeze({ day: '#f5f8fc', night: '#080f1d' }),
  'labor-day': Object.freeze({ day: '#faf8f0', night: '#090c16' }),
  'mid-autumn': Object.freeze({ day: '#fcf6ea', night: '#0f0d1e' }),
  'indigenous-peoples-day': Object.freeze({ day: '#fbf3e6', night: '#140d09' }),
  halloween: Object.freeze({ day: '#faf3eb', night: '#0e0816' }),
  diwali: Object.freeze({ day: '#fff8ec', night: '#140a20' }),
  'veterans-day': Object.freeze({ day: '#f5f8fc', night: '#080f1d' }),
  thanksgiving: Object.freeze({ day: '#fbf3e6', night: '#140d09' }),
  christmas: Object.freeze({ day: '#f4faf6', night: '#07140f' }),
});

export const SEASON_THEMES = Object.freeze([
  Object.freeze({
    id: 'spring',
    category: 'season',
    emoji: '🌸',
    effect: 'sakura',
    colors: Object.freeze(['#f472b6', '#f9a8d4', '#fbcfe8', '#34d399', '#fda4af']),
    dateHint: 'Mar 20 – Jun 19',
    labels: Object.freeze({
      en: 'Spring', es: 'Primavera', zh: '春季', yue: '春季', ja: '春', ko: '봄',
      pt: 'Primavera', fr: 'Printemps', it: 'Primavera', de: 'Frühling', ar: 'الربيع',
    }),
    greetings: Object.freeze({
      en: 'Spring in bloom — drifting cherry blossoms & curious new beginnings',
      es: 'Primavera en flor — pétalos de cerezo y nuevos descubrimientos',
      zh: '春暖花开 · 樱花漫舞，开启探索奇境的新旅程',
      yue: '春暖花開 · 櫻花飄舞，展開好奇探索之旅',
      ja: '春爛漫 · 舞い散る桜の花びらとともに新しい発見を',
      ko: '봄꽃 만개 · 흩날리는 벚꽃과 함께하는 호기심 여행',
      pt: 'Primavera em flor — pétalas de cerejeira e novas descobertas',
      fr: 'Printemps en fleurs — pétales de cerisier et nouvelles découvertes',
      it: 'Primavera in fiore — petali di ciliegio e nuove scoperte',
      de: 'Frühlingsblüte — tanzende Kirschblüten und neue Entdeckungen',
      ar: 'إشراقة الربيع — بتلات الكرز المتطايرة وبدايات مليئة بالفضول',
    }),
  }),
  Object.freeze({
    id: 'summer',
    category: 'season',
    emoji: '☀️',
    effect: 'fireflies',
    colors: Object.freeze(['#fbbf24', '#2dd4bf', '#fb923c', '#38bdf8', '#fde047']),
    dateHint: 'Jun 20 – Sep 21',
    labels: Object.freeze({
      en: 'Summer', es: 'Verano', zh: '夏季', yue: '夏季', ja: '夏', ko: '여름',
      pt: 'Verão', fr: 'Été', it: 'Estate', de: 'Sommer', ar: 'الصيف',
    }),
    greetings: Object.freeze({
      en: 'Golden Summer — coastal sunshine, starlit evenings & glowing fireflies',
      es: 'Verano dorado — brisa soleada, noches estrelladas y luciérnagas',
      zh: '盛夏流光 · 阳光海岸与夏夜流萤相伴探索',
      yue: '盛夏流光 · 陽光海岸與夏夜螢火蟲相伴探索',
      ja: '黄金の夏 · 輝く太陽と蛍の光に包まれる冒険',
      ko: '황금빛 여름 · 따스한 햇살과 반딧불이가 빛나는 밤',
      pt: 'Verão dourado — brisa do mar, estrelas e vaga-lumes',
      fr: 'Été doré — soleil radieux et lucioles scintillantes',
      it: 'Estate dorata — sole luminoso e lucciole scintillantes',
      de: 'Goldener Sommer — Sonnenschein und leuchtende Glühwürmchen',
      ar: 'صيف ذهبي — أشعة الشمس الدافئة واليراعات المضيئة',
    }),
  }),
  Object.freeze({
    id: 'fall',
    category: 'season',
    emoji: '🍂',
    effect: 'leaves',
    colors: Object.freeze(['#ea580c', '#d97706', '#dc2626', '#f59e0b', '#b45309']),
    dateHint: 'Sep 22 – Dec 20',
    labels: Object.freeze({
      en: 'Autumn', es: 'Otoño', zh: '秋季', yue: '秋季', ja: '秋', ko: '가을',
      pt: 'Outono', fr: 'Automne', it: 'Autunno', de: 'Herbst', ar: 'الخريف',
    }),
    greetings: Object.freeze({
      en: 'Crisp Autumn — warm amber paper, cozy skies & tumbling maple leaves',
      es: 'Otoño acogedor — tonos ámbar cálidos y hojas de arce al viento',
      zh: '金秋枫韵 · 温暖琥珀书页与翩跹红叶',
      yue: '金秋楓韻 · 溫暖琥珀書頁與飄舞紅葉',
      ja: '実りの秋 · 琥珀色の温もりと舞い落ちる紅葉',
      ko: '깊어가는 가을 · 따뜻한 호박빛과 춤추는 단풍잎',
      pt: 'Outono acolhedor — tons de âmbar e folhas de bordo ao vento',
      fr: 'Automne doré — teintes ambrées et feuilles d’érable tourbillonnantes',
      it: 'Autunno dorato — calde sfumature ambrate e foglie d’acero',
      de: 'Goldener Herbst — warme Bernsteintöne und tanzende Ahornblätter',
      ar: 'خريف دافئ — ألوان العنبر وأوراق القيقب المتساقطة',
    }),
  }),
  Object.freeze({
    id: 'winter',
    category: 'season',
    emoji: '❄️',
    effect: 'snow',
    colors: Object.freeze(['#7dd3fc', '#bae6fd', '#c4b5fd', '#38bdf8', '#e0f2fe']),
    dateHint: 'Dec 21 – Mar 19',
    labels: Object.freeze({
      en: 'Winter', es: 'Invierno', zh: '冬季', yue: '冬季', ja: '冬', ko: '겨울',
      pt: 'Inverno', fr: 'Hiver', it: 'Inverno', de: 'Winter', ar: 'الشتاء',
    }),
    greetings: Object.freeze({
      en: 'Winter Wonderland — softly drifting snowflakes & aurora starlight',
      es: 'Invierno sereno — copos de nieve suaves y destellos de aurora',
      zh: '冬日雪境 · 漫天飞雪与静谧极光星夜',
      yue: '冬日雪境 · 漫天飛雪與靜謐極光星夜',
      ja: '冬のきらめき · 舞い降る雪の結晶とオーロラの輝き',
      ko: '겨울 동화 · 포근히 내리는 눈송이와 오로라 별빛',
      pt: 'Inverno sereno — flocos de neve suaves e brilho boreal',
      fr: 'Hiver féerique — flocons de neige paisibles et lueur boréale',
      it: 'Inverno incantato — fiocchi di neve leggeri e luce boreale',
      de: 'Winterzauber — sanfte Schneeflocken und Polarlichtglanz',
      ar: 'شتاء هادئ — ندفا الثلج المتهادية وضوء الشفق القطبي',
    }),
  }),
  Object.freeze({
    id: 'new-year',
    category: 'holiday',
    emoji: '🎆',
    effect: 'fireworks',
    colors: Object.freeze(['#fbbf24', '#a855f7', '#38bdf8', '#fb7185', '#fde047']),
    dateHint: 'Jan 1',
    labels: Object.freeze({
      en: 'New Year', es: 'Año Nuevo', zh: '元旦', yue: '元旦', ja: '新年', ko: '새해',
      pt: 'Ano Novo', fr: 'Nouvel An', it: 'Capodanno', de: 'Neujahr', ar: 'رأس السنة',
    }),
    greetings: Object.freeze({
      en: 'Happy New Year! Wishing curious minds a year full of wonder & discovery',
      es: '¡Feliz Año Nuevo! Un nuevo año lleno de asombro, salud y descubrimientos',
      zh: '新年快乐！愿新的一年充满好奇、探索与惊喜',
      yue: '新年快樂！願新一年充滿好奇、探索同驚喜',
      ja: 'あけましておめでとうございます！驚きと発見に満ちた一年を',
      ko: '새해 복 많이 받으세요! 경이로움과 발견이 가득한 한 해 되시길',
      pt: 'Feliz Ano Novo! Um ano repleto de encantamento e descobertas',
      fr: 'Bonne Année ! Une année pleine d’émerveillement et de découvertes',
      it: 'Buon Anno! Un nuovo anno ricco di meraviglia e scoperte',
      de: 'Frohes neues Jahr! Ein Jahr voller Staunen und Entdeckungen',
      ar: 'عام سعيد! نتمنى للعقول الفضولية عاماً مليئاً بالدهشة والاكتشاف',
    }),
  }),
  Object.freeze({
    id: 'mlk-day',
    category: 'holiday',
    emoji: '🕊️',
    effect: 'stars',
    colors: Object.freeze(['#fbbf24', '#60a5fa', '#a78bfa', '#f59e0b', '#93c5fd']),
    dateHint: 'Jan (3rd Mon)',
    labels: Object.freeze({
      en: 'MLK Day', es: 'Día MLK', zh: 'MLK 纪念日', yue: 'MLK 紀念日', ja: 'MLKデー', ko: 'MLK 데이',
      pt: 'Dia de MLK', fr: 'Jour de MLK', it: 'Giorno MLK', de: 'MLK-Tag', ar: 'يوم مارتن لوثر كينغ',
    }),
    greetings: Object.freeze({
      en: 'Martin Luther King Jr. Day — honoring empathy, courage, community & kindness',
      es: 'Día de Martin Luther King Jr. — celebrando la empatía, la valentía y la comunidad',
      zh: '马丁·路德·金纪念日 · 致敬同理心、勇气与平等之光',
      yue: '馬丁·路德·金紀念日 · 致敬同理心、勇氣與平等之光',
      ja: 'キング牧師記念日 · 共感と勇気、思いやりの心を讃えて',
      ko: '마틴 루터 킹 데이 · 공감과 용기, 공동체의 가치를 기리며',
      pt: 'Dia de Martin Luther King Jr. — empatia, coragem e comunidade',
      fr: 'Journée Martin Luther King Jr. — empathie, courage et fraternité',
      it: 'Giornata di Martin Luther King Jr. — empatia, coraggio e comunità',
      de: 'Martin Luther King Jr. Tag — Empathie, Mut und Gemeinschaft',
      ar: 'يوم مارتن لوثر كينغ — تكريماً للتعاطف والشجاعة وروح المجتمع',
    }),
  }),
  Object.freeze({
    id: 'lunar-new-year',
    category: 'holiday',
    emoji: '🏮',
    effect: 'lanterns',
    colors: Object.freeze(['#ef4444', '#fbbf24', '#dc2626', '#fde047', '#f97316']),
    dateHint: 'Jan / Feb',
    labels: Object.freeze({
      en: 'Lunar NY', es: 'Año Lunar', zh: '春节', yue: '農曆新年', ja: '春節', ko: '설날',
      pt: 'Ano Lunar', fr: 'Nouvel An Lunaire', it: 'Capodanno Lunare', de: 'Mondneujahr', ar: 'رأس السنة القمرية',
    }),
    greetings: Object.freeze({
      en: 'Happy Lunar New Year · 新春快乐! Glowing red lanterns, joy & good fortune',
      es: '¡Feliz Año Nuevo Lunar · 新春快乐! Linternas rojas, alegría y buena fortuna',
      zh: '新春快乐 · 恭喜发财！红灯高挂，阖家欢乐，万事胜意',
      yue: '新春快樂 · 恭喜發財！花燈映照，闔家平安，萬事如意',
      ja: '春節おめでとうございます！赤いランタンの灯りとともに幸福な一年を',
      ko: '즐거운 설날 보내세요! 따뜻한 등불과 함께 행복과 행운이 가득하길',
      pt: 'Feliz Ano Novo Lunar! Lanternas douradas, alegria e boa sorte',
      fr: 'Joyeux Nouvel An Lunaire ! Lanternes rouges, joie et prospérité',
      it: 'Felice Capodanno Lunare! Lanterne rosse, gioia e fortuna',
      de: 'Frohes Mondneujahr! Leuchtende Laternen, Freude und viel Glück',
      ar: 'سنة قمرية سعيدة! فوانيس مضيئة وفرح وحظ سعيد للجميع',
    }),
  }),
  Object.freeze({
    id: 'valentines',
    category: 'holiday',
    emoji: '💝',
    effect: 'hearts',
    colors: Object.freeze(['#f43f5e', '#fb7185', '#f472b6', '#fda4af', '#e11d48']),
    dateHint: 'Feb 14',
    labels: Object.freeze({
      en: "Valentine's", es: 'San Valentín', zh: '情人节', yue: '情人節', ja: 'バレンタイン', ko: '발렌타인',
      pt: 'São Valentim', fr: 'Saint-Valentin', it: 'San Valentino', de: 'Valentinstag', ar: 'عيد الحب',
    }),
    greetings: Object.freeze({
      en: "Happy Valentine's Day — celebrating love, family, friendship & kindness",
      es: '¡Feliz Día de San Valentín! Celebrando el cariño, la familia y la amistad',
      zh: '情人节快乐 · 礼赞爱、家人与温暖陪伴',
      yue: '情人節快樂 · 禮讚愛、家人與溫暖陪伴',
      ja: 'ハッピーバレンタイン · 家族や大切な人への愛と感謝をこめて',
      ko: '해피 발렌타인데이 · 사랑과 가족, 따뜻한 우정을 기념하며',
      pt: 'Feliz Dia de São Valentim — celebrando o amor, a família e a amizade',
      fr: 'Joyeuse Saint-Valentin — célébrons l’amour, la famille et l’amitié',
      it: 'Buon San Valentino — celebrando l’amore, la famiglia e la gentilezza',
      de: 'Alles Liebe zum Valentinstag — Liebe, Familie und Freundschaft feiern',
      ar: 'عيد حب سعيد — احتفاءً بالمحبة والعائلة والصداقة واللطف',
    }),
  }),
  Object.freeze({
    id: 'presidents-day',
    category: 'holiday',
    emoji: '🏛️',
    effect: 'stars',
    colors: Object.freeze(['#2563eb', '#ef4444', '#fbbf24', '#60a5fa', '#dc2626']),
    dateHint: 'Feb (3rd Mon)',
    labels: Object.freeze({
      en: "Presidents'", es: 'Presidentes', zh: '总统日', yue: '總統日', ja: '大統領の日', ko: '대통령의 날',
      pt: 'Presidentes', fr: 'Présidents', it: 'Presidenti', de: 'Präsidententag', ar: 'يوم الرؤساء',
    }),
    greetings: Object.freeze({
      en: "Presidents' Day — exploring civic history, leadership & service",
      es: 'Día de los Presidentes — historia cívica, liderazgo y servicio público',
      zh: '总统日 · 回望历史传承与公共服务精神',
      yue: '總統日 · 回望歷史傳承與公共服務精神',
      ja: 'プレジデンツ・デー · 歴史とリーダーシップに思いを馳せる日',
      ko: '대통령의 날 · 역사와 리더십, 공공 봉사의 의미를 되새기며',
      pt: 'Dia dos Presidentes — história cívica, liderança e serviço',
      fr: 'Presidents’ Day — histoire civique, leadership et service public',
      it: 'Presidents’ Day — storia civica, leadership e servizio pubblico',
      de: 'Presidents’ Day — Geschichte, Führungskraft und Gemeinsinn',
      ar: 'يوم الرؤساء — تأمل في التاريخ المدني والقيادة والخدمة العامة',
    }),
  }),
  Object.freeze({
    id: 'holi',
    category: 'holiday',
    emoji: '🎨',
    effect: 'holi-colors',
    colors: Object.freeze(['#f43f5e', '#facc15', '#06b6d4', '#a855f7', '#10b981', '#fb923c']),
    dateHint: 'Mar (Full Moon)',
    labels: Object.freeze({
      en: 'Holi', es: 'Holi', zh: '洒红节', yue: '灑紅節', ja: 'ホーリー祭', ko: '홀리 축제',
      pt: 'Holi', fr: 'Holi', it: 'Holi', de: 'Holi', ar: 'مهرجان هولي',
    }),
    greetings: Object.freeze({
      en: 'Happy Holi! Festival of Colors — splash into vibrant spring joy & laughter',
      es: '¡Feliz Holi! Festival de los Colores — alegría primaveral y unión',
      zh: '洒红节快乐！缤纷色彩点亮春日欢笑与团聚',
      yue: '灑紅節快樂！繽紛色彩點亮春日歡笑與團聚',
      ja: 'ハッピー・ホーリー！色鮮やかな春の喜びと笑顔のフェスティバル',
      ko: '해피 홀리! 다채로운 색채와 봄의 기쁨이 넘치는 색채 축제',
      pt: 'Feliz Holi! Festival das Cores — alegria vibrante de primavera',
      fr: 'Joyeux Holi ! Festival des Couleurs — joie printanière éclatante',
      it: 'Felice Holi! Festival dei Colori — gioia primaverile e allegria',
      de: 'Frohes Holi! Fest der Farben — leuchtende Frühlingsfreude',
      ar: 'مهرجان هولي سعيد! احتفال الألوان المبهجة وفرحة الربيع',
    }),
  }),
  Object.freeze({
    id: 'st-patricks',
    category: 'holiday',
    emoji: '☘️',
    effect: 'clovers',
    colors: Object.freeze(['#10b981', '#059669', '#34d399', '#fbbf24', '#6ee7b7']),
    dateHint: 'Mar 17',
    labels: Object.freeze({
      en: "St. Paddy's", es: 'San Patricio', zh: '三叶草节', yue: '聖博德節', ja: '聖パトリック', ko: '성 패트릭',
      pt: 'São Patrício', fr: 'Saint-Patrick', it: 'San Patrizio', de: 'St. Patrick’s', ar: 'عيد القديس باتريك',
    }),
    greetings: Object.freeze({
      en: "Happy St. Patrick's Day! Emerald shamrocks & a sprinkle of golden luck",
      es: '¡Feliz Día de San Patricio! Tréboles esmeralda y un toque de buena suerte',
      zh: '圣帕特里克节快乐 · 翡翠四叶草带来满满幸运',
      yue: '聖博德節快樂 · 翡翠三葉草帶來滿滿好運',
      ja: 'ハッピー・セントパトリックスデー！緑のシャムロックと幸運を',
      ko: '해피 성 패트릭 데이! 에메랄드빛 클로버와 행운이 함께하길',
      pt: 'Feliz Dia de São Patrício! Trevos esmeralda e muita sorte',
      fr: 'Joyeuse Saint-Patrick ! Trèfles émeraude et brin de chance',
      it: 'Buona festa di San Patrizio! Quadrifogli smeraldo e tanta fortuna',
      de: 'Frohen St. Patrick’s Day! Smaragdgrüne Kleeblätter und viel Glück',
      ar: 'عيد القديس باتريك سعيد! أوراق البرسيم الزمردية وحظ جميل',
    }),
  }),
  Object.freeze({
    id: 'easter',
    category: 'holiday',
    emoji: '🌷',
    effect: 'blossoms',
    colors: Object.freeze(['#c084fc', '#f472b6', '#34d399', '#fbbf24', '#60a5fa']),
    dateHint: 'Spring Sun',
    labels: Object.freeze({
      en: 'Easter', es: 'Pascua', zh: '复活节', yue: '復活節', ja: 'イースター', ko: '부활절',
      pt: 'Páscoa', fr: 'Pâques', it: 'Pasqua', de: 'Ostern', ar: 'عيد الفصح',
    }),
    greetings: Object.freeze({
      en: 'Happy Easter! Spring blossoms, pastel colors, renewal & family warmth',
      es: '¡Felices Pascuas! Flores de primavera, renovación y calidez familiar',
      zh: '复活节快乐 · 春花绽放、柔和色彩与盎然生机',
      yue: '復活節快樂 · 春花綻放、柔和色彩與盎然生機',
      ja: 'ハッピーイースター！春の花々と彩りに満ちた穏やかなひとときを',
      ko: '행복한 부활절 보내세요! 봄꽃과 파스텔빛 설렘이 가득한 날',
      pt: 'Feliz Páscoa! Flores de primavera, renovação e alegria em família',
      fr: 'Joyeuses Pâques ! Fleurs printanières, renouveau et douceur',
      it: 'Buona Pasqua! Fiori di primavera, rinnovamento e serenità',
      de: 'Frohe Ostern! Frühlingsblüten, Pastellfarben und Neubeginn',
      ar: 'عيد فصح سعيد! أزهار الربيع وألوان الباستيل الدافئة',
    }),
  }),
  Object.freeze({
    id: 'mothers-day',
    category: 'holiday',
    emoji: '💐',
    effect: 'blossoms',
    colors: Object.freeze(['#f472b6', '#fb7185', '#c084fc', '#fbbf24', '#fda4af']),
    dateHint: 'May (2nd Sun)',
    labels: Object.freeze({
      en: "Mother's Day", es: 'Día Madre', zh: '母亲节', yue: '母親節', ja: '母の日', ko: '어머니날',
      pt: 'Dia das Mães', fr: 'Fête des Mères', it: 'Festa Mamma', de: 'Muttertag', ar: 'عيد الأم',
    }),
    greetings: Object.freeze({
      en: "Happy Mother's Day! Celebrating moms & caregivers with love and gratitude",
      es: '¡Feliz Día de la Madre! Celebrando a todas las mamás con amor y gratitud',
      zh: '母亲节快乐 · 感恩每一位母亲温暖而坚定的爱',
      yue: '母親節快樂 · 感恩每一位媽媽溫暖而堅定嘅愛',
      ja: '母の日おめでとう · いつも温かい愛情をくれるお母さんに感謝を',
      ko: '어머니날 축하합니다 · 따뜻한 사랑과 헌신에 깊은 감사를 전하며',
      pt: 'Feliz Dia das Mães! Celebrando todas as mães com carinho e gratidão',
      fr: 'Bonne Fête des Mères ! Avec amour et gratitude pour toutes les mamans',
      it: 'Buona Festa della Mamma! Con affetto e gratitudine per tutte le mamme',
      de: 'Alles Liebe zum Muttertag! Danke für Wärme, Fürsorge und Liebe',
      ar: 'عيد أم سعيد! تحية محبة وامتنان لكل أم ومربية ملهمة',
    }),
  }),
  Object.freeze({
    id: 'memorial-day',
    category: 'holiday',
    emoji: '🌺',
    effect: 'poppies',
    colors: Object.freeze(['#dc2626', '#ef4444', '#2563eb', '#fbbf24', '#60a5fa']),
    dateHint: 'May (Last Mon)',
    labels: Object.freeze({
      en: 'Memorial Day', es: 'Memorial Day', zh: '纪念日', yue: '紀念日', ja: '戦没将兵追悼日', ko: '메모리얼 데이',
      pt: 'Memorial Day', fr: 'Memorial Day', it: 'Memorial Day', de: 'Memorial Day', ar: 'يوم الذكرى',
    }),
    greetings: Object.freeze({
      en: 'Memorial Day — honoring with quiet gratitude those who served and sacrificed',
      es: 'Memorial Day — recordando con respeto y gratitud a quienes sirvieron',
      zh: '阵亡将士纪念日 · 心怀敬意，铭记奉献与守护',
      yue: '陣亡將士紀念日 · 心懷敬意，銘記奉獻與守護',
      ja: 'メモリアル・デー · 奉仕と犠牲に静かな敬意と感謝を捧げて',
      ko: '메모리얼 데이 · 헌신과 희생을 조용한 감사로 기억하며',
      pt: 'Memorial Day — honrando com gratidão aqueles que serviram',
      fr: 'Memorial Day — hommage et gratitude envers ceux qui ont servi',
      it: 'Memorial Day — ricordando con gratitudine chi ha servito',
      de: 'Memorial Day — in stillem Dank und ehrendem Gedenken',
      ar: 'يوم الذكرى — تحية احترام وامتنان هادئ لمن خدموا وضحوا',
    }),
  }),
  Object.freeze({
    id: 'juneteenth',
    category: 'holiday',
    emoji: '✊🏿',
    effect: 'fireworks',
    colors: Object.freeze(['#dc2626', '#fbbf24', '#059669', '#f59e0b', '#10b981']),
    dateHint: 'Jun 19',
    labels: Object.freeze({
      en: 'Juneteenth', es: 'Juneteenth', zh: '六月节', yue: '六月節', ja: 'ジューンティーンス', ko: '준틴스',
      pt: 'Juneteenth', fr: 'Juneteenth', it: 'Juneteenth', de: 'Juneteenth', ar: 'جونتينث',
    }),
    greetings: Object.freeze({
      en: 'Happy Juneteenth! Celebrating freedom, history, resilience & community joy',
      es: '¡Feliz Juneteenth! Celebrando la libertad, la historia y la resiliencia',
      zh: '六月节 · 礼赞自由、历史传承与社区凝聚力',
      yue: '六月節 · 禮讚自由、歷史傳承與社區凝聚力',
      ja: 'ジューンティーンス · 自由と歴史、希望の歩みを祝う日',
      ko: '준틴스 · 자유와 역사, 공동체의 희망을 기념하는 날',
      pt: 'Feliz Juneteenth! Celebrando a liberdade, a cultura e a resiliência',
      fr: 'Joyeux Juneteenth ! Célébrons la liberté, l’histoire et la résilience',
      it: 'Felice Juneteenth! Celebrando libertà, storia e resilienza',
      de: 'Happy Juneteenth! Freiheit, Geschichte und Zusammenhalt feiern',
      ar: 'جونتينث سعيد! احتفاءً بالحرية والتاريخ والصمود والأمل',
    }),
  }),
  Object.freeze({
    id: 'fathers-day',
    category: 'holiday',
    emoji: '🌟',
    effect: 'stars',
    colors: Object.freeze(['#0284c7', '#fbbf24', '#38bdf8', '#d97706', '#60a5fa']),
    dateHint: 'Jun (3rd Sun)',
    labels: Object.freeze({
      en: "Father's Day", es: 'Día Padre', zh: '父亲节', yue: '父親節', ja: '父の日', ko: '아버지날',
      pt: 'Dia dos Pais', fr: 'Fête des Pères', it: 'Festa Papà', de: 'Vatertag', ar: 'عيد الأب',
    }),
    greetings: Object.freeze({
      en: "Happy Father's Day! Celebrating dads, mentors & shared bedtime adventures",
      es: '¡Feliz Día del Padre! Celebrando a los papás, mentores y aventuras juntos',
      zh: '父亲节快乐 · 致敬陪伴孩子探索大千世界的父亲们',
      yue: '父親節快樂 · 致敬陪伴小朋友探索世界嘅爸爸們',
      ja: '父の日おめでとう · 一緒に世界を探検してくれるお父さんに感謝を',
      ko: '아버지날 축하합니다 · 함께 세상을 탐험하는 모든 아버지께 감사를',
      pt: 'Feliz Dia dos Pais! Celebrando pais, mentores e aventuras em família',
      fr: 'Bonne Fête des Pères ! Pour les papas, mentors et belles aventures',
      it: 'Buona Festa del Papà! Celebrando i papà e le avventure insieme',
      de: 'Alles Gute zum Vatertag! Für Väter, Mentoren und gemeinsame Abenteuer',
      ar: 'عيد أب سعيد! تحية لكل أب ومرشد يشارك أطفاله متعة الاستكشاف',
    }),
  }),
  Object.freeze({
    id: 'independence-day',
    category: 'holiday',
    emoji: '🎇',
    effect: 'fireworks',
    colors: Object.freeze(['#dc2626', '#2563eb', '#fbbf24', '#ef4444', '#60a5fa']),
    dateHint: 'Jul 4',
    labels: Object.freeze({
      en: 'July 4th', es: '4 de Julio', zh: '独立日', yue: '獨立日', ja: '独立記念日', ko: '독립기념일',
      pt: '4 de Julho', fr: '4 Juillet', it: '4 Luglio', de: '4. Juli', ar: '4 يوليو',
    }),
    greetings: Object.freeze({
      en: 'Happy 4th of July! Warm summer nights & sparkling fireworks across the sky',
      es: '¡Feliz 4 de Julio! Noches de verano y fuegos artificiales brillantes',
      zh: '独立日快乐 · 夏夜星空与绚烂烟花绽放',
      yue: '獨立日快樂 · 夏夜星空與絢爛煙花綻放',
      ja: '独立記念日おめでとう！夏の夜空を彩る華やかな花火',
      ko: '독립기념일 축하합니다! 여름 밤하늘을 수놓는 불꽃놀이',
      pt: 'Feliz 4 de Julho! Noite de verão e fogos de artifício brilhantes',
      fr: 'Joyeux 4 Juillet ! Nuit d’été étoilée et feux d’artifice',
      it: 'Buon 4 Luglio! Notte d’estate e fuochi d’artificio scintillanti',
      de: 'Frohen 4. Juli! Sommernacht und funkelndes Feuerwerk am Himmel',
      ar: 'الرابع من يوليو سعيد! أمسيات صيفية دافئة وألعاب نارية متلألئة',
    }),
  }),
  Object.freeze({
    id: 'labor-day',
    category: 'holiday',
    emoji: '🛠️',
    effect: 'stars',
    colors: Object.freeze(['#d97706', '#2563eb', '#f59e0b', '#ea580c', '#38bdf8']),
    dateHint: 'Sep (1st Mon)',
    labels: Object.freeze({
      en: 'Labor Day', es: 'Día Trabajo', zh: '劳工节', yue: '勞工節', ja: 'レイバー・デー', ko: '노동절',
      pt: 'Dia Trabalho', fr: 'Fête Travail', it: 'Festa Lavoro', de: 'Tag der Arbeit', ar: 'عيد العمال',
    }),
    greetings: Object.freeze({
      en: 'Happy Labor Day! Celebrating makers, teachers, builders & curious craft',
      es: '¡Feliz Día del Trabajo! Celebrando a educadores, creadores y constructores',
      zh: '劳工节快乐 · 致敬每一位创造者、教育者与匠心精神',
      yue: '勞工節快樂 · 致敬每一位創造者、教育者與匠心精神',
      ja: 'レイバー・デー · 創り手や教育者、日々の丁寧な仕事に敬意を',
      ko: '노동절 축하합니다 · 모든 창작자와 교육자, 장인정신을 기리며',
      pt: 'Feliz Dia do Trabalho! Celebrando educadores, criadores e construtores',
      fr: 'Bonne Fête du Travail ! Célébrons les créateurs, enseignants et bâtisseurs',
      it: 'Buona Festa del Lavoro! Celebrando creatori, insegnanti e costruttori',
      de: 'Schönen Labor Day! Für Lehrende, Gestaltende und tatkräftiges Schaffen',
      ar: 'عيد عمال سعيد! تحية للمبدعين والمعلمين والبناة في كل مكان',
    }),
  }),
  Object.freeze({
    id: 'mid-autumn',
    category: 'holiday',
    emoji: '🥮',
    effect: 'lanterns',
    colors: Object.freeze(['#fbbf24', '#f59e0b', '#ef4444', '#fde047', '#ea580c']),
    dateHint: 'Sep / Oct',
    labels: Object.freeze({
      en: 'Mid-Autumn', es: 'Medio Otoño', zh: '中秋节', yue: '中秋節', ja: '中秋の名月', ko: '추석',
      pt: 'Meio Outono', fr: 'Mi-Automne', it: 'Metà Autunno', de: 'Mondfest', ar: 'مهرجان منتصف الخريف',
    }),
    greetings: Object.freeze({
      en: 'Happy Mid-Autumn Festival · 中秋快乐! Harvest moon, lanterns & family reunion',
      es: '¡Feliz Festival de la Luna · 中秋快乐! Luna llena, linternas y unión familiar',
      zh: '中秋快乐 · 花好月圆，灯火可亲，阖家团圆！',
      yue: '中秋節快樂 · 人月兩團圓，花燈映照溫馨夜！',
      ja: '中秋の名月 · 満月の輝きとランタンの灯りに包まれる団らんの夜',
      ko: '풍성한 한가위 보내세요 · 밝은 보름달과 등불 아래 따뜻한 가족 모임',
      pt: 'Feliz Festival da Lua! Lua cheia, lanternas douradas e união familiar',
      fr: 'Joyeuse Fête de la Mi-Automne ! Pleine lune, lanternes et retrouvailles',
      it: 'Felice Festa di Metà Autunno! Luna piena, lanterne e famiglia riunita',
      de: 'Frohes Mondfest! Vollmondglanz, Laternen und gemütliches Beisammensein',
      ar: 'مهرجان منتصف الخريف سعيد! قمر مكتمل وفوانيس مضيئة ولمّ شمل العائلة',
    }),
  }),
  Object.freeze({
    id: 'indigenous-peoples-day',
    category: 'holiday',
    emoji: '🌾',
    effect: 'leaves',
    colors: Object.freeze(['#d97706', '#0d9488', '#ea580c', '#b45309', '#14b8a6']),
    dateHint: 'Oct (2nd Mon)',
    labels: Object.freeze({
      en: 'Indigenous Day', es: 'Pueblos Indígenas', zh: '原住民日', yue: '原住民日', ja: '先住民の日', ko: '원주민의 날',
      pt: 'Povos Indígenas', fr: 'Peuples Autochtones', it: 'Popoli Indigeni', de: 'Indigene Völker', ar: 'يوم الشعوب الأصلية',
    }),
    greetings: Object.freeze({
      en: "Indigenous Peoples' Day — honoring living cultures, stewardship & stories",
      es: 'Día de los Pueblos Indígenas — honrando culturas vivas, sabiduría y tierra',
      zh: '原住民纪念日 · 致敬多元文化传承与自然守护智慧',
      yue: '原住民紀念日 · 致敬多元文化傳承與自然守護智慧',
      ja: '先住民族の日 · 豊かな文化と自然への敬意、受け継がれる物語を讃えて',
      ko: '원주민의 날 · 살아있는 문화와 자연을 향한 지혜를 기리며',
      pt: 'Dia dos Povos Indígenas — honrando culturas vivas, histórias e natureza',
      fr: 'Journée des Peuples Autochtones — cultures vivantes, récits et respect de la terre',
      it: 'Giornata dei Popoli Indigeni — culture vive, storie e custodia della natura',
      de: 'Tag der indigenen Völker — lebendige Kulturen, Geschichten und Naturverbundenheit',
      ar: 'يوم الشعوب الأصلية — تكريماً للثقافات الحية والحكمة وحماية الطبيعة',
    }),
  }),
  Object.freeze({
    id: 'halloween',
    category: 'holiday',
    emoji: '🎃',
    effect: 'halloween',
    colors: Object.freeze(['#f97316', '#a855f7', '#fb923c', '#84cc16', '#fbbf24']),
    dateHint: 'Oct 31',
    labels: Object.freeze({
      en: 'Halloween', es: 'Halloween', zh: '万圣节', yue: '萬聖節', ja: 'ハロウィン', ko: '할로윈',
      pt: 'Halloween', fr: 'Halloween', it: 'Halloween', de: 'Halloween', ar: 'الهالوين',
    }),
    greetings: Object.freeze({
      en: 'Happy Halloween! Friendly jack-o’-lanterns, fluttering bats & autumn magic',
      es: '¡Feliz Halloween! Calabazas luminosas, murciélagos y magia otoñal',
      zh: '万圣节快乐！南瓜灯闪烁与奇幻秋夜大冒险',
      yue: '萬聖節快樂！南瓜燈閃爍與奇幻秋夜大冒險',
      ja: 'ハッピーハロウィン！かぼちゃのランタンと不思議な秋の夜',
      ko: '해피 할로윈! 반짝이는 호박등과 신비로운 가을밤 모험',
      pt: 'Feliz Halloween! Abóboras iluminadas, morcegos e magia de outono',
      fr: 'Joyeux Halloween ! Citrouilles lumineuses et magie d’automne',
      it: 'Buon Halloween! Zucche luminose, pipistrelli e magia d’autunno',
      de: 'Happy Halloween! Leuchtende Kürbisse und herbstlicher Zauber',
      ar: 'هالوين سعيد! فوانيس اليقطين المضيئة وأجواء الخريف المرحة',
    }),
  }),
  Object.freeze({
    id: 'diwali',
    category: 'holiday',
    emoji: '🪔',
    effect: 'diyas',
    colors: Object.freeze(['#fbbf24', '#f97316', '#ec4899', '#a855f7', '#fde047']),
    dateHint: 'Oct / Nov',
    labels: Object.freeze({
      en: 'Diwali', es: 'Diwali', zh: '排灯节', yue: '排燈節', ja: 'ディワリ', ko: '디왈리',
      pt: 'Diwali', fr: 'Diwali', it: 'Diwali', de: 'Diwali', ar: 'عيد ديوالي',
    }),
    greetings: Object.freeze({
      en: 'Happy Diwali · Shubh Deepawali! Warm glowing diyas, knowledge & light',
      es: '¡Feliz Diwali! Diyas doradas, sabiduría y la luz que ilumina el camino',
      zh: '排灯节快乐！温暖明灯点亮知识、希望与喜悦',
      yue: '排燈節快樂！溫暖明燈點亮知識、希望與喜悅',
      ja: 'ハッピー・ディワリ！ 따뜻한ディヤの灯りが知恵と希望を照らしますように',
      ko: '해피 디왈리! 따뜻한 등불이 지혜와 희망, 기쁨을 밝혀주기를',
      pt: 'Feliz Diwali! Luzes douradas de diyas, sabedoria e alegria',
      fr: 'Joyeux Diwali ! Lumières dorées des diyas, sagesse et sérénité',
      it: 'Felice Diwali! Calde luci di diya, conoscenza e gioia',
      de: 'Frohes Diwali! Fest des Lichts — leuchtende Diyas, Freude und Zuversicht',
      ar: 'ديوالي سعيد! مصابيح الديا الدافئة تضيء المعرفة والأمل والفرح',
    }),
  }),
  Object.freeze({
    id: 'veterans-day',
    category: 'holiday',
    emoji: '🎖️',
    effect: 'stars',
    colors: Object.freeze(['#d97706', '#2563eb', '#dc2626', '#fbbf24', '#60a5fa']),
    dateHint: 'Nov 11',
    labels: Object.freeze({
      en: 'Veterans Day', es: 'Veteranos', zh: '退伍军人节', yue: '退伍軍人節', ja: '退役軍人の日', ko: '재향군인의 날',
      pt: 'Veteranos', fr: 'Anciens Combattants', it: 'Veterani', de: 'Veteranentag', ar: 'يوم المحاربين القدامى',
    }),
    greetings: Object.freeze({
      en: 'Veterans Day — with heartfelt gratitude to veterans and military families',
      es: 'Día de los Veteranos — gratitud sincera a los veteranos y sus familias',
      zh: '退伍军人节 · 向退伍军人与军属致以诚挚感谢',
      yue: '退伍軍人節 · 向退伍軍人與軍屬致以誠摯感謝',
      ja: '退役軍人の日 · 奉仕された方々とご家族に心からの感謝を',
      ko: '재향군인의 날 · 헌신하신 분들과 가족께 깊은 감사를 전합니다',
      pt: 'Dia dos Veteranos — gratidão sincera aos veteranos e suas famílias',
      fr: 'Journée des Anciens Combattants — gratitude envers ceux qui ont servi',
      it: 'Giornata dei Veterani — sincera gratitudine ai veterani e alle famiglie',
      de: 'Veterans Day — herzlicher Dank an alle Veteranen und ihre Familien',
      ar: 'يوم المحاربين القدامى — امتنان صادق للمحاربين القدامى وعائلاتهم',
    }),
  }),
  Object.freeze({
    id: 'thanksgiving',
    category: 'holiday',
    emoji: '🦃',
    effect: 'leaves',
    colors: Object.freeze(['#d97706', '#b45309', '#dc2626', '#ea580c', '#f59e0b']),
    dateHint: 'Nov (4th Thu)',
    labels: Object.freeze({
      en: 'Thanksgiving', es: 'Acción de Gracias', zh: '感恩节', yue: '感恩節', ja: '感謝祭', ko: '추수감사절',
      pt: 'Ação de Graças', fr: 'Thanksgiving', it: 'Ringraziamento', de: 'Erntedank', ar: 'عيد الشكر',
    }),
    greetings: Object.freeze({
      en: 'Happy Thanksgiving! Grateful for curious minds, family & shared stories',
      es: '¡Feliz Día de Acción de Gracias! Gratitud por la familia y aprender juntos',
      zh: '感恩节快乐 · 感恩家人陪伴、好奇童心与每一次温暖共读',
      yue: '感恩節快樂 · 感恩家人陪伴、好奇童心與每一次溫暖共讀',
      ja: 'ハッピー・サンクスギビング！家族の絆と学ぶ喜びに感謝をこめて',
      ko: '행복한 추수감사절 보내세요! 가족과 함께 나누는 이야기에 감사하며',
      pt: 'Feliz Dia de Ação de Graças! Gratidão pela família e pelo aprender juntos',
      fr: 'Joyeux Thanksgiving ! Gratitude pour la famille et les histoires partagées',
      it: 'Felice Giorno del Ringraziamento! Gratitudine per famiglia e curiosità',
      de: 'Frohes Thanksgiving! Dankbar für Familie, Neugier und gemeinsame Geschichten',
      ar: 'عيد شكر سعيد! ممتنون للعائلة والعقول الفضولية والقصص المشتركة',
    }),
  }),
  Object.freeze({
    id: 'christmas',
    category: 'holiday',
    emoji: '🎄',
    effect: 'christmas-snow',
    colors: Object.freeze(['#dc2626', '#059669', '#fbbf24', '#10b981', '#ef4444']),
    dateHint: 'Dec 25',
    labels: Object.freeze({
      en: 'Christmas', es: 'Navidad', zh: '圣诞节', yue: '聖誕節', ja: 'クリスマス', ko: '크리스마스',
      pt: 'Natal', fr: 'Noël', it: 'Natale', de: 'Weihnachten', ar: 'عيد الميلاد',
    }),
    greetings: Object.freeze({
      en: 'Merry Christmas & Happy Holidays! Evergreen warmth, snowy wonder & peace',
      es: '¡Feliz Navidad y Felices Fiestas! Paz, calidez invernal y cuentos en familia',
      zh: '圣诞与节日快乐 · 松林瑞雪、温暖炉火与阖家平安',
      yue: '聖誕與節日快樂 · 松林瑞雪、溫暖燈火與闔家平安',
      ja: 'メリークリスマス＆ハッピーホリデー！雪のきらめきと温かい時間を',
      ko: '메리 크리스마스 & 해피 홀리데이! 포근한 눈빛과 평화로운 연말 되세요',
      pt: 'Feliz Natal e Boas Festas! Paz, aconchego e encantamento de inverno',
      fr: 'Joyeux Noël et Bonnes Fêtes ! Douceur hivernale, paix et émerveillement',
      it: 'Buon Natale e Buone Feste! Calore, neve soffice e serenità in famiglia',
      de: 'Frohe Weihnachten & schöne Feiertage! Tannenduft, Schneezauber und Frieden',
      ar: 'عيد ميلاد مجيد وأعياد سعيدة! دفء الشتاء وسكينة وسلام للجميع',
    }),
  }),
]);

export const SEASON_UI = Object.freeze({
  en: Object.freeze({
    pickerAria: 'Season and holiday theme',
    autoTitle: 'Auto · Live Calendar',
    autoSub: 'Matches today’s season & holidays automatically',
    seasonsHeading: 'Four Seasons',
    holidaysHeading: 'World & USA Holidays',
    skyEffectsOn: 'Sky effects: On',
    skyEffectsCalm: 'Sky effects: Calm',
    celebrate: 'Celebrate!',
    liveBadge: 'Live Season',
    previewBadge: 'Theme Preview',
    nextThemeAria: 'Try next season or holiday theme',
  }),
  es: Object.freeze({
    pickerAria: 'Tema de estación y festividad',
    autoTitle: 'Auto · Calendario vivo',
    autoSub: 'Sigue automáticamente la estación o fiesta de hoy',
    seasonsHeading: 'Cuatro estaciones',
    holidaysHeading: 'Fiestas del mundo y EE. UU.',
    skyEffectsOn: 'Efectos: Activos',
    skyEffectsCalm: 'Efectos: Calma',
    celebrate: '¡Celebrar!',
    liveBadge: 'Tema actual',
    previewBadge: 'Vista previa',
    nextThemeAria: 'Probar siguiente estación o festividad',
  }),
  zh: Object.freeze({
    pickerAria: '四季与节日主题',
    autoTitle: '自动 · 实时节日日历',
    autoSub: '根据当日季节与全球节日自动切换',
    seasonsHeading: '四季风物',
    holidaysHeading: '全球与美国节日',
    skyEffectsOn: '天空特效：开启',
    skyEffectsCalm: '天空特效：静谧',
    celebrate: '欢庆一下',
    liveBadge: '今日时令',
    previewBadge: '主题预览',
    nextThemeAria: '切换下一个季节或节日主题',
  }),
  yue: Object.freeze({
    pickerAria: '四季與節日主題',
    autoTitle: '自動 · 實時節日日曆',
    autoSub: '跟隨當日季節與全球節日自動切換',
    seasonsHeading: '四季風物',
    holidaysHeading: '全球與美國節日',
    skyEffectsOn: '天空特效：開啟',
    skyEffectsCalm: '天空特效：靜謐',
    celebrate: '慶祝一下',
    liveBadge: '今日時令',
    previewBadge: '主題預覽',
    nextThemeAria: '切換下一個季節或節日主題',
  }),
  ja: Object.freeze({
    pickerAria: '季節と祝日のテーマ',
    autoTitle: '自動 · ライブカレンダー',
    autoSub: '今日の季節や祝日に合わせて自動切り替え',
    seasonsHeading: '四季',
    holidaysHeading: '世界と米国の祝日',
    skyEffectsOn: '空のエフェクト: オン',
    skyEffectsCalm: '空のエフェクト: 静か',
    celebrate: 'お祝い！',
    liveBadge: '今日の季節',
    previewBadge: 'テーマ体験',
    nextThemeAria: '次の季節・祝日テーマへ切り替え',
  }),
  ko: Object.freeze({
    pickerAria: '계절 및 명절 테마',
    autoTitle: '자동 · 실시간 달력',
    autoSub: '오늘의 계절과 명절에 맞춰 자동 전환',
    seasonsHeading: '사계절',
    holidaysHeading: '세계 및 미국 명절',
    skyEffectsOn: '하늘 효과: 켜짐',
    skyEffectsCalm: '하늘 효과: 차분함',
    celebrate: '축하하기!',
    liveBadge: '오늘의 테마',
    previewBadge: '테마 미리보기',
    nextThemeAria: '다음 계절이나 명절 테마 체험하기',
  }),
  pt: Object.freeze({
    pickerAria: 'Tema de estação e feriado',
    autoTitle: 'Auto · Calendário ao vivo',
    autoSub: 'Muda automaticamente conforme a estação ou feriado',
    seasonsHeading: 'Quatro estações',
    holidaysHeading: 'Feriados mundiais e dos EUA',
    skyEffectsOn: 'Efeitos: Ativos',
    skyEffectsCalm: 'Efeitos: Calmo',
    celebrate: 'Celebrar!',
    liveBadge: 'Estação atual',
    previewBadge: 'Pré-visualização',
    nextThemeAria: 'Experimentar próximo tema sazonal',
  }),
  fr: Object.freeze({
    pickerAria: 'Thème des saisons et fêtes',
    autoTitle: 'Auto · Calendrier en direct',
    autoSub: 'Suit automatiquement la saison ou la fête du jour',
    seasonsHeading: 'Quatre saisons',
    holidaysHeading: 'Fêtes du monde et des États-Unis',
    skyEffectsOn: 'Effets du ciel : Activés',
    skyEffectsCalm: 'Effets du ciel : Calme',
    celebrate: 'Célébrer !',
    liveBadge: 'Saison du jour',
    previewBadge: 'Aperçu du thème',
    nextThemeAria: 'Essayer la saison ou fête suivante',
  }),
  it: Object.freeze({
    pickerAria: 'Tema stagioni e festività',
    autoTitle: 'Auto · Calendario dal vivo',
    autoSub: 'Segue automaticamente la stagione o festa di oggi',
    seasonsHeading: 'Quattro stagioni',
    holidaysHeading: 'Feste del mondo e USA',
    skyEffectsOn: 'Effetti cielo: Attivi',
    skyEffectsCalm: 'Effetti cielo: Calma',
    celebrate: 'Festeggia!',
    liveBadge: 'Stagione attuale',
    previewBadge: 'Anteprima tema',
    nextThemeAria: 'Prova la prossima stagione o festa',
  }),
  de: Object.freeze({
    pickerAria: 'Jahreszeiten- und Feiertagsthema',
    autoTitle: 'Auto · Live-Kalender',
    autoSub: 'Passt sich automatisch an Jahreszeit & Feiertage an',
    seasonsHeading: 'Vier Jahreszeiten',
    holidaysHeading: 'Welt- & US-Feiertage',
    skyEffectsOn: 'Himmelseffekte: An',
    skyEffectsCalm: 'Himmelseffekte: Ruhig',
    celebrate: 'Feiern!',
    liveBadge: 'Aktuelle Saison',
    previewBadge: 'Themenvorschau',
    nextThemeAria: 'Nächstes Jahreszeiten- oder Feiertagsthema testen',
  }),
  ar: Object.freeze({
    pickerAria: 'سمة الفصول والمناسبات',
    autoTitle: 'تلقائي · التقويم الحي',
    autoSub: 'يتغير تلقائياً حسب فصل اليوم والمناسبات العالمية',
    seasonsHeading: 'الفصول الأربعة',
    holidaysHeading: 'أعياد العالم والولايات المتحدة',
    skyEffectsOn: 'تأثيرات السماء: مفعّلة',
    skyEffectsCalm: 'تأثيرات السماء: هادئة',
    celebrate: 'احتفل!',
    liveBadge: 'موسم اليوم',
    previewBadge: 'معاينة السمة',
    nextThemeAria: 'جرّب سمة الفصل أو المناسبة التالية',
  }),
});

const THEME_BY_ID = new Map(SEASON_THEMES.map((item) => [item.id, item]));
export const SEASON_IDS = Object.freeze(SEASON_THEMES.map((item) => item.id));

export function isSeasonId(value) {
  return typeof value === 'string' && THEME_BY_ID.has(value);
}

export function getSeasonTheme(id) {
  return THEME_BY_ID.get(id) ?? THEME_BY_ID.get('fall');
}

/* ---------- Movable Holiday Calendar Math ---------- */

const LUNAR_NEW_YEAR_DATES = Object.freeze({
  2025: [1, 29], 2026: [2, 17], 2027: [2, 6], 2028: [1, 26],
  2029: [2, 13], 2030: [2, 3], 2031: [1, 23], 2032: [2, 11],
  2033: [1, 31], 2034: [2, 19], 2035: [2, 8], 2036: [1, 28],
});

const HOLI_DATES = Object.freeze({
  2025: [3, 14], 2026: [3, 4], 2027: [3, 22], 2028: [3, 11],
  2029: [3, 1], 2030: [3, 20], 2031: [3, 9], 2032: [2, 27],
  2033: [3, 16], 2034: [3, 5], 2035: [3, 24], 2036: [3, 12],
});

const MID_AUTUMN_DATES = Object.freeze({
  2025: [10, 6], 2026: [9, 25], 2027: [9, 15], 2028: [10, 3],
  2029: [9, 22], 2030: [9, 12], 2031: [10, 1], 2032: [9, 19],
  2033: [9, 8], 2034: [9, 27], 2035: [9, 16], 2036: [10, 4],
});

const DIWALI_DATES = Object.freeze({
  2025: [10, 20], 2026: [11, 8], 2027: [10, 29], 2028: [10, 17],
  2029: [11, 5], 2030: [10, 26], 2031: [11, 14], 2032: [11, 2],
  2033: [10, 22], 2034: [11, 10], 2035: [10, 30], 2036: [11, 17],
});

function nthWeekdayOfMonth(year, month1, weekday0, nth) {
  const firstDay = new Date(year, month1 - 1, 1).getDay();
  const offset = (weekday0 - firstDay + 7) % 7;
  return 1 + offset + (nth - 1) * 7;
}

function lastWeekdayOfMonth(year, month1, weekday0) {
  const lastDate = new Date(year, month1, 0);
  const diff = (lastDate.getDay() - weekday0 + 7) % 7;
  return lastDate.getDate() - diff;
}

function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return [month, day];
}

function daysBetween(y1, m1, d1, y2, m2, d2) {
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((utc1 - utc2) / 86_400_000);
}

export function resolveCalendarSeason(now = new Date()) {
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if ((month === 12 && day === 31) || (month === 1 && day <= 2)) return 'new-year';
  if (month === 12 && day >= 21 && day <= 26) return 'christmas';

  const lny = LUNAR_NEW_YEAR_DATES[year];
  if (lny) {
    const diff = daysBetween(year, month, day, year, lny[0], lny[1]);
    if (diff >= -1 && diff <= 4) return 'lunar-new-year';
  }

  if (month === 1) {
    const mlk = nthWeekdayOfMonth(year, 1, 1, 3);
    if (day >= mlk - 2 && day <= mlk) return 'mlk-day';
  }

  if (month === 2 && (day === 13 || day === 14)) return 'valentines';
  if (month === 2) {
    const pres = nthWeekdayOfMonth(year, 2, 1, 3);
    if (day >= pres - 2 && day <= pres) return 'presidents-day';
  }

  const holi = HOLI_DATES[year];
  if (holi) {
    const diff = daysBetween(year, month, day, year, holi[0], holi[1]);
    if (diff >= -1 && diff <= 1) return 'holi';
  }

  if (month === 3 && (day === 16 || day === 17)) return 'st-patricks';

  const [easterM, easterD] = getEasterSunday(year);
  {
    const diff = daysBetween(year, month, day, year, easterM, easterD);
    if (diff >= -2 && diff <= 1) return 'easter';
  }

  if (month === 5) {
    const mothers = nthWeekdayOfMonth(year, 5, 0, 2);
    if (day === mothers - 1 || day === mothers) return 'mothers-day';
    const memorial = lastWeekdayOfMonth(year, 5, 1);
    if (day >= memorial - 2 && day <= memorial) return 'memorial-day';
  }

  if (month === 6 && day >= 18 && day <= 20) return 'juneteenth';
  if (month === 6) {
    const fathers = nthWeekdayOfMonth(year, 6, 0, 3);
    if (day === fathers - 1 || day === fathers) return 'fathers-day';
  }

  if (month === 7 && day >= 2 && day <= 5) return 'independence-day';

  if (month === 9) {
    const labor = nthWeekdayOfMonth(year, 9, 1, 1);
    if (day >= labor - 2 && day <= labor) return 'labor-day';
  }

  const midAutumn = MID_AUTUMN_DATES[year];
  if (midAutumn) {
    const diff = daysBetween(year, month, day, year, midAutumn[0], midAutumn[1]);
    if (diff >= -1 && diff <= 1) return 'mid-autumn';
  }

  if (month === 10) {
    const indigenous = nthWeekdayOfMonth(year, 10, 1, 2);
    if (day === indigenous - 1 || day === indigenous) return 'indigenous-peoples-day';
  }

  if (!(month === 10 && day >= 29)) {
    const diwali = DIWALI_DATES[year];
    if (diwali) {
      const diff = daysBetween(year, month, day, year, diwali[0], diwali[1]);
      if (diff >= -2 && diff <= 2) return 'diwali';
    }
  }

  if ((month === 10 && day >= 25) || (month === 11 && day === 1)) return 'halloween';

  {
    const diwali = DIWALI_DATES[year];
    if (diwali) {
      const diff = daysBetween(year, month, day, year, diwali[0], diwali[1]);
      if (diff >= -2 && diff <= 2) return 'diwali';
    }
  }

  if (month === 11 && (day === 10 || day === 11)) return 'veterans-day';
  if (month === 11) {
    const thanksgiving = nthWeekdayOfMonth(year, 11, 4, 4);
    if (day >= thanksgiving - 2 && day <= thanksgiving + 3) return 'thanksgiving';
  }

  if ((month === 3 && day >= 20) || month === 4 || month === 5 || (month === 6 && day <= 19)) return 'spring';
  if ((month === 6 && day >= 20) || month === 7 || month === 8 || (month === 9 && day <= 21)) return 'summer';
  if ((month === 9 && day >= 22) || month === 10 || month === 11 || (month === 12 && day <= 20)) return 'fall';
  return 'winter';
}

/* ---------- Pure createElement DOM builder ---------- */

function el(tag, { className, text, attrs } = {}, children = []) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  for (const [k, v] of Object.entries(attrs ?? {})) node.setAttribute(k, v);
  node.append(...children);
  return node;
}

function readLocal(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocal(key, val) {
  try {
    if (val === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, val);
  } catch {
    // Ignore blocked storage.
  }
}

/* ---------- Canvas 2D Drawing Primitives ---------- */

function drawParticleShape(ctx, p, effect) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
  const s = p.size;

  if (effect === 'leaves') {
    ctx.rotate(p.rotation);
    ctx.scale(Math.max(0.25, Math.abs(Math.cos(p.flip))), 1);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    if (p.variant === 0) {
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.28, -s * 0.42);
      ctx.lineTo(s * 0.88, -s * 0.52);
      ctx.lineTo(s * 0.48, -s * 0.05);
      ctx.lineTo(s * 0.78, s * 0.36);
      ctx.lineTo(s * 0.2, s * 0.32);
      ctx.lineTo(0, s * 0.72);
      ctx.lineTo(-s * 0.2, s * 0.32);
      ctx.lineTo(-s * 0.78, s * 0.36);
      ctx.lineTo(-s * 0.48, -s * 0.05);
      ctx.lineTo(-s * 0.88, -s * 0.52);
      ctx.lineTo(-s * 0.28, -s * 0.42);
      ctx.closePath();
    } else {
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.75, -s * 0.55, s * 0.75, s * 0.45, 0, s * 0.85);
      ctx.bezierCurveTo(-s * 0.75, s * 0.45, -s * 0.75, -s * 0.55, 0, -s);
    }
    ctx.fill();
  } else if (effect === 'sakura') {
    ctx.rotate(p.rotation);
    ctx.scale(Math.max(0.35, Math.abs(Math.cos(p.flip))), 1);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.8);
    ctx.bezierCurveTo(-s * 0.85, s * 0.25, -s * 0.75, -s * 0.75, -s * 0.18, -s * 0.85);
    ctx.lineTo(0, -s * 0.52);
    ctx.lineTo(s * 0.18, -s * 0.85);
    ctx.bezierCurveTo(s * 0.75, -s * 0.75, s * 0.85, s * 0.25, 0, s * 0.8);
    ctx.fill();
  } else if (effect === 'blossoms') {
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    for (let i = 0; i < 5; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / 5);
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.46, s * 0.3, s * 0.44, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
    ctx.fill();
  } else if (effect === 'snow' || effect === 'christmas-snow') {
    if (effect === 'christmas-snow' && p.variant === 0) {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const r = i % 2 === 0 ? s : s * 0.34;
        const a = (i * Math.PI) / 4;
        if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.rotate(p.rotation);
      ctx.strokeStyle = effect === 'christmas-snow' ? '#93c5fd' : p.color;
      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -s);
        ctx.moveTo(0, -s * 0.55);
        ctx.lineTo(s * 0.25, -s * 0.78);
        ctx.moveTo(0, -s * 0.55);
        ctx.lineTo(-s * 0.25, -s * 0.78);
        ctx.stroke();
        ctx.restore();
      }
    }
  } else if (effect === 'lanterns') {
    ctx.rotate(Math.sin(p.phase) * 0.08);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.roundRect(-s * 0.56, -s * 0.7, s * 1.12, s * 1.28, s * 0.34);
    ctx.fill();
    ctx.fillStyle = 'rgba(254, 240, 138, 0.78)';
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.26, s * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-s * 0.34, -s * 0.8, s * 0.68, s * 0.13);
    ctx.fillRect(-s * 0.3, s * 0.56, s * 0.6, s * 0.13);
  } else if (effect === 'diyas') {
    const flicker = 0.88 + Math.sin(p.phase * 5) * 0.12;
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.92 * flicker);
    ctx.quadraticCurveTo(s * 0.32, -s * 0.36, 0, -s * 0.06);
    ctx.quadraticCurveTo(-s * 0.32, -s * 0.36, 0, -s * 0.92 * flicker);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(0, -s * 0.3, s * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(0, -s * 0.05, s * 0.65, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
  } else if (effect === 'holi-colors') {
    const grad = ctx.createRadialGradient(0, 0, s * 0.08, 0, 0, s);
    grad.addColorStop(0, p.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, s, 0, Math.PI * 2);
    ctx.fill();
  } else if (effect === 'fireflies') {
    const pulse = 0.4 + 0.6 * Math.abs(Math.sin(p.phase * 1.8));
    ctx.globalAlpha *= pulse;
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.1);
    grad.addColorStop(0, p.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, s * 2.1, 0, Math.PI * 2);
    ctx.fill();
  } else if (effect === 'halloween') {
    if (p.variant === 0) {
      const wing = Math.sin(p.phase * 4.2) * s * 0.35;
      ctx.fillStyle = '#9333ea';
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.18);
      ctx.quadraticCurveTo(s * 0.55, -s * 0.65 + wing, s * 1.02, -s * 0.05 + wing);
      ctx.quadraticCurveTo(s * 0.55, s * 0.12, 0, s * 0.25);
      ctx.quadraticCurveTo(-s * 0.55, s * 0.12, -s * 1.02, -s * 0.05 + wing);
      ctx.quadraticCurveTo(-s * 0.55, -s * 0.65 + wing, 0, -s * 0.18);
      ctx.fill();
    } else {
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.68, s * 0.52, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#15803d';
      ctx.fillRect(-s * 0.1, -s * 0.7, s * 0.2, s * 0.22);
    }
  } else if (effect === 'hearts') {
    ctx.rotate(Math.sin(p.phase) * 0.2);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.65);
    ctx.bezierCurveTo(-s * 0.92, s * 0.05, -s * 0.82, -s * 0.72, 0, -s * 0.28);
    ctx.bezierCurveTo(s * 0.82, -s * 0.72, s * 0.92, s * 0.05, 0, s * 0.65);
    ctx.fill();
  } else if (effect === 'clovers') {
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 2);
      ctx.beginPath();
      ctx.arc(0, -s * 0.42, s * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  } else if (effect === 'poppies') {
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 2 + 0.35);
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.35, s * 0.4, s * 0.34, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.rotate(p.rotation * 0.4);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? s : s * 0.32;
      const a = (i * Math.PI) / 4;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function makeParticle(w, h, theme, randomY) {
  const effect = theme.effect;
  const color = theme.colors[Math.floor(Math.random() * theme.colors.length)];
  const rising =
    effect === 'lanterns' ||
    effect === 'diyas' ||
    effect === 'fireflies' ||
    effect === 'hearts' ||
    effect === 'fireworks';
  const size =
    effect === 'holi-colors'
      ? 12 + Math.random() * 14
      : effect === 'fireflies'
        ? 4 + Math.random() * 4
        : 7 + Math.random() * 6;
  return {
    x: Math.random() * w,
    y: randomY ? Math.random() * h : rising ? h + 24 + Math.random() * 32 : -24 - Math.random() * 32,
    vx: (Math.random() - 0.45) * 0.55,
    vy: rising ? -(0.32 + Math.random() * 0.48) : 0.48 + Math.random() * 0.72,
    size,
    rotation: Math.random() * Math.PI * 2,
    vRot: (Math.random() - 0.5) * 0.025,
    flip: Math.random() * Math.PI * 2,
    vFlip: 0.02 + Math.random() * 0.028,
    phase: Math.random() * Math.PI * 2,
    color,
    alpha: effect === 'holi-colors' ? 0.24 + Math.random() * 0.2 : 0.42 + Math.random() * 0.34,
    variant: Math.floor(Math.random() * 3),
    burst: false,
    life: 0,
    maxLife: 0,
  };
}

function makeBurstParticle(x, y, theme) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 1.8 + Math.random() * 5.2;
  const color = theme.colors[Math.floor(Math.random() * theme.colors.length)];
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 1.5,
    size: theme.effect === 'holi-colors' ? 14 + Math.random() * 16 : 7 + Math.random() * 7,
    rotation: Math.random() * Math.PI * 2,
    vRot: (Math.random() - 0.5) * 0.09,
    flip: Math.random() * Math.PI * 2,
    vFlip: 0.05 + Math.random() * 0.05,
    phase: Math.random() * Math.PI * 2,
    color,
    alpha: 0.92,
    variant: Math.floor(Math.random() * 3),
    burst: true,
    life: 0,
    maxLife: 65 + Math.floor(Math.random() * 45),
  };
}

/* ---------- Interactive Seasonal Experience Controller ---------- */

export function initSeasonalExperience({ getLanguage, onSeasonPainted }) {
  const pickerMount = document.getElementById('season-picker');
  const ribbonMount = document.getElementById('season-ribbon');
  const canvas = document.getElementById('season-canvas');
  if (!pickerMount || !ribbonMount) {
    return { setLanguage() {}, celebrate() {}, getActiveThemeId: () => 'fall' };
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selection = 'auto';
  const paramSeason = new URLSearchParams(window.location.search).get('season');
  const savedSeason = readLocal(SEASON_STORAGE_KEY);
  if (paramSeason === 'auto' || isSeasonId(paramSeason)) selection = paramSeason;
  else if (savedSeason === 'auto' || isSeasonId(savedSeason)) selection = savedSeason;

  let calm = readLocal(SEASON_CALM_KEY) === 'true';
  let popoverOpen = false;
  let lang = getLanguage();
  let calendarId = resolveCalendarSeason();
  let particles = [];
  let rafId = 0;

  function activeId() {
    return selection === 'auto' ? calendarId : selection;
  }

  function activeTheme() {
    return getSeasonTheme(activeId());
  }

  function ui() {
    return SEASON_UI[lang] ?? SEASON_UI.en;
  }

  function spawnBurst(originX, originY, count = 34) {
    if (reducedMotion.matches || calm) return;
    const theme = activeTheme();
    const bx = originX ?? window.innerWidth * 0.5;
    const by = originY ?? window.innerHeight * 0.3;
    for (let i = 0; i < count; i++) {
      particles.push(makeBurstParticle(bx, by, theme));
    }
  }

  function setupCanvas() {
    if (!canvas) return;
    window.cancelAnimationFrame(rafId);
    canvas.dataset.calm = String(calm);
    if (calm || reducedMotion.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const theme = activeTheme();
    const count = w < 640 ? 14 : 22;
    particles = Array.from({ length: count }, () => makeParticle(w, h, theme, true));

    let tickCount = 0;
    const tick = () => {
      if (document.visibilityState !== 'hidden') {
        ctx.clearRect(0, 0, w, h);
        const curTheme = activeTheme();
        if (curTheme.effect === 'fireworks') {
          tickCount += 1;
          if (tickCount % 160 === 45 && particles.length < 80) {
            spawnBurst(w * (0.2 + Math.random() * 0.6), h * (0.14 + Math.random() * 0.34), 16);
          }
        }
        const rising =
          curTheme.effect === 'lanterns' ||
          curTheme.effect === 'diyas' ||
          curTheme.effect === 'fireflies' ||
          curTheme.effect === 'hearts' ||
          curTheme.effect === 'fireworks';

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.phase += 0.024;
          p.rotation += p.vRot;
          p.flip += p.vFlip;

          if (p.burst) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.055;
            p.vx *= 0.985;
            p.life += 1;
            p.alpha = Math.max(0, 1 - p.life / p.maxLife);
            if (p.life >= p.maxLife) {
              particles.splice(i, 1);
              continue;
            }
          } else {
            p.x += p.vx + Math.sin(p.phase) * 0.3;
            p.y += p.vy;
            if (!rising && p.y > h + 44) Object.assign(p, makeParticle(w, h, curTheme, false));
            else if (rising && p.y < -44) Object.assign(p, makeParticle(w, h, curTheme, false));
            if (p.x > w + 44) p.x = -44;
            if (p.x < -44) p.x = w + 44;
          }
          drawParticleShape(ctx, p, curTheme.effect);
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    window.onresize = resize;
    rafId = window.requestAnimationFrame(tick);
  }

  function renderRibbon() {
    const strings = ui();
    const theme = activeTheme();
    const badge = el(
      'span',
      { className: 'season-ribbon__badge' },
      [
        el('span', { text: theme.emoji, attrs: { 'aria-hidden': 'true' } }),
        el('span', { text: selection === 'auto' ? strings.liveBadge : strings.previewBadge }),
      ],
    );
    const message = el('span', {
      className: 'season-ribbon__text',
      text: theme.greetings[lang] ?? theme.greetings.en,
    });
    const celebrateBtn = el('button', {
      className: 'season-ribbon__celebrate',
      text: `✨ ${strings.celebrate}`,
      attrs: { type: 'button' },
    });
    celebrateBtn.addEventListener('click', (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 38);
      trackEvent('celebrate_season', { season: theme.id, language: lang });
    });

    const cycleBtn = el('button', {
      className: 'season-ribbon__cycle',
      text: '↻',
      attrs: { type: 'button', 'aria-label': strings.nextThemeAria, title: strings.nextThemeAria },
    });
    cycleBtn.addEventListener('click', () => {
      const idx = SEASON_THEMES.findIndex((item) => item.id === theme.id);
      const next = SEASON_THEMES[(idx + 1) % SEASON_THEMES.length];
      applySelection(next.id, true);
    });

    const actions = el('span', { className: 'season-ribbon__actions' }, [celebrateBtn, cycleBtn]);
    ribbonMount.replaceChildren(badge, message, actions);
    ribbonMount.hidden = false;
  }

  function renderPicker() {
    const strings = ui();
    const theme = activeTheme();
    const calTheme = getSeasonTheme(calendarId);

    const trigger = el(
      'button',
      {
        className: 'season-trigger',
        attrs: {
          type: 'button',
          'aria-expanded': String(popoverOpen),
          'aria-haspopup': 'dialog',
          'aria-label': strings.pickerAria,
          title: strings.pickerAria,
        },
      },
      [
        el('span', { text: theme.emoji, attrs: { 'aria-hidden': 'true' } }),
        el('span', { className: 'season-trigger__label', text: theme.labels[lang] ?? theme.labels.en }),
        el('span', { className: 'season-trigger__caret', text: '▾', attrs: { 'aria-hidden': 'true' } }),
      ],
    );
    trigger.addEventListener('click', () => {
      popoverOpen = !popoverOpen;
      renderPicker();
    });

    const children = [trigger];

    if (popoverOpen) {
      const autoBtn = el(
        'button',
        {
          className: 'season-auto-btn',
          attrs: { type: 'button', 'aria-pressed': String(selection === 'auto') },
        },
        [
          el('span', { className: 'season-auto-btn__top' }, [
            el('span', { text: strings.autoTitle }),
            el('span', {
              className: 'season-auto-btn__badge',
              text: `${calTheme.emoji} ${calTheme.labels[lang] ?? calTheme.labels.en}`,
            }),
          ]),
          el('span', { className: 'season-auto-btn__sub', text: strings.autoSub }),
        ],
      );
      autoBtn.addEventListener('click', () => {
        popoverOpen = false;
        applySelection('auto', true);
      });

      const seasonButtons = SEASON_THEMES.filter((item) => item.category === 'season').map((item) => {
        const chip = el(
          'button',
          {
            className: 'season-chip',
            attrs: { type: 'button', 'aria-pressed': String(selection === item.id) },
          },
          [
            el('span', { className: 'season-chip__emoji', text: item.emoji, attrs: { 'aria-hidden': 'true' } }),
            el('span', { text: item.labels[lang] ?? item.labels.en }),
          ],
        );
        chip.addEventListener('click', () => applySelection(item.id, true));
        return chip;
      });

      const holidayButtons = SEASON_THEMES.filter((item) => item.category === 'holiday').map((item) => {
        const btn = el(
          'button',
          {
            className: 'season-holiday',
            attrs: { type: 'button', 'aria-pressed': String(selection === item.id) },
          },
          [
            el('span', { className: 'season-holiday__emoji', text: item.emoji, attrs: { 'aria-hidden': 'true' } }),
            el('span', { className: 'season-holiday__meta' }, [
              el('span', { className: 'season-holiday__name', text: item.labels[lang] ?? item.labels.en }),
              el('span', { className: 'season-holiday__date', text: item.dateHint }),
            ]),
          ],
        );
        btn.addEventListener('click', () => applySelection(item.id, true));
        return btn;
      });

      const calmBtn = el('button', {
        className: 'season-calm-btn',
        text: calm ? strings.skyEffectsCalm : strings.skyEffectsOn,
        attrs: { type: 'button', 'aria-pressed': String(!calm) },
      });
      calmBtn.addEventListener('click', () => {
        calm = !calm;
        writeLocal(SEASON_CALM_KEY, String(calm));
        setupCanvas();
        renderPicker();
      });

      const celebrateBtn = el('button', {
        className: 'season-celebrate-btn',
        text: `✨ ${strings.celebrate}`,
        attrs: { type: 'button' },
      });
      celebrateBtn.addEventListener('click', (event) => {
        if (calm) {
          calm = false;
          writeLocal(SEASON_CALM_KEY, 'false');
          setupCanvas();
        }
        const rect = event.currentTarget.getBoundingClientRect();
        spawnBurst(rect.left + rect.width / 2, rect.top, 38);
        trackEvent('celebrate_season', { season: theme.id, language: lang });
      });

      const popover = el(
        'div',
        { className: 'season-popover', attrs: { role: 'dialog', 'aria-label': strings.pickerAria } },
        [
          autoBtn,
          el('p', { className: 'season-heading', text: strings.seasonsHeading }),
          el('div', { className: 'season-grid-seasons' }, seasonButtons),
          el('p', { className: 'season-heading', text: strings.holidaysHeading }),
          el('div', { className: 'season-grid-holidays' }, holidayButtons),
          el('div', { className: 'season-popover__footer' }, [calmBtn, celebrateBtn]),
        ],
      );
      children.push(popover);
    }

    pickerMount.replaceChildren(...children);
  }

  function applySelection(next, fromUser) {
    selection = next === 'auto' || isSeasonId(next) ? next : 'auto';
    const resolved = activeId();
    document.documentElement.dataset.season = resolved;
    renderRibbon();
    renderPicker();
    setupCanvas();
    onSeasonPainted?.(resolved, selection);

    if (!fromUser) return;
    writeLocal(SEASON_STORAGE_KEY, selection);
    const url = new URL(window.location.href);
    if (selection === 'auto') url.searchParams.delete('season');
    else url.searchParams.set('season', selection);
    window.history.replaceState(null, '', url);
    trackEvent('switch_season', { selection, resolved_season: resolved, language: lang });
  }

  // Close popover on outside click or Escape
  document.addEventListener('mousedown', (event) => {
    if (popoverOpen && !pickerMount.contains(event.target)) {
      popoverOpen = false;
      renderPicker();
    }
  });
  window.addEventListener('keydown', (event) => {
    if (popoverOpen && event.key === 'Escape') {
      popoverOpen = false;
      renderPicker();
      pickerMount.querySelector('.season-trigger')?.focus();
    }
  });

  // Gentle click burst on empty background space
  window.addEventListener('click', (event) => {
    if (calm || reducedMotion.matches) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('a, button, .tile, .season-picker, .lang-switch, .chips')) return;
    spawnBurst(event.clientX, event.clientY, 12);
  });

  reducedMotion.addEventListener('change', setupCanvas);

  applySelection(selection, false);

  return {
    setLanguage(nextLang) {
      lang = nextLang;
      renderRibbon();
      renderPicker();
    },
    celebrate() {
      spawnBurst(window.innerWidth * 0.5, window.innerHeight * 0.3, 38);
    },
    getActiveThemeId: activeId,
  };
}
