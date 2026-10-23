import { QURAN_114_SURAHS } from './quranIndex';

export type ScholarId = 'maududi' | 'ishaq' | 'israr';

export interface ScholarMeta {
  id: ScholarId;
  nameUrdu: string;
  nameEnglish: string;
  titleUrdu: string;
  titleEnglish: string;
  era: string;
  description: string;
  badge: string;
}

export interface UlamaLectureItem {
  id: string;
  scholarId: ScholarId;
  scholarName: string;
  scholarNameUrdu: string;
  titleUrdu: string;
  titleEnglish: string;
  category: string;
  durationFormatted: string;
  audioUrl: string;
  description: string;
  surahNumber?: number;
  keyTopics: string[];
  isFeatured?: boolean;
}

export const SCHOLARS_LIST: ScholarMeta[] = [
  {
    id: 'maududi',
    nameUrdu: 'مولانا سید ابوالاعلیٰ مودودی رحمہ اللہ',
    nameEnglish: 'Maulana Syed Abul A’la Maududi (RA)',
    titleUrdu: 'تفہیم القرآن (آڈیو تفسیر و بیانات)',
    titleEnglish: 'Tafheem-ul-Quran Complete Audio Tafseer',
    era: '1903 – 1979',
    description: 'The monumental 30-year masterpiece Tafheem-ul-Quran rendered into comprehensive audio commentary explaining the worldview, laws, and socio-political message of the Quran.',
    badge: '114 Surahs Tafheem'
  },
  {
    id: 'ishaq',
    nameUrdu: 'مولانا اسحاق مدنی رحمہ اللہ (فیصل آباد)',
    nameEnglish: 'Maulana Ishaq Madani (Faisalabad)',
    titleUrdu: 'خطباتِ اتحادِ امت و مسائلِ فقہ',
    titleEnglish: 'Unity of Ummah, Fiqh & Hadith Discourses',
    era: '1933 – 2013',
    description: 'Renowned champion of Islamic unity, Hadith scholarship, and practical Fiqh questions known for authentic proofs, compassion, and bold sincerity.',
    badge: 'Fiqh & Hadith'
  },
  {
    id: 'israr',
    nameUrdu: 'ڈاکٹر اسرار احمد رحمہ اللہ',
    nameEnglish: 'Dr. Israr Ahmed (RA)',
    titleUrdu: 'بیان القرآن، منتخب نصاب و فکری خطابات',
    titleEnglish: 'Bayan-ul-Quran & Revival Discourses',
    era: '1932 – 2010',
    description: 'Master philosopher and Quranic revivalist whose lectures shook the modern Muslim conscience toward Quranic renaissance.',
    badge: 'Bayan-ul-Quran'
  }
];

