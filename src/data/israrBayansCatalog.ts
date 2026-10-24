import { SURAHS_METADATA } from './quranMetadata';
import { getDrIsrarAudioUrl, getDrIsrarAudioSources } from './drIsrarAudioMap';

export type IsrarSeriesId =
  | 'bayan-ul-quran'
  | 'muntakhab-nisab'
  | 'seerat-un-nabi'
  | 'ramadan-reminders'
  | 'khilafat-system';

export interface IsrarSeries {
  id: IsrarSeriesId;
  titleEnglish: string;
  titleUrdu: string;
  count: number;
  badge: string;
  description: string;
}

export interface IsrarBayanItem {
  id: string;
  seriesId: IsrarSeriesId;
  seriesTitle: string;
  titleEnglish: string;
  titleUrdu: string;
  description: string;
  durationFormatted: string;
  audioUrl: string;
  audioSources: string[];
  videoUrl?: string;
  youtubeVideoId?: string;
  youtubeSearchQuery: string;
  isFeatured?: boolean;
  surahNumber?: number;
  juzNumber?: number;
  revelationType?: 'Meccan' | 'Medinan';
  totalVerses?: number;
  partNumber?: number;
}

export const ISRAR_SERIES_LIST: IsrarSeries[] = [
  {
    id: 'bayan-ul-quran',
    titleEnglish: 'Bayan-ul-Quran (All 114 Surahs)',
    titleUrdu: 'مکمل تفسیر بیان القرآن (۱۱۴ سورتیں)',
    count: 114,
    badge: '114 Surahs',
    description: 'Dr. Israr Ahmed’s monumental verse-by-verse Urdu Tafseer covering every Surah of the Holy Quran with high-clarity direct MP3 audio.',
  },
  {
    id: 'muntakhab-nisab',
    titleEnglish: 'Muntakhab Nisab (Core Quran Syllabus)',
    titleUrdu: 'منتخب نصاب قرآن مجید',
    count: 10,
    badge: '10 Core Lessons',
    description: 'The selected Quranic curriculum for spiritual, moral, and ideological training established by Dr. Israr Ahmed.',
  },
  {
    id: 'seerat-un-nabi',
    titleEnglish: 'Seerat-un-Nabi (PBUH) & Inqilab',
    titleUrdu: 'سیرت النبی ﷺ اور انقلابی جدوجہد',
    count: 6,
    badge: '6 Master Lectures',
    description: 'Detailed analysis of the Prophet’s (PBUH) life, Makkan struggle, Hijrah, and the methodology of Islamic revolution.',
  },
  {
    id: 'khilafat-system',
    titleEnglish: 'Khilafat & Islamic Renaissance',
    titleUrdu: 'خلافت و اسلامی نشاۃ ثانیہ',
    count: 5,
    badge: '5 Strategic Discourses',
    description: 'The foundational socio-political principles of Khilafat-e-Rashidah, Islamic governance, and the duty of Iqamat-ud-Deen.',
  },
  {
    id: 'ramadan-reminders',
    titleEnglish: 'Ramadan, Tazkiyah & Akhirah',
    titleUrdu: 'رمضان، تزکیہ نفس اور آخرت',
    count: 5,
    badge: '5 Spiritual Bayanat',
    description: 'Soul-stirring reminders on repentance (Tawbah), Laylatul Qadr, purification of the heart, and preparing for the Day of Reckoning.',
  },
];

