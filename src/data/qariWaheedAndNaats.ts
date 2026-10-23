import { QURAN_114_SURAHS, SurahMeta } from './quranIndex';

export interface NaatLyricLine {
  arabic: string;
  transliteration?: string;
  urdu: string;
  english: string;
}

export interface NaatItem {
  id: string;
  category: 'naat' | 'quran-recitation' | 'shukran-ya-rabbi';
  titleUrdu: string;
  titleEnglish: string;
  artist: string;
  artistUrdu: string;
  durationFormatted: string;
  audioUrl: string;
  description: string;
  lyricsExcerptUrdu?: string;
  lyricsExcerptEnglish?: string;
  fullLyrics?: NaatLyricLine[];
  youtubeId?: string;
  isFeatured?: boolean;
  surahNumber?: number;
  tags: string[];
}

// 1. QARI WAHEED ZAFAR QASMI NAATS COLLECTION
export const QARI_WAHEED_NAATS: NaatItem[] = [
  {
    id: 'qw-faslon',
    category: 'naat',
    titleUrdu: 'فاصلوں کو تکلف ہے ہم سے اگر',
    titleEnglish: 'Faslon Ko Takalluf Hai Hum Se Agar',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '08:45',
    audioUrl: 'https://archive.org/download/FaslonKoTakalluf/Faslon%20Ko%20Takalluf%20Hai.mp3',
    description: 'The world-renowned iconic master Naat expressing infinite longing for the blessed Rawdah of the Prophet ﷺ.',
    lyricsExcerptUrdu: 'فاصلوں کو تکلف ہے ہم سے اگر، ہم بھی بے بس نہیں ہیں خدا کی قسم\nجب بھی چاہا مدینے چلے جائیں گے، دل ہی دل میں بلاوا ہے آتا رہے',
    lyricsExcerptEnglish: 'If distances feel like a burden upon us, by Allah we are not helpless;\nWhenever our heart desires, in spirit and soul we enter Madinah tul Munawwarah.',
    isFeatured: true,
    tags: ['Most Famous', 'Madinah Munawwarah', 'Soul Stirring', 'Classic']
  },
  {
    id: 'qw-zahe',
    category: 'naat',
    titleUrdu: 'زہے مقدر حضورِ حق سے سلام آیا پیام آیا',
    titleEnglish: 'Zahe Muqaddar Huzoor-e-Haq Se Salam Aaya',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '07:32',
    audioUrl: 'https://archive.org/download/ZaheMuqaddar_201610/Zahe%20Muqaddar%20Huzoor%20e%20Haq%20Se.mp3',
    description: 'Timeless masterpiece written by Hazrat Kaifi Azmi / Allama Jami celebrating greetings from the court of the Prophet ﷺ.',
    lyricsExcerptUrdu: 'زہے مقدر حضورِ حق سے سلام آیا پیام آیا\nجھکا ہے سر شکر کے جذبے سے، زباں پہ درود و سلام آیا',
    lyricsExcerptEnglish: 'How blessed is my fortune, a divine greeting and message arrived from the court of the Prophet ﷺ.',
    isFeatured: true,
    tags: ['Darbar-e-Risalat', 'Durood-o-Salam', 'Masterpiece']
  },
  {
    id: 'qw-darbar',
    category: 'naat',
    titleUrdu: 'دربارِ مصطفیٰ میں سر کو جھکائے رکھنا',
    titleEnglish: 'Darbar-e-Mustafa Main',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '09:12',
    audioUrl: 'https://archive.org/download/Saba-e-Madina/Darbar%20e%20Mustafa%20Main.mp3',
    description: 'Profoundly moving rendition dedicated to maintaining the highest etiquette and reverence in the presence of Rasool Allah ﷺ.',
    lyricsExcerptUrdu: 'دربارِ مصطفیٰ میں سر کو جھکائے رکھنا\nلب پر درود جاری آنکھیں بچھائے رکھنا',
    lyricsExcerptEnglish: 'In the court of Mustafa ﷺ keep your head bowed in reverence; keep Durood flowing upon your tongue.',
    isFeatured: true,
    tags: ['Adab-e-Rasool', 'Saba-e-Madina Album']
  },
  {
    id: 'qw-salle',
    category: 'naat',
    titleUrdu: 'صلِ نبینا صلِ شفیعنا',
    titleEnglish: 'Salle Nabiyena Salle Shafee’ena',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '06:55',
    audioUrl: 'https://archive.org/download/Saba-e-Madina/SalleNabiyena.mp3',
    description: 'Enchanting Arabic and Urdu Durood-o-Salam evoking deep love and blessings upon the Intercessor of creation ﷺ.',
    lyricsExcerptUrdu: 'صلِ نبینا صلِ شفیعنا\nصلِ علیٰ محمد والہ واصحابہ وبارک وسلم',
    lyricsExcerptEnglish: 'Blessings upon our Prophet, blessings upon our Intercessor, blessings upon Muhammad ﷺ and his blessed household and companions.',
    isFeatured: true,
    tags: ['Durood Sharif', 'Arabic & Urdu', 'Heart Touching']
  },
  {
    id: 'qw-aankh',
    category: 'naat',
    titleUrdu: 'آنکھ اُٹھے تیرے لیے',
    titleEnglish: 'Aankh Ut’thay Tery Liye',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '06:18',
    audioUrl: 'https://archive.org/download/Saba-e-Madina/Aankh%20Ut%27thay%20Tery%20Liye.mp3',
    description: 'Deeply devotional kalam expressing that every breath and sight is dedicated to the remembrance of Rasool Allah ﷺ.',
    lyricsExcerptUrdu: 'آنکھ اُٹھے تیرے لیے، دل دھڑکے تیرے لیے\nمیری ہر سانس ہے نثار مدینے والے تیرے لیے',
    lyricsExcerptEnglish: 'May our eyes gaze for your sight, may our heart beat for your love, every breath is sacrificed for you, O pride of Madinah.',
    tags: ['Devotion', 'Ishq-e-Rasool']
  },
  {
    id: 'qw-humseh',
    category: 'naat',
    titleUrdu: 'ہم سہہ نہ سکیں گے جدائی تیرے در کی',
    titleEnglish: 'Hum Seh Na Sakain Gy Judai Tery Dar Ki',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '07:44',
    audioUrl: 'https://archive.org/download/Saba-e-Madina/Hum%20Seh%20Na%20Sakain%20Gy%20Judai%20Tery%20Dar%20Ki.mp3',
    description: 'The tearful prayer of the pilgrim bidding farewell to the holy city of Madinah tul Munawwarah.',
    lyricsExcerptUrdu: 'ہم سہہ نہ سکیں گے جدائی تیرے در کی\nیا رب ہمیں پھر سے مدینہ دیکھا دے',
    lyricsExcerptEnglish: 'We cannot bear separation from your threshold; O Allah, bless us to visit Madinah once again.',
    tags: ['Ziyarat-e-Madinah', 'Tearful Farewell']
  },
  {
    id: 'qw-yarab',
    category: 'naat',
    titleUrdu: 'یا رب میری سوئی ہوئی تقدیر جگا دے',
    titleEnglish: 'Ya Rab Meri Soi Howi Taqdeer Jaga De',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '08:20',
    audioUrl: 'https://archive.org/download/Saba-e-Madina/YaRabMeriSoiHowiTaqdeerJagaDe.mp3',
    description: 'A humble supplication before Allah begging for spiritual rejuvenation, sincere guidance, and love for His Messenger ﷺ.',
    lyricsExcerptUrdu: 'یا رب میری سوئی ہوئی تقدیر جگا دے\nآنکھیں جو ہیں بے نور انہیں نورِ مدینہ دیکھا دے',
    lyricsExcerptEnglish: 'O Lord, awaken my dormant destiny; illuminate my sight with the sacred lights of Madinah.',
    tags: ['Dua & Munajat', 'Spiritual Awakening']
  },
  {
    id: 'qw-labper',
    category: 'naat',
    titleUrdu: 'لب پہ نعتِ پاک کا نغمہ',
    titleEnglish: 'Lab Per Naat-e-Paak Ka Naghma',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '05:40',
    audioUrl: 'https://archive.org/download/Saba-e-Madina/LabPerNaatEPaakKaNaghma.mp3',
    description: 'A classic melodious ode celebrating the tranquility that descends upon a heart reciting praise of the Prophet ﷺ.',
    lyricsExcerptUrdu: 'لب پہ نعتِ پاک کا نغمہ ہے ہر دم رواں\nدل میں مدینے کی خوشبو، روح میں سکونِ جہاں',
    lyricsExcerptEnglish: 'Upon my lips the melody of sacred Naat flows continuously; filling my soul with peace and serenity.',
    tags: ['Peace & Comfort', 'Classic Melody']
  },
  {
    id: 'qw-sooz',
    category: 'naat',
    titleUrdu: 'سوزِ دل چاہیے چشمِ نم چاہیے',
    titleEnglish: 'Sooz-e-Dil Chahiye Chasham-e-Nam Chahiye',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '06:50',
    audioUrl: 'https://archive.org/download/Saba-e-Madina/SoozEDilChahiyeChashamENamChahiye.mp3',
    description: 'Touching verses describing the spiritual prerequisite of love: a burning heart and tearful eyes longing for divine proximity.',
    tags: ['Tazkiyah', 'Heart Softening']
  },
  {
    id: 'qw-innad',
    category: 'naat',
    titleUrdu: 'إن الديار هب الصبا (عربی و اردو کلام)',
    titleEnglish: 'Inn Ad-Dayari Habba As-Saba',
    artist: 'Qari Waheed Zafar Qasmi',
    artistUrdu: 'قاری وحید ظفر قاسمی',
    durationFormatted: '06:30',
    audioUrl: 'https://archive.org/download/Saba-e-Madina/Inn%20Ad%20Dayari%20Ha%20Saba%20%28Arabi%20%29.mp3',
    description: 'Classical Arabic Qasida rendered with the majestic resonance and Qirat mastery of Qari Waheed Zafar Qasmi.',
    tags: ['Arabic Qasida', 'Classical Qirat Style']
  }
];

