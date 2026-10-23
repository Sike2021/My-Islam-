// Open Source, Non-Copyrighted Hadith Library Data and Utilities
// Canonical Editions: Sahih al-Bukhari, Sahih Muslim, Jami` at-Tirmidhi,
// Sunan Abi Dawud, Sunan an-Nasa'i, Sunan Ibn Majah, 40 Hadith an-Nawawi, Riyad as-Salihin, Hadith Qudsi

export interface HadithBookMeta {
  id: string;
  titleEnglish: string;
  titleUrdu: string;
  titleArabic: string;
  author: string;
  authorUrdu: string;
  hadithCount: number;
  description: string;
  descriptionUrdu: string;
  apiSlugUrdu: string;
  apiSlugEnglish: string;
  apiSlugArabic: string;
  color: string;
}

export interface HadithItem {
  id: string; // e.g. "bukhari-1"
  bookId: string;
  bookNameEnglish: string;
  bookNameUrdu: string;
  hadithNumber: number;
  chapterNumber?: number;
  chapterEnglish?: string;
  chapterUrdu?: string;
  chapterArabic?: string;
  narratorEnglish: string;
  narratorUrdu: string;
  arabicText: string;
  urduTranslation: string;
  englishTranslation: string;
  grade: 'Sahih' | 'Hasan' | 'Muttafaq Alayh' | 'Daif' | 'Authentic';
  gradeUrdu: string;
  reference: string;
  topics: string[];
}

export const HADITH_BOOKS: HadithBookMeta[] = [
  {
    id: 'bukhari',
    titleEnglish: 'Sahih al-Bukhari',
    titleUrdu: 'صحیح البخاری',
    titleArabic: 'صحيح البخاري',
    author: 'Imam Muhammad al-Bukhari (rahimahullah)',
    authorUrdu: 'امام محمد بن اسماعیل بخاریؒ',
    hadithCount: 7563,
    description: 'The most authentic book of Hadith after the Holy Quran, compiled by Imam Bukhari.',
    descriptionUrdu: 'اصح الکتب بعد کتاب اللہ — امام بخاریؒ کی مستند ترین تالیف۔',
    apiSlugUrdu: 'urd-bukhari',
    apiSlugEnglish: 'eng-bukhari',
    apiSlugArabic: 'ara-bukhari',
    color: 'from-amber-600 to-amber-800',
  },
  {
    id: 'muslim',
    titleEnglish: 'Sahih Muslim',
    titleUrdu: 'صحیح مسلم',
    titleArabic: 'صحيح مسلم',
    author: 'Imam Muslim ibn al-Hajjaj (rahimahullah)',
    authorUrdu: 'امام مسلم بن الحجاج قشیریؒ',
    hadithCount: 7500,
    description: 'Second of the Sahihayn with pristine thematic chains and meticulous reporting.',
    descriptionUrdu: 'صحیحین کی دوسری کتاب — حسن ترتیب اور عالی اسناد کا بے مثال مجموعہ۔',
    apiSlugUrdu: 'urd-muslim',
    apiSlugEnglish: 'eng-muslim',
    apiSlugArabic: 'ara-muslim',
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    id: 'tirmidhi',
    titleEnglish: 'Jami` at-Tirmidhi',
    titleUrdu: 'جامع الترمذی',
    titleArabic: 'جامع الترمذي',
    author: 'Imam Abu Isa Muhammad at-Tirmidhi (rahimahullah)',
    authorUrdu: 'امام ابو عیسیٰ محمد ترمذیؒ',
    hadithCount: 3956,
    description: 'Distinguished by detailed classifications of Hadith grades and Fiqhi rulings.',
    descriptionUrdu: 'فقہ الحدیث اور درجات احادیث (صحیح، حسن، غریب) کی صراحت کا شاہکار۔',
    apiSlugUrdu: 'urd-tirmidhi',
    apiSlugEnglish: 'eng-tirmidhi',
    apiSlugArabic: 'ara-tirmidhi',
    color: 'from-teal-600 to-teal-800',
  },
  {
    id: 'abudawud',
    titleEnglish: 'Sunan Abi Dawud',
    titleUrdu: 'سنن ابی داؤد',
    titleArabic: 'سنن أبي داود',
    author: 'Imam Abu Dawud as-Sijistani (rahimahullah)',
    authorUrdu: 'امام ابو داؤد سجستانیؒ',
    hadithCount: 5274,
    description: 'Primary source of legal and jurisprudence (Ahkam) Hadiths.',
    descriptionUrdu: 'احادیث احکام اور فقہی مسائل کا بنیادی اور جامع ترین مرجع۔',
    apiSlugUrdu: 'urd-abudawud',
    apiSlugEnglish: 'eng-abudawud',
    apiSlugArabic: 'ara-abudawud',
    color: 'from-cyan-600 to-cyan-800',
  },
  {
    id: 'nasai',
    titleEnglish: 'Sunan an-Nasa\'i',
    titleUrdu: 'سنن النسائی',
    titleArabic: 'سنن النسائي',
    author: 'Imam Ahmad ibn Shu\'ayb an-Nasa\'i (rahimahullah)',
    authorUrdu: 'امام احمد بن شعیب نسائیؒ',
    hadithCount: 5758,
    description: 'Celebrated for the highest standards of narrator verification and chains.',
    descriptionUrdu: 'اسناد کی باریک بینی اور نقد و تحقیق کا عالی ترین مقام۔',
    apiSlugUrdu: 'urd-nasai',
    apiSlugEnglish: 'eng-nasai',
    apiSlugArabic: 'ara-nasai',
    color: 'from-indigo-600 to-indigo-800',
  },
  {
    id: 'ibnmajah',
    titleEnglish: 'Sunan Ibn Majah',
    titleUrdu: 'سنن ابن ماجہ',
    titleArabic: 'سنن ابن ماجه',
    author: 'Imam Ibn Majah al-Qazwini (rahimahullah)',
    authorUrdu: 'امام ابن ماجہ قزوینیؒ',
    hadithCount: 4341,
    description: 'The sixth book of the Sihah Sittah, noted for clear chapter arrangements.',
    descriptionUrdu: 'صحاح ستہ کی چھٹی کتاب — عمدہ ابواب اور نادر احادیث کا خزانہ۔',
    apiSlugUrdu: 'urd-ibnmajah',
    apiSlugEnglish: 'eng-ibnmajah',
    apiSlugArabic: 'ara-ibnmajah',
    color: 'from-sky-600 to-sky-800',
  },
  {
    id: 'nawawi40',
    titleEnglish: '40 Hadith an-Nawawi',
    titleUrdu: 'الاربعین النواویۃ',
    titleArabic: 'الأربعون النووية',
    author: 'Imam Yahya ibn Sharaf an-Nawawi (rahimahullah)',
    authorUrdu: 'امام یحییٰ بن شرف نوویؒ',
    hadithCount: 42,
    description: 'Foundational 42 Hadiths encompassing the core principles of the Islamic faith.',
    descriptionUrdu: 'دین کے بنیادی اصول و ارکان پر مشتمل امام نوویؒ کی مشہور ترین 42 احادیث۔',
    apiSlugUrdu: 'urd-nawawi40',
    apiSlugEnglish: 'eng-nawawi40',
    apiSlugArabic: 'ara-nawawi40',
    color: 'from-rose-600 to-rose-800',
  },
  {
    id: 'riyad',
    titleEnglish: 'Riyad as-Salihin',
    titleUrdu: 'ریاض الصالحین',
    titleArabic: 'رياض الصالحين',
    author: 'Imam an-Nawawi (rahimahullah)',
    authorUrdu: 'امام یحییٰ بن شرف نوویؒ',
    hadithCount: 1896,
    description: 'The Gardens of the Righteous — essential Hadiths on manners, virtues, and spiritual deeds.',
    descriptionUrdu: 'اخلاق و آداب، عبادت و تقویٰ اور نیکیوں کی ترغیب پر مشتمل مقبول ترین کتاب۔',
    apiSlugUrdu: 'urd-riyad',
    apiSlugEnglish: 'eng-riyad',
    apiSlugArabic: 'ara-riyad',
    color: 'from-violet-600 to-violet-800',
  },
  {
    id: 'qudsi',
    titleEnglish: 'Hadith Qudsi',
    titleUrdu: 'احادیث قدسیہ',
    titleArabic: 'الأحاديث القدسية',
    author: 'Divine Hadiths (Direct revelations in Prophet\'s wording)',
    authorUrdu: 'کلام الٰہی فرمودۂ نبویﷺ',
    hadithCount: 40,
    description: 'Sacred Hadiths where Allah speaks directly through the Prophet (PBUH).',
    descriptionUrdu: 'وہ احادیث مبارکہ جن میں معنی اللہ تعالیٰ کی طرف سے اور الفاظ نبی کریمﷺ کے ہیں۔',
    apiSlugUrdu: 'urd-qudsi',
    apiSlugEnglish: 'eng-qudsi',
    apiSlugArabic: 'ara-qudsi',
    color: 'from-amber-700 to-emerald-900',
  },
];