// Mapping dictionary for Maulana Maududi Tafheem-ul-Quran Audio
const MAUDUDI_FILE_MAP: Record<number, string> = {
  0: "000 - Introduction - (دیباچہ - Deebacha - مقدمہ - Muqadma).mp3",
  1: "001 - Al-Fatihah ( The Opening ) - سورة الفاتحة.mp3",
  2: "002 - Al-Baqarah ( The Cow ) - سورة البقرة.mp3",
  3: "003 - Al-Imran ( The Family of Imran ) - سورة آل عمران.mp3",
  4: "004 - An-Nisa ( The Women ) - سورة النساء.mp3",
  5: "005 - Al-Maidah ( The Table spread with Food ) - سورة المائدة.mp3",
  6: "006 - Al-An'am ( The Cattle ) - سورة الأنعام.mp3",
  7: "007 - Al-A'raf (The Heights ) - سورة الأعراف.mp3",
  8: "008 - Al-Anfal ( The Spoils of War ) - سورة الأنفال.mp3",
  9: "009 - At-Taubah ( The Repentance ) - سورة التوبة.mp3",
  10: "010 - Yunus ( Jonah ) - سورة يونس.mp3",
  11: "011 - Hud - سورة هود.mp3",
  12: "012 - Yusuf (Joseph ) - سورة يوسف.mp3",
  13: "013 - Ar-Ra'd ( The Thunder ) - سورة الرعد.mp3",
  14: "014 - Ibrahim ( Abraham ) - سورة إبراهيم.mp3",
  15: "015 - Al-Hijr ( The Rocky Tract ) - سورة الحجر.mp3",
  16: "016 - An-Nahl ( The Bees ) - سورة النحل.mp3",
  17: "017 - Al-Isra ( The Night Journey ) - سورة الإسراء.mp3",
  18: "018 - Al-Kahf ( The Cave ) - سورة الكهف.mp3",
  19: "019 - Maryam ( Mary ) - سورة مريم.mp3",
  20: "020 - Taha - سورة طه.mp3",
  21: "021 - Al-Anbiya ( The Prophets ) - سورة الأنبياء.mp3",
  22: "022 - Al-Hajj ( The Pilgrimage ) - سورة الحج.mp3",
  23: "023 - Al-Mu'minoon ( The Believers ) - سورة المؤمنون.mp3",
  24: "024 - An-Noor ( The Light ) - سورة النور.mp3",
  25: "025 - Al-Furqan (The Criterion ) - سورة الفرقان.mp3",
  26: "026 - Ash-Shuara ( The Poets ) - سورة الشعراء.mp3",
  27: "027 - An-Naml (The Ants ) - سورة النمل.mp3",
  28: "028 - Al-Qasas ( The Stories ) - سورة القصص.mp3",
  29: "029 - Al-Ankaboot ( The Spider ) - سورة العنكبوت.mp3",
  30: "030 - Ar-Room ( The Romans ) - سورة الروم.mp3",
  31: "031 - Luqman - سورة لقمان.mp3",
  32: "032 - As-Sajdah ( The Prostration ) - سورة السجدة.mp3",
  33: "033 - Al-Ahzab ( The Combined Forces ) - سورة الأحزاب.mp3",
  34: "034 - Saba ( Sheba ) - سورة سبأ.mp3",
  35: "035 - Fatir ( The Orignator ) - سورة فاطر.mp3",
  36: "036 - Ya-seen - سورة يس.mp3",
  37: "037 - As-Saaffat ( Those Ranges in Ranks ) - سورة الصافات.mp3",
  38: "038 - Sad ( The Letter Sad ) - سورة ص.mp3",
  39: "039 - Az-Zumar ( The Groups ) - سورة الزمر.mp3",
  40: "040 - Ghafir ( The Forgiver God ) - سورة غافر.mp3",
  41: "041 - Fussilat ( Explained in Detail ) - سورة فصلت.mp3",
  42: "042 - Ash-Shura (Consultation ) - سورة الشورى.mp3",
  43: "043 - Az-Zukhruf ( The Gold Adornment ) - سورة الزخرف.mp3",
  44: "044 - Ad-Dukhan ( The Smoke ) - سورة الدخان.mp3",
  45: "045 - Al-Jathiya ( Crouching ) - سورة الجاثية.mp3",
  46: "046 - Al-Ahqaf ( The Curved Sand-hills ) - سورة الأحقاف.mp3",
  47: "047 - Muhammad - سورة محمد.mp3",
  48: "048 - Al-Fath ( The Victory ) - سورة الفتح.mp3",
  49: "049 - Al-Hujurat ( The Dwellings ) - سورة الحجرات.mp3",
  50: "050 - Qaf ( The Letter Qaf ) - سورة ق.mp3",
  51: "051 - Adh-Dhariyat ( The Wind that Scatter ) - سورة الذاريات.mp3",
  52: "052 - At-Tur ( The Mount ) - سورة الطور.mp3",
  53: "053 - An-Najm ( The Star ) - سورة النجم.mp3",
  54: "054 - Al-Qamar ( The Moon ) - سورة القمر.mp3",
  55: "055 - Ar-Rahman ( The Most Graciouse ) - سورة الرحمن.mp3",
  56: "056 - Al-Waqi'ah ( The Event ) - سورة الواقعة.mp3",
  57: "057 - Al-Hadid ( The Iron ) - سورة الحديد.mp3",
  58: "058 - Al-Mujadilah ( She That Disputeth ) - سورة المجادلة.mp3",
  59: "059 - Al-Hashr ( The Gathering ) - سورة الحشر.mp3",
  60: "060 - Al-Mumtahanah ( The Woman to be examined ) - سورة الممتحنة.mp3",
  61: "061 - As-Saff ( The Row ) - سورة الصف.mp3",
  62: "062 - Al-Jumu'ah ( Friday ) - سورة الجمعة.mp3",
  63: "063 - Al-Munafiqoon ( The Hypocrites ) - سورة المنافقون.mp3",
  64: "064 - At-Taghabun ( Mutual Loss & Gain ) - سورة التغابن.mp3",
  65: "065 - At-Talaq ( The Divorce ) - سورة الطلاق.mp3",
  66: "066 - At-Tahrim ( The Prohibition ) - سورة التحريم.mp3",
  67: "067 - Al-Mulk ( Dominion ) - سورة الملك.mp3",
  68: "068 - Al-Qalam ( The Pen ) - سورة القلم.mp3",
  69: "069 - Al-Haaqqah ( The Inevitable ) - سورة الحاقة.mp3",
  70: "070 - Al-Ma'arij (The Ways of Ascent ) - سورة المعارج.mp3",
  71: "071 - Nooh - سورة نوح.mp3",
  72: "072 - Al-Jinn ( The Jinn ) - سورة الجن.mp3",
  73: "073 - Al-Muzzammil (The One wrapped in Garments) - سورة المزمل.mp3",
  74: "074 - Al-Muddaththir ( The One Enveloped ) - سورة المدثر.mp3",
  75: "075 - Al-Qiyamah ( The Resurrection ) - سورة القيامة.mp3",
  76: "076 - Al-Insan ( Man ) - سورة الإنسان.mp3",
  77: "077 - Al-Mursalat ( Those sent forth ) - سورة المرسلات.mp3",
  78: "078 - An-Naba' ( The Great News ) - سورة النبأ.mp3",
  79: "079 - An-Nazi'at ( Those who Pull Out ) - سورة النازعات.mp3",
  80: "080 - Abasa ( He frowned ) - سورة عبس.mp3",
  81: "081 - At-Takwir ( The Overthrowing ) - سورة التكوير.mp3",
  82: "082 - Al-Infitar ( The Cleaving ) - سورة الانفطار.mp3",
  83: "083 - Al-Mutaffifin (Those Who Deal in Fraud) - سورة المطففين.mp3",
  84: "084 - Al-Inshiqaq (The Splitting Asunder) - سورة الانشقاق.mp3",
  85: "085 - Al-Burooj ( The Big Stars ) - سورة البروج.mp3",
  86: "086 - At-Tariq ( The Night-Comer ) - سورة الطارق.mp3",
  87: "087 - Al-A'la ( The Most High ) - سورة الأعلى.mp3",
  88: "088 - Al-Ghashiya ( The Overwhelming ) - سورة الغاشية.mp3",
  89: "089 - Al-Fajr ( The Dawn ) - سورة الفجر.mp3",
  90: "090 - Al-Balad ( The City ) - سورة البلد.mp3",
  91: "091 - Ash-Shams ( The Sun ) - سورة الشمس.mp3",
  92: "092 - Al-Layl ( The Night ) - سورة الليل.mp3",
  93: "093 - Ad-Dhuha ( The Forenoon ) - سورة الضحى.mp3",
  94: "094 - As-Sharh ( The Opening Forth) - سورة الشرح.mp3",
  95: "095 - At-Tin ( The Fig ) - سورة التين.mp3",
  96: "096 - Al-'alaq ( The Clot ) - سورة العلق.mp3",
  97: "097 - Al-Qadr ( The Night of Decree ) - سورة القدر.mp3",
  98: "098 - Al-Bayyinah ( The Clear Evidence ) - سورة البينة.mp3",
  99: "099 - Az-Zalzalah ( The Earthquake ) - سورة الزلزلة.mp3",
  100: "100 - Al-'adiyat ( Those That Run ) - سورة العاديات.mp3",
  101: "101 - Al-Qari'ah ( The Striking Hour ) - سورة القارعة.mp3",
  102: "102 - At-Takathur ( The piling Up ) - سورة التكاثر.mp3",
  103: "103 - Al-Asr ( The Time ) - سورة العصر.mp3",
  104: "104 - Al-Humazah ( The Slanderer ) - سورة الهمزة.mp3",
  105: "105 - Al-Fil ( The Elephant ) - سورة الفيل.mp3",
  106: "106 - Quraish - سورة قريش.mp3",
  107: "107 - Al-Ma'un ( Small Kindnesses ) - سورة الماعون.mp3",
  108: "108 - Al-Kauthor ( A River in Paradise) - سورة الكوثر.mp3",
  109: "109 - Al-Kafiroon ( The Disbelievers ) - سورة الكافرون.mp3",
  110: "110 - An-Nasr ( The Help ) - سورة النصر.mp3",
  111: "111 - Al-Masad ( The Palm Fibre ) - سورة المسد.mp3",
  112: "112 - Al-Ikhlas ( Sincerity ) - سورة الإخلاص.mp3",
  113: "113 - Al-Falaq ( The Daybreak ) - سورة الفلق.mp3",
  114: "114 - An-Nas ( Mankind ) - سورة الناس.mp3"
};

