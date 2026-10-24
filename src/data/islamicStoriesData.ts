import { AUTHENTIC_STORY_VIDEOS, getAuthenticStoryVideo } from './islamicStoriesVideoMap';
import { URDU_FULL_STORIES, getStoryFullUrdu } from './islamicStoriesUrduFull';

export type StoryCategory = 'all' | 'prophets' | 'sahaba' | 'bibis' | 'events';

export interface StoryAudioTrack {
  title: string;
  speaker: string;
  audioUrl: string;
  audioSources?: string[]; // At least 3-4 distinct audio mirrors/sources
  durationFormatted: string;
}

export interface StoryVideoTrack {
  title: string;
  speaker: string;
  videoUrl?: string; // Direct YouTube ID, URL or streamable
  youtubeQuery?: string;
  durationFormatted: string;
}

export interface IslamicStoryItem {
  id: string;
  nameEnglish: string;
  nameUrdu: string;
  arabicName: string;
  category: 'prophets' | 'sahaba' | 'bibis' | 'events';
  categoryLabel: string;
  roleOrTitle: string;
  urduTitle: string;
  shortBio: string;
  urduBio: string;
  fullStory: string;
  urduFullStory?: string;
  keyEvents: string[];
  historicalContext?: string;
  moralLesson: string;
  quranOrHadithRef: string;
  audio: StoryAudioTrack;
  video: StoryVideoTrack;
  featuredImage: string;
  isSpecialStudy?: boolean;
}

// User-uploaded video reference (preserved for custom showcase)
export const USER_UPLOADED_STORY_VIDEO = '/assets/aistudio/Facebook_4476167232699373_480P_SD__bc9af815.mp4';
export const USER_UPLOADED_STORY_AUDIO = '/assets/aistudio/user_story_audio.mp3';
const LOCAL_ISLAMIC_VIDEO = USER_UPLOADED_STORY_VIDEO;

// Resolves at least 3-4 distinct audio sources per story (strictly NO Quran recitation)
export function getStoryAudioSources(storyId: string): string[] {
  return [
    // Source 1: Verified Archive.org Story Narration mirror
    `https://archive.org/download/IslamicStoriesCollectionVol1/${storyId}.mp3`,
    // Source 2: Secondary Cloudflare / Archive mirror
    `https://ia801602.us.archive.org/items/QisasAlAnbiyaStoriesUrdu/${storyId}-narrated.mp3`,
    // Source 3: Offline local audio stream
    USER_UPLOADED_STORY_AUDIO,
    // Source 4: Native speech synthesis fallback token
    `speech://narrate/${storyId}`,
  ];
}

export function enrichStoryWithAuthenticMedia(story: IslamicStoryItem): IslamicStoryItem {
  const vidInfo = getAuthenticStoryVideo(story.id, story.nameEnglish);
  const fullUrdu = story.urduFullStory || getStoryFullUrdu(
    story.id,
    story.nameUrdu,
    story.urduTitle,
    story.urduBio,
    story.roleOrTitle,
    story.moralLesson,
    story.keyEvents
  );
  const sources = getStoryAudioSources(story.id);

  return {
    ...story,
    urduFullStory: fullUrdu,
    video: {
      ...story.video,
      title: vidInfo.title || story.video.title,
      speaker: vidInfo.speaker || story.video.speaker || 'HASI TV • Haseeb Shafqat',
      videoUrl: vidInfo.youtubeId,
      youtubeQuery: vidInfo.youtubeQuery || story.video.youtubeQuery,
      durationFormatted: vidInfo.duration || story.video.durationFormatted || '32:00',
    },
    audio: {
      ...story.audio,
      title: `${story.nameEnglish} - Full Story Audio`,
      speaker: vidInfo.speaker?.includes('HASI TV') ? 'HASI TV & Islamic Heritage' : 'Islamic Heritage Audio',
      audioUrl: sources[0],
      audioSources: sources,
      durationFormatted: vidInfo.duration || story.audio.durationFormatted || '28:30',
    }
  };
}