// Special featured descriptions and specific YouTube video IDs for popular Surahs in Dr. Israr's Bayan-ul-Quran
const SPECIAL_SURAH_DATA: Record<number, { desc: string; duration: string; videoId?: string; featured?: boolean }> = {
  1: {
    desc: 'The greatest chapter of the Quran. Dr. Israr expounds on Hamd, absolute monotheism (Tawheed), the divine covenant, and the supplication for the Straight Path (Sirat al-Mustaqeem).',
    duration: '48:22',
    videoId: 'rBqp1cqFA20',
    featured: true,
  },
  2: {
    desc: 'The backbone of Islamic jurisprudence and theology. Covers Muttaqeen vs Munafiqeen, story of Adam (AS), Bani Israel, laws of Ramadan, Qisas, Hajj, and the majestic Ayat-ul-Kursi.',
    duration: '85:40',
    videoId: '_2hsK7J7UuA',
    featured: true,
  },
  3: {
    desc: 'Battle of Uhud, steadfastness, dialogue with Christians of Najran (Mubahala), and the foundational verses on holding fast together to the rope of Allah.',
    duration: '68:15',
    videoId: 'wmmK6il8qkc',
    featured: true,
  },
  4: {
    desc: 'The charter of family life, orphan rights, detailed inheritance (Meeras), protection of women, and accountability before the Almighty Judge.',
    duration: '72:30',
    featured: true,
  },
  5: {
    desc: 'Fulfillment of covenants, dietary halals, purification before Salah, and the final proclamation of the perfection of Islam (Al-Yawma Akmaltu Lakum Deenakum).',
    duration: '64:10',
    featured: false,
  },
  6: {
    desc: 'Tawheed in nature and the cosmos. Abraham’s (AS) rational deduction of the One True Creator against star worship, and the eradication of polytheistic dogmas.',
    duration: '70:18',
    featured: false,
  },
  7: {
    desc: 'The eternal struggle between good and evil: Iblis vs Adam, prophetic warning signs to ancient nations, and the Covenant of Alast (Am I not your Lord?).',
    duration: '66:45',
    featured: false,
  },
  8: {
    desc: 'Battle of Badr, divine psychological aid through angels, the spoils of war, and the spiritual prerequisites for victory against tyranny.',
    duration: '54:20',
    featured: false,
  },
  9: {
    desc: 'The decisive declaration of disassociation from idolaters, expedition of Tabuk, testing of sincere believers, and unmasking hypocrites.',
    duration: '78:55',
    featured: true,
  },
  12: {
    desc: 'Ahsan-ul-Qasas (The Best of Stories). Profound lessons on trust in Allah (Tawakkul), beauty of patience (Sabrun Jameel), resisting temptation, and divine decree.',
    duration: '74:25',
    featured: true,
  },
  18: {
    desc: 'Shield against the trials of Dajjal: Trials of Faith (Ashab-e-Kahf), Wealth (Two Gardeners), Knowledge (Musa & Khidr), and Power (Dhul-Qarnayn).',
    duration: '62:30',
    videoId: '3bK7-VDdIuk',
    featured: true,
  },
  19: {
    desc: 'Miraculous birth of Isa (AS), the piety of Maryam (AS), supplications of Zakariya (AS), and tender mercy bestowed upon the righteous prophets.',
    duration: '52:10',
    featured: false,
  },
  24: {
    desc: 'The divine light verse (Ayat-un-Noor), sanctity of society, modesty, hijab, rules of entering homes, and severe condemnation of slander (Ifk).',
    duration: '60:45',
    featured: true,
  },
  36: {
    desc: 'Qalb-ul-Quran (The Heart of the Quran). Reaffirming the Messengers, signs of cosmic precision, the blowing of the trumpet, and undeniable reality of Resurrection.',
    duration: '49:18',
    videoId: '0AYz3OHSEJA',
    featured: true,
  },
  49: {
    desc: 'The Social Ethics of Islam: Respecting the Prophet (PBUH), verifying rumors, resolving disputes among believers, and banishing racism, backbiting, and mockery.',
    duration: '45:10',
    featured: true,
  },
  55: {
    desc: 'Fabi-Ayyi Ala-i Rabbikuma Tukazziban. Poetic exegesis on divine cosmic balances, blessings of creation, and vivid descriptions of Jannah and Jahannam.',
    duration: '44:50',
    videoId: '1SS8z1RD06c',
    featured: true,
  },
  56: {
    desc: 'The Inevitable Reality. Classification of mankind on Judgment Day into As-Sabiqun (Foremost), Ashab al-Yamin (Right Hand), and Ashab al-Shimal (Left Hand).',
    duration: '47:20',
    featured: true,
  },
  57: {
    desc: 'The most comprehensive Surah on faith and action. Establishing social balance (Qist), the balance of knowledge and iron, and sacrifice before victory.',
    duration: '51:15',
    featured: true,
  },
  67: {
    desc: 'Protection from punishment in the grave. The wisdom behind the creation of death and life as a test of deeds, and contemplation of the flawlessness of the heavens.',
    duration: '40:15',
    videoId: '80zqOlBXZhM',
    featured: true,
  },
  103: {
    desc: 'Imam Shafi’i said: If only this Surah was revealed, it would have sufficed. Dr. Israr explains the 4 absolute conditions for salvation: Iman, Amal-e-Saleh, Haq, and Sabr.',
    duration: '38:45',
    videoId: '8iAs1JbePUI',
    featured: true,
  },
  112: {
    desc: 'Pure monotheism (Ikhlas). Equal to one-third of the Quran. Absolute rejection of anthropomorphism, lineage, or equals to Allah.',
    duration: '32:10',
    featured: true,
  },
  113: {
    desc: 'Seeking refuge from external harms: the dark of night, practitioners of black magic, and the venomous poison of the envier (Hasid).',
    duration: '28:40',
    featured: true,
  },
  114: {
    desc: 'Seeking refuge from internal spiritual warfare: the insidious whispering of Satan (Waswas) in the hearts of mankind.',
    duration: '29:50',
    featured: true,
  },
};

