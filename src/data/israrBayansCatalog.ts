/**
 * Dr. Israr Ahmed (رحمه الله) Audio & Video Bayans Catalog
 * Comprehensive series covering Bayan-ul-Quran, Muntakhab Nisab, Seerat-un-Nabi, and more.
 */

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
  videoUrl?: string;
  youtubeSearchQuery: string;
  isFeatured?: boolean;
  surahNumber?: number;
}

export const ISRAR_SERIES_LIST: IsrarSeries[] = [
  {
    id: 'bayan-ul-quran',
    titleEnglish: 'Bayan-ul-Quran (Complete)',
    titleUrdu: 'بیان القرآن مکمل',
    count: 24,
  },
  {
    id: 'muntakhab-nisab',
    titleEnglish: 'Muntakhab Nisab (Selected Syllabus)',
    titleUrdu: 'منتخب نصاب قرآن',
    count: 8,
  },
  {
    id: 'seerat-un-nabi',
    titleEnglish: 'Seerat-un-Nabi (PBUH)',
    titleUrdu: 'سیرت النبی ﷺ',
    count: 6,
  },
  {
    id: 'khilafat-system',
    titleEnglish: 'Khilafat & Islamic Renaissance',
    titleUrdu: 'خلافت و اسلامی نشاۃ ثانیہ',
    count: 5,
  },
  {
    id: 'ramadan-reminders',
    titleEnglish: 'Ramadan & Tazkiyah Reminders',
    titleUrdu: 'رمضان اور تزکیہ نفس',
    count: 5,
  },
];