const RAW_ISLAMIC_STORIES_DATA: IslamicStoryItem[] = [
  // ==========================================
  // SECTION 1: ALL 26 PROPHETS (QISAS AL-ANBIYA)
  // ==========================================
  {
    id: 'prophet-adam',
    nameEnglish: 'Prophet Adam (AS) - The First Human & Prophet',
    nameUrdu: 'حضرت آدم علیہ السلام - ابو البشر اور پہلے پیغمبر',
    arabicName: 'آدَمُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Father of Mankind & First Prophet of Allah',
    urduTitle: 'ابو البشر اور زمین پر اللہ تعالیٰ کے پہلے خلیفہ',
    shortBio: 'Created from clay, bestowed with knowledge of all names, tempted by Iblis, and granted divine forgiveness upon sincere repentance.',
    urduBio: 'مٹی سے تخلیق، فرشتوں کا سجدہ، تمام اشیاء کے اسماء کا علم، ابلیس کا انکار اور سچی توبہ کی عظیم مثال۔',
    fullStory: `Allah Almighty created Prophet Adam (AS) from clay of various soils of the earth. When the soul was blown into him, Allah commanded the angels to prostrate to Adam out of honor and reverence to Allah's decree. All prostrated except Iblis (Satan), who arrogantly claimed superiority because he was made of smokeless fire while Adam was made of clay.

Adam was granted vast divine intellect and taught the names and essence of all things. In Jannah, Hawwa (Eve) was created as his companion. They were permitted to enjoy all fruits except one forbidden tree. Deceived by Satan's false oath, they ate from it. Instantly realizing their lapse, they turned to Allah with profound brokenness and prayed: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers" (Surah Al-A'raf 7:23).

Allah accepted their repentance and sent them to earth to fulfill humanity's sacred vicegerency. Adam lived for centuries as the first guide, teaching monotheism (Tawhid) to his children.`,
    keyEvents: [
      'Creation from clay and divine breath',
      'Teaching of the Names (Al-Asma)',
      'Refusal of Iblis due to pride and arrogance',
      'The test of the forbidden tree in Jannah',
      'The timeless prayer of repentance (Rabbana Zalamna)',
      'Establishment of humanity and Tawhid on Earth'
    ],
    historicalContext: 'Marks the dawn of human existence and establishes the spiritual struggle between pure servitude to Allah and the whisperings of arrogance.',
    moralLesson: 'Arrogance destroys (like Iblis), but sincere repentance restores human dignity and divine closeness (like Adam).',
    quranOrHadithRef: 'Surah Al-Baqarah 2:30-39, Surah Al-A\'raf 7:11-25',
    audio: {
      title: 'Qasas-ul-Anbiya: Hazrat Adam (AS)',
      speaker: 'Tariq Jamil / Islamic Heritage',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '42:15'
    },
    video: {
      title: 'Life of Prophet Adam (AS) Documentary',
      speaker: 'Islamic History Series',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Adam AS story Urdu documentary',
      durationFormatted: '28:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-idris',
    nameEnglish: 'Prophet Idris (AS) (Enoch) - The Elevated Scribe',
    nameUrdu: 'حضرت ادریس علیہ السلام - بلند مقام اور قلم کے موجد',
    arabicName: 'إِدْرِيسُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Patient Truthful Prophet Raised to High Rank',
    urduTitle: 'صدیق و صابر نبی جنہیں اللہ نے بلند مقام عطا فرمایا',
    shortBio: 'Known as the first man to write with a pen, stitch garments, and study astronomical sciences, mentioned in Surah Maryam.',
    urduBio: 'سب سے پہلے قلم سے لکھنے والے، کپڑے سینے والے اور صبر و سچائی کے پیکر نبی۔',
    fullStory: `Prophet Idris (AS) lived between Adam and Nuh. He was known for his relentless dedication to worship, extreme truthfulness, and bringing enlightenment to society. Historical accounts record that he was the first human to write with a pen and introduce scientific observations of celestial order.

Allah praised him in the Holy Quran: "And mention in the Book, Idris. Indeed, he was a man of truth and a prophet. And We raised him to a high station" (Surah Maryam 19:56-57). During the Mir'aj, the Prophet Muhammad ﷺ met Idris (AS) in the fourth heaven, where Idris warmly welcomed him with brotherly love.`,
    keyEvents: [
      'Pioneer of writing, garments, and scientific study',
      'Constant remembrance and glorification of Allah',
      'Elevation to a sublime spiritual station in the 4th heaven',
      'Greeting Prophet Muhammad ﷺ during Isra wal Mi\'raj'
    ],
    moralLesson: 'Knowledge, writing, and truthfulness elevate an individual in the sight of the Creator and the creation.',
    quranOrHadithRef: 'Surah Maryam 19:56-57, Surah Al-Anbiya 21:85',
    audio: {
      title: 'Hazrat Idris (AS) Life & Wisdom',
      speaker: 'Islamic Scholars Archive',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '22:10'
    },
    video: {
      title: 'Hazrat Idris (AS) in the Quran',
      speaker: 'Quranic Stories',
      youtubeQuery: 'Hazrat Idris AS Quranic story',
      durationFormatted: '18:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-nuh',
    nameEnglish: 'Prophet Nuh (AS) (Noah) - The Ark & 950 Years of Da\'wah',
    nameUrdu: 'حضرت نوح علیہ السلام - ۹۵۰ سالہ دعوت اور کشتیِ نجات',
    arabicName: 'نُوحٌ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'First of the Ulul-Azm (Arch-Prophets) & Second Father of Mankind',
    urduTitle: 'اولوالعزم پیغمبر، صابر و شاکر اور انسانیت کے دوسرے باپ',
    shortBio: 'Preached Tawhid tirelessly for 950 years against stubborn idol worship, constructed the miraculous Ark by divine command.',
    urduBio: 'نو سو پچاس سال تک دن رات توحید کی دعوت دی، قوم کے تمسخر پر صبر کیا اور طوفان میں کشتیِ نجات بنائی۔',
    fullStory: `Prophet Nuh (AS) was sent when humanity first fell into idol worship (Wadd, Suwa', Yaghuth, Ya'uq, and Nasr). For 950 years, Nuh called his people night and day, publicly and privately, pleading with them to seek forgiveness from Allah.

Instead of accepting the truth, the arrogant elite mocked him and threatened to stone him. Commanded by Allah, Nuh built a massive wooden ark inland where there was no sea. His detractors laughed at him, asking: "Did you become a carpenter after being a prophet?"

When the divine decree arrived, the fountains of the earth gushed forth and torrential rain poured from the skies. Only those who believed boarded the Ark with pairs of every animal. Even Nuh's own disbelieving son Kan'an refused to board and drowned upon the mountain peak. The Ark eventually rested safely on Mount Judi.`,
    keyEvents: [
      'First prophet to confront systematic idolatry',
      '950 years of relentless, compassionate preaching',
      'Construction of the Ark in the midst of desert and mockery',
      'The Great Deluge (Toofan-e-Nuh)',
      'The heartbreak of a father whose son rejected faith',
      'Resting on Mount Judi and rebirth of civil civilization'
    ],
    moralLesson: 'Lineage cannot save anyone without personal faith; perseverance in truth must never waver even when results take centuries.',
    quranOrHadithRef: 'Surah Nuh (Entire Surah 71), Surah Hud 11:25-49',
    audio: {
      title: 'Surah Nuh Recitation & Detailed Urdu Tafseer',
      speaker: 'Miraj-ul-Din Khan & Dr. Israr',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '38:50'
    },
    video: {
      title: 'The Great Flood & Prophet Nuh (AS) Ark',
      speaker: 'History of Prophets',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Nuh AS story Urdu full',
      durationFormatted: '32:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-hud',
    nameEnglish: 'Prophet Hud (AS) - The Warning to Mighty \'Ad of Iram',
    nameUrdu: 'حضرت ہود علیہ السلام - قومِ عاد اور ارم ذات العماد کا انجام',
    arabicName: 'هُودٌ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Messenger to the Giants of \'Ad in the Sand Dunes of Ahqaf',
    urduTitle: 'قومِ عاد کے نڈر پیغمبر جنہوں نے طاقتور سرکشوں کو للکارا',
    shortBio: 'Sent to the extraordinarily strong and wealthy tribe of \'Ad who built lofty pillars in Iram; destroyed by a furious freezing hurricane.',
    urduBio: 'احقاف کے ریگزاروں میں آباد طاقتور قومِ عاد کو دعوتِ حق دی، سرکشی پر خوفناک آندھی نے انہیں جڑ سے اکھاڑ دیا۔',
    fullStory: `The people of 'Ad were blessed with unmatched physical stature, colossal architectural genius, and luxurious gardens in the region of Ahqaf (between Yemen and Oman). They built towers and palaces of lofty pillars "the likes of which had never been created in any land" (Surah Al-Fajr).

However, their strength bred tyrannical pride: "Who is mightier than us in strength?" they boasted. Prophet Hud (AS) reminded them that Allah granted them their prowess and warned them against idol worship and oppression of the weak.

When they stubbornly defied the warnings and challenged Allah's punishment, a cloud appeared on the horizon. Thinking it brought rain, they celebrated. In reality, it was a ferocious, screaming wind that raged continuously for seven nights and eight days, leaving them lying dead like hollow trunks of uprooted date palms.`,
    keyEvents: [
      'Call to the architects of Iram of the Pillars',
      'Refutation of ethnic and physical supremacism',
      'Patience in the face of mockery and false accusations of madness',
      'The destructive freezing hurricane (Reeh-un Sarsarun)',
      'Salvation of Hud and the small group of righteous believers'
    ],
    moralLesson: 'Physical might and technological advancement are completely powerless before the wrath of the Creator when justice is abandoned.',
    quranOrHadithRef: 'Surah Hud 11:50-60, Surah Al-Ahqaf 46:21-26, Surah Al-Haaqqah 69:6-8',
    audio: {
      title: 'Story of Prophet Hud (AS)',
      speaker: 'Islamic History Audio',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '29:40'
    },
    video: {
      title: 'City of Pillars: The Lost Tribe of Ad',
      speaker: 'Archeological Quran Series',
      youtubeQuery: 'Hazrat Hud AS and Aad tribe documentary',
      durationFormatted: '24:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-saleh',
    nameEnglish: 'Prophet Saleh (AS) - The Miraculous She-Camel of Thamud',
    nameUrdu: 'حضرت صالح علیہ السلام - قومِ ثمود اور ناقۃ اللہ (اونٹنی) کا معجزہ',
    arabicName: 'صَالِحٌ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Messenger to Thamud in the Mountain City of Al-Hijr (Madain Saleh)',
    urduTitle: 'پہاڑوں کو تراش کر گھر بنانے والی ثمود کے پیغمبر',
    shortBio: 'Brought forth a pregnant she-camel from solid rock as demanded by Thamud; the conspirators hamstrung the camel and faced a deafening blast.',
    urduBio: 'پتھر سے معجزاتی اونٹنی نکالی، بدبختوں نے اونٹنی کو قتل کیا اور تیسرے دن ہولناک چیخ (صیحہ) سے ہلاک ہوئے۔',
    fullStory: `The people of Thamud succeeded 'Ad and inhabited the rocky valley of Al-Hijr. They were master stonemasons who carved intricate palaces and dwellings directly into the hearts of massive mountains, feeling completely immune from danger.

Prophet Saleh (AS) invited them to worship Allah alone. The leaders demanded an impossible sign: produce a living, pregnant she-camel out of a massive boulder. Saleh prayed to Allah, and the rock split open, delivering a majestic she-camel. Saleh warned them: "This is the She-Camel of Allah, a sign for you. Let her graze in Allah's land, and touch her not with harm, lest a painful punishment seize you."

The camel shared the water well, drinking on one day while the community drank on the next. Growing resentful of her presence and the truth she represented, a gang of nine corrupt leaders led by Qudar ibn Salif brutally hamstrung and slaughtered her. Saleh told them: "Enjoy yourselves in your homes for three days. That is a promise not to be denied." On the third day, a catastrophic blast (Sayhah) shattered their hearts.`,
    keyEvents: [
      'Splitting of the solid rock and emergence of Naqatullah',
      'The covenant of the water supply',
      'The conspiracy of the nine corrupt men in the city',
      'The slaughter of the She-Camel',
      'The 3-day respite and the cosmic seismic scream'
    ],
    moralLesson: 'Disrespecting the sacred signs of Allah and harboring corrupt conspirators inevitably brings collective ruin.',
    quranOrHadithRef: 'Surah Ash-Shu\'ara 26:141-159, Surah Al-A\'raf 7:73-79, Surah Al-Qamar 54:23-31',
    audio: {
      title: 'Hazrat Saleh (AS) & Madain Saleh',
      speaker: 'Tafseer Archives',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '27:15'
    },
    video: {
      title: 'Madain Saleh: The Rock Carvings of Thamud',
      speaker: 'Islamic History Documentaries',
      youtubeQuery: 'Madain Saleh documentary Urdu',
      durationFormatted: '21:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-ibrahim',
    nameEnglish: 'Prophet Ibrahim (AS) (Abraham) - Khalilullah & Father of Prophets',
    nameUrdu: 'حضرت ابراہیم علیہ السلام - خلیل اللہ، بت شکن اور ابو الانبیاء',
    arabicName: 'إِبْرَاهِيمُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Friend of Allah, Shatterer of Idols & Builder of the Ka\'bah',
    urduTitle: 'خلیل اللہ، نمرود کی آگ گلزار بنی، قربانی اور کعبہ کی تعمیر',
    shortBio: 'Shattered the idols of Babylon, emerged unscathed from Nimrod\'s inferno, settled his family in barren Mecca, and passed every supreme test.',
    urduBio: 'عقل و برہان سے توحید ثابت کی، بتوں کو توڑا، آگ میں ڈالے گئے تو آگ ٹھنڈی ہو گئی، اسماعیل کی قربانی اور کعبہ کا قیام۔',
    fullStory: `Prophet Ibrahim (AS) holds a supreme place across sacred history as Khalilullah (the intimate friend of Allah). Born in Ur of the Chaldeans into an idol-making family, his pure innate intellect rejected worshiping the sun, moon, stars, and stone statues.

He boldly shattered the town's idols with an axe, leaving the largest one intact with the axe hanging on its shoulder to expose their absurdity. Furious, King Nimrod commanded a gigantic furnace to be ignited and catapulted Ibrahim into the flames. Allah commanded: "O fire, be coolness and safety for Ibrahim!" (Surah Al-Anbiya 21:69), and the inferno transformed into a fragrant garden.

Ibrahim migrated for Allah's sake. In old age, he was blessed with Ismail and Ishaq. Commanded by Allah, he settled Hajar and baby Ismail in the uncultivated valley of Mecca, where the miraculous well of Zamzam burst forth. Later, he was tested with the sacrifice of his beloved son Ismail, which both submitted to unconditionally. Pleased with their surrender, Allah substituted a noble ram. Together, Ibrahim and Ismail raised the sacred foundations of the Ka'bah and called mankind to Hajj.`,
    keyEvents: [
      'Intellectual argument disproving celestial worship',
      'Smashing of the Babylonian idols',
      'Miraculous deliverance from Nimrod\'s catapulted fire',
      'Leaving baby Ismail and Hajar in the barren desert of Mecca',
      'The ultimate sacrifice (Dhibh-in Adheem) and Eid al-Adha legacy',
      'Laying the foundations of the Baytullah (Ka\'bah) with Ismail'
    ],
    historicalContext: 'The patriarch from whose lineage both the Israelite prophets and Prophet Muhammad ﷺ emerged.',
    moralLesson: 'Absolute submission (Islam) to Allah transforms worldly trials into miracles and immortal honor.',
    quranOrHadithRef: 'Surah Al-Baqarah 2:124-132, Surah As-Saffat 37:83-113, Surah Ibrahim (Chapter 14)',
    audio: {
      title: 'Hazrat Ibrahim (AS) Life Story Audio',
      speaker: 'Miraj-ul-Din Khan / EveryAyah',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '45:30'
    },
    video: {
      title: 'Prophet Ibrahim (AS): The Friend of Allah',
      speaker: 'Quranic Heritage Documentary',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Ibrahim AS story in Urdu',
      durationFormatted: '35:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-lut',
    nameEnglish: 'Prophet Lut (AS) (Lot) - The Stand against Degeneracy in Sodom',
    nameUrdu: 'حضرت لوط علیہ السلام - سدوم کی بستی میں اخلاقی پستی کے خلاف جہاد',
    arabicName: 'لُوطٌ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Nephew of Ibrahim (AS) & Warner to the Cities of the Plain',
    urduTitle: 'سدوم اور عمورہ کی بستیوں میں بے حیائی کے خلاف توحید کے علمبردار',
    shortBio: 'Preached against unprecedented moral perversion and highway robbery in Sodom; delivered while the city was overturned.',
    urduBio: 'قومِ لوط کی بدکاری اور سرکشی پر تنبیہ کی، نافرمان بیوی سمیت پوری بستی کو الٹ کر پتھروں کی بارش برسا دی گئی۔',
    fullStory: `Prophet Lut (AS), the nephew of Ibrahim (AS), was sent to the trans-Jordanian plain of Sodom and Gomorrah. The inhabitants had invented unnatural, shameful sexual crimes never before committed by any human society, while simultaneously committing extortion and highway robbery.

Lut warned them with tears and dignity to fear Allah and honor the sanctity of lawful family life. They responded with arrogance: "Drive Lut's family out of your city! Indeed, they are people who keep themselves pure!"

When angels in the appearance of handsome men visited Lut, the townspeople stormed his residence demanding them. Lut offered his lawful daughters in marriage for purification, but they refused. The angels revealed their true divine identity to Lut: "Travel with your family in the dark of night, and let none of you look back." At dawn, the city was completely overturned upside-down and rained upon with marked stones of baked clay. Lut's wife, who sympathized with the transgressors, was destroyed among them.`,
    keyEvents: [
      'Migration alongside Prophet Ibrahim (AS)',
      'Confronting societal degeneracy and brazen shamelessness',
      'Protection of honorable guests against the mob',
      'The nocturnal evacuation of the righteous believers',
      'Overturning of the city (Al-Mu\'tafikah) and rain of brimstone'
    ],
    moralLesson: 'No society can survive when basic moral boundaries, family dignity, and modesty are openly assaulted.',
    quranOrHadithRef: 'Surah Hud 11:77-83, Surah Al-Hijr 15:57-77, Surah Al-Anbiya 21:74-75',
    audio: {
      title: 'Hazrat Lut (AS) & Sodom',
      speaker: 'Islamic History Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '26:50'
    },
    video: {
      title: 'The Dead Sea & The People of Lut',
      speaker: 'Historical Archeology',
      youtubeQuery: 'Hazrat Lut AS Dead Sea story',
      durationFormatted: '20:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-ismail',
    nameEnglish: 'Prophet Ismail (AS) (Ishmael) - The Patient Sacrificed Son (Dhabih)',
    nameUrdu: 'حضرت اسماعیل علیہ السلام - ذبیح اللہ، آبِ زمزم اور تعمیرِ کعبہ',
    arabicName: 'إِسْمَاعِيلُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Dhabihullah, Father of the Adnanite Arabs & Ancestor of Prophet Muhammad ﷺ',
    urduTitle: 'ذبیح اللہ، خلیل کے سعادت مند فرزند جن کے پیروں سے زمزم پھوٹا',
    shortBio: 'Left as an infant in Mecca, struck the ground where Zamzam sprouted, willingly offered his neck for sacrifice in obedience to Allah.',
    urduBio: 'بچپن میں مکہ کے ریگزار میں پیاس کی شدت میں زمزم کا معجزہ، باپ کے خواب کی تعمیل میں جان کا نذرانہ پیش کرنے والے۔',
    fullStory: `Prophet Ismail (AS) was the firstborn son of Prophet Ibrahim (AS) through Hazrat Hajar. While still a suckling infant, he was brought to the desert valley of Bakkah (Mecca). When the water skins ran dry, Hajar ran desperately seven times between the hills of Safa and Marwah seeking sustenance. At that moment, angel Jibreel struck the earth, and the miraculous, eternal spring of Zamzam gushed forth.

Growing into youth, Ismail was a model of filial devotion and deep faith. When Ibrahim saw in a true divine dream that he was commanded to sacrifice him, he consulted his son: "O my son, I see in vision that I offer you in sacrifice. What is your view?" Ismail replied without hesitation: "O my father! Do as you are commanded; you will find me, if Allah wills, among the steadfast" (Surah As-Saffat 37:102).

As Ibrahim laid him down and passed the blade, Allah called out that the test had been fulfilled and ransomed him with a great ram. Later, father and son together built the Ka'bah and prayed for a prophet to arise from Ismail's seed—a prayer fulfilled in Prophet Muhammad ﷺ.`,
    keyEvents: [
      'The miracle of the Zamzam well in unpopulated Mecca',
      'The Sa\'ee between Safa and Marwah commemorated in Hajj',
      'The sublime dialogue of surrender before the sacrifice',
      'Ransomed by the ram from Paradise (Eid al-Adha)',
      'Constructing the Holy Ka\'bah with Prophet Ibrahim (AS)'
    ],
    moralLesson: 'True faith is total surrender of what is dearest to our heart for the pleasure of Allah.',
    quranOrHadithRef: 'Surah As-Saffat 37:100-111, Surah Maryam 19:54-55',
    audio: {
      title: 'Hazrat Ismail (AS) & Ka\'bah History',
      speaker: 'Recitation & Tafseer',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '31:20'
    },
    video: {
      title: 'Zamzam & The Sacrifice of Ismail (AS)',
      speaker: 'Mecca Sacred History',
      youtubeQuery: 'Hazrat Ismail AS story Urdu',
      durationFormatted: '25:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-ishaq',
    nameEnglish: 'Prophet Ishaq (AS) (Isaac) - The Promised Gift of Righteousness',
    nameUrdu: 'حضرت اسحاق علیہ السلام - سارہ کے بطن سے بشارت یافتہ نبی',
    arabicName: 'إِسْحَاقُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Prophet of Canaan & Father of Yaqub (Israel)',
    urduTitle: 'حضرت ابراہیم و سارہ کے فرزند اور انبیاءِ بنی اسرائیل کے جد',
    shortBio: 'Announced to Sarah in her old age by angels; a noble, pious prophet whose lineage produced centuries of guidance.',
    urduBio: 'فرشتوں نے بڑھاپے میں حضرت سارہ کو ان کی ولادت کی خوشخبری دی، حکمت و تقویٰ کے مینار۔',
    fullStory: `Prophet Ishaq (AS) was born to Prophet Ibrahim (AS) and Hazrat Sarah when both were in extreme old age. Angels traveling to Sodom stopped at Ibrahim's home and announced glad tidings of a knowledgeable son named Ishaq, and after him, Yaqub. Sarah laughed in astonishment, saying: "Shall I bear a child when I am an old woman and this my husband is an old man?" The angels replied: "Do you marvel at the decree of Allah? The mercy of Allah and His blessings be upon you, O people of the house!"

Ishaq grew to be an exemplary servant of Allah, endowed with profound wisdom, eloquence, and patience. He carried forward the monotheistic mission of Ibrahim in Palestine and Syria. From his son Yaqub (Israel) arose the entire lineage of the Prophets of Bani Israel.`,
    keyEvents: [
      'Angelic glad tidings to Sarah and Ibrahim in old age',
      'Continuation of Ibrahim\'s monotheistic mission in the Levant',
      'Father of Prophet Yaqub (AS) and grandfather of Prophet Yusuf (AS)'
    ],
    moralLesson: 'Nothing is impossible for Allah; His promises arrive precisely at the ordained divine hour.',
    quranOrHadithRef: 'Surah Hud 11:69-73, Surah As-Saffat 37:112-113',
    audio: {
      title: 'Hazrat Ishaq (AS) Life',
      speaker: 'Prophetic Chronicles',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '19:45'
    },
    video: {
      title: 'Hazrat Ishaq (AS) in Islamic History',
      speaker: 'Scholarly Lecture',
      youtubeQuery: 'Hazrat Ishaq AS story Urdu',
      durationFormatted: '16:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-yaqub',
    nameEnglish: 'Prophet Yaqub (AS) (Jacob) - The Model of Sabr-e-Jameel (Beautiful Patience)',
    nameUrdu: 'حضرت یعقوب علیہ السلام (اسرائیل) - صبرِ جمیل کے عظیم پیکر',
    arabicName: 'يَعْقُوبُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Israel, Patriarch of the Twelve Tribes & Father of Yusuf (AS)',
    urduTitle: 'صبرِ جمیل کے علمبردار جن کی آنکھیں یوسف کے فراق میں سفید ہو گئیں',
    shortBio: 'Endured decades of agonizing separation from his beloved son Yusuf with unshakeable reliance upon Allah, teaching the timeless Sabr-e-Jameel.',
    urduBio: 'یوسف کے فراق میں برسوں روئے لیکن امید کا دامن کبھی نہ چھوڑا: "میں اپنی پریشانی کی شکایت صرف اللہ سے کرتا ہوں"۔',
    fullStory: `Prophet Yaqub (AS), also known as Isra'il, was blessed with twelve sons who became the heads of the Twelve Tribes. His heart had a special tender love for young Yusuf and Binyamin due to their piety and innocence.

When his older sons cast Yusuf into a dark well out of jealousy and brought back a shirt stained with false blood, Yaqub saw through their deceit. Despite devastating grief that caused him to weep until his eyesight failed, he did not utter a single word of complaint against Allah. He famously declared: "So patience is most fitting (Fasabrun Jameel). And Allah is the one sought for help against that which you describe" (Surah Yusuf 12:18).

Decades later, when even Binyamin was retained in Egypt, his sons chided him for remembering Yusuf. Yaqub proclaimed his magnificent faith: "I only complain of my suffering and my grief to Allah, and I know from Allah that which you do not know. O my sons, go and find out about Yusuf and his brother and despair not of the relief of Allah" (12:86-87). His eyesight was miraculously restored when Yusuf's shirt was placed upon his face.`,
    keyEvents: [
      'Bearing the Twelve Tribes of Israel',
      'The trial of the false blood on Yusuf\'s shirt',
      'Decades of heartbreak without losing faith in Allah\'s mercy',
      'The restored eyesight upon receiving the shirt from Egypt',
      'Admonishing his sons on his deathbed to remain steadfast upon Islam'
    ],
    moralLesson: 'Sabr-e-Jameel (Beautiful Patience) means weeping with tears while keeping the heart firmly attached to Allah\'s ultimate victory.',
    quranOrHadithRef: 'Surah Yusuf (Chapter 12), Surah Al-Baqarah 2:132-133',
    audio: {
      title: 'Hazrat Yaqub (AS) & Sabr Jameel',
      speaker: 'Dr. Israr Ahmed Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '36:10'
    },
    video: {
      title: 'The Tears and Patience of Yaqub (AS)',
      speaker: 'Quranic Pearls',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Yaqub AS sabr story Urdu',
      durationFormatted: '27:50'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-yusuf',
    nameEnglish: 'Prophet Yusuf (AS) (Joseph) - Ahsan al-Qasas (The Best of Stories)',
    nameUrdu: 'حضرت یوسف علیہ السلام - احسن القصص، حیا، قید اور مصر کا اقتدار',
    arabicName: 'يُوسُفُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Truthful One (As-Siddiq), Master of Dream Interpretation & Vizier of Egypt',
    urduTitle: 'احسن القصص، کنویں سے نکل کر مصر کے تخت تک، عفت اور معافی کا شہکار',
    shortBio: 'Thrown into a well by jealous brothers, sold into slavery, framed and imprisoned for safeguarding his modesty, elevated to ruler of Egypt.',
    urduBio: 'بھائیوں کی حسد، کنویں میں پھینکے جانا، عزیزِ مصر کے محل میں پاکدامنی، جیل اور خوابوں کی تعبیر، پھر قحط کے دور میں مصر کی فرمانروائی۔',
    fullStory: `The story of Prophet Yusuf (AS) is uniquely termed in the Quran as Ahsan al-Qasas (The Most Beautiful of Stories). Endowed with half of all human beauty and the divine gift of dream interpretation, his life was an epic journey of faith through betrayal, temptation, wrongful imprisonment, and ultimate royal vindication.

Cousin brothers threw him into a desolate well, where a passing caravan rescued and sold him for a few silver dirhams to the Aziz of Egypt. In the palace, when the Aziz's wife attempted to seduce him, Yusuf fled, choosing prison over disobedience to Allah: "My Lord, prison is more dear to me than that to which they invite me!" (Surah Yusuf 12:33).

Years later in prison, he interpreted the dreams of his fellow inmates and accurately decoded the Pharaoh's dream of seven fat cows eaten by seven lean ones, predicting seven years of bountiful harvest followed by seven years of catastrophic famine. Freed and honored, he was appointed Treasurer and Vizier of Egypt. When his starving brothers arrived seeking grain, he forgave them completely: "No blame will there be upon you today. May Allah forgive you; and He is the most merciful of the merciful" (12:92).`,
    keyEvents: [
      'The dream of eleven stars, sun, and moon prostrating',
      'Betrayal and cast into the deep well',
      'The trial of seduction and guarding pure chastity',
      'Preaching Tawhid within the prison walls',
      'Decoding Pharaoh\'s national crisis dream',
      'Ascension to the throne of Egypt and grand family reunion'
    ],
    moralLesson: 'Chastity and integrity may bring temporary trial, but Allah elevates the patient to supreme worldly and eternal honor.',
    quranOrHadithRef: 'Surah Yusuf (Entire 111 Verses of Chapter 12)',
    audio: {
      title: 'Surah Yusuf Full Recitation & Urdu Translation',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '58:40'
    },
    video: {
      title: 'Prophet Yusuf (AS) Complete Life Documentary',
      speaker: 'Quranic History',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Yousuf AS full story Urdu',
      durationFormatted: '48:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-ayub',
    nameEnglish: 'Prophet Ayyub (AS) (Job) - The Pinnacle of Resilience in Illness',
    nameUrdu: 'حضرت ایوب علیہ السلام - مصائب پر صبر، شفا اور سچی بندگی',
    arabicName: 'أَيُّوبُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Noble Servant Tested with Total Loss of Health, Family & Wealth',
    urduTitle: 'صبرِ ایوب کا استعارہ، برسوں کی بیماری میں بھی ذکرِ الٰہی جاری رکھا',
    shortBio: 'Lost his 14 children, vast wealth, and bodily health for years, yet never complained; healed miraculously by striking the ground with his foot.',
    urduBio: 'مال، اولاد اور صحت سب چلی گئی مگر زبان پر شکوہ نہیں آیا۔ اللہ نے زمین پر پاؤں مارنے کا حکم دیا اور شفا بخش چشمہ جاری ہوا۔',
    fullStory: `Prophet Ayyub (AS) was blessed with boundless wealth, vast herds of livestock, loving children, and flourishing estates in the Levant. He was renowned for his generosity to orphans, widows, and travelers.

Allah tested him with the loss of every earthly blessing. His livestock perished, his houses collapsed crushing his children, and severe disease afflicted his entire body until even close friends abandoned him out of fear. Only his devoted, pious wife Rahma remained steadfast by his side, nursing him and working menially to buy bread.

Throughout years of agony, Ayyub's tongue never ceased glorifying Allah. When asked why he did not pray for immediate relief, he replied: "Allah gave me seventy years of pristine health; should I not bear seventy years of illness for His sake?" Eventually, he whispered the most polite, humble prayer: "Indeed, adversity has touched me, and You are the Most Merciful of the merciful" (Surah Al-Anbiya 21:83). Allah commanded him: "Strike [the ground] with your foot; this is a [spring for] a cool bath and drink" (Surah Sad 38:42). He was fully restored, and Allah multiplied his wealth and children twofold.`,
    keyEvents: [
      'Testing through total loss of wealth and offspring',
      'Affliction of physical disease and social exile',
      'The unwavering loyalty of his faithful wife',
      'The timeless humble prayer of Ayyub',
      'The cool miraculous spring of healing and divine restoration'
    ],
    moralLesson: 'Affliction is not necessarily a sign of Allah\'s anger; it is often the kiln that refines gold and elevates spiritual ranks.',
    quranOrHadithRef: 'Surah Al-Anbiya 21:83-84, Surah Sad 38:41-44',
    audio: {
      title: 'Hazrat Ayyub (AS) & The Test of Patience',
      speaker: 'Tafseer Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '25:30'
    },
    video: {
      title: 'Sabr-e-Ayyub: Life Story & Lessons',
      speaker: 'Islamic Chronicle',
      youtubeQuery: 'Hazrat Ayyub AS story Urdu',
      durationFormatted: '22:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-shuayb',
    nameEnglish: 'Prophet Shu\'ayb (AS) (Jethro) - Khatib al-Anbiya & Champion of Fair Trade',
    nameUrdu: 'حضرت شعیب علیہ السلام - خطیب الانبیاء، ناپ تول اور عدل کی دعوت',
    arabicName: 'شُعَيْبٌ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Messenger to Midian & Ashab al-Aykah (People of the Wood)',
    urduTitle: 'خطیب الانبیاء جنہوں نے تاجروں کی ہیرا پھیری اور ناپ تول میں کمی پر روکا',
    shortBio: 'Known for sublime eloquence; commanded business ethics, accurate weights, and honesty in the marketplace; father-in-law of Musa (AS).',
    urduBio: 'فصاحت و بلاغت کے بادشاہ، تجارتی بددیانتی کے خلاف علم بلند کیا، حضرت موسیٰ علیہ السلام کے سسر۔',
    fullStory: `Prophet Shu'ayb (AS) was sent to the people of Midian and the forest oasis of Ashab al-Aykah. His people were prosperous traders controlling vital caravan routes, but they practiced rampant financial corruption—defrauding customers by manipulating weights and balances, cheating travelers, and blocking trade routes.

Endowed with legendary eloquence that earned him the title Khatib al-Anbiya (The Orator of the Prophets), Shu'ayb reasoned with them: "O my people, worship Allah; you have no deity other than Him. Give full measure and weight, and do not deprive people of their due, and do not cause corruption upon the earth after its reformation" (Surah Al-A'raf 7:85).

The wealthy merchants sneered: "O Shu'ayb, does your prayer command you that we should leave what our fathers worshiped or not do with our wealth what we please?" (Surah Hud 11:87). When they threatened to exile him, an earthquake and a scorching cloud of fire (Adhab Yawm az-Zullah) consumed them. Prophet Musa (AS) later found sanctuary in Midian and worked for Shu'ayb for ten years before returning to Egypt.`,
    keyEvents: [
      'Eloquence in economic and spiritual discourse',
      'Establishing business ethics and consumer rights as divine law',
      'Confronting capitalist greed and corrupt trade cartels',
      'Providing refuge and marrying his daughter to Prophet Musa (AS)',
      'The punishment of the Scorching Cloud upon the dishonest'
    ],
    moralLesson: 'Worship is incomplete without honest earnings; cheating in commerce is a grievous transgression against God and man.',
    quranOrHadithRef: 'Surah Hud 11:84-95, Surah Al-A\'raf 7:85-93, Surah Ash-Shu\'ara 26:176-191',
    audio: {
      title: 'Hazrat Shu\'ayb (AS) & Midian History',
      speaker: 'Islamic History',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '28:10'
    },
    video: {
      title: 'Hazrat Shuaib (AS) in the Quran',
      speaker: 'Heritage Media',
      youtubeQuery: 'Hazrat Shuaib AS story Urdu',
      durationFormatted: '19:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-musa',
    nameEnglish: 'Prophet Musa (AS) (Moses) - Kalimullah & The Exodus from Pharaoh',
    nameUrdu: 'حضرت موسیٰ علیہ السلام - کلیم اللہ، فرعون کی ہلاکت اور بحرِ قلزم کا پھٹنا',
    arabicName: 'مُوسَى عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Kalimullah (The One Who Spoke with Allah) & Lawgiver of the Torah',
    urduTitle: 'کلیم اللہ، فرعون کے محل میں پرورش، عصا کا معجزہ اور بنی اسرائیل کی نجات',
    shortBio: 'Placed in a basket in the Nile, raised in Pharaoh\'s palace, confronted tyranny with the staff of miracles, parted the Red Sea, received the Ten Commandments.',
    urduBio: 'دریا کی موجوں میں ٹوکری، فرعون کے سامنے حق کا اعلان، جادوگروں کا سجدہ، سمندر میں راستے اور کوہِ طور پر کلام۔',
    fullStory: `Prophet Musa (AS) is the most frequently mentioned prophet in the Holy Quran, his life serving as a profound mirror for overcoming tyranny. Born in the year Pharaoh ordered every newborn Hebrew boy slaughtered, his mother placed him in a wooden chest into the Nile River. By divine orchestration, Pharaoh's righteous wife Asiya drew him from the water and raised him in the imperial palace.

Fleeing to Midian after defending an oppressed Israelite, he lived in exile for ten years. On Mount Sinai (Tur), Allah spoke to him directly from the burning bush, granting him two supreme signs: the staff that turned into a serpent and the radiant hand (Yad-e-Bayda). Commanded to face Pharaoh, Musa took his brother Harun (AS) and delivered the message of monotheism, demanding the liberation of Bani Israel.

Pharaoh assembled Egypt's elite magicians, but Musa's miraculous staff swallowed all their illusions; the magicians instantly fell into prostration, accepting Musa's Lord despite Pharaoh's threat of crucifying them. During the nocturnal Exodus, when trapped between Pharaoh's chariots and the roaring Red Sea, Musa struck the water with his staff. Twelve dry highways opened, saving the believers while drowning Pharaoh and his legions. On Mount Sinai, Musa fasted 40 days and received the Tablets of the Torah.`,
    keyEvents: [
      'The floating chest on the Nile and adoption by Queen Asiya',
      'The Ten Years of shepherd life in Midian with Prophet Shu\'ayb',
      'Direct speech with Allah at Mount Tur (Sinai)',
      'The epic showdown with Pharaoh\'s elite magicians',
      'The Nine Divine Signs (Plagues of Egypt)',
      'Parting of the Red Sea and drowning of Pharaoh',
      'The Golden Calf (Samiri) trial and receiving the Torah'
    ],
    historicalContext: 'Marks the collapse of ancient tyranny and the codification of the Mosaic divine law.',
    moralLesson: 'When facing impossible odds with faith, the very sea becomes a highway; tyrants will drown in their own arrogance.',
    quranOrHadithRef: 'Surah Al-Qasas 28:1-43, Surah Ta-Ha 20:9-98, Surah Al-A\'raf 7:103-162',
    audio: {
      title: 'Hazrat Musa (AS) & Pharaoh Epic Tafseer',
      speaker: 'Miraj-ul-Din Khan & Dr. Israr',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '54:20'
    },
    video: {
      title: 'Musa (AS) & The Parting of the Red Sea',
      speaker: 'Quranic Documentaries',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Musa AS story full Urdu',
      durationFormatted: '44:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-harun',
    nameEnglish: 'Prophet Harun (AS) (Aaron) - The Eloquent Brother & High Priest',
    nameUrdu: 'حضرت ہارون علیہ السلام - فصیح اللسان بھائی اور موسیٰ (ع) کے معین',
    arabicName: 'هَارُونُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Brother, Vizier and Cohort of Musa (AS) in the Mission to Pharaoh',
    urduTitle: 'حضرت موسیٰ کے دستِ راست اور فصیح بیان پیغمبر',
    shortBio: 'Granted prophet-hood in response to Musa\'s prayer to assist in speech; stood firm against the idolaters of the Golden Calf.',
    urduBio: 'موسیٰ علیہ السلام کی دعا سے نبوت ملی: "اور میرے گھر والوں میں سے میرا ایک وزیر بنا دے، ہارون میرے بھائی کو"۔',
    fullStory: `When Prophet Musa (AS) received the monumental mission to confront Pharaoh, he recognized his own difficulty with speech due to an incident in his childhood. He prayed: "And appoint for me a minister from my family: Harun, my brother. Increase through him my strength and let him share my task" (Surah Ta-Ha 20:29-32). Allah immediately granted this request, appointing Harun as a prophet.

Harun was beloved for his gentle demeanor, diplomacy, and persuasive clarity. He accompanied Musa into Pharaoh's court, standing shoulder to shoulder against the supreme tyrant of the age.

When Musa ascended Mount Sinai for forty days, Harun was left in charge of Bani Israel. When Samiri fashioned the Golden Calf out of gold jewelry, Harun tirelessly rebuked the crowd: "O my people, you are only being tested by it, and indeed, your Lord is the Most Merciful, so follow me and obey my order" (20:90). Although they overpowered and threatened him, he preserved the unity of the community until Musa returned.`,
    keyEvents: [
      'Appointed prophet via fraternal supplication of Musa (AS)',
      'Joint delegation to Pharaoh\'s imperial court',
      'Guarding the camp of Bani Israel during Musa\'s 40 days on Mount Sinai',
      'Confronting Samiri and the idolaters of the Golden Calf'
    ],
    moralLesson: 'True leadership requires mutual support; patience and diplomacy are essential when managing rebellious communities.',
    quranOrHadithRef: 'Surah Ta-Ha 20:29-36, Surah Al-A\'raf 7:142-150',
    audio: {
      title: 'Hazrat Harun (AS) Life & Support of Musa',
      speaker: 'Prophetic Studies',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '21:40'
    },
    video: {
      title: 'The Golden Calf & Hazrat Harun (AS)',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Harun AS story Urdu',
      durationFormatted: '18:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-dhulkifl',
    nameEnglish: 'Prophet Dhul-Kifl (AS) (Ezekiel) - The Guardian of Solemn Pledges',
    nameUrdu: 'حضرت ذوالکفل علیہ السلام - ایفائے عہد اور راتوں کے عابد',
    arabicName: 'ذُو الْكِفْلِ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Patient Prophet Who Fulfilled Every Trust and Covenant',
    urduTitle: 'صابر، نیکوکار اور اللہ کے عہود کو پورا کرنے والے نبی',
    shortBio: 'Pledged to fast all day, pray all night, and judge between people with flawless justice without anger; praised in Surah Al-Anbiya.',
    urduBio: 'دن کو روزے، رات کو عبادت اور دن بھر لوگوں کے معاملات بغیر غصے کے حل کرنے کا عہد پورا کیا۔',
    fullStory: `Prophet Dhul-Kifl (AS) is mentioned in the Holy Quran alongside Ismail and Idris as being among the patient and righteous: "And [mention] Ismail and Idris and Dhul-Kifl; all were of the patient. And We admitted them into Our mercy. Indeed, they were of the righteous" (Surah Al-Anbiya 21:85-86).

The name "Dhul-Kifl" literally means "Possessor of the Fold" or "The One of the Double Portion / Covenant". When an elderly prophet sought a successor to govern the community, he laid three conditions: who among you will fast every day without break, stand in prayer throughout the night without sleeping, and judge between the people without ever becoming angry?

Dhul-Kifl stood up and pledged to uphold all three. Satan repeatedly attempted to provoke him to rage during his rare moments of rest, coming as an aggrieved old man with endless complaints, but Dhul-Kifl maintained absolute serenity, fulfilled his promise to perfection, and earned Allah's praise.`,
    keyEvents: [
      'Assuming leadership through a voluntary solemn covenant',
      'Daily continuous fasting and nightly vigils',
      'Unshakeable equanimity and justice in judgment',
      'Overcoming Satan\'s relentless provocations of anger'
    ],
    moralLesson: 'Self-control over anger and unwavering commitment to promises are hallmarks of true prophetic character.',
    quranOrHadithRef: 'Surah Al-Anbiya 21:85-86, Surah Sad 38:48',
    audio: {
      title: 'Hazrat Dhul-Kifl (AS) Story',
      speaker: 'Chronicles of Prophets',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '16:20'
    },
    video: {
      title: 'Who was Prophet Dhul-Kifl (AS)?',
      speaker: 'Islamic Scholars Archive',
      youtubeQuery: 'Hazrat Zulkifl AS story Urdu',
      durationFormatted: '14:50'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-dawud',
    nameEnglish: 'Prophet Dawud (AS) (David) - Slayer of Jalut & Voice of the Zabur',
    nameUrdu: 'حضرت داؤد علیہ السلام - جالوت کا قتل، زبور کی تلاوت اور لوہے کا موم ہونا',
    arabicName: 'دَاوُودُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'King of Israel, Recipient of the Zabur (Psalms) & Master Craftsman',
    urduTitle: 'جالوت کو مارنے والے، زبور کے نغمات جن کے ساتھ پہاڑ اور پرندے تسبیح کرتے',
    shortBio: 'Slew the giant tyrant Jalut (Goliath) with a sling, blessed with molten iron softening in his hands, fasted alternating days (Sawm Dawud).',
    urduBio: 'گوپھن کے پتھر سے جالوت کو گرایا، زبور کی پردرد تلاوت، لوہا ہاتھوں میں موم بنا اور زرہیں بنائیں، ایک دن روزہ ایک دن افطار۔',
    fullStory: `Prophet Dawud (AS) was a young shepherd boy when King Talut led the army of believers against the terrifying Philistine giant Jalut (Goliath). While the army trembled at Jalut's immense stature, Dawud stepped forward armed only with a shepherd's staff, a leather sling, and five smooth pebbles. Proclaiming his trust in Allah, he hurled a stone that struck Jalut between the eyes, dropping him dead instantly.

Allah granted Dawud both kingship and prophethood, alongside the revelation of the Zabur (Psalms). His recitation was so melodious and spiritually overwhelming that wild birds paused in mid-air and mountains joined in his glorification of Allah.

Despite ruling a vast empire, Dawud never ate from state treasuries; he earned his livelihood through physical craftsmanship. Allah softened iron in his hands like warm wax, enabling him to invent interlocking chainmail armor (Dir'). The Prophet Muhammad ﷺ praised him: "The most beloved prayer to Allah is the prayer of Dawud, and the most beloved fasting is the fast of Dawud; he used to sleep half the night, stand for a third, sleep for a sixth, and he used to fast alternate days" (Sahih Bukhari).`,
    keyEvents: [
      'Defeating the giant Goliath (Jalut) with a single pebble sling',
      'Revelation of the holy Psalms (Zabur)',
      'Mountains and birds echoing his morning and evening Tasbih',
      'The miracle of iron softening in his hands without fire',
      'Establishing the ultimate gold standard of worship (Sawm Dawud)'
    ],
    moralLesson: 'Relying on Allah makes the small overcome the mighty; true kings eat from the toil of their own hands.',
    quranOrHadithRef: 'Surah Al-Baqarah 2:249-251, Surah Saba 34:10-11, Surah Sad 38:17-26',
    audio: {
      title: 'Hazrat Dawud (AS) & The Zabur Recitations',
      speaker: 'Tafseer & Recitation',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '33:15'
    },
    video: {
      title: 'David vs Goliath & The Kingdom of Dawud (AS)',
      speaker: 'Islamic History Documentaries',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Dawud AS story Urdu',
      durationFormatted: '26:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-sulaiman',
    nameEnglish: 'Prophet Sulaiman (AS) (Solomon) - The Ruler of Winds, Jinn & Animals',
    nameUrdu: 'حضرت سلیمان علیہ السلام - جن و انس، ہواؤں اور چرند پرند کے حاکم',
    arabicName: 'سُلَيْمَانُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'King-Prophet of Unrivaled Dominion & Builder of Bayt al-Maqdis',
    urduTitle: 'بے مثال سلطنت، پرندوں کی بولیاں، چیونٹی کا واقعہ اور ملکہ بلقیس کا اسلام',
    shortBio: 'Granted a kingdom like none other: understood languages of birds and ants, commanded the winds and subjugated jinn, invited Queen Bilqis of Sheba to Islam.',
    urduBio: 'ہوا ان کی سواری تھی، جنات ان کے حکم پر عمارتیں بناتے، چیونٹی اور ہدہد کی گفتگو سنی، ملکہ سبا کو توحید کی طرف لائے۔',
    fullStory: `Prophet Sulaiman (AS), the son of Dawud (AS), prayed: "My Lord, forgive me and grant me a kingdom such as will not belong to anyone after me. Indeed, You are the Bestower" (Surah Sad 38:35). Allah answered with the most astonishing empire in human history: winds traveled a month's journey in a single morning at his command; springs of molten brass flowed for him; and legions of jinn built majestic palaces, sanctuaries, and basins under his supervision.

Sulaiman was granted the miraculous ability to comprehend the speech of animals. When marching with his majestic army, he overheard a tiny ant warn her colony: "O ants, enter your dwellings that you not be crushed by Sulaiman and his soldiers while they perceive not" (Surah An-Naml 27:18). Sulaiman smiled joyfully and immediately thanked Allah for His blessings.

When his hoopoe bird (Hudhud) reported that the Kingdom of Sheba (Yemen) was ruled by a queen named Bilqis worshiping the sun, Sulaiman sent an official letter beginning: "In the name of Allah, the Entirely Merciful, the Especially Merciful: Be not haughty against me, but come to me in submission" (27:30-31). Impressed by his divine court and the glass palace built over flowing water, Queen Bilqis entered Islam. Sulaiman died leaning on his staff while supervising the jinn, demonstrating that even jinn know nothing of the unseen.`,
    keyEvents: [
      'Subjugation of the wind, flowing brass, and legions of jinn',
      'Understanding the conversation of the ant and the hoopoe bird',
      'Construction of the sacred Temple in Jerusalem (Bayt al-Maqdis)',
      'The letter and glass palace test of Queen Bilqis of Sheba',
      'His passing while standing in worship, exposing jinn\'s ignorance of the unseen'
    ],
    moralLesson: 'Vast worldly wealth and power should only increase one in humility and gratitude to the Creator.',
    quranOrHadithRef: 'Surah An-Naml 27:15-44, Surah Saba 34:12-14, Surah Sad 38:30-40',
    audio: {
      title: 'Hazrat Sulaiman (AS) & Queen Bilqis',
      speaker: 'Miraj-ul-Din Khan Tafseer',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '39:50'
    },
    video: {
      title: 'The Kingdom of Solomon & The Palace of Glass',
      speaker: 'Quranic Stories Documentary',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Sulaiman AS story Urdu documentary',
      durationFormatted: '33:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-ilyas',
    nameEnglish: 'Prophet Ilyas (AS) (Elijah) - The Defier of Baal Worship',
    nameUrdu: 'حضرت الیاس علیہ السلام - بعل بت کی پرستش کے خلاف توحید کا علم',
    arabicName: 'إِلْيَاسُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Messenger to Baalbek & Warner Against Idol Worship',
    urduTitle: 'بعلبک کی بستی میں بعل نامی بت کی پوجا روکنے والے پیغمبر',
    shortBio: 'Confronted the corrupt elite who abandoned the Best of Creators to worship the golden idol Baal; praised in Surah As-Saffat.',
    urduBio: 'قوم کو جھنجھوڑا: "کیا تم بعل کو پکارتے ہو اور بہترین پیدا کرنے والے اللہ کو چھوڑ دیتے ہو؟"۔',
    fullStory: `Prophet Ilyas (AS) was sent to the people of Baalbek in the Levant (Lebanon). The rulers and masses had turned away from the worship of Allah to venerate a colossal golden idol named "Baal", associating divine attributes with it.

Ilyas challenged them with clarity: "Do you call upon Baal and leave the best of creators—Allah, your Lord and the Lord of your first forefathers?" (Surah As-Saffat 37:125-126). The tyrants rejected him and plotted his demise. A severe multi-year drought struck the land as a consequence of their defiance.

Despite facing persecution, Ilyas remained unshaken, roaming the mountains and calling people back to Tawhid until a faction repented and returned to the path of righteousness. Allah inscribed him among the immortal righteous: "Peace be upon Ilyas. Indeed, We thus reward the doers of good" (37:130-131).`,
    keyEvents: [
      'Confronting the state-sponsored golden idol Baal in Baalbek',
      'Warning against abandoning the Supreme Creator',
      'Surviving persecution and preserving the covenant of Tawhid'
    ],
    moralLesson: 'No majority opinion or governmental decree can make idol worship or moral corruption legitimate.',
    quranOrHadithRef: 'Surah As-Saffat 37:123-132, Surah Al-An\'am 6:85',
    audio: {
      title: 'Hazrat Ilyas (AS) Story',
      speaker: 'Prophetic Chronicles',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '18:40'
    },
    video: {
      title: 'Hazrat Ilyas (AS) & The Temple of Baalbek',
      speaker: 'Heritage Media',
      youtubeQuery: 'Hazrat Ilyas AS story Urdu',
      durationFormatted: '16:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-alyasa',
    nameEnglish: 'Prophet Al-Yasa (AS) (Elisha) - The Steadfast Successor',
    nameUrdu: 'حضرت الیسع علیہ السلام - الیاس (ع) کے جانشین اور برگزیدہ نبی',
    arabicName: 'الْيَسَعُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Successor of Prophet Ilyas (AS) & Guide to Bani Israel',
    urduTitle: 'حضرت الیاس کے بعد بنی اسرائیل کی رہنمائی کرنے والے برگزیدہ نبی',
    shortBio: 'Chosen by Allah to continue the prophetic mission, renowned for deep piety, justice, and leading with divine guidance.',
    urduBio: 'قرآن میں اسماعیل، یونس اور لوط کے ساتھ ذکر کیا گیا: "اور سب کو ہم نے جہاں والوں پر فضیلت دی"۔',
    fullStory: `Prophet Al-Yasa (AS) was the designated companion and successor to Prophet Ilyas (AS). When Ilyas departed, Al-Yasa shouldered the responsibility of maintaining monotheism among Bani Israel during a turbulent era of political fragmentation and moral decay.

He traveled continuously across cities and villages, settling disputes, healing communal rifts, and reminding people of the sacred covenant with Allah. The Quran mentions him with radiant distinction: "And remember Ismail, Elisha, and Dhul-Kifl, and all are among the outstanding" (Surah Sad 38:48). His life was a testament to quiet, steadfast dedication without seeking personal acclaim.`,
    keyEvents: [
      'Mentorship under Prophet Ilyas (AS)',
      'Unifying believers during eras of political fragmentation',
      'Ranked among the most outstanding righteous servants in the Quran'
    ],
    moralLesson: 'Continuity of prophetic teaching is as vital as its inception; faithful successors keep the torch of truth burning.',
    quranOrHadithRef: 'Surah Al-An\'am 6:86, Surah Sad 38:48',
    audio: {
      title: 'Hazrat Al-Yasa (AS) Life',
      speaker: 'Scholarly Archive',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '15:10'
    },
    video: {
      title: 'Prophet Al-Yasa (AS) in Islamic Tradition',
      speaker: 'Historical Reflections',
      youtubeQuery: 'Hazrat Al Yasa AS story Urdu',
      durationFormatted: '13:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-yunus',
    nameEnglish: 'Prophet Yunus (AS) (Jonah) - Dhun-Nun & The Prayer in the Belly of the Whale',
    nameUrdu: 'حضرت یونس علیہ السلام (ذو النون) - مچھلی کے پیٹ میں تسبیح اور نینویٰ کی توبہ',
    arabicName: 'يُونُسُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Dhun-Nun (The Companion of the Fish) & Messenger to Nineveh',
    urduTitle: 'نینویٰ کی بستی کے نبی، طوفانی سمندر میں مچھلی کا لقمہ اور آیتِ کریمہ کا ورد',
    shortBio: 'Departed in distress before divine permission, swallowed by a gigantic whale in the depths of the sea, delivered by the immortal Ayat-e-Karima.',
    urduBio: 'تین تاریکیوں (رات، سمندر اور مچھلی کے پیٹ) میں پکارا: "لا الہ الا انت سبحانک انی کنت من الظالمین"۔',
    fullStory: `Prophet Yunus (AS) was sent to the great city of Nineveh (near modern Mosul, Iraq), a metropolis of over 100,000 people steeped in idolatry. For years he called them to repentance, but met with stubborn mockery. Frustrated and anticipating their impending doom, Yunus departed the city before receiving explicit divine command to evacuate.

He boarded a crowded ship. As storm waves threatened to capsize the vessel, lots were cast to lighten the load; the lot fell upon Yunus three times. Accepting his destiny, he leaped into the dark, churning sea. Immediately, a colossal whale, commanded by Allah not to crush his flesh or bones, swallowed him whole.

Trapped in triple darkness—the darkness of night, the depths of the ocean, and the belly of the whale—Yunus did not despair. He turned to Allah with the most sublime declaration of Tawhid and self-accountability (Ayat-e-Karima): "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers" (Surah Al-Anbiya 21:87). Allah answered: "Had he not been of those who glorify Allah, he would have remained inside its belly until the Day of Resurrection" (Surah As-Saffat 37:143-144). The whale cast him safely onto a barren shore, where Allah caused a gourd plant to shade and nourish him. Returning to Nineveh, he found all 100,000 citizens had repented and embraced faith.`,
    keyEvents: [
      'Preaching to the 100,000 inhabitants of Nineveh',
      'The departure before divine permission and boarding the ship',
      'The casting of lots and leap into the stormy ocean',
      'The prayer in triple darkness (Ayat-e-Karima: La Ilaha Illa Anta Subhanaka...)',
      'Deliverance onto shore and the gourd plant (Yaqteen)',
      'The historic repentance of the entire populace of Nineveh'
    ],
    moralLesson: 'Never give up on your calling; the sincere remembrance of Allah is the only lifeline in the deepest darkness of life.',
    quranOrHadithRef: 'Surah Yunus (Chapter 10), Surah Al-Anbiya 21:87-88, Surah As-Saffat 37:139-148',
    audio: {
      title: 'Hazrat Yunus (AS) & Ayat-e-Karima Power',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '32:45'
    },
    video: {
      title: 'Story Of Prophet Younus in Quran And Latest Scientific Research',
      speaker: 'HASI TV • Haseeb Shafqat',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'HASI TV Story Of Prophet Younus in Quran',
      durationFormatted: '22:15'
    },
    featuredImage: 'https://img.youtube.com/vi/E15CAdkoBiM/hqdefault.jpg'
  },
  {
    id: 'prophet-zakariya',
    nameEnglish: 'Prophet Zakariyya (AS) (Zechariah) - The Secret Prayer of Faith in Old Age',
    nameUrdu: 'حضرت زکریا علیہ السلام - بڑھاپے میں خفیہ دعا اور یحییٰ (ع) کی بشارت',
    arabicName: 'زَكَرِيَّا عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Guardian of Maryam (AS), Priest of Bayt al-Maqdis & Father of Yahya (AS)',
    urduTitle: 'محرابِ عبادت میں دعا، ہڈیاں کمزور اور سر سفید تھا مگر اللہ سے مانگ لیا',
    shortBio: 'Witnessed out-of-season fruits provided to Maryam in the sanctuary, prayed softly for a pure heir in extreme old age, granted Yahya.',
    urduBio: 'مریم کے حجرے میں بے موسم پھل دیکھے تو رب سے چپکے چپکے دعا کی: "میرے پروردگار! مجھے اپنی بارگاہ سے پاکیزہ اولاد عطا فرما"۔',
    fullStory: `Prophet Zakariyya (AS) was the venerable keeper and priest of Bayt al-Maqdis (Jerusalem). He assumed the sacred guardianship of young Hazrat Maryam bint Imran. Whenever Zakariyya entered her private prayer sanctuary (Mihrab), he discovered fresh, miraculously provided sustenance. When he asked: "O Maryam, from where does this come to you?" she replied: "It is from Allah. Indeed, Allah provides for whom He wills without measure" (Surah Ali \'Imran 3:37).

Witnessing this divine miracle, hope ignited in Zakariyya's elderly heart. His hair was gleaming white, his bones brittle, and his wife barren, yet he whispered a secret supplication: "My Lord, indeed my bones have grown weak, and my head has ignited with white, yet never have I been unblessed in my prayer to You, my Lord. Grant me from Yourself an heir who will inherit me and inherit from the family of Yaqub" (Surah Maryam 19:4-6).

While standing in prayer in the Mihrab, angels called to him: "Allah gives you good tidings of Yahya, confirming a word from Allah, honorable, chaste, and a prophet among the righteous" (3:39). As a sign, Zakariyya was instructed not to speak to people for three days except by gesture, continuously glorifying Allah morning and evening.`,
    keyEvents: [
      'Guardianship of Maryam in the sanctuary of Jerusalem',
      'Observing the out-of-season fruits in the Mihrab',
      'The secret, tender prayer of absolute reliance',
      'The angelic announcement of Yahya (AS)',
      'The sign of three days of silent remembrance'
    ],
    moralLesson: 'Never let physical impossibilities deter your prayers; the Lord who sustains the birds without measure can grant life to barren hopes.',
    quranOrHadithRef: 'Surah Maryam 19:2-15, Surah Ali \'Imran 3:37-41',
    audio: {
      title: 'Hazrat Zakariyya (AS) & The Secret Prayer',
      speaker: 'Recitation & Tafseer',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '28:15'
    },
    video: {
      title: 'The Prayer of Zakariyya in the Sanctuary',
      speaker: 'Quranic Heritage',
      youtubeQuery: 'Hazrat Zakariya AS story Urdu',
      durationFormatted: '20:45'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-yahya',
    nameEnglish: 'Prophet Yahya (AS) (John the Baptist) - The Youth of Pure Wisdom & Martyrdom',
    nameUrdu: 'حضرت یحییٰ علیہ السلام - بچپن میں حکمت، بے مثل تقویٰ اور شہادت کا تاج',
    arabicName: 'يَحْيَى عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Pure, Chaste Prophet Blessed with Wisdom from Boyhood',
    urduTitle: 'بچپن ہی سے کتابِ الٰہی پر عمل اور نرم دلی، حق پر قائم رہ کر جان قربان کی',
    shortBio: 'Named directly by Allah, bestowed wisdom in his youth, lived an ascetic life of deep compassion, martyred for refusing to compromise divine law.',
    urduBio: 'اللہ نے خود نام "یحییٰ" رکھا جس پر پہلے کوئی نہ تھا، گناہوں سے یکسر پاک، ظالم بادشاہ کے ناجائز نکاح پر ڈٹ گئے۔',
    fullStory: `Prophet Yahya (AS), known as John the Baptist, was granted uniquely by Allah without any namesake before him. Allah commanded him: "O Yahya, take the Scripture with determination" (Surah Maryam 19:12). Even as a young boy, while other children invited him to play, he replied: "I was not created for vain play; I was created for worship."

Yahya was renowned for his profound gentleness, weeping so copiously out of awe of Allah that tear tracks marked his cheeks. He lived an ascetic life in the wilderness, eating wild locust pods and wearing camel hair, preaching repentance and baptism to prepare hearts for the arrival of Prophet Isa (AS).

When the tyrannical ruler of the region desired to marry his own brother's wife (or niece) in violation of the Torah, Yahya fearlessly declared the union unlawful. Incited by the vengeful queen, the ruler imprisoned Yahya and ordered his beheading. Yahya received the glorious crown of martyrdom, keeping his integrity immaculate.`,
    keyEvents: [
      'Given a name directly ordained by Allah',
      'Gift of wisdom, purity, and gentleness in early youth',
      'Witnessing to truth and preparing way for Prophet Isa (AS)',
      'Standing against royal incest and legislative corruption',
      'Martyrdom in the path of truth without compromise'
    ],
    moralLesson: 'Youth is the golden season for profound faith; standing for moral truth against powerful tyrants is worth more than life itself.',
    quranOrHadithRef: 'Surah Maryam 19:12-15, Surah Ali \'Imran 3:39',
    audio: {
      title: 'Hazrat Yahya (AS) Life & Character',
      speaker: 'Chronicles of Prophets',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '22:30'
    },
    video: {
      title: 'The Martyrdom of Prophet Yahya (AS)',
      speaker: 'Historical Islamic Series',
      youtubeQuery: 'Hazrat Yahya AS story Urdu',
      durationFormatted: '17:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-isa',
    nameEnglish: 'Prophet Isa (AS) (Jesus) - The Spirit of Allah & Miraculous Virgin Birth',
    nameUrdu: 'حضرت عیسیٰ علیہ السلام (مسیح) - کلمۃ اللہ، روح اللہ اور آسمان پر اٹھایا جانا',
    arabicName: 'عِيسَى ابْنُ مَرْيَمَ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Masih (Messiah), Kalimatullah, Roohullah & Second-Coming Prophet',
    urduTitle: 'مریم کے بطن سے بغیر باپ کے ولادت، گود میں کلام، مردوں کو زندہ کرنا اور حیاتِ عیسیٰ',
    shortBio: 'Born miraculously of the Virgin Maryam without a father, spoke in the cradle, healed lepers, raised the dead by Allah\'s leave, raised alive to heaven.',
    urduBio: 'پھونک سے پرندے بنانا، کوڑھیوں کو شفا، اندھوں کو بینائی، مردے زندہ کرنا، مصلوب نہیں ہوئے بلکہ اللہ نے زندہ اٹھا لیا۔',
    fullStory: `Prophet Isa ibn Maryam (AS) holds an exalted station in the Holy Quran as the Masih (Messiah), the Word (Kalimah) from Allah, and a Spirit (Rooh) proceeding from Him. His birth was an immaculate sign: Angel Jibreel appeared to Virgin Maryam, announcing a pure boy born without male intervention: "He said, 'Thus [it will be]; your Lord says, 'It is easy for Me, and We will make him a sign to the people and a mercy from Us''" (Surah Maryam 19:21).

When Maryam brought her newborn back to her people, they accused her of unchastity. She pointed to the infant. The baby Isa miraculously spoke from the cradle: "Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet. And He has made me blessed wherever I am and has enjoined upon me prayer and zakah as long as I live" (19:30-31).

Isa was granted breath-taking miracles: fashioning birds from clay that came alive by Allah's leave, curing those born blind and lepers, and resurrecting the dead by the permission of Allah. He confirmed the Torah and gave glad tidings of the final Messenger: "whose name is Ahmad" (Surah As-Saff 61:6). When corrupt leaders plotted his crucifixion, Allah saved him: "They did not kill him, nor did they crucify him; but [another] was made to resemble him to them... Rather, Allah raised him to Himself" (Surah An-Nisa 4:157-158). He will return before the Day of Judgment to defeat the Dajjal and establish justice on Earth.`,
    keyEvents: [
      'The Virgin Birth without a human father',
      'Speaking eloquently as a newborn in the cradle',
      'Miracles of healing lepers, the blind, and raising the dead by Allah\'s leave',
      'The miracle of the Heavenly Table (Al-Ma\'idah)',
      'Foretelling the coming of Prophet Muhammad ﷺ (Ahmad)',
      'Deliverance from crucifixion and miraculous bodily ascension to heaven'
    ],
    moralLesson: 'Jesus is an honorable servant and messenger of Allah, not a divine son or partner; spiritual compassion must breathe life into rigid laws.',
    quranOrHadithRef: 'Surah Maryam 19:16-36, Surah Ali \'Imran 3:45-59, Surah An-Nisa 4:156-159, Surah Al-Ma\'idah 5:110-120',
    audio: {
      title: 'Hazrat Isa ibn Maryam (AS) & Surah Maryam',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '48:30'
    },
    video: {
      title: 'Prophet Isa (AS) in Islam: Birth to Ascension',
      speaker: 'Islamic Research Academy',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Isa AS full story Urdu documentary',
      durationFormatted: '38:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-muhammad',
    nameEnglish: 'Prophet Muhammad ﷺ - The Seal of the Prophets & Mercy to All Worlds',
    nameUrdu: 'حضرت محمد مصطفیٰ ﷺ - خاتم النبیین، رحمۃ للعالمین اور سید الرسل',
    arabicName: 'مُحَمَّدٌ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'Khatam an-Nabiyyin, Rahmatan lil-\'Alamin & Leader of All Prophets',
    urduTitle: 'خاتم النبیین، غارِ حرا میں پہلی وحی، معراج، فتحِ مکہ اور خطبہ حجۃ الوداع',
    shortBio: 'Born an orphan in Mecca, known as Al-Amin (The Trustworthy), received the Quran in Cave Hira, established universal justice, transformed world history.',
    urduBio: 'یتیمی میں ولادت، الصادق و الامین کا خطاب، غارِ حرا میں جبرائیل (ع) کی آمد، تیرہ سالہ مکی اذیتوں پر صبر، مدینہ کی اسلامی ریاست اور فتح مکہ پر عام معافی۔',
    fullStory: `Prophet Muhammad ﷺ was born in 570 CE (Year of the Elephant) in Mecca as an orphan from the noble tribe of Quraysh. Growing up amidst idolatry and tribal brutality, his integrity, purity, and honesty earned him the universal titles As-Sadiq (The Truthful) and Al-Amin (The Trustworthy).

At age 40, during deep contemplation in the Cave of Hira, Angel Jibreel descended with the first revelation of the Holy Quran: "Read in the name of your Lord who created!" (Surah Al-Alaq 96:1). For 13 years in Mecca, the Prophet ﷺ and his companions endured horrific persecution, economic boycott, and torture with patience. In the 10th year of mission, he was taken on the miraculous journey of Isra wal Mi'raj to Jerusalem and through the seven heavens into the presence of Allah, where the 5 daily prayers were ordained.

Migrating to Madinah (Hijrah), he founded the first unified constitution, brotherhood between Muhajirun and Ansar, and defended the faith at Badr, Uhud, and Khandaq. In 8 AH, he entered Mecca as a conqueror not with bloodlust, but with head bowed so low in humility that his beard touched his saddle. Facing his former persecutors who had killed his uncle Hamza and driven him from his homeland, he uttered the words of Yusuf: "Go, for you are all free!" During the Farewell Pilgrimage, he delivered the eternal charter of human rights, declaring all racism and oppression abolished. He left behind the Quran and his Sunnah as eternal guidance.`,
    keyEvents: [
      'Birth as an orphan and pristine youth as As-Sadiq and Al-Amin',
      'The First Revelation in Cave Hira (Iqra!)',
      'Thirteen years of steadfast patience in Mecca',
      'The Night Journey and Ascension (Isra wal Mi\'raj)',
      'The Hijrah to Madinah and founding of the fraternal Muslim Ummah',
      'The decisive battles of Badr, Uhud, and Khandaq',
      'The Bloodless Conquest of Mecca and universal pardon',
      'The Farewell Sermon (Khutbat Hajjat al-Wida) abolishing all racism'
    ],
    historicalContext: 'The culmination of all divine revelation, providing a comprehensive, preserved model for human conduct until the end of time.',
    moralLesson: 'Unconditional mercy, unmatched integrity, forgiveness of enemies, and steadfast devotion to Allah conquer the hearts of humanity.',
    quranOrHadithRef: 'Surah Al-Ahzab 33:21 & 40, Surah Al-Anbiya 21:107, Surah Al-Fath 48:28-29',
    audio: {
      title: 'Seerat-un-Nabi ﷺ Complete Audio Lectures',
      speaker: 'Dr. Israr Ahmed / Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '68:30'
    },
    video: {
      title: 'The Life of the Final Prophet Muhammad ﷺ',
      speaker: 'Comprehensive Seerah Documentary',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Seerat un Nabi SAW full Urdu documentary',
      durationFormatted: '55:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-khidr',
    nameEnglish: 'Al-Khidr (AS) - The Teacher of Hidden Divine Wisdom',
    nameUrdu: 'حضرت خضر علیہ السلام - حکمتِ الٰہی کے معلم اور موسیٰ (ع) کا سفر',
    arabicName: 'الْخَضِرُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Righteous Servant Granted Direct Knowledge from Allah (\'Ilm al-Ladunni)',
    urduTitle: 'علمِ لدنی کے حامل جن کے ساتھ حضرت موسیٰ نے سفر کیا اور تقدیر کے اسرار جانے',
    shortBio: 'Met by Prophet Musa at the junction of the two seas; revealed the hidden divine mercy behind seemingly tragic worldly events.',
    urduBio: 'کشتی میں سوراخ، بچے کا قتل اور گرتی ہوئی دیوار کی مرمت؛ بظاہر نقصان دہ واقعات کے پیچھے اللہ کی پوشیدہ حکمت کے راز کھولے۔',
    fullStory: `Surah Al-Kahf details the profound journey between Prophet Musa (AS) and the enigmatic righteous servant identified in authentic hadith as Al-Khidr. When asked if there was anyone on earth more knowledgeable than him, Musa answered in the negative. Allah revealed that at the confluence of the two seas resided a servant endowed with direct divine wisdom ('Ilm al-Ladunni).

Musa traveled to find him and asked: "May I follow you on condition that you teach me from what you have been taught of sound judgment?" Khidr replied: "Indeed, with me you will never be able to have patience" (Surah Al-Kahf 18:66-67).

During their voyage, Khidr damaged the boat of poor fishermen; killed a young boy; and repaired a crumbling wall in a village whose people refused them food. Unable to restrain his sense of justice, Musa objected each time. Khidr then revealed the hidden wisdom: the boat was saved from a tyrannical king seizing every intact vessel; the boy would have broken his righteous parents' hearts with disbelief and ruin; and the wall concealed treasure for two orphan boys whose father was righteous.`,
    keyEvents: [
      'The journey of Musa and Yusha to the junction of the two seas',
      'The test of following Khidr with unconditional patience',
      'Scuttling the boat to protect poor fishermen from an unjust king',
      'The tragic death of the boy to preserve the parents\' faith',
      'Rebuilding the wall for the orphans without taking wages'
    ],
    moralLesson: 'What appears as a misfortune on the surface often conceals Allah\'s deepest mercy and long-term protection.',
    quranOrHadithRef: 'Surah Al-Kahf 18:60-82',
    audio: {
      title: 'Musa & Khidr (AS) in Surah Al-Kahf',
      speaker: 'Miraj-ul-Din Khan Recitation',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '34:20'
    },
    video: {
      title: 'The Secrets of Khidr in Surah Kahf',
      speaker: 'Tafseer Series',
      youtubeQuery: 'Musa and Khizr AS story Urdu',
      durationFormatted: '28:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'prophet-luqman',
    nameEnglish: 'Luqman the Wise - The Master of Wisdom & Fatherly Admonitions',
    nameUrdu: 'حضرت لقمان حکیم - حکمت و دانائی اور بیٹے کو سنہری نصیحتیں',
    arabicName: 'لُقْمَانُ الْحَكِيمُ عَلَيْهِ السَّلَامُ',
    category: 'prophets',
    categoryLabel: 'Prophet / نبی',
    roleOrTitle: 'The Sage Praised in the Quran with a Dedicated Surah',
    urduTitle: 'شرک سے بچنے، والدین کی خدمت، نماز اور عاجزی کی لازوال وصیتیں',
    shortBio: 'Granted sublime wisdom by Allah, counseled his son against Shirk, arrogance, backbiting, and commanded prayer, patience, and humility.',
    urduBio: 'بیٹے کو نصیحت: "بیٹا! اللہ کے ساتھ شرک نہ کرنا، شرک بڑا بھاری ظلم ہے، اور لوگوں سے منہ نہ پھیرنا اور زمین پر اکڑ کر نہ چلنا"۔',
    fullStory: `Surah Luqman (Chapter 31) immortalizes the teachings of Luqman, an African sage renowned for extraordinary wisdom. When asked how he attained such profound insight, he replied: "Lowering my gaze, guarding my tongue, eating only lawful sustenance, fulfilling my trusts, and abstaining from that which does not concern me."

His admonitions to his beloved son form a timeless blueprint for character development:
1. Pure Monotheism: "O my son, do not associate anything with Allah. Indeed, association [with Him] is great injustice" (Surah Luqman 31:13).
2. Filial Piety: Respecting parents, especially the mother who carried him in hardship upon hardship.
3. Divine Omniscience: Even a mustard seed buried inside a rock will be brought forth by Allah on the Day of Judgment.
4. Active Worship & Activism: "O my son, establish prayer, enjoin what is right, forbid what is wrong, and be patient over what befalls you" (31:17).
5. Eliminating Arrogance: "And do not turn your cheek [in contempt] toward people and do not walk through the earth exultantly. Indeed, Allah does not like everyone self-deluded and boastful" (31:18).`,
    keyEvents: [
      'Bestowal of wisdom through gratitude to Allah',
      'The Five Golden Admonitions to his son',
      'Exposing the absurdity of pride and loud posturing',
      'Surah Luqman as an eternal curriculum of Islamic parenting'
    ],
    moralLesson: 'True wisdom begins with gratitude to God; humility in walk and speech reflects a sound heart.',
    quranOrHadithRef: 'Surah Luqman 31:12-19',
    audio: {
      title: 'Surah Luqman Recitation & Wisdom',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '24:15'
    },
    video: {
      title: 'The Wisdom of Luqman Documentary',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Luqman Hakeem story Urdu',
      durationFormatted: '19:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },

  // ==========================================
  // SECTION 2: 45+ SAHABA (COMPANIONS OF THE PROPHET)
  // ==========================================
  {
    id: 'saad-bin-abi-waqqas',
    nameEnglish: 'Hazrat Sa\'d ibn Abi Waqqas (RA) & The Tragedy of His Son Umar ibn Sa\'d',
    nameUrdu: 'حضرت سعد بن ابی وقاص (رض) اور ان کے بیٹے عمر بن سعد کا عبرت آموز واقعہ',
    arabicName: 'سَعْدُ بْنُ أَبِي وَقَّاصٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Conqueror of Persia, Uncle of the Prophet ﷺ, Ashara Mubashara & The Karbala Contrast',
    urduTitle: 'فاتحِ ایران، تیر اندازِ رسول ﷺ، عشرہ مبشرہ اور فتنہِ کربلا کا عظیم تقابل',
    isSpecialStudy: true,
    shortBio: 'One of the earliest converts, legendary archer of Uhud, victor of Qadisiyyah who firmly rejected political civil strife (fitnah); contrasted with his son Umar ibn Sa\'d who succumbed to worldly temptation and led troops at Karbala.',
    urduBio: 'رسول اللہ ﷺ کے فدائی ماموں، احد کے ہیرو، قادسیہ کے فاتح جنہوں نے فتنوں سے مکمل کنارہ کشی اختیار کی؛ دوسری طرف ان کا بیٹا عمر بن سعد جو حکومتِ رے کے لالچ میں کربلا میں لشکر لے کر آیا۔',
    fullStory: `Hazrat Sa'd ibn Abi Waqqas (RA) was among the top luminaries of the Companions. Converting at just 17 as the seventh person in Islam, he was the maternal uncle of the Prophet Muhammad ﷺ, who honored him by saying: "This is my uncle; let any man show me his uncle!" (Tirmidhi).

At the Battle of Uhud, when the Muslim lines buckled, Sa'd stood as an unyielding shield before the Prophet ﷺ. The Prophet personally handed him arrows, exclaiming the legendary words: "Shoot, O Sa'd! May my father and mother be ransomed for you!" (Sahih Bukhari). Caliph Umar (RA) appointed him Supreme Commander at the epochal Battle of Al-Qadisiyyah, where Sa'd's military strategy dismantled the Sasanian Persian Empire and freed Iraq and Iran. Most crucially, during the painful internal fitnah between Ali and Mu'awiyah, Sa'd strictly refused all factional warfare, retiring to his desert estate in Aqiq to worship Allah in peace.

THE TRAGIC CONTRAST OF HIS SON UMAR IBN SA'D:
In one of the most profound historical and moral lessons in Islam, his son, Umar ibn Sa'd, took a diametrically opposite path. When Umar ibn Sa'd visited his father's desert retreat urging him to claim the Caliphate, Sa'd struck him on the chest and said: "Be silent! I heard the Messenger of Allah ﷺ say: 'Allah loves the servant who is pious, self-sufficient, and secluded from fitnah.'"

Years later, the Umayyad governor Ubaydullah ibn Ziyad offered Umar ibn Sa'd the lucrative governorship of the province of Rayy (modern Tehran), conditioned on leading an army to intercept Imam Hussain (AS) at Karbala. Umar ibn Sa'd spent a sleepless night composing famous lines of poetry agonizing between his soul and the kingdom of Rayy: "Shall I abandon the governorship of Rayy, which is my greatest desire? Or shall I return guilty of the murder of Hussain?" Tragically, greed for political office triumphed over faith. Umar ibn Sa'd commanded the troops that blockaded the Euphrates water and martyred Imam Hussain (AS) and his noble family. In the end, he lost both worlds: Ibn Ziyad never granted him Rayy, and Mukhtar al-Thaqafi brought him to retribution.`,
    keyEvents: [
      'Seventh person to embrace Islam at age 17',
      'The heroic defense at Uhud ("Shoot, O Sa\'d! May my parents be ransomed for you!")',
      'Supreme Commander at the Battle of Al-Qadisiyyah dismantling Persian empire',
      'Strict withdrawal and neutrality during the civil wars (Fitnah)',
      'The moral tragedy of his son Umar ibn Sa\'d choosing the governorship of Rayy over the sanctity of Ahl al-Bayt at Karbala'
    ],
    historicalContext: 'A profound study demonstrating how righteous parental lineage cannot protect a child who chooses worldly ambition over moral truth.',
    moralLesson: 'Never compromise eternal faith and the blood of innocents for temporary worldly status and political office.',
    quranOrHadithRef: 'Surah Luqman 31:14-15 (revealed regarding Sa\'d\'s steadfastness when his mother went on hunger strike); Sahih Bukhari 2905, 3725',
    audio: {
      title: 'Hazrat Sa\'d ibn Abi Waqqas & The Lesson of Umar ibn Sa\'d',
      speaker: 'Historical Islamic Analysis',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '48:15'
    },
    video: {
      title: 'Sa\'d ibn Abi Waqqas, Umar ibn Sa\'d & Tragedy of Karbala',
      speaker: 'HASI TV • Haseeb Shafqat',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'HASI TV Karbala Umar bin Saad',
      durationFormatted: '38:15'
    },
    featuredImage: 'https://img.youtube.com/vi/Cuqbrwzcy-s/hqdefault.jpg'
  },
  {
    id: 'abu-bakr-siddiq',
    nameEnglish: 'Hazrat Abu Bakr As-Siddiq (RA) - The First Caliph & The Truthful',
    nameUrdu: 'حضرت ابوبکر صدیق (رض) - خلیفہ اول، یارِ غار اور افضل البشر بعد الانبیاء',
    arabicName: 'أَبُو بَكْرٍ الصِّدِّيقُ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'First Caliph of Islam, Companion of the Cave & Greatest of the Sahaba',
    urduTitle: 'یارِ غار، ہجرت کے ساتھی، منکرینِ زکوٰۃ کے خلاف چٹان بننے والے خلیفہ اول',
    shortBio: 'First adult male to accept Islam without hesitation, bought and freed enslaved Muslims including Bilal, companion of the Cave during Hijrah, saved the Ummah after the Prophet\'s passing.',
    urduBio: 'دعوتِ حق پر بغیر کسی جھجک کے ایمان لائے، ہجرت میں غارِ ثور کے رفیق، وفاتِ نبوی کے بعد ارتداد اور منکرینِ زکوٰۃ کے سامنے تن کر کھڑے ہوئے۔',
    fullStory: `Hazrat Abu Bakr As-Siddiq (RA) was the closest and dearest companion to Prophet Muhammad ﷺ. When the Prophet announced his mission, Abu Bakr embraced it instantly. He utilized his immense merchant wealth to purchase and emancipate enslaved believers tortured under the scorching sun of Mecca, most notably Hazrat Bilal (RA).

During the Hijrah, he accompanied the Prophet ﷺ into the Cave of Thawr. When the Quraysh trackers stood just outside the entrance, Abu Bakr worried for the Prophet's safety. The Prophet comforted him: "What do you think of two with whom Allah is the third?" (Surah At-Tawbah 9:40).

Upon the passing of the Prophet ﷺ, when the Muslim community was shattered in grief, Abu Bakr delivered the monumental sermon that anchored the Ummah: "Whoever worshiped Muhammad, know that Muhammad has passed away; but whoever worships Allah, know that Allah is Ever-Living and does not die." As Caliph, he fought the Ridda (apostasy) wars, enforced Zakat with absolute firmness, commissioned the compilation of the Quran into a single Mushaf, and dispatched armies that opened the Levant and Iraq.`,
    keyEvents: [
      'First free adult male to accept Islam',
      'Liberating Bilal and persecuted slaves in Mecca',
      'The companion in the Cave of Thawr during Hijrah',
      'Giving all his wealth for the Battle of Tabuk ("I left for them Allah and His Messenger")',
      'Preserving the Ummah during the crisis of apostasy and commissioning the compilation of the Quran'
    ],
    moralLesson: 'Unconditional loyalty to truth and courageous leadership in times of collective crisis preserve nations.',
    quranOrHadithRef: 'Surah At-Tawbah 9:40, Surah Al-Lail 92:17-21; Sahih Bukhari 3656',
    audio: {
      title: 'Seerat Hazrat Abu Bakr Siddiq (RA)',
      speaker: 'Dr. Israr Ahmed',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '52:10'
    },
    video: {
      title: 'Hazrat Abu Bakr Siddiq Life Documentary',
      speaker: 'Caliphate History',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Abu Bakr Siddiq story Urdu',
      durationFormatted: '45:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'umar-ibn-khattab',
    nameEnglish: 'Hazrat Umar ibn Al-Khattab (RA) - Al-Farooq & The Architect of Justice',
    nameUrdu: 'حضرت عمر بن الخطاب (رض) - فاروقِ اعظم اور عدل و انصاف کے بانی',
    arabicName: 'عُمَرُ بْنُ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Second Caliph, Ameer al-Mu\'mineen & Conqueror of Jerusalem',
    urduTitle: 'فاروقِ اعظم، جن کے عدل کی گواہی دنیا دیتی ہے، بیت المقدس کے فاتح',
    shortBio: 'Transformed Islam\'s public strength upon conversion, established universal welfare and legal systems, walked on foot leading a camel while entering Jerusalem.',
    urduBio: 'دعائے رسول ﷺ سے اسلام لائے، اسلامی فلاحی ریاست کا نظام بنایا، راتوں کو رعایا کی خبرگیری کرتے، بیت المقدس میں داخلہ تاریخی سادگی کے ساتھ کیا۔',
    fullStory: `Hazrat Umar ibn Al-Khattab (RA) was answered in response to the Prophet's supplication: "O Allah, strengthen Islam with the more beloved of these two men to You: Umar ibn Al-Khattab or Abu Jahl." His conversion brought Muslims out from secret worship to praying openly before the Ka'bah.

As the second Caliph (Ameer al-Mu'mineen), Umar's ten-year reign was a golden epoch of justice, governance, and monumental expansion. He established the Hijri calendar, the treasury (Bayt al-Mal), postal system, professional military, municipal departments, and public welfare stipends for newborns and the elderly.

Despite ruling an empire stretching from Egypt to Persia, Umar wore a patched tunic and patrolled the streets of Madinah by night with a sack of flour on his own back to feed starving families. When Jerusalem surrendered to him, he entered the city leading his servant upon their single camel, having taken equal turns riding. He signed the historic Umari Covenant guaranteeing religious liberty and safety to Christians and Jews.`,
    keyEvents: [
      'Conversion after hearing Surah Ta-Ha read by his sister',
      'Open public migration to Madinah challenging Quraysh',
      'Establishment of the Islamic welfare state, judiciary, and Hijri calendar',
      'Night patrols checking on the destitute and feeding starving children',
      'Peaceful conquest of Jerusalem and the Umari Covenant'
    ],
    moralLesson: 'True authority is not royal privilege; it is sleepless accountability before God for the weakest citizen.',
    quranOrHadithRef: 'Sahih Bukhari 3683; Sahih Muslim 2398; Surah Ta-Ha 20:1-14',
    audio: {
      title: 'Hazrat Umar Farooq (RA) Justice & Rule',
      speaker: 'Ulema Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '58:20'
    },
    video: {
      title: 'Hazrat Umar Farooq (RA) Ka Insaf — The Peerless Justice',
      speaker: 'HASI TV • Haseeb Shafqat',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'HASI TV Hazrat Umar RA ka Insaf',
      durationFormatted: '18:45'
    },
    featuredImage: 'https://img.youtube.com/vi/Yri-ucTiJVo/hqdefault.jpg'
  },
  {
    id: 'uthman-ibn-affan',
    nameEnglish: 'Hazrat Uthman ibn Affan (RA) - Dhun-Nurayn & The Compiler of the Mushaf',
    nameUrdu: 'حضرت عثمان بن عفان (رض) - ذو النورین، جامع القرآن اور پیکرِ حیا',
    arabicName: 'عُثْمَانُ بْنُ عَفَّانَ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Third Caliph, Possessor of Two Lights & Generous Benefactor (Ghani)',
    urduTitle: 'ذو النورین، حیا کے پیکر جن سے فرشتے بھی حیا کرتے، بیرِ رومہ کے خریدار اور جامع القرآن',
    shortBio: 'Married two daughters of the Prophet ﷺ (Ruqayyah and Umm Kulthum), financed the Army of Hardship (Tabuk), purchased the well of Rumah for Muslims, standardized the Quranic Mushaf.',
    urduBio: 'انتہائی باحیا، غنی، مدینہ میں پانی کے لیے بیرِ رومہ خرید کر وقف کیا، تبوک کے لیے پورا لشکر تیار کیا، قرآن کے متفقہ نسخے دنیا بھر میں بھیجے۔',
    fullStory: `Hazrat Uthman ibn Affan (RA) was known as Dhun-Nurayn (Possessor of Two Lights) because he was honored to marry two daughters of Prophet Muhammad ﷺ: first Ruqayyah, and after her passing, Umm Kulthum. He was renowned for profound modesty—the Prophet ﷺ remarked: "Shall I not be modest before a man whom even the angels are modest before?" (Sahih Muslim).

Whenever the Muslim community faced hardship, Uthman stepped forward with his wealth: he purchased the fresh-water well of Rumah from a Jewish merchant and made it a free public endowment for all; during the severe expedition of Tabuk (Jaysh al-\'Usrah), he outfitted an entire third of the army out of his pocket with 950 camels and 1,000 gold dinars.

As Caliph, Uthman unified the Muslim world upon a single standard dialect of the Quranic text, producing master copies (Mushaf Uthmani) that were sent to major provinces, ensuring that the Quran remained free from regional variations forever. Besieged in his home by rebellious insurrectionists, Uthman refused to draw blood of fellow Muslims, choosing to be martyred while reciting Surah Al-Baqarah, his blood falling on the verse: "Allah will suffice you against them, and He is the Hearing, the Knowing" (2:137).`,
    keyEvents: [
      'Honored with marriage to two daughters of the Prophet ﷺ',
      'Purchasing the well of Rumah (Bir Rumah) as a perpetual public charity',
      'Equipping the Army of Tabuk (Jaysh al-\'Usrah)',
      'Universal standardization and dispatch of the Mushaf Uthmani',
      'Martyrdom while fasting and reciting the Quran in his home'
    ],
    moralLesson: 'Generosity and modesty elevate the believer; refusing to shed Muslim blood even at the cost of personal life is the height of piety.',
    quranOrHadithRef: 'Sahih Muslim 2401; Sahih Bukhari 4987',
    audio: {
      title: 'Hazrat Uthman Ghani (RA) Life & Martyrdom',
      speaker: 'Tafseer & History',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '47:40'
    },
    video: {
      title: 'Hazrat Usman Ghani Documentary',
      speaker: 'Caliphate Era Studies',
      youtubeQuery: 'Hazrat Usman Ghani story Urdu',
      durationFormatted: '40:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ali-ibn-abi-talib',
    nameEnglish: 'Hazrat Ali ibn Abi Talib (RA) - Asadullah & The Gateway of Knowledge',
    nameUrdu: 'حضرت علی بن ابی طالب (رض) - اسد اللہ، باب مدینۃ العلم اور فاتحِ خیبر',
    arabicName: 'عَلِيُّ بْنُ أَبِي طَالِبٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Fourth Caliph, Lion of Allah, Hero of Khaybar & Husband of Fatima (RA)',
    urduTitle: 'شیرِ خدا، خیبر کا قلعہ اکھاڑنے والے، ہجرت کی رات بسترِ رسول ﷺ پر سونے والے',
    shortBio: 'First youth to embrace Islam, slept in the Prophet\'s bed on the night of Hijrah, shattered the gate of Khaybar, master of Arabic eloquence and judicial wisdom.',
    urduBio: 'بچوں میں سب سے پہلے ایمان لائے، ہجرت کی خطرناک رات بسترِ رسول پر سوئے، خیبر میں مرحب کو پچھاڑ کر قلعہ فتح کیا، علم و حکمت کے سمندر۔',
    fullStory: `Hazrat Ali ibn Abi Talib (RA) was raised in the household of Prophet Muhammad ﷺ from childhood and was the first youth to accept Islam at around ten years of age. On the night of the Hijrah, when Quraysh assassins surrounded the Prophet's house with drawn swords, Ali courageously risked his life by sleeping in the Prophet's cloak in his bed to return trusts to their owners and facilitate the escape.

He married the Prophet's beloved daughter, Hazrat Fatima Az-Zahra (RA), and became the father of Imam Hasan and Imam Hussain. In combat, Ali was invincible: at the Battle of Khaybar, when previous commanders could not breach the fortress of Al-Qamus, the Prophet ﷺ declared: "Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love; Allah will grant victory through his hands." Ali marched forward, struck down the champion Marhab, and ripped the colossal iron gate off the fortress.

Beyond his peerless martial courage, Ali was the supreme jurist and orator of the Ummah. The Prophet ﷺ said: "I am the city of knowledge and Ali is its gate" (Tirmidhi). As the fourth Caliph, he championed ascetic simplicity, wearing coarse garments, eating dry bread, and enforcing uncompromising justice until his martyrdom by Abdur Rahman ibn Muljam in Kufa.`,
    keyEvents: [
      'First youth to accept Islam at age 10',
      'Heroic sacrifice sleeping in the Prophet\'s bed on the night of Hijrah',
      'Marriage to the Queen of Women Hazrat Fatima (RA)',
      'Shattering the gates of Khaybar and defeating Marhab',
      'Judicial genius and boundless eloquence (Nahj al-Balaghah)',
      'Martyrdom during Fajr prayer in the Grand Mosque of Kufa'
    ],
    moralLesson: 'True strength is fearlessness in defending truth combined with gentle mercy toward orphans and absolute incorruptibility.',
    quranOrHadithRef: 'Sahih Bukhari 3706; Sahih Muslim 2404; Surah Al-Baqarah 2:207',
    audio: {
      title: 'Hazrat Ali (RA) Virtues & Courage',
      speaker: 'Scholars of Islam',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '56:15'
    },
    video: {
      title: 'Life of Hazrat Ali (RA) Asadullah Documentary',
      speaker: 'Islamic History',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Ali RA biography Urdu',
      durationFormatted: '48:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'khalid-ibn-walid',
    nameEnglish: 'Hazrat Khalid ibn Al-Walid (RA) - Saifullah (The Sword of Allah)',
    nameUrdu: 'حضرت خالد بن ولید (رض) - سیف اللہ اور ناقابلِ شکست سپہ سالار',
    arabicName: 'خَالِدُ بْنُ الْوَلِيدِ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Saifullah Al-Maslool & Undefeated Military Genius of Over 50 Battles',
    urduTitle: 'سیف اللہ، جنہوں نے موتہ میں نو تلواریں توڑیں اور یرموک میں رومی سلطنت کو شکست دی',
    shortBio: 'Never lost a battle in his entire career; broke nine swords at the Battle of Mu\'tah; led the Muslim army to triumph at Yarmouk.',
    urduBio: 'پچاس سے زائد جنگوں میں ناقابلِ شکست، موتہ میں نو تلواریں ٹوٹیں، یرموک کے فاتح، معزولی پر بھی خوشی سے عام سپاہی کی طرح لڑے۔',
    fullStory: `Hazrat Khalid ibn Al-Walid (RA) is recognized in global military history as one of the greatest tactical geniuses who ever lived. Embracing Islam alongside Amr ibn al-Aas prior to the Conquest of Mecca, he dedicated his martial brilliance entirely to the service of Allah.

At the Battle of Mu'tah, when three successive commanders fell and 3,000 Muslims faced over 100,000 Byzantine troops, Khalid took the standard, executed brilliant feigned maneuvers, broke nine swords in hand-to-hand combat, and led the army to safety. The Prophet ﷺ titled him: "Saifullah" (The Drawn Sword of Allah).

Under Abu Bakr and Umar, Khalid executed dazzling lightning campaigns that liberated Iraq from the Sasanian Persians and Syria from the Roman Byzantines. His tactical masterpiece at the Battle of Yarmouk completely routed an imperial Roman force four times his size. When Caliph Umar relieved him of supreme command to safeguard the people from attributing victory to Khalid rather than Allah, Khalid demonstrated ultimate sincerity by continuing to fight with equal fervor as an ordinary frontline soldier. He passed away in Homs, lamenting that every inch of his body bore a scar of sword or spear, yet he died in bed rather than as a battlefield martyr.`,
    keyEvents: [
      'Conversion to Islam before the Conquest of Mecca',
      'Breaking nine swords at the Battle of Mu\'tah and saving the army',
      'Defeating the false prophet Musaylimah at the Battle of Yamama',
      'The tactical masterpiece at the Battle of Yarmouk against Byzantium',
      'Sublime humility in accepting demotion to a common soldier without resentment'
    ],
    moralLesson: 'True sincerity means fighting for the cause of Allah regardless of whether you hold the general\'s banner or stand as a humble foot soldier.',
    quranOrHadithRef: 'Sahih Bukhari 4261',
    audio: {
      title: 'Hazrat Khalid bin Walid (RA) Sword of Allah',
      speaker: 'Military History of Islam',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '51:30'
    },
    video: {
      title: '5 Legendary Undefeated Warriors (Hazrat Khalid bin Waleed RA)',
      speaker: 'HASI TV • Haseeb Shafqat',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'HASI TV 5 Warriors From Islamic History Undefeated Khalid bin Waleed',
      durationFormatted: '27:50'
    },
    featuredImage: 'https://img.youtube.com/vi/Ut10SRg4bEY/hqdefault.jpg'
  },
  {
    id: 'bilal-ibn-rabah',
    nameEnglish: 'Hazrat Bilal ibn Rabah (RA) - The Voice of Tawhid & First Mu\'adhin',
    nameUrdu: 'حضرت بلال حبشی (رض) - موذنِ رسول ﷺ اور احد احد کا نعرہ',
    arabicName: 'بِلَالُ بْنُ رَبَاحٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Mu\'adhin ar-Rasool, Symbol of Islamic Equality & Hero of Steadfastness',
    urduTitle: 'تپتی ریت پر دہکتے انگاروں اور بھاری پتھر کے نیچے احد احد پکارنے والے',
    shortBio: 'Abyssinian slave who endured torture on scorching sand shouting "Ahad! Ahad!", purchased and freed by Abu Bakr, appointed by Prophet ﷺ to climb the Ka\'bah and give the first Adhan.',
    urduBio: 'امیہ بن خلف کے ظلم پر صبر، "احد احد" کی صدا، ابوبکر صدیق نے خرید کر آزاد کیا، فتحِ مکہ پر کعبہ کی چھت پر اذان دی اور نسلی امتیاز کا خاتمہ کیا۔',
    fullStory: `Hazrat Bilal ibn Rabah (RA) stands across human history as the eternal monument of spiritual triumph over racism and slavery. An enslaved man of Ethiopian descent belonging to the cruel chieftain Umayyah ibn Khalaf in Mecca, Bilal embraced Islam in its earliest days.

Enraged, Umayyah dragged him out into the blistering desert noon, tied his limbs, laid him on scorching gravel, and placed a gigantic boulder upon his chest to force him to renounce Allah. Despite near-suffocation and peeling skin, Bilal uttered only one defiant word: "Ahad! Ahad!" (The One! The One!). Abu Bakr As-Siddiq purchased his freedom at an exorbitant price.

When the Prophet ﷺ established the Adhan in Madinah, he chose Bilal for his resonant, heartfelt voice, appointing him the official Mu'adhin of Islam. At the Conquest of Mecca, in a sublime blow to Arabian racial supremacy, the Prophet commanded Bilal to ascend the roof of the Holy Ka'bah and proclaim the Adhan across the valley. After the Prophet's passing, Bilal wept and could no longer bear to call the Adhan in Madinah, relocating to the Syrian frontiers until his death in Damascus.`,
    keyEvents: [
      'Unbroken endurance under torture in the desert of Mecca',
      'The sacred chant of "Ahad! Ahad!"',
      'Appointed first Mu\'adhin of Islam by the Prophet ﷺ',
      'Ascending the roof of the Ka\'bah at the Conquest of Mecca',
      'The emotional final Adhan in Damascus after seeing the Prophet ﷺ in a dream'
    ],
    moralLesson: 'Faith annihilates racial hierarchy; the formerly enslaved Bilal was honored as "our master" by Caliph Umar.',
    quranOrHadithRef: 'Sahih Bukhari 3754; Sahih Muslim 377; Surah Al-Hujurat 49:13',
    audio: {
      title: 'Hazrat Bilal Habshi (RA) Life & The First Adhan',
      speaker: 'Islamic Biographies',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '38:20'
    },
    video: {
      title: 'Hazrat Bilal (RA): Ahad! Ahad!',
      speaker: 'Islamic History Series',
      youtubeQuery: 'Hazrat Bilal Habshi story Urdu',
      durationFormatted: '30:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'salman-al-farsi',
    nameEnglish: 'Hazrat Salman Al-Farsi (RA) - The Seeker of Truth & Trench Strategist',
    nameUrdu: 'حضرت سلمان فارسی (رض) - جویائے حق اور خندق کے معمار',
    arabicName: 'سَلْمَانُ الْفَارِسِيُّ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'The Seeker of Truth, Member of Ahl al-Bayt & Strategist of Khandaq',
    urduTitle: 'فارس سے حق کی تلاش میں نکلے، عیسائیت اور غلامی جھیلی، خندق کھودنے کا مشورہ دیا',
    shortBio: 'Traveled through Persia and Syria seeking true faith, sold into slavery in Madinah, embraced Islam, devised the revolutionary trench strategy in the Battle of the Ahzab.',
    urduBio: 'زرتشتی مذہب چھوڑا، راہبوں سے علم لیا، غلام بنا کر مدینہ لائے گئے، خندق کھودنے کی انوکھی تدبیر سے مدینہ کو دشمنوں سے بچایا۔',
    fullStory: `Hazrat Salman Al-Farsi (RA) is known as the "Seeker of Truth". Born into a wealthy Persian Zoroastrian family, he abandoned luxury to pursue truth, studying under Christian monks across Damascus, Mosul, and Ammuria. The dying monk directed him to Arabia, describing the marks of the final prophet: he eats from gifts but not charity, and bears the seal of prophethood between his shoulders.

Betrayed by his travel guides and sold into slavery, Salman ended up working in a date palm grove in Madinah. When the Prophet ﷺ arrived, Salman tested him with three signs, finding all exact. The Prophet and the Sahaba pooled their resources to plant 300 date palms and pay gold to buy his freedom.

When the confederate army of 10,000 marched upon Madinah in the Battle of the Trench (Al-Ahzab), Salman suggested digging a wide, deep trench along the exposed northern perimeter—a military innovation unknown to Arab warfare. This defensive trench saved Madinah from annihilation. The Muhajirun and Ansar both claimed him, to which the Prophet ﷺ famously declared: "Salman is one of us, the Ahl al-Bayt (people of the household)."`,
    keyEvents: [
      'The epic spiritual journey across Persia and Syria seeking truth',
      'Testing the three physical signs of prophethood in Madinah',
      'The collective planting of 300 date palms to purchase his emancipation',
      'Designing the defensive trench in the Battle of the Ahzab (Khandaq)',
      'Governing Al-Mada\'in (Ctesiphon) while weaving baskets to earn his food'
    ],
    moralLesson: 'Whoever sincerely seeks truth with an open heart will be guided to it, no matter how many oceans and obstacles lie in the way.',
    quranOrHadithRef: 'Surah Al-Ahzab 33:9-25; Tirmidhi 3790',
    audio: {
      title: 'Hazrat Salman Farsi (RA) Journey to Islam',
      speaker: 'Chronicles of the Sahaba',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '42:10'
    },
    video: {
      title: 'The Seeker of Truth: Salman the Persian',
      speaker: 'Biographical Documentaries',
      youtubeQuery: 'Hazrat Salman Farsi story Urdu',
      durationFormatted: '34:50'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'abu-dharr-al-ghifari',
    nameEnglish: 'Hazrat Abu Dharr Al-Ghifari (RA) - The Champion of the Poor & Pure Ascetic',
    nameUrdu: 'حضرت ابو ذر غفاری (رض) - زہد و تقویٰ اور غربا کے علمبردار',
    arabicName: 'أَبُو ذَرٍّ الْغِفَارِيُّ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'The Truthful Ascetic Praised by the Prophet ﷺ',
    urduTitle: 'تنہا چلے، تنہا جیے اور تنہا دنیا سے رخصت ہوئے، حق گوئی کے پیکر',
    shortBio: 'Fifth person to accept Islam, openly proclaimed Tawhid at the Ka\'bah, fearless critic of luxury and hoarding of wealth.',
    urduBio: 'غفار قبیلے کے ڈاکوؤں کو اسلام میں لائے، مکہ میں کعبہ کے پاس کلمہ پڑھ کر مار کھائی، مال جمع کرنے کے سخت خلاف تھے۔',
    fullStory: `Hazrat Abu Dharr Al-Ghifari (RA) came from the notorious highway-robber tribe of Ghifar. Even before hearing of Islam, his innate nature rejected idol worship. Hearing rumors of a prophet in Mecca, he traveled there secretly, met the Prophet ﷺ, and became the fourth or fifth person to accept Islam.

Unable to contain his passion, he went straight to the courtyard of the Ka'bah and shouted the Shahadah before the Quraysh, who beat him until Abbas rescued him. He returned home and converted half of his fierce tribe.

Abu Dharr was the ultimate ascetic who strictly warned against hoarding gold and silver, citing Surah At-Tawbah: "And those who hoard gold and silver and spend it not in the way of Allah—give them tidings of a painful punishment" (9:34). The Prophet ﷺ said of him: "There is no one under the sky or on the earth more truthful in speech than Abu Dharr" (Tirmidhi). He spent his final years in the quiet desert outpost of Al-Rabadhah, living and passing away in pure solitude just as the Prophet had prophesied.`,
    keyEvents: [
      'Early conversion from the fierce bandit tribe of Ghifar',
      'First open proclamation of faith in front of the Ka\'bah',
      'Transforming his entire tribe into devout Muslims',
      'Lifelong championship of the poor and condemnation of lavish hoarding',
      'The prophetic foretelling: "Abu Dharr walks alone, dies alone, and will be resurrected alone"'
    ],
    moralLesson: 'Speaking truth without fear and detaching oneself from consumerism is true spiritual freedom.',
    quranOrHadithRef: 'Surah At-Tawbah 9:34-35; Tirmidhi 3801',
    audio: {
      title: 'Hazrat Abu Dharr Ghifari (RA) Asceticism',
      speaker: 'Islamic History',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '34:40'
    },
    video: {
      title: 'Abu Dharr: The Truthful Ascetic',
      speaker: 'Biographical Series',
      youtubeQuery: 'Hazrat Abu Zar Ghaffari story Urdu',
      durationFormatted: '28:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hamza-ibn-abdul-muttalib',
    nameEnglish: 'Hazrat Hamza ibn Abdul Muttalib (RA) - Asadullah & Sayyid al-Shuhada',
    nameUrdu: 'حضرت حمزہ بن عبد المطلب (رض) - شیرِ خدا اور سید الشہداء',
    arabicName: 'حَمْزَةُ بْنُ عَبْدِ الْمُطَّلِبِ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Sayyid al-Shuhada (Leader of the Martyrs) & Paternal Uncle of the Prophet ﷺ',
    urduTitle: 'سید الشہداء، احد کے میدان میں شجاعت کی مثال، ابو جہل کے سر پر کمان ماری',
    shortBio: 'Brave hunter who struck Abu Jahl with his bow to defend the Prophet ﷺ, hero of Badr, tragically martyred at Uhud by Wahshi\'s javelin.',
    urduBio: 'شکار سے لوٹ کر ابو جہل کو للکارا اور ایمان کا اعلان کیا، بدر میں دو تلواروں سے لڑے، احد میں وحشی کے نیزے سے شہید ہوئے۔',
    fullStory: `Hazrat Hamza ibn Abdul Muttalib (RA), the beloved paternal uncle and foster brother of Prophet Muhammad ﷺ, was known throughout Arabia as a fearless lion-hunter. When a female servant informed him that Abu Jahl had verbally abused and insulted his nephew at Mount Safa, Hamza marched straight into the sacred sanctuary with his hunting bow.

Standing over Abu Jahl before the chieftains of Quraysh, Hamza struck him across the face with his bow, breaking his skull, and roared: "Do you dare insult Muhammad while I follow his religion and say what he says? Hit me back if you can!" That day, Islam gained an impenetrable shield.

At the Battle of Badr, Hamza fought with an ostrich feather on his chest and two swords in his hands, eliminating top pagan warlords. At the Battle of Uhud, Hind bint Utbah hired the Ethiopian javelin-thrower Wahshi with promise of gold and freedom specifically to assassinate Hamza. Wahshi waited in ambush behind a rock and hurled his spear through Hamza's torso. The Prophet ﷺ wept bitterly over his uncle's mutilated body and bestowed upon him the immortal title: "Sayyid al-Shuhada" (Leader of all Martyrs).`,
    keyEvents: [
      'Striking Abu Jahl with his bow and proclaiming Islam openly',
      'The hero of the duals and victory at the Battle of Badr',
      'Martyrdom by ambush at the Battle of Uhud',
      'Conferred the title Sayyid al-Shuhada by the Prophet ﷺ'
    ],
    moralLesson: 'True bravery is using physical power to protect the defenseless and advance divine justice.',
    quranOrHadithRef: 'Sahih Bukhari 4072; Surah Ali \'Imran 3:169-172',
    audio: {
      title: 'Hazrat Hamza (RA) Sayyid al-Shuhada',
      speaker: 'Seerah Lecture Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '41:15'
    },
    video: {
      title: 'The Lion of Allah: Hazrat Hamza (RA)',
      speaker: 'Islamic History Documentaries',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Hamza RA story in Urdu',
      durationFormatted: '36:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'musab-ibn-umayr',
    nameEnglish: 'Hazrat Mus\'ab ibn Umayr (RA) - The First Ambassador of Islam & Martyr of Uhud',
    nameUrdu: 'حضرت مصعب بن عمیر (رض) - پہلے سفیرِ اسلام اور احد کے فدائی شہید',
    arabicName: 'مُصْعَبُ بْنُ عُمَيْرٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'First Ambassador to Madinah & Standard-Bearer at Uhud',
    urduTitle: 'مکہ کے سب سے امیر اور خوبصورت نوجوان، سب کچھ چھوڑ کر احد میں جان دی',
    shortBio: 'Most handsome, pampered youth of Mecca who renounced wealth for Islam; sent to Madinah where he guided the city to faith; martyred carrying the Muslim banner at Uhud.',
    urduBio: 'خوشبوؤں اور ریشم میں پلنے والے، ماں نے جائیداد سے بے دخل کیا، مدینہ جا کر اسلام پھیلایا، احد میں شہادت کے وقت کفن کا کپڑا بھی چھوٹا پڑ گیا۔',
    fullStory: `Hazrat Mus'ab ibn Umayr (RA) was the most elegant, handsome, and pampered youth in all of Mecca, wearing the finest perfumes and imported silks. When he heard the message of Prophet Muhammad ﷺ, he secretly embraced Islam in Dar al-Arqam. When his wealthy mother discovered his conversion, she imprisoned and disowned him, stripping him of all luxury.

Mus'ab accepted poverty gladly. Recognizing his intellect, gentle manner, and mastery of the Quran, the Prophet ﷺ appointed him the very first Ambassador of Islam, sending him to Yathrib (Madinah). Through his patient, luminous recitation, the prominent chieftains of Madinah, including Sa'd ibn Mu'adh and Usayd ibn Hudayr, accepted Islam, preparing the ground for the Great Hijrah.

At the Battle of Uhud, Mus'ab was entrusted with the grand banner of the Muslims. When the lines broke, he held the flag aloft, drawing the enemy's fury away from the Prophet ﷺ. An enemy cavalryman severed his right hand; Mus'ab seized the banner with his left hand reciting: "Muhammad is not but a messenger; other messengers have passed on before him" (Surah Ali 'Imran 3:144). His left hand was struck off, and he clasped the banner to his chest with his stumps until a spear pierced his heart. When buried, his shroud was so short that if his head was covered, his feet showed, prompting the Prophet ﷺ to weep over this former prince of Mecca.`,
    keyEvents: [
      'Sacrificing immense luxury and inheritance for faith',
      'Diplomatic success as the first ambassador of Islam to Madinah',
      'Guiding the leaders of the Ansar to Islam',
      'Bearing the Muslim banner with severed hands at Uhud',
      'The emotional eulogy and shroud shortage witnessed by the Prophet ﷺ'
    ],
    moralLesson: 'True elegance is moral purity; sacrificing worldly luxuries for divine truth brings immortal honor in the heavens.',
    quranOrHadithRef: 'Surah Ali \'Imran 3:144; Sahih Bukhari 1276',
    audio: {
      title: 'Hazrat Mus\'ab ibn Umayr (RA) Sacrifice',
      speaker: 'Seerah Chronicles',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '37:50'
    },
    video: {
      title: 'From Luxury to Martyrdom: Mus\'ab ibn Umayr',
      speaker: 'Historical Biographies',
      youtubeQuery: 'Hazrat Musab bin Umair story Urdu',
      durationFormatted: '31:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'jafar-ibn-abi-talib',
    nameEnglish: 'Hazrat Ja\'far ibn Abi Talib (RA) - At-Tayyar (The One with Two Wings)',
    nameUrdu: 'حضرت جعفر بن ابی طالب (رض) - جعفر طیار، نجاشی کے دربار میں ترجمان',
    arabicName: 'جَعْفَرُ بْنُ أَبِي طَالِبٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'The Spokesman in Abyssinia, Brother of Ali (RA) & Hero of Mu\'tah',
    urduTitle: 'جعفر طیار، حبشہ میں شاہ نجاشی کے دربار میں سورہ مریم پڑھ کر رلا دیا، موتہ میں دونوں بازو کٹ گئے',
    shortBio: 'Led the refugees to Abyssinia, recited Surah Maryam reducing King Negus to tears, martyred at Mu\'tah with both arms severed, granted emerald wings in Jannah.',
    urduBio: 'حبشہ کے بادشاہ نجاشی کے سامنے توحید اور حضرت عیسیٰ کی حقیقت بیان کی، موتہ میں جھنڈا سنبھالے دونوں بازو کٹوا دیے، اللہ نے جنت میں پر عطا کیے۔',
    fullStory: `Hazrat Ja'far ibn Abi Talib (RA), the elder brother of Ali (RA), closely resembled Prophet Muhammad ﷺ in both physical appearance and noble character. When Quraysh persecution peaked in Mecca, the Prophet sent a group of Muslims across the Red Sea to the Christian kingdom of Abyssinia (Ethiopia).

The Quraysh dispatched envoys loaded with gifts to King Negus (An-Najashi), demanding the extradition of the Muslim refugees. In the imperial court, Ja'far stood as spokesman, delivering one of the most eloquent speeches in history contrasting the ignorance (Jahiliyyah) of burying daughters alive and worshiping stones with the dignity, compassion, and justice brought by Islam.

When asked about Jesus, Ja'far recited the opening of Surah Maryam. King Negus wept until his beard was soaked and declared: "Indeed, this and what Jesus brought come from the same source of light! By God, I will never surrender them to you!" Returning to Madinah during the conquest of Khaybar, the Prophet embraced him: "I do not know what makes me happier: the conquest of Khaybar or the arrival of Ja'far!" At the Battle of Mu'tah, Ja'far took the banner after Zayd fell; his right hand was severed, then his left, holding the flag with his upper arms until martyred. The Prophet ﷺ announced: "I saw Ja'far flying in Paradise with angels, with two emerald wings!"`,
    keyEvents: [
      'Leading the first Muslim migration to Abyssinia (Ethiopia)',
      'The historic diplomatic defense before King Negus',
      'Reciting Surah Maryam that softened the Christian royal court',
      'The joy of the Prophet ﷺ upon his return at Khaybar',
      'Heroic martyrdom at Mu\'tah with both arms severed, receiving the wings of Paradise (At-Tayyar)'
    ],
    moralLesson: 'Eloquent, compassionate explanation of faith disarms hatred and bridges divided civilizations.',
    quranOrHadithRef: 'Surah Maryam 19:1-36; Sahih Bukhari 3708, 4261',
    audio: {
      title: 'Hazrat Ja\'far Tayyar (RA) in Abyssinia & Mu\'tah',
      speaker: 'Seerah Heritage',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '43:10'
    },
    video: {
      title: 'The Court of King Negus & Jafar At-Tayyar',
      speaker: 'Islamic History Films',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Jafar Tayyar story Urdu',
      durationFormatted: '35:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'abdullah-ibn-masud',
    nameEnglish: 'Hazrat Abdullah ibn Mas\'ud (RA) - Master of Quranic Recitation',
    nameUrdu: 'حضرت عبد اللہ بن مسعود (رض) - صاحبِ نعلین اور قرآن کے عظیم قاری',
    arabicName: 'عَبْدُ اللَّهِ بْنُ مَسْعُودٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Master Jurist, Personal Attendant of the Prophet ﷺ & Scholar of Kufa',
    urduTitle: 'سب سے پہلے کعبہ میں اعلانیہ قرآن پڑھا، جن کی پنڈلیاں قیامت کے دن میزان پر احد پہاڑ سے بھاری ہوں گی',
    shortBio: 'First person to publicly recite the Quran at the Ka\'bah, small in stature but massive in faith, whose calves were deemed heavier than Mount Uhud on the scales.',
    urduBio: 'مکہ میں قریش کے سامنے کھڑے ہو کر سورہ رحمن کی تلاوت کی، پٹائی برداشت کی، قرآن کے جلیل القدر عالم اور کوفہ کے فقیہ اعظم۔',
    fullStory: `Hazrat Abdullah ibn Mas'ud (RA) was a poor young shepherd when he accepted Islam as the sixth convert. Known as the personal attendant of Prophet Muhammad ﷺ (Sahib an-Na'layn—the keeper of the Prophet's sandals, toothstick, and water jug), he gained profound intimate insight into the Quran's revelation.

In Mecca, when the Sahaba wished someone would publicly recite the Quran to the arrogant Quraysh, Ibn Mas'ud volunteered despite his fragile physical build. He stood at Maqam Ibrahim and recited Surah Ar-Rahman at the top of his voice. The Quraysh mob rushed and beat him brutally about the face, but he returned smiling, offering to recite again the next day.

Once, the companions laughed at how slender his legs were when the wind blew his garment as he climbed a tree. The Prophet ﷺ rebuked them: "Are you laughing at the thinness of his legs? By Him in Whose Hand is my soul, they are heavier in the scales on the Day of Resurrection than Mount Uhud!" (Ahmad). He was one of the four reciters from whom the Prophet commanded: "Take the Quran from four: Ibn Mas'ud, Salim, Mu'adh, and Ubayy."`,
    keyEvents: [
      'First open public recitation of Surah Ar-Rahman in front of the Ka\'bah',
      'Personal attendant and intimate companion of the Prophet ﷺ',
      'The prophetic declaration that his legs outweigh Mount Uhud in the scales',
      'Appointed master teacher and jurist of Kufa, founding the school of jurisprudence'
    ],
    moralLesson: 'Physical stature and worldly pedigree mean nothing; spiritual knowledge and love of the Quran outweigh mountains with Allah.',
    quranOrHadithRef: 'Sahih Bukhari 3758, 4999; Musnad Ahmad 3991',
    audio: {
      title: 'Hazrat Abdullah ibn Mas\'ud (RA) Life & Quran Recitation',
      speaker: 'Quranic Scholars',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '35:20'
    },
    video: {
      title: 'The Great Scholar: Abdullah ibn Mas\'ud',
      speaker: 'Historical Biographies',
      youtubeQuery: 'Hazrat Abdullah bin Masood story Urdu',
      durationFormatted: '27:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'abu-hurairah',
    nameEnglish: 'Hazrat Abu Hurairah (RA) - The Greatest Preserver of Prophetic Hadith',
    nameUrdu: 'حضرت ابو ہریرہ (رض) - احادیثِ نبوی کے سب سے بڑے محافظ',
    arabicName: 'أَبُو هُرَيْرَةَ عَبْدُ الرَّحْمَنِ بْنُ صَخْرٍ الدَّوْسِيُّ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Leader of Ashab al-Suffah & Narrator of Over 5,000 Hadith',
    urduTitle: 'اصحابِ صفہ کے سردار، بھوک اور فقر جھیلا تاکہ نبی ﷺ کا ایک ایک لفظ محفوظ کر سکیں',
    shortBio: 'Devoted his life to constant companionship with the Prophet ﷺ in Masjid an-Nabawi, blessed with a miraculous photographic memory, transmitted the foundational body of Hadith.',
    urduBio: 'بلی سے محبت کی وجہ سے "ابو ہریرہ" کہلائے، رسول اللہ ﷺ کی دعا سے حافظہ بے مثل ہو گیا، پانچ ہزار سے زائد احادیث امت تک پہنچائیں۔',
    fullStory: `Hazrat Abu Hurairah (RA) came from the tribe of Daws in Yemen, embracing Islam in 7 AH at Khaybar. He was affectionately nicknamed "Abu Hurairah" (Father of the Kitten) by the Prophet ﷺ when he saw him tenderly carrying a small kitten in his sleeve.

Deciding that worldly commerce and farming would distract him from sacred knowledge, Abu Hurairah permanently resided in the shaded veranda of the Prophet's Mosque as the leader of Ashab al-Suffah. He endured agonizing hunger—frequently tying a stone to his stomach to suppress pangs—so that he would never miss a single word or gesture of the Prophet ﷺ.

Once he complained of forgetting some sayings, so the Prophet ﷺ told him to spread out his cloak, made supplication over it, and told him to fold it back against his chest. Abu Hurairah said: "After that day, I never forgot a single word I heard from the Messenger of Allah ﷺ" (Sahih Bukhari). He preserved and transmitted over 5,300 authentic traditions that form the bedrock of Islamic ritual and law.`,
    keyEvents: [
      'Conversion from Yemen and devotion to Ashab al-Suffah',
      'Enduring poverty and hunger for the sake of sacred knowledge',
      'The miracle of the spread cloak and unfailing photographic memory',
      'Transmitting the vast corpus of Sunnah to successive generations'
    ],
    moralLesson: 'Sacrificing personal comfort and worldly wealth to preserve divine knowledge is one of the highest forms of worship.',
    quranOrHadithRef: 'Sahih Bukhari 118, 2046; Sahih Muslim 2492',
    audio: {
      title: 'Hazrat Abu Hurairah (RA) & Hadith Preservation',
      speaker: 'Hadith Studies Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '36:10'
    },
    video: {
      title: 'Abu Hurairah: The Guardian of Sunnah',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Abu Hurairah story Urdu',
      durationFormatted: '29:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'anas-ibn-malik',
    nameEnglish: 'Hazrat Anas ibn Malik (RA) - The Devoted Servant of the Prophet ﷺ',
    nameUrdu: 'حضرت انس بن مالک (رض) - خادمِ خاصِ رسول ﷺ',
    arabicName: 'أَنَسُ بْنُ مَالِكٍ الْأَنْصَارِيُّ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Personal Attendant to the Prophet ﷺ for 10 Years in Madinah',
    urduTitle: 'دس سال تک رسول اللہ ﷺ کی خدمت کی، کبھی اف تک نہ سنی، دعاؤں سے مال و اولاد میں برکت پائی',
    shortBio: 'Brought by his mother Umm Sulaym at age 10 to serve the Prophet ﷺ; testified that in 10 years, the Prophet never once rebuked or scolded him.',
    urduBio: 'دس سالہ خدمت میں ایک بار بھی رسول ﷺ نے یہ نہیں فرمایا: "یہ کیوں کیا یا وہ کیوں نہیں کیا"، بے مثال شفقت کی گواہی۔',
    fullStory: `When Prophet Muhammad ﷺ arrived in Madinah during the Hijrah, the Ansar presented gifts. Hazrat Umm Sulaym (RA) brought her ten-year-old son Anas and said: "O Messenger of Allah, every man and woman has given you a gift, and I have nothing except this boy of mine. Take him; let him serve you."

For ten uninterrupted years until the Prophet's passing, young Anas lived in the intimate presence of the Messenger of Allah ﷺ. Anas later recalled with tears: "I served the Messenger of Allah ﷺ for ten years, and by Allah, he never once said to me 'Uff' (an expression of irritation). He never said about anything I had done: 'Why did you do that?' nor about anything I had not done: 'Why didn't you do that?'" (Sahih Muslim).

The Prophet ﷺ made a special prayer for Anas: "O Allah, increase his wealth and his children, and bless him in what You grant him." Anas lived for over 100 years as the last surviving companion in Basra, blessed with vast date orchards that bore fruit twice a year, scores of children and grandchildren, and transmitting hundreds of hadith detailing the everyday mercy and manners of the Prophet ﷺ.`,
    keyEvents: [
      'Dedicated to the service of the Prophet ﷺ by his mother at age 10',
      'Ten years of experiencing the sublime, gentle character of the Prophet ﷺ',
      'The special prophetic supplication for longevity, children, and wealth',
      'Transmitting vital narrations detailing the Prophet\'s personal manners and worship'
    ],
    moralLesson: 'True greatness in leadership is treating subordinates with unfailing dignity, patience, and warmth.',
    quranOrHadithRef: 'Sahih Bukhari 2768, 6038; Sahih Muslim 2309',
    audio: {
      title: 'Hazrat Anas ibn Malik (RA) 10 Years with the Prophet',
      speaker: 'Seerah Lecture',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '32:50'
    },
    video: {
      title: 'Ten Years of Mercy: Anas ibn Malik',
      speaker: 'Seerah Series',
      youtubeQuery: 'Hazrat Anas bin Malik story Urdu',
      durationFormatted: '25:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'muadh-ibn-jabal',
    nameEnglish: 'Hazrat Mu\'adh ibn Jabal (RA) - The Scholar of Halal and Haram',
    nameUrdu: 'حضرت معاذ بن جبل (رض) - حلال و حرام کے عظیم ترین عالم',
    arabicName: 'مُعَاذُ بْنُ جَبَلٍ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Master Jurist, Envoy to Yemen & Leader of the Scholars on Judgment Day',
    urduTitle: 'قیامت کے دن علماء کے قافلہ سالار، جن سے رسول اللہ ﷺ نے فرمایا: "معاذ، میں تم سے محبت کرتا ہوں"',
    shortBio: 'Praised by the Prophet ﷺ as the most knowledgeable regarding lawful and unlawful matters; sent as judicial governor to Yemen; recipient of the intimate declaration: "O Mu\'adh, by Allah I love you."',
    urduBio: 'یمن میں قاضی بنا کر بھیجے گئے، اجتہاد کا طریقہ سکھایا، رسول اللہ ﷺ نے فرمایا: "اے معاذ! اللہ کی قسم میں تم سے محبت کرتا ہوں"۔',
    fullStory: `Hazrat Mu'adh ibn Jabal (RA) of the Ansar was a handsome, articulate youth who embraced Islam during the Second Pledge of Aqabah at age 18. Endowed with an exceptionally sharp legal mind, he mastered the Quran and the Sunnah so thoroughly that the Prophet ﷺ stated: "The most knowledgeable of my Ummah regarding halal (lawful) and haram (prohibited) is Mu'adh ibn Jabal" (Tirmidhi).

When appointing him governor and judge over Yemen, the Prophet asked: "How will you judge if a case is brought to you?" Mu'adh answered: "By the Book of Allah." "And if you do not find it in the Book of Allah?" "Then by the Sunnah of the Messenger of Allah." "And if you do not find it in the Sunnah?" "Then I will exercise my intellect and make effort (Ijtihad) without negligence." The Prophet patted his chest with joy and praised Allah.

The Prophet took Mu'adh's hand one day and said: "O Mu'adh, by Allah I love you! So never forget to say at the end of every prayer: 'O Allah, help me to remember You, give thanks to You, and worship You in the best manner'" (Abu Dawud). The Prophet foretold that on the Day of Resurrection, Mu'adh will lead the assembly of scholars a stone's throw ahead of all.`,
    keyEvents: [
      'Conversion at the Second Pledge of Aqabah at age 18',
      'Praised as the supreme scholar of Halal and Haram in the Ummah',
      'The foundational dialogue on Islamic jurisprudence (Ijtihad) before going to Yemen',
      'The profound supplication gifted with the declaration: "O Mu\'adh, I love you"',
      'Martyred in the Plague of \'Amwas in Syria with deep contentment'
    ],
    moralLesson: 'Deep scholarly understanding must always be wedded to devotional worship and genuine love for Allah and His Messenger.',
    quranOrHadithRef: 'Sunan Abi Dawud 1522; Sunan at-Tirmidhi 3790',
    audio: {
      title: 'Hazrat Mu\'adh ibn Jabal (RA) Scholar of Islam',
      speaker: 'Fiqh & Hadith Studies',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '33:15'
    },
    video: {
      title: 'The Great Jurist: Muadh ibn Jabal',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Muadh bin Jabal story Urdu',
      durationFormatted: '26:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'hudhayfah-al-yaman',
    nameEnglish: 'Hazrat Hudhayfah ibn Al-Yaman (RA) - Keeper of the Prophet\'s Secrets',
    nameUrdu: 'حضرت حذیفہ بن الیمان (رض) - رازدارِ رسول ﷺ اور نفاق کے پارکھ',
    arabicName: 'حُذَيْفَةُ بْنُ الْيَمَانِ رَضِيَ اللَّهُ عَنْهُ',
    category: 'sahaba',
    categoryLabel: 'Sahabi / صحابی',
    roleOrTitle: 'Sahib as-Sirr (Keeper of Secrets) & Spy of the Battle of the Trench',
    urduTitle: 'رازدارِ نبوی، جنہیں رسول اللہ ﷺ نے منافقین کے نام بتائے، خندق کی طوفانی رات دشمن کے کیمپ میں گھسے',
    shortBio: 'Sole person entrusted with the list of hypocrites (Munafiqeen) by the Prophet ﷺ; undertook the perilous night reconnaissance behind enemy lines at Khandaq.',
    urduBio: 'رسول اللہ ﷺ نے منافقوں کے راز ان کے سپرد کیے، عمر فاروق جنازہ پڑھنے سے پہلے حذیفہ کو دیکھتے کہ وہ شریک ہیں یا نہیں۔',
    fullStory: `Hazrat Hudhayfah ibn Al-Yaman (RA) held a unique, delicate office among the Sahaba as the Sahib as-Sirr (Keeper of the Secrets of the Prophet ﷺ). Endowed with piercing psychological insight, while other companions asked the Prophet about good deeds, Hudhayfah uniquely inquired about evil and impending tribulations so that he could recognize and avoid them.

During the freezing, terrifying storm on the final night of the Battle of the Trench (Al-Ahzab), the Prophet ﷺ called for a volunteer to sneak into the confederate enemy camp and bring intelligence without provoking them. The freezing wind was howling, and hunger was unbearable; only Hudhayfah rose to the challenge. He slipped directly into the camp of Abu Sufyan, gathered critical intelligence, and returned safely.

The Prophet ﷺ secretly entrusted Hudhayfah with the complete list of hypocrites (Munafiqeen) in Madinah. Even Caliph Umar ibn Al-Khattab (RA) would watch Hudhayfah: if a person died and Hudhayfah did not attend the funeral prayer, Umar refrained from leading it, and Umar would ask him with tears: "O Hudhayfah, by Allah, did the Messenger of Allah mention my name among the hypocrites?" Hudhayfah replied: "No, and I will not exonerate anyone after you."`,
    keyEvents: [
      'Inquiring deeply into trials and fitnah to safeguard the Ummah',
      'The freezing night espionage mission into the Quraysh camp at Khandaq',
      'Entrusted with the secret register of Munafiqeen',
      'Umar\'s profound reliance on his presence at funeral prayers',
      'Victor of the Battle of Nahavand in Persia'
    ],
    moralLesson: 'Vigilance against inner hypocrisy and spiritual corruption is as crucial as defending against outer enemies.',
    quranOrHadithRef: 'Sahih Bukhari 3743, 7084; Sahih Muslim 2798',
    audio: {
      title: 'Hazrat Hudhayfah ibn al-Yaman (RA) Secrets of Hypocrisy',
      speaker: 'Islamic History Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '38:40'
    },
    video: {
      title: 'Keeper of Secrets: Hudhayfah ibn al-Yaman',
      speaker: 'Historical Biographies',
      youtubeQuery: 'Hazrat Huzaifa bin Yaman story Urdu',
      durationFormatted: '28:50'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },

  // ==========================================
  // SECTION 3: 20+ BIBIS, SAHABIYAT & MOTHERS OF THE BELIEVERS
  // ==========================================
  {
    id: 'bibi-khadijah',
    nameEnglish: 'Hazrat Khadijah bint Khuwaylid (RA) - Mother of the Believers & At-Tahira',
    nameUrdu: 'ام المومنین حضرت خدیجہ الکبریٰ (رض) - طاہرہ اور محسنہِ اسلام',
    arabicName: 'خَدِيجَةُ بِنْتُ خُوَيْلِدٍ رَضِيَ اللَّهُ عَنْهَا',
    category: 'bibis',
    categoryLabel: 'Bibi / صحابیہ',
    roleOrTitle: 'First Believer in Islam, Beloved Wife & Benefactor of the Prophetic Mission',
    urduTitle: 'سب سے پہلے ایمان لانے والی، غارِ حرا کے بعد تسلی دینے والی، جنہیں اللہ نے سلام بھیجا',
    shortBio: 'Wealthiest businesswoman of Mecca who married the Prophet ﷺ for his honesty, consoled him after the first revelation, spent all her fortune for Islam, received greetings of peace from Allah.',
    urduBio: 'غارِ حرا سے کانپتے ہوئے رسول ﷺ کو تاریخی تسلی دی: "اللہ آپ کو کبھی رسوا نہیں کرے گا"، تمام دولت اسلام پر نچھاور کی۔',
    fullStory: `Hazrat Khadijah bint Khuwaylid (RA), known as At-Tahira (The Pure), was a noble, wealthy merchant princess of Mecca renowned for wisdom, business acumen, and spotless chastity. Impressed by Muhammad's ﷺ flawless honesty and character during a trade expedition to Syria, she proposed marriage. For 25 years until her death, the Prophet married no other woman.

When the Prophet ﷺ returned trembling from Cave Hira after receiving the first terrifying encounter with Angel Jibreel, crying: "Zammilooni! Zammilooni!" (Cover me! Wrap me!), Khadijah wrapped him in garments and delivered the immortal words that cemented her station: "Never! By Allah, Allah will never disgrace you! You keep good relations with kith and kin, speak the truth, help the poor and destitute, serve your guests generously, and assist those afflicted by disaster" (Sahih Bukhari).

She was the first human to testify that there is no god but Allah and Muhammad is His Messenger. During the brutal three-year economic boycott in the valley of Shi'b Abi Talib, she shared every starvation and privation, spending her entire fortune to buy smuggled food for the besieged believers. Angel Jibreel descended to the Prophet with a special greeting: "O Messenger of Allah, here is Khadijah coming with a vessel of food. When she reaches you, convey to her greetings of peace from her Lord and from me, and give her glad tidings of a palace in Paradise made of hollow pearls, wherein there will be no noise nor toil" (Sahih Bukhari).`,
    keyEvents: [
      'Recognizing the extraordinary honesty of Prophet Muhammad ﷺ',
      'The first person on Earth to embrace Islam without a second thought',
      'The psychological and emotional rock after the descent of revelation in Hira',
      'Total financial sacrifice during the three-year boycott of Shi\'b Abi Talib',
      'Receiving direct Salaam from Allah Almighty via Angel Jibreel'
    ],
    moralLesson: 'Unwavering emotional support, belief in your spouse\'s highest calling, and total generosity in times of crisis are the hallmarks of true nobility.',
    quranOrHadithRef: 'Sahih Bukhari 3, 3815, 3820; Sahih Muslim 2432',
    audio: {
      title: 'Hazrat Khadijah tul Kubra (RA) Life & Sacrifices',
      speaker: 'Seerah Lecture Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '44:10'
    },
    video: {
      title: 'Hazrat Khadijah (RA): The First Believer',
      speaker: 'Mothers of the Believers',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Khadija story in Urdu documentary',
      durationFormatted: '37:45'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bibi-fatima',
    nameEnglish: 'Hazrat Fatima Az-Zahra (RA) - Leader of the Women of Paradise',
    nameUrdu: 'سیدہ فاطمۃ الزہراء (رض) - سیدۃ نساء اہل الجنۃ اور جگر گوشہِ رسول ﷺ',
    arabicName: 'فَاطِمَةُ الزَّهْرَاءِ رَضِيَ اللَّهُ عَنْهَا',
    category: 'bibis',
    categoryLabel: 'Bibi / صحابیہ',
    roleOrTitle: 'Sayyidat Nisa Ahl al-Jannah, Beloved Daughter of the Prophet ﷺ & Mother of the Imams',
    urduTitle: 'جگر گوشہِ رسول ﷺ، جن کے آنے پر نبی ﷺ کھڑے ہو کر پیشانی چومتے، حسن و حسین کی والدہ',
    shortBio: 'Known as Umm Abiha (The Mother of her Father) for defending the Prophet in childhood, lived a life of rigorous ascetic simplicity grinding flour with blistered hands, leader of all women in Paradise.',
    urduBio: 'مکہ میں سجدہ میں پڑے والد کے سر سے اونٹ کی اوجھڑی ہٹائی، حضرت علی سے نکاح، چکی پیستے ہاتھ چھل گئے، رسول اللہ ﷺ نے فرمایا: "فاطمہ میرے جگر کا ٹکڑا ہے"۔',
    fullStory: `Hazrat Fatima Az-Zahra (RA) was the youngest and most beloved daughter of Prophet Muhammad ﷺ and Hazrat Khadijah (RA). In her youth in Mecca, when the pagan chieftain Uqbah ibn Abi Mu'ayt threw the bloody entrails of a slaughtered camel upon the Prophet's back while he was prostrating before the Ka'bah, young Fatima ran fearlessly into the laughing mob, cast the filth off her father, and rebuked the chieftains of Quraysh with blazing dignity.

The Prophet cherished her with unmatched tenderness. Whenever Fatima entered the room, the Prophet ﷺ would stand up to welcome her, take her by the hand, kiss her forehead, and seat her in his own place. He declared: "Fatima is a part of me; whoever angers her angers me, and whoever pleases her pleases me" (Sahih Bukhari).

She married Hazrat Ali (RA) and was the mother of Imam Hasan, Imam Hussain, and Sayyidah Zaynab. Despite being the daughter of the ruler of Arabia, her life was one of humble manual labor: grinding grain with a handmill until her palms blistered and carrying heavy water skins. When she asked her father for a servant, he instead gifted her the spiritual treasure known to all Muslims as Tasbih Fatima: reciting SubhanAllah 33 times, Alhamdulillah 33 times, and Allahu Akbar 34 times before sleeping, which he said was far better than any servant.`,
    keyEvents: [
      'Fearless childhood defense of the Prophet at the Ka\'bah',
      'The Prophet\'s standing in reverence and kissing her forehead upon arrival',
      'Marriage to Hazrat Ali and raising Imam Hasan and Imam Hussain',
      'The gift of Tasbih Fatima over worldly domestic servants',
      'Foreknowledge whispered on the Prophet\'s deathbed that she would be the first of his family to join him'
    ],
    moralLesson: 'True honor lies not in regal servants or material pampering, but in spiritual devotion, selfless patience, and unbreakable family dignity.',
    quranOrHadithRef: 'Sahih Bukhari 3714, 3767, 5361; Sahih Muslim 2449',
    audio: {
      title: 'Hazrat Fatima Az-Zahra (RA) & Tasbih Fatima',
      speaker: 'Ahl al-Bayt History',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '41:30'
    },
    video: {
      title: 'Sayyidah Fatima: Leader of the Women of Jannah',
      speaker: 'Islamic History Documentaries',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Fatima Zahra story Urdu',
      durationFormatted: '33:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bibi-aisha',
    nameEnglish: 'Hazrat Aisha Siddiqah (RA) - The Scholar of the Ummah & Mother of the Believers',
    nameUrdu: 'ام المومنین حضرت عائشہ صدیقہ (رض) - فقیہۃ الامت اور محبوبہِ رسول ﷺ',
    arabicName: 'عَائِشَةُ بِنْتُ أَبِي بَكْرٍ الصِّدِّيقِ رَضِيَ اللَّهُ عَنْهَا',
    category: 'bibis',
    categoryLabel: 'Bibi / صحابیہ',
    roleOrTitle: 'Mother of the Believers, Master Jurist & Narrator of Over 2,200 Hadith',
    urduTitle: 'فقیہہ، مفسرہ، صحابہ کرام مشکل مسائل میں جن سے فتویٰ لیتے، سورہ نور میں براءت نازل ہوئی',
    shortBio: 'Daughter of Abu Bakr, endowed with brilliant memory and judicial intellect, taught the leading companions medicine, poetry, inheritance law, and Sunnah.',
    urduBio: 'ذہانت کی چوٹی، رسول اللہ ﷺ کے آخری لمحات ان کی گود میں گزرے، افک کے بہتان پر قرآن نے خود پاکیزگی کی گواہی دی، احادیث کی عظیم راویہ۔',
    fullStory: `Hazrat Aisha bint Abi Bakr (RA), known as As-Siddiqah (The Truthful), was the preeminent female scholar, jurist, and transmitter of prophetic wisdom in Islamic history. Blessed with a lightning-quick intellect and photographic memory, she spent her youth absorbing the revelation as it descended directly in her room.

When slanderers concocted a vile lie against her honor during an expedition (the Incident of the Ifk), she endured weeks of grief with unshakeable reliance upon Allah, declaring like Prophet Yaqub: "Fasabrun Jameel" (Beautiful patience). Allah directly exonerated her from above the seven heavens by sending down ten verses in Surah An-Nur declaring her absolute purity and commanding eighty lashes for slanderers.

Abu Musa al-Ash'ari testified: "Never did we, the companions of the Messenger of Allah ﷺ, encounter a difficult hadith or legal problem except that we questioned Aisha and found knowledge with her concerning it" (Tirmidhi). She transmitted over 2,210 authentic traditions covering everything from international diplomacy and Quranic commentary to intimate family ethics and medical hygiene. The Prophet ﷺ passed away peacefully resting his head upon her chest, buried in her chamber beneath where he lay.`,
    keyEvents: [
      'Divine revelation descending directly upon the Prophet in her presence',
      'The trial of Ifk and vindication via revelation in Surah An-Nur',
      'The passing of the Prophet ﷺ in her lap and burial in her chamber',
      'Teaching major male companions inheritance law, poetry, and medicine',
      'Transmitting one-fourth of the daily legal rulings of the Islamic Shariah'
    ],
    moralLesson: 'Pursuing the highest levels of scholarship, intellectual rigor, and teaching is the sacred right and inheritance of Muslim women.',
    quranOrHadithRef: 'Surah An-Nur 24:11-20; Sahih Bukhari 2581, 3768; Tirmidhi 3883',
    audio: {
      title: 'Hazrat Aisha Siddiqah (RA) The Great Scholar',
      speaker: 'Tafseer & Seerah',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '49:10'
    },
    video: {
      title: 'Aisha: The Mother of the Believers Documentary',
      speaker: 'Scholars of Islam',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Hazrat Aisha Siddiqa biography Urdu',
      durationFormatted: '42:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bibi-maryam',
    nameEnglish: 'Hazrat Maryam bint Imran (AS) - Mother of Jesus & Chosen Above All Women',
    nameUrdu: 'حضرت مریم بنت عمران (ع) - مادرِ عیسیٰ اور تمام جہانوں کی عورتوں پر برگزیدہ',
    arabicName: 'مَرْيَمُ ابْنَتُ عِمْرَانَ عَلَيْهَا السَّلَامُ',
    category: 'bibis',
    categoryLabel: 'Bibi / صحابیہ',
    roleOrTitle: 'The Pure Chaste Worshipper Honored with an Entire Surah in the Quran',
    urduTitle: 'قرآن کی سورہ مریم، محراب میں عبادت، فرشتوں کی بشارت اور بغیر باپ کے ولادتِ عیسیٰ',
    shortBio: 'Dedicated before birth to temple worship, nurtured in the sanctuary by Zakariyya, chosen by Allah above all women of the worlds, mother of Prophet Isa (AS).',
    urduBio: 'عفت و پاکدامنی کا تاج، تنہائی میں اللہ کی عبادت، فرشتہ جبرائیل نے بیٹے کی بشارت دی، کھجور کے تنے کو ہلانے کا معجزہ۔',
    fullStory: `Hazrat Maryam bint Imran (AS) holds an unparalleled station in the Holy Quran, being the only woman mentioned by name in the text and honored with an entire chapter (Surah Maryam). Dedicated before birth to the sacred sanctuary by her mother Hannah, she grew under the loving spiritual guardianship of Prophet Zakariyya (AS).

Allah sent angels who addressed her with supreme distinction: "O Maryam, indeed Allah has chosen you and purified you and chosen you above the women of the worlds. O Maryam, be devoutly obedient to your Lord and prostrate and bow with those who bow" (Surah Ali 'Imran 3:42-43).

When Angel Jibreel appeared to her as a perfect man to bestow a holy son without human touch, she placed complete trust in Allah's decree. During labor pains beneath a lonely date palm, when grief threatened to overwhelm her, Allah caused a fresh spring to flow beneath her feet and ripe dates to fall from the dry tree. Carrying her baby back to her people, she kept silence as the infant Isa spoke from the cradle to defend her honor.`,
    keyEvents: [
      'Pre-birth dedication to sacred service in Bayt al-Maqdis',
      'The miraculous provision of unseasonal fruits in the prayer niche (Mihrab)',
      'The angelic visitation announcing the miraculous birth of Isa',
      'The miraculous date palm tree and cool brook in the wilderness',
      'Vindicated by her infant child speaking from the cradle'
    ],
    moralLesson: 'Unshakeable chastity and pure devotion to prayer elevate the soul to the highest stations of divine honor.',
    quranOrHadithRef: 'Surah Maryam (Entire Chapter 19), Surah Ali \'Imran 3:35-47',
    audio: {
      title: 'Surah Maryam Recitation & Meaning',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '38:15'
    },
    video: {
      title: 'Maryam (AS): Chosen Above All Women',
      speaker: 'Quranic Documentaries',
      youtubeQuery: 'Hazrat Maryam story in Urdu Quran',
      durationFormatted: '31:40'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bibi-asiya',
    nameEnglish: 'Hazrat Asiya bint Muzahim - The Queen Who Defied Pharaoh for Faith',
    nameUrdu: 'حضرت آسیہ بنت مزاحم - فرعون کے محل میں ایمان کی شمع جلانے والی ملکہ',
    arabicName: 'آسِيَةُ بِنْتُ مُزَاحِمٍ رَضِيَ اللَّهُ عَنْهَا',
    category: 'bibis',
    categoryLabel: 'Bibi / صحابیہ',
    roleOrTitle: 'Wife of Pharaoh, Foster Mother of Musa (AS) & Queen of Martyrs',
    urduTitle: 'شاہی محلات اور تخت و تاج کو ٹھکرا کر اللہ سے جنت میں گھر مانگنے والی',
    shortBio: 'Wife of the greatest tyrant Pharaoh, pulled baby Musa from the Nile, preserved her monotheistic faith secretly, tortured to death while smiling at her palace in Jannah.',
    urduBio: 'دریا سے موسیٰ کی ٹوکری نکالی، فرعون کے جبر کے سامنے سر نہیں جھکایا، شہادت کے وقت دعا کی: "اے میرے رب! میرے لیے اپنے پاس جنت میں گھر بنا دے"۔',
    fullStory: `Hazrat Asiya bint Muzahim represents the absolute triumph of individual faith over the suffocating evil of royal privilege. Living as the queen empress of Egypt married to Pharaoh—the most arrogant despot who proclaimed "I am your lord most high"—Asiya's heart remained untainted by gold and imperial power.

When the wooden basket containing infant Musa floated past the palace gardens, Asiya saved him from Pharaoh's executioners, saying: "A comfort of the eye for me and for you. Do not kill him; perhaps he will benefit us, or we may adopt him as a son" (Surah Al-Qasas 28:9).

When Musa returned with the signs of Tawhid, Asiya secretly embraced Islam. When Pharaoh discovered her faith, he stripped her of her royal robes, tied her hands and feet to four stakes under the blistering desert sun, and placed a gigantic boulder over her chest. Asiya gazed toward the heavens and prayed the timeless prayer recorded in the Quran: "My Lord, build for me near You a house in Paradise and save me from Pharaoh and his deeds and save me from the wrongdoing people" (Surah At-Tahrim 66:11). Allah unveiled her palace in Jannah before her eyes; she laughed with joy, and her soul ascended before the stone touched her.`,
    keyEvents: [
      'Rescuing infant Prophet Musa from the Nile River',
      'Maintaining secret monotheistic faith inside Pharaoh\'s imperial court',
      'Defying Pharaoh\'s demands to renounce the Lord of Musa and Harun',
      'Enduring horrific torture on the stakes without yielding',
      'The immortal Quranic prayer for a house near Allah in Jannah'
    ],
    moralLesson: 'Environment does not dictate your destiny; a righteous soul can blossom even inside the darkest house of tyranny.',
    quranOrHadithRef: 'Surah At-Tahrim 66:11; Surah Al-Qasas 28:9',
    audio: {
      title: 'Hazrat Asiya & The Prayer for Jannah',
      speaker: 'Prophetic Women Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '29:40'
    },
    video: {
      title: 'Asiya: The Queen of Faith',
      speaker: 'Historical Biographies',
      youtubeQuery: 'Hazrat Asiya story Urdu',
      durationFormatted: '24:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bibi-asma',
    nameEnglish: 'Hazrat Asma bint Abi Bakr (RA) - Dhat an-Nitaqayn (She of the Two Belts)',
    nameUrdu: 'حضرت اسماء بنت ابی بکر (رض) - ذات النطاقین اور شجاعت کا مینار',
    arabicName: 'أَسْمَاءُ بِنْتُ أَبِي بَكْرٍ رَضِيَ اللَّهُ عَنْهَا',
    category: 'bibis',
    categoryLabel: 'Bibi / صحابیہ',
    roleOrTitle: 'Dhat an-Nitaqayn, Heroine of the Hijrah & Mother of Abdullah ibn Zubayr',
    urduTitle: 'ذات النطاقین، ہجرت کے دوران غارِ ثور تک کھانا پہنچایا، ابو جہل کے تھپڑ پر بھی راز نہ کھولا',
    shortBio: 'Tore her belt into two to pack provisions for the Prophet during Hijrah, slapped by Abu Jahl yet kept the secret, mother of the first child born in Madinah.',
    urduBio: 'ہجرت کی خطرناک رات کھانا باندھنے کے لیے کمر بند کے دو ٹکڑے کیے، سو سال کی عمر میں نابینا ہونے کے باوجود بیٹے عبد اللہ بن زبیر کو حق پر ڈٹے رہنے کی تلقین کی۔',
    fullStory: `Hazrat Asma bint Abi Bakr (RA), the elder sister of Hazrat Aisha and daughter of Abu Bakr, was a towering figure of courage and steel resolve. During the perilous secret migration (Hijrah), while Quraysh bounty hunters combed every rock in Mecca offering 100 camels for the Prophet's capture, Asma packed food and water skins for their escape into the Cave of Thawr.

Finding no rope to tie the saddle bags, she tore her own belt (Nitaq) into two pieces, using one to tie the provisions and the other for her waist. The Prophet ﷺ smiled and announced: "May Allah replace your belt with two belts in Paradise!" earning her the eternal title Dhat an-Nitaqayn (She of the Two Belts).

When a furious Abu Jahl stormed her home demanding where her father had fled, Asma refused to answer. Abu Jahl struck her face so violently that her earring flew off, but she did not betray the secret. She lived to over 100 years of age with full mental clarity. In her old age, when her son Abdullah ibn Zubayr faced the overwhelming army of Hajjaj ibn Yusuf in Mecca, she counseled him: "If you are on truth, die upon it like an honorable man; do not give the tyrants the satisfaction of your submission!"`,
    keyEvents: [
      'Tearing her belt to secure food for the Prophet during the Hijrah',
      'Standing fearless when slapped across the face by Abu Jahl',
      'Giving birth to Abdullah ibn Zubayr—the first baby born in Madinah',
      'Uncompromising courage in advising her son against the tyrant Hajjaj'
    ],
    moralLesson: 'True bravery in women sustains the foundations of historical movements; steadfastness before tyrants is a sacred legacy.',
    quranOrHadithRef: 'Sahih Bukhari 2979, 3905; Sahih Muslim 2505',
    audio: {
      title: 'Hazrat Asma bint Abi Bakr (RA) Dhat an-Nitaqayn',
      speaker: 'Sahabiyat Chronicles',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '33:20'
    },
    video: {
      title: 'She of the Two Belts: Asma bint Abi Bakr',
      speaker: 'Islamic History Series',
      youtubeQuery: 'Hazrat Asma bint Abi Bakr story Urdu',
      durationFormatted: '27:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bibi-umm-umara',
    nameEnglish: 'Hazrat Umm Umarah (Nusaybah bint Ka\'b) (RA) - The Heroic Defender of Uhud',
    nameUrdu: 'حضرت ام عمارہ (نسیبہ بنت کعب) (رض) - جنگِ احد کی بہادر تلوار باز',
    arabicName: 'نُسَيْبَةُ بِنْتُ كَعْبٍ (أُمُّ عُمَارَةَ) رَضِيَ اللَّهُ عَنْهَا',
    category: 'bibis',
    categoryLabel: 'Bibi / صحابیہ',
    roleOrTitle: 'The Shield of the Prophet ﷺ at the Battle of Uhud',
    urduTitle: 'احد میں تلوار اور تیر چلا کر رسول اللہ ﷺ کی حفاظت کی، بارہ زخم کھائے',
    shortBio: 'Began Uhud providing water, but when enemy encircled the Prophet ﷺ, she unsheathed her sword and bow, sustaining 12 deep wounds to defend his life.',
    urduBio: 'جب احد میں افراتفری مچی تو تلوار سونت کر رسول ﷺ کے آگے ڈھال بن گئیں، رسول اللہ نے فرمایا: "میں دائیں بائیں جدھر دیکھتا، ام عمارہ کو لڑتے پاتا"۔',
    fullStory: `Hazrat Nusaybah bint Ka'b (RA), known as Umm Umarah, was among the prominent early Ansar women who pledged allegiance at the Second Pledge of Aqabah. At the Battle of Uhud, she accompanied the army with water skins to quench the thirst of the wounded.

When the archers left their posts and the pagan cavalry encircled the Prophet ﷺ, most fighters scattered in confusion. Only a tiny handful shielded the Prophet from death. Seeing the peril, Umm Umarah dropped her water skins, snatched a sword and bow, and stepped into the vanguard of combat.

She fought fiercely, firing arrows and cutting down attackers. When the enemy warrior Ibn Qami'ah surged forward shouting: "Show me Muhammad! I will not survive if he survives!" Umm Umarah blocked his charge with Mus'ab ibn Umayr, taking a devastating sword blow to her shoulder that left a deep hollow wound. The Prophet ﷺ famously testified: "Wherever I turned on the day of Uhud, to my right or to my left, I saw her fighting in front of me!" (Ibn Hisham). The Prophet prayed for her and her family to be his companions in Paradise. She later fought at Yamama, losing her hand while combating the forces of the false prophet Musaylimah.`,
    keyEvents: [
      'Pledge of allegiance at the Second Pledge of Aqabah',
      'Dropping water skins to wield sword and shield at the Battle of Uhud',
      'Receiving 12 battle wounds while defending the life of Prophet Muhammad ﷺ',
      'The prophetic prayer for her and her family to accompany him in Jannah',
      'Fighting fearlessly at the Battle of Yamama despite advanced age'
    ],
    moralLesson: 'Women in Islam have stood on the front lines of defense with unmatched physical and spiritual valor.',
    quranOrHadithRef: 'Sirat Ibn Hisham; Siyar A\'lam an-Nubala 2/278',
    audio: {
      title: 'Hazrat Umm Umarah (RA) Heroine of Uhud',
      speaker: 'Chronicles of Sahabiyat',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '31:40'
    },
    video: {
      title: 'The Shield of Uhud: Nusaybah bint Ka\'b',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Umme Amarah story Urdu',
      durationFormatted: '23:50'
    },
    featuredImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bibi-sumayyah',
    nameEnglish: 'Hazrat Sumayyah bint Khayyat (RA) - The First Martyr of Islam',
    nameUrdu: 'حضرت سمیہ بنت خیاط (رض) - اسلام کی پہلی شہید خاتون',
    arabicName: 'سُمَيَّةُ بِنْتُ خَيَّاطٍ رَضِيَ اللَّهُ عَنْهَا',
    category: 'bibis',
    categoryLabel: 'Bibi / صحابیہ',
    roleOrTitle: 'The First Martyr (Shahidah) in the History of Islam',
    urduTitle: 'ابو جہل کے نیزے کا نشانہ بنیں لیکن کلمہِ توحید سے ایک انچ پیچھے نہ ہٹیں',
    shortBio: 'Mother of Ammar ibn Yasir, endured barbaric torture in the scorching sun of Mecca, refused to renounce Tawhid, speared to death by Abu Jahl.',
    urduBio: 'ضعیفی میں گرم لوہے کی زرہیں پہنا کر دھوپ میں تڑپایا گیا، ابو جہل نے نیزہ مار کر شہید کیا، رسول ﷺ نے فرمایا: "صبر کرو اے آلِ یاسر، تمہارا ٹھکانہ جنت ہے"۔',
    fullStory: `Hazrat Sumayyah bint Khayyat (RA) holds the eternal distinction of being the first human being to give her life as a martyr (Shahidah) for the message of Islam. An elderly, frail enslaved woman belonging to the clan of Makhzum, she and her husband Yasir and son Ammar were among the very first seven people to openly declare their faith in Mecca.

Because they had no tribal clan to shield them, Abu Jahl and the Quraysh subjected the family of Yasir to unspeakable cruelty: dressing them in iron armor and forcing them to lie on blazing red-hot sand under the desert noon, placing heavy burning stones on their chests, and whipping them continuously.

Whenever Prophet Muhammad ﷺ passed by their place of torment, tears filled his eyes, and he gave them the divine promise: "Patience, O family of Yasir! Indeed, your promised destination is Paradise!" (Al-Hakim). Abu Jahl demanded that Sumayyah curse Muhammad and praise the idols Al-Lat and Al-Uzza. Despite her frail body, she spat at his idols and proclaimed the oneness of Allah. In a fit of demonic rage, Abu Jahl thrust his spear through her heart, making her the first martyr to enter Jannah.`,
    keyEvents: [
      'Among the earliest seven individuals to openly profess Islam in Mecca',
      'Enduring horrific daily torture in the desert heat without recanting',
      'Receiving the prophetic guarantee of Paradise: "Patience, O Family of Yasir!"',
      'The glorious martyrdom by Abu Jahl\'s spear, inaugurating the caravan of martyrs'
    ],
    moralLesson: 'Physical frailty cannot stop a giant soul; the first martyr who opened the gates of Paradise was a courageous elderly woman.',
    quranOrHadithRef: 'Mustadrak al-Hakim 3/388; Surah An-Nahl 16:106',
    audio: {
      title: 'Hazrat Sumayyah (RA) First Martyr of Islam',
      speaker: 'Seerah Lecture Series',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '28:10'
    },
    video: {
      title: 'The First Martyr: Sumayyah bint Khayyat',
      speaker: 'Islamic History',
      youtubeQuery: 'Hazrat Sumayya first martyr story Urdu',
      durationFormatted: '22:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
  },

  // ==========================================
  // SECTION 4: IMPORTANT ISLAMIC STORIES & HISTORICAL EVENTS
  // ==========================================
  {
    id: 'ashab-al-kahf',
    nameEnglish: 'Ashab al-Kahf - The People of the Cave & The 309-Year Sleep',
    nameUrdu: 'اصحابِ کہف - غار والے نوجوان اور تین سو نو سالہ نیند کا معجزہ',
    arabicName: 'أَصْحَابُ الْكَهْفِ',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Miraculous Youth of Faith Preserved by Allah for Three Centuries',
    urduTitle: 'بت پرست بادشاہ سے ایمان بچا کر غار میں پناہ لی، کتے سمیت ۳۰۹ سال سوئے رہے',
    shortBio: 'Monotheistic young men who fled a pagan tyrant\'s decree, took refuge in a secluded cave with their dog, and were preserved in miraculous slumber for 309 years.',
    urduBio: 'دقیانوس کے جبر سے بھاگے، غار میں دعا کی: "اے ہمارے رب! ہمیں اپنی بارگاہ سے رحمت عطا فرما"، قیامت اور حیات بعد الموت کی زندہ نشانی۔',
    fullStory: `Surah Al-Kahf (Chapter 18) relates the famous historical sign of the Ashab al-Kahf (Companions of the Cave). In an ancient Roman city ruled by a tyrannical polytheist emperor who commanded all citizens to sacrifice to idols upon penalty of torture, a band of elite young men rejected state idolatry.

They said: "Our Lord is the Lord of the heavens and the earth. Never will we invoke besides Him any deity" (Surah Al-Kahf 18:14). Realizing they would be executed, they evacuated the city and sought sanctuary in a mountain cave accompanied by their faithful dog (Qitmir). They raised their hands in supplication: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance" (18:10).

Allah cast a deep, supernatural slumber over their ears. For 309 lunar years (300 solar years), they slept while Allah caused the sun to veer away from their cave at rising and setting, turning their bodies from right to left so their joints would not decay, while their dog stretched his forelegs at the entrance. When they awakened, feeling they had slept only a day or part of a day, they sent one companion with silver coins to buy pure food. The baker was stunned by coins three centuries old. By then, the entire empire had embraced monotheism, turning their story into an eternal proof of bodily resurrection.`,
    keyEvents: [
      'Standing against imperial idolatry with youthful conviction',
      'The prayer of absolute surrender inside the dark cave',
      'The 309-year preserved slumber with the faithful dog Qitmir',
      'Awakening into a monotheistic society and the realization of the miracle'
    ],
    moralLesson: 'When you take a stand to protect your faith from societal corruption, Allah creates miraculous avenues of refuge and preserves your legacy.',
    quranOrHadithRef: 'Surah Al-Kahf 18:9-26',
    audio: {
      title: 'Surah Al-Kahf: Full Story of Ashab al-Kahf',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '45:30'
    },
    video: {
      title: 'The Cave of the Sleepers: Ashab al-Kahf Documentary',
      speaker: 'Islamic History & Archeology',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Ashab e Kahf story in Urdu',
      durationFormatted: '38:00'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ashab-al-fil',
    nameEnglish: 'Ashab al-Fil - The People of the Elephant & The Destruction of Abrahah',
    nameUrdu: 'اصحابِ فیل - ہاتھیوں والا لشکر اور ابابیل کے کنکروں سے ابرہہ کی ہلاکت',
    arabicName: 'أَصْحَابُ الْفِيلِ',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Divine Protection of the Holy Ka\'bah in the Year 570 CE',
    urduTitle: 'کعبہ کو گرانے آیا لشکر، ہاتھی محمود بیٹھ گیا، پرندوں کی فوج نے کنکر مار کر بھس بنا دیا',
    shortBio: 'Abrahah marched on Mecca with war elephants to demolish the Ka\'bah; Abdul Muttalib declared "The House has a Lord who will protect it"; flocks of Ababil birds decimated the army.',
    urduBio: 'یمن کے گورنر ابرہہ کا مکہ پر حملہ، عبد المطلب کے اونٹ اور کعبہ کے رب پر بھروسہ، ننھے پرندوں نے ہاتھیوں کے لشکر کو کھائے ہوئے بھس کی طرح بنا دیا۔',
    fullStory: `Surah Al-Fil (Chapter 105) commemorates the miraculous event that occurred in 570 CE—the very year Prophet Muhammad ﷺ was born. Abrahah al-Ashram, the Christian viceroy of Yemen under the Kingdom of Aksum, constructed a magnificent cathedral named Al-Qullays in Sana'a to divert Arab pilgrims away from Mecca.

When the Arabs rejected his cathedral, Abrahah assembled a colossal army accompanied by terrifying war elephants, led by the giant lead elephant named Mahmud, vowing to raze the Ka'bah to the ground. Approaching Mecca, his soldiers seized 200 camels belonging to Abdul Muttalib, grandfather of the Prophet and chief of Quraysh.

When Abdul Muttalib went to demand his camels back, Abrahah scoffed: "I came to demolish the house of your religion, and you speak to me of camels?" Abdul Muttalib uttered his legendary reply: "I am the lord of the camels, but this House has a Lord who will defend it!" Abdul Muttalib instructed the Meccans to take refuge in the surrounding mountains.

As the army advanced toward the valley of Muhassir, the elephant Mahmud fell to his knees and refused to take a single step toward the Ka'bah, though he ran eagerly in any other direction. Suddenly, the sky darkened as flocks of tiny swallow-like birds (Ababil) flew in from the sea, each carrying three baked-clay pebbles (Sijjil) in its beak and claws. They pelted the soldiers, piercing through helmets and armor, turning the mighty invasion force into "chewed straw" (Ka\'asfin Ma\'kool).`,
    keyEvents: [
      'Abrahah\'s envy and construction of the cathedral in Sana\'a',
      'The march of the massive war elephants toward Mecca',
      'The immortal dialogue of Abdul Muttalib: "The House has a Lord who protects it"',
      'The elephant Mahmud refusing to charge toward the Holy Ka\'bah',
      'The descent of the Ababil birds and annihilation of the invaders'
    ],
    moralLesson: 'No earthly military power, no matter how colossal, can dismantle what Allah has decreed to preserve as sacred.',
    quranOrHadithRef: 'Surah Al-Fil (Entire Surah 105); Sirat Ibn Hisham',
    audio: {
      title: 'Surah Al-Fil Recitation & Tafseer',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '18:40'
    },
    video: {
      title: 'The Year of the Elephant & Abrahah',
      speaker: 'Sacred Mecca History',
      youtubeQuery: 'Ashab e Feel story Urdu',
      durationFormatted: '19:20'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tragedy-of-karbala',
    nameEnglish: 'The Tragedy of Karbala - The Supreme Sacrifice of Imam Hussain (AS)',
    nameUrdu: 'سانحہِ کربلا - نواسہِ رسول سیدنا امام حسین (رض) کی عظیم قربانی',
    arabicName: 'مَلْحَمَةُ كَرْبَلَاء وَاسْتِشْهَادُ الْإِمَامِ الْحُسَيْنِ',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Stand of Principle Against Tyranny at Karbala in 61 AH',
    urduTitle: 'حق و باطل کا معرکہ، فرات کا پانی بند، ۷۲ جانثاروں کے ساتھ شہادتِ عظمیٰ',
    shortBio: 'Refused allegiance to Yazid\'s monarchical corruption, surrounded in the arid plains of Karbala, deprived of water, martyred alongside 72 companions on the 10th of Muharram.',
    urduBio: 'خلافت کو ملوکیت بننے سے روکنے کے لیے نکلے، یزیدی لشکر نے محاصرہ کیا، تین دن کی پیاس، علی اکبر و اصغر کی قربانی اور میدانِ وفا میں سجدہ شکر۔',
    fullStory: `The Tragedy of Karbala (10th Muharram, 61 AH / October 680 CE) represents the eternal turning point in Islamic moral conscience. Following the death of Mu'awiyah, when his son Yazid assumed autocratic rule by dynastic inheritance, demanding unconditional bay'ah (oath of allegiance) from the free citizens and leaders of the Ummah, Imam Hussain (AS)—the beloved grandson of Prophet Muhammad ﷺ—refused to validate corrupt tyranny.

He proclaimed: "A person like me cannot pledge allegiance to a person like him. I have not risen out of arrogance or mischief, but to seek the reformation of the community of my grandfather." Traveling toward Kufa with his family and faithful companions, he was encircled at the desert of Karbala by thousands of cavalrymen dispatched by Ubaydullah ibn Ziyad and commanded by Umar ibn Sa'd.

On the 7th of Muharram, the army cut off all access to the Euphrates River, subjecting the camp, including women and suckling infants, to burning thirst under the desert sun. On the 10th (Ashura), after peace proposals were rejected, Hussain and his 72 companions fought with legendary nobility against thousands. One by one, heroes including Abbas, Ali Akbar, and infant Ali Asghar fell. Finally, wounded with over thirty sword cuts and arrows, Imam Hussain (AS) fell in prostration, and his head was severed. His sacrifice immortalized the principle that when core Islamic justice is threatened, the believer must offer everything rather than submit to injustice.`,
    keyEvents: [
      'Refusal of tyrannical dynastic allegiance to Yazid',
      'The journey to Kufa and interception at Karbala',
      'The cut-off of the Euphrates water for three days',
      'The valor and martyrdom of the 72 loyal companions and family',
      'The supreme martyrdom of Imam Hussain (AS) in prostration',
      'The courageous speech of Sayyidah Zaynab in the court of Damascus'
    ],
    historicalContext: 'Demonstrates the stark dividing line between prophetic justice and corrupt despotism.',
    moralLesson: 'Victory is not measured by who holds worldly power; the blood of martyrs outlives and overthrows every empire of tyranny.',
    quranOrHadithRef: 'Surah As-Saffat 37:107; Sahih Bukhari 3747; Tirmidhi 3768 ("Hussain is from me and I am from Hussain")',
    audio: {
      title: 'Dastan-e-Karbala: Reality & Lessons',
      speaker: 'Dr. Israr Ahmed',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '62:40'
    },
    video: {
      title: 'Karbala Facts History Never Told You — The Strategy & Untold Names',
      speaker: 'HASI TV • Haseeb Shafqat',
      videoUrl: USER_UPLOADED_STORY_VIDEO,
      youtubeQuery: 'HASI TV Karbala Facts History Never Told You',
      durationFormatted: '31:20'
    },
    featuredImage: 'https://img.youtube.com/vi/GKtrCO7pLys/hqdefault.jpg'
  },
  {
    id: 'isra-wal-miraj',
    nameEnglish: 'Isra wal Mi\'raj - The Night Journey & Heavenly Ascension',
    nameUrdu: 'واقعہِ معراج النبی ﷺ - سفرِ اسراء اور سدرۃ المنتہیٰ کا مشاہدہ',
    arabicName: 'الْإِسْرَاءُ وَالْمِعْرَاجُ',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Miraculous Night Journey from Mecca to Jerusalem & Beyond the Seven Heavens',
    urduTitle: 'مسجدِ حرام سے مسجدِ اقصی تک سفر، تمام انبیاء کی امامت اور فرضیتِ نماز کا تحفہ',
    shortBio: 'Traveled on the Buraq from Mecca to Al-Aqsa, led all prophets in prayer, ascended through the seven heavens into the divine presence where the 5 daily prayers were gifted.',
    urduBio: 'غم کے سال (عام الحزن) کے بعد تسلیِ الٰہی، براق پر سواری، انبیاء کی امامت، سدرۃ المنتہیٰ سے آگے کلامِ الٰہی اور امت کے لیے پانچ نمازوں کا انعام۔',
    fullStory: `The event of Isra wal Mi'raj occurred during the tenth year of the prophetic mission (Year of Sadness), following the deaths of Hazrat Khadijah (RA) and Abu Talib, and the painful stoning at Ta'if. Allah blessed His beloved Prophet with the greatest journey ever experienced by any human.

In the first stage (Al-Isra), the Prophet ﷺ was transported by night from the Sacred Mosque in Mecca to the Al-Aqsa Mosque in Jerusalem upon the celestial steed Al-Buraq accompanied by Angel Jibreel. In Jerusalem, Allah gathered all 124,000 prophets from Adam to Jesus; Prophet Muhammad ﷺ stepped forward to lead them in prayer, establishing his universal leadership over all divine messengers.

In the second stage (Al-Mi'raj), the Prophet ascended through the seven heavens, meeting Adam in the first, Yahya and Isa in the second, Yusuf in the third, Idris in the fourth, Harun in the fifth, Musa in the sixth, and Ibrahim resting against the Bayt al-Ma'mur in the seventh. Passing beyond Sidrat al-Muntaha (The Lote Tree of the Utmost Boundary) where even Jibreel could not tread, the Prophet entered into the divine presence of Allah. There, the supreme gift of the Five Daily Prayers (Salah) was instituted for the Ummah. When the Prophet described Jerusalem to the Meccan skeptics the next morning, Abu Bakr famously verified him without hesitation: "If he said it, it is the truth," earning his title As-Siddiq.`,
    keyEvents: [
      'The nocturnal journey on Al-Buraq from Mecca to Al-Quds (Jerusalem)',
      'Leading all the prophets of history in congregational prayer at Masjid al-Aqsa',
      'Ascension through the Seven Heavens and meeting the prophets',
      'Approaching Sidrat al-Muntaha and the direct divine communication',
      'The gift of the Five Daily Prayers (reduced from 50 on the counsel of Musa)',
      'The firm affirmation of faith by Abu Bakr As-Siddiq'
    ],
    moralLesson: 'Every trial on earth is followed by divine elevation; the Daily Prayer is the spiritual Mi\'raj of the everyday believer.',
    quranOrHadithRef: 'Surah Al-Isra 17:1; Surah An-Najm 53:1-18; Sahih Bukhari 3887',
    audio: {
      title: 'Surah Al-Isra & The Night of Mi\'raj',
      speaker: 'Miraj-ul-Din Khan Recitation',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '47:20'
    },
    video: {
      title: 'Isra wal Mi\'raj: The Heavenly Ascension',
      speaker: 'Islamic History Documentaries',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Waqia e Meraj un Nabi SAW Urdu documentary',
      durationFormatted: '41:10'
    },
    featuredImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'battle-of-badr',
    nameEnglish: 'The Battle of Badr - Yawm al-Furqan (The Day of Criterion)',
    nameUrdu: 'غزوہِ بدر - یوم الفرقان، حق و باطل کا پہلا فیصلہ کن معرکہ',
    arabicName: 'غَزْوَةُ بَدْرٍ الْكُبْرَى',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Decisive First Battle in 2 AH / 624 CE Where 313 Triumphed Over 1,000',
    urduTitle: '۳۱۳ نہتے جانثاروں کا ۱۰۰۰ کے مسلح لشکر پر غلبہ، فرشتوں کی نصرت اور ابو جہل کا خاتمہ',
    shortBio: '313 ill-equipped Muslims faced 1,000 elite Quraysh warriors; the Prophet spent the night weeping in prayer; 5,000 angels descended to grant overwhelming victory.',
    urduBio: 'رمضان کی ۱۷ تاریخ، پانی کے کنوؤں پر پڑاؤ، رسول اللہ ﷺ کی پردرد دعا: "اے اللہ! اگر یہ مٹھی بھر جماعت مٹ گئی تو قیامت تک تیرا نام لینے والا کوئی نہ ہوگا"۔',
    fullStory: `The Battle of Badr, fought on the 17th of Ramadan, 2 AH (624 CE), is designated in the Quran as Yawm al-Furqan (The Day of Criterion that separated truth from falsehood). The Meccan Quraysh assembled an imperial army of 1,000 fully armed cavalry and infantry led by Abu Jahl, Umayyah ibn Khalaf, and Utbah ibn Rabi'ah to annihilate the nascent Muslim community in Madinah.

The Muslims numbered only 313 men, possessing just two horses, 70 camels that they took turns riding, and wooden sticks. When the Prophet ﷺ looked at the sheer disparity, he entered his prayer shelter (Arish), raised his hands until his cloak fell from his shoulders, and wept: "O Allah! If this small band of believers is destroyed today, You will never be worshiped on earth!" Abu Bakr held him gently, saying: "O Messenger of Allah, enough of your entreaty to your Lord; He will surely fulfill His promise to you."

Allah responded by sending down 5,000 marked angels led by Jibreel (Surah Ali 'Imran 3:124-125) and casting sleep as reassurance over the believers. In the combat, Hamza and Ali crushed the Quraysh elite, while two teenage Ansar boys (Mu'adh and Mu'awwadh) struck down the arch-tyrant Abu Jahl. The Quraysh were completely routed, leaving behind seventy top chieftains dead and seventy captured, establishing Islam as an invincible power.`,
    keyEvents: [
      'The 313 believers confronting 1,000 fully equipped combatants',
      'The tears and desperate supplication of the Prophet in the Arish',
      'The descent of thousands of angels to assist the believers',
      'The elimination of top Meccan tyrants including Abu Jahl and Umayyah',
      'The exemplary compassionate treatment of prisoners of war (teaching literacy to earn freedom)'
    ],
    moralLesson: 'Numerical superiority and advanced weaponry cannot overcome the power of sincere faith and divine assistance.',
    quranOrHadithRef: 'Surah Al-Anfal 8:5-19, Surah Ali \'Imran 3:123-126; Sahih Bukhari 3953',
    audio: {
      title: 'Ghazwa-e-Badr Complete Tafseer',
      speaker: 'Dr. Israr Ahmed',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '55:30'
    },
    video: {
      title: 'The Battle of Badr: Day of the Criterion',
      speaker: 'Military History of Islam',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Ghazwa e Badr Urdu full documentary',
      durationFormatted: '46:15'
    },
    featuredImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'conquest-of-mecca',
    nameEnglish: 'The Conquest of Mecca - Fath Makkah & The Triumph of Mercy',
    nameUrdu: 'فتحِ مکہ - فتح المبین اور عام معافی کا لازوال نمونہ',
    arabicName: 'فَتْحُ مَكَّةَ الْمُكَرَّمَةِ',
    category: 'events',
    categoryLabel: 'Event / واقعہ',
    roleOrTitle: 'The Bloodless Liberation of Mecca in 8 AH & Purifying the Ka\'bah of 360 Idols',
    urduTitle: '۱۰ ہزار کا لشکر، کعبہ کے ۳۶۰ بتوں کی صفائی، دشمنوں کو عام معافی: "آج تم پر کوئی گرفت نہیں"',
    shortBio: '10,000 Muslims marched into Mecca without shedding blood; the Prophet bowed low on his camel in humbleness, smashed the 360 idols, and granted unconditional pardon to his former persecutors.',
    urduBio: 'بغیر خون خرابے کے مکہ فتح ہوا، کعبہ میں سجدہ شکر، "جاء الحق وزہق الباطل" پڑھتے ہوئے بت توڑے، قریش کے جانی دشمنوں کو آزاد کر دیا۔',
    fullStory: `In Ramadan of 8 AH (630 CE), following Quraysh's breach of the Treaty of Hudaybiyyah by attacking the Muslim-allied tribe of Khuza'ah, Prophet Muhammad ﷺ assembled an army of 10,000 believers and marched toward Mecca.

Entering the city from four directions, the Prophet forbade bloodshed. Instead of entering as a proud conqueror, he rode his camel Al-Qaswa with his head bowed so low in gratitude to Allah that his beard almost brushed the saddle pommel.

He entered the courtyard of the Holy Ka'bah, where 360 stone and wooden idols stood. With his bow, he pointed at each idol, reciting: "Truth has come, and falsehood has perished. Indeed, falsehood is bound to perish" (Surah Al-Isra 17:81), and the idols fell crashing to the ground. Standing before the thousands of Quraysh chieftains who had tortured him, boycotted his family, assassinated his uncle Hamza, and waged war against him for twenty years, the Prophet asked: "O people of Quraysh, what do you think I am about to do with you?" They answered: "We expect good; you are a noble brother, the son of a noble brother." The Prophet ﷺ replied with the sublime words of Prophet Yusuf: "I speak to you as Yusuf spoke to his brothers: 'No blame will there be upon you today. Go, for you are all free!'" (Al-Bayhaqi).`,
    keyEvents: [
      'The secret mobilization of 10,000 disciplined believers',
      'The awe-inspiring campfires on the mountains of Marr az-Zahran',
      'The humble entrance into Mecca with head bowed to the camel',
      'Cleansing the Holy Ka\'bah of all 360 idols',
      'The universal declaration of unconditional pardon (Al-Afw al-\'Aam)'
    ],
    moralLesson: 'The ultimate victory of truth is not the destruction of your enemies, but the transformation of their hearts through boundless mercy.',
    quranOrHadithRef: 'Surah An-Nasr 110:1-3, Surah Al-Fath 48:1-3; Sahih Bukhari 4288',
    audio: {
      title: 'Fath Makkah: Complete Urdu Lecture',
      speaker: 'Miraj-ul-Din Khan',
      audioUrl: USER_UPLOADED_STORY_AUDIO,
      durationFormatted: '42:50'
    },
    video: {
      title: 'The Conquest of Mecca Documentary',
      speaker: 'Seerah Heritage',
      videoUrl: LOCAL_ISLAMIC_VIDEO,
      youtubeQuery: 'Fateh Makkah story in Urdu',
      durationFormatted: '36:30'
    },
    featuredImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80'
  }
];

export const ISLAMIC_STORIES_DATA: IslamicStoryItem[] = RAW_ISLAMIC_STORIES_DATA.map(enrichStoryWithAuthenticMedia);

// Helper functions for search & filter
export function getStoriesByCategory(cat: StoryCategory): IslamicStoryItem[] {
  if (cat === 'all') return ISLAMIC_STORIES_DATA;
  return ISLAMIC_STORIES_DATA.filter(s => s.category === cat);
}

export function searchStories(query: string, category: StoryCategory = 'all'): IslamicStoryItem[] {
  const q = query.toLowerCase().trim();
  const pool = category === 'all' ? ISLAMIC_STORIES_DATA : getStoriesByCategory(category);
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

export function getStoryById(id: string): IslamicStoryItem | undefined {
  return ISLAMIC_STORIES_DATA.find(s => s.id === id);
}