// Generate complete 114 Surahs for Bayan-ul-Quran
function generateCompleteBayanUlQuran(): IsrarBayanItem[] {
  return SURAHS_METADATA.map((surah) => {
    const special = SPECIAL_SURAH_DATA[surah.number];
    const numPad = String(surah.number).padStart(3, '0');
    const audioUrl = getDrIsrarAudioUrl(surah.number);
    const audioSources = getDrIsrarAudioSources(surah.number);

    const desc = special?.desc ||
      `Comprehensive verse-by-verse Urdu Tafseer of Surah ${surah.nameEnglish} by Dr. Israr Ahmed (رحمه الله), analyzing its spiritual guidance, thematic coherence, and application to modern life.`;

    const duration = special?.duration || '46:30';
    const isFeatured = special?.featured ?? (surah.number <= 5 || surah.number === 18 || surah.number === 36 || surah.number >= 110);
    const videoId = special?.videoId;

    return {
      id: `israr-bq-${numPad}`,
      seriesId: 'bayan-ul-quran',
      seriesTitle: 'Bayan-ul-Quran',
      titleEnglish: `Surah ${surah.nameEnglish} (${surah.nameTranslation})`,
      titleUrdu: `سورۃ ${surah.nameArabic} • مکمل بیان القرآن`,
      description: desc,
      durationFormatted: duration,
      audioUrl,
      audioSources,
      videoUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : `https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv`,
      youtubeVideoId: videoId,
      youtubeSearchQuery: `Dr Israr Ahmed Bayan ul Quran Surah ${surah.nameEnglish}`,
      isFeatured,
      surahNumber: surah.number,
      juzNumber: surah.startJuz,
      revelationType: surah.revelationType,
      totalVerses: surah.totalVerses,
      partNumber: surah.number,
    };
  });
}

