// Farsi/Persian text utilities

// Check if text is RTL (Right-to-Left)
export const isRTL = (text) => {
  if (!text) return false;
  // Check for Persian/Arabic Unicode range
  const rtlChars = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return rtlChars.test(text);
};

// Format text for RTL display
export const formatRTL = (text) => {
  if (!text) return '';
  return isRTL(text) ? text : text;
};

// Persian to English number conversion
export const persianToEnglishNumbers = (str) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  let result = str;
  for (let i = 0; i < 10; i++) {
    const re = new RegExp(persianNumbers[i], 'g');
    const re2 = new RegExp(arabicNumbers[i], 'g');
    result = result.replace(re, i.toString());
    result = result.replace(re2, i.toString());
  }
  return result;
};

// English to Persian number conversion
export const englishToPersianNumbers = (str) => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  let result = str.toString();
  for (let i = 0; i < 10; i++) {
    const re = new RegExp(i.toString(), 'g');
    result = result.replace(re, persianNumbers[i]);
  }
  return result;
};

// Remove diacritics (harakat) from Persian text
export const removeDiacritics = (text) => {
  if (!text) return '';
  // Persian diacritics Unicode range
  return text.replace(/[\u064B-\u0652\u0670]/g, '');
};

// Normalize Persian text for comparison
export const normalizePersian = (text) => {
  if (!text) return '';
  let normalized = text;

  // Remove diacritics
  normalized = removeDiacritics(normalized);

  // Normalize different forms of the same character
  normalized = normalized
    .replace(/ك/g, 'ک') // Arabic kaf to Persian
    .replace(/ي/g, 'ی') // Arabic yeh to Persian
    .replace(/ى/g, 'ی') // Alef maksura to Persian yeh
    .replace(/ہ/g, 'ه') // Urdu heh to Persian
    .replace(/ئ/g, 'ی'); // Yeh with hamza to Persian yeh

  // Normalize zero-width characters
  normalized = normalized.replace(/[\u200B-\u200D\uFEFF]/g, '');

  // Trim and convert to lowercase
  return normalized.trim().toLowerCase();
};

// Compare two Persian strings (ignoring diacritics and normalization)
export const comparePersian = (str1, str2) => {
  return normalizePersian(str1) === normalizePersian(str2);
};

// Get text direction style
export const getTextDirectionStyle = (text) => {
  return {
    textAlign: isRTL(text) ? 'right' : 'left',
    writingDirection: isRTL(text) ? 'rtl' : 'ltr',
  };
};

// Persian alphabet
export const PERSIAN_ALPHABET = [
  { letter: 'ا', name: 'alef', pronunciation: 'â' },
  { letter: 'ب', name: 'be', pronunciation: 'b' },
  { letter: 'پ', name: 'pe', pronunciation: 'p' },
  { letter: 'ت', name: 'te', pronunciation: 't' },
  { letter: 'ث', name: 'se', pronunciation: 's' },
  { letter: 'ج', name: 'jim', pronunciation: 'j' },
  { letter: 'چ', name: 'che', pronunciation: 'ch' },
  { letter: 'ح', name: 'he', pronunciation: 'h' },
  { letter: 'خ', name: 'khe', pronunciation: 'kh' },
  { letter: 'د', name: 'dâl', pronunciation: 'd' },
  { letter: 'ذ', name: 'zâl', pronunciation: 'z' },
  { letter: 'ر', name: 're', pronunciation: 'r' },
  { letter: 'ز', name: 'ze', pronunciation: 'z' },
  { letter: 'ژ', name: 'zhe', pronunciation: 'zh' },
  { letter: 'س', name: 'sin', pronunciation: 's' },
  { letter: 'ش', name: 'shin', pronunciation: 'sh' },
  { letter: 'ص', name: 'sâd', pronunciation: 's' },
  { letter: 'ض', name: 'zâd', pronunciation: 'z' },
  { letter: 'ط', name: 'tâ', pronunciation: 't' },
  { letter: 'ظ', name: 'zâ', pronunciation: 'z' },
  { letter: 'ع', name: 'eyn', pronunciation: "'" },
  { letter: 'غ', name: 'gheyn', pronunciation: 'gh' },
  { letter: 'ف', name: 'fe', pronunciation: 'f' },
  { letter: 'ق', name: 'ghâf', pronunciation: 'gh' },
  { letter: 'ک', name: 'kâf', pronunciation: 'k' },
  { letter: 'گ', name: 'gâf', pronunciation: 'g' },
  { letter: 'ل', name: 'lâm', pronunciation: 'l' },
  { letter: 'م', name: 'mim', pronunciation: 'm' },
  { letter: 'ن', name: 'nun', pronunciation: 'n' },
  { letter: 'و', name: 'vâv', pronunciation: 'v/u/o' },
  { letter: 'ه', name: 'he', pronunciation: 'h/e' },
  { letter: 'ی', name: 'ye', pronunciation: 'y/i' },
];

export default {
  isRTL,
  formatRTL,
  persianToEnglishNumbers,
  englishToPersianNumbers,
  removeDiacritics,
  normalizePersian,
  comparePersian,
  getTextDirectionStyle,
  PERSIAN_ALPHABET,
};
