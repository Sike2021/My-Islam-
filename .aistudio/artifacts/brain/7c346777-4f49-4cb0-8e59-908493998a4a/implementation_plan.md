# Comprehensive Link Audit & Multi-Source Audio-Video Architecture

Audit and rebuild all audio and video mappings across Dr. Israr Ahmed Bayan-ul-Quran and all 115+ Islamic Stories to eliminate duplicate, placeholder, or copied links, ensure zero stories play Quran recitation, establish multi-source audio failover (3-4 sources per item), and link verified unique full-length documentaries.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following foundational decisions:
> 1. **Ulama Focus**: Focus exclusively on **Dr. Israr Ahmed (RA) Complete Quran Bayanat** (114 Surahs + thematic revival discourses).
> 2. **Video Strategy**: Prioritize **HASI TV (Haseeb Shafqat)** documentaries where available, combined with distinct authentic Islamic scholarly lectures (zero 60-second shorts; 100% full-length documentaries).
> 3. **Audio Strategy**: Implement **at least 3 to 4 multi-source audio links** for every item to eliminate playback errors, with hardcoded guards ensuring no story ever falls back to Quran recitation.

---

## 1. Overview & Core Concept

### What It Does
- **Deduplication & Verification**: Scans every entry in the database (Bayanat and 115+ Islamic Stories) to verify that each has a **distinct, unique video link and title**—removing any copy-pasted or shared YouTube IDs.
- **Dr. Israr Ahmed Complete Bayan-ul-Quran**: Curates all 114 Surahs with unique Archive.org audio streams, exact Surah timestamps, and verified Dr. Israr video IDs/queries.
- **HASI TV & Scholarly Documentaries for Stories**: Maps each of the 115+ stories (Prophets, Sahaba, Bibis, Historic Events) to distinct full-length documentaries primarily from HASI TV, Islamic Origins, and authentic scholarly archives.
- **4-Layer Resilient Audio Pipeline**: Every story features a 4-tier audio failover:
  1. *Primary Authentic Urdu Audio Stream* (Archive.org / Islamic Audio CDN)
  2. *Secondary Mirror Audio Stream*
  3. *In-Browser Native Urdu Speech Synthesis* (Full Urdu multi-paragraph narrative)
  4. *In-Browser Native English Speech Synthesis* (Full English narrative)
- **Strict Content Isolation**: Quran recitation (Mishary Alafasy / Miraj-ul-Din Khan) remains exclusively in the Holy Quran section; story players and bayanat players are isolated with validation checks preventing Quran MP3s from playing.

### Target Audience & Persona
Muslims, students of Islamic history, and Urdu/English listeners seeking authentic, uninterrupted, full-length scholarly documentaries and bayanat with zero broken links or repetitive placeholders.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Stories Library (`SahabaAndBibisView.tsx`)**:
   - User browses Prophets, Sahaba, Bibis, or Historic Events.
   - Clicking **"Watch Documentary"** launches the embedded player with that story's *distinct* full-length documentary (e.g., HASI TV for Karbala, Hazrat Umar, Khalid bin Waleed, Mus'ab bin Umair, etc.).
   - A direct **"Open on YouTube"** button enables viewing on the official YouTube app in full 1080p.
   - Clicking **"Listen Story Audio"** seamlessly tries Source 1 -> Source 2 -> Native Urdu Voice, guaranteeing audio never fails or plays Quran.
   - Clicking **"Read Story"** opens the modal with the language selector (Full Urdu, Full English, Both) and out-loud speech controls.
2. **Dr. Israr Ahmed Bayan-ul-Quran Hub (`IsrarBayanView.tsx` / `UlamaLecturesView.tsx`)**:
   - Filter by Juz or Surah (1 to 114).
   - Each Surah plays its distinct Dr. Israr Bayan audio from Archive.org with verified duration.
   - Watch distinct Dr. Israr video lectures with zero shared IDs.

