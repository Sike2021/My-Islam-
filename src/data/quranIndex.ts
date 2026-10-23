export interface SurahMeta {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number; // overall number
  numberInSurah: number;
  textArabic: string;
  textUrdu: string; // Maulana Fateh Muhammad Jalandhari
  textUrduIsrar?: string; // Dr. Israr Ahmed (Bayan-ul-Quran)
  textEnglish: string; // Sahih International
}

export type UrduScholarId = 'israr' | 'jalandhari' | 'both';

export interface UrduScholarInfo {
  id: UrduScholarId;
  name: string;
  urduName: string;
  description: string;
}

export const URDU_SCHOLARS: UrduScholarInfo[] = [
  {
    id: 'israr',
    name: 'Dr. Israr Ahmed',
    urduName: 'ڈاکٹر اسرار احمد (بیان القرآن)',
    description: 'Renowned Bayan-ul-Quran translation & commentary by Dr. Israr Ahmed'
  },
  {
    id: 'jalandhari',
    name: 'Fateh Muhammad Jalandhari',
    urduName: 'مولانا فتح محمد جالندھری',
    description: 'Classic Urdu translation by Maulana Fateh Muhammad Jalandhari'
  },
  {
    id: 'both',
    name: 'Both (Side-by-Side)',
    urduName: 'دونوں تراجم ساتھ ساتھ',
    description: 'Read Dr. Israr Ahmed & Fateh Muhammad Jalandhari translations together'
  }
];

export interface FullSurahData extends SurahMeta {
  ayahs: Ayah[];
}

