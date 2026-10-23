import { Player, Ground, FormatSettings, Match } from './types'; // Import Match type for initialFixtures structure

// --- PLAYER DATABASE ---
export const ALL_PLAYERS: Omit<Player, 'id' | 'isForeign'>[] = [
    // --- KINGS ---
    { name: 'A. Haddin', bat: 65, skill: 56, role: 'ar', style: 'A', nationality: 'Australia', age: 35, fielding: 78, stamina: 88, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'S. Warner', bat: 76, skill: 33, role: 'bt', style: 'a', nationality: 'Australia', isOpener: true, age: 34, fielding: 77, stamina: 84, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'N. Colin', bat: 70, skill: 61, role: 'ar', style: 'n', nationality: 'New Zealand', age: 29, fielding: 75, stamina: 83, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'M. Imran', bat: 68, skill: 60, role: 'wk', style: 'A', nationality: 'Pakistan', age: 27, fielding: 80, stamina: 82, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'I. Javed', bat: 84, skill: 85, role: 'wk', style: 'NA', nationality: 'Pakistan', isOpener: true, age: 27, fielding: 88, stamina: 90, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Nasir', bat: 81, skill: 48, role: 'bt', style: 'NA', nationality: 'Pakistan', isOpener: true, age: 31, fielding: 78, stamina: 88, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Husnain', bat: 72, skill: 22, role: 'bt', style: 'A', nationality: 'Pakistan', age: 24, fielding: 72, stamina: 82, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Jahid', bat: 61, skill: 22, role: 'bt', style: 'A', nationality: 'Pakistan', age: 27, fielding: 65, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'M. Musa', bat: 72, skill: 8, role: 'bt', style: 'A', nationality: 'Pakistan', age: 25, fielding: 72, stamina: 82, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Amir', bat: 81, skill: 85, role: 'ar', style: 'NA', nationality: 'Pakistan', age: 29, fielding: 82, stamina: 92, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Mansoor', bat: 55, skill: 65, role: 'ar', style: 'N', nationality: 'Pakistan', age: 31, fielding: 68, stamina: 83, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Zia', bat: 23, skill: 72, role: 'bl', style: 'N', nationality: 'Pakistan', age: 27, fielding: 63, stamina: 82, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Rizwan', bat: 22, skill: 70, role: 'bl', style: 'N', nationality: 'Pakistan', age: 28, fielding: 61, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Naseem', bat: 22, skill: 81, role: 'bl', style: 'D', nationality: 'Pakistan', age: 21, fielding: 66, stamina: 88, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Farhan (BL)', bat: 24, skill: 80, role: 'bl', style: 'N', nationality: 'Pakistan', age: 27, fielding: 66, stamina: 87, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Rahat', bat: 12, skill: 59, role: 'sb', style: 'NA', nationality: 'Pakistan', age: 23, fielding: 55, stamina: 68, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Mehrab', bat: 16, skill: 62, role: 'sb', style: 'D', nationality: 'Pakistan', age: 24, fielding: 59, stamina: 71, battingStyle: 'Right-hand', bowlingType: 'Spin' },

    // --- STARS ---
    { name: 'Sprike', bat: 80, skill: 0, role: 'wk', style: 'a', nationality: 'New Zealand', isOpener: true, age: 28, fielding: 88, stamina: 86, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'C. Dhanushka', bat: 45, skill: 66, role: 'ar', style: 'd', nationality: 'Sri Lanka', age: 31, fielding: 70, stamina: 80, battingStyle: 'Left-hand', bowlingType: 'Medium' },
    { name: 'Jordan', bat: 23, skill: 66, role: 'bl', style: 'n', nationality: 'West Indies', age: 27, fielding: 63, stamina: 88, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'S. Khan', bat: 75, skill: 87, role: 'wk', style: 'D', nationality: 'Pakistan', isOpener: true, age: 31, fielding: 90, stamina: 88, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Haseebullah', bat: 72, skill: 78, role: 'wk', style: 'NA', nationality: 'Pakistan', isOpener: true, age: 22, fielding: 85, stamina: 86, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Haider', bat: 62, skill: 25, role: 'bt', style: 'N', nationality: 'Pakistan', isOpener: true, age: 23, fielding: 66, stamina: 76, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Aslam', bat: 71, skill: 12, role: 'bt', style: 'D', nationality: 'Pakistan', age: 29, fielding: 70, stamina: 80, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Shoaib Khan', bat: 56, skill: 25, role: 'bt', style: 'D', nationality: 'Pakistan', age: 31, fielding: 63, stamina: 73, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'A. Jamal', bat: 59, skill: 0, role: 'bt', style: 'A', nationality: 'Pakistan', age: 23, fielding: 64, stamina: 74, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Taimoor', bat: 56, skill: 51, role: 'ar', style: 'N', nationality: 'Pakistan', age: 29, fielding: 70, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Aftab', bat: 70, skill: 61, role: 'ar', style: 'NA', nationality: 'Pakistan', isOpener: true, age: 28, fielding: 75, stamina: 85, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Azam', bat: 23, skill: 70, role: 'bl', style: 'D', nationality: 'Pakistan', age: 23, fielding: 62, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Sohail', bat: 24, skill: 75, role: 'bl', style: 'D', nationality: 'Pakistan', age: 30, fielding: 64, stamina: 85, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Aramzad', bat: 25, skill: 85, role: 'bl', style: 'N', nationality: 'Pakistan', age: 24, fielding: 68, stamina: 90, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Anwar', bat: 28, skill: 81, role: 'sb', style: 'N', nationality: 'Pakistan', age: 28, fielding: 65, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Adnan', bat: 12, skill: 56, role: 'sb', style: 'D', nationality: 'Pakistan', age: 21, fielding: 53, stamina: 64, battingStyle: 'Right-hand', bowlingType: 'Spin' },

    // --- SIXERS ---
    { name: 'Lance', bat: 76, skill: 0, role: 'bt', style: 'n', nationality: 'Australia', isOpener: true, age: 33, fielding: 75, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'A. Chadwick', bat: 73, skill: 0, role: 'wk', style: 'a', nationality: 'West Indies', isOpener: true, age: 29, fielding: 82, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'James', bat: 63, skill: 66, role: 'ar', style: 'a', nationality: 'South Africa', age: 28, fielding: 74, stamina: 87, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Ali', bat: 60, skill: 67, role: 'wk', style: 'D', nationality: 'Pakistan', age: 33, fielding: 78, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'R. Saad', bat: 60, skill: 70, role: 'wk', style: 'N', nationality: 'Pakistan', isOpener: true, age: 26, fielding: 80, stamina: 80, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Atiq Ali', bat: 62, skill: 72, role: 'wk', style: 'N', nationality: 'Pakistan', isOpener: true, age: 29, fielding: 81, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Abid', bat: 79, skill: 45, role: 'bt', style: 'NA', nationality: 'Pakistan', isOpener: true, age: 33, fielding: 77, stamina: 87, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Hamid Hasan', bat: 70, skill: 10, role: 'bt', style: 'A', nationality: 'Pakistan', isOpener: true, age: 28, fielding: 71, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Zakir', bat: 59, skill: 11, role: 'bt', style: 'D', nationality: 'Pakistan', age: 26, fielding: 65, stamina: 75, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Faisal Hasan', bat: 83, skill: 60, role: 'bt', style: 'NA', nationality: 'Pakistan', isOpener: true, age: 30, fielding: 80, stamina: 90, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Khalid', bat: 54, skill: 45, role: 'ar', style: 'N', nationality: 'Pakistan', age: 28, fielding: 69, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Najaf', bat: 41, skill: 63, role: 'ar', style: 'D', nationality: 'Pakistan', age: 26, fielding: 65, stamina: 75, battingStyle: 'Left-hand', bowlingType: 'Medium' },
    { name: 'Ilyas', bat: 11, skill: 63, role: 'bl', style: 'D', nationality: 'Pakistan', age: 25, fielding: 58, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Waheed', bat: 10, skill: 55, role: 'bl', style: 'D', nationality: 'Pakistan', age: 29, fielding: 54, stamina: 70, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Salman', bat: 30, skill: 73, role: 'bl', style: 'D', nationality: 'Pakistan', age: 29, fielding: 65, stamina: 83, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'N. Samad', bat: 23, skill: 55, role: 'sb', style: 'D', nationality: 'Pakistan', age: 26, fielding: 56, stamina: 66, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Asim', bat: 23, skill: 71, role: 'sb', style: 'D', nationality: 'Pakistan', age: 24, fielding: 63, stamina: 76, battingStyle: 'Right-hand', bowlingType: 'Spin' },

    // --- GLADIATORS ---
    { name: 'Langer', bat: 22, skill: 72, role: 'bl', style: 'd', nationality: 'Australia', age: 28, fielding: 65, stamina: 75, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'S. Wardna', bat: 67, skill: 0, role: 'bt', style: 'd', nationality: 'Sri Lanka', age: 36, fielding: 73, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'D. Quentin', bat: 56, skill: 23, role: 'bt', style: 'n', nationality: 'England', age: 31, fielding: 68, stamina: 76, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'A. Sajjad', bat: 55, skill: 69, role: 'wk', style: 'N', nationality: 'Pakistan', age: 26, fielding: 79, stamina: 77, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Shahid Latif', bat: 59, skill: 67, role: 'wk', style: 'N', nationality: 'Pakistan', age: 32, fielding: 77, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Yasir', bat: 67, skill: 12, role: 'bt', style: 'N', nationality: 'Pakistan', age: 29, fielding: 68, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Nauman', bat: 72, skill: 12, role: 'bt', style: 'N', nationality: 'Pakistan', isOpener: true, age: 26, fielding: 71, stamina: 81, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Aziz', bat: 53, skill: 22, role: 'bt', style: 'A', nationality: 'Pakistan', age: 25, fielding: 62, stamina: 71, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Muhammad Shahzain', bat: 70, skill: 34, role: 'bt', style: 'N', nationality: 'Pakistan', age: 22, fielding: 70, stamina: 80, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Saeed', bat: 60, skill: 58, role: 'ar', style: 'N', nationality: 'Pakistan', age: 32, fielding: 72, stamina: 84, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Jahangir', bat: 60, skill: 58, role: 'ar', style: 'D', nationality: 'Pakistan', age: 30, fielding: 71, stamina: 82, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Waleed', bat: 23, skill: 55, role: 'bl', style: 'D', nationality: 'Pakistan', age: 21, fielding: 56, stamina: 70, battingStyle: 'Left-hand', bowlingType: 'Medium' },
    { name: 'Ahsan', bat: 22, skill: 78, role: 'bl', style: 'N', nationality: 'Pakistan', age: 25, fielding: 65, stamina: 86, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'M. Arif', bat: 12, skill: 55, role: 'bl', style: 'D', nationality: 'Pakistan', age: 27, fielding: 54, stamina: 70, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Sameen', bat: 22, skill: 72, role: 'bl', style: 'N', nationality: 'Pakistan', age: 28, fielding: 63, stamina: 83, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Bilal', bat: 40, skill: 78, role: 'sb', style: 'N', nationality: 'Pakistan', age: 29, fielding: 68, stamina: 80, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Amjad', bat: 30, skill: 69, role: 'sb', style: 'D', nationality: 'Pakistan', age: 27, fielding: 62, stamina: 75, battingStyle: 'Left-hand', bowlingType: 'Spin' },

    // --- EAGLES ---
    { name: 'Parsh', bat: 76, skill: 0, role: 'wk', style: 'n', nationality: 'Australia', isOpener: true, age: 31, fielding: 85, stamina: 82, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Waller', bat: 23, skill: 67, role: 'bl', style: 'n', nationality: 'New Zealand', age: 26, fielding: 64, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Aram', bat: 45, skill: 66, role: 'ar', style: 'd', nationality: 'South Africa', age: 33, fielding: 69, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Zulqarnain', bat: 70, skill: 78, role: 'wk', style: 'N', nationality: 'Pakistan', isOpener: true, age: 29, fielding: 84, stamina: 85, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Yaqoob', bat: 63, skill: 68, role: 'wk', style: 'D', nationality: 'Pakistan', age: 28, fielding: 78, stamina: 80, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Asad', bat: 60, skill: 11, role: 'bt', style: 'N', nationality: 'Pakistan', isOpener: true, age: 34, fielding: 64, stamina: 74, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Siraj', bat: 63, skill: 22, role: 'bt', style: 'D', nationality: 'Pakistan', isOpener: true, age: 28, fielding: 67, stamina: 77, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Fakhrudin', bat: 70, skill: 23, role: 'bt', style: 'D', nationality: 'Pakistan', age: 29, fielding: 70, stamina: 80, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Azhar', bat: 75, skill: 45, role: 'bt', style: 'A', nationality: 'Pakistan', age: 32, fielding: 75, stamina: 85, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Aaqib Raza', bat: 78, skill: 70, role: 'ar', style: 'A', nationality: 'Pakistan', age: 26, fielding: 79, stamina: 88, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Nawaz', bat: 57, skill: 67, role: 'ar', style: 'A', nationality: 'Pakistan', age: 28, fielding: 72, stamina: 81, battingStyle: 'Left-hand', bowlingType: 'Spin' },
    { name: 'Atif Maqbool', bat: 12, skill: 53, role: 'bl', style: 'N', nationality: 'Pakistan', age: 31, fielding: 53, stamina: 68, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Naeem', bat: 22, skill: 75, role: 'bl', style: 'N', nationality: 'Pakistan', age: 29, fielding: 64, stamina: 84, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Zohaib', bat: 36, skill: 85, role: 'bl', style: 'N', nationality: 'Pakistan', age: 31, fielding: 70, stamina: 90, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Muzafar', bat: 22, skill: 71, role: 'bl', style: 'N', nationality: 'Pakistan', age: 30, fielding: 62, stamina: 82, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Arshad', bat: 22, skill: 56, role: 'sb', style: 'D', nationality: 'Pakistan', age: 22, fielding: 54, stamina: 65, battingStyle: 'Left-hand', bowlingType: 'Spin' },
    { name: 'Rehan', bat: 12, skill: 61, role: 'sb', style: 'D', nationality: 'Pakistan', age: 20, fielding: 57, stamina: 69, battingStyle: 'Right-hand', bowlingType: 'Spin' },

    // --- HAWKS ---
    { name: 'M.G. Glaxen', bat: 82, skill: 65, role: 'ar', style: 'a', nationality: 'Australia', isOpener: true, age: 27, fielding: 80, stamina: 90, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Addams', bat: 55, skill: 45, role: 'ar', style: 'n', nationality: 'New Zealand', age: 29, fielding: 71, stamina: 80, battingStyle: 'Left-hand', bowlingType: 'Medium' },
    { name: 'Mausechate', bat: 69, skill: 23, role: 'bt', style: 'a', nationality: 'Australia', age: 24, fielding: 72, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'M. Amin', bat: 79, skill: 80, role: 'wk', style: 'NA', nationality: 'Pakistan', isOpener: true, age: 25, fielding: 86, stamina: 87, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Zahid', bat: 77, skill: 76, role: 'wk', style: '—', nationality: 'Pakistan', isOpener: true, age: 30, fielding: 83, stamina: 86, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Uddin Ali', bat: 55, skill: 65, role: 'wk', style: 'N', nationality: 'Pakistan', isOpener: true, age: 24, fielding: 76, stamina: 76, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Altaf', bat: 55, skill: 10, role: 'bt', style: 'N', nationality: 'Pakistan', isOpener: true, age: 32, fielding: 60, stamina: 72, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Qasim', bat: 45, skill: 12, role: 'bt', style: 'N', nationality: 'Pakistan', age: 22, fielding: 58, stamina: 68, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'A. Usman', bat: 53, skill: 22, role: 'bt', style: 'N', nationality: 'Pakistan', age: 27, fielding: 61, stamina: 72, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Abass', bat: 72, skill: 0, role: 'bt', style: 'A', nationality: 'Pakistan', age: 27, fielding: 71, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Sike', bat: 87, skill: 85, role: 'ar', style: 'NA', nationality: 'Pakistan', isOpener: true, age: 30, fielding: 85, stamina: 94, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Wahab', bat: 50, skill: 51, role: 'ar', style: 'N', nationality: 'Pakistan', age: 33, fielding: 67, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Muhammad Tahir', bat: 60, skill: 56, role: 'ar', style: 'A', nationality: 'Pakistan', age: 25, fielding: 70, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Faraz Khan', bat: 12, skill: 56, role: 'bl', style: 'N', nationality: 'Pakistan', age: 24, fielding: 55, stamina: 71, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Farhan', bat: 78, skill: 10, role: 'bt', style: 'N', nationality: 'Pakistan', isOpener: true, age: 29, fielding: 76, stamina: 86, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Iqrar', bat: 19, skill: 90, role: 'bl', style: 'D', nationality: 'Pakistan', age: 20, fielding: 72, stamina: 94, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Riaz', bat: 11, skill: 55, role: 'sb', style: 'N', nationality: 'Pakistan', age: 30, fielding: 52, stamina: 63, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'M. Amjad', bat: 45, skill: 68, role: 'sb', style: 'N', nationality: 'Pakistan', age: 31, fielding: 70, stamina: 77, battingStyle: 'Right-hand', bowlingType: 'Spin' },

    // --- UNPICKED FREE AGENTS ---
    { name: 'Wade', bat: 25, skill: 84, role: 'bl', style: 'd', nationality: 'Australia', age: 29, fielding: 68, stamina: 89, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Lin', bat: 34, skill: 68, role: 'bl', style: 'n', nationality: 'Australia', age: 25, fielding: 66, stamina: 83, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Wilton', bat: 72, skill: 64, role: 'ar', style: 'n', nationality: 'Australia', age: 28, fielding: 76, stamina: 85, battingStyle: 'Left-hand', bowlingType: 'Medium' },
    { name: 'B. Rington', bat: 45, skill: 56, role: 'ar', style: 'n', nationality: 'New Zealand', age: 32, fielding: 69, stamina: 76, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Aslam Sattar', bat: 55, skill: 60, role: 'wk', style: 'D', nationality: 'Pakistan', age: 34, fielding: 75, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'S. Hasan', bat: 65, skill: 10, role: 'bt', style: 'D', nationality: 'Pakistan', age: 30, fielding: 68, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Sadiq', bat: 46, skill: 10, role: 'bt', style: 'D', nationality: 'Pakistan', age: 24, fielding: 58, stamina: 68, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Ashfaq', bat: 55, skill: 10, role: 'bt', style: 'D', nationality: 'Pakistan', age: 31, fielding: 62, stamina: 72, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Sohail Ahmed', bat: 23, skill: 46, role: 'bl', style: 'D', nationality: 'Pakistan', age: 23, fielding: 50, stamina: 63, battingStyle: 'Right-hand', bowlingType: 'Medium' },

    // --- PAKISTANI LOCAL FREE AGENTS (1-55) ---
    // Openers
    { name: 'Ahsan Qureshi', bat: 68, skill: 20, role: 'bt', style: 'Defensive', nationality: 'Pakistan', isOpener: true, age: 24, fielding: 68, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Zeeshan Malik', bat: 65, skill: 15, role: 'bt', style: 'Balanced', nationality: 'Pakistan', isOpener: true, age: 23, fielding: 66, stamina: 76, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Imran Latif', bat: 62, skill: 10, role: 'bt', style: 'Attacking', nationality: 'Pakistan', isOpener: true, age: 28, fielding: 64, stamina: 74, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Adnan Sheikh', bat: 67, skill: 25, role: 'bt', style: 'Balanced', nationality: 'Pakistan', isOpener: true, age: 26, fielding: 67, stamina: 77, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Sajid Farooq', bat: 69, skill: 22, role: 'bt', style: 'Defensive', nationality: 'Pakistan', isOpener: true, age: 29, fielding: 69, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'None' },
    // Middle Order
    { name: 'Rashid Nawaz', bat: 63, skill: 18, role: 'bt', style: 'Balanced', nationality: 'Pakistan', age: 25, fielding: 65, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Kamran Siddiqui', bat: 64, skill: 28, role: 'bt', style: 'Defensive', nationality: 'Pakistan', age: 30, fielding: 66, stamina: 76, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Noman Ali', bat: 61, skill: 20, role: 'bt', style: 'Attacking', nationality: 'Pakistan', age: 27, fielding: 63, stamina: 73, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Shahid Hussain', bat: 66, skill: 30, role: 'bt', style: 'Balanced', nationality: 'Pakistan', age: 31, fielding: 67, stamina: 77, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Aqib Jatoi', bat: 62, skill: 15, role: 'bt', style: 'Attacking', nationality: 'Pakistan', age: 22, fielding: 64, stamina: 74, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Bilal Ahmed', bat: 60, skill: 18, role: 'bt', style: 'Defensive', nationality: 'Pakistan', age: 24, fielding: 62, stamina: 72, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Tariq Hanif', bat: 65, skill: 27, role: 'bt', style: 'Balanced', nationality: 'Pakistan', age: 29, fielding: 66, stamina: 76, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Fahad Rafiq', bat: 67, skill: 21, role: 'bt', style: 'Balanced', nationality: 'Pakistan', age: 26, fielding: 68, stamina: 78, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Owais Bashir', bat: 64, skill: 24, role: 'bt', style: 'Attacking', nationality: 'Pakistan', age: 23, fielding: 65, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Mehmood Aslam', bat: 63, skill: 29, role: 'bt', style: 'Defensive', nationality: 'Pakistan', age: 32, fielding: 65, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'None' },
    // Wicket Keepers
    { name: 'Hamza Iqbal', bat: 68, skill: 5, role: 'wk', style: 'Attacking', nationality: 'Pakistan', age: 25, fielding: 78, stamina: 80, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Usman Akhtar', bat: 66, skill: 8, role: 'wk', style: 'Balanced', nationality: 'Pakistan', age: 28, fielding: 77, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Ali Raza', bat: 62, skill: 12, role: 'wk', style: 'Defensive', nationality: 'Pakistan', age: 30, fielding: 75, stamina: 77, battingStyle: 'Right-hand', bowlingType: 'None' },
    { name: 'Yasir Shahid', bat: 65, skill: 10, role: 'wk', style: 'Attacking', nationality: 'Pakistan', age: 26, fielding: 76, stamina: 78, battingStyle: 'Left-hand', bowlingType: 'None' },
    { name: 'Kashif Nawaz', bat: 64, skill: 6, role: 'wk', style: 'Balanced', nationality: 'Pakistan', age: 29, fielding: 76, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'None' },
    // All-Rounders
    { name: 'Mubashir Khan', bat: 68, skill: 66, role: 'ar', style: 'Balanced', nationality: 'Pakistan', age: 27, fielding: 72, stamina: 82, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Naveed Anwar', bat: 62, skill: 63, role: 'ar', style: 'Defensive', nationality: 'Pakistan', age: 31, fielding: 68, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Haris Siddiqui', bat: 64, skill: 65, role: 'ar', style: 'Attacking', nationality: 'Pakistan', age: 28, fielding: 70, stamina: 81, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Farhan Ali', bat: 63, skill: 62, role: 'ar', style: 'Balanced', nationality: 'Pakistan', age: 29, fielding: 69, stamina: 80, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Umer Shahzad', bat: 67, skill: 64, role: 'ar', style: 'Balanced', nationality: 'Pakistan', age: 26, fielding: 71, stamina: 81, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Adeel Farooq', bat: 65, skill: 68, role: 'ar', style: 'Defensive', nationality: 'Pakistan', age: 32, fielding: 70, stamina: 82, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Saad Hussain', bat: 66, skill: 63, role: 'ar', style: 'Attacking', nationality: 'Pakistan', age: 25, fielding: 71, stamina: 80, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Rizwan Khalid', bat: 60, skill: 61, role: 'ar', style: 'Defensive', nationality: 'Pakistan', age: 33, fielding: 67, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Shahbaz Ahmed', bat: 62, skill: 67, role: 'ar', style: 'Balanced', nationality: 'Pakistan', age: 28, fielding: 69, stamina: 81, battingStyle: 'Left-hand', bowlingType: 'Spin' },
    { name: 'Junaid Hanif', bat: 69, skill: 65, role: 'ar', style: 'Attacking', nationality: 'Pakistan', age: 27, fielding: 73, stamina: 83, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    // Spinners
    { name: 'Imtiaz Baloch', bat: 58, skill: 68, role: 'sb', style: 'Balanced', nationality: 'Pakistan', age: 29, fielding: 65, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Salman Rafiq', bat: 61, skill: 66, role: 'sb', style: 'Defensive', nationality: 'Pakistan', age: 31, fielding: 67, stamina: 74, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Mohsin Ali', bat: 64, skill: 63, role: 'sb', style: 'Attacking', nationality: 'Pakistan', age: 26, fielding: 68, stamina: 73, battingStyle: 'Left-hand', bowlingType: 'Spin' },
    { name: 'Younis Qadir', bat: 59, skill: 67, role: 'sb', style: 'Balanced', nationality: 'Pakistan', age: 30, fielding: 66, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Faisal Mehmood', bat: 62, skill: 64, role: 'sb', style: 'Defensive', nationality: 'Pakistan', age: 28, fielding: 67, stamina: 74, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Asad Niazi', bat: 60, skill: 62, role: 'sb', style: 'Balanced', nationality: 'Pakistan', age: 27, fielding: 66, stamina: 72, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Nadeem Arif', bat: 61, skill: 68, role: 'sb', style: 'Attacking', nationality: 'Pakistan', age: 29, fielding: 67, stamina: 76, battingStyle: 'Left-hand', bowlingType: 'Spin' },
    { name: 'Tauseef Hussain', bat: 63, skill: 66, role: 'sb', style: 'Defensive', nationality: 'Pakistan', age: 32, fielding: 68, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Amir Javed', bat: 62, skill: 65, role: 'sb', style: 'Balanced', nationality: 'Pakistan', age: 28, fielding: 67, stamina: 74, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    { name: 'Hassan Zia', bat: 59, skill: 63, role: 'sb', style: 'Attacking', nationality: 'Pakistan', age: 25, fielding: 65, stamina: 72, battingStyle: 'Right-hand', bowlingType: 'Spin' },
    // Fast Bowlers
    { name: 'Zubair Khan', bat: 35, skill: 68, role: 'bl', style: 'Fast-Medium Swing', nationality: 'Pakistan', age: 26, fielding: 60, stamina: 80, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Rashid Mehmood', bat: 42, skill: 66, role: 'bl', style: 'Right Arm Fast', nationality: 'Pakistan', age: 29, fielding: 62, stamina: 78, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Fahim Gul', bat: 33, skill: 65, role: 'bl', style: 'Left Arm Fast', nationality: 'Pakistan', age: 24, fielding: 59, stamina: 77, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Waseem Shah', bat: 40, skill: 67, role: 'bl', style: 'Right Arm Medium Fast', nationality: 'Pakistan', age: 28, fielding: 61, stamina: 79, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Jahangir Ali', bat: 36, skill: 64, role: 'bl', style: 'Left Arm Medium Fast', nationality: 'Pakistan', age: 30, fielding: 60, stamina: 76, battingStyle: 'Left-hand', bowlingType: 'Medium' },
    { name: 'Hammad Rafiq', bat: 39, skill: 63, role: 'bl', style: 'Right Arm Fast', nationality: 'Pakistan', age: 27, fielding: 61, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Zohaib Malik', bat: 32, skill: 62, role: 'bl', style: 'Left Arm Swing', nationality: 'Pakistan', age: 25, fielding: 58, stamina: 74, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Noman Shah', bat: 34, skill: 68, role: 'bl', style: 'Right Arm Fast', nationality: 'Pakistan', age: 29, fielding: 60, stamina: 80, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Irfan Qureshi', bat: 37, skill: 65, role: 'bl', style: 'Right Arm Medium', nationality: 'Pakistan', age: 31, fielding: 61, stamina: 77, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Adil Nawaz', bat: 41, skill: 63, role: 'bl', style: 'Right Arm Fast', nationality: 'Pakistan', age: 28, fielding: 62, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Rauf Ahmed', bat: 36, skill: 61, role: 'bl', style: 'Left Arm Fast', nationality: 'Pakistan', age: 26, fielding: 59, stamina: 74, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Mansoor Iqbal', bat: 38, skill: 62, role: 'bl', style: 'Right Arm Medium', nationality: 'Pakistan', age: 32, fielding: 60, stamina: 75, battingStyle: 'Right-hand', bowlingType: 'Medium' },
    { name: 'Asif Hanif', bat: 42, skill: 64, role: 'bl', style: 'Right Arm Fast', nationality: 'Pakistan', age: 29, fielding: 63, stamina: 76, battingStyle: 'Right-hand', bowlingType: 'Fast' },
    { name: 'Qasim Ali', bat: 35, skill: 67, role: 'bl', style: 'Left Arm Fast', nationality: 'Pakistan', age: 27, fielding: 60, stamina: 79, battingStyle: 'Left-hand', bowlingType: 'Fast' },
    { name: 'Tanveer Hussain', bat: 39, skill: 60, role: 'bl', style: 'Right Arm Medium', nationality: 'Pakistan', age: 33, fielding: 61, stamina: 73, battingStyle: 'Right-hand', bowlingType: 'Medium' },
];

// --- INITIAL DATA & HELPERS ---

export const initialGroundsData: Omit<Ground, 'id'>[] = [
    { name: 'Keenjhur Cricket Ground', shortCode: 'KCG', pitchType: 'Balanced Sporting Pitch', minRunsT20: 80, maxRunsT20: 200, minRunsListA: 180, maxRunsListA: 320, minRunsFC: 250, maxRunsFC: 550 },
    { name: 'School Ground', shortCode: 'SG', pitchType: 'Dusty Spinner’s Haven', minRunsT20: 70, maxRunsT20: 170, minRunsListA: 150, maxRunsListA: 280, minRunsFC: 200, maxRunsFC: 450 },
    { name: 'Transformer Ground', shortCode: 'TG', pitchType: 'Green Top', minRunsT20: 60, maxRunsT20: 160, minRunsListA: 140, maxRunsListA: 260, minRunsFC: 180, maxRunsFC: 400 },
    { name: 'Lake Way Ground', shortCode: 'LWG', pitchType: 'Batting Paradise', minRunsT20: 100, maxRunsT20: 260, minRunsListA: 220, maxRunsListA: 380, minRunsFC: 350, maxRunsFC: 750 },
    { name: 'Home Gate Ground', shortCode: 'HGG', pitchType: 'Dead Slow Track', minRunsT20: 70, maxRunsT20: 150, minRunsListA: 120, maxRunsListA: 240, minRunsFC: 150, maxRunsFC: 380 },
    { name: 'Mosque Cricket Ground', shortCode: 'MCG', pitchType: 'Cracked Worn Surface', minRunsT20: 70, maxRunsT20: 180, minRunsListA: 160, maxRunsListA: 300, minRunsFC: 220, maxRunsFC: 500 },
    { name: 'Keenjhur National Final Ground', shortCode: 'KNFG', pitchType: 'Balanced Sporting Pitch', minRunsT20: 80, maxRunsT20: 200, minRunsListA: 180, maxRunsListA: 320, minRunsFC: 250, maxRunsFC: 550 },
];

export const teamConfigurations = [
    // Franchise Teams (Top 6)
    { name: "Kings", homeGroundShortCode: "KCG", isDev: false, players: ['A. Haddin', 'S. Warner', 'N. Colin', 'M. Imran', 'I. Javed', 'Nasir', 'Husnain', 'Jahid', 'M. Musa', 'Amir', 'Mansoor', 'Zia', 'Rizwan', 'Naseem', 'Farhan (BL)', 'Rahat', 'Mehrab'] },
    { name: "Stars", homeGroundShortCode: "SG", isDev: false, players: ['Sprike', 'C. Dhanushka', 'Jordan', 'S. Khan', 'Haseebullah', 'Haider', 'Aslam', 'Shoaib Khan', 'A. Jamal', 'Taimoor', 'Aftab', 'Azam', 'Sohail', 'Aramzad', 'Anwar', 'Adnan'] },
    { name: "Sixers", homeGroundShortCode: "TG", isDev: false, players: ['Lance', 'A. Chadwick', 'James', 'Ali', 'R. Saad', 'Atiq Ali', 'Abid', 'Hamid Hasan', 'Zakir', 'Faisal Hasan', 'Khalid', 'Najaf', 'Ilyas', 'Waheed', 'Salman', 'N. Samad', 'Asim'] },
    { name: "Gladiators", homeGroundShortCode: "LWG", isDev: false, players: ['Langer', 'S. Wardna', 'D. Quentin', 'A. Sajjad', 'Shahid Latif', 'Yasir', 'Nauman', 'Aziz', 'Muhammad Shahzain', 'Saeed', 'Jahangir', 'Waleed', 'Ahsan', 'M. Arif', 'Sameen', 'Bilal', 'Amjad'] },
    { name: "Eagles", homeGroundShortCode: "MCG", isDev: false, players: ['Parsh', 'Waller', 'Aram', 'Zulqarnain', 'Yaqoob', 'Asad', 'Siraj', 'Fakhrudin', 'Azhar', 'Aaqib Raza', 'Nawaz', 'Atif Maqbool', 'Naeem', 'Zohaib', 'Muzafar', 'Arshad', 'Rehan'] },
    { name: "Hawks", homeGroundShortCode: "HGG", isDev: false, players: ['M.G. Glaxen', 'Addams', 'Mausechate', 'M. Amin', 'Zahid', 'Uddin Ali', 'Altaf', 'Qasim', 'A. Usman', 'Abass', 'Sike', 'Wahab', 'Muhammad Tahir', 'Faraz Khan', 'Farhan', 'Iqrar', 'Riaz', 'M. Amjad'] },
    
    // Development Teams (Distributed from the 55 local free agents to ensure 11 players each)
    { name: "Titans", isDev: true, players: ['Ahsan Qureshi', 'Rashid Nawaz', 'Bilal Ahmed', 'Hamza Iqbal', 'Mubashir Khan', 'Adeel Farooq', 'Imtiaz Baloch', 'Asad Niazi', 'Zubair Khan', 'Hammad Rafiq', 'Rauf Ahmed'] },
    { name: "Rangers", isDev: true, players: ['Zeeshan Malik', 'Kamran Siddiqui', 'Tariq Hanif', 'Usman Akhtar', 'Naveed Anwar', 'Saad Hussain', 'Salman Rafiq', 'Nadeem Arif', 'Rashid Mehmood', 'Zohaib Malik', 'Mansoor Iqbal'] },
    { name: "Falcons", isDev: true, players: ['Imran Latif', 'Noman Ali', 'Fahad Rafiq', 'Ali Raza', 'Haris Siddiqui', 'Rizwan Khalid', 'Mohsin Ali', 'Tauseef Hussain', 'Fahim Gul', 'Noman Shah', 'Asif Hanif'] },
    { name: "Nomads", isDev: true, players: ['Adnan Sheikh', 'Shahid Hussain', 'Owais Bashir', 'Yasir Shahid', 'Farhan Ali', 'Shahbaz Ahmed', 'Younis Qadir', 'Amir Javed', 'Waseem Shah', 'Irfan Qureshi', 'Qasim Ali'] },
    { name: "Warriors", isDev: true, players: ['Sajid Farooq', 'Aqib Jatoi', 'Mehmood Aslam', 'Kashif Nawaz', 'Umer Shahzad', 'Junaid Hanif', 'Faisal Mehmood', 'Hassan Zia', 'Jahangir Ali', 'Adil Nawaz', 'Tanveer Hussain'] },
];

export const initialFormats: FormatSettings[] = [
  // Top 6 Leagues
  { name: 'T20 Championship', matches: 2, overs: 20, category: 'T20', hasSemiFinals: true, isCup: false },
  { name: 'One-Day Trophy', matches: 2, overs: 50, category: 'One-Day', hasSemiFinals: true, isCup: false },
  { name: 'First-Class Tournament', matches: 2, overs: 90, category: 'First-Class', hasSemiFinals: true, isCup: false }, // 5-day matches

  // Development Cups (Double Round Robin + Final)
  { name: 'Development Cup T20', matches: 2, overs: 20, category: 'T20', isCup: true, hasSemiFinals: false },
  { name: 'Development Cup One-Day', matches: 2, overs: 50, category: 'One-Day', isCup: true, hasSemiFinals: false },
  { name: 'Development Cup First-Class', matches: 2, overs: 90, category: 'First-Class', isCup: true, hasSemiFinals: false }, // 4-day matches

  // Rise Cups (Double Round Robin + Final)
  { name: 'Rise Cup T20', matches: 2, overs: 20, category: 'T20', isCup: true, hasSemiFinals: false },
  { name: 'Rise Cup One-Day', matches: 2, overs: 50, category: 'One-Day', isCup: true, hasSemiFinals: false },
  { name: 'Rise Cup First-Class', matches: 2, overs: 90, category: 'First-Class', isCup: true, hasSemiFinals: false }, // 4-day matches
];

export const initialFixtures: {
    formatName: string;
    round: number;
    matches: { team1Name: string; team2Name: string; }[];
    isPlayoff?: boolean;
    playoffType?: 'semi-final' | 'final';
}[] = [
    // --- TOP 6 LEAGUE FIXTURES ---

    // T20 Championship
    { formatName: 'T20 Championship', round: 1, matches: [{ team1Name: 'Kings', team2Name: 'Stars' }, { team1Name: 'Sixers', team2Name: 'Gladiators' }, { team1Name: 'Eagles', team2Name: 'Hawks' }] },
    { formatName: 'T20 Championship', round: 2, matches: [{ team1Name: 'Kings', team2Name: 'Sixers' }, { team1Name: 'Stars', team2Name: 'Eagles' }, { team1Name: 'Gladiators', team2Name: 'Hawks' }] },
    { formatName: 'T20 Championship', round: 3, matches: [{ team1Name: 'Kings', team2Name: 'Gladiators' }, { team1Name: 'Stars', team2Name: 'Sixers' }, { team1Name: 'Eagles', team2Name: 'Hawks' }] },
    { formatName: 'T20 Championship', round: 4, matches: [{ team1Name: 'Kings', team2Name: 'Eagles' }, { team1Name: 'Stars', team2Name: 'Hawks' }, { team1Name: 'Sixers', team2Name: 'Gladiators' }] },
    { formatName: 'T20 Championship', round: 5, matches: [{ team1Name: 'Kings', team2Name: 'Hawks' }, { team1Name: 'Stars', team2Name: 'Gladiators' }, { team1Name: 'Sixers', team2Name: 'Eagles' }] },
    { formatName: 'T20 Championship', round: 6, matches: [{ team1Name: 'Kings', team2Name: 'Stars' }, { team1Name: 'Sixers', team2Name: 'Hawks' }, { team1Name: 'Eagles', team2Name: 'Gladiators' }] },
    { formatName: 'T20 Championship', round: 7, matches: [{ team1Name: 'Kings', team2Name: 'Sixers' }, { team1Name: 'Stars', team2Name: 'Eagles' }, { team1Name: 'Gladiators', team2Name: 'Hawks' }] },
    { formatName: 'T20 Championship', round: 8, matches: [{ team1Name: 'Kings', team2Name: 'Gladiators' }, { team1Name: 'Stars', team2Name: 'Hawks' }, { team1Name: 'Sixers', team2Name: 'Eagles' }] },
    { formatName: 'T20 Championship', round: 9, matches: [{ team1Name: 'Kings', team2Name: 'Eagles' }, { team1Name: 'Stars', team2Name: 'Gladiators' }, { team1Name: 'Sixers', team2Name: 'Hawks' }] },
    { formatName: 'T20 Championship', round: 10, matches: [{ team1Name: 'Kings', team2Name: 'Hawks' }, { team1Name: 'Stars', team2Name: 'Sixers' }, { team1Name: 'Eagles', team2Name: 'Gladiators' }] },
    { formatName: 'T20 Championship', round: 99, matches: [{ team1Name: '1st Place', team2Name: '4th Place' }], isPlayoff: true, playoffType: 'semi-final' }, // SF1
    { formatName: 'T20 Championship', round: 100, matches: [{ team1Name: '2nd Place', team2Name: '3rd Place' }], isPlayoff: true, playoffType: 'semi-final' }, // SF2
    { formatName: 'T20 Championship', round: 101, matches: [{ team1Name: 'Winner SF1', team2Name: 'Winner SF2' }], isPlayoff: true, playoffType: 'final' }, // Final

    // One-Day Trophy
    { formatName: 'One-Day Trophy', round: 1, matches: [{ team1Name: 'Kings', team2Name: 'Sixers' }, { team1Name: 'Stars', team2Name: 'Gladiators' }, { team1Name: 'Eagles', team2Name: 'Hawks' }] },
    { formatName: 'One-Day Trophy', round: 2, matches: [{ team1Name: 'Kings', team2Name: 'Stars' }, { team1Name: 'Sixers', team2Name: 'Eagles' }, { team1Name: 'Gladiators', team2Name: 'Hawks' }] },
    { formatName: 'One-Day Trophy', round: 3, matches: [{ team1Name: 'Kings', team2Name: 'Gladiators' }, { team1Name: 'Stars', team2Name: 'Sixers' }, { team1Name: 'Eagles', team2Name: 'Hawks' }] },
    { formatName: 'One-Day Trophy', round: 4, matches: [{ team1Name: 'Kings', team2Name: 'Hawks' }, { team1Name: 'Stars', team2Name: 'Eagles' }, { team1Name: 'Sixers', team2Name: 'Gladiators' }] },
    { formatName: 'One-Day Trophy', round: 5, matches: [{ team1Name: 'Kings', team2Name: 'Eagles' }, { team1Name: 'Stars', team2Name: 'Hawks' }, { team1Name: 'Sixers', team2Name: 'Gladiators' }] },
    { formatName: 'One-Day Trophy', round: 6, matches: [{ team1Name: 'Kings', team2Name: 'Stars' }, { team1Name: 'Sixers', team2Name: 'Hawks' }, { team1Name: 'Eagles', team2Name: 'Gladiators' }] },
    { formatName: 'One-Day Trophy', round: 7, matches: [{ team1Name: 'Kings', team2Name: 'Sixers' }, { team1Name: 'Stars', team2Name: 'Eagles' }, { team1Name: 'Gladiators', team2Name: 'Hawks' }] },
    { formatName: 'One-Day Trophy', round: 8, matches: [{ team1Name: 'Kings', team2Name: 'Gladiators' }, { team1Name: 'Stars', team2Name: 'Hawks' }, { team1Name: 'Sixers', team2Name: 'Eagles' }] },
    { formatName: 'One-Day Trophy', round: 9, matches: [{ team1Name: 'Kings', team2Name: 'Hawks' }, { team1Name: 'Stars', team2Name: 'Gladiators' }, { team1Name: 'Sixers', team2Name: 'Eagles' }] },
    { formatName: 'One-Day Trophy', round: 10, matches: [{ team1Name: 'Kings', team2Name: 'Eagles' }, { team1Name: 'Stars', team2Name: 'Sixers' }, { team1Name: 'Eagles', team2Name: 'Gladiators' }] },
    { formatName: 'One-Day Trophy', round: 99, matches: [{ team1Name: '1st Place', team2Name: '4th Place' }], isPlayoff: true, playoffType: 'semi-final' }, // SF1
    { formatName: 'One-Day Trophy', round: 100, matches: [{ team1Name: '2nd Place', team2Name: '3rd Place' }], isPlayoff: true, playoffType: 'semi-final' }, // SF2
    { formatName: 'One-Day Trophy', round: 101, matches: [{ team1Name: 'Winner SF1', team2Name: 'Winner SF2' }], isPlayoff: true, playoffType: 'final' }, // Final

    // First-Class Tournament
    { formatName: 'First-Class Tournament', round: 1, matches: [{ team1Name: 'Kings', team2Name: 'Hawks' }, { team1Name: 'Stars', team2Name: 'Sixers' }, { team1Name: 'Eagles', team2Name: 'Gladiators' }] },
    { formatName: 'First-Class Tournament', round: 2, matches: [{ team1Name: 'Kings', team2Name: 'Eagles' }, { team1Name: 'Stars', team2Name: 'Gladiators' }, { team1Name: 'Sixers', team2Name: 'Hawks' }] },
    { formatName: 'First-Class Tournament', round: 3, matches: [{ team1Name: 'Kings', team2Name: 'Stars' }, { team1Name: 'Sixers', team2Name: 'Gladiators' }, { team1Name: 'Eagles', team2Name: 'Hawks' }] },
    { formatName: 'First-Class Tournament', round: 4, matches: [{ team1Name: 'Kings', team2Name: 'Sixers' }, { team1Name: 'Stars', team2Name: 'Hawks' }, { team1Name: 'Gladiators', team2Name: 'Eagles' }] },
    { formatName: 'First-Class Tournament', round: 5, matches: [{ team1Name: 'Kings', team2Name: 'Gladiators' }, { team1Name: 'Stars', team2Name: 'Eagles' }, { team1Name: 'Sixers', team2Name: 'Hawks' }] },
    { formatName: 'First-Class Tournament', round: 6, matches: [{ team1Name: 'Kings', team2Name: 'Hawks' }, { team1Name: 'Stars', team2Name: 'Sixers' }, { team1Name: 'Eagles', team2Name: 'Gladiators' }] },
    { formatName: 'First-Class Tournament', round: 7, matches: [{ team1Name: 'Kings', team2Name: 'Eagles' }, { team1Name: 'Stars', team2Name: 'Gladiators' }, { team1Name: 'Sixers', team2Name: 'Hawks' }] },
    { formatName: 'First-Class Tournament', round: 8, matches: [{ team1Name: 'Kings', team2Name: 'Stars' }, { team1Name: 'Sixers', team2Name: 'Gladiators' }, { team1Name: 'Eagles', team2Name: 'Hawks' }] },
    { formatName: 'First-Class Tournament', round: 9, matches: [{ team1Name: 'Kings', team2Name: 'Sixers' }, { team1Name: 'Stars', team2Name: 'Hawks' }, { team1Name: 'Gladiators', team2Name: 'Eagles' }] },
    { formatName: 'First-Class Tournament', round: 10, matches: [{ team1Name: 'Kings', team2Name: 'Gladiators' }, { team1Name: 'Stars', team2Name: 'Eagles' }, { team1Name: 'Sixers', team2Name: 'Hawks' }] },
    { formatName: 'First-Class Tournament', round: 99, matches: [{ team1Name: '1st Place', team2Name: '4th Place' }], isPlayoff: true, playoffType: 'semi-final' }, // SF1
    { formatName: 'First-Class Tournament', round: 100, matches: [{ team1Name: '2nd Place', team2Name: '3rd Place' }], isPlayoff: true, playoffType: 'semi-final' }, // SF2
    { formatName: 'First-Class Tournament', round: 101, matches: [{ team1Name: 'Winner SF1', team2Name: 'Winner SF2' }], isPlayoff: true, playoffType: 'final' }, // Final

    // --- DEVELOPMENT CUP FIXTURES ---

    // Development Cup T20
    { formatName: 'Development Cup T20', round: 1, matches: [{ team1Name: 'Titans', team2Name: 'Rangers' }] },
    { formatName: 'Development Cup T20', round: 2, matches: [{ team1Name: 'Falcons', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup T20', round: 3, matches: [{ team1Name: 'Warriors', team2Name: 'Titans' }] },
    { formatName: 'Development Cup T20', round: 4, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup T20', round: 5, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup T20', round: 6, matches: [{ team1Name: 'Titans', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup T20', round: 7, matches: [{ team1Name: 'Rangers', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup T20', round: 8, matches: [{ team1Name: 'Nomads', team2Name: 'Titans' }] },
    { formatName: 'Development Cup T20', round: 9, matches: [{ team1Name: 'Falcons', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup T20', round: 10, matches: [{ team1Name: 'Rangers', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup T20', round: 11, matches: [{ team1Name: 'Titans', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup T20', round: 12, matches: [{ team1Name: 'Warriors', team2Name: 'Rangers' }] },
    { formatName: 'Development Cup T20', round: 13, matches: [{ team1Name: 'Falcons', team2Name: 'Titans' }] },
    { formatName: 'Development Cup T20', round: 14, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup T20', round: 15, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup T20', round: 101, matches: [{ team1Name: '1st Place', team2Name: '2nd Place' }], isPlayoff: true, playoffType: 'final' }, // Final

    // Development Cup One-Day
    { formatName: 'Development Cup One-Day', round: 1, matches: [{ team1Name: 'Titans', team2Name: 'Rangers' }] },
    { formatName: 'Development Cup One-Day', round: 2, matches: [{ team1Name: 'Falcons', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup One-Day', round: 3, matches: [{ team1Name: 'Warriors', team2Name: 'Titans' }] },
    { formatName: 'Development Cup One-Day', round: 4, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup One-Day', round: 5, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup One-Day', round: 6, matches: [{ team1Name: 'Titans', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup One-Day', round: 7, matches: [{ team1Name: 'Rangers', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup One-Day', round: 8, matches: [{ team1Name: 'Nomads', team2Name: 'Titans' }] },
    { formatName: 'Development Cup One-Day', round: 9, matches: [{ team1Name: 'Falcons', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup One-Day', round: 10, matches: [{ team1Name: 'Rangers', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup One-Day', round: 11, matches: [{ team1Name: 'Titans', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup One-Day', round: 12, matches: [{ team1Name: 'Warriors', team2Name: 'Rangers' }] },
    { formatName: 'Development Cup One-Day', round: 13, matches: [{ team1Name: 'Falcons', team2Name: 'Titans' }] },
    { formatName: 'Development Cup One-Day', round: 14, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup One-Day', round: 15, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup One-Day', round: 101, matches: [{ team1Name: '1st Place', team2Name: '2nd Place' }], isPlayoff: true, playoffType: 'final' }, // Final

    // Development Cup First-Class
    { formatName: 'Development Cup First-Class', round: 1, matches: [{ team1Name: 'Titans', team2Name: 'Rangers' }] },
    { formatName: 'Development Cup First-Class', round: 2, matches: [{ team1Name: 'Falcons', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup First-Class', round: 3, matches: [{ team1Name: 'Warriors', team2Name: 'Titans' }] },
    { formatName: 'Development Cup First-Class', round: 4, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup First-Class', round: 5, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup First-Class', round: 6, matches: [{ team1Name: 'Titans', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup First-Class', round: 7, matches: [{ team1Name: 'Rangers', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup First-Class', round: 8, matches: [{ team1Name: 'Nomads', team2Name: 'Titans' }] },
    { formatName: 'Development Cup First-Class', round: 9, matches: [{ team1Name: 'Falcons', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup First-Class', round: 10, matches: [{ team1Name: 'Rangers', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup First-Class', round: 11, matches: [{ team1Name: 'Titans', team2Name: 'Nomads' }] },
    { formatName: 'Development Cup First-Class', round: 12, matches: [{ team1Name: 'Warriors', team2Name: 'Rangers' }] },
    { formatName: 'Development Cup First-Class', round: 13, matches: [{ team1Name: 'Falcons', team2Name: 'Titans' }] },
    { formatName: 'Development Cup First-Class', round: 14, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Development Cup First-Class', round: 15, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Development Cup First-Class', round: 101, matches: [{ team1Name: '1st Place', team2Name: '2nd Place' }], isPlayoff: true, playoffType: 'final' }, // Final

    // --- RISE CUP FIXTURES ---

    // Rise Cup T20
    { formatName: 'Rise Cup T20', round: 1, matches: [{ team1Name: 'Titans', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup T20', round: 2, matches: [{ team1Name: 'Rangers', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup T20', round: 3, matches: [{ team1Name: 'Nomads', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup T20', round: 4, matches: [{ team1Name: 'Falcons', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup T20', round: 5, matches: [{ team1Name: 'Rangers', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup T20', round: 6, matches: [{ team1Name: 'Titans', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup T20', round: 7, matches: [{ team1Name: 'Warriors', team2Name: 'Rangers' }] },
    { formatName: 'Rise Cup T20', round: 8, matches: [{ team1Name: 'Falcons', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup T20', round: 9, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup T20', round: 10, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup T20', round: 11, matches: [{ team1Name: 'Titans', team2Name: 'Rangers' }] },
    { formatName: 'Rise Cup T20', round: 12, matches: [{ team1Name: 'Falcons', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup T20', round: 13, matches: [{ team1Name: 'Warriors', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup T20', round: 14, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup T20', round: 15, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup T20', round: 101, matches: [{ team1Name: '1st Place', team2Name: '2nd Place' }], isPlayoff: true, playoffType: 'final' }, // Final

    // Rise Cup One-Day
    { formatName: 'Rise Cup One-Day', round: 1, matches: [{ team1Name: 'Titans', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup One-Day', round: 2, matches: [{ team1Name: 'Rangers', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup One-Day', round: 3, matches: [{ team1Name: 'Nomads', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup One-Day', round: 4, matches: [{ team1Name: 'Falcons', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup One-Day', round: 5, matches: [{ team1Name: 'Rangers', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup One-Day', round: 6, matches: [{ team1Name: 'Titans', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup One-Day', round: 7, matches: [{ team1Name: 'Warriors', team2Name: 'Rangers' }] },
    { formatName: 'Rise Cup One-Day', round: 8, matches: [{ team1Name: 'Falcons', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup One-Day', round: 9, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup One-Day', round: 10, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup One-Day', round: 11, matches: [{ team1Name: 'Titans', team2Name: 'Rangers' }] },
    { formatName: 'Rise Cup One-Day', round: 12, matches: [{ team1Name: 'Falcons', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup One-Day', round: 13, matches: [{ team1Name: 'Warriors', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup One-Day', round: 14, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup One-Day', round: 15, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup One-Day', round: 101, matches: [{ team1Name: '1st Place', team2Name: '2nd Place' }], isPlayoff: true, playoffType: 'final' }, // Final

    // Rise Cup First-Class
    { formatName: 'Rise Cup First-Class', round: 1, matches: [{ team1Name: 'Titans', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup First-Class', round: 2, matches: [{ team1Name: 'Rangers', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup First-Class', round: 3, matches: [{ team1Name: 'Nomads', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup First-Class', round: 4, matches: [{ team1Name: 'Falcons', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup First-Class', round: 5, matches: [{ team1Name: 'Rangers', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup First-Class', round: 6, matches: [{ team1Name: 'Titans', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup First-Class', round: 7, matches: [{ team1Name: 'Warriors', team2Name: 'Rangers' }] },
    { formatName: 'Rise Cup First-Class', round: 8, matches: [{ team1Name: 'Falcons', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup First-Class', round: 9, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup First-Class', round: 10, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup First-Class', round: 11, matches: [{ team1Name: 'Titans', team2Name: 'Rangers' }] },
    { formatName: 'Rise Cup First-Class', round: 12, matches: [{ team1Name: 'Falcons', team2Name: 'Nomads' }] },
    { formatName: 'Rise Cup First-Class', round: 13, matches: [{ team1Name: 'Warriors', team2Name: 'Titans' }] },
    { formatName: 'Rise Cup First-Class', round: 14, matches: [{ team1Name: 'Rangers', team2Name: 'Falcons' }] },
    { formatName: 'Rise Cup First-Class', round: 15, matches: [{ team1Name: 'Nomads', team2Name: 'Warriors' }] },
    { formatName: 'Rise Cup First-Class', round: 101, matches: [{ team1Name: '1st Place', team2Name: '2nd Place' }], isPlayoff: true, playoffType: 'final' }, // Final
];

export const SAVE_GAME_KEY = 'wicketWarriorsSaveGame';

// --- POWERPLAY FIELDING POSITIONS ---
export const FIELDING_POSITIONS = {
    P1: [ { x: 360, y: 280 }, { x: 440, y: 280 }, { x: 330, y: 350 }, { x: 470, y: 350 }, { x: 400, y: 200 }, { x: 250, y: 300 }, { x: 550, y: 300 }, { x: 300, y: 450 }, { x: 500, y: 450 } ],
    P2: [ { x: 200, y: 150 }, { x: 600, y: 150 }, { x: 220, y: 450 }, { x: 580, y: 450 }, { x: 350, y: 250 }, { x: 450, y: 250 }, { x: 320, y: 400 }, { x: 480, y: 400 }, { x: 400, y: 550 } ],
    P3: [ { x: 150, y: 120 }, { x: 650, y: 120 }, { x: 130, y: 480 }, { x: 670, y: 480 }, { x: 400, y: 580 }, { x: 400, y: 20 }, { x: 250, y: 300 }, { x: 550, y: 300 }, { x: 300, y: 450 } ]
};