export function getMaududiAudioUrl(surahNumber: number): string {
  const file = MAUDUDI_FILE_MAP[surahNumber] || MAUDUDI_FILE_MAP[1];
  return `https://archive.org/download/Tafheem-ul-QuranBySyedAbulAlaMoududi-48kBitss/${encodeURIComponent(file)}`;
}

// 1. MAULANA MAUDUDI TAFHEEM-UL-QURAN LECTURES
export const MAUDUDI_LECTURES: UlamaLectureItem[] = [
  {
    id: 'mm-deebacha',
    scholarId: 'maududi',
    scholarName: 'Maulana Syed Abul A’la Maududi',
    scholarNameUrdu: 'مولانا سید ابوالاعلیٰ مودودی',
    titleUrdu: 'دیباچہ تفہیم القرآن — قرآن فہمی کا بنیادی مقدمہ',
    titleEnglish: 'Introduction to Tafheem-ul-Quran (Deebacha)',
    category: 'Quranic Sciences',
    durationFormatted: '45:30',
    audioUrl: getMaududiAudioUrl(0),
    description: 'Foundational introduction discussing the nature of the Quran, its divine style, context of revelation, and how to apply it in personal and social life.',
    surahNumber: 0,
    keyTopics: ['Deebacha', 'Quranic Methodology', 'Divine Guidance', 'Tafheem'],
    isFeatured: true
  },
  ...QURAN_114_SURAHS.map((surah) => {
    const isFeatured = [1, 2, 18, 36, 55, 67, 103, 112].includes(surah.number);
    return {
      id: `mm-surah-${surah.number}`,
      scholarId: 'maududi' as ScholarId,
      scholarName: 'Maulana Syed Abul A’la Maududi',
      scholarNameUrdu: 'مولانا سید ابوالاعلیٰ مودودی',
      titleUrdu: `تفہیم القرآن: سورة ${surah.name}`,
      titleEnglish: `Tafheem-ul-Quran: Surah ${surah.englishName}`,
      category: 'Tafheem-ul-Quran',
      durationFormatted: surah.numberOfAyahs > 100 ? '1h 10m' : surah.numberOfAyahs > 30 ? '38:20' : '15:10',
      audioUrl: getMaududiAudioUrl(surah.number),
      description: `Complete Tafseer commentary and translation of Surah ${surah.englishName} (${surah.name}) by Maulana Maududi exploring historical background and contemporary relevance.`,
      surahNumber: surah.number,
      keyTopics: [surah.revelationType, `${surah.numberOfAyahs} Ayahs`, 'Tafheem-ul-Quran'],
      isFeatured
    };
  })
];

