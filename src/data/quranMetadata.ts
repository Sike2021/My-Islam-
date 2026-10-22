export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameTranslation: string;
  totalVerses: number;
  revelationType: 'Meccan' | 'Medinan';
  startJuz: number;
}

export interface JuzMeta {
  juzNumber: number;
  nameArabic: string;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
  totalVerses: number;
}

export interface AyahItem {
  numberInSurah: number;
  numberInQuran: number;
  arabicText: string;
  translationEnglish: string;
  translationUrdu?: string;
  juz: number;
}

// Complete 114 Surahs catalog
export const SURAHS_METADATA: SurahMeta[] = [
  { number: 1, nameArabic: 'الفاتحة', nameEnglish: 'Al-Fatihah', nameTranslation: 'The Opening', totalVerses: 7, revelationType: 'Meccan', startJuz: 1 },
  { number: 2, nameArabic: 'البقرة', nameEnglish: 'Al-Baqarah', nameTranslation: 'The Cow', totalVerses: 286, revelationType: 'Medinan', startJuz: 1 },
  { number: 3, nameArabic: 'آل عمران', nameEnglish: 'Ali \'Imran', nameTranslation: 'Family of Imran', totalVerses: 200, revelationType: 'Medinan', startJuz: 3 },
  { number: 4, nameArabic: 'النساء', nameEnglish: 'An-Nisa', nameTranslation: 'The Women', totalVerses: 176, revelationType: 'Medinan', startJuz: 4 },
  { number: 5, nameArabic: 'المائدة', nameEnglish: 'Al-Ma\'idah', nameTranslation: 'The Table Spread', totalVerses: 120, revelationType: 'Medinan', startJuz: 6 },
  { number: 6, nameArabic: 'الأنعام', nameEnglish: 'Al-An\'am', nameTranslation: 'The Cattle', totalVerses: 165, revelationType: 'Meccan', startJuz: 7 },
  { number: 7, nameArabic: 'الأعراف', nameEnglish: 'Al-A\'raf', nameTranslation: 'The Heights', totalVerses: 206, revelationType: 'Meccan', startJuz: 8 },
  { number: 8, nameArabic: 'الأنفال', nameEnglish: 'Al-Anfal', nameTranslation: 'The Spoils of War', totalVerses: 75, revelationType: 'Medinan', startJuz: 9 },
  { number: 9, nameArabic: 'التوبة', nameEnglish: 'At-Tawbah', nameTranslation: 'The Repentance', totalVerses: 129, revelationType: 'Medinan', startJuz: 10 },
  { number: 10, nameArabic: 'يونس', nameEnglish: 'Yunus', nameTranslation: 'Jonah', totalVerses: 109, revelationType: 'Meccan', startJuz: 11 },
  { number: 11, nameArabic: 'هود', nameEnglish: 'Hud', nameTranslation: 'Hud', totalVerses: 123, revelationType: 'Meccan', startJuz: 11 },
  { number: 12, nameArabic: 'يوسف', nameEnglish: 'Yusuf', nameTranslation: 'Joseph', totalVerses: 111, revelationType: 'Meccan', startJuz: 12 },
  { number: 13, nameArabic: 'الرعد', nameEnglish: 'Ar-Ra\'d', nameTranslation: 'The Thunder', totalVerses: 43, revelationType: 'Medinan', startJuz: 13 },
  { number: 14, nameArabic: 'ابراهيم', nameEnglish: 'Ibrahim', nameTranslation: 'Abraham', totalVerses: 52, revelationType: 'Meccan', startJuz: 13 },
  { number: 15, nameArabic: 'الحجر', nameEnglish: 'Al-Hijr', nameTranslation: 'The Rocky Tract', totalVerses: 99, revelationType: 'Meccan', startJuz: 14 },
  { number: 16, nameArabic: 'النحل', nameEnglish: 'An-Nahl', nameTranslation: 'The Bee', totalVerses: 128, revelationType: 'Meccan', startJuz: 14 },
  { number: 17, nameArabic: 'الإسراء', nameEnglish: 'Al-Isra', nameTranslation: 'The Night Journey', totalVerses: 111, revelationType: 'Meccan', startJuz: 15 },
  { number: 18, nameArabic: 'الكهف', nameEnglish: 'Al-Kahf', nameTranslation: 'The Cave', totalVerses: 110, revelationType: 'Meccan', startJuz: 15 },
  { number: 19, nameArabic: 'مريم', nameEnglish: 'Maryam', nameTranslation: 'Mary', totalVerses: 98, revelationType: 'Meccan', startJuz: 16 },
  { number: 20, nameArabic: 'طه', nameEnglish: 'Taha', nameTranslation: 'Ta-Ha', totalVerses: 135, revelationType: 'Meccan', startJuz: 16 },
  { number: 21, nameArabic: 'الأنبياء', nameEnglish: 'Al-Anbiya', nameTranslation: 'The Prophets', totalVerses: 112, revelationType: 'Meccan', startJuz: 17 },
  { number: 22, nameArabic: 'الحج', nameEnglish: 'Al-Hajj', nameTranslation: 'The Pilgrimage', totalVerses: 78, revelationType: 'Medinan', startJuz: 17 },
  { number: 23, nameArabic: 'المؤمنون', nameEnglish: 'Al-Mu\'minun', nameTranslation: 'The Believers', totalVerses: 118, revelationType: 'Meccan', startJuz: 18 },
  { number: 24, nameArabic: 'النور', nameEnglish: 'An-Nur', nameTranslation: 'The Light', totalVerses: 64, revelationType: 'Medinan', startJuz: 18 },
  { number: 25, nameArabic: 'الفرقان', nameEnglish: 'Al-Furqan', nameTranslation: 'The Criterion', totalVerses: 77, revelationType: 'Meccan', startJuz: 18 },
  { number: 26, nameArabic: 'الشعراء', nameEnglish: 'Ash-Shu\'ara', nameTranslation: 'The Poets', totalVerses: 227, revelationType: 'Meccan', startJuz: 19 },
  { number: 27, nameArabic: 'النمل', nameEnglish: 'An-Naml', nameTranslation: 'The Ant', totalVerses: 93, revelationType: 'Meccan', startJuz: 19 },
  { number: 28, nameArabic: 'القصص', nameEnglish: 'Al-Qasas', nameTranslation: 'The Stories', totalVerses: 88, revelationType: 'Meccan', startJuz: 20 },
  { number: 29, nameArabic: 'العنكبوت', nameEnglish: 'Al-\'Ankabut', nameTranslation: 'The Spider', totalVerses: 69, revelationType: 'Meccan', startJuz: 20 },
  { number: 30, nameArabic: 'الروم', nameEnglish: 'Ar-Rum', nameTranslation: 'The Romans', totalVerses: 60, revelationType: 'Meccan', startJuz: 21 },
  { number: 31, nameArabic: 'لقمان', nameEnglish: 'Luqman', nameTranslation: 'Luqman', totalVerses: 34, revelationType: 'Meccan', startJuz: 21 },
  { number: 32, nameArabic: 'السجدة', nameEnglish: 'As-Sajdah', nameTranslation: 'The Prostration', totalVerses: 30, revelationType: 'Meccan', startJuz: 21 },
  { number: 33, nameArabic: 'الأحزاب', nameEnglish: 'Al-Ahzab', nameTranslation: 'The Combined Forces', totalVerses: 73, revelationType: 'Medinan', startJuz: 21 },
  { number: 34, nameArabic: 'سبإ', nameEnglish: 'Saba', nameTranslation: 'Sheba', totalVerses: 54, revelationType: 'Meccan', startJuz: 22 },
  { number: 35, nameArabic: 'فاطر', nameEnglish: 'Fatir', nameTranslation: 'Originator', totalVerses: 45, revelationType: 'Meccan', startJuz: 22 },
  { number: 36, nameArabic: 'يس', nameEnglish: 'Ya-Sin', nameTranslation: 'Ya-Sin', totalVerses: 83, revelationType: 'Meccan', startJuz: 22 },
  { number: 37, nameArabic: 'الصافات', nameEnglish: 'As-Saffat', nameTranslation: 'Those Who Set The Ranks', totalVerses: 182, revelationType: 'Meccan', startJuz: 23 },
  { number: 38, nameArabic: 'ص', nameEnglish: 'Sad', nameTranslation: 'The Letter Sad', totalVerses: 88, revelationType: 'Meccan', startJuz: 23 },
  { number: 39, nameArabic: 'الزمر', nameEnglish: 'Az-Zumar', nameTranslation: 'The Troops', totalVerses: 75, revelationType: 'Meccan', startJuz: 23 },
  { number: 40, nameArabic: 'غافر', nameEnglish: 'Ghafir', nameTranslation: 'The Forgiver', totalVerses: 85, revelationType: 'Meccan', startJuz: 24 },
  { number: 41, nameArabic: 'فصلت', nameEnglish: 'Fussilat', nameTranslation: 'Explained in Detail', totalVerses: 54, revelationType: 'Meccan', startJuz: 24 },
  { number: 42, nameArabic: 'الشورى', nameEnglish: 'Ash-Shuraa', nameTranslation: 'The Consultation', totalVerses: 53, revelationType: 'Meccan', startJuz: 25 },
  { number: 43, nameArabic: 'الزخرف', nameEnglish: 'Az-Zukhruf', nameTranslation: 'The Ornaments of Gold', totalVerses: 89, revelationType: 'Meccan', startJuz: 25 },
  { number: 44, nameArabic: 'الدخان', nameEnglish: 'Ad-Dukhan', nameTranslation: 'The Smoke', totalVerses: 59, revelationType: 'Meccan', startJuz: 25 },
  { number: 45, nameArabic: 'الجاثية', nameEnglish: 'Al-Jathiyah', nameTranslation: 'The Crouching', totalVerses: 37, revelationType: 'Meccan', startJuz: 25 },
  { number: 46, nameArabic: 'الأحقاف', nameEnglish: 'Al-Ahqaf', nameTranslation: 'The Wind-Curved Sandhills', totalVerses: 35, revelationType: 'Meccan', startJuz: 26 },
  { number: 47, nameArabic: 'محمد', nameEnglish: 'Muhammad', nameTranslation: 'Muhammad', totalVerses: 38, revelationType: 'Medinan', startJuz: 26 },
  { number: 48, nameArabic: 'الفتح', nameEnglish: 'Al-Fath', nameTranslation: 'The Victory', totalVerses: 29, revelationType: 'Medinan', startJuz: 26 },
  { number: 49, nameArabic: 'الحجرات', nameEnglish: 'Al-Hujurat', nameTranslation: 'The Rooms', totalVerses: 18, revelationType: 'Medinan', startJuz: 26 },
  { number: 50, nameArabic: 'ق', nameEnglish: 'Qaf', nameTranslation: 'The Letter Qaf', totalVerses: 45, revelationType: 'Meccan', startJuz: 26 },
  { number: 51, nameArabic: 'الذاريات', nameEnglish: 'Adh-Dhariyat', nameTranslation: 'The Winnowing Winds', totalVerses: 60, revelationType: 'Meccan', startJuz: 26 },
  { number: 52, nameArabic: 'الطور', nameEnglish: 'At-Tur', nameTranslation: 'The Mount', totalVerses: 49, revelationType: 'Meccan', startJuz: 27 },
  { number: 53, nameArabic: 'النجم', nameEnglish: 'An-Najm', nameTranslation: 'The Star', totalVerses: 62, revelationType: 'Meccan', startJuz: 27 },
  { number: 54, nameArabic: 'القمر', nameEnglish: 'Al-Qamar', nameTranslation: 'The Moon', totalVerses: 55, revelationType: 'Meccan', startJuz: 27 },
  { number: 55, nameArabic: 'الرحمن', nameEnglish: 'Ar-Rahman', nameTranslation: 'The Beneficent', totalVerses: 78, revelationType: 'Medinan', startJuz: 27 },
  { number: 56, nameArabic: 'الواقعة', nameEnglish: 'Al-Waqi\'ah', nameTranslation: 'The Inevitable', totalVerses: 96, revelationType: 'Meccan', startJuz: 27 },
  { number: 57, nameArabic: 'الحديد', nameEnglish: 'Al-Hadid', nameTranslation: 'The Iron', totalVerses: 29, revelationType: 'Medinan', startJuz: 27 },
  { number: 58, nameArabic: 'المجادلة', nameEnglish: 'Al-Mujadila', nameTranslation: 'The Pleading Woman', totalVerses: 22, revelationType: 'Medinan', startJuz: 28 },
  { number: 59, nameArabic: 'الحشر', nameEnglish: 'Al-Hashr', nameTranslation: 'The Exile', totalVerses: 24, revelationType: 'Medinan', startJuz: 28 },
  { number: 60, nameArabic: 'الممتحنة', nameEnglish: 'Al-Mumtahanah', nameTranslation: 'She That Is To Be Examined', totalVerses: 13, revelationType: 'Medinan', startJuz: 28 },
  { number: 61, nameArabic: 'الصف', nameEnglish: 'As-Saf', nameTranslation: 'The Ranks', totalVerses: 14, revelationType: 'Medinan', startJuz: 28 },
  { number: 62, nameArabic: 'الجمعة', nameEnglish: 'Al-Jumu\'ah', nameTranslation: 'The Congregation', totalVerses: 11, revelationType: 'Medinan', startJuz: 28 },
  { number: 63, nameArabic: 'المنافقون', nameEnglish: 'Al-Munafiqun', nameTranslation: 'The Hypocrites', totalVerses: 11, revelationType: 'Medinan', startJuz: 28 },
  { number: 64, nameArabic: 'التغابن', nameEnglish: 'At-Taghabun', nameTranslation: 'Mutual Disillusion', totalVerses: 18, revelationType: 'Medinan', startJuz: 28 },
  { number: 65, nameArabic: 'الطلاق', nameEnglish: 'At-Talaq', nameTranslation: 'The Divorce', totalVerses: 12, revelationType: 'Medinan', startJuz: 28 },
  { number: 66, nameArabic: 'التحريم', nameEnglish: 'At-Tahrim', nameTranslation: 'The Prohibition', totalVerses: 12, revelationType: 'Medinan', startJuz: 28 },
  { number: 67, nameArabic: 'الملك', nameEnglish: 'Al-Mulk', nameTranslation: 'The Sovereignty', totalVerses: 30, revelationType: 'Meccan', startJuz: 29 },
  { number: 68, nameArabic: 'القلم', nameEnglish: 'Al-Qalam', nameTranslation: 'The Pen', totalVerses: 52, revelationType: 'Meccan', startJuz: 29 },
  { number: 69, nameArabic: 'الحاقة', nameEnglish: 'Al-Haqqah', nameTranslation: 'The Reality', totalVerses: 52, revelationType: 'Meccan', startJuz: 29 },
  { number: 70, nameArabic: 'المعارج', nameEnglish: 'Al-Ma\'arij', nameTranslation: 'The Ascending Stairways', totalVerses: 44, revelationType: 'Meccan', startJuz: 29 },
  { number: 71, nameArabic: 'نوح', nameEnglish: 'Nuh', nameTranslation: 'Noah', totalVerses: 28, revelationType: 'Meccan', startJuz: 29 },
  { number: 72, nameArabic: 'الجن', nameEnglish: 'Al-Jinn', nameTranslation: 'The Jinn', totalVerses: 28, revelationType: 'Meccan', startJuz: 29 },
  { number: 73, nameArabic: 'المزمل', nameEnglish: 'Al-Muzzammil', nameTranslation: 'The Enshrouded One', totalVerses: 20, revelationType: 'Meccan', startJuz: 29 },
  { number: 74, nameArabic: 'المدثر', nameEnglish: 'Al-Muddaththir', nameTranslation: 'The Cloaked One', totalVerses: 56, revelationType: 'Meccan', startJuz: 29 },
  { number: 75, nameArabic: 'القيامة', nameEnglish: 'Al-Qiyamah', nameTranslation: 'The Resurrection', totalVerses: 40, revelationType: 'Meccan', startJuz: 29 },
  { number: 76, nameArabic: 'الإنسان', nameEnglish: 'Al-Insan', nameTranslation: 'The Human', totalVerses: 31, revelationType: 'Medinan', startJuz: 29 },
  { number: 77, nameArabic: 'المرسلات', nameEnglish: 'Al-Mursalat', nameTranslation: 'The Emissaries', totalVerses: 50, revelationType: 'Meccan', startJuz: 29 },
  { number: 78, nameArabic: 'النبإ', nameEnglish: 'An-Naba', nameTranslation: 'The Tidings', totalVerses: 40, revelationType: 'Meccan', startJuz: 30 },
  { number: 79, nameArabic: 'النازعات', nameEnglish: 'An-Nazi\'at', nameTranslation: 'Those Who Drag Forth', totalVerses: 46, revelationType: 'Meccan', startJuz: 30 },
  { number: 80, nameArabic: 'عبس', nameEnglish: '\'Abasa', nameTranslation: 'He Frowned', totalVerses: 42, revelationType: 'Meccan', startJuz: 30 },
  { number: 81, nameArabic: 'التكوير', nameEnglish: 'At-Takwir', nameTranslation: 'The Overthrowing', totalVerses: 29, revelationType: 'Meccan', startJuz: 30 },
  { number: 82, nameArabic: 'الانفطار', nameEnglish: 'Al-Infitar', nameTranslation: 'The Cleaving', totalVerses: 19, revelationType: 'Meccan', startJuz: 30 },
  { number: 83, nameArabic: 'المطففين', nameEnglish: 'Al-Mutaffifin', nameTranslation: 'The Defrauding', totalVerses: 36, revelationType: 'Meccan', startJuz: 30 },
  { number: 84, nameArabic: 'الانشقاق', nameEnglish: 'Al-Inshiqaq', nameTranslation: 'The Splitting Open', totalVerses: 25, revelationType: 'Meccan', startJuz: 30 },
  { number: 85, nameArabic: 'البروج', nameEnglish: 'Al-Buruj', nameTranslation: 'The Constellations', totalVerses: 22, revelationType: 'Meccan', startJuz: 30 },
  { number: 86, nameArabic: 'الطارق', nameEnglish: 'At-Tariq', nameTranslation: 'The Nightcomer', totalVerses: 17, revelationType: 'Meccan', startJuz: 30 },
  { number: 87, nameArabic: 'الأعلى', nameEnglish: 'Al-A\'la', nameTranslation: 'The Most High', totalVerses: 19, revelationType: 'Meccan', startJuz: 30 },
  { number: 88, nameArabic: 'الغاشية', nameEnglish: 'Al-Ghashiyah', nameTranslation: 'The Overwhelming', totalVerses: 26, revelationType: 'Meccan', startJuz: 30 },
  { number: 89, nameArabic: 'الفجر', nameEnglish: 'Al-Fajr', nameTranslation: 'The Dawn', totalVerses: 30, revelationType: 'Meccan', startJuz: 30 },
  { number: 90, nameArabic: 'البلد', nameEnglish: 'Al-Balad', nameTranslation: 'The City', totalVerses: 20, revelationType: 'Meccan', startJuz: 30 },
  { number: 91, nameArabic: 'الشمس', nameEnglish: 'Ash-Shams', nameTranslation: 'The Sun', totalVerses: 15, revelationType: 'Meccan', startJuz: 30 },
  { number: 92, nameArabic: 'الليل', nameEnglish: 'Al-Layl', nameTranslation: 'The Night', totalVerses: 21, revelationType: 'Meccan', startJuz: 30 },
  { number: 93, nameArabic: 'الضحى', nameEnglish: 'Ad-Duhaa', nameTranslation: 'The Morning Brightness', totalVerses: 11, revelationType: 'Meccan', startJuz: 30 },
  { number: 94, nameArabic: 'الشرح', nameEnglish: 'Ash-Sharh', nameTranslation: 'The Relief', totalVerses: 8, revelationType: 'Meccan', startJuz: 30 },
  { number: 95, nameArabic: 'التين', nameEnglish: 'At-Tin', nameTranslation: 'The Fig', totalVerses: 8, revelationType: 'Meccan', startJuz: 30 },
  { number: 96, nameArabic: 'العلق', nameEnglish: 'Al-\'Alaq', nameTranslation: 'The Clot', totalVerses: 19, revelationType: 'Meccan', startJuz: 30 },
  { number: 97, nameArabic: 'القدر', nameEnglish: 'Al-Qadr', nameTranslation: 'The Decree', totalVerses: 5, revelationType: 'Meccan', startJuz: 30 },
  { number: 98, nameArabic: 'البينة', nameEnglish: 'Al-Bayyinah', nameTranslation: 'The Clear Proof', totalVerses: 8, revelationType: 'Medinan', startJuz: 30 },
  { number: 99, nameArabic: 'الزلزلة', nameEnglish: 'Az-Zalzalah', nameTranslation: 'The Earthquake', totalVerses: 8, revelationType: 'Medinan', startJuz: 30 },
  { number: 100, nameArabic: 'العاديات', nameEnglish: 'Al-\'Adiyat', nameTranslation: 'The Courser', totalVerses: 11, revelationType: 'Meccan', startJuz: 30 },
  { number: 101, nameArabic: 'القارعة', nameEnglish: 'Al-Qari\'ah', nameTranslation: 'The Calamity', totalVerses: 11, revelationType: 'Meccan', startJuz: 30 },
  { number: 102, nameArabic: 'التكاثر', nameEnglish: 'At-Takathur', nameTranslation: 'The Rivalry in World Increase', totalVerses: 8, revelationType: 'Meccan', startJuz: 30 },
  { number: 103, nameArabic: 'العصر', nameEnglish: 'Al-\'Asr', nameTranslation: 'The Declining Day', totalVerses: 3, revelationType: 'Meccan', startJuz: 30 },
  { number: 104, nameArabic: 'الهمزة', nameEnglish: 'Al-Humazah', nameTranslation: 'The Traducer', totalVerses: 9, revelationType: 'Meccan', startJuz: 30 },
  { number: 105, nameArabic: 'الفيل', nameEnglish: 'Al-Fil', nameTranslation: 'The Elephant', totalVerses: 5, revelationType: 'Meccan', startJuz: 30 },
  { number: 106, nameArabic: 'قريش', nameEnglish: 'Quraysh', nameTranslation: 'Quraysh', totalVerses: 4, revelationType: 'Meccan', startJuz: 30 },
  { number: 107, nameArabic: 'الماعون', nameEnglish: 'Al-Ma\'un', nameTranslation: 'The Small Kindness', totalVerses: 7, revelationType: 'Meccan', startJuz: 30 },
  { number: 108, nameArabic: 'الكوثر', nameEnglish: 'Al-Kawthar', nameTranslation: 'The Abundance', totalVerses: 3, revelationType: 'Meccan', startJuz: 30 },
  { number: 109, nameArabic: 'الكافرون', nameEnglish: 'Al-Kafirun', nameTranslation: 'The Disbelievers', totalVerses: 6, revelationType: 'Meccan', startJuz: 30 },
  { number: 110, nameArabic: 'النصر', nameEnglish: 'An-Nasr', nameTranslation: 'The Divine Support', totalVerses: 3, revelationType: 'Medinan', startJuz: 30 },
  { number: 111, nameArabic: 'المسد', nameEnglish: 'Al-Masad', nameTranslation: 'The Palm Fiber', totalVerses: 5, revelationType: 'Meccan', startJuz: 30 },
  { number: 112, nameArabic: 'الإخلاص', nameEnglish: 'Al-Ikhlas', nameTranslation: 'The Sincerity', totalVerses: 4, revelationType: 'Meccan', startJuz: 30 },
  { number: 113, nameArabic: 'الفلق', nameEnglish: 'Al-Falaq', nameTranslation: 'The Daybreak', totalVerses: 5, revelationType: 'Meccan', startJuz: 30 },
  { number: 114, nameArabic: 'الناس', nameEnglish: 'An-Nas', nameTranslation: 'Mankind', totalVerses: 6, revelationType: 'Meccan', startJuz: 30 }
];