export const ALL_ISRAR_BAYANS: IsrarBayanItem[] = [
  // Bayan-ul-Quran
  {
    id: 'israr-bq-001',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 1,
    titleEnglish: 'Surah Al-Fatihah - The Essence of the Quran',
    titleUrdu: 'سورۃ الفاتحہ - ام القرآن اور دعا',
    description: 'Detailed exegesis of Surah Al-Fatihah covering Tawheed, Ruboobiyyah, the straight path, and the spiritual relationship between the servant and the Creator.',
    durationFormatted: '48:22',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/001-Al-Fatihah.mp3',
    videoUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/001-Al-Fatihah.mp4',
    youtubeSearchQuery: 'Dr Israr Ahmed Bayan ul Quran Surah Al Fatihah',
    isFeatured: true,
  },
  {
    id: 'israr-bq-002a',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 2,
    titleEnglish: 'Surah Al-Baqarah (Part 1) - Categories of Mankind',
    titleUrdu: 'سورۃ البقرہ (حصہ اول) - متقین، کافرین اور منافقین',
    description: 'Analysis of the opening verses of Surah Al-Baqarah, distinguishing the characteristics of Muttaqeen, Kuffar, and Munafiqeen.',
    durationFormatted: '55:14',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/002-Al-Baqarah-Part1.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Bayan ul Quran Surah Al Baqarah Part 1',
    isFeatured: true,
  },
  {
    id: 'israr-bq-002b',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 2,
    titleEnglish: 'Surah Al-Baqarah (Part 2) - Story of Adam & Bani Israel',
    titleUrdu: 'سورۃ البقرہ (حصہ دوم) - قصہ آدمؑ اور بنی اسرائیل کی تاریخ',
    description: 'Historical lessons from the succession of Adam (AS), the trials of Bani Israel, and warning signs for the Muslim Ummah.',
    durationFormatted: '52:40',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/002-Al-Baqarah-Part2.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Bayan ul Quran Surah Baqarah Bani Israel',
  },
  {
    id: 'israr-bq-002c',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 2,
    titleEnglish: 'Surah Al-Baqarah - Ayat-ul-Kursi & The Greatest Verse',
    titleUrdu: 'سورۃ البقرہ - آیت الکرسی کی عظمت و تشریح',
    description: 'Profound philosophical and theological explanation of Ayat-ul-Kursi, the supreme declaration of Allah\'s Majesty and absolute sovereignty.',
    durationFormatted: '42:15',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/002-Al-Baqarah-Ayat-ul-Kursi.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Ayat ul Kursi Tafseer',
    isFeatured: true,
  },
  {
    id: 'israr-bq-003',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 3,
    titleEnglish: 'Surah Ali-Imran - Battle of Uhud & The True Victory',
    titleUrdu: 'سورۃ آل عمران - غزوہ احد اور استقامت کا سبق',
    description: 'Strategic, spiritual, and moral lessons from the Battle of Uhud, addressing trials, inner discipline, and the rope of Allah.',
    durationFormatted: '58:04',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/003-Aal-e-Imran.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Al Imran Ghazwa Uhud',
  },
  {
    id: 'israr-bq-018',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 18,
    titleEnglish: 'Surah Al-Kahf - The Four Trials of the Modern Era',
    titleUrdu: 'سورۃ الکہف - فتنہ دجال اور چار عظیم امتحانات',
    description: 'Dr. Israr Ahmed explains the prophetic connection between Surah Al-Kahf and the trials of Faith, Wealth, Knowledge, and Power in the end times.',
    durationFormatted: '62:30',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/018-Al-Kahf.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Kahf Dajjal Fitnah',
    isFeatured: true,
  },
  {
    id: 'israr-bq-036',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 36,
    titleEnglish: 'Surah Ya-Sin - The Heart of the Quran',
    titleUrdu: 'سورۃ یٰس - قلب قرآن اور حیات بعد الموت',
    description: 'Tafseer of Surah Ya-Sin emphasizing Risalat (Prophethood), Resurrection, and the signs of cosmic order in the universe.',
    durationFormatted: '49:18',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/036-Yaseen.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Yaseen Tafseer',
  },
  {
    id: 'israr-bq-049',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 49,
    titleEnglish: 'Surah Al-Hujurat - The Social Ethics of Islam',
    titleUrdu: 'سورۃ الحجرات - اخلاقی و معاشرتی آداب',
    description: 'The definitive Islamic code of conduct: avoiding gossip, suspicion, mocking, racism, and establishing universal brotherhood.',
    durationFormatted: '45:10',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/049-Al-Hujurat.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Hujurat Social Ethics',
  },
  {
    id: 'israr-bq-055',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 55,
    titleEnglish: 'Surah Ar-Rahman - Which of Allah\'s Favors Will You Deny?',
    titleUrdu: 'سورۃ الرحمٰن - فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
    description: 'Eloquent reflection on Allah\'s boundless mercy, cosmic equilibrium, creation of Jinn & Mankind, and the descriptions of Paradise.',
    durationFormatted: '44:50',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/055-Ar-Rahman.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Rahman Bayan',
    isFeatured: true,
  },
  {
    id: 'israr-bq-056',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 56,
    titleEnglish: 'Surah Al-Waqi\'ah - The Inevitable Day & Three Groups',
    titleUrdu: 'سورۃ الواقعہ - قیامت کا منظر اور تین گروہ',
    description: 'Tafseer on the three categories on the Day of Judgment: As-Sabiqun (The Foremost), Ashab al-Yamin (The Righteous), and Ashab al-Shimal.',
    durationFormatted: '47:20',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/056-Al-Waqiah.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Waqiah',
  },
  {
    id: 'israr-bq-067',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 67,
    titleEnglish: 'Surah Al-Mulk - Sovereignty & The Reality of Life and Death',
    titleUrdu: 'سورۃ الملک - حیات و موت کا امتحان اور نجات',
    description: 'Protection from the punishment of the grave, understanding the test of living, and contemplating the flawless creation of heavens.',
    durationFormatted: '40:15',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/067-Al-Mulk.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Mulk Tafseer',
  },
  {
    id: 'israr-bq-103',
    seriesId: 'bayan-ul-quran',
    seriesTitle: 'Bayan-ul-Quran',
    surahNumber: 103,
    titleEnglish: 'Surah Al-Asr - The Criterion of Human Success & Loss',
    titleUrdu: 'سورۃ العصر - کامیابی کے چار بنیادی ستون',
    description: 'Imam Shafi\'i said: If only this Surah was revealed, it would have sufficed. Dr. Israr explains Iman, Amal-e-Saleh, Haq, and Sabr.',
    durationFormatted: '38:45',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Bayan-ul-Quran/103-Al-Asr.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Surah Asr Dars',
    isFeatured: true,
  },

  // Muntakhab Nisab
  {
    id: 'israr-mn-001',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Muntakhab Nisab - Lesson 1: The Obligation of Seeking Guidance',
    titleUrdu: 'منتخب نصاب درس اول - طلب ہدایت کا وجوب',
    description: 'Introduction to the selected syllabus of the Holy Quran for ideological training and personal character refinement.',
    durationFormatted: '51:10',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Muntakhab-Nisab/Lesson-01.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Muntakhab Nisab Dars 1',
  },
  {
    id: 'israr-mn-002',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Muntakhab Nisab - Lesson 2: Tawheed & Rejection of Shirk',
    titleUrdu: 'منتخب نصاب درس دوم - توحید خالص اور شرک کی نفی',
    description: 'Comprehensive study of Tawheed-e-Wujoodi, Tawheed-e-Sifati, and Tawheed-e-Af\'ali with rigorous Quranic textual evidence.',
    durationFormatted: '54:20',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Muntakhab-Nisab/Lesson-02.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Muntakhab Nisab Tawheed',
    isFeatured: true,
  },
  {
    id: 'israr-mn-003',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Muntakhab Nisab - Lesson 3: The Afterlife & Accountability',
    titleUrdu: 'منتخب نصاب درس سوم - حیات بعد الموت اور میزان عدل',
    description: 'Rational, philosophical, and moral necessity of the Day of Judgment as demonstrated through the verses of the Holy Quran.',
    durationFormatted: '49:35',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Muntakhab-Nisab/Lesson-03.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Muntakhab Nisab Akhirat',
  },
  {
    id: 'israr-mn-004',
    seriesId: 'muntakhab-nisab',
    seriesTitle: 'Muntakhab Nisab',
    titleEnglish: 'Muntakhab Nisab - Lesson 4: Infaq Fi Sabilillah (Spending in Allah\'s Cause)',
    titleUrdu: 'منتخب نصاب درس چہارم - انفاق فی سبیل اللہ',
    description: 'The spiritual purification of wealth, eradicating greed and establishing economic justice in society.',
    durationFormatted: '53:15',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Muntakhab-Nisab/Lesson-04.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Muntakhab Nisab Infaq',
  },

  // Seerat-un-Nabi
  {
    id: 'israr-sn-001',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Seerat-un-Nabi (PBUH) - The Pre-Islamic Era & Divine Mission',
    titleUrdu: 'سیرت النبی ﷺ - جاہلیت کا اندھیرا اور بعثت نبوی',
    description: 'State of Arabia and the world before Islam, and the revolution initiated by the Prophet Muhammad (PBUH) in Makkah.',
    durationFormatted: '57:40',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Seerat-un-Nabi/Part-01.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Seerat un Nabi Part 1',
    isFeatured: true,
  },
  {
    id: 'israr-sn-002',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Seerat-un-Nabi (PBUH) - The Makkan Struggles & Perseverance',
    titleUrdu: 'سیرت النبی ﷺ - مکی دور کی صعوبتیں اور صحابہ کا صبر',
    description: 'Persecution in Makkah, boycotts in Shib Abi Talib, and the unwavering steadfastness of the early believers.',
    durationFormatted: '55:30',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Seerat-un-Nabi/Part-02.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Seerat un Nabi Makki Daur',
  },
  {
    id: 'israr-sn-003',
    seriesId: 'seerat-un-nabi',
    seriesTitle: 'Seerat-un-Nabi (PBUH)',
    titleEnglish: 'Seerat-un-Nabi (PBUH) - The Hijrah & Madinah Constitution',
    titleUrdu: 'سیرت النبی ﷺ - ہجرت مدینہ اور میثاق مدینہ کی تدوین',
    description: 'The geopolitical milestone of Hijrah, brotherhood between Ansar & Muhajirun, and establishing the first Islamic state.',
    durationFormatted: '56:15',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Seerat-un-Nabi/Part-03.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Hijrat Madinah Meesaq',
  },

  // Khilafat & Islamic System
  {
    id: 'israr-ks-001',
    seriesId: 'khilafat-system',
    seriesTitle: 'Khilafat & Islamic Renaissance',
    titleEnglish: 'The Methodology of Islamic Revolution',
    titleUrdu: 'منہج انقلاب نبوی - انقلابی جدوجہد کے مراحل',
    description: 'The six stages of the prophetic revolution: propagation, organization, passive resistance, active challenge, and consolidation.',
    durationFormatted: '59:20',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Lectures/Manhaj-e-Inqilab.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Manhaj e Inqilab e Nabawi',
    isFeatured: true,
  },
  {
    id: 'israr-ks-002',
    seriesId: 'khilafat-system',
    seriesTitle: 'Khilafat & Islamic Renaissance',
    titleEnglish: 'Khilafat-e-Rashidah - The Golden Era of Governance',
    titleUrdu: 'خلافت راشدہ - عدل و انصاف اور فلاحی ریاست کا نمونہ',
    description: 'The principles of consultation (Shura), rule of law, and public accountability under the Rightly Guided Caliphs.',
    durationFormatted: '52:10',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Lectures/Khilafat-e-Rashida.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Khilafat e Rashida',
  },

  // Ramadan Reminders
  {
    id: 'israr-rr-001',
    seriesId: 'ramadan-reminders',
    seriesTitle: 'Ramadan Reminders',
    titleEnglish: 'Ramadan - The Month of Quran & Spiritual Reconnection',
    titleUrdu: 'رمضان المبارک اور قرآن مجید کا باہمی تعلق',
    description: 'How to make the most of Ramadan through Tahajjud, Tarawih, reflective recitation (Tadabbur), and deep repentance (Tawbah).',
    durationFormatted: '43:50',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Ramadan/Ramadan-Quran.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Ramadan Quran Connection',
    isFeatured: true,
  },
  {
    id: 'israr-rr-002',
    seriesId: 'ramadan-reminders',
    seriesTitle: 'Ramadan Reminders',
    titleEnglish: 'Laylatul Qadr & The Night of Decree',
    titleUrdu: 'لیلۃ القدر کی تلاش اور دعاؤں کی قبولیت',
    description: 'Virtues of the last ten nights of Ramadan, seeking Laylatul Qadr, and the supplication taught by the Prophet (PBUH) to Aisha (RA).',
    durationFormatted: '39:10',
    audioUrl: 'https://ia800305.us.archive.org/15/items/Dr.IsrarAhmed-Ramadan/Laylatul-Qadr.mp3',
    youtubeSearchQuery: 'Dr Israr Ahmed Shab e Qadr Laylatul Qadr',
  },
];

export function getBayansBySeries(seriesId: IsrarSeriesId): IsrarBayanItem[] {
  return ALL_ISRAR_BAYANS.filter(item => item.seriesId === seriesId);
}

export function searchBayans(query: string, seriesId?: IsrarSeriesId): IsrarBayanItem[] {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) {
    return seriesId ? getBayansBySeries(seriesId) : ALL_ISRAR_BAYANS;
  }

  return ALL_ISRAR_BAYANS.filter(item => {
    const matchesSeries = !seriesId || item.seriesId === seriesId;
    const matchesText =
      item.titleEnglish.toLowerCase().includes(cleanQ) ||
      item.titleUrdu.toLowerCase().includes(cleanQ) ||
      item.description.toLowerCase().includes(cleanQ) ||
      (item.surahNumber && String(item.surahNumber) === cleanQ);

    return matchesSeries && matchesText;
  });
}