// 2. MAULANA ISHAQ MADANI (FAISALABAD) LANDMARK DISCOURSES
export const MAULANA_ISHAQ_LECTURES: UlamaLectureItem[] = [
  {
    id: 'mi-namaz-jama',
    scholarId: 'ishaq',
    scholarName: 'Maulana Ishaq Madani',
    scholarNameUrdu: 'مولانا اسحاق مدنی',
    titleUrdu: 'نمازیں جمع کرنا — جمع بین الصلاتین کا شرعی و احادیث سے ثبوت',
    titleEnglish: 'Combining Prayers (Jama Bayn us-Salatain) in Authentic Hadith',
    category: 'Namaz & Fiqh',
    durationFormatted: '54:20',
    audioUrl: 'https://archive.org/download/FMaulanaIshaqIblisKiMajlisQawaliKiHaisiyatTUE140820071/d%20Jama%20Bayn%20us%20Salaatain%20-%20Namaz%20Jama%20Kerna%20-%20Combining%20Prayer%20-%20maulana%20ish.mp3',
    description: 'Detailed analysis of Sahih Bukhari and Sahih Muslim hadiths regarding combining Zuhr-Asr and Maghrib-Isha in times of difficulty or travel.',
    keyTopics: ['Namaz', 'Prayer Rules', 'Bukhari & Muslim', 'Fiqh-ul-Hadith'],
    isFeatured: true
  },
  {
    id: 'mi-kalma-janati',
    scholarId: 'ishaq',
    scholarName: 'Maulana Ishaq Madani',
    scholarNameUrdu: 'مولانا اسحاق مدنی',
    titleUrdu: 'کلمہ کہنے والا جنتی — شفاعت کی اقسام اور گناہگار مسلمانوں کا انجام',
    titleEnglish: 'Whoever Says the Kalimah is Jannati — Forms of Shafa’at',
    category: 'Aqaid & Iman',
    durationFormatted: '58:40',
    audioUrl: 'https://archive.org/download/FMaulanaIshaqIblisKiMajlisQawaliKiHaisiyatTUE140820071/c%20Kalma%20Kehnay%20Wala%20Janati%20-%20Shifaat%20Ki%20Iqsaam%20-%20GunahGaar%20Musalmaano%20Ka%20Anjaam%20-%20maulana%20ishaq%20urdu.mp3',
    description: 'Profound discourse on the mercy of Tawheed: how the Kalimah protects believers, the reality of intercession (Shafa’at), and hope for sinners.',
    keyTopics: ['Kalimah Tawheed', 'Shafa’at', 'Intercession', 'Divine Mercy'],
    isFeatured: true
  },
  {
    id: 'mi-kafeel-muhammad',
    scholarId: 'ishaq',
    scholarName: 'Maulana Ishaq Madani',
    scholarNameUrdu: 'مولانا اسحاق مدنی',
    titleUrdu: 'کفیلِ محمد ﷺ کون؟ رسول اللہ ﷺ کی کفالت اور سیرت کا درس',
    titleEnglish: 'Who Was the Guardian of Muhammad ﷺ? Lessons from Seerat',
    category: 'Seerat-un-Nabi',
    durationFormatted: '48:15',
    audioUrl: 'https://archive.org/download/FMaulanaIshaqIblisKiMajlisQawaliKiHaisiyatTUE140820071/a%20Maulana%20Ishaq%20-%20Maulana%20Ishaq-Kafeel%20e%20Muhammad%20%28SAWW%29%20kon%20Aik%20fit.mp3',
    description: 'Heart-warming discussion on the guardians of the Prophet ﷺ during childhood—Sayyiduna Abdul Muttalib and Abu Talib—and divine preservation.',
    keyTopics: ['Seerat-un-Nabi', 'Early Childhood', 'Abu Talib', 'Divine Protection'],
    isFeatured: true
  },
  {
    id: 'mi-quran-luqman',
    scholarId: 'ishaq',
    scholarName: 'Maulana Ishaq Madani',
    scholarNameUrdu: 'مولانا اسحاق مدنی',
    titleUrdu: 'قرآن حکیم اور حکمتِ لقمان — تربیتِ اولاد کے سنہری اصول',
    titleEnglish: 'The Quran & Wisdom of Luqman — Golden Rules of Parenting',
    category: 'Tazkiyah & Family',
    durationFormatted: '52:10',
    audioUrl: 'https://archive.org/download/FMaulanaIshaqIblisKiMajlisQawaliKiHaisiyatTUE140820071/j%20Maulana%20Ishaq%20-%20Maulana%20Ishaq-%20Quran%20or%20hakim%20Luqman-wed-03112004.mp3',
    description: 'Deep commentary on Surah Luqman explaining how to inculcate Tawheed, prayer, modesty, respect for parents, and resilience in youth.',
    keyTopics: ['Surah Luqman', 'Parenting', 'Shirk Prevention', 'Namaz Training'],
    isFeatured: true
  },
  {
    id: 'mi-sehri-iftar',
    scholarId: 'ishaq',
    scholarName: 'Maulana Ishaq Madani',
    scholarNameUrdu: 'مولانا اسحاق مدنی',
    titleUrdu: 'سحری اور افطار کی مسنون دعائیں اور روزے کی حقیقت',
    titleEnglish: 'Masnoon Duas of Suhoor & Iftar — True Essence of Fasting',
    category: 'Ramadan & Duas',
    durationFormatted: '42:30',
    audioUrl: 'https://archive.org/download/FMaulanaIshaqIblisKiMajlisQawaliKiHaisiyatTUE140820071/i%20Sehri%20-%20Sehri%20Aur%20Iftar%20Ki%20Dua%20By%20Maulana%20Ishaq.mp3',
    description: 'Authentic prophetic narrations regarding the fast, sincere intentions, timing of Iftar and Suhoor, and acceptance of supplications.',
    keyTopics: ['Suhoor & Iftar', 'Fasting', 'Sunnah Duas', 'Ramadan'],
    isFeatured: true
  },
  {
    id: 'mi-sawal-jawab',
    scholarId: 'ishaq',
    scholarName: 'Maulana Ishaq Madani',
    scholarNameUrdu: 'مولانا اسحاق مدنی',
    titleUrdu: 'مجلسِ سوال و جواب — فتاویٰ و روزمرہ شرعی مسائل',
    titleEnglish: 'Question & Answer Session — Daily Fiqh & Social Issues',
    category: 'Q&A / Fiqh',
    durationFormatted: '56:00',
    audioUrl: 'https://archive.org/download/FMaulanaIshaqIblisKiMajlisQawaliKiHaisiyatTUE140820071/g%20Maulana%20Ishaq%20-%20Maulana%20Ishaq-Sawal%20o%20Jawab%20part%202.mp3',
    description: 'Direct, honest, evidence-based responses to complex questions on family disputes, business transactions, prayer doubts, and sectarian harmony.',
    keyTopics: ['Fiqh Answers', 'Daily Questions', 'Evidence from Sunnah', 'Ittehad-e-Ummat']
  },
  {
    id: 'mi-sahaba-darjay',
    scholarId: 'ishaq',
    scholarName: 'Maulana Ishaq Madani',
    scholarNameUrdu: 'مولانا اسحاق مدنی',
    titleUrdu: 'صحابہ کرام کے تین درجات اور ان کے فضائل کا تقابل',
    titleEnglish: 'Three Categories of the Sahaba (RA) & Their Virtues',
    category: 'Tareekh & Sahaba',
    durationFormatted: '59:15',
    audioUrl: 'https://archive.org/download/FMaulanaIshaqIblisKiMajlisQawaliKiHaisiyatTUE140820071/x%203.%20Khilafat%20aur%20Karbala%20-%20Sahaba%20kay%20Teen%20Darjay%20-%20Khilafat%20kay%20Chahnay%20Walay%20Sahaba%20-%20maulana%20ishaq.mp3',
    description: 'Quranic categories of the blessed Sahabah (Sabiqun-al-Awwalun, Ashab-e-Badr, and after Fath Makkah) and their unmatched sacrifices.',
    keyTopics: ['Sahaba-e-Karam', 'Quranic Classification', 'Sacrifices', 'Early Believers']
  }
];

export const ALL_ULAMA_LECTURES: UlamaLectureItem[] = [
  ...MAUDUDI_LECTURES,
  ...MAULANA_ISHAQ_LECTURES
];
