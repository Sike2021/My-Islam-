export interface IslamicEvent {
  title: string;
  arabicTitle: string;
  hijriDay: number;
  hijriMonth: number; // 1-12
  monthName: string;
  description: string;
  isFastingRecommended?: boolean;
}

export const ISLAMIC_MONTHS = [
  { index: 1, name: 'Muharram', arabic: 'مُحَرَّم', isSacred: true },
  { index: 2, name: 'Safar', arabic: 'صَفَر', isSacred: false },
  { index: 3, name: "Rabi' al-Awwal", arabic: 'رَبِيع الْأَوَّل', isSacred: false },
  { index: 4, name: "Rabi' al-Thani", arabic: 'رَبِيع الآخِر', isSacred: false },
  { index: 5, name: 'Jumada al-Awwal', arabic: 'جُمَادَىٰ الْأُولَىٰ', isSacred: false },
  { index: 6, name: 'Jumada al-Thani', arabic: 'جُمَادَىٰ الآخِرَة', isSacred: false },
  { index: 7, name: 'Rajab', arabic: 'رَجَب', isSacred: true },
  { index: 8, name: "Sha'ban", arabic: 'شَعْبَان', isSacred: false },
  { index: 9, name: 'Ramadan', arabic: 'رَمَضَان', isSacred: false },
  { index: 10, name: 'Shawwal', arabic: 'شَوَّال', isSacred: false },
  { index: 11, name: "Dhu al-Qi'dah", arabic: 'ذُو الْقَعْدَة', isSacred: true },
  { index: 12, name: 'Dhu al-Hijjah', arabic: 'ذُو الْحِجَّة', isSacred: true },
];

export const MAJOR_ISLAMIC_EVENTS: IslamicEvent[] = [
  {
    title: 'Islamic New Year (1st Muharram)',
    arabicTitle: 'رَأْسُ السَّنَةِ الْهِجْرِيَّةِ',
    hijriDay: 1,
    hijriMonth: 1,
    monthName: 'Muharram',
    description: 'Beginning of the new Hijri lunar calendar year marking the Hijrah of Prophet Muhammad (ﷺ).',
  },
  {
    title: 'Day of Ashura (10th Muharram)',
    arabicTitle: 'يَوْمُ عَاشُورَاءَ',
    hijriDay: 10,
    hijriMonth: 1,
    monthName: 'Muharram',
    description: 'Day Prophet Musa (AS) was saved from Pharaoh. Fasting on Ashura expiates minor sins of the preceding year.',
    isFastingRecommended: true,
  },
  {
    title: "Mawlid an-Nabi (12th Rabi' al-Awwal)",
    arabicTitle: 'المَوْلِدُ النَّبَوِيُّ الشَّرِيفُ',
    hijriDay: 12,
    hijriMonth: 3,
    monthName: "Rabi' al-Awwal",
    description: 'Remembering the birth and enduring mercy of the Prophet Muhammad (ﷺ).',
  },
  {
    title: 'Isra and Mi’raj (27th Rajab)',
    arabicTitle: 'الإِسْرَاءُ وَالمِعْرَاجُ',
    hijriDay: 27,
    hijriMonth: 7,
    monthName: 'Rajab',
    description: 'The miraculous Night Journey of the Prophet (ﷺ) from Makkah to Jerusalem and ascent through the heavens.',
  },
  {
    title: "Nisf Sha'ban / Shab-e-Barat (15th Sha'ban)",
    arabicTitle: 'لَيْلَةُ النِّصْفِ مِنْ شَعْبَانَ',
    hijriDay: 15,
    hijriMonth: 8,
    monthName: "Sha'ban",
    description: 'The middle night of Sha’ban, a time for seeking forgiveness and spiritual renewal before Ramadan.',
    isFastingRecommended: true,
  },
  {
    title: 'Beginning of Blessed Ramadan (1st Ramadan)',
    arabicTitle: 'أَوَّلُ أَيَّامِ شَهْرِ رَمَضَانَ الْمُبَارَكِ',
    hijriDay: 1,
    hijriMonth: 9,
    monthName: 'Ramadan',
    description: 'The month of the Holy Quran, obligatory fasting (Sawm), and immense divine mercy.',
    isFastingRecommended: true,
  },
  {
    title: 'Laylatul Qadr (27th Ramadan)',
    arabicTitle: 'لَيْلَةُ الْقَدْرِ',
    hijriDay: 27,
    hijriMonth: 9,
    monthName: 'Ramadan',
    description: 'The Night of Decree, better than a thousand months of worship. Sought especially in odd nights of the last 10 days.',
  },
  {
    title: 'Eid al-Fitr (1st Shawwal)',
    arabicTitle: 'عِيدُ الْفِطْرِ الْمُبَارَكُ',
    hijriDay: 1,
    hijriMonth: 10,
    monthName: 'Shawwal',
    description: 'Celebration of gratitude marking the completion of Ramadan fasting.',
  },
  {
    title: 'Day of Arafah (9th Dhu al-Hijjah)',
    arabicTitle: 'يَوْمُ عَرَفَةَ',
    hijriDay: 9,
    hijriMonth: 12,
    monthName: 'Dhu al-Hijjah',
    description: 'The pinnacle day of Hajj. Fasting this day expiates sins of the past year and coming year for non-pilgrims.',
    isFastingRecommended: true,
  },
  {
    title: 'Eid al-Adha (10th Dhu al-Hijjah)',
    arabicTitle: 'عِيدُ الْأَضْحَىٰ الْمُبَارَكُ',
    hijriDay: 10,
    hijriMonth: 12,
    monthName: 'Dhu al-Hijjah',
    description: 'The Festival of Sacrifice commemorating the devotion of Prophet Ibrahim (AS) and Ismail (AS).',
  },
];

/**
 * Approximate conversion from Gregorian date to Umm al-Qura Hijri date
 */
export function getHijriDate(date: Date, offsetDays: number = 0) {
  const adjusted = new Date(date.getTime() + offsetDays * 86400000);
  
  // Use Intl.DateTimeFormat with islamic-umalqura calendar
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(adjusted);
    const day = parseInt(parts.find(p => p.type === 'day')?.value || '1', 10);
    const month = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
    const year = parseInt(parts.find(p => p.type === 'year')?.value || '1448', 10);
    
    const monthObj = ISLAMIC_MONTHS[month - 1] || ISLAMIC_MONTHS[0];
    
    return {
      day,
      month,
      year,
      monthName: monthObj.name,
      arabicMonthName: monthObj.arabic,
      isSacredMonth: monthObj.isSacred,
    };
  } catch {
    // Fallback calculation algorithm
    const julianDay = Math.floor((adjusted.getTime() / 86400000) + 2440587.5);
    const l = Math.floor(julianDay - 1948440 + 10632);
    const n = Math.floor((l - 1) / 10631);
    const l1 = Math.floor(l - 10631 * n + 354);
    const j = (Math.floor((10985 - l1) / 5316)) * (Math.floor((50 * l1) / 17719)) + (Math.floor(l1 / 5670)) * (Math.floor((43 * l1) / 15238));
    const l2 = l1 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    const m = Math.floor((24 * l2) / 709);
    const d = l2 - Math.floor((709 * m) / 24);
    const y = Math.floor(30 * n + j - 30);
    const monthIndex = Math.min(Math.max(m, 1), 12);
    const monthObj = ISLAMIC_MONTHS[monthIndex - 1];
    return {
      day: d,
      month: monthIndex,
      year: y,
      monthName: monthObj.name,
      arabicMonthName: monthObj.arabic,
      isSacredMonth: monthObj.isSacred,
    };
  }
}
