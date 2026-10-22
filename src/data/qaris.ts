export interface Qari {
  id: string;
  name: string;
  arabicName: string;
  style: string;
  country: string;
  serverUrl: string; // Base URL template
  image: string;
  hasUrduVoice?: boolean;
}

export const QARIS: Qari[] = [
  {
    id: 'mishary',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري بن راشد العفاسي',
    style: 'Murattal • Clear & Melodic',
    country: 'Kuwait',
    serverUrl: 'https://server8.mp3quran.net/afs/',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'urdu-voice',
    name: 'Arabic + Urdu Voice (Shamshad Ali Khan)',
    arabicName: 'عربی تلاوت مع اردو ترجمہ آواز',
    style: 'Soulful Recitation + Spoken Urdu Translation',
    country: 'Pakistan',
    serverUrl: 'https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=400&q=80',
    hasUrduVoice: true,
  },
  {
    id: 'sudais',
    name: 'Abdur-Rahman As-Sudais',
    arabicName: 'عبد الرحمن السديس',
    style: 'Imam of Masjid Al-Haram • Reverent',
    country: 'Saudi Arabia',
    serverUrl: 'https://server11.mp3quran.net/sds/',
    image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Abdul Samad',
    arabicName: 'عبد الباسط عبد الصمد',
    style: 'Golden Era Murattal • Majestic',
    country: 'Egypt',
    serverUrl: 'https://server7.mp3quran.net/basit/',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'maher',
    name: 'Maher Al-Muaiqly',
    arabicName: 'ماهر المعيقلي',
    style: 'Imam of Masjid Al-Haram • Emotional',
    country: 'Saudi Arabia',
    serverUrl: 'https://server12.mp3quran.net/maher/',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'ghamdi',
    name: 'Saad Al-Ghamdi',
    arabicName: 'سعد الغامدی',
    style: 'Smooth & Calming',
    country: 'Saudi Arabia',
    serverUrl: 'https://server7.mp3quran.net/ghamdi/',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'shatri',
    name: 'Abu Bakr Al-Shatri',
    arabicName: 'أبو بكر الشاطري',
    style: 'Deep & Reflective',
    country: 'Saudi Arabia',
    serverUrl: 'https://server11.mp3quran.net/shatri/',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
  },
];

// Helper to format surah and ayah with leading zeros (001, 002, ..., 114)
export function padSurahNumber(num: number): string {
  return num.toString().padStart(3, '0');
}

export function padAyahNumber(num: number): string {
  return num.toString().padStart(3, '0');
}

// Generate direct streaming URL for a specific Qari and Surah
export function getSurahAudioUrl(qari: Qari, surahNumber: number): string {
  const padded = padSurahNumber(surahNumber);
  if (qari.id === 'urdu-voice') {
    // For full surah, fallback to Mishary
    return `https://server8.mp3quran.net/afs/${padded}.mp3`;
  }
  return `${qari.serverUrl}${padded}.mp3`;
}

// Direct URL for individual Ayah Arabic audio
export function getAyahArabicAudioUrl(surahNumber: number, ayahNumber: number): string {
  const s = padSurahNumber(surahNumber);
  const a = padAyahNumber(ayahNumber);
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
}

// Direct URL for individual Ayah Urdu translation audio (by Shamshad Ali Khan)
export function getAyahUrduAudioUrl(surahNumber: number, ayahNumber: number): string {
  const s = padSurahNumber(surahNumber);
  const a = padAyahNumber(ayahNumber);
  return `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/${s}${a}.mp3`;
}
