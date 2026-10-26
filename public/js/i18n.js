/**
 * Localization dictionary and pure language-resolution helpers.
 *
 * Supported languages (11 languages across all Atlas of Wonder apps):
 *   - en:  English
 *   - es:  Español (Spanish)
 *   - zh:  中文 (Simplified Chinese / Mandarin)
 *   - yue: 粵語 (Cantonese / Traditional Chinese)
 *   - ja:  日本語 (Japanese)
 *   - ko:  한국어 (Korean)
 *   - pt:  Português (Portuguese)
 *   - fr:  Français (French)
 *   - it:  Italiano (Italian)
 *   - de:  Deutsch (German)
 *   - ar:  العربية (Arabic, RTL)
 */
import { CREATIONS } from './creations.js';

export const DEFAULT_LANG = 'en';

export const LANGUAGES = Object.freeze([
  Object.freeze({ code: 'en', label: 'EN', nativeName: 'English', ariaLabel: 'EN · English' }),
  Object.freeze({ code: 'es', label: 'ES', nativeName: 'Español', ariaLabel: 'ES · Español' }),
  Object.freeze({ code: 'zh', label: '中文', nativeName: '中文 (普通话)', ariaLabel: '中文 · 普通话' }),
  Object.freeze({ code: 'yue', label: '粵語', nativeName: '粵語 (廣東話)', ariaLabel: '粵語 · 廣東話' }),
  Object.freeze({ code: 'ja', label: '日本語', nativeName: '日本語', ariaLabel: '日本語' }),
  Object.freeze({ code: 'ko', label: '한국어', nativeName: '한국어', ariaLabel: '한국어' }),
  Object.freeze({ code: 'pt', label: 'PT', nativeName: 'Português', ariaLabel: 'PT · Português' }),
  Object.freeze({ code: 'fr', label: 'FR', nativeName: 'Français', ariaLabel: 'FR · Français' }),
  Object.freeze({ code: 'it', label: 'IT', nativeName: 'Italiano', ariaLabel: 'IT · Italiano' }),
  Object.freeze({ code: 'de', label: 'DE', nativeName: 'Deutsch', ariaLabel: 'DE · Deutsch' }),
  Object.freeze({ code: 'ar', label: 'العربية', nativeName: 'العربية', ariaLabel: 'العربية' }),
]);

export const LANGUAGE_CODES = Object.freeze(LANGUAGES.map((l) => l.code));

export const RTL_LANGUAGES = Object.freeze(['ar']);

/** Returns 'rtl' for right-to-left languages (Arabic) and 'ltr' otherwise. */
export function getLanguageDir(code) {
  return typeof code === 'string' && RTL_LANGUAGES.includes(code) ? 'rtl' : 'ltr';
}

const listFormatters = new Map(
  LANGUAGE_CODES.map((code) => [
    code,
    new Intl.ListFormat(code === 'yue' ? 'zh-Hant-HK' : code, { style: 'long', type: 'conjunction' }),
  ]),
);

function formatList(lang, items) {
  const formatter = listFormatters.get(lang) ?? listFormatters.get(DEFAULT_LANG);
  return formatter.format(items);
}