// Offline Pre-loaded Canonical Hadiths with full Arabic, Urdu, and English
export const CORE_HADITHS: HadithItem[] = [
  {
    id: 'bukhari-1',
    bookId: 'bukhari',
    bookNameEnglish: 'Sahih al-Bukhari',
    bookNameUrdu: 'صحیح البخاری',
    hadithNumber: 1,
    chapterNumber: 1,
    chapterEnglish: 'Revelation (How the Divine Inspiration began)',
    chapterUrdu: 'کتاب بدء الوحی',
    chapterArabic: 'كتاب بدء الوحي',
    narratorEnglish: 'Narrated by Umar bin Al-Khattab (may Allah be pleased with him):',
    narratorUrdu: 'حضرت عمر بن خطاب رضی اللہ عنہ سے روایت ہے:',
    arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.',
    urduTranslation: 'تمام اعمال کا دارومدار نیتوں پر ہے اور ہر شخص کے لیے وہی ہے جس کی اس نے نیت کی۔ پس جس کی ہجرت دنیا کے لیے ہو کہ اسے حاصل کرے یا کسی عورت کے لیے کہ اس سے نکاح کرے، تو اس کی ہجرت اسی کے لیے ہے جس کی طرف اس نے ہجرت کی۔',
    englishTranslation: 'Actions are judged by intentions, and every person will get what he intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for.',
    grade: 'Muttafaq Alayh',
    gradeUrdu: 'متفق علیہ (صحیح بخاری و مسلم)',
    reference: 'Sahih al-Bukhari 1',
    topics: ['نیت', 'اخلاص', 'اعمال', 'ہجرت', 'intention', 'sincerity', 'deeds', 'hijrah', 'actions'],
  },
  {
    id: 'bukhari-8',
    bookId: 'bukhari',
    bookNameEnglish: 'Sahih al-Bukhari',
    bookNameUrdu: 'صحیح البخاری',
    hadithNumber: 8,
    chapterNumber: 2,
    chapterEnglish: 'Belief (Iman)',
    chapterUrdu: 'کتاب الایمان',
    chapterArabic: 'كتاب الإيمان',
    narratorEnglish: 'Narrated by Abdullah bin Umar (may Allah be pleased with him):',
    narratorUrdu: 'حضرت عبداللہ بن عمر رضی اللہ عنہما سے روایت ہے:',
    arabicText: 'بُنِيَ الإِسْلاَمُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلاَةِ، وَإِيتَاءِ الزَّكَاةِ، وَالْحَجِّ، وَصَوْمِ رَمَضَانَ.',
    urduTranslation: 'اسلام کی بنیاد پانچ چیزوں پر رکھی گئی ہے: اس بات کی گواہی دینا کہ اللہ کے سوا کوئی معبود نہیں اور محمدﷺ اللہ کے رسول ہیں، نماز قائم کرنا، زکوٰۃ ادا کرنا، حج کرنا، اور رمضان کے روزے رکھنا۔',
    englishTranslation: 'Islam is based on five principles: To testify that none has the right to be worshipped but Allah and Muhammad is Allah\'s Messenger; to offer prayers perfectly; to pay Zakat; to perform Hajj; and to observe fast during the month of Ramadan.',
    grade: 'Muttafaq Alayh',
    gradeUrdu: 'متفق علیہ (صحیح بخاری و مسلم)',
    reference: 'Sahih al-Bukhari 8',
    topics: ['اسلام کے ارکان', 'نماز', 'زکوٰۃ', 'روزہ', 'حج', 'توحید', 'pillars of islam', 'prayer', 'salah', 'zakat', 'fasting', 'ramadan', 'hajj', 'tawheed'],
  },
  {
    id: 'bukhari-13',
    bookId: 'bukhari',
    bookNameEnglish: 'Sahih al-Bukhari',
    bookNameUrdu: 'صحیح البخاری',
    hadithNumber: 13,
    chapterNumber: 2,
    chapterEnglish: 'Belief (Iman)',
    chapterUrdu: 'کتاب الایمان',
    chapterArabic: 'كتاب الإيمان',
    narratorEnglish: 'Narrated by Anas bin Malik (may Allah be pleased with him):',
    narratorUrdu: 'حضرت انس بن مالک رضی اللہ عنہ سے روایت ہے کہ نبی کریمﷺ نے فرمایا:',
    arabicText: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.',
    urduTranslation: 'تم میں سے کوئی شخص اس وقت تک کامل مومن نہیں ہو سکتا جب تک کہ وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔',
    englishTranslation: 'None of you truly believes until he loves for his brother what he loves for himself.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح (متفق علیہ)',
    reference: 'Sahih al-Bukhari 13',
    topics: ['بھائی چارہ', 'ایمان', 'محبت', 'اخلاق', 'brotherhood', 'love', 'faith', 'manners', 'compassion'],
  },
  {
    id: 'bukhari-5027',
    bookId: 'bukhari',
    bookNameEnglish: 'Sahih al-Bukhari',
    bookNameUrdu: 'صحیح البخاری',
    hadithNumber: 5027,
    chapterNumber: 66,
    chapterEnglish: 'Virtues of the Quran',
    chapterUrdu: 'کتاب فضائل القرآن',
    chapterArabic: 'كتاب فضائل القرآن',
    narratorEnglish: 'Narrated by Uthman bin Affan (may Allah be pleased with him):',
    narratorUrdu: 'حضرت عثمان غنی رضی اللہ عنہ سے روایت ہے کہ رسول اللہﷺ نے فرمایا:',
    arabicText: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.',
    urduTranslation: 'تم میں سے سب سے بہتر وہ شخص ہے جو قرآن سیکھے اور دوسروں کو سکھائے۔',
    englishTranslation: 'The best amongst you are those who learn the Quran and teach it.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح البخاری',
    reference: 'Sahih al-Bukhari 5027',
    topics: ['قرآن مجید', 'تعلیم', 'فضیلت', 'علم', 'quran', 'knowledge', 'teaching', 'learning', 'virtue'],
  },
  {
    id: 'bukhari-6018',
    bookId: 'bukhari',
    bookNameEnglish: 'Sahih al-Bukhari',
    bookNameUrdu: 'صحیح البخاری',
    hadithNumber: 6018,
    chapterNumber: 78,
    chapterEnglish: 'Good Manners and Etiquette',
    chapterUrdu: 'کتاب الأدب',
    chapterArabic: 'كتاب الأدب',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے:',
    arabicText: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ.',
    urduTranslation: 'جو شخص اللہ اور قیامت کے دن پر ایمان رکھتا ہے وہ اچھی بات کہے یا خاموش رہے، اور جو اللہ اور قیامت کے دن پر ایمان رکھتا ہے وہ اپنے پڑوسی کی عزت کرے، اور جو اللہ اور قیامت کے دن پر ایمان رکھتا ہے وہ اپنے مہمان کی عزت کرے۔',
    englishTranslation: 'Whoever believes in Allah and the Last Day should speak good or remain silent; and whoever believes in Allah and the Last Day should be hospitable to his neighbor; and whoever believes in Allah and the Last Day should entertain his guest generously.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح البخاری',
    reference: 'Sahih al-Bukhari 6018',
    topics: ['زبان کی حفاظت', 'پڑوسی کے حقوق', 'مہمان نوازی', 'خاموشی', 'speech', 'neighbor', 'guest', 'silence', 'good character'],
  },
  {
    id: 'muslim-1',
    bookId: 'muslim',
    bookNameEnglish: 'Sahih Muslim',
    bookNameUrdu: 'صحیح مسلم',
    hadithNumber: 1,
    chapterNumber: 1,
    chapterEnglish: 'The Book of Faith (Hadith Jibreel)',
    chapterUrdu: 'کتاب الایمان (حدیث جبریل)',
    chapterArabic: 'كتاب الإيمان',
    narratorEnglish: 'Narrated by Umar bin Al-Khattab (may Allah be pleased with him):',
    narratorUrdu: 'حضرت عمر بن خطاب رضی اللہ عنہ سے روایت ہے:',
    arabicText: 'قَالَ: فَأَخْبِرْنِي عَنِ الإِسْلاَمِ. قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم: الإِسْلاَمُ أَنْ تَشْهَدَ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَتُقِيمَ الصَّلاَةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلاً... قَالَ: فَأَخْبِرْنِي عَنِ الإِحْسَانِ. قَالَ: أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ فَإِنْ لَمْ تَكُنْ تَرَاهُ فَإِنَّهُ يَرَاكَ.',
    urduTranslation: 'انہوں نے پوچھا: مجھے اسلام کے متعلق بتائیے۔ رسول اللہﷺ نے فرمایا: اسلام یہ ہے کہ تم گواہی دو کہ اللہ کے سوا کوئی معبود نہیں اور محمدﷺ اللہ کے رسول ہیں، نماز قائم کرو، زکوٰۃ ادا کرو، رمضان کے روزے رکھو، اور اگر استطاعت ہو تو بیت اللہ کا حج کرو۔ پھر پوچھا: احسان کیا ہے؟ آپﷺ نے فرمایا: تم اللہ کی بندگی اس طرح کرو گویا تم اسے دیکھ رہے ہو، اگر تم اسے نہیں دیکھ سکتے تو وہ تمہیں ضرور دیکھ رہا ہے۔',
    englishTranslation: 'He said: Inform me about Islam. The Messenger of Allah (PBUH) said: Islam is that you testify that there is no god but Allah and that Muhammad is the Messenger of Allah, perform the prayer, pay the Zakat, fast during Ramadan, and make the pilgrimage to the House if you are able. He said: Inform me about Ihsan. He said: That you worship Allah as if you see Him, for even if you do not see Him, He sees you.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح مسلم',
    reference: 'Sahih Muslim 1',
    topics: ['حدیث جبریل', 'ایمان', 'اسلام', 'احسان', 'قیامت کی نشانیاں', 'hadith jibreel', 'faith', 'ihsan', 'prayer', 'worship'],
  },
  {
    id: 'muslim-55',
    bookId: 'muslim',
    bookNameEnglish: 'Sahih Muslim',
    bookNameUrdu: 'صحیح مسلم',
    hadithNumber: 55,
    chapterNumber: 1,
    chapterEnglish: 'The Book of Faith',
    chapterUrdu: 'کتاب الایمان',
    chapterArabic: 'كتاب الإيمان',
    narratorEnglish: 'Narrated by Tamim ad-Dari (may Allah be pleased with him):',
    narratorUrdu: 'حضرت تمیم داری رضی اللہ عنہ سے روایت ہے کہ نبی کریمﷺ نے فرمایا:',
    arabicText: 'الدِّينُ النَّصِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ.',
    urduTranslation: 'دین سراسر خیر خواہی کا نام ہے۔ ہم نے عرض کیا: کس کے لیے؟ آپﷺ نے فرمایا: اللہ کے لیے، اس کی کتاب کے لیے، اس کے رسول کے لیے، اور مسلمانوں کے ائمہ (رہنماؤں) اور ان کے عام لوگوں کے لیے۔',
    englishTranslation: 'Religion is sincere advice (sincerity and well-wishing). We said: To whom? He said: To Allah, His Book, His Messenger, the leaders of the Muslims, and their common people.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح مسلم',
    reference: 'Sahih Muslim 55',
    topics: ['خیر خواہی', 'نصیحت', 'اخلاص', 'رہنمائی', 'naseehah', 'sincerity', 'advice', 'community'],
  },
  {
    id: 'muslim-2564',
    bookId: 'muslim',
    bookNameEnglish: 'Sahih Muslim',
    bookNameUrdu: 'صحیح مسلم',
    hadithNumber: 2564,
    chapterNumber: 45,
    chapterEnglish: 'Virtue, Good Manners and Joining Ties of Relationship',
    chapterUrdu: 'کتاب البر والصلة والآداب',
    chapterArabic: 'كتاب البر والصلة والآداب',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہﷺ نے فرمایا:',
    arabicText: 'لاَ تَحَاسَدُوا، وَلاَ تَنَاجَشُوا، وَلاَ تَبَاغَضُوا، وَلاَ تَدَابَرُوا، وَلاَ يَبِعْ بَعْضُكُمْ عَلَى بَيْعِ بَعْضٍ، وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا. الْمُسْلِمُ أَخُو الْمُسْلِمِ: لاَ يَظْلِمُهُ، وَلاَ يَخْذُلُهُ، وَلاَ يَحْقِرُهُ. التَّقْوَى هَاهُنَا — وَيُشِيرُ إِلَى صَدْرِهِ ثَلاَثَ مَرَّاتٍ — بِحَسْبِ امْرِئٍ مِنَ الشَّرِّ أَنْ يَحْقِرَ أَخَاهُ الْمُسْلِمَ، كُلُّ الْمُسْلِمِ عَلَى الْمُسْلِمِ حَرَامٌ: دَمُهُ، وَمَالُهُ، وَعِرْضُهُ.',
    urduTranslation: 'ایک دوسرے سے حسد نہ کرو، دھوکے کی بولی نہ لگاؤ، بغض نہ رکھو، پیٹھ نہ پھیرو، اور تم میں سے کوئی دوسرے کے سودے پر سودا نہ کرے، اور اللہ کے بندے بن کر بھائی بھائی ہو جاؤ۔ مسلمان مسلمان کا بھائی ہے: نہ اس پر ظلم کرے، نہ اسے بے یار و مددگار چھوڑے، اور نہ اسے حقیر سمجھے۔ تقویٰ یہاں ہے — اور آپﷺ نے تین بار اپنے سینۂ مبارک کی طرف اشارہ فرمایا — کسی شخص کے برا ہونے کے لیے اتنا ہی کافی ہے کہ وہ اپنے مسلمان بھائی کو حقیر سمجھے۔ ہر مسلمان پر دوسرے مسلمان کا خون، اس کا مال، اور اس کی عزت و آبرو حرام ہے۔',
    englishTranslation: 'Do not envy one another, do not inflate prices by false bidding, do not hate one another, do not turn away from each other, and do not undercut each other\'s sales; but be servants of Allah, brothers. A Muslim is a brother to a Muslim: he does not oppress him, nor abandon him, nor despise him. Piety is here — pointing to his chest three times. It is enough evil for a person to hold his Muslim brother in contempt. Every Muslim is sacred to another: his blood, his wealth, and his honor.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح مسلم',
    reference: 'Sahih Muslim 2564',
    topics: ['حسد', 'بغض', 'مسلمان کے حقوق', 'تقویٰ', 'عزت و آبرو', 'envy', 'brotherhood', 'taqwa', 'honor', 'rights', 'peace'],
  },
  {
    id: 'muslim-2699',
    bookId: 'muslim',
    bookNameEnglish: 'Sahih Muslim',
    bookNameUrdu: 'صحیح مسلم',
    hadithNumber: 2699,
    chapterNumber: 48,
    chapterEnglish: 'Remembrance of Allah, Supplication, Repentance and Seeking Forgiveness',
    chapterUrdu: 'کتاب الذکر والدعاء',
    chapterArabic: 'كتاب الذكر والدعاء والتوبة والاستغفار',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہﷺ نے فرمایا:',
    arabicText: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ.',
    urduTranslation: 'جو شخص علم کی تلاش میں کسی راستے پر چلے، اللہ تعالیٰ اس کی برکت سے اس کے لیے جنت کا راستہ آسان فرما دیتا ہے۔',
    englishTranslation: 'Whoever treads a path in search of knowledge, Allah will make easy for him the path to Paradise.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح مسلم',
    reference: 'Sahih Muslim 2699',
    topics: ['طلب علم', 'جنت', 'فضیلت علم', 'ہدایت', 'knowledge', 'paradise', 'jannah', 'learning', 'reward'],
  },
  {
    id: 'tirmidhi-1987',
    bookId: 'tirmidhi',
    bookNameEnglish: 'Jami` at-Tirmidhi',
    bookNameUrdu: 'جامع الترمذی',
    hadithNumber: 1987,
    chapterNumber: 27,
    chapterEnglish: 'Righteousness and Relations',
    chapterUrdu: 'کتاب البر والصلۃ',
    chapterArabic: 'كتاب البر والصلة عن رسول الله صلى الله عليه وسلم',
    narratorEnglish: 'Narrated by Abu Dharr and Mu\'adh bin Jabal (may Allah be pleased with them):',
    narratorUrdu: 'حضرت ابو ذر اور معاذ بن جبل رضی اللہ عنہما سے روایت ہے:',
    arabicText: 'اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ.',
    urduTranslation: 'تم جہاں کہیں بھی ہو اللہ سے ڈرو، اور گناہ کے بعد فوراً نیکی کرو جو اسے مٹا دے، اور لوگوں کے ساتھ اچھے اخلاق کے ساتھ پیش آؤ۔',
    englishTranslation: 'Fear Allah wherever you may be, follow up an evil deed with a good deed which will wipe it out, and behave with people with good character.',
    grade: 'Hasan',
    gradeUrdu: 'حدیث حسن (جامع الترمذی)',
    reference: 'Jami` at-Tirmidhi 1987',
    topics: ['تقویٰ', 'حسن اخلاق', 'توبہ', 'نیکیاں', 'taqwa', 'good character', 'repentance', 'kindness'],
  },
  {
    id: 'tirmidhi-2308',
    bookId: 'tirmidhi',
    bookNameEnglish: 'Jami` at-Tirmidhi',
    bookNameUrdu: 'جامع الترمذی',
    hadithNumber: 2308,
    chapterNumber: 36,
    chapterEnglish: 'Virtues',
    chapterUrdu: 'کتاب المناقب',
    chapterArabic: 'كتاب المناقب',
    narratorEnglish: 'Narrated by Aisha (may Allah be pleased with her):',
    narratorUrdu: 'ام المؤمنین حضرت عائشہ رضی اللہ عنہا سے روایت ہے کہ رسول اللہﷺ نے فرمایا:',
    arabicText: 'خَيْرُكُمْ خَيْرُكُمْ لأَهْلِهِ وَأَنَا خَيْرُكُمْ لأَهْلِي.',
    urduTranslation: 'تم میں سب سے بہترین وہ ہے جو اپنے اہل و عیال (گھر والوں) کے حق میں سب سے بہتر ہو، اور میں اپنے گھر والوں کے حق میں تم سب سے زیادہ بہتر ہوں۔',
    englishTranslation: 'The best of you is the one who is best to his family, and I am the best among you to my family.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح (جامع الترمذی)',
    reference: 'Jami` at-Tirmidhi 2308',
    topics: ['گھر والے', 'بیوی کے حقوق', 'حسن سلوک', 'معاشرت', 'family', 'wife', 'marriage', 'kindness', 'manners'],
  },
  {
    id: 'abudawud-4941',
    bookId: 'abudawud',
    bookNameEnglish: 'Sunan Abi Dawud',
    bookNameUrdu: 'سنن ابی داؤد',
    hadithNumber: 4941,
    chapterNumber: 43,
    chapterEnglish: 'General Behavior (Kitab al-Adab)',
    chapterUrdu: 'کتاب الأدب',
    chapterArabic: 'كتاب الأدب',
    narratorEnglish: 'Narrated by Abdullah bin Amr (may Allah be pleased with him):',
    narratorUrdu: 'حضرت عبداللہ بن عمرو رضی اللہ عنہما سے روایت ہے:',
    arabicText: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ، وَالْمُهَاجِرُ مَنْ هَجَرَ مَا نَهَى اللَّهُ عَنْهُ.',
    urduTranslation: 'مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں، اور مہاجر وہ ہے جو ان کاموں کو چھوڑ دے جن سے اللہ تعالیٰ نے منع فرمایا ہے۔',
    englishTranslation: 'A Muslim is the one from whose tongue and hands other Muslims are safe, and an emigrant (Muhajir) is the one who abandons what Allah has forbidden.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح (سنن ابی داؤد و بخاری)',
    reference: 'Sunan Abi Dawud 4941',
    topics: ['مسلمان کی تعریف', 'امن و سلامتی', 'زبان کی حفاظت', 'ہجرت', 'muslim', 'peace', 'harm', 'tongue', 'safety'],
  },
  {
    id: 'nasai-5005',
    bookId: 'nasai',
    bookNameEnglish: 'Sunan an-Nasa\'i',
    bookNameUrdu: 'سنن النسائی',
    hadithNumber: 5005,
    chapterNumber: 47,
    chapterEnglish: 'Faith and its Signs',
    chapterUrdu: 'کتاب الایمان وشرائعہ',
    chapterArabic: 'كتاب الإيمان وشرائعه',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ نبی کریمﷺ نے فرمایا:',
    arabicText: 'الْمُؤْمِنُ مَنْ أَمِنَهُ النَّاسُ عَلَى أَمْوَالِهِمْ وَأَنْفُسِهِمْ.',
    urduTranslation: 'مومن وہ ہے جس سے لوگ اپنی جانوں اور اپنے مالوں کے بارے میں امن اور اطمینان میں ہوں۔',
    englishTranslation: 'The true believer is the one with whom people feel secure regarding their wealth and their lives.',
    grade: 'Sahih',
    gradeUrdu: 'صحیح (سنن النسائی)',
    reference: 'Sunan an-Nasa\'i 5005',
    topics: ['مومن کی صفات', 'امانت', 'امن', 'سلامتی', 'believer', 'security', 'trust', 'safety'],
  },
  {
    id: 'ibnmajah-224',
    bookId: 'ibnmajah',
    bookNameEnglish: 'Sunan Ibn Majah',
    bookNameUrdu: 'سنن ابن ماجہ',
    hadithNumber: 224,
    chapterNumber: 1,
    chapterEnglish: 'The Book of the Sunnah (Virtues of Knowledge)',
    chapterUrdu: 'کتاب افتتاح الکتاب فی الإیمان وفضائل الصحابۃ والعلم',
    chapterArabic: 'كتاب السنة',
    narratorEnglish: 'Narrated by Anas bin Malik (may Allah be pleased with him):',
    narratorUrdu: 'حضرت انس بن مالک رضی اللہ عنہ سے روایت ہے کہ رسول اللہﷺ نے فرمایا:',
    arabicText: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ.',
    urduTranslation: 'علم حاصل کرنا ہر مسلمان پر فرض ہے۔',
    englishTranslation: 'Seeking knowledge is an obligation upon every Muslim.',
    grade: 'Authentic',
    gradeUrdu: 'صحیح بشواہدہ (سنن ابن ماجہ)',
    reference: 'Sunan Ibn Majah 224',
    topics: ['طلب علم', 'فرضیت علم', 'تعلیم', 'ہدایت', 'knowledge', 'obligation', 'education', 'seeking knowledge'],
  },
  {
    id: 'nawawi40-12',
    bookId: 'nawawi40',
    bookNameEnglish: '40 Hadith an-Nawawi',
    bookNameUrdu: 'الاربعین النواویۃ',
    hadithNumber: 12,
    chapterEnglish: 'Leaving What Does Not Concern You',
    chapterUrdu: 'لایعنی باتوں سے پرہیز',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہﷺ نے فرمایا:',
    arabicText: 'مِنْ حُسْنِ إِسْلاَمِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ.',
    urduTranslation: 'انسان کے اسلام کی خوبی اور حسن یہ ہے کہ وہ فضول اور لا یعنی باتوں کو چھوڑ دے۔',
    englishTranslation: 'Part of the perfection of a person\'s Islam is his leaving that which does not concern him.',
    grade: 'Sahih',
    gradeUrdu: 'حدیث حسن (جامع الترمذی و ابن ماجہ)',
    reference: '40 Hadith an-Nawawi 12',
    topics: ['وقت کی قدر', 'فضول گوئی سے پرہیز', 'حسن اسلام', 'اخلاق', 'mindfulness', 'speech', 'islam', 'manners'],
  },
  {
    id: 'nawawi40-16',
    bookId: 'nawawi40',
    bookNameEnglish: '40 Hadith an-Nawawi',
    bookNameUrdu: 'الاربعین النواویۃ',
    hadithNumber: 16,
    chapterEnglish: 'Controlling Anger',
    chapterUrdu: 'غصے پر قابو پانا',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ ایک شخص نے نبی کریمﷺ سے عرض کیا مجھے وصیت فرمائیے:',
    arabicText: 'أَنَّ رَجُلاً قَالَ لِلنَّبِيِّ صلى الله عليه وسلم: أَوْصِنِي. قَالَ: لاَ تَغْضَبْ. فَرَدَّدَ مِرَارًا، قَالَ: لاَ تَغْضَبْ.',
    urduTranslation: 'ایک شخص نے نبی کریمﷺ سے عرض کیا کہ مجھے کوئی وصیت فرمائیے۔ آپﷺ نے فرمایا: غصہ نہ کیا کرو۔ اس نے بار بار یہی سوال دہرایا، آپﷺ نے ہر بار یہی فرمایا: غصہ نہ کیا کرو۔',
    englishTranslation: 'A man said to the Prophet (PBUH): "Advise me." The Prophet said: "Do not get angry." The man repeated his request several times, and each time the Prophet said: "Do not get angry."',
    grade: 'Sahih',
    gradeUrdu: 'صحیح البخاری',
    reference: '40 Hadith an-Nawawi 16 / Sahih al-Bukhari 6116',
    topics: ['غصہ', 'صبر', 'تحمل', 'حلم', 'anger', 'patience', 'self-control', 'temperance'],
  },
  {
    id: 'riyad-59',
    bookId: 'riyad',
    bookNameEnglish: 'Riyad as-Salihin',
    bookNameUrdu: 'ریاض الصالحین',
    hadithNumber: 59,
    chapterEnglish: 'Kindness to Parents and Upholding Family Ties',
    chapterUrdu: 'باب بر الوالدين وصلة الأرحام',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے:',
    arabicText: 'جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صلى الله عليه وسلم فَقَالَ: يَا رَسُولَ اللَّهِ، مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: أُمُّكَ. قَالَ: ثُمَّ مَنْ؟ قَالَ: أَبُوكَ.',
    urduTranslation: 'ایک شخص رسول اللہﷺ کی خدمت میں حاضر ہوا اور عرض کیا: یا رسول اللہ! میرے اچھے سلوک کا سب سے زیادہ حق دار کون ہے؟ آپﷺ نے فرمایا: تمہاری ماں۔ اس نے پوچھا: پھر کون؟ فرمایا: تمہاری ماں۔ اس نے پوچھا: پھر کون؟ فرمایا: تمہاری ماں۔ اس نے پوچھا: پھر کون؟ فرمایا: تمہارا باپ۔',
    englishTranslation: 'A man came to Allah\'s Messenger and said: "O Messenger of Allah! Who from amongst mankind warrants the best companionship from me?" He replied: "Your mother." The man said: "Then who?" He replied: "Your mother." The man said: "Then who?" He replied: "Your mother." The man said: "Then who?" He replied: "Your father."',
    grade: 'Sahih',
    gradeUrdu: 'متفق علیہ (بخاری و مسلم)',
    reference: 'Riyad as-Salihin 59 / Sahih al-Bukhari 5971',
    topics: ['ماں باپ کے حقوق', 'والدین', 'ماں کی عظمت', 'حسن سلوک', 'parents', 'mother', 'father', 'kindness', 'family'],
  },
  {
    id: 'qudsi-1',
    bookId: 'qudsi',
    bookNameEnglish: 'Hadith Qudsi',
    bookNameUrdu: 'احادیث قدسیہ',
    hadithNumber: 1,
    chapterEnglish: 'The Vastness of Allah\'s Mercy',
    chapterUrdu: 'رحمت الٰہی کی وسعت',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہﷺ نے فرمایا کہ اللہ تعالیٰ نے فرمایا:',
    arabicText: 'لَمَّا قَضَى اللَّهُ الْخَلْقَ كَتَبَ فِي كِتَابِهِ فَهُوَ عِنْدَهُ فَوْقَ الْعَرْشِ: إِنَّ رَحْمَتِي غَلَبَتْ غَضَبِي.',
    urduTranslation: 'جب اللہ تعالیٰ نے مخلوق کو پیدا فرمایا تو اپنی کتاب میں جو اس کے پاس عرش پر لکھی ہوئی ہے یہ تحریر فرمایا: بے شک میری رحمت میرے غضب پر غالب ہے۔',
    englishTranslation: 'When Allah decreed the Creation He pledged Himself by writing in His book which is laid down with Him: Truly My mercy prevails over My wrath.',
    grade: 'Sahih',
    gradeUrdu: 'متفق علیہ (بخاری و مسلم)',
    reference: 'Hadith Qudsi 1 / Sahih al-Bukhari 3194',
    topics: ['رحمت الٰہی', 'مغفرت', 'اللہ کی بخشش', 'mercy', 'forgiveness', 'grace', 'divine love'],
  },
  {
    id: 'qudsi-4',
    bookId: 'qudsi',
    bookNameEnglish: 'Hadith Qudsi',
    bookNameUrdu: 'احادیث قدسیہ',
    hadithNumber: 4,
    chapterEnglish: 'Spending in Charity',
    chapterUrdu: 'راہ خدا میں خرچ کرنا',
    narratorEnglish: 'Narrated by Abu Hurairah (may Allah be pleased with him):',
    narratorUrdu: 'حضرت ابو ہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہﷺ نے فرمایا کہ اللہ تبارک و تعالیٰ کا ارشاد ہے:',
    arabicText: 'قَالَ اللَّهُ تَبَارَكَ وَتَعَالَى: يَا ابْنَ آدَمَ أَنْفِقْ أُنْفِقْ عَلَيْكَ.',
    urduTranslation: 'اللہ تبارک و تعالیٰ نے فرمایا: اے ابن آدم! تو (میری راہ میں) خرچ کر، میں تجھ پر خرچ کروں گا۔',
    englishTranslation: 'Allah the Almighty says: "O son of Adam, spend (in charity), and I shall spend upon you."',
    grade: 'Sahih',
    gradeUrdu: 'متفق علیہ (بخاری و مسلم)',
    reference: 'Hadith Qudsi 4 / Sahih al-Bukhari 5352',
    topics: ['صدقہ', 'خیرات', 'انفاق فی سبیل اللہ', 'رزق', 'charity', 'spending', 'wealth', 'rizq', 'provision'],
  },
];

