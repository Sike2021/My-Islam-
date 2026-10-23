# Complete Holy Quran (114 Surahs) Integration Plan

Integrate the entire Holy Quran (all 114 Surahs, 6,236 Ayahs) into **Sike's Perspective on Islam**, featuring a verse-by-verse reading experience with Uthmani Arabic typography, Urdu translation, English translation, Makki/Medinan revelation filters, and audio recitation by the beloved Imams of the Grand Mosque in Makkah: **Sheikh Abdul Rahman Al-Sudais** and **Sheikh Saud Al-Shuraim**.

***

### User Review & Critical Decisions

> [!IMPORTANT]
> All your confirmed preferences have been integrated:
> - **Full Quran Scope**: Complete directory of all 114 Surahs from Surah Al-Fatihah (1) to Surah An-Nas (114).
> - **Reading Layout**: Clean verse-by-verse list displaying Arabic text with diacritics, Urdu translation, English translation, and inline audio playback.
> - **Reciters**: Dual-Qari selector featuring **Sheikh Abdul Rahman Al-Sudais** and **Sheikh Saud Al-Shuraim**, with continuous play and auto-advance.
> - **Navigation & Filters**: Fast Surah directory with interactive filter tabs for **Makki (مكية)** and **Medinan (مدنية)** Surahs, plus real-time search by Surah name, number, or English meaning.

- **Confirmed Decision 1**: Complete 114 Surah directory with revelation classification (86 Makki, 28 Medinan), verse counts, and meanings.
- **Confirmed Decision 2**: Verse-by-verse layout with adjustable Arabic font sizing (`Amiri`), Tajweed end-of-verse markers (`۝`), Urdu Tarjuma, and English translation.
- **Confirmed Decision 3**: Audio recitation streaming using verified CDNs for Sheikh Al-Sudais and Sheikh Al-Shuraim with auto-scroll and active verse highlighting.
- **Confirmed Decision 4**: Local storage reading tracker ("Continue Reading" bookmark bookmarking last read Surah and Ayah).

***

### 1. Overview & Core Concept

- **What It Does**: Transforms the app into a full-fledged Quran companion alongside the authentic Duas, Hadith reflections, and Hijri calendar. Users can browse all 114 Surahs, search by name or number, filter by Makki vs. Medinan revelations, read every ayah with synchronized Urdu and English meanings, and listen to the recitations of Sheikh Abdul Rahman Al-Sudais and Sheikh Saud Al-Shuraim.
- **Target Audience & Persona**: Readers seeking a reverent, ad-free, high-legibility Mushaf companion for daily recitation, Khatam-ul-Quran (completing the Quran), or memorization (Hifz) practice on desktop or mobile.
- **Key Value**: Delivers the entire Quran with zero bloat, immediate offline metadata availability, and the sacred recitation voices of Makkah al-Mukarramah.

***

### 2. User Experience & Visual Design

#### Key User Flows
1. **Surah Directory (114 Surahs)**:
   - Header stat bar: Total 114 Surahs · 6,236 Ayahs · 30 Juz · 86 Makki · 28 Medinan.
   - Quick Search: Search by number (`"36"`), Arabic name (`"يس"`), English name (`"Yasin"`), or meaning (`"Heart"`).
   - Filter Tabs: `All (114)`, `Makki (86)`, `Medinan (28)`, and `Bookmarked Surahs`.
   - "Continue Reading" prompt showing the user's last visited Surah and Ayah.
2. **Verse-by-Verse Surah Reader**:
   - Surah Header Banner: Displays Arabic calligraphy title, English title, revelation type, ayah count, and Bismillah (`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`).
   - Font Size Adjuster: Scale Arabic typography from comfortable standard (24px) up to large mushaf size (36px).
   - Reciter Switcher: Seamless toggle between **Sheikh Abdul Rahman Al-Sudais** and **Sheikh Saud Al-Shuraim**.
   - Continuous Audio Player: Sticky bottom audio strip with Play/Pause, Next/Previous Ayah, and speed controls (`0.75x`, `1.0x`, `1.25x`).
   - Active Ayah Highlight: When audio plays, the currently recited ayah lights up with a subtle warm gold aura and smoothly scrolls into view.
   - Ayah Actions: Copy Arabic + translations, play single ayah, bookmark verse, and share.

