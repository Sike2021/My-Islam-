export type HasiTvCategory = 'all' | 'karbala' | 'sahaba' | 'prophets' | 'history' | 'endtimes' | 'mysteries';

export interface HasiTvVideo {
  id: string;
  youtubeId: string;
  title: string;
  urduTitle: string;
  category: HasiTvCategory;
  categoryLabel: string;
  duration: string;
  viewsEstimate: string;
  description: string;
  urduDescription: string;
  thumbnail: string;
  tags: string[];
  audioFallbackUrl?: string;
}

export const HASI_TV_CHANNEL_INFO = {
  name: 'HASI TV',
  urduName: 'حسی ٹی وی',
  creator: 'Haseeb Shafqat',
  urduCreator: 'حسیب شفقت',
  channelUrl: 'https://youtube.com/@hasitv?si=qq3YtlYiQRF2Nh4S',
  tagline: 'Authentic Islamic Historical Documentaries, Sahaba Stories, Karbala Facts & Global Truths',
  urduTagline: 'اسلامی تاریخ، قصص الصحابہ، کربلا کی حقائق اور تحقیقی دستاویزی ویڈیوز',
  subscribers: '3.2M+',
  avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80',
};

export const HASI_TV_VIDEOS: HasiTvVideo[] = [
  // ==========================================
  // KARBALA & AHL-UL-BAYT SERIES
  // ==========================================
  {
    id: 'hasitv-karbala-final',
    youtubeId: 'Cuqbrwzcy-s',
    title: 'Waqia Karbala And Shahadat Imam Hussain (R.A) | Complete Historic Documentary',
    urduTitle: 'واقعۂ کربلا اور شہادتِ امام حسین رضی اللہ عنہ | دستاویزی فلم',
    category: 'karbala',
    categoryLabel: 'Karbala & Ahl al-Bayt',
    duration: '38:15',
    viewsEstimate: '2.4M',
    description: 'The complete, heart-wrenching historical documentary on the tragedy of Karbala, the steadfastness of Imam Hussain (RA), Yazid’s political ambitions, and the role of Umar ibn Sa’ad.',
    urduDescription: 'میدانِ کربلا کے دلدوز واقعات، امام عالی مقام حضرت امام حسین رضی اللہ عنہ کی لازوال استقامت، یزیدی لشکر اور عمر بن سعد کی تاریخی حقیقت پر مدلل تحقیق۔',
    thumbnail: 'https://img.youtube.com/vi/Cuqbrwzcy-s/hqdefault.jpg',
    tags: ['Karbala', 'Imam Hussain', 'Shahadat', 'Umar ibn Saad', 'Yazid', 'Ahl al-Bayt'],
  },
  {
    id: 'hasitv-banu-umayya-hashim',
    youtubeId: 'Dwho5fl3fEM',
    title: 'History Of Banu Umayya And Banu Hashim | Karbala Series (Part 1)',
    urduTitle: 'تاریخ بنو امیہ اور بنو ہاشم | کربلا سیریز (حصہ اوّل)',
    category: 'karbala',
    categoryLabel: 'Karbala & Ahl al-Bayt',
    duration: '29:40',
    viewsEstimate: '1.8M',
    description: 'Deep dive into the tribal lineages of Banu Umayya and Banu Hashim, pre-Islamic tribal dynamics, and the historical circumstances leading up to 61 Hijri.',
    urduDescription: 'قریش کے دو بڑے قبائل بنو ہاشم اور بنو امیہ کے باہمی تعلقات، قبل از اسلام کی تاریخ اور کربلا کے پس پردہ محرکات پر چشم کشا حقائق۔',
    thumbnail: 'https://img.youtube.com/vi/Dwho5fl3fEM/hqdefault.jpg',
    tags: ['Banu Hashim', 'Banu Umayya', 'History', 'Karbala Background'],
  },
  {
    id: 'hasitv-karbala-untold-facts',
    youtubeId: 'GKtrCO7pLys',
    title: 'Karbala Facts History Never Told You — The Strategy & Untold Names',
    urduTitle: 'کربلا کے وہ حقائق جو تاریخ نے چھپائے — حکمتِ عملی اور ان کہے نام',
    category: 'karbala',
    categoryLabel: 'Karbala & Ahl al-Bayt',
    duration: '31:20',
    viewsEstimate: '1.9M',
    description: 'Untold historical facts, military maneuvers, true geographical topography of the Euphrates riverbank, and heroic names often missed in general storytelling.',
    urduDescription: 'دریائے فرات کے کنارے خیمہ گاہ کی ترتیب، شہدائے کربلا کے وہ سچے مجاہدین جن کا ذکر کم ملتا ہے، اور جنگی حکمتِ عملی کی مفصل روئیداد۔',
    thumbnail: 'https://img.youtube.com/vi/GKtrCO7pLys/hqdefault.jpg',
    tags: ['Karbala Facts', 'Haseeb Shafqat', 'Untold Names', 'Imam Hussain'],
  },

  // ==========================================
  // SAHABA STORIES
  // ==========================================
  {
    id: 'hasitv-musab-bin-umair',
    youtubeId: 'PdDMoIsF02A',
    title: 'The Most Beautiful Young Man of Makkah — Mus‘ab bin ‘Umair (RA)',
    urduTitle: 'مکہ کا سب سے خوبصورت و امیر نوجوان — حضرت مصعب بن عمیر رضی اللہ عنہ',
    category: 'sahaba',
    categoryLabel: 'Sahaba Stories',
    duration: '24:18',
    viewsEstimate: '1.5M',
    description: 'The moving account of Mus‘ab bin ‘Umair (RA), who abandoned royal wealth and silks in Makkah for the love of Allah and His Messenger ﷺ, becoming the first ambassador of Islam in Madinah.',
    urduDescription: 'مکہ کے ناز و نعم میں پلے سب سے خوبصورت نوجوان کی داستانِ عشق، جنہوں نے اسلام کی خاطر سب کچھ تج دیا اور غزوہ احد میں پرچمِ اسلام تھامے شہید ہوئے۔',
    thumbnail: 'https://img.youtube.com/vi/PdDMoIsF02A/hqdefault.jpg',
    tags: ['Musab bin Umair', 'Sahaba', 'Madinah Ambassador', 'Uhud'],
  },
  {
    id: 'hasitv-5-undefeated-warriors',
    youtubeId: 'Ut10SRg4bEY',
    title: '5 Legendary Warriors From Islamic History Who Were Undefeated (Khalid bin Waleed RA)',
    urduTitle: 'اسلامی تاریخ کے ۵ ناقابلِ شکست سالار (حضرت خالد بن ولید سیف اللہ)',
    category: 'sahaba',
    categoryLabel: 'Sahaba Stories',
    duration: '27:50',
    viewsEstimate: '3.1M',
    description: 'The military brilliance of Hazrat Khalid bin al-Waleed (Saifullah) who fought over 100 battles without defeat, breaking the Persian and Byzantine empires.',
    urduDescription: 'سو سے زائد جنگوں میں ناقابلِ شکست رہنے والے عظیم جرنیل حضرت خالد بن ولید رضی اللہ عنہ اور دیگر عظیم مسلم سالاروں کی عسکری حکمتِ عملی۔',
    thumbnail: 'https://img.youtube.com/vi/Ut10SRg4bEY/hqdefault.jpg',
    tags: ['Khalid bin Waleed', 'Islamic Warriors', 'Yarmouk', 'Saifullah'],
  },
  {
    id: 'hasitv-umar-farooq-insaf',
    youtubeId: 'Yri-ucTiJVo',
    title: 'Hazrat Umar Farooq (RA) Ka Insaf — The Peerless Justice of Caliph Umar',
    urduTitle: 'حضرت عمر فاروق رضی اللہ عنہ کا بے مثال عدل و انصاف',
    category: 'sahaba',
    categoryLabel: 'Sahaba Stories',
    duration: '18:45',
    viewsEstimate: '1.2M',
    description: 'How Ameer-ul-Momineen Umar ibn al-Khattab established true rule of law, held governors strictly accountable, and wandered the streets at night to feed the poor.',
    urduDescription: 'دریائے فرات کے کنارے کتے کے پیاسے مرنے پر بھی جوابدہی کا احساس، حاکمِ وقت کا معمولی چادر پر حساب دینا اور فقید المثال عدلِ فاروقی۔',
    thumbnail: 'https://img.youtube.com/vi/Yri-ucTiJVo/hqdefault.jpg',
    tags: ['Hazrat Umar', 'Farooq-e-Azam', 'Justice', 'Khilafat'],
  },

  // ==========================================
  // PROPHETS & SACRED HISTORY
  // ==========================================
  {
    id: 'hasitv-prophet-younus',
    youtubeId: 'E15CAdkoBiM',
    title: 'Story Of Prophet Younus (AS) in Quran And Latest Scientific Marine Research',
    urduTitle: 'قرآن میں حضرت یونس علیہ السلام کا واقعہ اور جدید سائنسی تحقیق',
    category: 'prophets',
    categoryLabel: 'Prophets Stories',
    duration: '22:15',
    viewsEstimate: '2.8M',
    description: 'Prophet Yunus (AS) in the dark depths of the ocean inside the belly of the great marine creature, his timeless Dua (La ilaha illa Anta), and oceanographic discoveries.',
    urduDescription: 'سمندر کی تہہ، رات کا اندھیرا اور مچھلی کے پیٹ میں دعاِء یونس کی گونج، اور جدید بحری سائنس کی تصدیق۔',
    thumbnail: 'https://img.youtube.com/vi/E15CAdkoBiM/hqdefault.jpg',
    tags: ['Prophet Yunus', 'Ayah Kareema', 'Science & Quran', 'Whale'],
  },
  {
    id: 'hasitv-khidr-dhulqarnayn',
    youtubeId: '4KeMVHgcEwQ',
    title: 'Khidr, Dhul-Qarnayn & the Water of Life: Reality Explained in Quran',
    urduTitle: 'حضرت خضر علیہ السلام، ذوالقرنین اور آبِ حیات کی اصل حقیقت',
    category: 'prophets',
    categoryLabel: 'Prophets Stories',
    duration: '35:10',
    viewsEstimate: '3.6M',
    description: 'Surah Al-Kahf’s greatest mysteries: the journey of Prophet Musa and Hazrat Khidr, the iron-copper wall constructed by Dhul-Qarnayn against Yajuj & Majuj, and historical analysis.',
    urduDescription: 'سورۃ الکہف کے عظیم روحانی راز: حضرت موسیٰ و خضرؑ کی ملاقات، ذوالقرنین کی آہنی دیوار اور یاجوج ماجوج کی قید۔',
    thumbnail: 'https://img.youtube.com/vi/4KeMVHgcEwQ/hqdefault.jpg',
    tags: ['Khidr', 'Dhul Qarnayn', 'Surah Kahf', 'Yajuj Majuj'],
  },
  {
    id: 'hasitv-qoum-e-lot',
    youtubeId: 'h3-On1BbqAo',
    title: 'Qoum e Lot (The People of Lot) — Reality & Archaeological Excavations Explained',
    urduTitle: 'واقعہ قومِ لوطؑ — بحیرہ مردار کے آثار اور قرآنی عبرت',
    category: 'prophets',
    categoryLabel: 'Prophets Stories',
    duration: '21:05',
    viewsEstimate: '1.4M',
    description: 'The moral downfall of the people of Sodom, warnings of Prophet Lut (AS), the sulfurous stones of baked clay, and modern geological findings at the Dead Sea.',
    urduDescription: 'قومِ لوط کی سرکشی، پتھروں کی بارش، سدوم و عمورہ کے کھنڈرات اور بحیرہ مردار (Dead Sea) کے سائنسی انکشافات۔',
    thumbnail: 'https://img.youtube.com/vi/h3-On1BbqAo/hqdefault.jpg',
    tags: ['Prophet Lut', 'Dead Sea', 'Quranic Miracles', 'History'],
  },

  // ==========================================
  // ISLAMIC HISTORY & INVESTIGATIONS
  // ==========================================
  {
    id: 'hasitv-taboot-e-sakina',
    youtubeId: 'E260KyPvGiw',
    title: 'We Almost Found Taboot E Sakina "Said ISR@@l" | Mystery of Ark of the Covenant',
    urduTitle: 'تابوتِ سکینہ کی تلاش اور قرآنی حقیقت | حسی ٹی وی دستاویزی فلم',
    category: 'history',
    categoryLabel: 'Islamic History & Mysteries',
    duration: '26:30',
    viewsEstimate: '4.1M',
    description: 'The sacred Ark of the Covenant (Taboot-e-Sakina) mentioned in Surah Al-Baqarah, carried by angels to King Talut, its contents (staff of Musa, relics of Harun), and where it lies today.',
    urduDescription: 'سورۃ البقرہ میں مذکور تابوتِ سکینہ کی حقیقت، عصائے موسیٰ، من و سلویٰ کا برتن، اور ہیکل سلیمانی کے نیچے اسرائیلی کھدائیوں کا سچ۔',
    thumbnail: 'https://img.youtube.com/vi/E260KyPvGiw/hqdefault.jpg',
    tags: ['Taboot e Sakina', 'Ark of Covenant', 'Prophet Musa', 'Surah Baqarah'],
  },
  {
    id: 'hasitv-prophet-last-moments',
    youtubeId: 'yZoo8X97TLU',
    title: 'Last Moments Of Prophet Muhammad (PBUH)\'s Life | Emotional Documentary',
    urduTitle: 'حضور نبی کریم ﷺ کے وصال مبارک کے آخری لمحات | انتہائی رقت انگیز',
    category: 'history',
    categoryLabel: 'Islamic History & Mysteries',
    duration: '28:44',
    viewsEstimate: '2.7M',
    description: 'The most emotional chapter in human history: the final days of the Messenger of Allah ﷺ, his prayers in Masjid an-Nabawi, his tender words to Hazrat Fatima, and the weeping of the Sahaba.',
    urduDescription: 'سید المرسلین حضرت محمد مصطفی ﷺ کے ظاہری وصال کے آخری ایام، مسجد نبوی میں آخری خطبہ، اور صحابہ کرام رضی اللہ عنہم کے غم کا رقت انگیز منظر۔',
    thumbnail: 'https://img.youtube.com/vi/yZoo8X97TLU/hqdefault.jpg',
    tags: ['Seerat un Nabi', 'Wisal e Nabawi', 'Masjid Nabawi', 'Emotional'],
  },
  {
    id: 'hasitv-painful-taif',
    youtubeId: 'fGdoTYoD6VQ',
    title: 'The Most Painful Journey Of Prophet Muhammad [SAW] (Safar-e-Taif)',
    urduTitle: 'سفرِ طائف — حضور ﷺ کے صبر و استقامت کا سب سے کٹھن امتحان',
    category: 'history',
    categoryLabel: 'Islamic History & Mysteries',
    duration: '23:12',
    viewsEstimate: '1.6M',
    description: 'When the chiefs of Taif rejected the truth and sent street rowdies to pelt stones until his blessed shoes were filled with blood, yet the Prophet ﷺ prayed for their guidance instead of punishment.',
    urduDescription: 'طائف کی پتھراؤ بھری گلیوں میں رحمت اللعالمین ﷺ کے نعلین مبارک کا خون سے بھر جانا، اور عذاب کے فرشتے کے سامنے مغفرت و ہدایت کی دعا فرمانا۔',
    thumbnail: 'https://img.youtube.com/vi/fGdoTYoD6VQ/hqdefault.jpg',
    tags: ['Safar e Taif', 'Patience', 'Mercy to the Worlds', 'Seerat'],
  },
  {
    id: 'hasitv-civil-wars-jamal-siffeen',
    youtubeId: 'dmdiOQBVy9Y',
    title: 'History Of Jang e Jamal, Siffeen and Nahrawan | Early Islamic Crises Explained',
    urduTitle: 'تاریخ جنگِ جمل، صفین اور نہروان | امتِ مسلمہ کا بڑا امتحان اور حقائق',
    category: 'history',
    categoryLabel: 'Islamic History & Mysteries',
    duration: '33:18',
    viewsEstimate: '1.7M',
    description: 'Objective, scholarly historical presentation of the civil strife after the martyrdom of Caliph Uthman (RA), the wisdom of Hazrat Ali (RA), and reconciliation between Sahaba.',
    urduDescription: 'شہادتِ عثمان غنی رضی اللہ عنہ کے بعد سازشی گروہوں کی ریشہ دوانیاں، حضرت علی المرتضیٰ کی فہم و فراست، اور صحابہ کرام کے باہمی احترام کی تاریخی دستاویز۔',
    thumbnail: 'https://img.youtube.com/vi/dmdiOQBVy9Y/hqdefault.jpg',
    tags: ['Jang e Jamal', 'Siffeen', 'Hazrat Ali', 'Islamic Crises'],
  },
  {
    id: 'hasitv-islam-subcontinent',
    youtubeId: 'LKvIsr3zLS4',
    title: 'How Islam Came to Indian Subcontinent? Full Islamic History Explained',
    urduTitle: 'برصغیر پاک و ہند میں اسلام کیسے آیا؟ مکمل تاریخی دستاویزی رپورٹ',
    category: 'history',
    categoryLabel: 'Islamic History & Mysteries',
    duration: '34:25',
    viewsEstimate: '2.1M',
    description: 'How Arab merchants and Muhammad bin Qasim introduced justice to Sindh (Bab-ul-Islam), followed by the spiritual radiance of Sufi saints like Ali Hujwiri (Data Ganj Bakhsh) and Muin al-Din Chishti.',
    urduDescription: 'باب الاسلام سندھ کی فتح، محمد بن قاسم کا مظلوموں کی داد رسی کرنا، اور اولیائے کرام کی محبت و اخلاق سے لاکھوں انسانوں کا مشرف بہ اسلام ہونا۔',
    thumbnail: 'https://img.youtube.com/vi/LKvIsr3zLS4/hqdefault.jpg',
    tags: ['Subcontinent Islam', 'Muhammad bin Qasim', 'Sufis', 'Pakistan History'],
  },
  {
    id: 'hasitv-human-slavery-quran',
    youtubeId: 'AOfy4PKUkA0',
    title: 'How Did Humans Break Free from Human Slavery? | A Miracle of the Quran',
    urduTitle: 'قرآن کا عظیم معجزہ: انسانیت غلامی کی زنجیروں سے کیسے آزاد ہوئی؟',
    category: 'history',
    categoryLabel: 'Islamic History & Mysteries',
    duration: '20:45',
    viewsEstimate: '1.3M',
    description: 'How Islam dismantled institutional slavery by linking the expiation of sins to freeing slaves and elevating Hazrat Bilal al-Habashi to the minaret of the Kaaba.',
    urduDescription: 'قبل از اسلام غلاموں کی خرید و فروخت کا نظام، اور اسلام کے احکامِ کفارہ (تحریر رقبہ) اور حضرت بلال حبشی رضی اللہ عنہ کو دی گئی عظمت۔',
    thumbnail: 'https://img.youtube.com/vi/AOfy4PKUkA0/hqdefault.jpg',
    tags: ['Slavery in Islam', 'Hazrat Bilal', 'Quran Miracles', 'Human Rights'],
  },

  // ==========================================
  // END TIMES & DAJJAL (عصرِ حاضر و علاماتِ قیامت)
  // ==========================================
  {
    id: 'hasitv-arrival-of-dajjal',
    youtubeId: 'PpaZ1z184Yk',
    title: 'Arrival of Dajjal | Food Control Prophecy Becoming Reality? (End Times)',
    urduTitle: 'ظہورِ دجال اور خوراک پر کنٹرول کی پیشین گوئی کی ہولناک سچائی',
    category: 'endtimes',
    categoryLabel: 'End Times & Prophecies',
    duration: '27:14',
    viewsEstimate: '3.8M',
    description: 'Authentic prophetic hadiths on Dajjal manipulating water and food supplies, contemporary global agricultural monopolization, and spiritual refuge in Surah Al-Kahf.',
    urduDescription: 'حدیثِ نبوی میں دجال کے پاس روٹیوں کے پہاڑ اور پانی کے چشمے ہونے کی پیشین گوئی، جدید کارپوریٹ فوڈ مافیا، اور سورۃ الکہف کی حفاظتی آیات۔',
    thumbnail: 'https://img.youtube.com/vi/PpaZ1z184Yk/hqdefault.jpg',
    tags: ['Dajjal', 'End Times', 'Prophecies', 'Surah Kahf'],
  },
  {
    id: 'hasitv-imam-mahdi-coming',
    youtubeId: 'VUFxq06ZbVc',
    title: 'The Rise of Muslim Unity & the Coming of Imam Mahdi | End Times Explained',
    urduTitle: 'مسلم اتحاد کا احیاء اور ظہورِ امام مہدی علیہ الرضوان کی نشانیاں',
    category: 'endtimes',
    categoryLabel: 'End Times & Prophecies',
    duration: '30:05',
    viewsEstimate: '2.9M',
    description: 'Signs preceding the advent of Imam Muhammad al-Mahdi, the pledge between the Rukn and the Maqam in Makkah, and the descent of Prophet Isa (AS) in Damascus.',
    urduDescription: 'علاماتِ صغریٰ و کبریٰ، مکہ مکرمہ میں حجرِ اسود اور مقامِ ابراہیم کے درمیان بیعت، اور دمشق کی سفید مینار پر حضرت عیسیٰ علیہ السلام کا نزول۔',
    thumbnail: 'https://img.youtube.com/vi/VUFxq06ZbVc/hqdefault.jpg',
    tags: ['Imam Mahdi', 'Prophet Isa', 'Damascus', 'End Times'],
  },

  // ==========================================
  // UNSEEN WORLD & MYSTERIES
  // ==========================================
  {
    id: 'hasitv-jinn-reports',
    youtubeId: 'fP3Gc4uXZSQ',
    title: 'Why Are Jinn Reported More Often in Saudi Arabia Than the Rest of the World?',
    urduTitle: 'سعودی عرب میں جنات کے واقعات کا کثرت سے ذکر کیوں آتا ہے؟',
    category: 'mysteries',
    categoryLabel: 'Unseen World & Mysteries',
    duration: '21:40',
    viewsEstimate: '2.5M',
    description: 'The Quranic reality of the Jinn, their creation from smokeless fire, desert environments (Wadi al-Jinn), and discerning between authentic Sunnah and cultural folklore.',
    urduDescription: 'قرآن کریم میں جنات کی تخلیق کا بیان (نارِ سموم)، مدینہ کے قریب وادی جن کی حقیقت اور توہم پرستی بمقابلہ مسنون حفاظت و اذکار۔',
    thumbnail: 'https://img.youtube.com/vi/fP3Gc4uXZSQ/hqdefault.jpg',
    tags: ['Jinn', 'Wadi Jinn', 'Quran', 'Ayatul Kursi'],
  },
  {
    id: 'hasitv-masjid-nabawi-replica',
    youtubeId: 'hV1oNxt8SoM',
    title: 'Why These People in India Built a Replica of Masjid an-Nabawi? Reality Explained',
    urduTitle: 'بھارت میں مسجد نبوی ﷺ کے ماڈل کی تعمیر کے پیچھے کیا حقائق ہیں؟',
    category: 'mysteries',
    categoryLabel: 'Unseen World & Mysteries',
    duration: '19:30',
    viewsEstimate: '1.6M',
    description: 'Investigative look at architectural models of the Prophet’s Mosque, deep emotional reverence among South Asian Muslims, and Islamic jurisprudence on building replicas.',
    urduDescription: 'گنبدِ خضراء اور مسجد نبوی سے والہانہ عقیدت، فنِ تعمیر کے نمونے اور شریعتِ اسلامی میں مقدسات کی تعظیم کے اصول۔',
    thumbnail: 'https://img.youtube.com/vi/hV1oNxt8SoM/hqdefault.jpg',
    tags: ['Masjid Nabawi', 'Architecture', 'Green Dome', 'Madinah'],
  },
];