// Offline Local Storage & Cache Helper Keys
const HADITH_OFFLINE_STORAGE_KEY = 'hadith_offline_books_v1';
const HADITH_BOOKMARKS_STORAGE_KEY = 'hadith_bookmarks_v1';

// Open-source Free API CDN endpoints for complete editions
// Host: jsdelivr mirror of fawazahmed0/hadith-api (Public Domain / Open Source)
export const OPEN_SOURCE_HADITH_CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions';

// Map book ID to fawaz ahmed edition slugs
export const BOOK_EDITION_MAP: Record<string, { urdu: string; eng: string; ara: string }> = {
  bukhari: { urdu: 'urd-bukhari', eng: 'eng-bukhari', ara: 'ara-bukhari' },
  muslim: { urdu: 'urd-muslim', eng: 'eng-muslim', ara: 'ara-muslim' },
  tirmidhi: { urdu: 'urd-tirmidhi', eng: 'eng-tirmidhi', ara: 'ara-tirmidhi' },
  abudawud: { urdu: 'urd-abudawud', eng: 'eng-abudawud', ara: 'ara-abudawud' },
  nasai: { urdu: 'urd-nasai', eng: 'eng-nasai', ara: 'ara-nasai' },
  ibnmajah: { urdu: 'urd-ibnmajah', eng: 'eng-ibnmajah', ara: 'ara-ibnmajah' },
  nawawi40: { urdu: 'urd-nawawi40', eng: 'eng-nawawi40', ara: 'ara-nawawi40' },
  riyad: { urdu: 'urd-riyad', eng: 'eng-riyad', ara: 'ara-riyad' },
};