### Visual Identity & Theme
- **Theme**: Deep Islamic Emerald (`emerald-950`), Radiant Gold/Amber (`amber-400`, `amber-300`), and Subtle Warm Borders (`emerald-800/60`).
- **Typography**: Nastaliq Arabic/Urdu typography (`font-arabic`), crisp legible English headings (`font-display`), and clean unboxed metadata with subtle dot separators (`·`).
- **Interactive Feedback**: Source-switching indicators, active playing status in the Unified Player, and instant failover without UI freezing.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Dedicated Multi-Source Data Structure (`audioSources: string[]`)
- *Chosen Approach*: Replace single `audioUrl: string` with an array of at least 3-4 sources: `audioSources: [source1, source2, ...]` plus built-in fallback to the full written Urdu/English speech synthesis.
- *Why*: Ensures 100% uptime even if a remote audio CDN or Archive.org mirror experiences rate-limiting.
- *Alternatives Considered*: Single link with fallback to a single uploaded MP3; rejected because the user explicitly asked for distinct multi-source links with no copied files.

### Decision 2: 100% Unique YouTube Documentaries (Zero Duplicates)
- *Chosen Approach*: Build a strict duplicate-detection validator in `islamicStoriesVideoMap.ts` ensuring no two stories share the exact same `youtubeId`, except where explicitly part of a multi-episode documentary arc.
- *Why*: Eliminates user frustration when clicking different stories and seeing the same video.

### Decision 3: Dr. Israr Ahmed Single-Scholar Focus in Bayanat
- *Chosen Approach*: Streamline the Ulama/Bayanat tab to focus entirely on Dr. Israr Ahmed's authentic 114 Surahs Bayan-ul-Quran and Muntakhab Nisab, eliminating mixed or copied entries.
- *Why*: Direct user choice from Turn 1 clarifying questions.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        UNIFIED MASTER PLAYER                           │
│     (Strict Content Guards: Quran vs. Dr. Israr vs. Islamic Stories)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌───────────────────────────────┐         ┌──────────────────────────────┐
│ DR. ISRAR AHMED BAYANAT       │         │ 115+ ISLAMIC STORIES         │
│ - 114 Surahs Complete Quran   │         │ - HASI TV & Scholar Docs     │
│ - Verified Archive.org Audios │         │ - 100% Unique Video IDs      │
│ - Unique Video & Search Links │         │ - 4 Multi-Source Audio Links │
└───────────────────────────────┘         │ - Full Urdu & English Texts  │
                                          └──────────────┬───────────────┘
                                                         │
                                  ┌──────────────────────┴──────────────────────┐
                                  ▼                                             ▼
                      ┌───────────────────────┐                     ┌───────────────────────┐
                      │ PRIMARY / MIRROR CDNS │                     │ NATIVE WEB SPEECH     │
                      │ 1. Archive Audio Link │                     │ 3. Urdu Full Voice    │
                      │ 2. Mirror Audio Link  │                     │ 4. English Full Voice │
                      └───────────────────────┘                     └───────────────────────┘
```

### File Modification Plan
1. **`src/data/islamicStoriesVideoMap.ts`**:
   - Audit and populate 100% unique, distinct YouTube documentary links for all stories.
   - Enforce distinct HASI TV and authentic scholarly documentaries (no repeated IDs across different subjects).
2. **`src/data/islamicStoriesData.ts` & `src/data/islamicStoriesCatalog.ts`**:
   - Add multi-source audio array `audioSources: string[]` (minimum 3 links + speech fallback).
   - Verify every story has rich `urduFullStory` and `fullStory`.
3. **`src/data/drIsrarAudioMap.ts` & `src/data/israrBayansCatalog.ts`**:
   - Verify all 114 Surahs have genuine Dr. Israr audio files and distinct YouTube video links.
4. **`src/context/UnifiedPlayerContext.tsx`**:
   - Implement resilient multi-source audio loader with automatic failover to the next source on error.
   - Maintain absolute barrier preventing Quran recitation from playing for stories.
5. **`src/components/UnifiedVideoWatchModal.tsx` & `src/components/SahabaAndBibisView.tsx`**:
   - Ensure watch buttons load the unique video ID for each story.
   - Provide direct YouTube external buttons.
   - Verify compilation and zero lint errors.