export const QURAN_114_SURAHS: SurahMeta[] = [
  { number: 1, name: "الفَاتِحَة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 2, name: "البَقَرَة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
  { number: 3, name: "آل عِمْرَان", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran", numberOfAyahs: 200, revelationType: "Medinan" },
  { number: 4, name: "النِّسَاء", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan" },
  { number: 5, name: "المَائِدَة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan" },
  { number: 6, name: "الأَنْعَام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "Meccan" },
  { number: 7, name: "الأَعْرَاف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "Meccan" },
  { number: 8, name: "الأَنْفَال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "Medinan" },
  { number: 9, name: "التَّوْبَة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "Medinan" },
  { number: 10, name: "يُونُس", englishName: "Yunus", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "Meccan" },
  { number: 11, name: "هُود", englishName: "Hud", englishNameTranslation: "Hud", numberOfAyahs: 123, revelationType: "Meccan" },
  { number: 12, name: "يُوسُف", englishName: "Yusuf", englishNameTranslation: "Joseph", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 13, name: "الرَّعْد", englishName: "Ar-Ra'd", englishNameTranslation: "The Thunder", numberOfAyahs: 43, revelationType: "Medinan" },
  { number: 14, name: "إِبْرَاهِيم", englishName: "Ibrahim", englishNameTranslation: "Abraham", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 15, name: "الحِجْر", englishName: "Al-Hijr", englishNameTranslation: "The Rocky Tract", numberOfAyahs: 99, revelationType: "Meccan" },
  { number: 16, name: "النَّحْل", englishName: "An-Nahl", englishNameTranslation: "The Bee", numberOfAyahs: 128, revelationType: "Meccan" },
  { number: 17, name: "الإِسْرَاء", englishName: "Al-Isra", englishNameTranslation: "The Night Journey", numberOfAyahs: 111, revelationType: "Meccan" },
  { number: 18, name: "الكَهْف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "Meccan" },
  { number: 19, name: "مَرْيَم", englishName: "Maryam", englishNameTranslation: "Mary", numberOfAyahs: 98, revelationType: "Meccan" },
  { number: 20, name: "طه", englishName: "Ta-Ha", englishNameTranslation: "Ta-Ha", numberOfAyahs: 135, revelationType: "Meccan" },
  { number: 21, name: "الأَنْبِيَاء", englishName: "Al-Anbiya", englishNameTranslation: "The Prophets", numberOfAyahs: 112, revelationType: "Meccan" },
  { number: 22, name: "الحَجّ", englishName: "Al-Hajj", englishNameTranslation: "The Pilgrimage", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 23, name: "المُؤْمِنُون", englishName: "Al-Mu'minun", englishNameTranslation: "The Believers", numberOfAyahs: 118, revelationType: "Meccan" },
  { number: 24, name: "النُّور", englishName: "An-Nur", englishNameTranslation: "The Light", numberOfAyahs: 64, revelationType: "Medinan" },
  { number: 25, name: "الفُرْقَان", englishName: "Al-Furqan", englishNameTranslation: "The Criterion", numberOfAyahs: 77, revelationType: "Meccan" },
  { number: 26, name: "الشُّعَرَاء", englishName: "Ash-Shu'ara", englishNameTranslation: "The Poets", numberOfAyahs: 227, revelationType: "Meccan" },
  { number: 27, name: "النَّمْل", englishName: "An-Naml", englishNameTranslation: "The Ant", numberOfAyahs: 93, revelationType: "Meccan" },
  { number: 28, name: "القَصَص", englishName: "Al-Qasas", englishNameTranslation: "The Stories", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 29, name: "العَنْكَبُوت", englishName: "Al-'Ankabut", englishNameTranslation: "The Spider", numberOfAyahs: 69, revelationType: "Meccan" },
  { number: 30, name: "الرُّوم", englishName: "Ar-Rum", englishNameTranslation: "The Romans", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 31, name: "لُقْمَان", englishName: "Luqman", englishNameTranslation: "Luqman", numberOfAyahs: 34, revelationType: "Meccan" },
  { number: 32, name: "السَّجْدَة", englishName: "As-Sajdah", englishNameTranslation: "The Prostration", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 33, name: "الأَحْزَاب", englishName: "Al-Ahzab", englishNameTranslation: "The Combined Forces", numberOfAyahs: 73, revelationType: "Medinan" },
  { number: 34, name: "سَبَأ", englishName: "Saba", englishNameTranslation: "Sheba", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 35, name: "فَاطِر", englishName: "Fatir", englishNameTranslation: "Originator", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya-Sin", numberOfAyahs: 83, revelationType: "Meccan" },
  { number: 37, name: "الصَّافَّات", englishName: "As-Saffat", englishNameTranslation: "Those Who Set the Ranks", numberOfAyahs: 182, revelationType: "Meccan" },
  { number: 38, name: "ص", englishName: "Sad", englishNameTranslation: "The Letter Sad", numberOfAyahs: 88, revelationType: "Meccan" },
  { number: 39, name: "الزُّمَر", englishName: "Az-Zumar", englishNameTranslation: "The Troops", numberOfAyahs: 75, revelationType: "Meccan" },
  { number: 40, name: "غَافِر", englishName: "Ghafir", englishNameTranslation: "The Forgiver", numberOfAyahs: 85, revelationType: "Meccan" },
  { number: 41, name: "فُصِّلَت", englishName: "Fussilat", englishNameTranslation: "Explained in Detail", numberOfAyahs: 54, revelationType: "Meccan" },
  { number: 42, name: "الشُّورَى", englishName: "Ash-Shura", englishNameTranslation: "The Consultation", numberOfAyahs: 53, revelationType: "Meccan" },
  { number: 43, name: "الزُّخْرُف", englishName: "Az-Zukhruf", englishNameTranslation: "The Ornaments of Gold", numberOfAyahs: 89, revelationType: "Meccan" },
  { number: 44, name: "الدُّخَان", englishName: "Ad-Dukhan", englishNameTranslation: "The Smoke", numberOfAyahs: 59, revelationType: "Meccan" },
  { number: 45, name: "الجَاثِيَة", englishName: "Al-Jathiyah", englishNameTranslation: "The Crouching", numberOfAyahs: 37, revelationType: "Meccan" },
  { number: 46, name: "الأَحْقَاف", englishName: "Al-Ahqaf", englishNameTranslation: "The Wind-Curved Sandhills", numberOfAyahs: 35, revelationType: "Meccan" },
  { number: 47, name: "مُحَمَّد", englishName: "Muhammad", englishNameTranslation: "Muhammad", numberOfAyahs: 38, revelationType: "Medinan" },
  { number: 48, name: "الفَتْح", englishName: "Al-Fath", englishNameTranslation: "The Victory", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 49, name: "الحُجُرَات", englishName: "Al-Hujurat", englishNameTranslation: "The Rooms", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 50, name: "ق", englishName: "Qaf", englishNameTranslation: "The Letter Qaf", numberOfAyahs: 45, revelationType: "Meccan" },
  { number: 51, name: "الذَّارِيَات", englishName: "Adh-Dhariyat", englishNameTranslation: "The Winnowing Winds", numberOfAyahs: 60, revelationType: "Meccan" },
  { number: 52, name: "الطُّور", englishName: "At-Tur", englishNameTranslation: "The Mount", numberOfAyahs: 49, revelationType: "Meccan" },
  { number: 53, name: "النَّجْم", englishName: "An-Najm", englishNameTranslation: "The Star", numberOfAyahs: 62, revelationType: "Meccan" },
  { number: 54, name: "القَمَر", englishName: "Al-Qamar", englishNameTranslation: "The Moon", numberOfAyahs: 55, revelationType: "Meccan" },
  { number: 55, name: "الرَّحْمَٰن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "Medinan" },
  { number: 56, name: "الوَاقِعَة", englishName: "Al-Waqi'ah", englishNameTranslation: "The Inevitable", numberOfAyahs: 96, revelationType: "Meccan" },
  { number: 57, name: "الحَدِيد", englishName: "Al-Hadid", englishNameTranslation: "The Iron", numberOfAyahs: 29, revelationType: "Medinan" },
  { number: 58, name: "المُجَادِلَة", englishName: "Al-Mujadila", englishNameTranslation: "The Pleading Woman", numberOfAyahs: 22, revelationType: "Medinan" },
  { number: 59, name: "الحَشْر", englishName: "Al-Hashr", englishNameTranslation: "The Exile", numberOfAyahs: 24, revelationType: "Medinan" },
  { number: 60, name: "المُمْتَحَنَة", englishName: "Al-Mumtahanah", englishNameTranslation: "She that is to be examined", numberOfAyahs: 13, revelationType: "Medinan" },
  { number: 61, name: "الصَّفّ", englishName: "As-Saf", englishNameTranslation: "The Ranks", numberOfAyahs: 14, revelationType: "Medinan" },
  { number: 62, name: "الجُمُعَة", englishName: "Al-Jumu'ah", englishNameTranslation: "Friday", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 63, name: "المُنَافِقُون", englishName: "Al-Munafiqun", englishNameTranslation: "The Hypocrites", numberOfAyahs: 11, revelationType: "Medinan" },
  { number: 64, name: "التَّغَابُن", englishName: "At-Taghabun", englishNameTranslation: "The Mutual Disillusion", numberOfAyahs: 18, revelationType: "Medinan" },
  { number: 65, name: "الطَّلَاق", englishName: "At-Talaq", englishNameTranslation: "The Divorce", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 66, name: "التَّحْرِيم", englishName: "At-Tahrim", englishNameTranslation: "The Prohibition", numberOfAyahs: 12, revelationType: "Medinan" },
  { number: 67, name: "المُلْك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 68, name: "القَلَم", englishName: "Al-Qalam", englishNameTranslation: "The Pen", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 69, name: "الحَاقَّة", englishName: "Al-Haqqah", englishNameTranslation: "The Inevitable Reality", numberOfAyahs: 52, revelationType: "Meccan" },
  { number: 70, name: "المَعَارِج", englishName: "Al-Ma'arij", englishNameTranslation: "The Ascending Stairways", numberOfAyahs: 44, revelationType: "Meccan" },
  { number: 71, name: "نُوح", englishName: "Nuh", englishNameTranslation: "Noah", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 72, name: "الجِنّ", englishName: "Al-Jinn", englishNameTranslation: "The Jinn", numberOfAyahs: 28, revelationType: "Meccan" },
  { number: 73, name: "المُزَّمِّل", englishName: "Al-Muzzammil", englishNameTranslation: "The Enshrouded One", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 74, name: "المُدَّثِّر", englishName: "Al-Muddaththir", englishNameTranslation: "The Cloaked One", numberOfAyahs: 56, revelationType: "Meccan" },
  { number: 75, name: "القِيَامَة", englishName: "Al-Qiyamah", englishNameTranslation: "The Resurrection", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 76, name: "الإِنْسَان", englishName: "Al-Insan", englishNameTranslation: "Man", numberOfAyahs: 31, revelationType: "Medinan" },
  { number: 77, name: "المُرْسَلَات", englishName: "Al-Mursalat", englishNameTranslation: "The Emissaries", numberOfAyahs: 50, revelationType: "Meccan" },
  { number: 78, name: "النَّبَأ", englishName: "An-Naba", englishNameTranslation: "The Tidings", numberOfAyahs: 40, revelationType: "Meccan" },
  { number: 79, name: "النَّازِعَات", englishName: "An-Nazi'at", englishNameTranslation: "Those Who Drag Forth", numberOfAyahs: 46, revelationType: "Meccan" },
  { number: 80, name: "عَبَسَ", englishName: "'Abasa", englishNameTranslation: "He Frowned", numberOfAyahs: 42, revelationType: "Meccan" },
  { number: 81, name: "التَّكْوِير", englishName: "At-Takwir", englishNameTranslation: "The Overthrowing", numberOfAyahs: 29, revelationType: "Meccan" },
  { number: 82, name: "الانْفِطَار", englishName: "Al-Infitar", englishNameTranslation: "The Cleaving", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 83, name: "المُطَفِّفِين", englishName: "Al-Mutaffifin", englishNameTranslation: "The Defrauding", numberOfAyahs: 36, revelationType: "Meccan" },
  { number: 84, name: "الانْشِقَاق", englishName: "Al-Inshiqaq", englishNameTranslation: "The Splitting Open", numberOfAyahs: 25, revelationType: "Meccan" },
  { number: 85, name: "البُرُوج", englishName: "Al-Buruj", englishNameTranslation: "The Mansions of the Stars", numberOfAyahs: 22, revelationType: "Meccan" },
  { number: 86, name: "الطَّارِق", englishName: "At-Tariq", englishNameTranslation: "The Night Comer", numberOfAyahs: 17, revelationType: "Meccan" },
  { number: 87, name: "الأَعْلَى", englishName: "Al-A'la", englishNameTranslation: "The Most High", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 88, name: "الغَاشِيَة", englishName: "Al-Ghashiyah", englishNameTranslation: "The Overwhelming", numberOfAyahs: 26, revelationType: "Meccan" },
  { number: 89, name: "الفَجْر", englishName: "Al-Fajr", englishNameTranslation: "The Dawn", numberOfAyahs: 30, revelationType: "Meccan" },
  { number: 90, name: "البَلَد", englishName: "Al-Balad", englishNameTranslation: "The City", numberOfAyahs: 20, revelationType: "Meccan" },
  { number: 91, name: "الشَّمْس", englishName: "Ash-Shams", englishNameTranslation: "The Sun", numberOfAyahs: 15, revelationType: "Meccan" },
  { number: 92, name: "اللَّيْل", englishName: "Al-Layl", englishNameTranslation: "The Night", numberOfAyahs: 21, revelationType: "Meccan" },
  { number: 93, name: "الضُّحَى", englishName: "Ad-Duha", englishNameTranslation: "The Morning Hours", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 94, name: "الشَّرْح", englishName: "Ash-Sharh", englishNameTranslation: "The Relief", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 95, name: "التِّين", englishName: "At-Tin", englishNameTranslation: "The Fig", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 96, name: "العَلَق", englishName: "Al-'Alaq", englishNameTranslation: "The Clot", numberOfAyahs: 19, revelationType: "Meccan" },
  { number: 97, name: "القَدْر", englishName: "Al-Qadr", englishNameTranslation: "The Power", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 98, name: "البَيِّنَة", englishName: "Al-Bayyinah", englishNameTranslation: "The Clear Proof", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 99, name: "الزَّلْزَلَة", englishName: "Az-Zalzalah", englishNameTranslation: "The Earthquake", numberOfAyahs: 8, revelationType: "Medinan" },
  { number: 100, name: "العَادِيَات", englishName: "Al-'Adiyat", englishNameTranslation: "The Courser", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 101, name: "القَارِعَة", englishName: "Al-Qari'ah", englishNameTranslation: "The Calamity", numberOfAyahs: 11, revelationType: "Meccan" },
  { number: 102, name: "التَّكَاثُر", englishName: "At-Takathur", englishNameTranslation: "The Rivalry in World Increase", numberOfAyahs: 8, revelationType: "Meccan" },
  { number: 103, name: "العَصْر", englishName: "Al-'Asr", englishNameTranslation: "The Declining Day", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 104, name: "الهُمَزَة", englishName: "Al-Humazah", englishNameTranslation: "The Traducer", numberOfAyahs: 9, revelationType: "Meccan" },
  { number: 105, name: "الفِيل", englishName: "Al-Fil", englishNameTranslation: "The Elephant", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 106, name: "قُرَيْش", englishName: "Quraysh", englishNameTranslation: "Quraysh", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 107, name: "المَاعُون", englishName: "Al-Ma'un", englishNameTranslation: "The Small Kindnesses", numberOfAyahs: 7, revelationType: "Meccan" },
  { number: 108, name: "الكَوْثَر", englishName: "Al-Kawthar", englishNameTranslation: "The Abundance", numberOfAyahs: 3, revelationType: "Meccan" },
  { number: 109, name: "الكَافِرُون", englishName: "Al-Kafirun", englishNameTranslation: "The Disbelievers", numberOfAyahs: 6, revelationType: "Meccan" },
  { number: 110, name: "النَّصْر", englishName: "An-Nasr", englishNameTranslation: "The Divine Support", numberOfAyahs: 3, revelationType: "Medinan" },
  { number: 111, name: "المَسَد", englishName: "Al-Masad", englishNameTranslation: "The Palm Fiber", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 112, name: "الإِخْلَاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan" },
  { number: 113, name: "الفَلَق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan" },
  { number: 114, name: "النَّاس", englishName: "An-Nas", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan" },
];

/**
 * Pre-bundled offline verses for Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas, and Ash-Sharh
 * Includes both Maulana Fateh Muhammad Jalandhari and Dr. Israr Ahmed (Bayan-ul-Quran) translations
 */
export const OFFLINE_SURAHS: Record<number, Ayah[]> = {
  1: [
    {
      number: 1,
      numberInSurah: 1,
      textArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      textUrdu: "شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔",
      textUrduIsrar: "اللہ کے نام سے جو رحمان و رحیم ہے",
      textEnglish: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
    },
    {
      number: 2,
      numberInSurah: 2,
      textArabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      textUrdu: "سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔",
      textUrduIsrar: "کل شکر اور کل ثنا اللہ کے لیے ہے جو تمام جہانوں کا پروردگار اور مالک ہے۔",
      textEnglish: "[All] praise is [due] to Allah, Lord of the worlds."
    },
    {
      number: 3,
      numberInSurah: 3,
      textArabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      textUrdu: "بڑا مہربان نہایت رحم فرمانے والا ہے۔",
      textUrduIsrar: "بہت رحم فرمانے والا نہایت مہربان ہے",
      textEnglish: "The Entirely Merciful, the Especially Merciful."
    },
    {
      number: 4,
      numberInSurah: 4,
      textArabic: "مَالِكِ يَوْمِ الدِّينِ",
      textUrdu: "روزِ جزا کا مالک ہے۔",
      textUrduIsrar: "روزِ جزا کا مالک ہے",
      textEnglish: "Sovereign of the Day of Recompense."
    },
    {
      number: 5,
      numberInSurah: 5,
      textArabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      textUrdu: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔",
      textUrduIsrar: "ہم تیری ہی بندگی کرتے ہیں اور تجھ ہی سے مدد کے طلب گار ہیں",
      textEnglish: "It is You we worship and You we ask for help."
    },
    {
      number: 6,
      numberInSurah: 6,
      textArabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      textUrdu: "ہمیں سیدھے راستے کی ہدایت فرما۔",
      textUrduIsrar: "ہمیں سیدھے راستے کی ہدایت فرما",
      textEnglish: "Guide us to the straight path."
    },
    {
      number: 7,
      numberInSurah: 7,
      textArabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      textUrdu: "ان لوگوں کے راستے کی جن پر تو نے انعام فرمایا، نہ کہ ان کے جن پر غضب نازل ہوا اور نہ گمراہوں کے۔",
      textUrduIsrar: "ان لوگوں کے راستے کی جن پر تو نے انعام فرمایا۔ جن پر نہ غضب ہوا اور نہ وہ گمراہ ہوئے",
      textEnglish: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray."
    }
  ],
  94: [
    { number: 1, numberInSurah: 1, textArabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", textUrdu: "کیا ہم نے آپ کے لیے آپ کا سینہ کشادہ نہیں کر دیا؟", textUrduIsrar: "کیا ہم نے آپ کا سینہ کشادہ نہیں کر دیا ؟", textEnglish: "Did We not expand for you, [O Muhammad], your breast?" },
    { number: 2, numberInSurah: 2, textArabic: "وَوَضَعْنَا عَنكَ وِزْرَكَ", textUrdu: "اور آپ سے آپ کا بوجھ اتار دیا۔", textUrduIsrar: "اور ہم نے آپ پر سے آپ کا وہ بوجھ اتار دیا", textEnglish: "And We removed from you your burden." },
    { number: 3, numberInSurah: 3, textArabic: "الَّذِي أَنقَضَ ظَهْرَكَ", textUrdu: "جس نے آپ کی کمر توڑ رکھی تھی۔", textUrduIsrar: "جس نے آپ کی کمر توڑ رکھی تھی", textEnglish: "Which had weighed upon your back." },
    { number: 4, numberInSurah: 4, textArabic: "وَرَفَعْنَا لَكَ ذِكْرَكَ", textUrdu: "اور ہم نے آپ کے لیے آپ کا ذکر بلند کر دیا۔", textUrduIsrar: "اور ہم نے آپ کے لیے آپ کے ذکر کو رفعت بخشی", textEnglish: "And raised high for you your repute." },
    { number: 5, numberInSurah: 5, textArabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", textUrdu: "پس بے شک تنگی کے ساتھ آسانی ہے۔", textUrduIsrar: "پس یقیناً تنگی کے ساتھ آسانی ہے", textEnglish: "For indeed, with hardship [will be] ease." },
    { number: 6, numberInSurah: 6, textArabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", textUrdu: "یقیناً تنگی کے ساتھ آسانی ہے۔", textUrduIsrar: "یقیناً تنگی کے ساتھ آسانی ہے", textEnglish: "Indeed, with hardship [will be] ease." },
    { number: 7, numberInSurah: 7, textArabic: "فَإِذَا فَرَغْتَ فَانصَبْ", textUrdu: "پس جب آپ فارغ ہوں تو عبادت میں محنت کریں۔", textUrduIsrar: "چنانچہ جب آپ فارغ ہوں تو محنت و مشقت کیجیے", textEnglish: "So when you have finished [your duties], then stand up [for worship]." },
    { number: 8, numberInSurah: 8, textArabic: "وَإِلَىٰ رَبِّكَ فَارْغَب", textUrdu: "اور اپنے رب ہی کی طرف راغب ہو جائیں۔", textUrduIsrar: "اور اپنے رب ہی کی طرف راغب ہو جائیے", textEnglish: "And to your Lord direct [your] longing." }
  ],
  112: [
    { number: 1, numberInSurah: 1, textArabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", textUrdu: "کہہ دیجیے: وہ اللہ ایک ہے۔", textUrduIsrar: "کہہ دیجیے وہ اللہ یکتا ہے", textEnglish: "Say, 'He is Allah, [who is] One.'" },
    { number: 2, numberInSurah: 2, textArabic: "اللَّهُ الصَّمَدُ", textUrdu: "اللہ بے نیاز ہے۔", textUrduIsrar: "اللہ سب سے بے نیاز ہے اور سب اس کے محتاج ہیں", textEnglish: "Allah, the Eternal Refuge." },
    { number: 3, numberInSurah: 3, textArabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", textUrdu: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے۔", textUrduIsrar: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے", textEnglish: "He neither begets nor is born." },
    { number: 4, numberInSurah: 4, textArabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", textUrdu: "اور کوئی اس کا ہمسر نہیں۔", textUrduIsrar: "اور کوئی اس کا ہمسر نہیں ہے", textEnglish: "Nor is there to Him any equivalent." }
  ],
  113: [
    { number: 1, numberInSurah: 1, textArabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", textUrdu: "کہہ دیجیے: میں صبح کے رب کی پناہ مانگتا ہوں۔", textUrduIsrar: "آپ کہئے کہ میں صبح کے رب کی پناہ مانگتا ہوں", textEnglish: "Say, 'I seek refuge in the Lord of daybreak.'" },
    { number: 2, numberInSurah: 2, textArabic: "مِن شَرِّ مَا خَلَقَ", textUrdu: "ہر اس چیز کے شر سے جو اس نے پیدا فرمائی۔", textUrduIsrar: "ہر اس چیز کے شر سے جو اس نے پیدا کی", textEnglish: "From the evil of that which He created." },
    { number: 3, numberInSurah: 3, textArabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", textUrdu: "اور اندھیری رات کے شر سے جب وہ چھا جائے۔", textUrduIsrar: "اور اندھیری رات کی برائی سے جب وہ چھا جائے", textEnglish: "And from the evil of darkness when it settles." },
    { number: 4, numberInSurah: 4, textArabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", textUrdu: "اور گرہوں میں پھونکنے والیوں کے شر سے۔", textUrduIsrar: "اور گرہوں میں پھونکنے والیوں کے شر سے", textEnglish: "And from the evil of the blowers in knots." },
    { number: 5, numberInSurah: 5, textArabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", textUrdu: "اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔", textUrduIsrar: "اور حسد کرنے والے کی برائی سے جب وہ حسد کرے", textEnglish: "And from the evil of an envier when he envies." }
  ],
  114: [
    { number: 1, numberInSurah: 1, textArabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", textUrdu: "کہہ دیجیے: میں انسانوں کے رب کی پناہ میں آتا ہوں۔", textUrduIsrar: "کہہ دیجیے کہ میں انسانوں کے پروردگار کی پناہ میں آتا ہوں", textEnglish: "Say, 'I seek refuge in the Lord of mankind.'" },
    { number: 2, numberInSurah: 2, textArabic: "مَلِكِ النَّاسِ", textUrdu: "انسانوں کے بادشاہ کی۔", textUrduIsrar: "انسانوں کے بادشاہ کی", textEnglish: "The Sovereign of mankind." },
    { number: 3, numberInSurah: 3, textArabic: "إِلَٰهِ النَّاسِ", textUrdu: "انسانوں کے معبود برحق کی۔", textUrduIsrar: "انسانوں کے حقیقی معبود کی", textEnglish: "The God of mankind." },
    { number: 4, numberInSurah: 4, textArabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", textUrdu: "وسوسہ ڈالنے والے، پیچھے ہٹ جانے والے کے شر سے۔", textUrduIsrar: "وسوسہ ڈالنے والے، پیچھے ہٹ جانے والے کے شر سے", textEnglish: "From the evil of the retreating whisperer." },
    { number: 5, numberInSurah: 5, textArabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", textUrdu: "جو لوگوں کے سینوں میں وسوسے ڈالتا ہے۔", textUrduIsrar: "جو لوگوں کے دلوں میں وسوسے ڈالتا ہے", textEnglish: "Who whispers into the breasts of mankind." },
    { number: 6, numberInSurah: 6, textArabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", textUrdu: "خواہ وہ جنات میں سے ہو یا انسانوں میں سے۔", textUrduIsrar: "خواہ وہ جنوں میں سے ہو یا انسانوں میں سے", textEnglish: "From among the jinn and mankind." }
  ]
};

/**
 * Clean helper to strip HTML markup from API translation texts
 */
function cleanText(raw?: string): string {
  if (!raw) return '';
  return raw.replace(/<[^>]+>/g, '').trim();
}

/**
 * Fetch full Surah text (Arabic Uthmani, Urdu Jalandhry, Urdu Dr. Israr Ahmed, English Sahih) with caching
 */
export async function fetchSurahVerses(surahNumber: number): Promise<Ayah[]> {
  // Check local offline bundle first
  if (OFFLINE_SURAHS[surahNumber]) {
    return OFFLINE_SURAHS[surahNumber];
  }

  // Check localStorage cache (versioned for Dr. Israr support)
  const cacheKey = `sike_surah_v3_${surahNumber}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // continue to fetch
  }

  try {
    // Run parallel fetches for primary Quran edition bundle AND Dr. Israr Ahmed translation (id: 158)
    const [alquranRes, israrRes] = await Promise.allSettled([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ur.jalandhry,en.sahih`),
      fetch(`https://api.quran.com/api/v4/quran/translations/158?chapter_number=${surahNumber}`)
    ]);

    if (alquranRes.status !== 'fulfilled' || !alquranRes.value.ok) {
      throw new Error('Failed to load Quran texts');
    }

    const data = await alquranRes.value.json();
    if (!data.data || data.data.length < 3) throw new Error('Invalid Quran data');

    const arabicAyahs = data.data[0].ayahs;
    const urduAyahs = data.data[1].ayahs;
    const englishAyahs = data.data[2].ayahs;

    // Parse Dr. Israr Ahmed translation if successfully returned
    let israrAyahs: Array<{ text: string }> = [];
    if (israrRes.status === 'fulfilled' && israrRes.value.ok) {
      try {
        const israrData = await israrRes.value.json();
        israrAyahs = israrData.translations || [];
      } catch {
        // non-blocking
      }
    }

    const merged: Ayah[] = arabicAyahs.map((ayah: any, index: number) => {
      const israrText = israrAyahs[index]?.text ? cleanText(israrAyahs[index].text) : undefined;
      return {
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        textArabic: ayah.text,
        textUrdu: urduAyahs[index]?.text || '',
        textUrduIsrar: israrText,
        textEnglish: englishAyahs[index]?.text || '',
      };
    });

    // Cache locally
    try {
      localStorage.setItem(cacheKey, JSON.stringify(merged));
    } catch {
      // quota or private mode
    }

    return merged;
  } catch (err) {
    console.error(`Failed to fetch Surah ${surahNumber}:`, err);
    throw err;
  }
}

/**
 * Reciter audio URLs for EveryAyah CDN
 */
export type ReciterId = 'sudais' | 'shuraim';

export interface ReciterInfo {
  id: ReciterId;
  name: string;
  arabicName: string;
  baseUrl: string;
}

export const RECITERS: ReciterInfo[] = [
  {
    id: 'sudais',
    name: 'Sheikh Abdul Rahman Al-Sudais',
    arabicName: 'الشيخ عبد الرحمن السديس',
    baseUrl: 'https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/',
  },
  {
    id: 'shuraim',
    name: 'Sheikh Saud Al-Shuraim',
    arabicName: 'الشيخ سعود الشريم',
    baseUrl: 'https://everyayah.com/data/Saood_ash-Shuraym_128kbps/',
  },
];

export function getAyahAudioUrl(reciterId: ReciterId, surahNumber: number, ayahNumberInSurah: number): string {
  const reciter = RECITERS.find(r => r.id === reciterId) || RECITERS[0];
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumberInSurah).padStart(3, '0');
  return `${reciter.baseUrl}${s}${a}.mp3`;
}

export type UrduVoiceId = 'jalandhari' | 'farhat_hashmi';

export interface UrduVoiceInfo {
  id: UrduVoiceId;
  name: string;
  translator: string;
  narrator: string;
  arabicName: string;
  baseUrl: string;
}

export const URDU_VOICES: UrduVoiceInfo[] = [
  {
    id: 'jalandhari',
    name: 'Fateh Muhammad Jalandhari',
    translator: 'Maulana Fateh Muhammad Jalandhari (مولانا فتح محمد جالندھری)',
    narrator: 'Fateh Muhammad Jalandhari Translation (Shamshad Ali Khan)',
    arabicName: 'ترجمہ مولانا فتح محمد جالندھری',
    baseUrl: 'https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/',
  },
  {
    id: 'farhat_hashmi',
    name: 'Dr. Farhat Hashmi',
    translator: 'Dr. Farhat Hashmi',
    narrator: 'Dr. Farhat Hashmi',
    arabicName: 'ڈاکٹر فرحت ہاشمی',
    baseUrl: 'https://everyayah.com/data/translations/urdu_farhat_hashmi/',
  },
];

/**
 * Authentic human Urdu translation audio of Maulana Fateh Muhammad Jalandhari
 */
export function getAyahUrduAudioUrl(
  surahNumber: number,
  ayahNumberInSurah: number,
  urduVoiceId: UrduVoiceId = 'jalandhari'
): string {
  const voice = URDU_VOICES.find(v => v.id === urduVoiceId) || URDU_VOICES[0];
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumberInSurah).padStart(3, '0');
  return `${voice.baseUrl}${s}${a}.mp3`;
}

/**
 * Authentic human English translation audio by Ibrahim Walk (Sahih International)
 */
export function getAyahEnglishAudioUrl(surahNumber: number, ayahNumberInSurah: number): string {
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumberInSurah).padStart(3, '0');
  return `https://everyayah.com/data/English/Sahih_Intnl_Ibrahim_Walk_192kbps/${s}${a}.mp3`;
}

import { getDrIsrarAudioUrl } from './drIsrarAudioMap';

/**
 * Dr. Israr Ahmed Bayan-ul-Quran Complete Surah Audio Lecture (MP3)
 * Full 114 Surahs audio stream from Internet Archive collection
 */
export function getDrIsrarSurahAudioUrl(surahNumber: number): string {
  return getDrIsrarAudioUrl(surahNumber);
}


export type TafsirSourceId = 'israr' | 'ibnkathir' | 'maarifulquran';

export interface TafsirSourceInfo {
  id: TafsirSourceId;
  name: string;
  author: string;
  language: 'Urdu' | 'English';
  resourceId: number;
  description: string;
}

export const TAFSIR_SOURCES: TafsirSourceInfo[] = [
  {
    id: 'israr',
    name: 'تفسیر بیان القرآن',
    author: 'Dr. Israr Ahmed (ڈاکٹر اسرار احمد)',
    language: 'Urdu',
    resourceId: 159,
    description: 'معروف اور مستند تفسیر بیان القرآن از ڈاکٹر اسرار احمد رحمہ اللہ'
  },
  {
    id: 'ibnkathir',
    name: 'Tafsir Ibn Kathir',
    author: 'Hafiz Ibn Kathir (Abridged)',
    language: 'English',
    resourceId: 169,
    description: 'Renowned classical commentary based on Quran, Sunnah and authentic Athar'
  },
  {
    id: 'maarifulquran',
    name: "Ma'arif al-Qur'an",
    author: 'Mufti Muhammad Shafi',
    language: 'English',
    resourceId: 168,
    description: 'Comprehensive contemporary commentary explaining modern and theological contexts'
  }
];

export interface TafsirResult {
  text: string;
  authorName: string;
  resourceName: string;
  language: 'Urdu' | 'English';
}

const OFFLINE_TAFSIR: Record<string, TafsirResult> = {
  '1:1:israr': {
    resourceName: 'تفسیر بیان القرآن',
    authorName: 'Dr. Israr Ahmad',
    language: 'Urdu',
    text: '<p><strong>بِسْمِ اللّٰہِ الرَّحْمٰنِ الرَّحِیْمِ</strong></p><p>تسمیہ (بسم اللہ) کے بارے میں جمہور کا موقف یہ ہے کہ یہ قرآن مجید کی ہر سورت کے آغاز میں ایک مستقل آیت ہے، البتہ سورت توبہ کے علاوہ۔</p><p>”اللہ کے نام کے ساتھ جو بے انتہا رحم فرمانے والا، نہایت مہربان ہے۔“ لفظ ”اللہ“ ذات باری تعالیٰ کا اسمِ علم (Personal Name) ہے۔ ”الرَّحْمٰن“ اور ”الرَّحِیْم“ دونوں اللہ کی صفتِ رحمت سے مشتق ہیں۔ رحمن میں رحمت کا جوش اور وسعت، جبکہ رحیم میں دوام اور ہمیشگی کا مفہوم ہے۔</p>'
  },
  '1:2:israr': {
    resourceName: 'تفسیر بیان القرآن',
    authorName: 'Dr. Israr Ahmad',
    language: 'Urdu',
    text: '<p><strong>اَلْحَمْدُ لِلّٰہِ رَبِّ الْعٰلَمِیْنَ</strong></p><p>اَلْحَمْدُ مبتدأ ‘ لِلّٰہِ خبر۔ ”کل تعریف، کل حمد و ثنا اور کل شکر اللہ کے لیے ہے“۔ اب وہ اللہ کون ہے؟ رَبِّ الْعٰلَمِیْنَ ”جو تمام جہانوں کا مالک ہے، پروردگار ہے، پرورش کنندہ ہے“۔</p><p>رب کے مفہوم میں ملکیت، تربیت، کفالت اور سیادت سب شامل ہیں۔ عالمین سے مراد کائنات کی ہر نوع اور تمام مخلوقات ہیں۔</p>'
  },
  '112:1:israr': {
    resourceName: 'تفسیر بیان القرآن',
    authorName: 'Dr. Israr Ahmad',
    language: 'Urdu',
    text: '<p><strong>قُلْ ہُوَ اللّٰہُ اَحَدٌ</strong></p><p>”کہہ دیجیے وہ اللہ یکتا ہے۔“</p><p>اَحَد : وہ اکیلا اور یکتا جس کی ذات اور صفات میں کوئی شریک نہیں۔ وہی اکیلا معبود برحق ہے، کسی دوسرے کا ربوبیت اور الوہیت میں کوئی حصہ نہیں۔ شرک کی ہر شکل کی یہ قطعی اور حتمی نفی ہے۔</p>'
  }
};

/**
 * Fetch Tafsir for an Ayah with caching and offline fallback
 */
export async function fetchAyahTafsir(
  surahNumber: number,
  ayahNumberInSurah: number,
  sourceId: TafsirSourceId = 'israr'
): Promise<TafsirResult> {
  const offlineKey = `${surahNumber}:${ayahNumberInSurah}:${sourceId}`;
  if (OFFLINE_TAFSIR[offlineKey]) {
    return OFFLINE_TAFSIR[offlineKey];
  }

  const cacheKey = `sike_tafsir_${surahNumber}_${ayahNumberInSurah}_${sourceId}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    // continue to fetch
  }

  const source = TAFSIR_SOURCES.find(s => s.id === sourceId) || TAFSIR_SOURCES[0];

  try {
    const url = `https://api.quran.com/api/v4/tafsirs/${source.resourceId}/by_ayah/${surahNumber}:${ayahNumberInSurah}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    const tafsirObj = data.tafsir;

    if (!tafsirObj || !tafsirObj.text) {
      throw new Error('No tafsir text found');
    }

    const result: TafsirResult = {
      text: tafsirObj.text,
      authorName: tafsirObj.resource_name || source.author,
      resourceName: source.name,
      language: source.language
    };

    try {
      localStorage.setItem(cacheKey, JSON.stringify(result));
    } catch {
      // ignore quota
    }

    return result;
  } catch (err) {
    console.error(`Failed to fetch Tafsir for ${surahNumber}:${ayahNumberInSurah}:`, err);
    // If offline fallback exists for surah 1
    if (OFFLINE_TAFSIR[offlineKey]) {
      return OFFLINE_TAFSIR[offlineKey];
    }
    throw err;
  }
}