/**
 * Normalizes Urdu & Arabic text for flexible search (ignoring tashkeel, standardizing yaa, heh, etc.)
 */
export function normalizeSearchQuery(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // remove Arabic tashkeel / harakat
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // normalize Arabic/Urdu yeh
    .replace(/[يىے]/g, 'ی')
    // normalize heh / taa marbuta
    .replace(/[ةہھ]/g, 'ہ')
    // normalize kaf
    .replace(/[ك]/g, 'ک')
    // remove punctuation
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()؟؛،]/g, ' ')
    .trim();
}

/**
 * Searches local and cached Hadiths by keyword across Urdu, English, and Arabic
 */
export function searchHadiths(
  query: string,
  bookId?: string,
  allHadiths: HadithItem[] = CORE_HADITHS
): HadithItem[] {
  const cleanQ = normalizeSearchQuery(query);
  if (!cleanQ) {
    if (bookId && bookId !== 'all') {
      return allHadiths.filter(h => h.bookId === bookId);
    }
    return allHadiths;
  }

  return allHadiths.filter(h => {
    if (bookId && bookId !== 'all' && h.bookId !== bookId) {
      return false;
    }

    const normUrdu = normalizeSearchQuery(h.urduTranslation);
    const normEng = (h.englishTranslation || '').toLowerCase();
    const normAra = normalizeSearchQuery(h.arabicText);
    const normNarratorUrd = normalizeSearchQuery(h.narratorUrdu);
    const normNarratorEng = (h.narratorEnglish || '').toLowerCase();
    const normTopics = (h.topics || []).map(t => normalizeSearchQuery(t)).join(' ');

    return (
      normUrdu.includes(cleanQ) ||
      normEng.includes(cleanQ) ||
      normAra.includes(cleanQ) ||
      normNarratorUrd.includes(cleanQ) ||
      normNarratorEng.includes(cleanQ) ||
      normTopics.includes(cleanQ) ||
      h.hadithNumber.toString() === cleanQ
    );
  });
}

