import {
  ISLAMIC_STORIES_DATA,
  IslamicStoryItem,
  StoryCategory,
  USER_UPLOADED_STORY_VIDEO,
  USER_UPLOADED_STORY_AUDIO,
  enrichStoryWithAuthenticMedia,
} from './islamicStoriesData';

export type { IslamicStoryItem, StoryCategory };

// Auxiliary dataset bringing the total indexed story library to 115+ authentic Islamic stories
const ADDITIONAL_STORIES: IslamicStoryItem[] = [
  // Additional Nabis
  {
    id: 'prophet-sheeth',
    nameEnglish: 'Prophet Sheeth (AS) (Seth) - The Gift of Adam (AS)',
    nameUrdu: 'حضرت شیث علیہ السلام - ہابیل کے بدلے میں عطیہِ ربانی',
    arabicName: 'شِيثُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Second Prophet of Mankind & Righteous Heir of Adam (AS)',
    urduTitle: 'ہابیل کی شہادت کے بعد حضرت آدم کو ملنے والا پاکیزہ فرزند',
    shortBio: 'Granted to Adam after Abel\'s martyrdom; received 50 divine scriptures (Suhuf); established civil society and the earliest worship ceremonies.',
    urduBio: 'پچاس آسمانی صحیفے نازل ہوئے، اللہ کی شریعت اور عبادات کا نظام مرتب کیا، انسانیت کے دوسرے مرشد۔',
    fullStory: `Prophet Sheeth (AS), whose name means "Gift of Allah", was born to Prophet Adam and Hawwa five years after the tragic murder of Abel (Habil) by Cain (Qabil). Adam named him Sheeth because he was a divine compensation for righteous Abel.

Adam bequeathed his spiritual testament and leadership to Sheeth before passing away. Allah revealed 50 divine scrolls (Suhuf) to Sheeth containing laws, moral guidelines, and instructions on funeral rites and regular congregational prayers. He guided humanity with patience and wisdom, maintaining the lineage through which all subsequent prophets arose.`,
    keyEvents: ['Birth as a gift of consolation to Adam and Hawwa', 'Reception of 50 divine scrolls', 'Formulating the early sacred burial rites'],
    moralLesson: 'Allah replaces every heartbreaking loss with a greater spiritual blessing if one remains patient.',
    quranOrHadithRef: 'Ibn Kathir, Al-Bidayah wan-Nihayah; Sahih Ibn Hibban',
    audio: {
      title: 'Hazrat Sheeth (AS) Life Story',
      speaker: 'Chronicles of Prophets',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '18:20'
    },
    video: {
      title: 'Hazrat Sheeth (AS) Documentary',
      speaker: 'Islamic History',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'Hazrat Sheeth AS story Urdu',
      durationFormatted: '15:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-yusha',
    nameEnglish: 'Prophet Yusha ibn Nun (AS) (Joshua) - The Sun Stopped in Its Course',
    nameUrdu: 'حضرت یوشع بن نون علیہ السلام - سورج کو روکنے والے فاتحِ اریحا',
    arabicName: 'يُوشَعُ بْنُ نُونٍ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Companion of Musa (AS) & Conqueror of the Holy Land (Jerusalem / Jericho)',
    urduTitle: 'حضرت موسیٰ کے خادم، جن کے لیے جمعہ کے دن غروب ہوتا سورج آسمان میں رک گیا',
    shortBio: 'Appointed leader after Musa (AS); led the new generation of Bani Israel into the Promised Land; by Allah\'s command, the sun halted until victory was achieved.',
    urduBio: 'موسیٰ علیہ السلام کی وفات کے بعد بنی اسرائیل کو فتح دلائی، سورج کو حکم دیا: "تو بھی مامور ہے اور میں بھی مامور ہوں، اے اللہ اسے روک دے"۔',
    fullStory: `Prophet Yusha ibn Nun (AS) was the devoted companion of Prophet Musa (AS), accompanying him on the journey to meet Al-Khidr. Following the 40 years of wandering in the Sinai desert and the passing of Musa and Harun, Yusha led the new generation of believers toward the Holy Land.

During the siege of Jericho on a Friday evening, as sunset approached which would inaugurate the sacred Sabbath where fighting was prohibited, Yusha looked up at the setting sun and prayed: "You are commanded by Allah and I am commanded by Allah; O Allah, hold back the sun from setting!" Allah miraculously arrested the motion of the sun until the fortress surrendered and the believers entered in triumph.`,
    keyEvents: ['Accompanied Musa on the search for Al-Khidr', 'Conquest of Jericho and entry into the Promised Land', 'The miracle of halting the sun as recorded in Sahih Muslim'],
    moralLesson: 'Cosmic laws yield to sincere believers who fight solely for the justice and glory of Allah.',
    quranOrHadithRef: 'Surah Al-Kahf 18:60; Sahih Muslim 1747; Musnad Ahmad',
    audio: {
      title: 'Hazrat Yusha ibn Nun (AS) Life & Sun Miracle',
      speaker: 'Prophetic Studies',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '24:15'
    },
    video: {
      title: 'Joshua & The Miracle of the Sun',
      speaker: 'Quranic Stories Series',
      youtubeQuery: 'Hazrat Yusha bin Noon story Urdu',
      durationFormatted: '21:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-uzair',
    nameEnglish: 'Prophet Uzair (AS) (Ezra) - The 100-Year Slumber & Resurrection',
    nameUrdu: 'حضرت عزیر علیہ السلام - سو سال بعد زندہ کیے جانے کا معجزہ',
    arabicName: 'عُزَيْرٌ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Prophet Resurrected to Re-teach the Torah to Bani Israel',
    urduTitle: 'ویران بستی پر گزرے، سو سال موت کی نیند سوئے اور گدھے کو ہڈیوں سے دوبارہ بنتے دیکھا',
    shortBio: 'Passed by the ruins of Jerusalem, wondered how it could be revived; Allah caused him to die for 100 years, then resurrected him while his food remained fresh.',
    urduBio: 'سو سال بعد جاگے تو انجیر اور جوس ویسا ہی تازہ تھا جبکہ گدھے کی ہڈیاں بکھری تھیں، اللہ کے حکم سے ہڈیاں گوشت پوست کے ساتھ زندہ ہوئیں۔',
    fullStory: `Surah Al-Baqarah (2:259) relates the historical sign of the one who passed by a city in ruins, identified in classical commentary as Prophet Uzair (AS). Following Nebuchadnezzar's destruction of Jerusalem, Uzair saw the collapsed roofs and whispered in awe: "How will Allah bring this to life after its death?"

Allah caused him to die for 100 years. When Allah resurrected him, an angel asked: "How long have you remained?" He replied: "A day or part of a day." The angel said: "Rather, you have remained one hundred years. Look at your food and your drink; it has not spoiled. And look at your donkey... look at the bones, how We raise them and then cover them with flesh!" Uzair witnessed the donkey's bones assembling before his eyes and exclaimed: "I know that Allah is over all things competent!" He returned to Jerusalem and re-dictated the entire lost Torah from heart.`,
    keyEvents: ['Pondering over the ruins of Jerusalem', 'The 100-year death and preservation of fresh food', 'Witnessing the resurrection of the donkey', 'Restoring the Torah to the returned exiles'],
    moralLesson: 'Resurrection on the Day of Judgment is as effortless for Allah as waking from an afternoon nap.',
    quranOrHadithRef: 'Surah Al-Baqarah 2:259; Surah At-Tawbah 9:30',
    audio: {
      title: 'Hazrat Uzair (AS) & The 100 Years Sleep',
      speaker: 'Tafseer Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '26:50'
    },
    video: {
      title: 'The 100 Year Miracle: Prophet Uzair',
      speaker: 'Quranic Archaeology',
      youtubeQuery: 'Hazrat Uzair AS story Urdu',
      durationFormatted: '22:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },

  // Additional Prominent Sahaba
  {
    id: 'talha-ibn-ubaydullah',
    nameEnglish: 'Hazrat Talha ibn Ubaydullah (RA) - The Living Martyr of Uhud',
    nameUrdu: 'حضرت طلحہ بن عبید اللہ (رض) - طلحۃ الخیر اور احد کے زندہ شہید',
    arabicName: 'طَلْحَةُ بْنُ عُبَيْدِ اللَّهِ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Ashara Mubashara & The Shield of the Prophet ﷺ at Uhud',
    urduTitle: 'احد میں رسول اللہ ﷺ کے چہرے کی حفاظت میں ہاتھ مفلوج کروایا، ۳۵ زخم کھائے',
    shortBio: 'One of the ten guaranteed Paradise; deflected deadly arrows with his bare hands at Uhud until his hand became paralyzed; praised by the Prophet as a "Living Martyr walking on earth".',
    urduBio: 'رسول اللہ ﷺ نے فرمایا: "جس نے زمین پر چلتا ہوا شہید دیکھنا ہو، وہ طلحہ کو دیکھ لے"۔',
    fullStory: `Hazrat Talha ibn Ubaydullah (RA) was among the earliest converts through Abu Bakr. At the Battle of Uhud, when the enemy archers aimed directly at the face of the Prophet Muhammad ﷺ, Talha threw himself in front of the Prophet, shielding him with his body and using his bare hands to deflect arrows.

One arrow struck his right hand, severing the tendons and permanently paralyzing it. He sustained over 35 deep cuts and spear wounds on his chest and face, yet he lifted the wounded Prophet ﷺ upon his back and carried him up the rocky slopes of Mount Uhud. The Prophet ﷺ declared: "Talha has earned Paradise! Whoever wishes to see a martyr walking upon the face of the earth, let him look at Talha ibn Ubaydullah!" (Tirmidhi). He was also known as Talhat al-Khayr for his legendary generosity in funding destitute families.`,
    keyEvents: ['Converting at the dawn of Islam', 'Paralyzing his hand while deflecting arrows at Uhud', 'Carrying the Prophet up the mountain to safety', 'Conferred the title "Living Martyr" (Shahidun Yamshi ala al-Ard)'],
    moralLesson: 'True love for the Prophet ﷺ is measured by what one is willing to sacrifice when danger looms.',
    quranOrHadithRef: 'Jami\' at-Tirmidhi 3738; Sahih Bukhari 3724',
    audio: {
      title: 'Hazrat Talha ibn Ubaydullah (RA) Living Martyr',
      speaker: 'Ashara Mubashara Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '31:20'
    },
    video: {
      title: 'The Living Martyr: Talha ibn Ubaydullah',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Talha bin Ubaidullah story Urdu',
      durationFormatted: '25:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'zubayr-ibn-al-awwam',
    nameEnglish: 'Hazrat Az-Zubayr ibn Al-Awwam (RA) - The Disciple (Hawari) of the Prophet',
    nameUrdu: 'حضرت زبیر بن العوام (رض) - حواریِ رسول ﷺ اور پہلے شمشیر زن',
    arabicName: 'الزُّبَيْرُ بْنُ الْعَوَّامِ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Hawari ar-Rasool, Ashara Mubashara & Nephew of Hazrat Khadijah (RA)',
    urduTitle: 'اسلام میں سب سے پہلی تلوار سونتنے والے، احد و خندق کے بہادر شہسوار',
    shortBio: 'Accepted Islam at age 15; first to draw a sword for Islam in Mecca; cousin of the Prophet ﷺ; given the title "Every prophet has a disciple (Hawari), and my disciple is Az-Zubayr."',
    urduBio: 'پندرہ سال کی عمر میں اسلام لائے، رسول اللہ ﷺ نے فرمایا: "ہر نبی کا ایک حواری ہوتا ہے اور میرا حواری زبیر ہے"۔',
    fullStory: `Hazrat Az-Zubayr ibn Al-Awwam (RA) was the son of Safiyyah bint Abdul Muttalib (aunt of the Prophet) and nephew of Hazrat Khadijah (RA). When he was only 15 in Mecca, a false rumor circulated that the Prophet ﷺ had been captured and killed. Young Zubayr unsheathed his sword and dashed through the streets until he reached the Prophet. The Prophet smiled and asked what he intended to do; Zubayr replied: "I was going to strike the necks of all Mecca!" The Prophet made supplication for him and his sword.

During the Battle of the Trench, when intelligence was desperately needed regarding the treacherous Jewish tribe of Banu Qurayza, the Prophet asked: "Who will bring news of the enemy?" Zubayr volunteered. The Prophet asked again, and Zubayr volunteered again. The Prophet ﷺ declared: "Every prophet has a Hawari (disciple), and my Hawari is Az-Zubayr!" (Sahih Bukhari). He fought at Yarmouk, single-handedly piercing through the Roman battle lines twice.`,
    keyEvents: ['Drawing the first sword in the history of Islam', 'Heroic volunteer reconnaissance at the Battle of the Trench', 'Given the immortal title of Hawari ar-Rasool', 'Scaling the fortress of Babylon in Egypt during the opening of Africa'],
    moralLesson: 'Unhesitating initiative in times of communal peril is the mark of true spiritual discipleship.',
    quranOrHadithRef: 'Sahih Bukhari 2846, 3719; Sahih Muslim 2415',
    audio: {
      title: 'Hazrat Zubayr ibn al-Awwam (RA) Hawari of the Prophet',
      speaker: 'Sahaba Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '32:45'
    },
    video: {
      title: 'The Disciple of the Prophet: Zubayr ibn al-Awwam',
      speaker: 'Islamic Heritage',
      youtubeQuery: 'Hazrat Zubair bin Awwam story Urdu',
      durationFormatted: '27:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'abdur-rahman-ibn-awf',
    nameEnglish: 'Hazrat Abdur-Rahman ibn Awf (RA) - The Blessed Merchant of Paradise',
    nameUrdu: 'حضرت عبد الرحمن بن عوف (رض) - عشرہ مبشرہ اور تاجرِ جنت',
    arabicName: 'عَبْدُ الرَّحْمَنِ بْنُ عَوْفٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Ashara Mubashara & The Titan of Generosity in Madinah',
    urduTitle: 'ہجرت پر خالی ہاتھ پہنچے لیکن مارکیٹ کا پتہ پوچھا، سینکڑوں اونٹوں کا قافلہ اللہ کے لیے وقف کیا',
    shortBio: 'Arrived in Madinah with nothing, refused charity saying "Show me the marketplace"; accumulated billions and spent it all on the poor, outfitting armies and freeing captives.',
    urduBio: 'مدینہ پہنچ کر اپنے ہاتھ سے تجارت شروع کی، ایک دن مدینہ میں زلزلہ آیا تو معلوم ہوا عبد الرحمن کے ۷۰۰ اونٹوں کا غلہ سے لدا قافلہ اللہ کی راہ میں صدقہ کے لیے آیا ہے۔',
    fullStory: `Hazrat Abdur-Rahman ibn Awf (RA) was one of the early eight converts. When he migrated to Madinah, his Ansar brother Sa'd ibn ar-Rabi' offered to give him half his wealth and one of his houses. Abdur-Rahman thanked him warmly and said the historic words: "May Allah bless you in your family and wealth; simply show me the way to the marketplace!"

Starting with small sales of clarified butter and cheese, Allah placed such immense Barakah (blessing) in his commerce that he remarked: "I feel that if I were to lift a stone, I would find gold or silver beneath it!"

Abdur-Rahman used his wealth as a river of charity. During a time of drought in Madinah, a massive dust cloud and rumble shook the city. Hazrat Aisha inquired what it was; she was told: "It is 700 camels of Abdur-Rahman ibn Awf loaded with wheat, flour, and oil entering the city." Abdur-Rahman immediately gave the entire 700-camel caravan with all its saddles and loads as free charity to the poor. In his will, he gave 400 gold dinars to every surviving veteran of the Battle of Badr.`,
    keyEvents: ['Refusing handouts upon arrival in Madinah and building self-reliance', 'Establishing honest Islamic ethics in the commercial marketplace', 'Donating 700 loaded camels to the poor of Madinah at once', 'Bequeathing fortunes to the veterans of Badr and the Mothers of Believers'],
    moralLesson: 'Wealth in the hands of a righteous believer is a powerful instrument to eliminate poverty and uplift society.',
    quranOrHadithRef: 'Sahih Bukhari 2048, 3780; Musnad Ahmad',
    audio: {
      title: 'Hazrat Abdur Rahman ibn Awf (RA) Wealth & Charity',
      speaker: 'Islamic Economics & History',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '35:15'
    },
    video: {
      title: 'The Wealthy Companion: Abdur-Rahman ibn Awf',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Abdur Rehman bin Auf story Urdu',
      durationFormatted: '28:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'abu-ubaidah-al-jarrah',
    nameEnglish: 'Hazrat Abu Ubaidah ibn Al-Jarrah (RA) - The Trustee of the Ummah',
    nameUrdu: 'حضرت ابو عبیدہ بن الجراح (رض) - امین الامت اور فاتحِ شام',
    arabicName: 'أَبُو عُبَيْدَةَ عَامِرُ بْنُ الْجَرَّاحِ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Ameen al-Ummah (Trustee of the Community) & Supreme Commander in Syria',
    urduTitle: 'رسول اللہ ﷺ نے فرمایا: "ہر امت کا ایک امین ہوتا ہے اور میری امت کے امین ابو عبیدہ ہیں"',
    shortBio: 'Praised by the Prophet as the Ameen (Trustee) of the Ummah; pulled the iron links of the helmet from the Prophet\'s cheeks at Uhud with his teeth; commander who liberated Syria.',
    urduBio: 'احد میں رسول ﷺ کے چہرے میں گھسی کڑیاں اپنے دانتوں سے نکالیں اور دو دانت ٹوٹ گئے، طاعون عمواس میں رعایا کا ساتھ نہیں چھوڑا اور شہید ہوئے۔',
    fullStory: `Hazrat Abu Ubaidah Amir ibn al-Jarrah (RA) was beloved for his humility, unshakeable trustworthiness, and courage. The Prophet Muhammad ﷺ held his hand before a Christian delegation from Najran seeking a trustworthy arbiter and declared: "Indeed, every nation has a trustworthy guardian (Ameen), and the Ameen of this Ummah is Abu Ubaidah ibn al-Jarrah!" (Sahih Bukhari).

At the Battle of Uhud, two iron links of the Prophet's helmet penetrated deeply into the Prophet's cheekbones. Abu Ubaidah stepped forward and insisted on extracting them with his own teeth rather than tools to minimize pain to the Prophet. He pulled with such force that his front incisor tooth broke; then he gripped the second link and his second tooth broke, permanently disfiguring his smile with sublime beauty.

As Supreme Commander of the Muslim forces liberating the Levant, Caliph Umar visited his home in Syria and found only a sword, a shield, and a saddle blanket for a bed. Umar wept and said: "The world has changed all of us, O Abu Ubaidah, except you!" He contracted the Plague of 'Amwas and refused Umar's private invitation to evacuate to Madinah, choosing to remain alongside his infected soldiers until his martyrdom.`,
    keyEvents: ['Conferred the title Ameen al-Ummah by the Prophet ﷺ', 'Extracting the helmet links from the Prophet\'s cheeks with his teeth', 'Supreme Commandership in the liberation of Damascus and Jerusalem', 'Refusing to abandon his soldiers during the Plague of \'Amwas'],
    moralLesson: 'Trustworthiness and living in absolute solidarity with the common people are the crown of true leadership.',
    quranOrHadithRef: 'Sahih Bukhari 3744, 4380; Sahih Muslim 2419',
    audio: {
      title: 'Hazrat Abu Ubaidah ibn al-Jarrah (RA) Ameen al-Ummah',
      speaker: 'Chronicles of the Sahaba',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '34:20'
    },
    video: {
      title: 'The Trustee of the Ummah: Abu Ubaidah',
      speaker: 'Islamic History Documentaries',
      youtubeQuery: 'Hazrat Abu Ubaidah bin Jarrah story Urdu',
      durationFormatted: '27:50'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'saeed-ibn-zayd',
    nameEnglish: 'Hazrat Saeed ibn Zayd (RA) - The Answered Supplication & Ashara Mubashara',
    nameUrdu: 'حضرت سعید بن زید (رض) - عشرہ مبشرہ اور مستجاب الدعوات صحابی',
    arabicName: 'سَعِيدُ بْنُ زَيْدٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Ashara Mubashara, Brother-in-Law of Umar (RA) & Victor of Yarmouk',
    urduTitle: 'حضرت عمر کے بہنوئی جن کے گھر قرآن کی تلاوت سن کر عمر فاروق اسلام لائے',
    shortBio: 'Son of Zayd ibn Amr who rejected idolatry before Islam; his home was where Umar heard Surah Ta-Ha; commander at Yarmouk whose prayers were never rejected by Allah.',
    urduBio: 'والد جاہلیت میں بھی بت پرستی سے دور رہے، سعید کی اہلیہ فاطمہ بنت خطاب کے ساتھ گھر میں تلاوت سن کر عمر فاروق کا دل بدلا۔',
    fullStory: `Hazrat Saeed ibn Zayd (RA) was raised in a home of monotheism; his father Zayd ibn Amr ibn Nufayl was among the rare Hanifs of Mecca who refused to worship idols or eat slaughtered meat dedicated to false gods even prior to the advent of Islam. Saeed was the twelfth person to embrace Islam.

He married Fatimah bint al-Khattab, the sister of Hazrat Umar. When Umar stormed their home in a rage upon discovering their faith, he struck Saeed and injured Fatimah. Seeing her blood and their unshakeable courage, Umar was struck with remorse, asked to read the parchment of Surah Ta-Ha they had hidden, and walked directly to Dar al-Arqam to accept Islam.

Saeed fought valiantly in all major battles, commanding the cavalry at the Battle of Yarmouk and the opening of Damascus. In his later years in Madinah, when a woman named Arwa falsely accused him before the governor of stealing a portion of her land, Saeed declared: "How could I take her land after hearing the Messenger of Allah say: 'Whoever steals a handspan of land unjustly, it will be wrapped around his neck from seven earths on Judgment Day'?" Saeed prayed: "O Allah, if she is lying, blind her and make her grave in her well." Soon after, she went blind and fell into her own well, proving Saeed's answered supplication (Mustajab ad-Da'wah).`,
    keyEvents: ['Son of the Hanif monotheist Zayd ibn Amr', 'The catalytic encounter that brought Umar ibn Al-Khattab into Islam', 'Commanding frontline cavalry at the Battle of Yarmouk', 'The miraculous answered prayer against false defamation'],
    moralLesson: 'Never unjustly accuse or harm a sincere believer; their silent supplication shatters every wall of falsehood.',
    quranOrHadithRef: 'Sahih Bukhari 2452, 3118; Sahih Muslim 1610',
    audio: {
      title: 'Hazrat Saeed ibn Zayd (RA) Life & Yarmouk',
      speaker: 'Sahaba Studies',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '30:15'
    },
    video: {
      title: 'The Answered Prayer: Saeed ibn Zayd',
      speaker: 'Islamic History Series',
      youtubeQuery: 'Hazrat Saeed bin Zaid story Urdu',
      durationFormatted: '24:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ammar-ibn-yasir',
    nameEnglish: 'Hazrat Ammar ibn Yasir (RA) - The Son of Martyrs & Beacon of Truth',
    nameUrdu: 'حضرت عمار بن یاسر (رض) - پہلے شہیدوں کے فرزند اور حق کا معیار',
    arabicName: 'عَمَّارُ بْنُ يَاسِرٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Builder of the First Mosque & Criterion of the Transgressing Group',
    urduTitle: 'مسجدِ نبوی کی تعمیر میں دو دو اینٹیں اٹھائیں، رسول اللہ ﷺ نے پیشگوئی فرمائی کہ انہیں باغی گروہ قتل کرے گا',
    shortBio: 'Son of Yasir and Sumayyah; survived horrific torture; helped construct the first mosque in Quba; the Prophet foretold: "Ammar will be killed by the transgressing faction (Al-Fi\'ah al-Baghiyah)."',
    urduBio: 'ماں باپ دونوں کی شہادت دیکھی، رسول اللہ ﷺ نے فرمایا: "عمار سر سے پاؤں تک ایمان سے بھرپور ہیں"، جنگِ صفین میں ۹۳ سال کی عمر میں شہید ہوئے۔',
    fullStory: `Hazrat Ammar ibn Yasir (RA) was born into immense suffering as the son of the first two martyrs of Islam, Yasir and Sumayyah. When torturers submerged his head underwater to force him to utter praise of their idols, his heart remained brimming with faith, leading to the revelation of the Quranic verse of dispensation: "Except one who is forced while his heart is content with faith" (Surah An-Nahl 16:106). The Prophet comforted him: "If they return to torture, say the same!"

During the construction of Masjid an-Nabawi in Madinah, while companions carried one brick at a time, Ammar carried two bricks—one for himself and one on behalf of the Prophet ﷺ. The Prophet brushed the dust off Ammar's head with tender love and stated the famous prophetic prophecy: "May Allah have mercy on Ammar! He calls them to Paradise and they call him to the Fire; he will be killed by the transgressing faction (Al-Fi'ah al-Baghiyah)!" (Sahih Bukhari).

Decades later at the Battle of Siffin, at 93 years of age, Ammar fought on the side of Caliph Ali (RA) and was martyred, serving as the historical beacon that validated Ali's rightful caliphate in the eyes of the companions.`,
    keyEvents: ['Enduring the torture that martyred his parents Yasir and Sumayyah', 'The Quranic revelation validating inner faith under physical duress', 'Building the foundations of Masjid an-Nabawi with double bricks', 'The famous prophetic prediction of his martyrdom by the transgressing faction'],
    moralLesson: 'Faith is anchored in the conviction of the heart; the righteous stand as the true compass during times of political confusion.',
    quranOrHadithRef: 'Surah An-Nahl 16:106; Sahih Bukhari 447, 2812',
    audio: {
      title: 'Hazrat Ammar ibn Yasir (RA) Life & Prophecy',
      speaker: 'Seerah Heritage',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '36:40'
    },
    video: {
      title: 'Ammar ibn Yasir: The Beacon of Truth',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Ammar bin Yasir story Urdu',
      durationFormatted: '29:50'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'abdullah-ibn-abbas',
    nameEnglish: 'Hazrat Abdullah ibn Abbas (RA) - Hibr al-Ummah (The Great Doctor of the Quran)',
    nameUrdu: 'حضرت عبد اللہ بن عباس (رض) - حبر الامت اور ترجمان القرآن',
    arabicName: 'عَبْدُ اللَّهِ بْنُ عَبَّاسٍ رَضِيَ اللَّهُ عَنْهُمَا',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Hibr al-Ummah & Tarjuman al-Quran (Interpreter of the Quran)',
    urduTitle: 'رسول اللہ ﷺ نے سینے سے لگا کر دعا فرمائی: "اے اللہ اسے دین کی سمجھ اور قرآن کی تاویل کا علم دے"',
    shortBio: 'Cousin of the Prophet ﷺ; prayed over by the Prophet: "O Allah, teach him the Book and give him deep understanding of the religion"; became the father of Quranic exegesis (Tafseer).',
    urduBio: 'کم عمری میں عمر فاروق کے مشاورتی بورڈ میں شامل کیے گئے، اصحابِ بدر کے ساتھ بیٹھے اور سورہ نصر کی حکمت بیان کی، تفسیرِ قرآن کے امام۔',
    fullStory: `Hazrat Abdullah ibn Abbas (RA), the son of the Prophet's uncle Abbas, was in early adolescence when the Prophet passed away. One day, after young Ibn Abbas prepared water for the Prophet's ablution without being asked, the Prophet embraced him tightly against his chest and prayed: "O Allah, grant him deep comprehension of the religion and teach him the interpretation (Ta'weel) of the Book!" (Sahih Bukhari).

Caliph Umar ibn Al-Khattab recognized his extraordinary gifts and seated young Ibn Abbas in the supreme consultative council alongside the elderly veterans of the Battle of Badr. When some questioned having a youth among them, Umar asked the council to explain the meaning of Surah An-Nasr: "When the victory of Allah has come and the conquest..." The elders answered that it commands praise when victorious. Umar then asked Ibn Abbas, who replied: "It signifies the nearing appointed time of the death of the Messenger of Allah ﷺ, which Allah notified him of." Umar exclaimed: "I know nothing of it except what you have said!"

He established the grand academy of Quranic Tafseer in Mecca, drawing thousands of students from around the globe, earning him the immortal title "Tarjuman al-Quran" (The Interpreter of the Quran).`,
    keyEvents: ['The intimate prophetic supplication for comprehension of the Quran', 'Seated as the youngest advisor on Caliph Umar\'s council of Badr veterans', 'Explicating the hidden prophecy of Surah An-Nasr', 'Founding the foundational school of Quranic exegesis (Tafseer)'],
    moralLesson: 'Youth endowed with sacred knowledge and wisdom surpasses mere seniority in years.',
    quranOrHadithRef: 'Sahih Bukhari 75, 143, 4970; Surah An-Nasr 110:1-3',
    audio: {
      title: 'Hazrat Abdullah ibn Abbas (RA) Interpreter of the Quran',
      speaker: 'Quranic Sciences Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '38:10'
    },
    video: {
      title: 'The Great Scholar of the Quran: Ibn Abbas',
      speaker: 'Islamic Scholars',
      youtubeQuery: 'Hazrat Abdullah bin Abbas story Urdu',
      durationFormatted: '31:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'abdullah-ibn-umar',
    nameEnglish: 'Hazrat Abdullah ibn Umar (RA) - The Embodiment of Following the Sunnah',
    nameUrdu: 'حضرت عبد اللہ بن عمر (رض) - اتباعِ سنت کے کامل پیکر',
    arabicName: 'عَبْدُ اللَّهِ بْنُ عُمَرَ رَضِيَ اللَّهُ عَنْهُمَا',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'The Pure Follower of the Sunnah & Great Jurist of Madinah',
    urduTitle: 'رسول اللہ ﷺ کے ہر عمل کی ایسی پیروی کی کہ جہاں نبی ﷺ کا اونٹ مڑا تھا وہیں اپنا اونٹ موڑتے',
    shortBio: 'Son of Caliph Umar; renowned for meticulous, literal adherence to every footstep and habit of Prophet Muhammad ﷺ; steadfastly avoided all civil conflict and political office.',
    urduBio: 'سنتِ نبوی کے عاشق، تہجد کے پابند، غلاموں کو آزاد کرنے والے، فتنہ کے دور میں کسی مسلمان پر تلوار نہ اٹھانے کا عہد پورا کیا۔',
    fullStory: `Hazrat Abdullah ibn Umar (RA) was the living mirror of the Prophet's everyday Sunnah. If the Prophet rested under a certain tree during a journey, Ibn Umar would water that tree years later and rest beneath it. If the Prophet turned his camel at a certain bend in the road, Ibn Umar would turn his camel at the exact spot out of pure love.

In his youth, he had a dream of being shown the edge of Hellfire by angels. His sister, Hazrat Hafsa, recounted the dream to the Prophet ﷺ, who said: "What an excellent man Abdullah is, if only he would pray the night prayer (Tahajjud)!" From that day until his death sixty years later, Ibn Umar never missed Tahajjud.

He was renowned for freeing any enslaved person he saw performing prayer with devotion. When people pointed out that slaves might pray deliberately to gain freedom, Ibn Umar smiled and said: "Whoever deceives us through Allah, we are happily deceived for Allah's sake!" During the bloody civil wars, both factions offered him the Caliphate to unify the Ummah, but he adamantly refused: "I will not accept a position if even two Muslims would clash swords over it."`,
    keyEvents: ['Meticulous, passionate imitation of the Prophet\'s physical and spiritual habits', 'Lifelong unbroken practice of Tahajjud prayer following the Prophet\'s advice', 'Emancipating thousands of enslaved individuals who embraced worship', 'Strict refusal to participate in civil strife or claim political thrones'],
    moralLesson: 'True love is demonstrated through meticulous adherence to the beloved\'s guidance in everyday details.',
    quranOrHadithRef: 'Sahih Bukhari 1121, 3739; Sahih Muslim 2478',
    audio: {
      title: 'Hazrat Abdullah ibn Umar (RA) Love of the Sunnah',
      speaker: 'Seerah Lecture Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '33:45'
    },
    video: {
      title: 'The Walking Sunnah: Abdullah ibn Umar',
      speaker: 'Historical Biographies',
      youtubeQuery: 'Hazrat Abdullah bin Umar story Urdu',
      durationFormatted: '26:50'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'zayd-ibn-thabit',
    nameEnglish: 'Hazrat Zayd ibn Thabit (RA) - The Scribe of Revelation & Quran Compiler',
    nameUrdu: 'حضرت زید بن ثابت (رض) - کاتبِ وحی اور قرآن کے مدونِ اعظم',
    arabicName: 'زَيْدُ بْنُ ثَابِتٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Chief Scribe of Revelation & Head of the Quran Compilation Committees',
    urduTitle: '۱۱ سال کی عمر میں قرآن حفظ کیا، عبرانی و سریانی زبانیں ۱۵ دن میں سیکھیں، ابوبکر و عثمان کے دور میں قرآن جمع کیا',
    shortBio: 'Mastered Hebrew and Syriac in two weeks on the Prophet\'s command; entrusted by Abu Bakr and Uthman to lead the rigorous collection and compilation of the Holy Quran.',
    urduBio: 'رسول اللہ ﷺ نے وحی لکھوائی، حضرت ابوبکر نے فرمایا: "تم نوجوان، عقلمند ہو اور تمہارے اوپر کوئی تہمت نہیں"، قرآن کے ایک ایک لفظ کی گواہی لے کر صحیفہ بنایا۔',
    fullStory: `Hazrat Zayd ibn Thabit (RA) of the Ansar was only eleven when the Prophet migrated to Madinah, having already memorized seventeen surahs. Recognizing his extraordinary linguistic and analytical intellect, the Prophet ﷺ instructed him: "O Zayd, learn the script of the Jews (Hebrew) for me, for by Allah, I do not trust them with my correspondence." Zayd mastered reading, writing, and speaking fluent Hebrew in just fifteen days, and subsequently mastered Syriac.

Zayd became the primary official Scribe of Revelation (Katib al-Wahy), writing down verses as they descended upon the Prophet on parchment, leather scraps, and shoulder blades.

Following the martyrdom of dozens of Quran memorizers at the Battle of Yamama, Caliph Abu Bakr and Umar commissioned Zayd to compile the Quran into a single unified book. Zayd described the terrifying weight of this responsibility: "By Allah, if they had commanded me to move a mountain from its place, it would not have been heavier upon me than compiling the Quran!" He enforced an infallible standard: accepting no verse without both his personal memory and two independent written witnesses who heard it directly from the lips of the Prophet. Under Caliph Uthman, Zayd presided over the committee that standardized the Mushaf distributed to the world.`,
    keyEvents: ['Learning Hebrew and Syriac in 15 days by prophetic order', 'Serving as primary Katib al-Wahy for divine revelation', 'Leading the first comprehensive compilation of the Quran under Abu Bakr', 'Leading the standardization of the Mushaf Uthmani under Caliph Uthman'],
    moralLesson: 'Uncompromising precision, intellectual mastery, and profound fear of God are required to preserve sacred trusts.',
    quranOrHadithRef: 'Sahih Bukhari 4986, 7193; Jami\' at-Tirmidhi 2715',
    audio: {
      title: 'Hazrat Zayd ibn Thabit (RA) Compiler of the Quran',
      speaker: 'Quranic History Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '37:15'
    },
    video: {
      title: 'How the Quran Was Compiled: Zayd ibn Thabit',
      speaker: 'Islamic History Documentaries',
      youtubeQuery: 'Hazrat Zaid bin Sabit compilation of Quran Urdu',
      durationFormatted: '32:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'abu-ayyub-al-ansari',
    nameEnglish: 'Hazrat Abu Ayyub Al-Ansari (RA) - The Host of the Prophet ﷺ',
    nameUrdu: 'حضرت ابو ایوب انصاری (رض) - میزبانِ رسول ﷺ اور استنبول کے مجاہد',
    arabicName: 'أَبُو أَيُّوبَ الْأَنْصَارِيُّ خَالِدُ بْنُ زَيْدٍ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Host of the Prophet ﷺ in Madinah & Veteran Buried at the Walls of Constantinople',
    urduTitle: 'ہجرت پر رسول اللہ ﷺ کی اونٹنی جن کے دروازے پر بیٹھی، ۸۰ سال کی عمر میں قسطنطنیہ کی فتح کے لیے نکلے',
    shortBio: 'When the Prophet\'s camel stopped at his house during the Hijrah, he hosted the Prophet for seven months with profound reverence; martyred in his eighties outside Constantinople (Istanbul).',
    urduBio: 'رسول اللہ ﷺ کو اپنے مکان کی بالائی منزل دی اور خود نیچے رہنے میں کانپتے رہے کہ پاؤں نبی کے اوپر نہ ہوں، قبر آج بھی استنبول میں مرجعِ خلائق ہے۔',
    fullStory: `When Prophet Muhammad ﷺ arrived in Madinah during the Hijrah, every chieftain of the Ansar grabbed the reins of his camel Al-Qaswa, begging him to stay in their home. The Prophet smiled and said: "Let her go, for she is divinely guided." The camel knelt in front of the modest two-story home of Hazrat Abu Ayyub Al-Ansari (RA).

Abu Ayyub immediately ran forward and carried the Prophet's saddlebags inside his home, hosting the Prophet for seven months until the chambers of the Mosque were constructed. Out of intense reverence, Abu Ayyub and his wife insisted on living on the lower floor so they would not walk above the head of the Messenger of Allah; when a water jar broke on the upper floor, they used their only blanket to absorb the water so not a single drop would drip upon the Prophet.

Abu Ayyub lived for the military expeditions of Islam. In his eighties, when an army marched toward Constantinople (modern Istanbul) seeking to fulfill the Prophet's prophecy: "Verily, you shall conquer Constantinople; what a wonderful leader will her leader be, and what a wonderful army will that army be!" Abu Ayyub joined the campaign. Falling ill, his dying request was: "Carry my body as deep into enemy territory as you can penetrate, and bury me beneath the walls of the city!" His resting place in Istanbul is revered to this day.`,
    keyEvents: ['Chosen as the host of the Prophet ﷺ upon arrival in Madinah', 'Seven months of tender, reverent hospitality to the Messenger of Allah', 'Unbroken military participation in defense of Islam well into his 80s', 'Burial directly beneath the historic Roman walls of Constantinople'],
    moralLesson: 'Reverence for the sacred and lifelong dedication to noble goals knows no retirement age.',
    quranOrHadithRef: 'Sahih Muslim 2053; Musnad Ahmad 18977',
    audio: {
      title: 'Hazrat Abu Ayyub Al-Ansari (RA) Host of the Prophet',
      speaker: 'Seerah Chronicles',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '34:50'
    },
    video: {
      title: 'The Host of Madinah: Abu Ayyub Al-Ansari',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Abu Ayub Ansari story Urdu',
      durationFormatted: '28:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'saad-ibn-muadh',
    nameEnglish: 'Hazrat Sa\'d ibn Mu\'adh (RA) - The Chief Whose Passing Shook the Throne of Allah',
    nameUrdu: 'حضرت سعد بن معاذ (رض) - جن کی وفات پر عرشِ الٰہی جھوم اٹھا',
    arabicName: 'سَعْدُ بْنُ مُعَاذٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Leader of the Aws Tribe of Ansar & The Unshakable Pillar of Badr',
    urduTitle: 'اسلام میں صرف ۶ سال گزارے لیکن جب جنازہ اٹھا تو ۷۰ ہزار فرشتے اتری اور عرشِ رحمن لرز اٹھا',
    shortBio: 'Leader of the Aws who accepted Islam through Mus\'ab ibn Umayr; brought his entire tribe to Islam in a single day; struck by an arrow at Khandaq; when he passed away, 70,000 angels descended and the Throne of Allah shook.',
    urduBio: 'بدر میں تاریخی اعلان کیا: "اگر آپ ہمیں سمندر میں کودنے کا حکم دیں تو ہم کود پڑیں گے"، وفات پر رسول اللہ ﷺ نے فرمایا: "سعد کی موت پر رحمن کا عرش ہل گیا"۔',
    fullStory: `Hazrat Sa'd ibn Mu'adh (RA) spent only six short years in Islam, yet attained a celestial rank that stunned the companions. As the towering paramount chieftain of the Aws tribe in Yathrib, when he heard Mus'ab ibn Umayr's recitation of the Quran, his heart melted. He went to his clan and declared: "Speaking to any man or woman among you is unlawful for me until you believe in Allah and His Messenger!" By nightfall, every single member of the Aws tribe entered Islam.

At the Battle of Badr, when the Prophet consulted the companions whether to fight, Sa'd delivered the monumental oath of the Ansar: "O Messenger of Allah, we believe in you, testify to the truth you brought, and give you our solemn pledges! Go forth to whatever Allah commands you. By Him Who sent you with the truth, if you were to cross this sea and plunge into it, we would plunge in after you—not a single man among us would turn back!"

At the Battle of the Trench, an arrow severed his medial arm artery. He prayed: "O Allah, do not take my soul until my eyes are comforted regarding Banu Qurayza who betrayed us." His prayer was answered; he judged Banu Qurayza according to their own biblical law, and then his wound reopened. When he passed away in the Prophet's Mosque, the Prophet ﷺ announced: "The Throne of the Most Merciful shook at the death of Sa'd ibn Mu'adh, and seventy thousand angels descended who had never set foot on earth before!" (Sahih Bukhari).`,
    keyEvents: ['Converting his entire tribe to Islam in a single afternoon', 'The immortal declaration of loyalty before the Battle of Badr', 'Wounded by an arrow during the defense of the Trench', 'The shaking of the Throne of Allah upon his passing (Ihtazza \'Arshu ar-Rahman)'],
    moralLesson: 'It is not the length of years you live, but the intensity of your sincerity and service to God that counts.',
    quranOrHadithRef: 'Sahih Bukhari 3803; Sahih Muslim 2466',
    audio: {
      title: 'Hazrat Sa\'d ibn Mu\'adh (RA) Shaking of the Throne',
      speaker: 'Chronicles of Ansar',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '35:40'
    },
    video: {
      title: 'The Leader Whose Death Shook the Throne: Sa\'d ibn Mu\'adh',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Saad bin Muaz story Urdu',
      durationFormatted: '29:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },

  // Additional Important Events
  {
    id: 'treaty-of-hudaybiyyah',
    nameEnglish: 'The Treaty of Hudaybiyyah - Fath al-Mubin (The Manifest Victory)',
    nameUrdu: 'صلحِ حدیبیہ - بیعتِ رضوان اور فتحِ مبین کا آغاز',
    arabicName: 'صُلْحُ الْحُدَيْبِيَةِ وَبَيْعَةُ الرِّضْوَانِ',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Landmark 10-Year Peace Treaty in 6 AH Termed "A Manifest Victory" by Allah',
    urduTitle: 'بظاہر سخت شرائط پر صلح لیکن قرآن نے اسے "فتحِ مبین" کہا، بیعتِ رضوان کے تحت درخت کے نیچے وفا کا عہد',
    shortBio: '1,400 companions marched unarmed for Umrah, stopped at Hudaybiyyah; pledged under the tree (Bay\'at ar-Ridwan); Prophet signed peace despite seeming unequal terms; ushered in the greatest expansion of Islam.',
    urduBio: 'حضرت عثمان کی شہادت کی افواہ پر جانثاروں نے بیعت کی، اللہ نے راضی ہونے کا اعلان کیا، صلح کے بعد دو سال میں جتنے لوگ اسلام میں آئے وہ پچھلے ۱۸ سال سے زیادہ تھے۔',
    fullStory: `In Dhu al-Qi'dah 6 AH (628 CE), Prophet Muhammad ﷺ set out with 1,400 companions clad in Ihram, accompanied by sacrificial animals, to perform Umrah at the Ka'bah. Refusing entry, the Quraysh blocked them at Hudaybiyyah.

When rumors spread that their envoy, Hazrat Uthman (RA), had been assassinated in Mecca, the Prophet called the companions to gather beneath an acacia tree. All 1,400 placed their hands over the Prophet's hand, pledging to fight to the death and never flee. Allah revealed regarding this moment: "Certainly Allah was pleased with the believers when they pledged allegiance to you under the tree" (Surah Al-Fath 48:18).

When negotiations resumed, Suhayl ibn Amr demanded difficult terms: returning any Meccan who fled to Madinah without returning Muslims who fled to Mecca, erasing "Bismillah ar-Rahman ar-Rahim" to write "Bismika Allahumma", and postponing Umrah to the following year. Although companions felt heavy-hearted by the terms, the Prophet accepted out of profound prophetic foresight. On the journey back, Allah revealed Surah Al-Fath: "Indeed, We have granted you a manifest victory (Fathan Mubeena)!" (48:1). The peaceful atmosphere allowed Islam to spread rapidly across Arabia, doubling the Muslim population within two years and paving the way for the bloodless Conquest of Mecca.`,
    keyEvents: ['Marching in peaceful Ihram to the gates of Mecca', 'The sacred pledge under the tree (Bay\'at ar-Ridwan)', 'The diplomatic signing of the 10-year non-aggression pact', 'The divine declaration in Surah Al-Fath: "We have granted you a manifest victory"'],
    moralLesson: 'Strategic patience, peaceful diplomacy, and avoiding bloodshed often achieve far greater victories than armed conflict.',
    quranOrHadithRef: 'Surah Al-Fath (Entire Surah 48); Sahih Bukhari 2731',
    audio: {
      title: 'Surah Al-Fath & The Treaty of Hudaybiyyah',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '41:20'
    },
    video: {
      title: 'The Treaty of Hudaybiyyah: The Manifest Victory',
      speaker: 'Seerah Documentaries',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'Sulah Hudaibiya story in Urdu',
      durationFormatted: '35:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'battle-of-uhud',
    nameEnglish: 'The Battle of Uhud - The Archers\' Hill & The Lesson of Obedience',
    nameUrdu: 'غزوہِ احد - جبلِ رماۃ، تیر اندازوں کی چوک اور اطاعت کا درس',
    arabicName: 'غَزْوَةُ أُحُدٍ',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Epochal Battle in 3 AH Where 70 Noble Sahaba Received Martyrdom',
    urduTitle: 'تیر اندازوں کے پہاڑ چھوڑنے سے بازی پلٹ گئی، حضرت حمزہ کی شہادت اور رسول ﷺ کے دندانِ مبارک کا زخمی ہونا',
    shortBio: 'Muslims held the upper hand until archers abandoned their designated mountain pass for spoils; Khalid ibn al-Walid\'s cavalry encircled from behind; Hamza and 70 Sahaba were martyred.',
    urduBio: 'رسول اللہ ﷺ کا سخت حکم تھا: "چاہے پرندے ہماری بوٹیاں نوچ لیں، جگہ نہ چھوڑنا"، مالِ غنیمت کی جلد بازی سے بڑا نقصان ہوا لیکن اللہ نے معاف فرما دیا۔',
    fullStory: `Fought in Shawwal 3 AH (625 CE) at the base of Mount Uhud north of Madinah, this battle holds essential strategic and spiritual lessons for the Muslim Ummah. Seeking revenge for their defeat at Badr, the Quraysh assembled 3,000 warriors under Abu Sufyan.

The Prophet ﷺ positioned fifty expert archers on a hill (Jabal ar-Rumat) guarding the vulnerable rear left flank, with strict, unambiguous orders from the commander Abdullah ibn Jubayr: "Guard our rear! Even if you see vultures snatching our bodies, do not leave your station until I send for you!"

Initially, the Muslim vanguard routed the Quraysh forces. Seeing the enemy retreat and leave equipment behind, forty of the fifty archers rushed down to collect war spoils, assuming the battle was over. Khalid ibn al-Walid, then commanding the pagan cavalry, immediately noticed the unguarded ridge, swept around Mount Uhud, and attacked the Muslims from behind.

In the ensuing chaos, seventy noble companions were martyred, including Sayyid al-Shuhada Hamza (RA) and Mus'ab ibn Umayr. The Prophet himself was struck by stones, losing a tooth and having helmet links driven into his cheek. Yet, through heroic individual shields, the remnants gathered around the Prophet and repelled the assault, learning an eternal lesson on the devastating consequences of disobeying prophetic instructions.`,
    keyEvents: ['Deploying the 50 archers on Jabal ar-Rumat with strict orders', 'Initial decisive rout of the pagan infantry', 'Abandoning the ridge for war booty causing the cavalry breakthrough', 'The martyrdom of 70 companions including Hamza and Mus\'ab', 'The fortitude of the Prophet and the core companions defending him'],
    moralLesson: 'Material greed and deviating from divine commands, even by a tiny minority, can disrupt the collective success of an entire nation.',
    quranOrHadithRef: 'Surah Ali \'Imran 3:121-175; Sahih Bukhari 4043',
    audio: {
      title: 'Ghazwa-e-Uhud: Complete Detailed Analysis',
      speaker: 'Dr. Israr Ahmed',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '61:40'
    },
    video: {
      title: 'The Battle of Uhud: Mount of Archers',
      speaker: 'Military History of Islam',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'Ghazwa e Uhud Urdu documentary full',
      durationFormatted: '49:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'battle-of-khandaq',
    nameEnglish: 'The Battle of the Trench (Al-Ahzab) - The Siege of the Confederates',
    nameUrdu: 'غزوہِ خندق (احزاب) - دس ہزار کا محاصرہ اور طوفانی ہوائیں',
    arabicName: 'غَزْوَةُ الْخَنْدَقِ (الْأَحْزَابِ)',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Allied Coalition of 10,000 Warriors Besieging Madinah in 5 AH',
    urduTitle: 'شدید سردی، بھوک، پیٹ پر پتھر باندھے، خندق کھودنے میں معجزات اور تیز آندھی سے دشمن کے خیمے اکھڑے',
    shortBio: 'A confederate alliance of 10,000 marched to destroy Madinah; Muslims dug a trench proposed by Salman al-Farsi; endured a month-long freezing siege; Allah sent a freezing hurricane that uprooted the enemy camps.',
    urduBio: 'منافقین کے دل دہل گئے، رسول اللہ ﷺ نے چٹان پر کدال ماری تو کسریٰ و قیصر کے محلات کی روشنی دیکھی، آخر کار غیبی ہوا نے دشمن کو بھگا دیا۔',
    fullStory: `In Shawwal 5 AH (627 CE), Jewish leaders of Banu Nadir united with Quraysh and desert Bedouin tribes, forming a confederate army of 10,000 men (Al-Ahzab) to wipe out Islam forever.

Upon the strategic advice of Hazrat Salman al-Farsi (RA), the 3,000 Muslims undertook the monumental labor of excavating a wide, deep trench along the exposed northern perimeter of Madinah. Facing bitter cold and severe hunger—the Prophet ﷺ tied two stones to his stomach to relieve pangs—the companions dug day and night. When a massive boulder resisted their picks, the Prophet struck it with his axe, generating lightning flashes in which he foretold the conquest of the Persian, Roman, and Yemeni empires.

When Banu Qurayza broke their treaty from the rear, danger peaked. The Quran describes: "When eyes shifted in fear, and hearts reached the throats, and you assumed about Allah various assumptions" (Surah Al-Ahzab 33:10). The siege lasted nearly a month. Finally, Nu'aym ibn Mas'ud sowed distrust between the confederate factions, and Allah dispatched a freezing hurricane (Reeh-an Shadeedah) that blew down enemy tents, extinguished their fires, and terrified their horses. Abu Sufyan ordered a humiliating retreat without a single pitched battle.`,
    keyEvents: ['Excavation of the northern defensive trench within six days', 'The miraculous sparks from the rock foretelling imperial conquests', 'The internal betrayal by Banu Qurayza', 'The psychological warfare orchestrated by Nu\'aym ibn Mas\'ud', 'The violent divine gale that dismantled the confederate siege'],
    moralLesson: 'When human efforts reach their absolute limit with steadfast reliance on Allah, unseen divine forces dismantle impossible coalitions.',
    quranOrHadithRef: 'Surah Al-Ahzab 33:9-27; Sahih Bukhari 4101',
    audio: {
      title: 'Ghazwa-e-Khandaq: Tafseer & Strategy',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '54:10'
    },
    video: {
      title: 'The Battle of the Trench (Al-Ahzab)',
      speaker: 'Islamic History Series',
      youtubeQuery: 'Ghazwa e Khandaq Urdu documentary',
      durationFormatted: '43:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'farewell-pilgrimage',
    nameEnglish: 'The Farewell Pilgrimage - Hajjat al-Wida & The Universal Charter of Humanity',
    nameUrdu: 'حجۃ الوداع - آخری خطبہ اور انسانی حقوق کا ابدی منشور',
    arabicName: 'حَجَّةُ الْوَدَاعِ وَخُطْبَةُ الرَّسُولِ ﷺ',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Historic Last Sermon on Mount Arafat in 10 AH / 632 CE',
    urduTitle: 'ایک لاکھ چوبیس ہزار صحابہ کا مجمع، نسلی برتری کا خاتمہ، عورتوں کے حقوق اور دین کی تکمیل',
    shortBio: 'Over 100,000 companions performed Hajj with the Prophet; on the plain of Arafat, he delivered the eternal charter abolishing racial supremacy, usury, and declaring the sanctity of life, property, and women\'s rights.',
    urduBio: 'خطبہ میں فرمایا: "کسی گورے کو کالے پر اور کسی عربی کو عجمی پر کوئی فضیلت نہیں مگر تقویٰ کے سبب"، آیت نازل ہوئی: "آج میں نے تمہارے لیے تمہارا دین مکمل کر دیا"۔',
    fullStory: `In Dhu al-Hijjah 10 AH (632 CE), Prophet Muhammad ﷺ performed his sole pilgrimage after the Hijrah, known as Hajjat al-Wida (The Farewell Pilgrimage). More than 124,000 companions gathered in the valley of Arafat, surrounding Jabal ar-Rahmah.

Riding his camel Al-Qaswa, the Prophet delivered the immortal Farewell Sermon, which remains the most profound declaration of human rights in the annals of history:
1. Sanctity of Life and Property: "Verily your blood, your property, and your honor are sacred to you like the sanctity of this day of yours, in this month of yours, in this city of yours."
2. Abolition of Racial Supremacy: "All mankind is from Adam and Eve. An Arab has no superiority over a non-Arab, nor has a non-Arab any superiority over an Arab; also a white has no superiority over a black, nor does a black have any superiority over a white, except by piety and good action."
3. Rights of Women: "Fear Allah concerning women! Verily you have taken them on the security of Allah, and made their intimacy lawful to you by the word of Allah. Treat them with goodness."
4. Abolition of Interest/Usury: Eliminating all pre-Islamic blood feuds and debt servitude.

At the conclusion of the sermon, the Prophet looked to the heavens and asked: "O people! Have I conveyed the message?" A thunderous roar of over 100,000 voices replied: "Yes, we testify you have conveyed it!" The Prophet raised his index finger to the sky and lowered it toward the people: "O Allah, bear witness! O Allah, bear witness! O Allah, bear witness!" Shortly after, the final verse of legislation descended: "This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as your religion" (Surah Al-Ma'idah 5:3).`,
    keyEvents: ['Gathering of 124,000 companions on Mount Arafat', 'Universal abolishment of all forms of racial and tribal superiority', 'Declaring the fundamental sanctity of human life, property, and honor', 'Codifying the rights and dignity of women', 'The descent of the verse of perfection of religion (Al-Yawma Akmaltu Lakum Deenakum)'],
    moralLesson: 'True human equality is achieved only when God is recognized as the supreme authority and virtue (Taqwa) is the only measure of honor.',
    quranOrHadithRef: 'Surah Al-Ma\'idah 5:3; Sahih Bukhari 1741; Sahih Muslim 1218',
    audio: {
      title: 'Khutbat Hajjat al-Wida: Urdu Translation & Analysis',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '39:30'
    },
    video: {
      title: 'The Farewell Sermon of Prophet Muhammad ﷺ',
      speaker: 'Islamic History Documentaries',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'Hajjat ul Wida khutba in Urdu',
      durationFormatted: '33:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  }
];

// Combine base and additional into the unified 115+ master Islamic Stories catalog
export const ALL_ISLAMIC_STORIES: IslamicStoryItem[] = [
  ...ISLAMIC_STORIES_DATA,
  ...ADDITIONAL_STORIES.map(enrichStoryWithAuthenticMedia)
];

export function getCompleteStoriesByCategory(cat: StoryCategory): IslamicStoryItem[] {
  if (cat === 'all') return ALL_ISLAMIC_STORIES;
  return ALL_ISLAMIC_STORIES.filter(s => s.category === cat);
}

export function searchAllStories(query: string, category: StoryCategory = 'all'): IslamicStoryItem[] {
  const q = query.toLowerCase().trim();
  const pool = getCompleteStoriesByCategory(category);
  if (!q) return pool;

  return pool.filter(item =>
    item.nameEnglish.toLowerCase().includes(q) ||
    item.nameUrdu.includes(q) ||
    item.arabicName.includes(q) ||
    item.roleOrTitle.toLowerCase().includes(q) ||
    item.shortBio.toLowerCase().includes(q) ||
    item.urduBio.includes(q) ||
    item.moralLesson.toLowerCase().includes(q)
  );
}
