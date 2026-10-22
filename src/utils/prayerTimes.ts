export interface PrayerTimeSchedule {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  cityName: string;
}

export interface CityOption {
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezoneOffset: number; // in hours from UTC
}

export const POPULAR_CITIES: CityOption[] = [
  { name: 'Mecca', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, timezoneOffset: 3 },
  { name: 'Medina', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692, timezoneOffset: 3 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezoneOffset: 0 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezoneOffset: -5 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, timezoneOffset: 2 },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, timezoneOffset: 5 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, timezoneOffset: 7 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, timezoneOffset: 3 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708, timezoneOffset: 4 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, timezoneOffset: -5 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, timezoneOffset: 11 },
];

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function formatTime(hoursFloat: number): string {
  let totalMinutes = Math.round(hoursFloat * 60);
  totalMinutes = (totalMinutes + 1440) % 1440;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Convert "06:15 AM" or "09:30 PM" to minutes from midnight
export function timeStringToMinutes(timeStr: string): number {
  const parts = timeStr.trim().split(/[:\s]+/);
  if (parts.length < 2) return 0;
  let hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const period = (parts[2] || '').toUpperCase();

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

// Add minutes to a time string like "05:15 AM" + 15 -> "05:30 AM"
export function addMinutesToTimeString(timeStr: string, addedMinutes: number): string {
  const currentTotal = timeStringToMinutes(timeStr);
  const newTotal = (currentTotal + addedMinutes + 1440) % 1440;
  const hours = Math.floor(newTotal / 60);
  const minutes = newTotal % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Calculate prayer times for date and location using standard Muslim World League parameters
export function calculatePrayerTimes(city: CityOption, date: Date = new Date()): PrayerTimeSchedule {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );

  // Solar declination & equation of time
  const B = (360 / 365) * (dayOfYear - 81);
  const eot = 9.87 * Math.sin(toRadians(2 * B)) - 7.53 * Math.cos(toRadians(B)) - 1.5 * Math.sin(toRadians(B));
  const declination = 23.45 * Math.sin(toRadians((360 / 365) * (dayOfYear - 81)));

  // Solar noon
  const timezone = city.timezoneOffset;
  const solarNoon = 12 + timezone - city.lng / 15 - eot / 60;

  const latRad = toRadians(city.lat);
  const decRad = toRadians(declination);

  // Fajr (-18 degrees)
  const fajrAngle = -18;
  const cosFajr =
    (Math.sin(toRadians(fajrAngle)) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));
  const fajrDiff = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosFajr)))) / 15;
  const fajrTime = solarNoon - fajrDiff;

  // Sunrise (-0.833 degrees)
  const sunAngle = -0.833;
  const cosSun =
    (Math.sin(toRadians(sunAngle)) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));
  const sunDiff = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosSun)))) / 15;
  const sunriseTime = solarNoon - sunDiff;

  // Dhuhr
  const dhuhrTime = solarNoon + 0.05; // 3 min buffer

  // Asr (Standard / Shafi'i: shadow length = object length + noon shadow)
  const noonShadowAngle = Math.abs(city.lat - declination);
  const asrAlt = toDegrees(Math.atan(1 / (1 + Math.tan(toRadians(noonShadowAngle)))));
  const cosAsr =
    (Math.sin(toRadians(asrAlt)) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));
  const asrDiff = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosAsr)))) / 15;
  const asrTime = solarNoon + asrDiff;

  // Maghrib (Sunset)
  const maghribTime = solarNoon + sunDiff;

  // Isha (-17 degrees)
  const ishaAngle = -17;
  const cosIsha =
    (Math.sin(toRadians(ishaAngle)) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));
  const ishaDiff = toDegrees(Math.acos(Math.max(-1, Math.min(1, cosIsha)))) / 15;
  const ishaTime = solarNoon + ishaDiff;

  return {
    fajr: formatTime(fajrTime),
    sunrise: formatTime(sunriseTime),
    dhuhr: formatTime(dhuhrTime),
    asr: formatTime(asrTime),
    maghrib: formatTime(maghribTime),
    isha: formatTime(ishaTime),
    cityName: city.name,
  };
}