/**
 * Retrieves a Hadith by specific number in a chosen book
 */
export function findHadithByNumber(
  bookId: string,
  hadithNumber: number,
  allHadiths: HadithItem[] = CORE_HADITHS
): HadithItem | undefined {
  return allHadiths.find(
    h => h.bookId === bookId && h.hadithNumber === hadithNumber
  );
}

/**
 * Fetches an arbitrary Hadith from open source CDN if not in local store
 */
export async function fetchOnlineHadith(
  bookId: string,
  hadithNumber: number
): Promise<HadithItem | null> {
  const edition = BOOK_EDITION_MAP[bookId];
  if (!edition) return null;

  try {
    // Attempt fetching English, Urdu, and Arabic in parallel from open source cdn
    const [engRes, urdRes, araRes] = await Promise.allSettled([
      fetch(`${OPEN_SOURCE_HADITH_CDN}/${edition.eng}/${hadithNumber}.json`),
      fetch(`${OPEN_SOURCE_HADITH_CDN}/${edition.urdu}/${hadithNumber}.json`),
      fetch(`${OPEN_SOURCE_HADITH_CDN}/${edition.ara}/${hadithNumber}.json`),
    ]);

    let englishText = '';
    let urduText = '';
    let arabicText = '';
    let bookMeta = HADITH_BOOKS.find(b => b.id === bookId);

    if (engRes.status === 'fulfilled' && engRes.value.ok) {
      const data = await engRes.value.json();
      englishText = data?.hadiths?.[0]?.text || data?.text || '';
    }

    if (urdRes.status === 'fulfilled' && urdRes.value.ok) {
      const data = await urdRes.value.json();
      urduText = data?.hadiths?.[0]?.text || data?.text || '';
    }

    if (araRes.status === 'fulfilled' && araRes.value.ok) {
      const data = await araRes.value.json();
      arabicText = data?.hadiths?.[0]?.text || data?.text || '';
    }

    if (!arabicText && !urduText && !englishText) {
      return null;
    }

    const fetchedItem: HadithItem = {
      id: `${bookId}-${hadithNumber}`,
      bookId,
      bookNameEnglish: bookMeta?.titleEnglish || bookId,
      bookNameUrdu: bookMeta?.titleUrdu || bookId,
      hadithNumber,
      narratorEnglish: 'Narrated in canonical collection:',
      narratorUrdu: 'کتب حدیث کی سند سے مروی ہے:',
      arabicText: arabicText || 'النص العربي متوفر في النسخة الكاملة.',
      urduTranslation: urduText || 'اردو ترجمہ لوڈ کیا جا رہا ہے۔',
      englishTranslation: englishText || 'English translation loaded from open source edition.',
      grade: 'Authentic',
      gradeUrdu: 'مستند حدیث',
      reference: `${bookMeta?.titleEnglish || bookId} #${hadithNumber}`,
      topics: [bookId, `hadith ${hadithNumber}`],
    };

    return fetchedItem;
  } catch (err) {
    console.warn('Hadith live fetch error:', err);
    return null;
  }
}