export const TOTAL_QURAN_VERSES = 6236;
export const TOTAL_QURAN_JUZ = 30;

// Approximate verses per Juz (~208 verses each)
export const JUZ_DATA: JuzMeta[] = [
  { juzNumber: 1, nameArabic: 'الم', startSurah: 1, startAyah: 1, endSurah: 2, endAyah: 141, totalVerses: 148 },
  { juzNumber: 2, nameArabic: 'سيقول', startSurah: 2, startAyah: 142, endSurah: 2, endAyah: 252, totalVerses: 111 },
  { juzNumber: 3, nameArabic: 'تلك الرسل', startSurah: 2, startAyah: 253, endSurah: 3, endAyah: 92, totalVerses: 126 },
  { juzNumber: 4, nameArabic: 'لن تنالوا', startSurah: 3, startAyah: 93, endSurah: 4, endAyah: 23, totalVerses: 131 },
  { juzNumber: 5, nameArabic: 'والمحصنات', startSurah: 4, startAyah: 24, endSurah: 4, endAyah: 147, totalVerses: 124 },
  { juzNumber: 6, nameArabic: 'لا يحب الله', startSurah: 4, startAyah: 148, endSurah: 5, endAyah: 81, totalVerses: 110 },
  { juzNumber: 7, nameArabic: 'وإذا سمعوا', startSurah: 5, startAyah: 82, endSurah: 6, endAyah: 110, totalVerses: 149 },
  { juzNumber: 8, nameArabic: 'ولو أننا', startSurah: 6, startAyah: 111, endSurah: 7, endAyah: 87, totalVerses: 142 },
  { juzNumber: 9, nameArabic: 'قال الملأ', startSurah: 7, startAyah: 88, endSurah: 8, endAyah: 40, totalVerses: 159 },
  { juzNumber: 10, nameArabic: 'واعلموا', startSurah: 8, startAyah: 41, endSurah: 9, endAyah: 92, totalVerses: 127 },
  { juzNumber: 11, nameArabic: 'يعتذرون', startSurah: 9, startAyah: 93, endSurah: 11, endAyah: 5, totalVerses: 151 },
  { juzNumber: 12, nameArabic: 'وما من دابة', startSurah: 11, startAyah: 6, endSurah: 12, endAyah: 52, totalVerses: 170 },
  { juzNumber: 13, nameArabic: 'وما أبرئ', startSurah: 12, startAyah: 53, endSurah: 14, endAyah: 52, totalVerses: 155 },
  { juzNumber: 14, nameArabic: 'ربما', startSurah: 15, startAyah: 1, endSurah: 16, endAyah: 128, totalVerses: 227 },
  { juzNumber: 15, nameArabic: 'سبحان الذي', startSurah: 17, startAyah: 1, endSurah: 18, endAyah: 74, totalVerses: 185 },
  { juzNumber: 16, nameArabic: 'قال ألم', startSurah: 18, startAyah: 75, endSurah: 20, endAyah: 135, totalVerses: 198 },
  { juzNumber: 17, nameArabic: 'اقترب للناس', startSurah: 21, startAyah: 1, endSurah: 22, endAyah: 78, totalVerses: 190 },
  { juzNumber: 18, nameArabic: 'قد أفلح', startSurah: 23, startAyah: 1, endSurah: 25, endAyah: 20, totalVerses: 202 },
  { juzNumber: 19, nameArabic: 'وقال الذين', startSurah: 25, startAyah: 21, endSurah: 27, endAyah: 55, totalVerses: 339 },
  { juzNumber: 20, nameArabic: 'أمن خلق', startSurah: 27, startAyah: 56, endSurah: 29, endAyah: 45, totalVerses: 171 },
  { juzNumber: 21, nameArabic: 'اتل ما أوحي', startSurah: 29, startAyah: 46, endSurah: 33, endAyah: 30, totalVerses: 178 },
  { juzNumber: 22, nameArabic: 'ومن يقنت', startSurah: 33, startAyah: 31, endSurah: 36, endAyah: 27, totalVerses: 169 },
  { juzNumber: 23, nameArabic: 'وما لي', startSurah: 36, startAyah: 28, endSurah: 39, endAyah: 31, totalVerses: 357 },
  { juzNumber: 24, nameArabic: 'فمن أظلم', startSurah: 39, startAyah: 32, endSurah: 41, endAyah: 46, totalVerses: 175 },
  { juzNumber: 25, nameArabic: 'إليه يرد', startSurah: 41, startAyah: 47, endSurah: 45, endAyah: 37, totalVerses: 246 },
  { juzNumber: 26, nameArabic: 'حم', startSurah: 46, startAyah: 1, endSurah: 51, endAyah: 30, totalVerses: 195 },
  { juzNumber: 27, nameArabic: 'قال فما خطبكم', startSurah: 51, startAyah: 31, endSurah: 57, endAyah: 29, totalVerses: 399 },
  { juzNumber: 28, nameArabic: 'قد سمع الله', startSurah: 58, startAyah: 1, endSurah: 66, endAyah: 12, totalVerses: 137 },
  { juzNumber: 29, nameArabic: 'تبارك الذي', startSurah: 67, startAyah: 1, endSurah: 77, endAyah: 50, totalVerses: 431 },
  { juzNumber: 30, nameArabic: 'عم يتساءلون', startSurah: 78, startAyah: 1, endSurah: 114, endAyah: 6, totalVerses: 564 },
];