export const UI_STRINGS = Object.freeze({
  en: Object.freeze({
    pageTitle: 'Atlas of Wonder · Interactive learning worlds by Enrique Chan',
    metaDescription:
      'Interactive learning worlds by Enrique Chan: a 3D universe, a 3D human body atlas, bedtime stories that make AI make sense, and a calm, research-backed media guide for parents.',
    skipLink: 'Skip to the creations',
    langGroupLabel: 'Language',
    nightMode: 'Night mode',
    mastheadTitle: 'Atlas of Wonder',
    mastheadLede: 'Interactive worlds for curious minds, from a first heartbeat to the edge of the universe.',
    worldsHeading: 'Creations',
    filterLabel: 'Show worlds for',
    everyone: 'Everyone',
    audiences: Object.freeze({
      kids: 'Kids',
      students: 'Students',
      parents: 'Parents',
      clinicians: 'Clinicians',
    }),
    audienceNouns: Object.freeze({
      kids: 'kids',
      students: 'students',
      parents: 'parents',
      clinicians: 'clinicians',
    }),
    passportLabel: 'Explorer passport',
    passportReset: 'Reset',
    stampVisited: 'Visited',
    opensInNewTab: ' (opens in a new tab)',
    highlightsLabel: 'Highlights',
    openCta: 'Open',
    notLiveYet: 'Not live yet',
    emptyWorlds: 'No worlds to show yet.',
    footerCalm:
      'Calm by design: no ads, no accounts, no autoplay and no tracking on this page. Passport stamps stay in your browser.',
    footerCredits:
      'Tile images are screenshots of each project. Space imagery: NASA & ESO. Anatomy model: BodyParts3D © DBCLS & NIH HuBMAP, CC BY 4.0.',
    formatSummary(live, soon) {
      const parts = [`${live} live ${live === 1 ? 'world' : 'worlds'}`];
      if (soon > 0) parts.push(`${soon} on the way`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `For ${formatList('en', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `Showing all ${totalCount} worlds.`;
      return `${matchCount} of ${totalCount} worlds are for ${this.audienceNouns[audienceKey]}.`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `All ${totalLive} worlds explored!`
        : `${visitedCount} of ${totalLive} worlds explored`;
    },
  }),

  es: Object.freeze({
    pageTitle: 'Atlas del Asombro · Mundos interactivos de aprendizaje por Enrique Chan',
    metaDescription:
      'Mundos interactivos de aprendizaje por Enrique Chan: un universo 3D, un atlas 3D del cuerpo humano, cuentos para dormir sobre IA y una guía serena para padres.',
    skipLink: 'Saltar a las creaciones',
    langGroupLabel: 'Idioma',
    nightMode: 'Modo nocturno',
    mastheadTitle: 'Atlas del Asombro',
    mastheadLede:
      'Mundos interactivos para mentes curiosas, desde el primer latido hasta el confín del universo.',
    worldsHeading: 'Creaciones',
    filterLabel: 'Mostrar mundos para',
    everyone: 'Todos',
    audiences: Object.freeze({
      kids: 'Niños',
      students: 'Estudiantes',
      parents: 'Padres',
      clinicians: 'Clínicos',
    }),
    audienceNouns: Object.freeze({
      kids: 'niños',
      students: 'estudiantes',
      parents: 'padres',
      clinicians: 'clínicos',
    }),
    passportLabel: 'Pasaporte de explorador',
    passportReset: 'Reiniciar',
    stampVisited: 'Visitado',
    opensInNewTab: ' (se abre en una pestaña nueva)',
    highlightsLabel: 'Aspectos destacados',
    openCta: 'Abrir',
    notLiveYet: 'Próximamente',
    emptyWorlds: 'Aún no hay mundos para mostrar.',
    footerCalm:
      'Calma por diseño: sin anuncios, sin cuentas, sin reproducción automática ni rastreo en esta página. Los sellos del pasaporte se quedan en tu navegador.',
    footerCredits:
      'Las imágenes son capturas de cada proyecto. Imágenes espaciales: NASA y ESO. Modelo anatómico: BodyParts3D © DBCLS y NIH HuBMAP, CC BY 4.0.',
    formatSummary(live, soon) {
      const parts = [`${live} ${live === 1 ? 'mundo activo' : 'mundos activos'}`];
      if (soon > 0) parts.push(`${soon} en camino`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `Para ${formatList('es', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `Mostrando los ${totalCount} mundos.`;
      return `${matchCount} de ${totalCount} mundos son para ${this.audienceNouns[audienceKey]}.`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `¡Los ${totalLive} mundos explorados!`
        : `${visitedCount} de ${totalLive} mundos explorados`;
    },
  }),

  zh: Object.freeze({
    pageTitle: '奇妙图鉴 · Enrique Chan 打造的互动学习世界',
    metaDescription:
      'Enrique Chan 打造的互动学习世界：3D 宇宙探索、3D 人体解剖图谱、让孩子读懂 AI 的水彩睡前绘本，以及温和循证的家长育儿指南。',
    skipLink: '跳至作品列表',
    langGroupLabel: '语言',
    nightMode: '夜间模式',
    mastheadTitle: '奇妙图鉴',
    mastheadLede: '为好奇心灵打造的互动世界，从最初的心跳一直探索到宇宙的边缘。',
    worldsHeading: '作品列表',
    filterLabel: '筛选适用人群',
    everyone: '全部',
    audiences: Object.freeze({
      kids: '儿童',
      students: '学生',
      parents: '家长',
      clinicians: '临床医护',
    }),
    audienceNouns: Object.freeze({
      kids: '儿童',
      students: '学生',
      parents: '家长',
      clinicians: '临床医护',
    }),
    passportLabel: '探索护照',
    passportReset: '重置',
    stampVisited: '已到访',
    opensInNewTab: '（在新标签页中打开）',
    highlightsLabel: '亮点',
    openCta: '打开',
    notLiveYet: '尚未上线',
    emptyWorlds: '暂无可展示的世界。',
    footerCalm:
      '宁静设计：本页面无广告、无需注册、无自动播放、无追踪。探索印章仅保存在您的浏览器中。',
    footerCredits:
      '卡片图片均为各项目实景截图。太空影像：NASA 与 ESO。解剖模型：BodyParts3D © DBCLS 与 NIH HuBMAP，CC BY 4.0。',
    formatSummary(live, soon) {
      const parts = [`${live} 个已上线世界`];
      if (soon > 0) parts.push(`${soon} 个即将推出`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `适合${formatList('zh', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `正在显示全部 ${totalCount} 个世界。`;
      return `${totalCount} 个世界中有 ${matchCount} 个适合${this.audienceNouns[audienceKey]}。`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `全部 ${totalLive} 个世界已探索！`
        : `已探索 ${visitedCount} / ${totalLive} 个世界`;
    },
  }),

  yue: Object.freeze({
    pageTitle: '奇妙圖鑑 · Enrique Chan 打造嘅互動學習世界',
    metaDescription:
      'Enrique Chan 打造嘅互動學習世界：3D 宇宙探索、3D 人體解剖圖譜、令小朋友讀懂 AI 嘅水彩睡前繪本，同埋溫和有根據嘅家長育兒指南。',
    skipLink: '跳去作品一覽',
    langGroupLabel: '語言',
    nightMode: '夜間模式',
    mastheadTitle: '奇妙圖鑑',
    mastheadLede: '為充滿好奇心嘅大小朋友打造嘅互動世界，由最初嘅心跳一路探索到宇宙邊緣。',
    worldsHeading: '作品一覽',
    filterLabel: '篩選適合對象',
    everyone: '全部',
    audiences: Object.freeze({
      kids: '小朋友',
      students: '學生',
      parents: '家長',
      clinicians: '醫護人員',
    }),
    audienceNouns: Object.freeze({
      kids: '小朋友',
      students: '學生',
      parents: '家長',
      clinicians: '醫護人員',
    }),
    passportLabel: '探索護照',
    passportReset: '重設',
    stampVisited: '已到訪',
    opensInNewTab: '（喺新分頁打開）',
    highlightsLabel: '重點特色',
    openCta: '打開',
    notLiveYet: '即將推出',
    emptyWorlds: '暫時未有可以顯示嘅世界。',
    footerCalm:
      '寧靜設計：呢個頁面無廣告、唔使開戶口、無自動播放同埋無追蹤。探索印仔只會留喺你嘅瀏覽器入面。',
    footerCredits:
      '卡片圖片係各個項目嘅真實截圖。太空影像：NASA 同 ESO。解剖模型：BodyParts3D © DBCLS 同 NIH HuBMAP，CC BY 4.0。',
    formatSummary(live, soon) {
      const parts = [`${live} 個已上線世界`];
      if (soon > 0) parts.push(`${soon} 個準備緊`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `適合${formatList('yue', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `顯示緊全部 ${totalCount} 個世界。`;
      return `${totalCount} 個世界入面有 ${matchCount} 個適合${this.audienceNouns[audienceKey]}。`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `全部 ${totalLive} 個世界都探索晒喇！`
        : `已探索 ${visitedCount} / ${totalLive} 個世界`;
    },
  }),

  ja: Object.freeze({
    pageTitle: 'ワンダー・アトラス · Enrique Chan による対話型まなびの世界',
    metaDescription:
      'Enrique Chan による対話型まなびの世界：3D 宇宙図鑑、3D 人体解剖アトラス、AI がわかるおやすみ絵本、研究に基づく保護者向けメディアガイド。',
    skipLink: '作品一覧へスキップ',
    langGroupLabel: '言語',
    nightMode: 'ナイトモード',
    mastheadTitle: 'ワンダー・アトラス',
    mastheadLede:
      '最初の鼓動から宇宙の果てまで、好奇心あふれる心のためのインタラクティブな世界。',
    worldsHeading: '作品一覧',
    filterLabel: '対象で絞り込む',
    everyone: 'すべて',
    audiences: Object.freeze({
      kids: '子ども',
      students: '学生',
      parents: '保護者',
      clinicians: '医療従事者',
    }),
    audienceNouns: Object.freeze({
      kids: '子ども',
      students: '学生',
      parents: '保護者',
      clinicians: '医療従事者',
    }),
    passportLabel: '探検パスポート',
    passportReset: 'リセット',
    stampVisited: '訪問済み',
    opensInNewTab: '（新しいタブで開きます）',
    highlightsLabel: '主な特徴',
    openCta: '開く',
    notLiveYet: '公開準備中',
    emptyWorlds: '表示できる世界がまだありません。',
    footerCalm:
      '穏やかな設計：広告・アカウント登録・自動再生・トラッキングは一切ありません。パスポートのスタンプはお使いのブラウザにのみ保存されます。',
    footerCredits:
      'タイル画像は各プロジェクトのスクリーンショットです。宇宙画像：NASA & ESO。解剖学モデル：BodyParts3D © DBCLS & NIH HuBMAP, CC BY 4.0。',
    formatSummary(live, soon) {
      const parts = [`公開中の世界 ${live}`];
      if (soon > 0) parts.push(`準備中 ${soon}`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `対象：${formatList('ja', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `全${totalCount}個の世界を表示中。`;
      return `${totalCount}個中${matchCount}個の世界が${this.audienceNouns[audienceKey]}向けです。`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `全${totalLive}個の世界を探検しました！`
        : `${totalLive}個中${visitedCount}個の世界を探検済み`;
    },
  }),

  ko: Object.freeze({
    pageTitle: '경이의 아틀라스 · Enrique Chan이 만든 인터랙티브 배움의 세계',
    metaDescription:
      'Enrique Chan이 만든 인터랙티브 배움의 세계: 3D 우주 탐험, 3D 인체 해부학 아틀라스, AI를 쉽게 풀어낸 잠자리 그림책, 연구 기반 부모 가이드.',
    skipLink: '작품 목록으로 건너뛰기',
    langGroupLabel: '언어',
    nightMode: '야간 모드',
    mastheadTitle: '경이의 아틀라스',
    mastheadLede:
      '첫 심장 박동부터 우주의 끝까지, 호기심 가득한 마음을 위한 인터랙티브 세계.',
    worldsHeading: '작품 목록',
    filterLabel: '대상별 보기',
    everyone: '전체',
    audiences: Object.freeze({
      kids: '어린이',
      students: '학생',
      parents: '부모',
      clinicians: '임상의',
    }),
    audienceNouns: Object.freeze({
      kids: '어린이',
      students: '학생',
      parents: '부모',
      clinicians: '임상의',
    }),
    passportLabel: '탐험 패스포트',
    passportReset: '초기화',
    stampVisited: '방문함',
    opensInNewTab: ' (새 탭에서 열림)',
    highlightsLabel: '주요 특징',
    openCta: '열기',
    notLiveYet: '출시 준비 중',
    emptyWorlds: '표시할 세계가 아직 없습니다.',
    footerCalm:
      '차분한 설계: 광고, 계정 가입, 자동 재생, 추적이 없습니다. 패스포트 스탬프는 브라우저에만 저장됩니다.',
    footerCredits:
      '타일 이미지는 각 프로젝트의 스크린샷입니다. 우주 이미지: NASA & ESO. 해부학 모델: BodyParts3D © DBCLS & NIH HuBMAP, CC BY 4.0.',
    formatSummary(live, soon) {
      const parts = [`운영 중인 세계 ${live}개`];
      if (soon > 0) parts.push(`준비 중 ${soon}개`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `대상: ${formatList('ko', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `전체 ${totalCount}개 세계를 표시하고 있습니다.`;
      return `${totalCount}개 중 ${matchCount}개 세계가 ${this.audienceNouns[audienceKey]} 대상입니다.`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `${totalLive}개 세계 모두 탐험 완료!`
        : `${totalLive}개 중 ${visitedCount}개 세계 탐험 완료`;
    },
  }),

  pt: Object.freeze({
    pageTitle: 'Atlas das Maravilhas · Mundos interativos de aprendizagem por Enrique Chan',
    metaDescription:
      'Mundos interativos de aprendizagem por Enrique Chan: um universo 3D, um atlas 3D do corpo humano, histórias de ninar sobre IA e um guia tranquilo baseado em pesquisas para pais.',
    skipLink: 'Pular para as criações',
    langGroupLabel: 'Idioma',
    nightMode: 'Modo noturno',
    mastheadTitle: 'Atlas das Maravilhas',
    mastheadLede:
      'Mundos interativos para mentes curiosas, do primeiro batimento cardíaco até a fronteira do universo.',
    worldsHeading: 'Criações',
    filterLabel: 'Mostrar mundos para',
    everyone: 'Todos',
    audiences: Object.freeze({
      kids: 'Crianças',
      students: 'Estudantes',
      parents: 'Pais',
      clinicians: 'Clínicos',
    }),
    audienceNouns: Object.freeze({
      kids: 'crianças',
      students: 'estudantes',
      parents: 'pais',
      clinicians: 'clínicos',
    }),
    passportLabel: 'Passaporte de explorador',
    passportReset: 'Redefinir',
    stampVisited: 'Visitado',
    opensInNewTab: ' (abre em uma nova aba)',
    highlightsLabel: 'Destaques',
    openCta: 'Abrir',
    notLiveYet: 'Em breve',
    emptyWorlds: 'Ainda não há mundos para mostrar.',
    footerCalm:
      'Calmo por natureza: sem anúncios, sem contas, sem reprodução automática nem rastreamento nesta página. Os carimbos do passaporte ficam no seu navegador.',
    footerCredits:
      'As imagens são capturas de tela de cada projeto. Imagens espaciais: NASA e ESO. Modelo anatômico: BodyParts3D © DBCLS e NIH HuBMAP, CC BY 4.0.',
    formatSummary(live, soon) {
      const parts = [`${live} ${live === 1 ? 'mundo ativo' : 'mundos ativos'}`];
      if (soon > 0) parts.push(`${soon} a caminho`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `Para ${formatList('pt', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `Mostrando todos os ${totalCount} mundos.`;
      return `${matchCount} de ${totalCount} mundos são para ${this.audienceNouns[audienceKey]}.`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `Todos os ${totalLive} mundos explorados!`
        : `${visitedCount} de ${totalLive} mundos explorados`;
    },
  }),

  fr: Object.freeze({
    pageTitle: 'Atlas des Merveilles · Mondes d’apprentissage interactifs par Enrique Chan',
    metaDescription:
      'Mondes d’apprentissage interactifs par Enrique Chan : un univers 3D, un atlas 3D du corps humain, des histoires du soir sur l’IA et un guide apaisé pour les parents.',
    skipLink: 'Aller aux créations',
    langGroupLabel: 'Langue',
    nightMode: 'Mode nuit',
    mastheadTitle: 'Atlas des Merveilles',
    mastheadLede:
      'Des mondes interactifs pour les esprits curieux, du premier battement de cœur aux confins de l’univers.',
    worldsHeading: 'Créations',
    filterLabel: 'Mondes pour',
    everyone: 'Tous',
    audiences: Object.freeze({
      kids: 'Enfants',
      students: 'Étudiants',
      parents: 'Parents',
      clinicians: 'Cliniciens',
    }),
    audienceNouns: Object.freeze({
      kids: 'les enfants',
      students: 'les étudiants',
      parents: 'les parents',
      clinicians: 'les cliniciens',
    }),
    passportLabel: 'Passeport d’explorateur',
    passportReset: 'Réinitialiser',
    stampVisited: 'Visité',
    opensInNewTab: ' (s’ouvre dans un nouvel onglet)',
    highlightsLabel: 'Points clés',
    openCta: 'Ouvrir',
    notLiveYet: 'Bientôt disponible',
    emptyWorlds: 'Aucun monde à afficher pour le moment.',
    footerCalm:
      'Conçu pour le calme : sans publicité, sans compte, sans lecture automatique ni pistage sur cette page. Les tampons du passeport restent dans votre navigateur.',
    footerCredits:
      'Les vignettes sont des captures d’écran de chaque projet. Imagerie spatiale : NASA & ESO. Modèle anatomique : BodyParts3D © DBCLS & NIH HuBMAP, CC BY 4.0.',
    formatSummary(live, soon) {
      const parts = [`${live} ${live === 1 ? 'monde en ligne' : 'mondes en ligne'}`];
      if (soon > 0) parts.push(`${soon} en préparation`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `Pour ${formatList('fr', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `Affichage des ${totalCount} mondes.`;
      return `${matchCount} mondes sur ${totalCount} s’adressent à : ${this.audiences[audienceKey].toLowerCase()}.`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `Les ${totalLive} mondes ont été explorés !`
        : `${visitedCount} sur ${totalLive} mondes explorés`;
    },
  }),

  it: Object.freeze({
    pageTitle: 'Atlante delle Meraviglie · Mondi interattivi di apprendimento di Enrique Chan',
    metaDescription:
      'Mondi interattivi di apprendimento di Enrique Chan: un universo 3D, un atlante 3D del corpo umano, storie della buonanotte sull’IA e una guida serena per i genitori.',
    skipLink: 'Vai alle creazioni',
    langGroupLabel: 'Lingua',
    nightMode: 'Modalità notte',
    mastheadTitle: 'Atlante delle Meraviglie',
    mastheadLede:
      'Mondi interattivi per menti curiose, dal primo battito del cuore fino ai confini dell’universo.',
    worldsHeading: 'Creazioni',
    filterLabel: 'Mostra mondi per',
    everyone: 'Tutti',
    audiences: Object.freeze({
      kids: 'Bambini',
      students: 'Studenti',
      parents: 'Genitori',
      clinicians: 'Clinici',
    }),
    audienceNouns: Object.freeze({
      kids: 'bambini',
      students: 'studenti',
      parents: 'genitori',
      clinicians: 'clinici',
    }),
    passportLabel: 'Passaporto da esploratore',
    passportReset: 'Reimposta',
    stampVisited: 'Visitato',
    opensInNewTab: ' (si apre in una nuova scheda)',
    highlightsLabel: 'In evidenza',
    openCta: 'Apri',
    notLiveYet: 'In arrivo',
    emptyWorlds: 'Nessun mondo da mostrare al momento.',
    footerCalm:
      'Calma per scelta: niente pubblicità, niente account, niente riproduzione automatica né tracciamento. I timbri del passaporto restano nel tuo browser.',
    footerCredits:
      'Le immagini sono schermate di ciascun progetto. Immagini spaziali: NASA ed ESO. Modello anatomico: BodyParts3D © DBCLS e NIH HuBMAP, CC BY 4.0.',
    formatSummary(live, soon) {
      const parts = [`${live} ${live === 1 ? 'mondo attivo' : 'mondi attivi'}`];
      if (soon > 0) parts.push(`${soon} in arrivo`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `Per ${formatList('it', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `Visualizzazione di tutti i ${totalCount} mondi.`;
      return `${matchCount} mondi su ${totalCount} sono per ${this.audienceNouns[audienceKey]}.`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `Tutti i ${totalLive} mondi esplorati!`
        : `${visitedCount} su ${totalLive} mondi esplorati`;
    },
  }),

  de: Object.freeze({
    pageTitle: 'Atlas der Wunder · Interaktive Lernwelten von Enrique Chan',
    metaDescription:
      'Interaktive Lernwelten von Enrique Chan: ein 3D-Universum, ein 3D-Atlas des menschlichen Körpers, Gutenachtgeschichten über KI und ein ruhiger, wissenschaftlich fundierter Elternratgeber.',
    skipLink: 'Zu den Werken springen',
    langGroupLabel: 'Sprache',
    nightMode: 'Nachtmodus',
    mastheadTitle: 'Atlas der Wunder',
    mastheadLede:
      'Interaktive Welten für neugierige Köpfe – vom ersten Herzschlag bis zum Rand des Universums.',
    worldsHeading: 'Werke',
    filterLabel: 'Welten zeigen für',
    everyone: 'Alle',
    audiences: Object.freeze({
      kids: 'Kinder',
      students: 'Studierende',
      parents: 'Eltern',
      clinicians: 'Fachpersonal',
    }),
    audienceNouns: Object.freeze({
      kids: 'Kinder',
      students: 'Studierende',
      parents: 'Eltern',
      clinicians: 'medizinisches Fachpersonal',
    }),
    passportLabel: 'Entdeckerpass',
    passportReset: 'Zurücksetzen',
    stampVisited: 'Besucht',
    opensInNewTab: ' (öffnet in einem neuen Tab)',
    highlightsLabel: 'Highlights',
    openCta: 'Öffnen',
    notLiveYet: 'Demnächst verfügbar',
    emptyWorlds: 'Noch keine Welten zum Anzeigen.',
    footerCalm:
      'Bewusst ruhig gestaltet: keine Werbung, keine Konten, kein Autoplay und kein Tracking auf dieser Seite. Pass-Stempel bleiben in Ihrem Browser.',
    footerCredits:
      'Die Kachelbilder sind Screenshots der jeweiligen Projekte. Weltraumbilder: NASA & ESO. Anatomiemodell: BodyParts3D © DBCLS & NIH HuBMAP, CC BY 4.0.',
    formatSummary(live, soon) {
      const parts = [`${live} ${live === 1 ? 'aktive Welt' : 'aktive Welten'}`];
      if (soon > 0) parts.push(`${soon} in Vorbereitung`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `Für ${formatList('de', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `Alle ${totalCount} Welten werden angezeigt.`;
      return `${matchCount} von ${totalCount} Welten sind für ${this.audienceNouns[audienceKey]}.`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `Alle ${totalLive} Welten erkundet!`
        : `${visitedCount} von ${totalLive} Welten erkundet`;
    },
  }),

  ar: Object.freeze({
    pageTitle: 'أطلس العجائب · عوالم تعليمية تفاعلية من ابتكار إنريكي تشان',
    metaDescription:
      'عوالم تعليمية تفاعلية من ابتكار إنريكي تشان: كون ثلاثي الأبعاد، أطلس ثلاثي الأبعاد لجسم الإنسان، قصص ما قبل النوم لشرح الذكاء الاصطناعي، ودليل هادئ للآباء.',
    skipLink: 'انتقل إلى الإبداعات',
    langGroupLabel: 'اللغة',
    nightMode: 'الوضع الليلي',
    mastheadTitle: 'أطلس العجائب',
    mastheadLede:
      'عوالم تفاعلية للعقول الفضولية، من أول نبضة قلب إلى حافة الكون.',
    worldsHeading: 'الإبداعات',
    filterLabel: 'عرض العوالم لـ',
    everyone: 'الجميع',
    audiences: Object.freeze({
      kids: 'الأطفال',
      students: 'الطلاب',
      parents: 'الآباء',
      clinicians: 'الأطباء',
    }),
    audienceNouns: Object.freeze({
      kids: 'الأطفال',
      students: 'الطلاب',
      parents: 'الآباء',
      clinicians: 'الأطباء',
    }),
    passportLabel: 'جواز المستكشف',
    passportReset: 'إعادة ضبط',
    stampVisited: 'تمت الزيارة',
    opensInNewTab: ' (يفتح في علامة تبويب جديدة)',
    highlightsLabel: 'أبرز المزايا',
    openCta: 'افتح',
    notLiveYet: 'قريباً',
    emptyWorlds: 'لا توجد عوالم لعرضها بعد.',
    footerCalm:
      'هادئ بالتصميم: بلا إعلانات، بلا حسابات، بلا تشغيل تلقائي وبلا تتبع في هذه الصفحة. تُحفظ أختام الجواز في متصفحك فقط.',
    footerCredits:
      'صور البطاقات هي لقطات شاشة لكل مشروع. صور الفضاء: NASA و ESO. النموذج التشريحي: BodyParts3D © DBCLS و NIH HuBMAP، برخصة CC BY 4.0.',
    formatSummary(live, soon) {
      const parts = [`${live} عوالم متاحة`];
      if (soon > 0) parts.push(`${soon} قيد الإعداد`);
      return parts.join(' · ');
    },
    formatAudiencePhrase(keys) {
      return `مناسب لـ ${formatList('ar', keys.map((k) => this.audienceNouns[k]))}`;
    },
    formatFilterStatus(audienceKey, matchCount, totalCount) {
      if (audienceKey === 'all') return `يتم عرض جميع العوالم الـ ${totalCount}.`;
      return `${matchCount} من أصل ${totalCount} عوالم مخصصة لـ ${this.audienceNouns[audienceKey]}.`;
    },
    formatPassport(visitedCount, totalLive) {
      return visitedCount === totalLive
        ? `تم استكشاف جميع العوالم الـ ${totalLive}!`
        : `تم استكشاف ${visitedCount} من ${totalLive} عوالم`;
    },
  }),
});

export const CREATION_TRANSLATIONS = Object.freeze({
  'cosmic-explorer': Object.freeze({
    es: Object.freeze({
      title: 'Explorador Cósmico 3D',
      kind: 'Universo 3D',
      description:
        'Vuela desde la Tierra y la Luna más allá de las sondas Voyager hasta exoplanetas cercanos, la Vía Láctea y el borde del universo observable, con imágenes reales de la NASA y el ESO.',
      facts: Object.freeze(['6.451 exoplanetas', 'Visita guiada', 'Trivia espacial']),
      alt: 'Explorador Cósmico 3D mostrando la Tierra desde el espacio, con la Estación Espacial Internacional etiquetada sobre un campo de estrellas.',
    }),
    zh: Object.freeze({
      title: '宇宙探索 3D',
      kind: '3D 宇宙',
      description:
        '借助 NASA 与 ESO 的真实影像，从地球与月球出发，飞越旅行者号探测器，探索邻近系外行星、银河系直至可观测宇宙的边缘。',
      facts: Object.freeze(['6,451 颗系外行星', '导览之旅', '太空问答']),
      alt: '宇宙探索 3D 展示从太空俯瞰地球的画面，星空背景中标注着国际空间站。',
    }),
    yue: Object.freeze({
      title: '宇宙探索 3D',
      kind: '3D 宇宙',
      description:
        '配合 NASA 同 ESO 嘅真實影像，由地球同月球出發，飛越旅行者號探測器，一路探索鄰近系外行星、銀河系直到可觀測宇宙嘅邊緣。',
      facts: Object.freeze(['6,451 粒系外行星', '導賞之旅', '太空問答']),
      alt: '宇宙探索 3D 顯示由太空望向地球嘅畫面，星空背景入面標示住國際太空站。',
    }),
    ja: Object.freeze({
      title: 'コズミック・エクスプローラー 3D',
      kind: '3D 宇宙図鑑',
      description:
        'NASA と ESO の実写映像とともに、地球や月からボイジャー探査機を越え、近くの系外惑星、天の川銀河、そして観測可能な宇宙の果てまで旅しましょう。',
      facts: Object.freeze(['系外惑星 6,451個', 'ガイドツアー', '宇宙クイズ']),
      alt: '星空を背景に宇宙から見た地球と国際宇宙ステーションのラベルを表示する「コズミック・エクスプローラー 3D」の画面。',
    }),
    ko: Object.freeze({
      title: '코스믹 익스플로러 3D',
      kind: '3D 우주 탐험',
      description:
        '실제 NASA 및 ESO 영상과 함께 지구와 달에서 출발해 보이저 탐사선을 지나 가까운 외계 행성, 은하수, 관측 가능한 우주의 끝까지 비행해 보세요.',
      facts: Object.freeze(['외계 행성 6,451개', '가이드 투어', '우주 퀴즈']),
      alt: '별이 가득한 우주 배경 속에서 지구와 국제우주정거장(ISS) 라벨을 보여주는 코스믹 익스플로러 3D 화면.',
    }),
    pt: Object.freeze({
      title: 'Explorador Cósmico 3D',
      kind: 'Universo 3D',
      description:
        'Voe da Terra e da Lua além das sondas Voyager até exoplanetas próximos, a Via Láctea e os confins do universo observável, com imagens reais da NASA e do ESO.',
      facts: Object.freeze(['6.451 exoplanetas', 'Tour guiado', 'Quiz espacial']),
      alt: 'Explorador Cósmico 3D mostrando a Terra vista do espaço, com a Estação Espacial Internacional identificada sobre um campo de estrelas.',
    }),
    fr: Object.freeze({
      title: 'Explorateur Cosmique 3D',
      kind: 'Univers 3D',
      description:
        'Volez de la Terre et de la Lune au-delà des sondes Voyager jusqu’aux exoplanètes proches, à la Voie lactée et aux confins de l’univers observable, avec de vraies images de la NASA et de l’ESO.',
      facts: Object.freeze(['6 451 exoplanètes', 'Visite guidée', 'Quiz spatial']),
      alt: 'Explorateur Cosmique 3D montrant la Terre vue de l’espace, avec la Station spatiale internationale étiquetée sur un champ d’étoiles.',
    }),
    it: Object.freeze({
      title: 'Esploratore Cosmico 3D',
      kind: 'Universo 3D',
      description:
        'Vola dalla Terra e dalla Luna oltre le sonde Voyager fino agli esopianeti vicini, alla Via Lattea e ai confini dell’universo osservabile, con immagini reali della NASA e dell’ESO.',
      facts: Object.freeze(['6.451 esopianeti', 'Tour guidato', 'Quiz spaziale']),
      alt: 'Esploratore Cosmico 3D che mostra la Terra vista dallo spazio, con la Stazione Spaziale Internazionale etichettata su un campo stellato.',
    }),
    de: Object.freeze({
      title: 'Kosmischer Entdecker 3D',
      kind: '3D-Universum',
      description:
        'Fliege von Erde und Mond über die Voyager-Sonden hinaus zu nahen Exoplaneten, der Milchstraße und dem Rand des sichtbaren Universums – mit echten Bildern von NASA und ESO.',
      facts: Object.freeze(['6.451 Exoplaneten', 'Geführte Tour', 'Weltraum-Quiz']),
      alt: 'Kosmischer Entdecker 3D zeigt die Erde aus dem All mit der beschrifteten Internationalen Raumstation vor einem Sternenfeld.',
    }),
    ar: Object.freeze({
      title: 'المستكشف الكوني ثلاثي الأبعاد',
      kind: 'كون ثلاثي الأبعاد',
      description:
        'حلّق من الأرض والقمر متجاوزاً مسبارَي فوياجر إلى الكواكب الخارجية القريبة ودرب التبانة وحافة الكون المرئي، مع صور حقيقية من NASA و ESO.',
      facts: Object.freeze(['6,451 كوكباً خارجياً', 'جولة إرشادية', 'مسابقة فضائية']),
      alt: 'المستكشف الكوني ثلاثي الأبعاد يعرض كوكب الأرض من الفضاء مع تسمية محطة الفضاء الدولية أمام حقل من النجوم.',
    }),
  }),

  'human-body-atlas': Object.freeze({
    es: Object.freeze({
      title: 'Atlas 3D del Cuerpo Humano',
      kind: 'Anatomía 3D',
      description:
        'Anatomía 3D realista que puedes explorar capa por capa: piel, músculos, esqueleto, órganos, cerebro y nervios, con flujo sanguíneo en vivo.',
      facts: Object.freeze(['2.225 estructuras', 'Modo infantil y clínico', '9 idiomas']),
      alt: 'Atlas 3D del Cuerpo Humano mostrando una figura 3D de pie con los músculos y el esqueleto visibles.',
    }),
    zh: Object.freeze({
      title: '人体 3D 图谱',
      kind: '3D 解剖学',
      description:
        '可逐层剖析的写实 3D 人体解剖：皮肤、肌肉、骨骼、器官、大脑与神经，并配有动态血液循环演示。',
      facts: Object.freeze(['2,225 个命名结构', '儿童与临床双模式', '支持 9 种语言']),
      alt: '人体 3D 图谱展示一具清晰可见肌肉与骨骼的站立 3D 人体模型。',
    }),
    yue: Object.freeze({
      title: '人體 3D 圖譜',
      kind: '3D 解剖學',
      description:
        '可以逐層揭開嚟睇嘅寫實 3D 人體解剖：皮膚、肌肉、骨骼、器官、大腦同神經，仲有即時血液循環演示。',
      facts: Object.freeze(['2,225 個解剖結構', '兒童及臨床雙模式', '支援 9 種語言']),
      alt: '人體 3D 圖譜展示一具清晰見到肌肉同骨骼嘅企立 3D 人體模型。',
    }),
    ja: Object.freeze({
      title: '人体 3D アトラス',
      kind: '3D 解剖図鑑',
      description:
        '皮膚、筋肉、骨格、臓器、脳、神経まで一層ずつめくって学べるリアルな 3D 解剖モデル。血流アニメーションも搭載。',
      facts: Object.freeze(['2,225 の部位名称', 'キッズ＆臨床モード', '9言語対応']),
      alt: '筋肉と骨格が見える立位の 3D 人体モデルを表示する「人体 3D アトラス」の画面。',
    }),
    ko: Object.freeze({
      title: '인체 3D 아틀라스',
      kind: '3D 해부학',
      description:
        '피부, 근육, 골격, 장기, 뇌와 신경을 한 겹씩 벗겨 보며 생생한 혈류까지 확인할 수 있는 실감형 3D 인체 해부도입니다.',
      facts: Object.freeze(['2,225개 해부 구조', '어린이·임상 모드', '9개 언어 지원']),
      alt: '근육과 골격이 드러난 직립 3D 인체 모델을 보여주는 인체 3D 아틀라스 화면.',
    }),
    pt: Object.freeze({
      title: 'Atlas 3D do Corpo Humano',
      kind: 'Anatomia 3D',
      description:
        'Anatomia 3D realista para explorar camada por camada: pele, músculos, esqueleto, órgãos, cérebro e nervos, com fluxo sanguíneo ao vivo.',
      facts: Object.freeze(['2.225 estruturas', 'Modos infantil e clínico', '9 idiomas']),
      alt: 'Atlas 3D do Corpo Humano mostrando uma figura 3D em pé com músculos e esqueleto visíveis.',
    }),
    fr: Object.freeze({
      title: 'Atlas 3D du Corps Humain',
      kind: 'Anatomie 3D',
      description:
        'Une anatomie 3D réaliste à explorer couche par couche : peau, muscles, squelette, organes, cerveau et nerfs, avec circulation sanguine animée.',
      facts: Object.freeze(['2 225 structures nommées', 'Modes enfant & clinique', '9 langues']),
      alt: 'Atlas 3D du Corps Humain montrant une silhouette 3D debout avec ses muscles et son squelette visibles.',
    }),
    it: Object.freeze({
      title: 'Atlante 3D del Corpo Umano',
      kind: 'Anatomia 3D',
      description:
        'Anatomia 3D realistica da esplorare strato dopo strato: pelle, muscoli, scheletro, organi, cervello e nervi, con flusso sanguigno animato.',
      facts: Object.freeze(['2.225 strutture', 'Modalità bimbi e clinica', '9 lingue']),
      alt: 'Atlante 3D del Corpo Umano che mostra una figura 3D in piedi con muscoli e scheletro visibili.',
    }),
    de: Object.freeze({
      title: '3D-Atlas des menschlichen Körpers',
      kind: '3D-Anatomie',
      description:
        'Realistische 3D-Anatomie zum Schicht-für-Schicht-Entdecken: Haut, Muskeln, Skelett, Organe, Gehirn und Nerven mit animiertem Blutfluss.',
      facts: Object.freeze(['2.225 Strukturen', 'Kinder- & Klinikmodus', '9 Sprachen']),
      alt: '3D-Atlas des menschlichen Körpers mit einer stehenden 3D-Figur, deren Muskeln und Skelett sichtbar sind.',
    }),
    ar: Object.freeze({
      title: 'أطلس جسم الإنسان ثلاثي الأبعاد',
      kind: 'تشريح ثلاثي الأبعاد',
      description:
        'تشريح ثلاثي الأبعاد واقعي يمكنك تقشيره طبقة تلو الأخرى: الجلد والعضلات والهيكل العظمي والأعضاء والدماغ والأعصاب مع تدفق دموي حي.',
      facts: Object.freeze(['2,225 بنية تشريحية', 'وضع للأطفال والأطباء', '9 لغات']),
      alt: 'أطلس جسم الإنسان ثلاثي الأبعاد يعرض مجسماً واقفاً تظهر فيه العضلات والهيكل العظمي بوضوح.',
    }),
  }),

  'curious-little-minds': Object.freeze({
    es: Object.freeze({
      title: 'Pequeñas Mentes Curiosas',
      kind: 'Cuentos ilustrados y narrados',
      description:
        'Cálidos cuentos en acuarela para antes de dormir que explican la IA con sencillez, comenzando con Lily y Robo: Aventuras de día y de noche.',
      facts: Object.freeze(['3 a 7 años', 'EN · ES · 中文', 'Lectura narrada gratis']),
      alt: 'Portada de Lily y Robo: Aventuras de día y de noche, un libro ilustrado en acuarela con una niña y un pequeño robot redondo bajo un cielo estrellado.',
    }),
    zh: Object.freeze({
      title: '好奇小脑袋',
      kind: '绘本与有声伴读',
      description:
        '温馨的水彩睡前故事，用孩子听得懂的方式讲述人工智能，首部绘本为《莉莉与小罗博：昼夜奇遇记》。',
      facts: Object.freeze(['3–7 岁适用', 'EN · ES · 中文', '免费有声伴读']),
      alt: '《莉莉与小罗博：昼夜奇遇记》水彩绘本封面：星空下站着一个小女孩和一个圆滚滚的小机器人。',
    }),
    yue: Object.freeze({
      title: '好奇小腦袋',
      kind: '繪本及有聲伴讀',
      description:
        '溫馨嘅水彩睡前故事，用小朋友聽得明嘅方式講解人工智能，由《莉莉與小羅博：日與夜歷險記》開始。',
      facts: Object.freeze(['適合 3–7 歲', 'EN · ES · 中文', '免費有聲伴讀']),
      alt: '《莉莉與小羅博：日與夜歷險記》水彩繪本封面：星空下企住一個小女孩同一個圓碌碌嘅小機械人。',
    }),
    ja: Object.freeze({
      title: 'ちいさな好奇心',
      kind: '絵本＆読み聞かせ',
      description:
        'AI のしくみをやさしく伝える水彩画のおやすみ絵本。『リリーとロボ：昼と夜のぼうけん』から始まります。',
      facts: Object.freeze(['3〜7歳向け', 'EN · ES · 中文', '無料読み聞かせ']),
      alt: '星空の下に立つ少女と小さな丸いロボットが描かれた水彩絵本『リリーとロボ：昼と夜のぼうけん』の表紙。',
    }),
    ko: Object.freeze({
      title: '호기심 많은 작은 마음',
      kind: '그림책 & 구연동화',
      description:
        'AI를 쉽고 따뜻하게 풀어낸 수채화 잠자리 동화로, 《릴리와 로보: 낮과 밤의 모험》으로 시작합니다.',
      facts: Object.freeze(['3–7세 권장', 'EN · ES · 中文', '무료 읽어주기']),
      alt: '별이 빛나는 밤하늘 아래 소녀와 작은 둥근 로봇이 그려진 수채화 그림책 《릴리와 로보: 낮과 밤의 모험》 표지.',
    }),
    pt: Object.freeze({
      title: 'Pequenas Mentes Curiosas',
      kind: 'Livros ilustrados e narrados',
      description:
        'Aconchegantes histórias de ninar em aquarela que explicam a IA de forma simples, começando com Lily & Robo: Aventuras de Dia e de Noite.',
      facts: Object.freeze(['3 a 7 anos', 'EN · ES · 中文', 'Narração gratuita']),
      alt: 'Capa de Lily & Robo: Aventuras de Dia e de Noite, um livro ilustrado em aquarela com uma menina e um pequeno robô redondo sob um céu estrelado.',
    }),
    fr: Object.freeze({
      title: 'Petits Esprits Curieux',
      kind: 'Albums illustrés & histoires lues',
      description:
        'De douces histoires du soir à l’aquarelle pour comprendre l’IA simplement, à commencer par Lily & Robo : Aventures de jour et de nuit.',
      facts: Object.freeze(['3 à 7 ans', 'EN · ES · 中文', 'Lecture audio gratuite']),
      alt: 'Couverture de Lily & Robo : Aventures de jour et de nuit, un album à l’aquarelle montrant une fillette et un petit robot rond sous un ciel étoilé.',
    }),
    it: Object.freeze({
      title: 'Piccole Menti Curiose',
      kind: 'Libri illustrati e audiolibri',
      description:
        'Dolci storie della buonanotte ad acquerello che spiegano l’IA con semplicità, a partire da Lily & Robo: Avventure di giorno e di notte.',
      facts: Object.freeze(['3–7 anni', 'EN · ES · 中文', 'Lettura audio gratuita']),
      alt: 'Copertina di Lily & Robo: Avventure di giorno e di notte, un albo illustrato ad acquerello con una bambina e un piccolo robot rotondo sotto un cielo stellato.',
    }),
    de: Object.freeze({
      title: 'Kleine Neugierige Köpfe',
      kind: 'Bilderbücher & Vorlesegeschichten',
      description:
        'Warmherzige Aquarell-Gutenachtgeschichten, die KI kindgerecht erklären – beginnend mit Lily & Robo: Abenteuer bei Tag und Nacht.',
      facts: Object.freeze(['3 bis 7 Jahre', 'EN · ES · 中文', 'Kostenloses Vorlesen']),
      alt: 'Buchcover von Lily & Robo: Abenteuer bei Tag und Nacht – ein Aquarell-Bilderbuch mit einem Mädchen und einem kleinen runden Roboter unter dem Sternenhimmel.',
    }),
    ar: Object.freeze({
      title: 'عقول صغيرة فضولية',
      kind: 'كتب مصوّرة وقراءة مسموعة',
      description:
        'قصص دافئة بالألوان المائية قبل النوم تشرح الذكاء الاصطناعي ببساطة، بدءاً من قصة ليلي وروبو: مغامرات النهار والليل.',
      facts: Object.freeze(['من 3 إلى 7 سنوات', 'EN · ES · 中文', 'قراءة صوتية مجانية']),
      alt: 'غلاف كتاب ليلي وروبو: مغامرات النهار والليل المرسوم بالألوان المائية ويُظهر طفلة وروبوتاً صغيراً مستديراً تحت سماء مرصعة بالنجوم.',
    }),
  }),

  'safekids-portal': Object.freeze({
    es: Object.freeze({
      title: 'Portal SafeKids',
      kind: 'Guía para padres',
      description:
        'Una guía serena y respaldada por estudios para padres: series de bajo estímulo, juegos sin anuncios, alternativas de comida real y audio sin pantallas según la edad.',
      facts: Object.freeze(['119 selecciones', '0 a 12 años', '30 estudios citados']),
      alt: 'Ilustración del Portal SafeKids: un niño construye con bloques de madera junto a un reproductor de audio sin pantalla y una pila de libros ilustrados.',
    }),
    zh: Object.freeze({
      title: 'SafeKids 育儿指南',
      kind: '家长指南',
      description:
        '科学循证的温和育儿指南：按孩子年龄筛选低刺激动画、无广告游戏、天然饮食替代方案与无屏音频。',
      facts: Object.freeze(['119 项严选推荐', '0–12 岁适用', '引用 30 项研究']),
      alt: 'SafeKids 育儿指南插画：一个孩子正在搭木积木，旁边放着无屏音频播放器和一摞绘本。',
    }),
    yue: Object.freeze({
      title: 'SafeKids 育兒指南',
      kind: '家長指南',
      description:
        '有研究根據嘅溫和育兒指南：按小朋友年齡篩選低刺激節目、無廣告遊戲、天然健康小食替代方案同無屏幕音訊。',
      facts: Object.freeze(['119 項精選推薦', '適合 0–12 歲', '引用 30 項研究']),
      alt: 'SafeKids 育兒指南插畫：一個小朋友砌緊木積木，隔離擺住無屏幕音訊機同一疊圖書。',
    }),
    ja: Object.freeze({
      title: 'SafeKids ポータル',
      kind: '保護者向けガイド',
      description:
        '研究に基づく穏やかな子育てガイド：低刺激の番組、広告なしゲーム、自然派おやつ、画面なしオーディオを年齢別に紹介。',
      facts: Object.freeze(['厳選 119 作品', '0〜12歳向け', '研究論文 30件引用']),
      alt: 'SafeKids ポータルのイラスト：画面のないオーディオプレーヤーと絵本の横で積み木遊びをする子ども。',
    }),
    ko: Object.freeze({
      title: '세이프키즈 포털',
      kind: '부모 가이드',
      description:
        '연구에 기반한 차분한 육아 가이드: 저자극 영상, 무광고 게임, 건강한 간식 대안, 무화면 오디오를 아이 연령별로 찾아보세요.',
      facts: Object.freeze(['엄선된 추천 119선', '0–12세 대상', '연구 30건 인용']),
      alt: '세이프키즈 포털 일러스트: 화면 없는 오디오 플레이어와 그림책 더미 옆에서 나무 블록을 쌓는 아이.',
    }),
    pt: Object.freeze({
      title: 'Portal SafeKids',
      kind: 'Guia para pais',
      description:
        'Um guia tranquilo e baseado em pesquisas para pais: séries de baixo estímulo, jogos sem anúncios, lanches naturais e áudio sem tela por faixa etária.',
      facts: Object.freeze(['119 escolhas', '0 a 12 anos', '30 estudos citados']),
      alt: 'Ilustração do Portal SafeKids: uma criança brinca com blocos de madeira ao lado de um player de áudio sem tela e uma pilha de livros ilustrados.',
    }),
    fr: Object.freeze({
      title: 'Portail SafeKids',
      kind: 'Guide pour parents',
      description:
        'Un guide apaisé et fondé sur la recherche pour les parents : émissions à faible stimulation, jeux sans pub, collations saines et audio sans écran selon l’âge.',
      facts: Object.freeze(['119 sélections', '0 à 12 ans', '30 études citées']),
      alt: 'Illustration du Portail SafeKids : un enfant construit avec des blocs en bois à côté d’un lecteur audio sans écran et d’une pile d’albums illustrés.',
    }),
    it: Object.freeze({
      title: 'Portale SafeKids',
      kind: 'Guida per genitori',
      description:
        'Una guida serena e basata sulla ricerca per i genitori: programmi a basso stimolo, giochi senza pubblicità, merende genuine e audio senza schermo per fascia d’età.',
      facts: Object.freeze(['119 selezioni', '0–12 anni', '30 studi citati']),
      alt: 'Illustrazione del Portale SafeKids: un bambino costruisce con blocchi di legno accanto a un lettore audio senza schermo e a una pila di libri illustrati.',
    }),
    de: Object.freeze({
      title: 'SafeKids-Portal',
      kind: 'Elternratgeber',
      description:
        'Ein ruhiger, wissenschaftlich fundierter Elternratgeber: reizarme Serien, werbefreie Spiele, gesunde Snack-Alternativen und bildschirmfreies Audio nach Alter.',
      facts: Object.freeze(['119 Empfehlungen', '0 bis 12 Jahre', '30 zitierte Studien']),
      alt: 'Illustration des SafeKids-Portals: Ein Kind baut mit Holzklötzen neben einem bildschirmfreien Audioplayer und einem Stapel Bilderbücher.',
    }),
    ar: Object.freeze({
      title: 'بوابة SafeKids',
      kind: 'دليل للآباء',
      description:
        'دليل هادئ ومدعوم بالأبحاث للآباء: عروض منخفضة التحفيز، ألعاب بلا إعلانات، بدائل غذائية طبيعية وصوتيات بلا شاشات حسب عمر طفلك.',
      facts: Object.freeze(['119 اختياراً منتقى', 'من 0 إلى 12 سنة', '30 دراسة علمية']),
      alt: 'رسم توضيحي لبوابة SafeKids: طفل يبني بمكعبات خشبية بجانب مشغل صوتي بلا شاشة وكومة من الكتب المصورة.',
    }),
  }),

  'timeline-of-everything-3d': Object.freeze({
    es: Object.freeze({
      title: 'ChronoVerse 3D',
      kind: 'Línea del tiempo 3D',
      description:
        'Viaja por 13.800 millones de años en 30 dioramas 3D: del Big Bang y la división de Pangea en siete continentes a los dinosaurios, la evolución humana y el año 3000.',
      facts: Object.freeze([]),
      alt: 'Escena de ChronoVerse 3D con el Sol recién nacido y la proto-Tierra fundida brillando dentro de una nebulosa solar en espiral.',
    }),
    zh: Object.freeze({
      title: '时空宇宙 3D',
      kind: '3D 深时历史长卷',
      description:
        '穿越 138 亿年历史与 30 座 3D 全景沙盘——从宇宙大爆炸、盘古大陆分裂为七大洲，到恐龙时代、人类演化与公元 3000 年。',
      facts: Object.freeze([]),
      alt: '时空宇宙 3D 场景：新生的太阳与炽热熔融的原初地球在旋转的太阳星云中闪耀。',
    }),
    yue: Object.freeze({
      title: '時空宇宙 3D',
      kind: '3D 深時歷史長卷',
      description:
        '飛越 138 億年歷史同 30 個 3D 全景模型——由宇宙大爆炸、盤古大陸分裂做七大洲，到恐龍時代、人類演化同西元 3000 年。',
      facts: Object.freeze([]),
      alt: '時空宇宙 3D 場景：初生嘅太陽同熾熱熔融嘅原始地球喺旋轉緊嘅太陽星雲入面發光。',
    }),
    ja: Object.freeze({
      title: 'クロノバース 3D',
      kind: '3D 138億年タイムライン',
      description:
        '30の3Dジオラマで138億年の歴史を飛行体験——ビッグバンやパンゲア超大陸の分裂から、恐竜、人類の進化、西暦3000年まで。',
      facts: Object.freeze([]),
      alt: '渦巻く太陽星雲の中で生まれたばかりの太陽と灼熱の原始地球が輝く「クロノバース 3D」のシーン。',
    }),
    ko: Object.freeze({
      title: '크로노버스 3D',
      kind: '3D 빅히스토리 타임라인',
      description:
        '30개의 3D 디오라마를 따라 138억 년의 역사를 비행하세요 — 빅뱅과 판게아 초대륙의 분리부터 공룡, 인류 진화, 서기 3000년까지.',
      facts: Object.freeze([]),
      alt: '소용돌이치는 태양 성운 속에서 갓 태어난 태양과 용암으로 빛나는 원시 지구를 보여주는 크로노버스 3D 장면.',
    }),
    pt: Object.freeze({
      title: 'ChronoVerse 3D',
      kind: 'Linha do tempo 3D',
      description:
        'Voe por 13,8 bilhões de anos em 30 dioramas 3D — do Big Bang e da divisão da Pangeia em sete continentes aos dinossauros, à evolução humana e ao ano 3000.',
      facts: Object.freeze([]),
      alt: 'Cena do ChronoVerse 3D com o Sol recém-nascido e a proto-Terra derretida brilhando dentro de uma nebulosa solar em espiral.',
    }),
    fr: Object.freeze({
      title: 'ChronoVerse 3D',
      kind: 'Frise du temps profond 3D',
      description:
        'Survolez 13,8 milliards d’années à travers 30 dioramas 3D — du Big Bang et la fracturation de la Pangée aux dinosaures, à l’évolution humaine et à l’an 3000.',
      facts: Object.freeze([]),
      alt: 'Scène de ChronoVerse 3D montrant le Soleil naissant et la proto-Terre en fusion au cœur d’une nébuleuse solaire tourbillonnante.',
    }),
    it: Object.freeze({
      title: 'ChronoVerse 3D',
      kind: 'Linea del tempo profondo 3D',
      description:
        'Vola attraverso 13,8 miliardi di anni in 30 diorami 3D — dal Big Bang e la divisione della Pangea ai dinosauri, all’evoluzione umana e all’anno 3000.',
      facts: Object.freeze([]),
      alt: 'Scena di ChronoVerse 3D con il Sole appena nato e la proto-Terra fusa che brillano dentro una nebulosa solare a spirale.',
    }),
    de: Object.freeze({
      title: 'ChronoVerse 3D',
      kind: '3D-Tiefenzeitleiste',
      description:
        'Fliege durch 13,8 Milliarden Jahre in 30 3D-Dioramen – vom Urknall und dem Auseinanderbrechen Pangäas über die Dinosaurier und die menschliche Evolution bis zum Jahr 3000.',
      facts: Object.freeze([]),
      alt: 'ChronoVerse-3D-Szene mit der neugeborenen Sonne und der geschmolzenen Proto-Erde in einem wirbelnden Sonnennebel.',
    }),
    ar: Object.freeze({
      title: 'ChronoVerse 3D',
      kind: 'خط زمني ثلاثي الأبعاد للتاريخ العميق',
      description:
        'حلّق عبر 13.8 مليار سنة في 30 مشهداً ثلاثي الأبعاد — من الانفجار العظيم وانقسام بانجيا إلى الديناصورات وتطور الإنسان وعام 3000.',
      facts: Object.freeze([]),
      alt: 'مشهد من ChronoVerse 3D يُظهر الشمس الوليدة والأرض الأولية المنصهرة تتوهجان داخل سديم شمسي حلزوني.',
    }),
  }),

  'dino-portal-3d': Object.freeze({
    es: Object.freeze({
      title: 'DinoVerse 3D',
      kind: 'Paleontología y fósiles 3D',
      description:
        'Explora 29 especies prehistóricas en seis eras geológicas con rayos X 3D en 3 capas, rugidos bioacústicos, narración Chirp 3 HD y simulador del impacto de Chicxulub.',
      facts: Object.freeze(['29 especies prehistóricas', 'Rayos X 3D en 3 capas', 'Impacto de Chicxulub']),
      alt: 'DinoVerse 3D mostrando un Tyrannosaurus rex en 3D con escamas y dientes detallados sobre una plataforma giratoria iluminada.',
    }),
    zh: Object.freeze({
      title: '恐龙纪元 3D',
      kind: '3D 古生物与化石图鉴',
      description:
        '探索横跨六个地质时代的 29 种史前生物，支持三层 3D X 光解剖、生物声学恐龙鸣叫、Chirp 3 HD 语音伴读与 6600 万年前小行星撞击模拟。',
      facts: Object.freeze(['29 种史前生物', '三层 3D X 光透视', '希克苏鲁伯撞击模拟']),
      alt: '恐龙纪元 3D 画面：发光旋转展台上站立着细节逼真的 3D 霸王龙。',
    }),
    yue: Object.freeze({
      title: '恐龍紀元 3D',
      kind: '3D 古生物與化石圖鑑',
      description:
        '探索橫跨六個地質時代嘅 29 種史前生物，支援三層 3D X 光解剖、生物聲學恐龍叫聲、Chirp 3 HD 語音伴讀同 6600 萬年前小行星撞擊模擬。',
      facts: Object.freeze(['29 種史前生物', '三層 3D X 光透視', '希克蘇魯伯撞擊實驗室']),
      alt: '恐龍紀元 3D 畫面：發光旋轉展台上面企住細節逼真嘅 3D 霸王龍。',
    }),
    ja: Object.freeze({
      title: 'ディノバース 3D',
      kind: '3D 恐竜・古生物図鑑',
      description:
        '6つの地質時代にわたる29種の古生物を3層3D X線解剖、生体音響の鳴き声、Chirp 3 HD 読み上げ、6600万年前の小惑星衝突ラボで探検。',
      facts: Object.freeze(['古生物 29種', '3層 3D X線解剖', '小惑星衝突ラボ']),
      alt: '光るターンテーブルの上に立つ、鱗や歯まで精密な 3D ティラノサウルス・レックスを表示する「ディノバース 3D」。',
    }),
    ko: Object.freeze({
      title: '다이노버스 3D',
      kind: '3D 고생물학 & 화석 도감',
      description:
        '6개 지질 시대의 고생물 29종을 3단계 3D X-레이 해부, 생체음향 공룡 울음소리, Chirp 3 HD 구연 내레이션, 칙술루브 소행성 충돌 랩으로 탐험하세요.',
      facts: Object.freeze(['고생물 29종 수록', '3단계 3D X-레이', '소행성 충돌 실험실']),
      alt: '빛나는 턴테이블 위에서 정교한 비늘과 이빨을 드러낸 3D 티라노사우루스 렉스를 보여주는 다이노버스 3D 화면.',
    }),
    pt: Object.freeze({
      title: 'DinoVerse 3D',
      kind: 'Paleontologia e fósseis 3D',
      description:
        'Explore 29 espécies pré-históricas em seis eras geológicas com raio-X 3D em 3 camadas, rugidos bioacústicos, narração Chirp 3 HD e laboratório do impacto de Chicxulub.',
      facts: Object.freeze(['29 espécies pré-históricas', 'Raio-X 3D em 3 camadas', 'Impacto de Chicxulub']),
      alt: 'DinoVerse 3D mostrando um Tyrannosaurus rex em 3D com escamas e dentes detalhados sobre uma plataforma giratória iluminada.',
    }),
    fr: Object.freeze({
      title: 'DinoVerse 3D',
      kind: 'Paléontologie & fossiles 3D',
      description:
        'Explorez 29 espèces préhistoriques sur six ères géologiques avec rayons X 3D à 3 couches, cris bio-acoustiques, narration Chirp 3 HD et simulateur d’impact de Chicxulub.',
      facts: Object.freeze(['29 espèces préhistoriques', 'Rayons X 3D 3 couches', 'Impact de Chicxulub']),
      alt: 'DinoVerse 3D montrant un Tyrannosaurus rex en 3D aux écailles et aux dents détaillées sur un plateau tournant lumineux.',
    }),
    it: Object.freeze({
      title: 'DinoVerse 3D',
      kind: 'Paleontologia e fossili 3D',
      description:
        'Esplora 29 specie preistoriche in sei ere geologiche con raggi X 3D a 3 strati, richiami bioacustici, narrazione Chirp 3 HD e simulatore dell’impatto di Chicxulub.',
      facts: Object.freeze(['29 specie preistoriche', 'Raggi X 3D a 3 strati', 'Impatto di Chicxulub']),
      alt: 'DinoVerse 3D che mostra un Tyrannosaurus rex in 3D con squame e denti dettagliati su una piattaforma girevole illuminata.',
    }),
    de: Object.freeze({
      title: 'DinoVerse 3D',
      kind: '3D-Paläontologie & Fossilien',
      description:
        'Erkunde 29 prähistorische Arten aus sechs Erdzeitaltern mit 3-stufigem 3D-Röntgenblick, bioakustischen Rufen, Chirp-3-HD-Erzählung und Chicxulub-Einschlaglabor.',
      facts: Object.freeze(['29 prähistorische Arten', '3-Schichten-3D-Röntgen', 'Chicxulub-Einschlaglabor']),
      alt: 'DinoVerse 3D zeigt einen 3D-Tyrannosaurus rex mit detaillierten Schuppen und Zähnen auf einem beleuchteten Drehteller.',
    }),
    ar: Object.freeze({
      title: 'DinoVerse 3D',
      kind: 'علم الحفريات والديناصورات 3D',
      description:
        'استكشف 29 كائناً من عصور ما قبل التاريخ عبر ستة عصور جيولوجية مع أشعة سينية ثلاثية الطبقات، وأصوات حيوية، وسرد Chirp 3 HD ومختبر اصطدام تشيكشولوب.',
      facts: Object.freeze(['29 كائناً ما قبل التاريخ', 'أشعة سينية 3D من 3 طبقات', 'مختبر نيازك تشيكشولوب']),
      alt: 'DinoVerse 3D يعرض ديناصور تيرانوصور ركس ثلاثي الأبعاد بحراشف وأسنان مفصلة على منصة دوارة مضيئة.',
    }),
  }),

  'inside-out-studio': Object.freeze({
    es: Object.freeze({
      title: 'Inside Out Studio',
      kind: 'Laboratorio 3D de ingeniería',
      description:
        'Desarma y conduce máquinas reales icónicas en 18 categorías: superdeportivos, aviones, submarinos, cohetes, rovers marcianos, trenes bala y relojes mecánicos.',
      facts: Object.freeze(['18 categorías de máquinas', '5 modos interactivos', 'Conduce, vuela y despega']),
      alt: 'Vista explotada en 3D de Inside Out Studio de un Ferrari SF90 Stradale rojo mostrando su motor V8 biturbo y motores híbridos.',
    }),
    zh: Object.freeze({
      title: '透视工程工坊',
      kind: '3D 机械拆解与工程实验室',
      description:
        '拆解并试驾 18 大类标志性真实机械——超跑、客机、核潜艇、重型火箭、火星探测车、新干线高铁与机械计时码表。',
      facts: Object.freeze(['18 大机械类别', '5 种互动模式', '驾驶·飞行·火箭发射']),
      alt: '透视工程工坊展示红色法拉利 SF90 Stradale 的 3D 爆炸拆解视图，露出双涡轮 V8 发动机与混动电机。',
    }),
    yue: Object.freeze({
      title: '透視工程工坊',
      kind: '3D 機械拆解與工程實驗室',
      description:
        '3D 拆解並試駕 18 大類經典真實機械——超跑、客機、潛艇、重型火箭、火星探測車、新幹線高鐵同機械計時腕錶。',
      facts: Object.freeze(['18 大機械類別', '5 種互動模式', '駕駛·飛行·火箭發射']),
      alt: '透視工程工坊展示紅色法拉利 SF90 Stradale 嘅 3D 爆炸拆解圖，露出雙渦輪 V8 引擎同混動摩打。',
    }),
    ja: Object.freeze({
      title: 'インサイド・アウト・スタジオ',
      kind: '3D メカ分解＆工学スタジオ',
      description:
        '18カテゴリーの本物の名機を3Dで分解・操縦——スーパーカー、旅客機、潜水艦、ロケット、火星探査車、新幹線、機械式時計まで。',
      facts: Object.freeze(['18の機械カテゴリー', '5つの体験モード', '運転・飛行・打ち上げ']),
      alt: '赤いフェラーリ SF90 ストラダーレを 3D 分解し、V8 ツインターボエンジンとハイブリッドモーターを見せる「インサイド・アウト・スタジオ」。',
    }),
    ko: Object.freeze({
      title: '인사이드 아웃 스튜디오',
      kind: '3D 공학 분해 & 시뮬레이터',
      description:
        '슈퍼카, 여객기, 잠수함, 로켓, 화성 로버, 신칸센, 기계식 시계 등 18개 카테고리의 실제 기계를 3D로 분해하고 직접 조종해 보세요.',
      facts: Object.freeze(['18개 기계 카테고리', '5가지 인터랙티브 모드', '주행·비행·로켓 발사']),
      alt: '빨간색 페라리 SF90 스트라달레를 3D로 분해해 트윈터보 V8 엔진과 하이브리드 모터를 보여주는 인사이드 아웃 스튜디오 화면.',
    }),
    pt: Object.freeze({
      title: 'Inside Out Studio',
      kind: 'Laboratório 3D de engenharia',
      description:
        'Desmonte em 3D e pilote máquinas reais icônicas em 18 categorias — supercarros, aviões, submarinos, foguetes, rovers marcianos, trens-bala e relógios mecânicos.',
      facts: Object.freeze(['18 categorias de máquinas', '5 modos interativos', 'Dirija, voe e lance']),
      alt: 'Vista explodida em 3D no Inside Out Studio de uma Ferrari SF90 Stradale vermelha revelando seu motor V8 biturbo e motores híbridos.',
    }),
    fr: Object.freeze({
      title: 'Inside Out Studio',
      kind: 'Atelier d’ingénierie & CAO 3D',
      description:
        'Éclatez en 3D et pilotez des machines emblématiques à travers 18 catégories — supercars, avions de ligne, sous-marins, fusées, rovers martiens, TGV et montres mécaniques.',
      facts: Object.freeze(['18 catégories de machines', '5 modes interactifs', 'Pilotez, volez & lancez']),
      alt: 'Vue éclatée 3D dans Inside Out Studio d’une Ferrari SF90 Stradale rouge révélant son moteur V8 biturbo et ses moteurs hybrides.',
    }),
    it: Object.freeze({
      title: 'Inside Out Studio',
      kind: 'Laboratorio 3D di ingegneria',
      description:
        'Smonta in 3D e guida macchine iconiche reali in 18 categorie — supercar, aerei di linea, sottomarini, razzi, rover marziani, treni ad alta velocità e orologi meccanici.',
      facts: Object.freeze(['18 categorie di macchine', '5 modalità interattive', 'Guida, vola e lancia']),
      alt: 'Vista esplosa 3D in Inside Out Studio di una Ferrari SF90 Stradale rossa che mostra il motore V8 biturbo e i motori ibridi.',
    }),
    de: Object.freeze({
      title: 'Inside Out Studio',
      kind: '3D-Ingenieur- & Explosionslabor',
      description:
        'Zerlege in 3D und steuere ikonische reale Maschinen aus 18 Kategorien – Supersportwagen, Verkehrsflugzeuge, U-Boote, Raketen, Mars-Rover, Hochgeschwindigkeitszüge und mechanische Uhren.',
      facts: Object.freeze(['18 Maschinenkategorien', '5 interaktive Modi', 'Fahren, fliegen & starten']),
      alt: '3D-Explosionsansicht im Inside Out Studio eines roten Ferrari SF90 Stradale mit sichtbarem V8-Biturbomotor und Hybridantrieb.',
    }),
    ar: Object.freeze({
      title: 'Inside Out Studio',
      kind: 'مختبر الهندسة والتفكيك ثلاثي الأبعاد',
      description:
        'فكّك بُعدياً وقُد آلات حقيقية شهيرة عبر 18 فئة — سيارات خارقة، طائرات ركاب، غواصات، صواريخ، مركبات المريخ، قطارات فائقة السرعة وساعات ميكانيكية.',
      facts: Object.freeze(['18 فئة من الآلات', '5 أوضاع تفاعلية', 'قُد وحلّق وأطلِق']),
      alt: 'عرض تفصيلي ثلاثي الأبعاد في Inside Out Studio لسيارة فيراري SF90 Stradale حمراء يكشف محرك V8 المزدوج التوربو والمحركات الهجينة.',
    }),
  }),

  'take-it-apart': Object.freeze({
    es: Object.freeze({
      title: '¡Desármalo!',
      kind: 'Taller 3D pieza por pieza',
      description:
        'Desarma siete máquinas cotidianas con el robot Bolt — coche, casa, motor a reacción, iPhone, portátil, televisor y avión — y compite contra el reloj para volver a armarlas.',
      facts: Object.freeze([]),
      alt: 'Vista explotada en 3D de ¡Desármalo! de un coche rojo con etiquetas flotantes en el motor, el capó, los asientos, la batería y las ruedas.',
    }),
    zh: Object.freeze({
      title: '拆开看看！',
      kind: '儿童 3D 拆解工坊',
      description:
        '和小机器人 Bolt 一起拆开七种日常事物——汽车、房屋、喷气发动机、iPhone、笔记本电脑、电视和飞机——再争分夺秒把零件拼回原位。',
      facts: Object.freeze([]),
      alt: '《拆开看看！》中一辆红色汽车的 3D 拆解画面，发动机、引擎盖、座椅、电池和车轮上悬浮着名称标签。',
    }),
    yue: Object.freeze({
      title: '拆開睇下！',
      kind: '兒童 3D 拆解工坊',
      description:
        '同小機械人 Bolt 一齊拆開七種日常事物——汽車、屋企、噴射引擎、iPhone、手提電腦、電視同飛機——再鬥快將零件砌返原位。',
      facts: Object.freeze([]),
      alt: '《拆開睇下！》入面一架紅色汽車嘅 3D 拆解畫面，引擎、車頭蓋、座椅、電池同車轆上面浮住名稱標籤。',
    }),
    ja: Object.freeze({
      title: 'ぜんぶ分解してみよう！',
      kind: 'キッズ 3D 分解ワークショップ',
      description:
        'ロボットのボルトと一緒に、車・家・ジェットエンジン・iPhone・ノートPC・テレビ・飛行機の7つをバラバラに分解し、タイムアタックで組み立てよう。',
      facts: Object.freeze([]),
      alt: 'エンジン、ボンネット、シート、バッテリー、タイヤに名前タグが浮かぶ赤い車の 3D 分解図。',
    }),
    ko: Object.freeze({
      title: '분해해 볼까!',
      kind: '어린이 3D 분해 공방',
      description:
        '로봇 볼트와 함께 자동차, 집, 제트 엔진, 아이폰, 노트북, TV, 비행기 등 7가지 일상 기계를 분해하고 시간 안에 다시 조립해 보세요.',
      facts: Object.freeze([]),
      alt: '엔진, 보닛, 시트, 배터리, 바퀴에 이름표가 떠 있는 빨간 자동차의 3D 분해 화면.',
    }),
    pt: Object.freeze({
      title: 'Desmonte Tudo!',
      kind: 'Oficina 3D peça por peça',
      description:
        'Desmonte sete máquinas do dia a dia com o robô Bolt — carro, casa, motor a jato, iPhone, notebook, TV e avião — e corra contra o relógio para montar tudo de volta.',
      facts: Object.freeze([]),
      alt: 'Vista explodida em 3D de um carro vermelho com etiquetas flutuantes no motor, capô, bancos, bateria e rodas.',
    }),
    fr: Object.freeze({
      title: 'Démonte-Tout !',
      kind: 'Atelier 3D pièce par pièce',
      description:
        'Démontez sept objets du quotidien avec le robot Bolt — voiture, maison, turboréacteur, iPhone, ordinateur portable, téléviseur et avion — puis remontez-les contre la montre.',
      facts: Object.freeze([]),
      alt: 'Vue éclatée 3D d’une voiture rouge avec des étiquettes flottantes sur le moteur, le capot, les sièges, la batterie et les roues.',
    }),
    it: Object.freeze({
      title: 'Smontalo Tutto!',
      kind: 'Laboratorio 3D pezzo per pezzo',
      description:
        'Smonta sette macchine di tutti i giorni con il robot Bolt — auto, casa, motore a reazione, iPhone, laptop, TV e aereo — e sfida il tempo per rimontare ogni pezzo.',
      facts: Object.freeze([]),
      alt: 'Vista esplosa 3D di un’auto rossa con etichette fluttuanti su motore, cofano, sedili, batteria e ruote.',
    }),
    de: Object.freeze({
      title: 'Bau es auseinander!',
      kind: '3D-Werkstatt Teil für Teil',
      description:
        'Nimm mit dem Roboter Bolt sieben Alltagsdinge auseinander – Auto, Haus, Düsentriebwerk, iPhone, Laptop, Fernseher und Flugzeug – und setze jedes Teil gegen die Uhr wieder zusammen.',
      facts: Object.freeze([]),
      alt: '3D-Explosionsansicht eines roten Autos mit schwebenden Beschriftungen an Motor, Motorhaube, Sitzen, Batterie und Rädern.',
    }),
    ar: Object.freeze({
      title: 'فكّكها كلها!',
      kind: 'ورشة ثلاثية الأبعاد قطعة بقطعة',
      description:
        'فكّك سبع آلات يومية مع الروبوت بولت — سيارة، منزل، محرك نفاث، آيفون، حاسوب محمول، تلفاز وطائرة — وسابق الزمن لإعادة تجميع كل قطعة.',
      facts: Object.freeze([]),
      alt: 'عرض تفصيلي ثلاثي الأبعاد لسيارة حمراء مع بطاقات تعريف عائمة على المحرك والغطاء والمقاعد والبطارية والعجلات.',
    }),
  }),

  'prenatal-clinical-atlas': Object.freeze({
    es: Object.freeze({
      title: 'Atlas Clínico Prenatal',
      kind: 'Obstetricia y embriología clínica',
      description:
        'Referencia clínica alineada con ACOG de las semanas 1 a 42 con embriología 3D, audio Doppler del latido fetal, plan de 15 visitas y triaje de síntomas.',
      facts: Object.freeze(['Semanas 1 a 42', '3D · Foto · SVG', '8 idiomas']),
      alt: 'Atlas Clínico Prenatal mostrando un feto del tercer trimestre acurrucado en el útero junto a la placenta y el cordón umbilical.',
    }),
    zh: Object.freeze({
      title: '产前临床图谱',
      kind: '妇产科与胚胎学临床参考',
      description:
        '遵循 ACOG 指南的孕 1–42 周临床参考图谱，涵盖 3D 胚胎发育、多普勒胎心音、15 次产检路线图与症状分级导诊。',
      facts: Object.freeze(['孕 1–42 周全周期', '3D · 实拍 · 矢量图', '支持 8 种语言']),
      alt: '产前临床图谱展示孕晚期胎儿安静蜷缩于子宫内的画面，旁侧可见胎盘与脐带。',
    }),
    yue: Object.freeze({
      title: '產前臨床圖譜',
      kind: '婦產科與胚胎學臨床參考',
      description:
        '跟足 ACOG 指引嘅孕期第 1–42 週臨床參考圖譜，涵蓋 3D 胚胎發育、多普勒胎心音、15 次產檢時間表同症狀分流指南。',
      facts: Object.freeze(['孕期第 1–42 週', '3D · 實拍 · 向量圖', '支援 8 種語言']),
      alt: '產前臨床圖譜展示孕晚期胎兒安靜蜷縮喺子宮入面嘅畫面，隔離見到胎盤同臍帶。',
    }),
    ja: Object.freeze({
      title: '周産期臨床アトラス',
      kind: '産婦人科・発生学リファレンス',
      description:
        'ACOG準拠の妊娠1〜42週クリニカルアトラス。3D胎児発生モデル、ドップラー心音、15回の妊婦健診ロードマップ、症状トリアージを収録。',
      facts: Object.freeze(['妊娠 1〜42週', '3D・実写・図解', '8言語対応']),
      alt: '胎盤と臍帯の横で子宮内に穏やかに丸まる妊娠後期の胎児を示す「周産期臨床アトラス」。',
    }),
    ko: Object.freeze({
      title: '산전 임상 아틀라스',
      kind: '산부인과 & 발생학 임상 레퍼런스',
      description:
        'ACOG 가이드라인에 맞춘 임신 1~42주 임상 아틀라스로, 3D 태아 발생 모형, 도플러 심음, 15회 산전 검진 로드맵과 증상 트리아지를 제공합니다.',
      facts: Object.freeze(['임신 1–42주', '3D · 실사 · 모식도', '8개 언어 지원']),
      alt: '태반과 탯줄 옆 자궁 속에서 평온하게 웅크린 임신 후기 태아를 보여주는 산전 임상 아틀라스.',
    }),
    pt: Object.freeze({
      title: 'Atlas Clínico Pré-Natal',
      kind: 'Obstetrícia e embriologia clínica',
      description:
        'Referência clínica alinhada ao ACOG das semanas 1 a 42 com embriologia 3D, áudio Doppler do batimento fetal, roteiro de 15 consultas e triagem de sintomas.',
      facts: Object.freeze(['Semanas 1 a 42', '3D · Foto · SVG', '8 idiomas']),
      alt: 'Atlas Clínico Pré-Natal mostrando um feto do terceiro trimestre aninhado no útero ao lado da placenta e do cordão umbilical.',
    }),
    fr: Object.freeze({
      title: 'Atlas Clinique Prénatal',
      kind: 'Obstétrique & embryologie clinique',
      description:
        'Référence clinique alignée sur l’ACOG des semaines 1 à 42 avec embryologie 3D, battement cardiaque Doppler, calendrier de 15 consultations et triage des symptômes.',
      facts: Object.freeze(['Semaines 1 à 42', '3D · Photo · SVG', '8 langues']),
      alt: 'Atlas Clinique Prénatal montrant un fœtus du troisième trimestre blotti in utero à côté du placenta et du cordon ombilical.',
    }),
    it: Object.freeze({
      title: 'Atlante Clinico Prenatale',
      kind: 'Ostetricia ed embriologia clinica',
      description:
        'Riferimento clinico allineato ACOG dalle settimane 1 a 42 con embriologia 3D, battito fetale Doppler, piano di 15 visite e triage dei sintomi.',
      facts: Object.freeze(['Settimane 1–42', '3D · Foto · SVG', '8 lingue']),
      alt: 'Atlante Clinico Prenatale che mostra un feto del terzo trimestre rannicchiato nell’utero accanto alla placenta e al cordone ombelicale.',
    }),
    de: Object.freeze({
      title: 'Pränataler Klinischer Atlas',
      kind: 'Geburtshilfe & klinische Embryologie',
      description:
        'ACOG-konformes klinisches Nachschlagewerk für Woche 1 bis 42 mit 3D-Embryologie, Doppler-Herztönen, 15-Termine-Vorsorgeplan und Symptom-Triage.',
      facts: Object.freeze(['Woche 1 bis 42', '3D · Foto · SVG', '8 Sprachen']),
      alt: 'Pränataler Klinischer Atlas mit einem Fötus im dritten Trimester in der Gebärmutter neben Plazenta und Nabelschnur.',
    }),
    ar: Object.freeze({
      title: 'الأطلس السريري لما قبل الولادة',
      kind: 'طب التوليد وعلم الأجنة السريري',
      description:
        'مرجع سريري متوافق مع إرشادات ACOG للأسابيع 1 إلى 42 مع علم أجنة ثلاثي الأبعاد، ونبض الجنين بالدوبلر، وخارطة 15 زيارة وفرز الأعراض.',
      facts: Object.freeze(['الأسابيع 1 إلى 42', '3D · صور · مخططات', '8 لغات']),
      alt: 'الأطلس السريري لما قبل الولادة يعرض جنيناً في الثلث الثالث من الحمل داخل الرحم بجانب المشيمة والحبل السري.',
    }),
  }),
});

/** True only if `code` is one of the allow-listed language codes. */
export function isSupportedLanguage(code) {
  return typeof code === 'string' && LANGUAGE_CODES.includes(code);
}

/**
 * Matches a BCP-47 tag (e.g. "es-MX", "zh-Hant-HK", "yue-HK", "pt-BR", "it-IT")
 * to a supported language code, or returns null.
 */
export function matchLanguageTag(tag) {
  if (typeof tag !== 'string') return null;
  const trimmed = tag.trim();
  if (!trimmed) return null;
  if (isSupportedLanguage(trimmed)) return trimmed;
  const normalized = trimmed.toLowerCase().replace(/_/g, '-');
  if (
    normalized === 'yue' ||
    normalized.startsWith('yue-') ||
    normalized === 'zh-hk' ||
    normalized === 'zh-mo' ||
    normalized.includes('-hk') ||
    normalized.includes('-mo') ||
    normalized.includes('cantonese')
  ) {
    return 'yue';
  }
  const primary = normalized.split('-')[0];
  if (primary === 'cmn') return 'zh';
  return isSupportedLanguage(primary) ? primary : null;
}

/**
 * Resolves the active language using allow-list precedence:
 *   1. `?lang=` query parameter (exact code or BCP-47 tag like `zh-HK` / `zh-CN`)
 *   2. Stored preference (`aow-lang` in localStorage)
 *   3. Browser language list (`navigator.languages`)
 *   4. `DEFAULT_LANG` ('en')
 */
export function resolveLanguage({ search = '', stored = null, navigatorLanguages = [] } = {}) {
  try {
    const param = new URLSearchParams(search).get('lang');
    if (isSupportedLanguage(param)) return param;
    const matchedParam = matchLanguageTag(param);
    if (matchedParam) return matchedParam;
  } catch {
    // Ignore malformed query strings.
  }
  if (isSupportedLanguage(stored)) return stored;
  const matchedStored = matchLanguageTag(stored);
  if (matchedStored) return matchedStored;
  if (Array.isArray(navigatorLanguages)) {
    for (const candidate of navigatorLanguages) {
      const matched = matchLanguageTag(candidate);
      if (matched) return matched;
    }
  }
  return DEFAULT_LANG;
}

/**
 * Returns a localized copy of `creation` for `lang`.
 * For 'en' (or unknown language codes), returns `creation` unchanged.
 */
export function localizeCreation(creation, lang) {
  if (!isSupportedLanguage(lang) || lang === DEFAULT_LANG) return creation;
  const t = CREATION_TRANSLATIONS[creation.id]?.[lang];
  if (!t) return creation;
  return {
    ...creation,
    title: t.title,
    kind: t.kind,
    description: t.description,
    facts: [...t.facts],
    image: {
      ...creation.image,
      alt: t.alt,
    },
  };
}

/**
 * Returns all localized creations for `lang`, preserving order.
 */
export function getLocalizedCreations(lang, baseCreations = CREATIONS) {
  return baseCreations.map((c) => localizeCreation(c, lang));
}
