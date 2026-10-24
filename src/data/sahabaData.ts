export interface SahabaAudio {
  title: string;
  speaker: string;
  audioUrl: string;
  durationFormatted: string;
}

export interface SahabaVideo {
  title: string;
  speaker: string;
  videoUrl?: string; // Direct mp4 if available
  youtubeQuery: string;
  durationFormatted: string;
}

export interface HistoricalStudySection {
  heading: string;
  urduHeading: string;
  content: string;
  historicalContext: string;
  moralLesson: string;
  hadithOrQuranRef?: string;
}

export interface SahabaItem {
  id: string;
  nameEnglish: string;
  nameUrdu: string;
  arabicName: string;
  category: 'sahaba' | 'bibi' | 'ashara_mubashara' | 'historical_study';
  roleOrTitle: string;
  urduTitle: string;
  shortBio: string;
  urduBio: string;
  fullStory: string;
  keyEvents: string[];
  historicalStudy?: HistoricalStudySection[];
  audios: SahabaAudio[];
  videos: SahabaVideo[];
  quranicMentions?: string[];
  virtuesHadith?: string[];
  featuredImage: string;
  isSpecialStudy?: boolean;
}

export const SAHABA_AND_BIBIS_DATA: SahabaItem[] = [
  // 1. SPECIAL IN-DEPTH STUDY: HAZRAT SA'D IBN ABI WAQQAS & HIS SON UMAR IBN SA'D
  {
    id: 'aad-bin-abi-waqqas',
    nameEnglish: "Hazrat Sa'd ibn Abi Waqqas (RA) & The Dilemma of his Son Umar ibn Sa'd",
    nameUrdu: "حضرت سعد بن ابی وقاص رضی اللہ عنہ اور ان کے بیٹے عمر بن سعد کا واقعہ",
    arabicName: "سَعْدُ بْنُ أَبِي وَقَّاصٍ رَضِيَ اللَّهُ عَنْهُ",
    category: 'historical_study',
    roleOrTitle: "Conqueror of Persia, Uncle of the Prophet ﷺ & Ashara Mubashara",
    urduTitle: "فاتحِ ایران، ماموںِ رسول ﷺ، عشرہ مبشرہ اور فتنہِ کربلا کا عظیم عبرت آموز سبق",
    isSpecialStudy: true,
    shortBio: "One of the earliest converts, the legendary archer of Uhud, conqueror of Al-Qadisiyyah, who strictly avoided the civil strife (fitnah) — contrasted with the tragic fate of his son Umar ibn Sa'd who compromised for the governorship of Rayy at Karbala.",
    urduBio: "رسول اللہ ﷺ کے فدائی ماموں، احد کے عظیم تیر انداز، قادسیہ کے فاتح جنہوں نے فتنوں سے یکسر کنارہ کشی اختیار فرمائی؛ اور دوسری طرف ان کا بیٹا عمر بن سعد جو حکومتِ رے کے لالچ میں کربلا کے المناک سانحے میں الجھ گیا۔",
    fullStory: `Hazrat Sa'd ibn Abi Waqqas (RA) is one of the most towering personalities in Islamic history. Accepting Islam at just 17 as the seventh convert, he was beloved by the Prophet Muhammad ﷺ, who proudly referred to him as his maternal uncle: "This is my maternal uncle; let any man show me his uncle!" (Tirmidhi).

At the Battle of Uhud, when the Muslim lines were tested, Hazrat Sa'd stood firm defending the Messenger of Allah ﷺ. The Prophet handed him his own arrows, saying the immortal words never spoken to any other Sahabi: "Shoot, Sa'd! May my father and mother be ransomed for you! (ارْمِ سَعْدُ فِدَاكَ أَبِي وَأُمِّي)".

Under the Caliphate of Hazrat Umar ibn al-Khattab (RA), Sa'd was appointed supreme commander of the Muslim army that dismantled the centuries-old Persian Sassanid Empire at the epic Battle of Al-Qadisiyyah (15 AH / 636 CE) and later founded the historic garrison city of Kufa. He was among the elite Ashara Mubashshara (Ten Promised Paradise) and one of the six men chosen by Umar for the consultative council (Shura) to elect the next Caliph.

When civil war and political polarization (Fitnah) erupted following the martyrdom of Hazrat Uthman (RA), Hazrat Sa'd made a conscious, profound spiritual choice: he refused to raise a sword against any fellow believer. He retired completely from politics and high office, retreating to his rural estate in Al-Aqiq outside Medina to herd sheep and worship Allah in seclusion.`,
    keyEvents: [
      "Accepted Islam at age 17 as the 7th convert (Al-Sabiqun al-Awwalun)",
      "First person to shoot an arrow in the cause of Allah",
      "Immortal honor at Uhud: 'Shoot Sa'd, may my parents be ransomed for you!'",
      "Supreme Commander of the Battle of Al-Qadisiyyah, liberating Persia from tyranny",
      "Refusal of political fitnah and ascetic retirement at Al-Aqiq outside Medina",
      "The moral test of his son Umar ibn Sa'd and the tragedy of Karbala"
    ],
    historicalStudy: [
      {
        heading: "1. The Father's Admonition at Al-Aqiq (The True Spiritual Wealth)",
        urduHeading: "۱۔ العقیق میں باپ کی نصیحت: حقیقی ایمانی استغناء",
        content: `While Hazrat Sa'd was in seclusion at Al-Aqiq, his son Umar ibn Sa'd rode out on a fine horse. Seeing him approach, Sa'd said to his companion: 'I seek refuge in Allah from the evil of this rider.' 
When Umar dismounted, he urged his father: 'You are an elder of the Quraysh, one of the Ten Promised Paradise and the Shura council! Why do you sit here herding sheep while people dispute over the throne and rule of the Muslim world? Stand up and claim the Caliphate!'

Hazrat Sa'd struck his son's chest and firmly replied: 
'Be silent! I heard the Messenger of Allah ﷺ say: "Indeed, Allah loves the servant who is God-fearing (Taqiy), spiritually content and self-sufficient (Ghaniy), and hidden away from worldly fame and civil strife (Khafiy)." (Sahih Muslim 2965). By Allah, I will never dip my hands in the blood of Muslims!'`,
        historicalContext: "Recorded in Sahih Muslim (Kitab az-Zuhd, Hadith 2965). It contrasts Hazrat Sa'd's genuine spiritual detachment with early political opportunism.",
        moralLesson: "Power and status are trivial when they come at the expense of faith, principles, and innocent blood.",
        hadithOrQuranRef: "Sahih Muslim 2965: إِنَّ اللَّهَ يُحِبُّ الْعَبْدَ التَّقِيَّ الْغَنِيَّ الْخَفِيَّ"
      },
      {
        heading: "2. The Son's Fatal Compromise: The Governorship of Rayy vs Karbala",
        urduHeading: "۲۔ بیٹے کی آزمائش: حکومتِ رے کی تمنا اور کربلا کا بھیانک موڑ",
        content: `Years later, in 61 AH, Yazid ibn Mu'awiyah was in power and Ubaydullah ibn Ziyad was governor of Kufa. Umar ibn Sa'd was appointed commander of an expedition to Dastabi and promised the lucrative governorship of the province of Rayy (near modern Tehran, Iran).

Before Umar could depart for Rayy, news arrived that Imam Hussain (RA), the beloved grandson of the Prophet ﷺ, was arriving at Karbala. Ibn Ziyad summoned Umar ibn Sa'd and delivered a chilling ultimatum:
'First march your army to Karbala and compel Hussain to surrender to Yazid. Only then will you take charge of the governorship of Rayy. If you refuse, I revoke your appointment and seize your property.'

Umar pleaded for a night to deliberate. That night, torn between his conscience and his insatiable worldly ambition, he paced his quarters reciting the infamous lines:
'أأترك ملك الري والري منيتي؟ أم أرجع مأثوماً بقتل حسين؟
وفي قتله النار التي ليس دونها حجاب، وملك الري قرة عيني!'
('Shall I abandon the kingdom of Rayy when Rayy is my soul's desire? Or return burdened with the unforgivable guilt of killing Hussain? Yet in killing him is the Fire beneath which is no veil, but the kingdom of Rayy is the delight of my eyes!')`,
        historicalContext: "Documented by prominent historians including Ibn al-Athir (Al-Kamil fi al-Tarikh), Al-Tabari (Tarikh al-Rusul wa al-Muluk), and Ibn Kathir (Al-Bidayah wa al-Nihayah).",
        moralLesson: "When worldly temptation blinds the heart, even the child of a Sahabi is not immune to disaster unless grounded in personal Taqwa.",
        hadithOrQuranRef: "Surah At-Taghabun 64:14-15: إِنَّمَا أَمْوَالُكُمْ وَأَوْلَادُكُمْ فِتْنَةٌ (Your wealth and your children are only a trial)"
      },
      {
        heading: "3. The Consequence: Worldly Ruin and Eternal Remorse",
        urduHeading: "۳۔ انجامِ بد: نہ دنیا ملی نہ آخرت (خسر الدنیا والآخرة)",
        content: `Despite attempts by Umar ibn Sa'd to negotiate a peaceful resolution with Imam Hussain, Ibn Ziyad's aggressive deputy Shimr ibn Dhil-Jawshan enforced unyielding violence. Umar ibn Sa'd succumbed to pressure, leading the blockade that resulted in the catastrophic martyrdom of Sayyiduna Hussain (RA) and his companions on the 10th of Muharram (Ashura).

Did Umar ibn Sa'd ever rule Rayy? Never. 
Ibn Ziyad confiscated his decree. When Umar demanded it back, Ibn Ziyad dismissed him. Umar returned to his house shunned by society. He wept bitterly, saying: 'No traveler ever returned to his home with a worse burden than mine: I obeyed a tyrant, severed ties of kinship, and incurred the wrath of my Creator.' 
Just a few years later, in 66 AH during the revolt of Al-Mukhtar al-Thaqafi, Umar ibn Sa'd and his son were tracked down and executed in retribution.`,
        historicalContext: "Tabari & Ibn Kathir detail how Umar ibn Sa'd was ostracized by the people of Kufa and died in ignominy without ever setting foot in Rayy as its ruler.",
        moralLesson: "Compromising the Truth for political favor or career elevation inevitably brings humiliation in both worlds.",
        hadithOrQuranRef: "Surah Al-Hajj 22:11: خَسِرَ الدُّنْيَا وَالْآخِرَةَ ۚ ذَٰلِكَ هُوَ الْخُسْرَانُ الْمُبِينُ"
      }
    ],
    audios: [
      {
        title: "Seerat Hazrat Sa'd ibn Abi Waqqas (RA) - Complete Life",
        speaker: "Dr. Israr Ahmed (رحمه الله)",
        audioUrl: "https://archive.org/download/seeratunnabi_bydrisrarahmad_audio/Seerat_lec_1_dr_israr.mp3",
        durationFormatted: "54:20"
      },
      {
        title: "The Battle of Qadisiyyah & Character of Sa'd ibn Abi Waqqas",
        speaker: "Shaykh Yasir Qadhi",
        audioUrl: "https://archive.org/download/AbdelAzizAlAhmedSura103AlAsr_201906/Dr_%20Israr%20Ahmed%20-%20Al%20Malhama%20Tul%20Uzma%20--%20Armegaddon.mp3",
        durationFormatted: "48:15"
      }
    ],
    videos: [
      {
        title: "Hazrat Sa'd bin Abi Waqas Aur Unke Bete Umar Ka Ibratnaak Waqia",
        speaker: "Dr. Israr Ahmed / Historic Bayan",
        videoUrl: "https://archive.org/download/MuntakhabNisabHD/001%20-%20Surah%20Al%20Asr%2C%20Lawazim-e-Nijaat%20%28Part%201%29.mp4",
        youtubeQuery: "Hazrat Saad bin Abi Waqas aur Umar bin Saad Karbala Dr Israr Ahmed",
        durationFormatted: "32:10"
      },
      {
        title: "Sa'd ibn Abi Waqqas - The Archer of the Prophet ﷺ",
        speaker: "Stories of the Sahabah Series",
        youtubeQuery: "Saad ibn Abi Waqqas conqueror of Persia Yasir Qadhi",
        durationFormatted: "45:00"
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    virtuesHadith: [
      "قَالَ النَّبِيُّ ﷺ: «ارْمِ فِدَاكَ أَبِي وَأُمِّي» (صحيح البخاري)",
      "«هَذَا خَالِي فَلْيُرِنِي امْرُؤٌ خَالَهُ» (سنن الترمذي)"
    ]
  },

  // 2. BIBI KHADIJAH BINT KHUWAYLID (RA)
  {
    id: 'bibi-khadijah',
    nameEnglish: "Bibi Khadijah bint Khuwaylid (RA)",
    nameUrdu: "ام المؤمنین حضرت خدیجة الکبریٰ رضی اللہ عنہا",
    arabicName: "خَدِيجَةُ بِنْتُ خُوَيْلِدٍ رَضِيَ اللَّهُ عَنْهَا",
    category: 'bibi',
    roleOrTitle: "Mother of the Believers, First to Accept Islam, At-Tahirah",
    urduTitle: "محسنۂ اسلام، سیدۃ نساء العالمین، حضور ﷺ کی پہلی رفیقۂ حیات",
    shortBio: "The wealthy, noble businesswoman of Mecca who recognized the honesty of Muhammad ﷺ, consoled him after the first revelation in Cave Hira, and sacrificed all her wealth for Islam.",
    urduBio: "وہ عظیم خاتون جنہوں نے غارِ حرا میں پہلی وحی کے وقت نبی کریم ﷺ کو سہارا دیا اور اپنا سارا مال و جان راہِ خدا میں قربان کر دیا۔",
    fullStory: `Bibi Khadijah (RA) was known in pre-Islamic Mecca as At-Tahirah (The Pure One). A successful merchant of rare intellect and dignity, she hired the young Muhammad ﷺ to lead her caravan to Syria after hearing of his reputation as As-Sadiq (the Truthful) and Al-Amin (the Trustworthy). Impressed by his character and blessed success, she proposed marriage.

When the Angel Jibreel descended upon the Prophet ﷺ in the Cave of Hira, trembling from the majesty of divine revelation, it was Khadijah who enveloped him with warmth: "Zammiluni, Zammiluni (Wrap me, wrap me)." Her immortal reassurance remains a beacon of faith:
"Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, you help the poor and destitute, you serve your guests generously, and you assist those afflicted by calamity."

She was the very first person on earth to embrace Islam, praying alongside the Prophet ﷺ when there was no one else on the face of the earth who worshipped Allah. For 25 years she was his sole wife, his counsel, and the source of his happiness, bearing him children including Sayyiduna Fatima (RA). When she passed away during the Boycott of Shi'b Abi Talib, the Prophet ﷺ named that entire period 'Aam al-Huzn' (The Year of Sorrow).`,
    keyEvents: [
      "Revered as At-Tahirah (The Pure One) in Mecca before Islam",
      "Proposed marriage to Prophet Muhammad ﷺ based on his truthfulness and noble character",
      "Consoled and validated the Prophet ﷺ upon the first revelation in Cave Hira",
      "First person on earth to accept Islam and offer Salah",
      "Sacrificed her immense wealth during the brutal three-year boycott of Shi'b Abi Talib",
      "Received divine greetings of Salaam from Allah and Jibreel (AS)"
    ],
    audios: [
      {
        title: "Bibi Khadijah (RA) - The Woman Who Reassured the Prophet ﷺ",
        speaker: "Dr. Israr Ahmed (رحمه الله)",
        audioUrl: "https://archive.org/download/seeratunnabi_bydrisrarahmad_audio/Seerat_lec_2_dr_israr.mp3",
        durationFormatted: "42:15"
      }
    ],
    videos: [
      {
        title: "The Life of Khadijah bint Khuwaylid (RA)",
        speaker: "Mothers of the Believers Series",
        youtubeQuery: "Khadijah bint Khuwaylid Dr Israr Ahmed Seerat",
        durationFormatted: "38:40"
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
    virtuesHadith: [
      "«خَيْرُ نِسَائِهَا مَرْيَمُ ابْنَتُ عِمْرَانَ، وَخَيْرُ نِسَائِهَا خَدِيجَةُ» (صحيح البخاري)",
      "أَتَى جِبْرِيلُ فَقَالَ: «يَا رَسُولَ اللَّهِ، هَذِهِ خَدِيجَةُ قَدْ أَتَتْ... فَاقْرَأْ عَلَيْهَا السَّلَامَ مِنْ رَبِّهَا وَمِنِّي» (متفق عليه)"
    ]
  },

  // 3. BIBI AISHA BINT ABI BAKR (RA)
  {
    id: 'bibi-aisha',
    nameEnglish: "Bibi Aisha bint Abi Bakr (RA)",
    nameUrdu: "ام المؤمنین حضرت عائشہ صدیقہ رضی اللہ عنہا",
    arabicName: "عَائِشَةُ بِنْتُ أَبِي بَكْرٍ الصِّدِّيقِ رَضِيَ اللَّهُ عَنْهَا",
    category: 'bibi',
    roleOrTitle: "Mother of the Believers, Scholar of Islamic Jurisprudence & Hadith",
    urduTitle: "فقیہۃ الامت، راویۃ الحدیث، محبوبۂ رسول اللہ ﷺ",
    shortBio: "Daughter of Abu Bakr as-Siddiq, the beloved wife of the Prophet ﷺ who narrated over 2,210 Hadiths, taught the Sahaba jurisprudence, and in whose chamber the Prophet ﷺ drew his final breath.",
    urduBio: "امت کی عظیم ترین معلمہ اور فقیہہ جنہوں نے ہزاروں احادیث نبویہ کو محفوظ فرما کر امت تک پہنچایا۔",
    fullStory: `Bibi Aisha (RA) occupies an unparalleled status in Islamic scholarship. Known for her razor-sharp intellect, photographic memory, and deep piety, she became one of the greatest jurists of the early Islamic community.

Whenever the senior companions of the Prophet ﷺ faced a complex ruling regarding inheritance, worship, or civil law, they consulted Aisha. Abu Musa al-Ash'ari (RA) said: "Never did we, the companions of the Messenger of Allah, face a difficult hadith or ruling except that we asked Aisha and found knowledge with her regarding it."

She lived with the Prophet ﷺ in deep mutual affection, memorizing divine revelations as they descended in her presence. In her room, the Prophet ﷺ spent his final days, resting his head against her chest as his soul departed to the Highest Companion (Ar-Rafiq al-A'la). She lived for over four decades after him, actively instructing the Ummah, teaching hundreds of male and female students, and distributing all her wealth to orphans without saving a dirham for herself.`,
    keyEvents: [
      "Daughter of the closest companion and first Caliph, Abu Bakr as-Siddiq (RA)",
      "Narrated over 2,210 Hadiths preserving intimate prophetic etiquette and Islamic jurisprudence",
      "Vindicated by Allah in Surah An-Nur across ten verses (Al-Ifk)",
      "Primary reference point for senior Sahaba on complex rulings",
      "Prophet Muhammad ﷺ passed away in her room and was buried in her chamber"
    ],
    audios: [
      {
        title: "Bibi Aisha Siddiqa (RA) - The Jurist & Teacher of the Ummah",
        speaker: "Dr. Israr Ahmed (رحمه الله)",
        audioUrl: "https://archive.org/download/seeratunnabi_bydrisrarahmad_audio/Seerat_lec_3_dr_israr.mp3",
        durationFormatted: "51:10"
      }
    ],
    videos: [
      {
        title: "The Intellectual Legacy of Aisha (RA)",
        speaker: "Islamic History & Scholars",
        youtubeQuery: "Hazrat Aisha Siddiqa Dr Israr Ahmed bayan",
        durationFormatted: "44:20"
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
    virtuesHadith: [
      "«فَضْلُ عَائِشَةَ عَلَى النِّسَاءِ كَفَضْلِ الثَّرِيدِ عَلَى سَائِرِ الطَّعَامِ» (صحيح البخاري)"
    ]
  },

  // 4. BIBI FATIMA AZ-ZAHRA (RA)
  {
    id: 'bibi-fatima',
    nameEnglish: "Bibi Fatima az-Zahra (RA)",
    nameUrdu: "سیدۃ نساء اہل الجنۃ حضرت فاطمۃ الزہراء رضی اللہ عنہا",
    arabicName: "فَاطِمَةُ الزَّهْرَاءُ رَضِيَ اللَّهُ عَنْهَا",
    category: 'bibi',
    roleOrTitle: "Leader of the Women of Paradise, Beloved Daughter of the Prophet ﷺ",
    urduTitle: "خاتونِ جنت، بضعۃ الرسول ﷺ، والدہِ حسنین کریمین",
    shortBio: "The youngest daughter of the Prophet ﷺ and Khadijah (RA), wife of Ali (RA), mother of Hasan and Hussain (RA), titled 'Umm Abiha' (The Mother of her Father) for her fierce love and protective care.",
    urduBio: "رسول اللہ ﷺ کا لختِ جگر، اہل بیتِ اطہار کی سردار جن کے متعلق فرمایا کہ فاطمہ میرے جسم کا ٹکڑا ہے۔",
    fullStory: `Bibi Fatima az-Zahra (RA) was born in Mecca during the most challenging days of early Islam. As a young girl, she witnessed the persecutions inflicted upon her noble father. When Quraysh chieftains dumped the filthy entrails of a slaughtered camel on the Prophet's back as he prostrated at the Ka'bah, it was young Fatima who ran out weeping, courageously pushing the filth away and rebuking the tyrants.

Because of her profound tenderness and maternal care for the Prophet ﷺ after Khadijah's passing, she was bestowed the honorific title 'Umm Abiha' (The Mother of her Father). Whenever she entered the room, the Messenger of Allah ﷺ would stand up in honor, take her hand, kiss it, and seat her in his own place.

She married Hazrat Ali ibn Abi Talib (RA) in a marriage of sublime simplicity and ascetic contentment, grinding flour with her own hands until her palms blistered. She is the mother of the noble leaders of the youth of Paradise, Imam Hasan and Imam Hussain (RA). The Prophet ﷺ declared: "Fatima is a part of me; whoever pleases her pleases me, and whoever angers her angers me."`,
    keyEvents: [
      "Protected her father ﷺ in Mecca during hostile pagan attacks",
      "Married Hazrat Ali (RA) in exemplary Islamic simplicity",
      "Mother of Sayyiduna Hasan and Sayyiduna Hussain (RA)",
      "Named by the Prophet ﷺ as one of the four greatest women of all creation",
      "Passed away shortly after her father ﷺ and was reunited with him in eternity"
    ],
    audios: [
      {
        title: "Bibi Fatima az-Zahra (RA) - Virtues & Character",
        speaker: "Dr. Israr Ahmed (رحمه الله)",
        audioUrl: "https://archive.org/download/seeratunnabi_bydrisrarahmad_audio/Seerat_lec_4_dr_israr.mp3",
        durationFormatted: "46:30"
      }
    ],
    videos: [
      {
        title: "The Pure Life of Fatima az-Zahra (RA)",
        speaker: "Ahl al-Bayt Series",
        youtubeQuery: "Bibi Fatima az Zahra Dr Israr Ahmed bayan",
        durationFormatted: "41:15"
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
    virtuesHadith: [
      "«فَاطِمَةُ بَضْعَةٌ مِنِّي، فَمَنْ أَغْضَبَهَا أَغْضَبَنِي» (صحيح البخاري)",
      "«يَا فَاطِمَةُ، أَمَا تَرْضَيْنَ أَنْ تَكُونِي سَيِّدَةَ نِسَاءِ أَهْلِ الْجَنَّةِ» (متفق عليه)"
    ]
  },

  // 5. HAZRAT KHALID IBN AL-WALID (RA)
  {
    id: 'khalid-ibn-al-walid',
    nameEnglish: "Hazrat Khalid ibn al-Walid (RA)",
    nameUrdu: "حضرت خالد بن ولید رضی اللہ عنہ",
    arabicName: "خَالِدُ بْنُ الْوَلِيدِ رَضِيَ اللَّهُ عَنْهُ",
    category: 'sahaba',
    roleOrTitle: "Sayfullah (The Unsheathed Sword of Allah), Military Genius",
    urduTitle: "سیف اللہ، عظیم عسکری قائد، سو سے زائد معرکوں کے فاتح",
    shortBio: "Undefeated military genius of world history who fought in over 100 battles against the Byzantine and Persian Empires, never once tasting defeat.",
    urduBio: "وہ بے مثال جرنیل جنہیں رسول اللہ ﷺ نے 'سیف اللہ' کا لقب عطا فرمایا، اور جنہوں نے ہر میدان میں کلمۂ حق بلند کیا۔",
    fullStory: `Hazrat Khalid ibn al-Walid (RA) is acknowledged by global military historians as one of the greatest tactical and strategic minds ever to walk the earth. After embracing Islam shortly before the conquest of Mecca, he dedicated every ounce of his brilliance to the defense and propagation of Islam.

At the Battle of Mu'tah in 8 AH, when three consecutive Muslim commanders (Zayd ibn Harithah, Ja'far ibn Abi Talib, and Abdullah ibn Rawahah) were martyred facing an overwhelming Byzantine force, Khalid took up the banner. He broke nine swords in his hand while masterminding an audacious tactical withdrawal that saved the Muslim army. Upon hearing the news in Medina, the Prophet ﷺ titled him: "Sayfullah (The Sword of Allah)."

Under Caliph Abu Bakr (RA), Khalid unified Arabia during the Ridda Wars, marched into Iraq, crossed the waterless desert of Samawa in an epic maneuver that shocked the Byzantine legions, and led the Muslims to decisive victory at the Battle of Yarmouk. When Caliph Umar (RA) later relieved him of supreme command to ensure the people's trust was placed in Allah and not in Khalid's military prowess, Khalid submitted with unmatched humility: "I fight for the Lord of Umar, not for Umar." He died peacefully in his bed in Homs, weeping that every inch of his body bore a scar of sword or spear, yet he died in bed rather than as a battlefield martyr.`,
    keyEvents: [
      "Broke nine swords at the Battle of Mu'tah and received the title 'Sayfullah'",
      "Led the bloodless entry into Mecca during the conquest",
      "Unified Arabia during the Ridda conflicts under Abu Bakr (RA)",
      "Architect of the stunning victory at Yarmouk against the Roman Empire",
      "Exemplified supreme obedience when stepping down as supreme general under Umar (RA)"
    ],
    audios: [
      {
        title: "Hazrat Khalid bin Walid (RA) - The Sword of Allah",
        speaker: "Dr. Israr Ahmed (رحمه الله)",
        audioUrl: "https://archive.org/download/seeratunnabi_bydrisrarahmad_audio/Seerat_lec_5_dr_israr.mp3",
        durationFormatted: "58:00"
      }
    ],
    videos: [
      {
        title: "The Military Genius of Khalid ibn al-Walid",
        speaker: "Heroes of Islam Series",
        youtubeQuery: "Khalid bin Waleed Dr Israr Ahmed Yarmouk",
        durationFormatted: "50:20"
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    virtuesHadith: [
      "«نِعْمَ عَبْدُ اللَّهِ خَالِدُ بْنُ الْوَلِيدِ، سَيْفٌ مِنْ سُيُوفِ اللَّهِ» (جامع الترمذي)"
    ]
  },

  // 6. BIBI NUSAYBAH BINT KA'B (UMM UMARAH RA)
  {
    id: 'bibi-nusaybah',
    nameEnglish: "Bibi Nusaybah bint Ka'b - Umm Umarah (RA)",
    nameUrdu: "حضرت ام عمارہ نصیبہ بنت کعب رضی اللہ عنہا",
    arabicName: "نُسَيْبَةُ بِنْتُ كَعْبٍ (أُمُّ عُمَارَةَ) رَضِيَ اللَّهُ عَنْهَا",
    category: 'bibi',
    roleOrTitle: "The Heroic Protector of the Prophet ﷺ at Uhud",
    urduTitle: "احد کی عظیم جانباز، رسول اللہ ﷺ کی جان نثار مجاہدہ",
    shortBio: "The fearless Ansari woman who took up sword and bow at Uhud when the Prophet ﷺ was surrounded, shielding his sacred body and taking twelve wounds.",
    urduBio: "وہ بہادر صحابیہ جنہوں نے غزوۂ احد میں رسول اللہ ﷺ کے گرد تلوار لے کر پہرہ دیا اور درجن بھر زخم اپنے بدن پر سہے مگر پیچھے نہ ہٹیں۔",
    fullStory: `Bibi Nusaybah (RA), of the Banu Najjar clan of Medina, was among the very first women of the Ansar to pledge allegiance to the Prophet ﷺ at the Second Pledge of Aqabah.

At the Battle of Uhud, she initially set out with water skins to tend the wounded. However, when the archers abandoned their posts and the Muslim line was broken, the Prophet ﷺ was surrounded by enemy horsemen intent on killing him. Seeing the mortal danger, Nusaybah cast aside her water skin, unsheathed a sword, took a bow, and charged into the frontline.

Together with her husband and two sons, she formed a human wall around the Messenger of Allah ﷺ. She engaged enemy horsemen head-on, striking them down and intercepting sword blows meant for the Prophet. The Prophet ﷺ later recounted: "Wherever I turned, left or right on the day of Uhud, I saw Umm Umarah fighting to defend me!"

She received twelve wounds that day, including a deep gash on her neck inflicted by the pagan horseman Ibn Qami'ah. Yet she bandage-wrapped her wounded son and ordered him back into the fight: "Rise, my son, and strike the people!" She lived to fight at the Battle of Yamama against Musaylimah the Liar, where she lost her hand but celebrated the victory of Islam.`,
    keyEvents: [
      "Pledged allegiance at the Second Pledge of Aqabah",
      "Fought with sword and shield directly defending the Prophet ﷺ at Uhud",
      "Endured twelve deep battlefield wounds protecting the Messenger of Allah",
      "Prophetic testimony: 'Wherever I turned, left or right, I saw Umm Umarah fighting for me'",
      "Fought courageously at the Battle of Yamama in her elder years"
    ],
    audios: [
      {
        title: "Bibi Nusaybah (RA) - The Woman Warrior of Uhud",
        speaker: "Stories of the Sahabiyat",
        audioUrl: "https://archive.org/download/seeratunnabi_bydrisrarahmad_audio/Seerat_lec_1_dr_israr.mp3",
        durationFormatted: "35:10"
      }
    ],
    videos: [
      {
        title: "Umm Umarah: The Heroine of Uhud",
        speaker: "Sahabiyat Series",
        youtubeQuery: "Umm Umarah Nusaybah bint Kaab Uhud",
        durationFormatted: "28:30"
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
    virtuesHadith: [
      "قَالَ رَسُولُ اللَّهِ ﷺ: «مَا الْتَفَتُّ يَوْمَ أُحُدٍ يَمِينًا وَلَا شِمَالًا إِلَّا وَأَنَا أَرَاهَا تُقَاتِلُ دُونِي»"
    ]
  },

  // 7. HAZRAT BILAL IBN RABAH (RA)
  {
    id: 'bilal-ibn-rabah',
    nameEnglish: "Hazrat Bilal ibn Rabah (RA)",
    nameUrdu: "حضرت بلال بن رباح رضی اللہ عنہ",
    arabicName: "بِلَالُ بْنُ رَبَاحٍ رَضِيَ اللَّهُ عَنْهُ",
    category: 'sahaba',
    roleOrTitle: "The Mu'adh-dhin of the Prophet ﷺ, Symbol of Steadfastness",
    urduTitle: "موذنِ رسول ﷺ، صبر و استقامت کا ہمالہ، احد احد کی صدا",
    shortBio: "The Ethiopian slave tortured under the desert sun of Mecca whose cries of 'Ahad, Ahad' (One, One) dismantled tyranny; chosen to deliver the first Adhan from atop the Ka'bah.",
    urduBio: "وہ عظیم صحابی جن کے پائے استقلال کو مکے کے دہکتے ہوئے انگارے اور پتھر بھی متزلزل نہ کر سکے، اور کعبے کی چھت سے پہلی اذان دی۔",
    fullStory: `Hazrat Bilal ibn Rabah (RA) was born into slavery in Mecca to an Abyssinian mother. When the light of Islam illuminated his heart, he accepted the faith with unshakeable conviction. His master, Umayyah ibn Khalaf, subjected him to unspeakable tortures: dragging him through the burning desert gravel, placing massive red-hot boulders upon his chest at noon, and denying him water.

Under that suffocating weight, with his lips parched and skin blistering, Bilal uttered the immortal words that shook Mecca's pagan order: "Ahad! Ahad! (One! One God!)"
He was purchased and freed by Hazrat Abu Bakr (RA), prompting Umar (RA) to famously say: "Abu Bakr is our master, and he freed our master [Bilal]!"

When the Adhan was instituted in Medina, the Prophet ﷺ chose Bilal for his resonant, melodious voice. On the day Mecca was conquered, the Prophet ordered Bilal to climb atop the holy Ka'bah and call the Adhan, shattering centuries of tribal racism and pagan idol worship. After the passing of the Prophet ﷺ, Bilal's grief was so profound that he could no longer bear to call the Adhan in Medina, only delivering it once more upon visiting Damascus, reducing the entire army of Sahaba to uncontrollable tears.`,
    keyEvents: [
      "Steadfast under torture with the cry of 'Ahad! Ahad!'",
      "Purchased and liberated by Hazrat Abu Bakr as-Siddiq (RA)",
      "Appointed the first official Mu'adh-dhin in Islamic history",
      "Called the historic Adhan from the roof of the Ka'bah during the Conquest of Mecca",
      "The tearful final Adhan in Damascus after the Prophet's passing"
    ],
    audios: [
      {
        title: "Hazrat Bilal Habashi (RA) - The Voice of Tawheed",
        speaker: "Dr. Israr Ahmed (رحمه الله)",
        audioUrl: "https://archive.org/download/seeratunnabi_bydrisrarahmad_audio/Seerat_lec_2_dr_israr.mp3",
        durationFormatted: "47:20"
      }
    ],
    videos: [
      {
        title: "The Inspiring Life of Bilal ibn Rabah (RA)",
        speaker: "Prophetic Companions",
        youtubeQuery: "Hazrat Bilal Habashi Dr Israr Ahmed bayan",
        durationFormatted: "39:50"
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    virtuesHadith: [
      "«يَا بِلَالُ، حَدِّثْنِي بِأَرْجَى عَمَلٍ عَمِلْتَهُ فِي الْإِسْلَامِ، فَإِنِّي سَمِعْتُ دَفَّ نَعْلَيْكَ بَيْنَ يَدَيَّ فِي الْجَنَّةِ» (متفق عليه)"
    ]
  },

  // 8. BIBI ASMA BINT ABI BAKR (RA)
  {
    id: 'bibi-asma',
    nameEnglish: "Bibi Asma bint Abi Bakr (RA)",
    nameUrdu: "حضرت اسماء بنت ابی بکر رضی اللہ عنہا",
    arabicName: "أَسْمَاءُ بِنْتُ أَبِي بَكْرٍ (ذَاتُ النِّطَاقَيْنِ) رَضِيَ اللَّهُ عَنْهَا",
    category: 'bibi',
    roleOrTitle: "Dhat an-Nitaqayn (She of the Two Waistbands), Heroine of the Hijrah",
    urduTitle: "ذات النطاقین، ہجرتِ نبوی کی محافظ، عبداللہ بن زبیر کی عظیم والدہ",
    shortBio: "Daughter of Abu Bakr, elder sister of Aisha, who split her waistband in two to tie provisions for the Prophet ﷺ in Cave Thawr, and whose steadfast courage inspired her son Abdullah ibn al-Zubayr.",
    urduBio: "غارِ ثور میں کھانا پہنچانے والی ذات النطاقین، جنہوں نے ابو جہل کے تھپڑ کھائے مگر راز فاش نہ کیا، اور سو سال کی عمر میں بھی عزم و ہمت کا پہاڑ رہیں۔",
    fullStory: `Bibi Asma (RA) is immortalized in Islamic history as 'Dhat an-Nitaqayn' (She of the Two Girdles). During the perilous Secret Hijrah (migration) of the Prophet ﷺ and Abu Bakr (RA), it was young Asma who smuggled food and water across dangerous mountain terrain at night to the Cave of Thawr.

When preparing their travel bags, she found nothing with which to tie the water skin and food parcels. She took off her personal waistband (Nitaq), tore it into two halves, and tied the provisions. The Prophet ﷺ smiled and prayed: "May Allah replace your waistband with two waistbands in Paradise!"

When the furious tyrant Abu Jahl banged on her house door demanding the whereabouts of her father, Asma refused to speak. Abu Jahl struck her face so violently that her earring flew off, but she did not betray the secret. 
Decades later, in her late nineties when she had lost her sight, her son Abdullah ibn al-Zubayr (RA) was besieged in Mecca by the tyrannical Umayyad general Al-Hajjaj ibn Yusuf. When Abdullah asked whether he should surrender to save his life, his blind, courageous mother embraced him, felt his coat of mail, and proclaimed: "If you are upon the Truth, die with honor! A strike with a sword in dignity is far better than a lash of a whip in humiliation!" She lived for 100 years without losing a single tooth or her sharp mind.`,
    keyEvents: [
      "Heroine of the Hijrah: Supplied the Cave of Thawr secretly",
      "Earned the title 'Dhat an-Nitaqayn' from the Messenger of Allah ﷺ",
      "Defied Abu Jahl's physical assault without revealing the Prophet's location",
      "Mother of Abdullah ibn al-Zubayr, the first Muslim child born in Medina after Hijrah",
      "Legendary maternal counsel to her son against the tyranny of Al-Hajjaj"
    ],
    audios: [
      {
        title: "Bibi Asma bint Abi Bakr - Courage & Principle",
        speaker: "Stories of Sahabiyat",
        audioUrl: "https://archive.org/download/seeratunnabi_bydrisrarahmad_audio/Seerat_lec_3_dr_israr.mp3",
        durationFormatted: "36:40"
      }
    ],
    videos: [
      {
        title: "Dhat an-Nitaqayn: The Story of Asma bint Abi Bakr",
        speaker: "Islamic Biographies",
        youtubeQuery: "Asma bint Abi Bakr Dr Israr Ahmed Dhat an Nitaqayn",
        durationFormatted: "31:20"
      }
    ],
    featuredImage: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
    virtuesHadith: [
      "قَالَ لَهَا النَّبِيُّ ﷺ: «أَبْدَلَكِ اللَّهُ بِنِطَاقِكِ هَذَا نِطَاقَيْنِ فِي الْجَنَّةِ»"
    ]
  }
];

export function getSahabaByCategory(category: string): SahabaItem[] {
  if (category === 'all') return SAHABA_AND_BIBIS_DATA;
  if (category === 'historical_study') return SAHABA_AND_BIBIS_DATA.filter(item => item.isSpecialStudy);
  return SAHABA_AND_BIBIS_DATA.filter(item => item.category === category);
}

export function searchSahaba(query: string): SahabaItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return SAHABA_AND_BIBIS_DATA;
  return SAHABA_AND_BIBIS_DATA.filter(item =>
    item.nameEnglish.toLowerCase().includes(q) ||
    item.nameUrdu.includes(q) ||
    item.arabicName.includes(q) ||
    item.roleOrTitle.toLowerCase().includes(q) ||
    item.urduTitle.includes(q) ||
    item.shortBio.toLowerCase().includes(q) ||
    item.keyEvents.some(ev => ev.toLowerCase().includes(q))
  );
}