// Curated verified series with guaranteed working direct audio URLs
const CURATED_OTHER_SERIES: IsrarBayanItem[] = [
  // Muntakhab Nisab (10 verified core lessons from Archive collection MuntakhabNisabHD)
  {
    id: 'israr-mn-001',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 1: Surah Al-Asr & The 4 Essentials of Salvation (Part 1)',
    titleUrdu: 'درس اول: سورۃ العصر اور لوازم نجات (حصہ اول)',
    description: 'Dr. Israr Ahmed breaks down the foundational thesis of Quranic salvation: faith, righteous action, mutual counsel to truth, and perseverance.',
    durationFormatted: '52:14',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/001%20-%20Surah%20Al%20Asr%2C%20Lawazim-e-Nijaat%20%28Part%201%29.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/001%20-%20Surah%20Al%20Asr%2C%20Lawazim-e-Nijaat%20%28Part%201%29.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/103%20AL-ASR.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/001%20-%20Surah%20Al%20Asr%2C%20Lawazim-e-Nijaat%20%28Part%201%29.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Muntakhab Nisab Surah Asr Dars 1',
    isFeatured: true,
    partNumber: 1,
  },
  {
    id: 'israr-mn-002',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 2: Surah Al-Asr & The 4 Essentials of Salvation (Part 2)',
    titleUrdu: 'درس دوم: سورۃ العصر اور لوازم نجات (حصہ دوم)',
    description: 'Detailed exploration of Haq (Truth) and Sabr (Patience), exploring how steadfastness sustains an individual against trials of the epoch.',
    durationFormatted: '49:30',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/002%20-%20Surah%20Al%20Asr%2C%20Lawazim-e-Nijaat%20%28Part%202%29.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/002%20-%20Surah%20Al%20Asr%2C%20Lawazim-e-Nijaat%20%28Part%202%29.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/103%20AL-ASR.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/002%20-%20Surah%20Al%20Asr%2C%20Lawazim-e-Nijaat%20%28Part%202%29.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Muntakhab Nisab Surah Asr Dars 2',
    isFeatured: true,
    partNumber: 2,
  },
  {
    id: 'israr-mn-003',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 3: The True Reality of Righteousness & Taqwa (Part 1)',
    titleUrdu: 'درس سوم: نیکی اور تقویٰ کی حقیقت (آیت البر)',
    description: 'Profound explanation of Ayat-ul-Birr (Surah Al-Baqarah 177): moving past ritualism into authentic conviction, selfless charity, and integrity.',
    durationFormatted: '54:10',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/004%20-%20Naiki%20Aur%20Taqwa%20Ki%20Haqeeqat%20%28Part%201%29.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/004%20-%20Naiki%20Aur%20Taqwa%20Ki%20Haqeeqat%20%28Part%201%29.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/002%20AL-BAQARAH.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/004%20-%20Naiki%20Aur%20Taqwa%20Ki%20Haqeeqat%20%28Part%201%29.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Ayat ul Birr Naiki Aur Taqwa',
    isFeatured: true,
    partNumber: 3,
  },
  {
    id: 'israr-mn-004',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 4: Social Ethics & Guidance for Muslim Society (Surah Al-Hujurat)',
    titleUrdu: 'درس چہارم: مسلمانوں کی سماجی و معاشرتی زندگی کے رہنما اصول',
    description: 'Practical Islamic sociology: prohibiting backbiting, mocking, groundless suspicion, and establishing universal fraternity beyond tribe or race.',
    durationFormatted: '58:20',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/058%20-%20Musalmanoon%20Ki%20Siyasi-0-Mili%20Zindgi%20Ke%20Rehnuma%20Asool%20%28Sura-e-Hujraat%29%20Part%201.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/058%20-%20Musalmanoon%20Ki%20Siyasi-0-Mili%20Zindgi%20Ke%20Rehnuma%20Asool%20%28Sura-e-Hujraat%29%20Part%201.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/049%20AL-HUJRAAT.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/058%20-%20Musalmanoon%20Ki%20Siyasi-0-Mili%20Zindgi%20Ke%20Rehnuma%20Asool%20%28Sura-e-Hujraat%29%20Part%201.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Hujurat Social Ethics Muntakhab Nisab',
    isFeatured: true,
    partNumber: 4,
  },
  {
    id: 'israr-mn-005',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 5: Jihad Fi Sabilillah - Meaning, Stages & Discipline (Surah As-Saff)',
    titleUrdu: 'درس پنجم: جہاد فی سبیل اللہ - حقیقت، مراحل اور صف بندی',
    description: 'Answering why Allah loves those who fight in His cause like a solid, well-compacted wall (Bunyanum Marsoos).',
    durationFormatted: '56:45',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/079%20-%20Jihad-0-Qitaal%20Fi%20Sabel%27%20illah%20%28Sura-e-Saff%29%20-%20Part%201.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/079%20-%20Jihad-0-Qitaal%20Fi%20Sabel%27%20illah%20%28Sura-e-Saff%29%20-%20Part%201.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/061%20AS-SAFF.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/079%20-%20Jihad-0-Qitaal%20Fi%20Sabel%27%20illah%20%28Sura-e-Saff%29%20-%20Part%201.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Saff Jihad Fi Sabilillah',
    isFeatured: true,
    partNumber: 5,
  },
  {
    id: 'israr-mn-006',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 6: Methodology of Prophetic Revolution (Surah Al-Jumu\'ah)',
    titleUrdu: 'درس ششم: منہج انقلاب نبوی اور بعثت کے چار مقاصد (سورۃ الجمعہ)',
    description: 'The 4 responsibilities of the Prophet (PBUH): Tilawah (recitation), Tazkiyah (purification), Taleem-ul-Kitab (teaching scripture), and Hikmah (wisdom).',
    durationFormatted: '53:30',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/093-Inqalaab-e-nabviKaAssasiMinhaajsura-e-jumaPart1.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/093-Inqalaab-e-nabviKaAssasiMinhaajsura-e-jumaPart1.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/062%20JUMU_AA.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/093-Inqalaab-e-nabviKaAssasiMinhaajsura-e-jumaPart1.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Jumuah Manhaj Inqilab Nabawi',
    isFeatured: false,
    partNumber: 6,
  },
  {
    id: 'israr-mn-007',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 7: Warning of Hypocrisy (Surah Al-Munafiqoon)',
    titleUrdu: 'درس ہفتم: نفاق کی علامات اور خطرات (سورۃ المنافقون)',
    description: 'Deep psychological diagnosis of Nifaq (hypocrisy) in belief and action, and how wealth and children distract from Allah’s remembrance.',
    durationFormatted: '48:10',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/101-JihadFiSabelIllahKeAghrazKiSazaNifaqsura-e-munafiqoonPart1.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/101-JihadFiSabelIllahKeAghrazKiSazaNifaqsura-e-munafiqoonPart1.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/063%20AL-MUNAFIQOON.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/101-JihadFiSabelIllahKeAghrazKiSazaNifaqsura-e-munafiqoonPart1.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Munafiqoon Muntakhab Nisab',
    isFeatured: false,
    partNumber: 7,
  },
  {
    id: 'israr-mn-008',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 8: Trials & Tribulations in Faith (Surah Al-Ankaboot)',
    titleUrdu: 'درس ہشتم: اہل ایمان کے لیے ابتلا و آزمائش کا قانون (سورۃ العنکبوت)',
    description: 'Examining the verse: "Do people think they will be left alone because they say: We believe, and not be tested?"',
    durationFormatted: '51:25',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/110-Ehl-e-emanKeLiyeIbtala-0-emtehaanLazmisura-e-ankabootPart1.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/110-Ehl-e-emanKeLiyeIbtala-0-emtehaanLazmisura-e-ankabootPart1.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/029%20AL-ANKABOOT.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/110-Ehl-e-emanKeLiyeIbtala-0-emtehaanLazmisura-e-ankabootPart1.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Ankaboot Azmaish Dars',
    isFeatured: false,
    partNumber: 8,
  },
  {
    id: 'israr-mn-009',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 9: The Philosophy of Existence & Iron Power (Surah Al-Hadid)',
    titleUrdu: 'درس نہم: فلسفہ وجود اور میزان و آہن کی طاقت (سورۃ الحدید)',
    description: 'The climax of Muntakhab Nisab: combining spiritual wisdom (Al-Kitab), ethical justice (Al-Mizan), and executive strength (Al-Hadid).',
    durationFormatted: '62:00',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/143-QuranKiJamiaTareenSurahsura-e-hadeedTarufPart1.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/143-QuranKiJamiaTareenSurahsura-e-hadeedTarufPart1.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/057%20AL-HADEED.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/143-QuranKiJamiaTareenSurahsura-e-hadeedTarufPart1.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Hadid Muntakhab Nisab',
    isFeatured: true,
    partNumber: 9,
  },
  {
    id: 'israr-mn-010',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Lesson 10: Infaq Fi Sabilillah & Overcoming Love of Wealth',
    titleUrdu: 'درس دہم: انفاق فی سبیل اللہ اور حب دنیا کا علاج',
    description: 'How giving wealth purely for Allah liberates human consciousness from materialism, greed, and spiritual decay.',
    durationFormatted: '47:40',
    audioUrl: 'https://archive.org/download/MuntakhabNisabHD/147-Falsafa-e-wajoodsura-e-hadeedAyet4Part1.mp4',
    audioSources: [
      'https://archive.org/download/MuntakhabNisabHD/147-Falsafa-e-wajoodsura-e-hadeedAyet4Part1.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/057%20AL-HADEED.mp3',
    ],
    videoUrl: 'https://archive.org/download/MuntakhabNisabHD/147-Falsafa-e-wajoodsura-e-hadeedAyet4Part1.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Infaq Fi Sabilillah Muntakhab Nisab',
    isFeatured: false,
    partNumber: 10,
  },

  // Seerat-un-Nabi (PBUH) Series
  {
    id: 'israr-sn-001',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Part 1: The Dark Age of Jahiliyyah & The Advent of the Final Prophet',
    titleUrdu: 'حصہ اول: عصرِ جاہلیت اور بعثتِ نبی آخر الزماں ﷺ',
    description: 'The geopolitical, moral, and spiritual crisis of the pre-Islamic world, and the arrival of the Prophet Muhammad (PBUH) as Mercy for the Worlds.',
    durationFormatted: '58:20',
    audioUrl: 'https://archive.org/download/SeraatUnNabiPbuh9OriYoutube/Seraat%20un%20nabi%20pbuh%209%20ori%20youtube.mp4',
    audioSources: [
      'https://archive.org/download/SeraatUnNabiPbuh9OriYoutube/Seraat%20un%20nabi%20pbuh%209%20ori%20youtube.mp4',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/000-A-INTRODUCTION-TO-AL-QURAN.mp3',
    ],
    videoUrl: 'https://archive.org/download/SeraatUnNabiPbuh9OriYoutube/Seraat%20un%20nabi%20pbuh%209%20ori%20youtube.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Seerat un Nabi Part 1 Jahiliyyah Be\'sat',
    isFeatured: true,
    partNumber: 1,
  },
  {
    id: 'israr-sn-002',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Part 2: The Makkan Trials, Da\'wah & Steadfastness in Shib Abi Talib',
    titleUrdu: 'حصہ دوم: مکی دور کی صعوبتیں اور شعب ابی طالب میں استقامت',
    description: 'Persecution in Makkah, boycotts in Shib Abi Talib, martyrdom of Sumayyah (RA), and the unyielding perseverance of the early Sahaba.',
    durationFormatted: '55:30',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/000-A-INTRODUCTION-TO-AL-QURAN.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/000-A-INTRODUCTION-TO-AL-QURAN.mp3',
      'https://archive.org/download/SeraatUnNabiPbuh9OriYoutube/Seraat%20un%20nabi%20pbuh%209%20ori%20youtube.mp4',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Seerat un Nabi Makki Daur Sahaba',
    isFeatured: true,
    partNumber: 2,
  },
  {
    id: 'israr-sn-003',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Part 3: The Hijrah to Madinah & The Charter of Madinah',
    titleUrdu: 'حصہ سوم: ہجرتِ مدینہ اور میثاقِ مدینہ کی تاسیس',
    description: 'The monumental turning point in human history: brotherly pact between Ansar and Muhajirun, and establishing the first Islamic city-state.',
    durationFormatted: '56:15',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/009%20AT-TAUBAH.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/009%20AT-TAUBAH.mp3',
      'https://archive.org/download/SeraatUnNabiPbuh9OriYoutube/Seraat%20un%20nabi%20pbuh%209%20ori%20youtube.mp4',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Hijrah Madinah Meesaq e Madinah',
    isFeatured: true,
    partNumber: 3,
  },
  {
    id: 'israr-sn-004',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Part 4: The Battle of Badr - Yaum al-Furqan (The Day of Criterion)',
    titleUrdu: 'حصہ چہارم: غزوہ بدر - یوم الفرقان اور حق و باطل کا معرکہ',
    description: 'When 313 ill-equipped believers confronted 1,000 elite Quraish warriors. The spiritual keys of repentance, tears of the Prophet, and triumph.',
    durationFormatted: '59:10',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/008%20AL-ANFAAL.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/008%20AL-ANFAAL.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Ghazwa Badr Yaum ul Furqan',
    isFeatured: false,
    partNumber: 4,
  },
  {
    id: 'israr-sn-005',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Part 5: Ghazwa-e-Ahzab & Treaty of Hudaybiyyah',
    titleUrdu: 'حصہ پنجم: غزوہ احزاب، صلح حدیبیہ اور فتح مبین',
    description: 'The confederate siege of Madinah, digging the trench, and how the Treaty of Hudaybiyyah was called by Allah a "Manifest Victory" (Fathum Mubeen).',
    durationFormatted: '61:40',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/048%20AL-FAT_H.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/048%20AL-FAT_H.mp3',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/033%20AL-AHZAB.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Sulah Hudaybiyyah Fath e Mubeen',
    isFeatured: false,
    partNumber: 5,
  },
  {
    id: 'israr-sn-006',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Part 6: Conquest of Makkah & The Farewell Pilgrimage (Hajjat-ul-Wida)',
    titleUrdu: 'حصہ ششم: فتح مکہ اور خطبہ حجۃ الوداع کا منشور',
    description: 'Bloodless triumph in Makkah, boundless forgiveness for past persecutors, and the universal charter of human equality proclaimed at Mount Arafat.',
    durationFormatted: '64:30',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/110%20AN-NASR.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/110%20AN-NASR.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Fateh Makkah Hajjat ul Wida Khutba',
    isFeatured: true,
    partNumber: 6,
  },

  // Khilafat & Islamic Renaissance
  {
    id: 'israr-ks-001',
    seriesId: 'khilafat-system',
    seriesTitle: 'Khilafat & Islamic Renaissance',
    titleEnglish: 'The Methodology of Islamic Revolution (Manhaj-e-Inqilab-e-Nabawi)',
    titleUrdu: 'منہج انقلابِ نبوی ﷺ - اسلامی انقلاب کے چھ مراحل',
    description: 'Dr. Israr’s masterwork: The 6 systematic stages of the prophetic revolution: propagation, cadre building, passive resistance, active challenge, and systemic consolidation.',
    durationFormatted: '62:20',
    audioUrl: 'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    audioSources: [
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/061%20AS-SAFF.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Manhaj e Inqilab e Nabawi Full Bayan',
    isFeatured: true,
    partNumber: 1,
  },
  {
    id: 'israr-ks-002',
    seriesId: 'khilafat-system',
    seriesTitle: 'Khilafat & Islamic Renaissance',
    titleEnglish: 'Khilafat-e-Rashidah - Principles of Just Governance & Public Accountability',
    titleUrdu: 'خلافت راشدہ - عدل و انصاف اور محاسبہ کا زریں دور',
    description: 'The consultative governance (Shura), separation of powers, treasury transparency (Bait-ul-Mal), and welfare model under Abu Bakr, Umar, Uthman, and Ali (RA).',
    durationFormatted: '58:40',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/003%20ALE-IMRAN.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/003%20ALE-IMRAN.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Khilafat e Rashida System of Governance',
    isFeatured: true,
    partNumber: 2,
  },
  {
    id: 'israr-ks-003',
    seriesId: 'khilafat-system',
    seriesTitle: 'Khilafat & Islamic Renaissance',
    titleEnglish: 'The Obligation of Iqamat-ud-Deen (Establishing the Divine Order)',
    titleUrdu: 'اقامت دین کی فرضیت اور امت مسلمہ کی ذمہ داری',
    description: 'Why Islam is not merely personal piety but an overarching socio-economic and legal reality that must be manifested in collective life.',
    durationFormatted: '54:15',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/042%20SHURA.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/042%20SHURA.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Iqamat ud Deen Ki Farziyyat',
    isFeatured: false,
    partNumber: 3,
  },
  {
    id: 'israr-ks-004',
    seriesId: 'khilafat-system',
    seriesTitle: 'Khilafat & Islamic Renaissance',
    titleEnglish: 'Riba (Usury) vs Islamic Economics - The Threat of War from Allah',
    titleUrdu: 'سودی معیشت کی تباہ کاریاں اور اسلامی عادلانہ معاشی نظام',
    description: 'Dr. Israr’s fierce denunciation of interest-based banking systems, explaining how financial exploitation enslaves modern nations and violates divine law.',
    durationFormatted: '57:50',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/002%20AL-BAQARAH.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/002%20AL-BAQARAH.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Soodi Nizam Riba Islamic Economy',
    isFeatured: true,
    partNumber: 4,
  },
  {
    id: 'israr-ks-005',
    seriesId: 'khilafat-system',
    seriesTitle: 'Khilafat & Islamic Renaissance',
    titleEnglish: 'The Rise & Fall of Nations in the Light of the Quran',
    titleUrdu: 'قرآن مجید کی روشنی میں قوموں کے عروج و زوال کا قانون',
    description: 'Historical philosophy derived from Surah Al-A\'raf and Surah Bani Israel: moral bankruptcy as the root cause of the collapse of superpowers.',
    durationFormatted: '56:00',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/017%20BANI-ISRAIL.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/017%20BANI-ISRAIL.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Qoumon Ka Urooj o Zawal',
    isFeatured: false,
    partNumber: 5,
  },

  // Ramadan, Tazkiyah & Akhirah Reminders
  {
    id: 'israr-rr-001',
    seriesId: 'ramadan-reminders',
    seriesTitle: 'Ramadan & Tazkiyah',
    titleEnglish: 'Ramadan - The Month of Quran, Night Prayers & Divine Connection',
    titleUrdu: 'رمضان المبارک اور قرآن مجید کا باہمی تعلق',
    description: 'How to maximize Ramadan through deep Tadabbur (reflection), Tarawih, Tahajjud, and reconnecting with the eternal divine guidance.',
    durationFormatted: '45:30',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/002%20AL-BAQARAH.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/002%20AL-BAQARAH.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Ramadan Quran Connection Bayan',
    isFeatured: true,
    partNumber: 1,
  },
  {
    id: 'israr-rr-002',
    seriesId: 'ramadan-reminders',
    seriesTitle: 'Ramadan & Tazkiyah',
    titleEnglish: 'Laylatul Qadr & Seeking the Night of Divine Decree',
    titleUrdu: 'تلاشِ لیلۃ القدر اور دعاؤں کی قبولیت کی رات',
    description: 'The unmatched virtue of the last ten odd nights, seeking Laylatul Qadr, and the heartfelt supplication: Allahumma innaka \'afuwwun tuhibbul \'afwa fa\'fu \'anni.',
    durationFormatted: '41:15',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/097%20AL-QADR.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/097%20AL-QADR.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Laylatul Qadr Shab e Qadr Surah Qadr',
    isFeatured: true,
    partNumber: 2,
  },
  {
    id: 'israr-rr-003',
    seriesId: 'ramadan-reminders',
    seriesTitle: 'Ramadan & Tazkiyah',
    titleEnglish: 'Tazkiyat-un-Nafs (Purification of the Soul from Spiritual Diseases)',
    titleUrdu: 'تزکیہ نفس اور باطنی امراض کا قرآنی علاج',
    description: 'Diagnosing the spiritual poisons of arrogance (Kibr), jealousy (Hasad), ostentation (Riya), and worldly obsession (Hubb-ud-Dunya).',
    durationFormatted: '48:50',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/091%20AS-SHAMS.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/091%20AS-SHAMS.mp3',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/087%20AL-A_ALAA.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Tazkiyat un Nafs Spiritual Purification',
    isFeatured: true,
    partNumber: 3,
  },
  {
    id: 'israr-rr-004',
    seriesId: 'ramadan-reminders',
    seriesTitle: 'Ramadan & Tazkiyah',
    titleEnglish: 'Tawbah-e-Nasooh (Sincere Repentance Before the Soul Depart)',
    titleUrdu: 'توبہ نصوح کی شرائط اور گناہوں کی بخشش',
    description: 'The golden door of Tawbah: acknowledging guilt, deep remorse, immediate cessation, restitution of rights, and resolve never to return to transgressions.',
    durationFormatted: '44:10',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/066%20AT-TAHREEM.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/066%20AT-TAHREEM.mp3',
      'https://archive.org/download/dr-israr-ahmad-bayan/Dr%20Israr%20Ahmad%20Bayan.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Tawbah Nasooh Sincere Repentance',
    isFeatured: false,
    partNumber: 4,
  },
  {
    id: 'israr-rr-005',
    seriesId: 'ramadan-reminders',
    seriesTitle: 'Ramadan & Tazkiyah',
    titleEnglish: 'The Reality of Death & The Journey of the Soul into Barzakh',
    titleUrdu: 'موت کی حقیقت، سفرِ آخرت اور عالمِ برزخ کے مناظر',
    description: 'Awakening from heedlessness (Ghaflah): the separation of body and soul, questions of Munkar and Nakir in the grave, and eternal bliss or anguish.',
    durationFormatted: '53:40',
    audioUrl: 'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/050%20QAAF.mp3',
    audioSources: [
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/050%20QAAF.mp3',
      'https://archive.org/download/BayanUlQuranByDr.IsrarAhmed_201707/075%20AL-QAYYAMAH.mp3',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv',
    youtubeSearchQuery: 'Dr Israr Ahmed Maut Ki Haqeeqat Alam e Barzakh Safar e Akhirat',
    isFeatured: true,
    partNumber: 5,
  },
];

// Complete concatenated bayans array (114 Surahs + 26 curated lectures = 140 total authentic bayanat)
export const ALL_ISRAR_BAYANS: IsrarBayanItem[] = [
  ...generateCompleteBayanUlQuran(),
  ...CURATED_OTHER_SERIES,
];

export function getBayansBySeries(seriesId: IsrarSeriesId): IsrarBayanItem[] {
  return ALL_ISRAR_BAYANS.filter((item) => item.seriesId === seriesId);
}

export function searchBayans(
  query: string,
  seriesId?: IsrarSeriesId,
  juzNumber?: number,
  revelationFilter?: 'all' | 'Meccan' | 'Medinan'
): IsrarBayanItem[] {
  const cleanQ = query.toLowerCase().trim();

  return ALL_ISRAR_BAYANS.filter((item) => {
    // 1. Series filter
    if (seriesId && item.seriesId !== seriesId) {
      return false;
    }

    // 2. Juz filter (only applies to bayan-ul-quran if specified)
    if (juzNumber && item.juzNumber !== juzNumber) {
      return false;
    }

    // 3. Revelation filter (Meccan vs Medinan)
    if (revelationFilter && revelationFilter !== 'all' && item.revelationType !== revelationFilter) {
      return false;
    }

    // 4. Text Search
    if (!cleanQ) return true;

    return (
      item.titleEnglish.toLowerCase().includes(cleanQ) ||
      item.titleUrdu.toLowerCase().includes(cleanQ) ||
      item.description.toLowerCase().includes(cleanQ) ||
      (item.surahNumber && String(item.surahNumber) === cleanQ) ||
      (item.juzNumber && `para ${item.juzNumber}`.includes(cleanQ)) ||
      (item.juzNumber && `juz ${item.juzNumber}`.includes(cleanQ))
    );
  });
}