// 2. SHUKRAN YA RABBI / SHUKRAN LAKA RABBI (MUFFLED / SLOWED ACOUSTIC VERSION AS REQUESTED)
export const SHUKRAN_YA_RABBI_NAAT: NaatItem = {
  id: 'nasheed-shukran-ya-rabbi',
  category: 'shukran-ya-rabbi',
  titleUrdu: 'شكرًا لك ربي شكرًا (شكرًا يا ربي · مفلڈ و اسلوڈ ورزن)',
  titleEnglish: 'Shukran Laka Rabbi / Shukran Ya Rabbi (Slowed & Muffled Gratitude Nasheed)',
  artist: 'Muffled Acoustic Rendition (شكراً لك ربي)',
  artistUrdu: 'شكرًا لك يا ربي · نغمۂ شکر و تسلیم',
  durationFormatted: '04:15',
  audioUrl: 'https://archive.org/download/shukran-ya-rabbi-allah-by-mystery-x/Shukran%20Ya%20Rabbi%20Allah%20by%20Mystery_X.mp3',
  youtubeId: 'wi1_1cJtMY4',
  description: 'The deeply cherished muffled, slowed acoustic vocal nasheed praising Allah for infinite blessings, guidance, peace, and spiritual illumination.',
  lyricsExcerptUrdu: 'شُكْرًا لَكَ رَبِّي شُكْرًا، نَوَّرْتَ حَيَاتِي نُورًا، هَدَيْتَ فُؤَادِي دَوْمًا\nاے میرے پروردگار! تیرا شکر ہے کہ تو نے میری زندگی کو نور سے بھر دیا اور میرے دل کو ہدایت دی',
  lyricsExcerptEnglish: 'Thank You, my Lord, thank You! You illuminated my life with divine light and continually guided my heart with peace.',
  fullLyrics: [
    {
      arabic: 'شُكْرًا لَكَ رَبِّي شُكْرًا',
      transliteration: 'Shukran laka Rabbi shukran',
      urdu: 'اے میرے رب! تیرا شکر ہے، تیرا بے حد شکر ہے',
      english: 'Thank You, my Lord, thank You!',
    },
    {
      arabic: 'نَوَّرْتَ حَيَاتِي نُورًا',
      transliteration: 'Nawwarta hayati nooran',
      urdu: 'تو نے میری زندگی کو اپنی رحمت کے نور سے منور کر دیا',
      english: 'You illuminated my entire life with divine light.',
    },
    {
      arabic: 'هَدَيْتَ فُؤَادِي دَوْمًا',
      transliteration: 'Hadaita fu’adi dawman',
      urdu: 'تو نے میرے دل کو ہمیشہ صراطِ مستقیم کی ہدایت عطا فرمائی',
      english: 'You continuously guide my heart upon the straight path.',
    },
    {
      arabic: 'أَنْتَ الرَّحْمٰنُ الْمَوْلَىٰ',
      transliteration: 'Antar-Rahmanul Mawla',
      urdu: 'تو ہی بے پایاں رحمن ہے اور تو ہی ہمارا حقیقی مولا و مددگار ہے',
      english: 'You are the Most Merciful, the Supreme Sovereign Protector.',
    },
    {
      arabic: 'شُكْرًا يَا رَبِّي شُكْرًا، هَدَيْتَ قَلْبِي شُكْرًا',
      transliteration: 'Shukran ya Rabbi shukran, hadaita qalbi shukran',
      urdu: 'اے میرے رب! تیرا شکر ہے، میرے دل کو ہدایت دینے پر تیرا شکر ہے',
      english: 'Thank You, O my Lord, thank You! For guiding my heart, thank You!',
    },
    {
      arabic: 'نَوَّرْتَ دَرْبِي شُكْرًا، شُكْرًا يَا رَبِّي شُكْرًا',
      transliteration: 'Nawwarta darbi shukran, shukran ya Rabbi shukran',
      urdu: 'میری راہوں کو روشن کرنے پر تیرا شکر، اے میرے رب تیرا شکر ہے',
      english: 'For lighting up my pathways, thank You! Thank You, my Lord, thank You!',
    },
    {
      arabic: 'كَمْ مِنْ نِعَمٍ أَعْطَيْتَ، وَبِفَضْلِكَ قَدْ أَغْنَيْتَ',
      transliteration: 'Kam min ni’amin a’tayta, wa bi-fadlika qad aghnayta',
      urdu: 'کتنی ہی ان گنت نعمتیں تو نے عطا فرمائیں، اور اپنے فضل سے تو نے ہمیں غنی کر دیا',
      english: 'How countless are the bounties You bestowed, and through Your grace You enriched us.',
    },
    {
      arabic: 'فَارْحَمْ عَبْدًا نَادَاكَ، يَرْجُو عَفْوَكَ وَرِضَاكَ',
      transliteration: 'Farham ‘abdan naadaka, yarju ‘afwaka wa ridaaka',
      urdu: 'پس اپنے اس بندے پر رحم فرما جس نے تجھے پکارا، جو صرف تیری بخشش اور رضا کا طلبگار ہے',
      english: 'So shower mercy upon a servant calling upon You, hoping only for Your pardon and pleasure.',
    },
    {
      arabic: 'يَا رَبِّي لَكَ الْحَمْدُ كَبِيرًا، حَمْدًا طَيِّبًا كَثِيرًا',
      transliteration: 'Ya Rabbi lakal hamdu kabeeran, hamdan tayyiban katheeran',
      urdu: 'اے میرے پروردگار! تیرے ہی لیے تمام عظیم تعریفیں ہیں، پاکیزہ اور کثیر حمد',
      english: 'O Lord, all immense praise is due to You alone—pure, abundant, and blessed praise.',
    },
    {
      arabic: 'مِلْءَ السَّمَاوَاتِ وَالْأَرْضِ، وَمَا بَيْنَهُمَا يَا ذَا الْفَضْلِ',
      transliteration: 'Mil’as-samawati wal-ard, wa ma baynahuma ya dhal-fadl',
      urdu: 'جو آسمانوں اور زمین اور ان کے درمیان کی ہر چیز کو بھر دے، اے فضل و کرم کے مالک!',
      english: 'Filling the heavens and the earth and whatever lies between them, O Lord of all grace!',
    },
  ],
  isFeatured: true,
  tags: ['Muffled / Slowed', 'Shukran Laka Rabbi', 'Gratitude (Shukr)', 'YouTube wi1_1cJtMY4', 'Calming Meditation']
};