#### Visual Identity & Theme
- **Color Palette (60-30-10 Rule)**:
  - Canvas: Obsidian emerald `#021a14` and dark forest `#032b21`.
  - Structural Surfaces: Elevated verse rows `#04271e` with hairline borders `rgba(245, 158, 11, 0.15)`.
  - Accents: Radiant warm gold `#f59e0b` and `#d97706` for Ayah end ornaments (`۝`), play buttons, and active recitation borders.
- **Typography**:
  - Arabic: `Amiri` with high-contrast Harakat and 2.4 line height.
  - Ayah Numbering: Distinctive Islamic floral circle with Arabic-Indic numerals (`۝ ۱`).
  - Translations: Clear `Plus Jakarta Sans` with unboxed metadata separators (`·`). Zero pill clutter.

***

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full 114 Surah Metadata Bundled + Dynamic Ayah Loading**
  - *Chosen Approach*: Embed the complete verified index of all 114 Surahs (names, numbers, meanings, verses count, Makki/Medinan status) directly in client memory for instant zero-latency filtering and search. Fetch full Ayah texts via high-speed, reliable open Quran data endpoints (`api.alquran.cloud` / bundled offline fallbacks) and cache every opened Surah into `localStorage` / Cache API.
  - *Why*: Instant app launch without ballooning the initial JS bundle to 20MB, while enabling full offline reading once a Surah is opened.
- **Decision 2: Audio Streaming from Verified EveryAyah CDN**
  - *Chosen Approach*: Use the standard high-fidelity audio streams for **Abdurrahmaan As-Sudais (192kbps)** and **Saood ash-Shuraym (128kbps)** from `everyayah.com` with formatted zero-padded URLs (e.g. `001001.mp3` for Surah 1 Ayah 1).
  - *Why*: Reliable, universally accessible CDN with exact verse-by-verse alignment and zero lag.
- **Decision 3: Unified Surah & Ayah Reading Position Memory**
  - *Chosen Approach*: Save current Surah and Ayah index in `localStorage` (`sike_last_read_quran`) whenever a user scrolls or plays an ayah.
  - *Why*: Believers can resume their daily recitation or Khatam journey exactly where they left off.

***

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Sike's Perspective on Islam - Quran Hub              │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼───────────────────────────┐
      ▼                            ▼                           ▼
┌───────────────┐          ┌───────────────┐           ┌───────────────┐
│ Surah Index   │          │ Filter Engine │           │ Last Read     │
│ (114 Surahs)  │          │ Makki/Medinan │           │ Tracker       │
└───────┬───────┘          └───────┬───────┘           └───────┬───────┘
        │                          │                           │
        └──────────────────────────┼───────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Surah Reader & Audio Engine                       │
│ ────────────────────────────────────────────────────────────────────── │
│ • Verse-by-verse Arabic (Amiri), Urdu Tarjuma, English meaning         │
│ • Dual-Qari Audio: Al-Sudais & Al-Shuraim (EveryAyah CDN)              │
│ • Auto-advance next ayah with active row gold illumination             │
│ • LocalStorage Surah caching for offline PWA reading                   │
└────────────────────────────────────────────────────────────────────────┘
```

#### Quran Reciter Endpoints
| Reciter Name | Audio Source CDN | Bitrate | Format |
| :--- | :--- | :--- | :--- |
| **Sheikh Abdul Rahman Al-Sudais** | `https://everyayah.com/data/Abdurrahmaan_As-Sudais_192kbps/` | 192 kbps | `SSSaaa.mp3` |
| **Sheikh Saud Al-Shuraim** | `https://everyayah.com/data/Saood_ash-Shuraym_128kbps/` | 128 kbps | `SSSaaa.mp3` |

#### Surah Navigation Taxonomy
- **86 Makki Surahs**: Classified with Meccan icon and chronological context.
- **28 Medinan Surahs**: Classified with Medinan icon and legislative context.
- **Searchable Index**: Instant fuzzy search across English name, transliterated name, Arabic title, and chapter number (1 to 114).