/**
 * Storage helpers for Offline Full Books
 */
export function getSavedOfflineBooks(): Record<string, HadithItem[]> {
  try {
    const raw = localStorage.getItem(HADITH_OFFLINE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveOfflineBook(bookId: string, hadiths: HadithItem[]): void {
  try {
    const current = getSavedOfflineBooks();
    current[bookId] = hadiths;
    localStorage.setItem(HADITH_OFFLINE_STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save hadith book to offline store:', e);
  }
}

export function isBookDownloadedOffline(bookId: string): boolean {
  const all = getSavedOfflineBooks();
  return !!(all[bookId] && all[bookId].length > 0);
}

/**
 * Bookmarks management
 */
export function getHadithBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(HADITH_BOOKMARKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleHadithBookmark(hadithId: string): boolean {
  try {
    const bookmarks = getHadithBookmarks();
    const index = bookmarks.indexOf(hadithId);
    let updated: string[];
    let isBookmarked: boolean;

    if (index >= 0) {
      updated = bookmarks.filter(id => id !== hadithId);
      isBookmarked = false;
    } else {
      updated = [...bookmarks, hadithId];
      isBookmarked = true;
    }

    localStorage.setItem(HADITH_BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    return isBookmarked;
  } catch {
    return false;
  }
}

/**
 * Download Whole Book file generator: triggers browser download as JSON or readable TXT
 */
export function triggerBookFileDownload(
  bookMeta: HadithBookMeta,
  hadiths: HadithItem[],
  format: 'json' | 'txt' = 'json'
) {
  let content = '';
  let mimeType = '';
  let fileName = '';

  if (format === 'json') {
    content = JSON.stringify(
      {
        bookInfo: {
          titleEnglish: bookMeta.titleEnglish,
          titleUrdu: bookMeta.titleUrdu,
          titleArabic: bookMeta.titleArabic,
          author: bookMeta.author,
          authorUrdu: bookMeta.authorUrdu,
          hadithCount: hadiths.length,
          license: 'Open Source / Public Domain Canonical Islamic Heritage',
          exportedAt: new Date().toISOString(),
        },
        hadiths,
      },
      null,
      2
    );
    mimeType = 'application/json';
    fileName = `${bookMeta.id}_complete_hadiths.json`;
  } else {
    // Beautiful human-readable text file
    const header = `==========================================================\n${bookMeta.titleEnglish} (${bookMeta.titleArabic})\n${bookMeta.titleUrdu} - ${bookMeta.authorUrdu}\nOpen Source Islamic Hadith Library (Urdu & English)\nTotal Hadiths in this file: ${hadiths.length}\n==========================================================\n\n`;

    const body = hadiths
      .map(
        h =>
          `----------------------------------------------------------\n` +
          `[#${h.hadithNumber}] ${h.reference} | Grade: ${h.grade} (${h.gradeUrdu})\n` +
          (h.chapterEnglish ? `Chapter: ${h.chapterEnglish} / ${h.chapterUrdu || ''}\n` : '') +
          `\n--- Arabic ---\n${h.arabicText}\n` +
          `\n--- اردو ترجمہ ---\n${h.urduTranslation}\n` +
          `\n--- English Translation ---\n${h.englishTranslation}\n`
      )
      .join('\n');

    content = header + body;
    mimeType = 'text/plain;charset=utf-8';
    fileName = `${bookMeta.id}_complete_hadiths.txt`;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