// 3. QARI WAHEED ZAFAR QASMI QURAN RECITATION COLLECTION
// Maps all 114 Surahs to the verified Archive.org collection
const SURAH_NAME_MAP: Record<number, string> = {
  1: '001-Surah_Al-Fatiha.mp3',
  2: '002-Surah_Al-Baqarah.mp3',
  3: '003-Surah_Aal-Imran.mp3',
  4: '004-Surah_An-Nissa.mp3',
  5: '005-Surah_Al-Maidah.mp3',
  6: "006-Surah_Al-An'am.mp3",
  7: "007-Surah_Al-A'raf.mp3",
  8: '008-Surah_Al-Anfal.mp3',
  9: '009-Surah_At-Tawba.mp3',
  10: '010-Surah_Yunus.mp3',
  11: '011-Surah_Hud.mp3',
  12: '012-Surah_Yusuf.mp3',
  13: '013-Surah_Ar-Rad.mp3',
  14: '014-Surah_Ibrahim.mp3',
  15: '015-Surah_Al-Hijr.mp3',
  16: '016-Surah_An-Nahl.mp3',
  17: '017-Surah_Al-Isra.mp3',
  18: '018-Surah_Al-Kahf.mp3',
  19: '019-Surah_Maryam.mp3',
  20: '020-Surah_Ta-Ha.mp3',
  21: '021-Surah_Al-Anbiya.mp3',
  22: '022-Surah_Al-Hajj.mp3',
  23: '023-Surah_Al-Muminun.mp3',
  24: '024-Surah_An-Noor.mp3',
  25: '025-Surah_Al-Furqan.mp3',
  26: '026-Surah_Ash-Shuara.mp3',
  27: '027-Surah_An-Naml.mp3',
  28: '028-Surah_Al-Qasas.mp3',
  29: '029-Surah_Al-Ankaboot.mp3',
  30: '030-Surah_Ar-Room.mp3',
  31: '031-Surah_Luqman.mp3',
  32: '032-Surah_As-Sajda.mp3',
  33: '033-Surah_Al-Ahzab.mp3',
  34: '034-Surah_Saba.mp3',
  35: '035-Surah_Fatir.mp3',
  36: '036-Surah_Yaseen.mp3',
  37: '037-Surah_As-Saaffat.mp3',
  38: '038-Surah_Saad.mp3',
  39: '039-Surah_Az-Zumar.mp3',
  40: '040-Surah_Ghafir.mp3',
  41: '041-Surah_Fussilat.mp3',
  42: '042-Surah_Ash-Shura.mp3',
  43: '043-Surah_Az-Zukhruf.mp3',
  44: '044-Surah_Ad-Dukhan.mp3',
  45: '045-Surah_Al-Jathiya.mp3',
  46: '046-Surah_Al-Ahqaf.mp3',
  47: '047-Surah_Muhammad.mp3',
  48: '048-Surah_Al-Fath.mp3',
  49: '049-Surah_Al-Hujurat.mp3',
  50: '050-Surah_Qaaf.mp3',
  51: '051-Surah_Adh-Dhariyat.mp3',
  52: '052-Surah_At-Toor.mp3',
  53: '053-Surah_An-Najm.mp3',
  54: '054-Surah_Al-Qamar.mp3',
  55: '055-Surah_Ar_Rahman.mp3',
  56: '056-Surah_Al-Waqia.mp3',
  57: '057-Surah_Al-Hadid.mp3',
  58: '058-Surah_Al-Mujadila.mp3',
  59: '059-Surah_Al-Hashr.mp3',
  60: '060-Surah_Al-Mumtahina.mp3',
  61: '061-Surah_As-Saff.mp3',
  62: '062-Surah_Al-Jumua.mp3',
  63: '063-Surah_Al-Munafiqoon.mp3',
  64: '064-Surah_At-Taghabun.mp3',
  65: '065-Surah_At-Talaq.mp3',
  66: '066-Surah_At-Tahrim.mp3',
  67: '067-Surah_Al_Mulk.mp3',
  68: '068-Surah_Al-Qalam.mp3',
  69: '069-Surah_Al-Haaqqa.mp3',
  70: '070-Surah_Al-Maarij.mp3',
  71: '071-Surah_Nooh.mp3',
  72: '072-Surah_Al-Jinn.mp3',
  73: '073-Surah_Al-Muzzammil.mp3',
  74: '074-Surah_Al-Muddaththir.mp3',
  75: '075-Surah_Al-Qiyama.mp3',
  76: '076-Surah_Al-Insan.mp3',
  77: '077-Surah_Al-Mursalat.mp3',
  78: '078-Surah_An-Naba.mp3',
  79: '079-Surah_An-Naziat.mp3',
  80: '080-Surah_Abasa.mp3',
  81: '081-Surah_At-Takwir.mp3',
  82: '082-Surah_Al-Infitar.mp3',
  83: '083-Surah_Al-Mutaffifin.mp3',
  84: '084-Surah_Al-Inshiqaq.mp3',
  85: '085-Surah_Al-Burooj.mp3',
  86: '086-Surah_At-Tariq.mp3',
  87: '087-Surah_Al-Ala.mp3',
  88: '088-Surah_Al-Ghashiya.mp3',
  89: '089-Surah_Al-Fajr.mp3',
  90: '090-Surah_Al-Balad.mp3',
  91: '091-Surah_Ash-Shams.mp3',
  92: '092-Surah_Al-Lail.mp3',
  93: '093-Surah_Ad-Duha.mp3',
  94: '094-Surah_Ash-Sharh.mp3',
  95: '095-Surah_At-Tin.mp3',
  96: '096-Surah_Al-Alaq.mp3',
  97: '097-Surah_Al-Qadr.mp3',
  98: '098-Surah_Al-Bayyina.mp3',
  99: '099-Surah_Az-Zalzala.mp3',
  100: '100-Surah_Al-Adiyat.mp3',
  101: '101-Surah_Al-Qaria.mp3',
  102: '102-Surah_At-Takathur.mp3',
  103: '103-Surah_Al-Asr.mp3',
  104: '104-Surah_Al-Humaza.mp3',
  105: '105-Surah_Al-Feel.mp3',
  106: '106-Surah_Quraish.mp3',
  107: '107-Surah_Al-Maoon.mp3',
  108: '108-Surah_Al-Kauthar.mp3',
  109: '109-Surah_Al-Kafiroon.mp3',
  110: '110-Surah_An-Nasr.mp3',
  111: '111-Surah_Al-Masad.mp3',
  112: '112-Surah_Al-Ikhlas.mp3',
  113: '113-Surah_Al-Falaq.mp3',
  114: '114-Surah_An-Nas.mp3'
};

