export interface ReflectionItem {
  id: string;
  type: 'hadith' | 'quran';
  theme: 'Tawakkul' | 'Sabr & Hope' | 'Kindness' | 'Repentance' | 'Gratitude' | 'Dhikr';
  arabic: string;
  source: string;
  urduTranslation: string;
  englishTranslation: string;
  takeaway: string;
  contextNarrator?: string;
}

export const REFLECTIONS_DATA: ReflectionItem[] = [
  {
    id: 'reflection-1',
    type: 'hadith',
    theme: 'Tawakkul',
    arabic: 'لَوْ أَنَّكُمْ تَوَكَّلْتُمْ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ تَغْدُو خِمَاصًا وَتَرُوحُ بِطَانًا',
    source: 'Jami` at-Tirmidhi (2344) · Sahih',
    urduTranslation: 'اگر تم اللہ پر ویسا توکل کرو جیسا کہ اس پر توکل کرنے کا حق ہے، تو وہ تمہیں ایسے رزق دے گا جیسے پرندوں کو رزق دیتا ہے، جو صبح بھوکے نکلتے ہیں اور شام کو شکم سیر ہو کر لوٹتے ہیں۔',
    englishTranslation: 'If you were to rely upon Allah with the required reliance, He would provide for you just as He provides for the birds: they leave early in the morning hungry, and return at night full.',
    takeaway: 'Tawakkul is not passivity. The bird takes flight with effort and leaves the nest, yet relies wholly on Allah to find seeds. Strive with your hands while your heart rests in Allah’s care.',
    contextNarrator: 'Narrated by Umar ibn al-Khattab (RA)',
  },
  {
    id: 'reflection-2',
    type: 'quran',
    theme: 'Sabr & Hope',
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    source: 'Surah Ash-Sharh (94:5-6)',
    urduTranslation: 'پس یقیناً تنگی کے ساتھ آسانی ہے۔ بے شک تنگی کے ساتھ آسانی ہے۔',
    englishTranslation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
    takeaway: 'Notice Allah said "with" the hardship (مع), not "after". The seeds of your relief are embedded inside the very trial you are enduring right now. One hardship cannot defeat two eases.',
    contextNarrator: 'Revealed to comfort the Prophet (ﷺ) in Makkah',
  },
  {
    id: 'reflection-3',
    type: 'hadith',
    theme: 'Kindness',
    arabic: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ',
    source: 'Sunan Abi Dawud (4941) · Jami` at-Tirmidhi (1924) · Sahih',
    urduTranslation: 'رحم کرنے والوں پر رحمن رحم فرماتا ہے۔ تم زمین والوں پر رحم کرو، آسمان والا تم پر رحم فرمائے گا۔',
    englishTranslation: 'The merciful will be shown mercy by the Most Merciful. Be merciful to those on the earth, and the One in the heavens will show mercy to you.',
    takeaway: 'Gentleness with your parents, family, strangers, and animals opens the gates of Allah’s divine compassion directly into your life.',
    contextNarrator: 'Narrated by Abdullah ibn Amr (RA)',
  },
  {
    id: 'reflection-4',
    type: 'quran',
    theme: 'Repentance',
    arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
    source: 'Surah Az-Zumar (39:53)',
    urduTranslation: 'کہہ دیجیے کہ اے میرے بندو جنہوں نے اپنی جانوں پر زیادتی کی ہے! اللہ کی رحمت سے ناامید مت ہو، بے شک اللہ تمام گناہوں کو بخش دیتا ہے، یقیناً وہ بڑا بخشنے والا، نہایت رحم کرنے والا ہے۔',
    englishTranslation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
    takeaway: 'Allah still calls sinners "My servants" (عبادي). No matter how far you feel you have wandered, sincere repentance wipes the slate clean in a single breath.',
    contextNarrator: 'A divine proclamation of unconditional hope',
  },
  {
    id: 'reflection-5',
    type: 'hadith',
    theme: 'Gratitude',
    arabic: 'مَنْ لَمْ يَشْكُرِ النَّاسَ لَمْ يَشْكُرِ اللَّهَ',
    source: 'Jami` at-Tirmidhi (1954) · Sahih',
    urduTranslation: 'جو لوگوں کا شکریہ ادا نہیں کرتا، وہ اللہ کا بھی شکر ادا نہیں کرتا۔',
    englishTranslation: 'He who does not thank people does not thank Allah.',
    takeaway: 'Gratitude starts with recognizing everyday kindness from parents, mentors, and loved ones. Acknowledging people’s efforts is an act of spiritual worship.',
    contextNarrator: 'Narrated by Abu Hurairah (RA)',
  },
  {
    id: 'reflection-6',
    type: 'hadith',
    theme: 'Dhikr',
    arabic: 'كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    source: 'Sahih al-Bukhari (6406) · Sahih Muslim (2694)',
    urduTranslation: 'دو کلمے ایسے ہیں جو زبان پر بہت ہلکے ہیں، میزان میں بہت بھاری ہیں، اور رحمن کو بہت پیارے ہیں: سبحان اللہ وبحمدہ، سبحان اللہ العظیم۔',
    englishTranslation: 'Two words are light on the tongue, heavy in the scales, and beloved to the Most Merciful: Subhan Allahi wa bihamdihi, Subhan Allahil-Azeem.',
    takeaway: 'Light as a whisper, yet heavier on the Day of Judgment than the entire universe. Keep these words alive on your tongue throughout your day.',
    contextNarrator: 'The final hadith in Sahih al-Bukhari',
  },
];
