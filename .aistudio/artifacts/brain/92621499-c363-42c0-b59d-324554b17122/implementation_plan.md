# Implementation Plan: Dr. Israr Ahmed Complete Bayan-ul-Quran & Tafseer Restoration

## Problem Diagnosis
The user reported that Dr. Israr Ahmed's bayans were not working. Investigation revealed:
1. `src/data/israrBayansCatalog.ts` only had 10 hardcoded items for Bayan-ul-Quran instead of all 114 Surahs.
2. Hardcoded URLs for other lecture series pointed to a non-existent `ia800305...` path, causing 404/network errors.
3. Video watch modal lacked playlist support and fell back to an unrelated video ID (`Cuqbrwzcy-s`) when queries were supplied.
4. The user wanted complete Tafseer-ul-Quran (all 114 Surahs and 30 Paras) with direct, working audio and video streams.

## Changes Implemented
1. **Catalog Overhaul (`src/data/israrBayansCatalog.ts`)**:
   - Programmatically generated all 114 Surahs for Dr. Israr Ahmed's complete Bayan-ul-Quran.
   - Linked each Surah to its verified Internet Archive audio filename (`BayanUlQuranByDr.IsrarAhmed_201707`), Surah number, English name, Urdu title, Makki/Madani classification, total verses, and Juz/Parah number (1-30).
   - Replaced broken lecture URLs in *Muntakhab Nisab*, *Seerat-un-Nabi*, *Khilafat*, and *Ramadan Reminders* with verified, working audio streams from `MuntakhabNisabHD`, `dr-israr-ahmad-bayan`, and `SeraatUnNabiPbuh9OriYoutube` (returning HTTP 200 OK).
   - Extended filtering capabilities: live search across all 114 Surahs, filter by Parah (Juz 1 to 30), and filter by Makki vs Madani.

2. **Multi-Mirror Audio Resilience (`src/data/drIsrarAudioMap.ts`)**:
   - Configured redundant audio sources for every Surah (Primary edge archive + secondary mirror collection `002ALBAQARAH_201411` + direct CDN edge `ia801602.us.archive.org`).
   - Enabled seamless failover if an ISP or network route encounters temporary delays.

3. **Multi-Mode Media Deck (`src/components/DrIsrarPlayerView.tsx`)**:
   - **Audio Bayan**: Direct playback controls, seek bar, time display, -15s/+15s skip, speed adjustment (0.75x, 1x, 1.25x, 1.5x), offline PWA caching, and manual mirror switcher.
   - **Video Bayan**: Embedded player for Dr. Israr's lectures, full-screen player toggle, official 108-part YouTube playlist link (`PL1AxSN8ZUgxgYFsPXIB8ptv4-fNktGAVv`), and search queries.
   - **Written Tafseer (تفسیر بیان القرآن)**: Integrated Dr. Israr Ahmed's authentic written verse-by-verse Urdu commentary with an Ayah selector and copy tool.

4. **Video Watch Modal Enhancement (`src/components/UnifiedVideoWatchModal.tsx`)**:
   - Added support for YouTube playlist IDs (`list=...`) alongside direct video IDs.
   - Replaced generic fallback with Dr. Israr Ahmed's official lecture series.

5. **PWA & Android Integrity**:
   - Maintained all PWA offline files, icons, service worker cache configurations, and mobile touch targets.