// Offline built-in verses for instant, zero-network reading
export const OFFLINE_SURAHS: Record<number, AyahItem[]> = {
  1: [
    { numberInSurah: 1, numberInQuran: 1, arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translationEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', translationUrdu: 'شروع کرتا ہوں اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے', juz: 1 },
    { numberInSurah: 2, numberInQuran: 2, arabicText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translationEnglish: '[All] praise is [due] to Allah, Lord of the worlds -', translationUrdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے', juz: 1 },
    { numberInSurah: 3, numberInQuran: 3, arabicText: 'الرَّحْمَٰنِ الرَّحِيمِ', translationEnglish: 'The Entirely Merciful, the Especially Merciful,', translationUrdu: 'بڑا مہربان نہایت رحم فرمانے والا ہے', juz: 1 },
    { numberInSurah: 4, numberInQuran: 4, arabicText: 'مَالِكِ يَوْمِ الدِّينِ', translationEnglish: 'Sovereign of the Day of Recompense.', translationUrdu: 'روزِ جزا کا مالک ہے', juz: 1 },
    { numberInSurah: 5, numberInQuran: 5, arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translationEnglish: 'It is You we worship and You we ask for help.', translationUrdu: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں', juz: 1 },
    { numberInSurah: 6, numberInQuran: 6, arabicText: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translationEnglish: 'Guide us to the straight path -', translationUrdu: 'ہمیں سیدھے راستے کی ہدایت فرما', juz: 1 },
    { numberInSurah: 7, numberInQuran: 7, arabicText: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translationEnglish: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', translationUrdu: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا', juz: 1 },
  ],
  112: [
    { numberInSurah: 1, numberInQuran: 6222, arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ', translationEnglish: 'Say, "He is Allah, [who is] One,', translationUrdu: 'آپ کہہ دیجئے کہ وہ اللہ ایک ہے', juz: 30 },
    { numberInSurah: 2, numberInQuran: 6223, arabicText: 'اللَّهُ الصَّمَدُ', translationEnglish: 'Allah, the Eternal Refuge.', translationUrdu: 'اللہ بے نیاز ہے', juz: 30 },
    { numberInSurah: 3, numberInQuran: 6224, arabicText: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', translationEnglish: 'He neither begets nor is born,', translationUrdu: 'نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے', juz: 30 },
    { numberInSurah: 4, numberInQuran: 6225, arabicText: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', translationEnglish: 'Nor is there to Him any equivalent."', translationUrdu: 'اور نہ کوئی اس کا ہمسر ہے', juz: 30 },
  ],
  113: [
    { numberInSurah: 1, numberInQuran: 6226, arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', translationEnglish: 'Say, "I seek refuge in the Lord of daybreak', translationUrdu: 'آپ کہئے کہ میں صبح کے رب کی پناہ مانگتا ہوں', juz: 30 },
    { numberInSurah: 2, numberInQuran: 6227, arabicText: 'مِن شَرِّ مَا خَلَقَ', translationEnglish: 'From the evil of that which He created', translationUrdu: 'ہر اس چیز کے شر سے جو اس نے پیدا کی', juz: 30 },
    { numberInSurah: 3, numberInQuran: 6228, arabicText: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', translationEnglish: 'And from the evil of darkness when it settles', translationUrdu: 'اور اندھیری رات کے شر سے جب وہ چھا جائے', juz: 30 },
    { numberInSurah: 4, numberInQuran: 6229, arabicText: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', translationEnglish: 'And from the evil of the blowers in knots', translationUrdu: 'اور گرہوں میں پھونکنے والیوں کے شر سے', juz: 30 },
    { numberInSurah: 5, numberInQuran: 6230, arabicText: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', translationEnglish: 'And from the evil of an envier when he envies."', translationUrdu: 'اور حسد کرنے والے کے شر سے جب وہ حسد کرے', juz: 30 },
  ],
  114: [
    { numberInSurah: 1, numberInQuran: 6231, arabicText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', translationEnglish: 'Say, "I seek refuge in the Lord of mankind,', translationUrdu: 'آپ کہئے کہ میں انسانوں کے رب کی پناہ مانگتا ہوں', juz: 30 },
    { numberInSurah: 2, numberInQuran: 6232, arabicText: 'مَلِكِ النَّاسِ', translationEnglish: 'The Sovereign of mankind,', translationUrdu: 'جو انسانوں کا حقیقی بادشاہ ہے', juz: 30 },
    { numberInSurah: 3, numberInQuran: 6233, arabicText: 'إِلَٰهِ النَّاسِ', translationEnglish: 'The God of mankind,', translationUrdu: 'جو انسانوں کا حقیقی معبود ہے', juz: 30 },
    { numberInSurah: 4, numberInQuran: 6234, arabicText: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', translationEnglish: 'From the evil of the retreating whisperer -', translationUrdu: 'بار بار وسوسہ ڈال کر چھپ جانے والے شیطان کے شر سے', juz: 30 },
    { numberInSurah: 5, numberInQuran: 6235, arabicText: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', translationEnglish: 'Who whispers [evil] into the breasts of mankind -', translationUrdu: 'جو لوگوں کے دلوں میں وسوسے ڈالتا ہے', juz: 30 },
    { numberInSurah: 6, numberInQuran: 6236, arabicText: 'مِنَ الْجِنَّةِ وَالنَّاسِ', translationEnglish: 'From among the jinn and mankind."', translationUrdu: 'چاہے وہ جنات میں سے ہو یا انسانوں میں سے', juz: 30 },
  ],
  67: [
    { numberInSurah: 1, numberInQuran: 5242, arabicText: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', translationEnglish: 'Blessed is He in whose hand is dominion, and He is over all things competent -', translationUrdu: 'بڑی برکت والا ہے وہ ذات جس کے ہاتھ میں بادشاہی ہے اور وہ ہر چیز پر قادر ہے', juz: 29 },
    { numberInSurah: 2, numberInQuran: 5243, arabicText: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ', translationEnglish: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -', translationUrdu: 'جس نے موت اور زندگی کو پیدا کیا تاکہ تمہیں آزمائے کہ تم میں عمل کے لحاظ سے کون بہتر ہے', juz: 29 },
    { numberInSurah: 3, numberInQuran: 5244, arabicText: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ', translationEnglish: '[And] who created seven heavens in layers. You see no flaw in the creation of the Most Merciful.', translationUrdu: 'جس نے سات آسمان اوپر تلے بنائے، تو رحمان کی آفرینش میں کوئی خلل نہ دیکھے گا', juz: 29 },
  ]
};

// Calculate cumulative completed verses up to a given Surah and Ayah
export function calculateCompletedVerses(surahNum: number, ayahNum: number): number {
  let count = 0;
  for (let s = 1; s < surahNum; s++) {
    const meta = SURAHS_METADATA.find(item => item.number === s);
    if (meta) {
      count += meta.totalVerses;
    }
  }
  count += Math.min(ayahNum, SURAHS_METADATA.find(s => s.number === surahNum)?.totalVerses || ayahNum);
  return Math.min(count, TOTAL_QURAN_VERSES);
}

// Format Khatam message: "You listened to 2.5 Juz - 8.3% completed"
export function formatKhatamStats(surahNum: number, ayahNum: number) {
  const completedVerses = calculateCompletedVerses(surahNum, ayahNum);
  const percentage = Math.min(100, (completedVerses / TOTAL_QURAN_VERSES) * 100);
  const completedJuz = Math.min(30, (completedVerses / (TOTAL_QURAN_VERSES / 30)));

  return {
    completedVerses,
    totalVerses: TOTAL_QURAN_VERSES,
    completedJuz: parseFloat(completedJuz.toFixed(1)),
    percentage: parseFloat(percentage.toFixed(1)),
    summary: `You listened to ${completedJuz.toFixed(1)} Juz - ${percentage.toFixed(1)}% completed`
  };
}