export function getQariWaheedQuranAudioUrl(surahNumber: number): string {
  const file = SURAH_NAME_MAP[surahNumber] || `001-Surah_Al-Fatiha.mp3`;
  return `https://archive.org/download/AlQuranWithUrduTranslation_Recitation_By_QariWaheedZafarQasmi_Translation_By_Mau/${encodeURIComponent(file)}`;
}

export const QARI_WAHEED_QURAN_RECITATIONS: NaatItem[] = QURAN_114_SURAHS.map((surah) => {
  const isFeatured = [1, 18, 36, 55, 67, 103, 112, 113, 114].includes(surah.number);
  return {
    id: `qw-quran-${surah.number}`,
    category: 'quran-recitation',
    titleUrdu: `تلاوت سورة ${surah.name} (مع اردو ترجمہ)`,
    titleEnglish: `Surah ${surah.englishName} (${surah.englishNameTranslation})`,
    artist: 'Qari Waheed Zafar Qasmi (قاری وحید ظفر قاسمی)',
    artistUrdu: 'تلاوت: قاری وحید ظفر قاسمی · اردو ترجمہ: مولانا فتح محمد جالندھری',
    durationFormatted: surah.numberOfAyahs > 100 ? '45:00' : surah.numberOfAyahs > 30 ? '18:30' : '06:15',
    audioUrl: getQariWaheedQuranAudioUrl(surah.number),
    description: `Flawless soulful Qirat by Qari Waheed Zafar Qasmi accompanied verse-by-verse by the classic Urdu translation of Maulana Fateh Muhammad Jalandhari.`,
    isFeatured,
    surahNumber: surah.number,
    tags: ['Holy Quran', 'Qari Waheed Zafar', 'Urdu Tarjuma', surah.revelationType]
  };
});

// All items combined in a unified catalog
export const ALL_NAATS_AND_QASMI_TRACKS: NaatItem[] = [
  SHUKRAN_YA_RABBI_NAAT,
  ...QARI_WAHEED_NAATS,
  ...QARI_WAHEED_QURAN_RECITATIONS
];
