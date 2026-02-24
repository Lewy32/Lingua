/**
 * Slang & Casual Language Index
 * Street talk, informal speech, and colloquialisms for all languages
 */

import { persianSlang } from './persian';
import { japaneseSlang } from './japanese';
import { koreanSlang } from './korean';
import { spanishSlang } from './spanish';
import { russianSlang } from './russian';
import { italianSlang } from './italian';
import { frenchSlang } from './french';
import { germanSlang } from './german';
import { portugueseSlang } from './portuguese';
import { arabicSlang } from './arabic';
import { mandarinSlang } from './mandarin';
import { polishSlang } from './polish';

export const slangByLanguage = {
  persian: persianSlang,
  farsi: persianSlang,
  japanese: japaneseSlang,
  korean: koreanSlang,
  spanish: spanishSlang,
  russian: russianSlang,
  italian: italianSlang,
  french: frenchSlang,
  german: germanSlang,
  portuguese: portugueseSlang,
  arabic: arabicSlang,
  mandarin: mandarinSlang,
  chinese: mandarinSlang,
  polish: polishSlang,
};

export const getSlangForLanguage = (languageId) => {
  const normalized = languageId?.toLowerCase().replace(/[-_\s]/g, '');
  return slangByLanguage[normalized] || [];
};

export const SLANG_CATEGORIES = {
  GREETINGS: 'greetings',
  REACTIONS: 'reactions',
  INSULTS: 'insults', // Mild, non-offensive
  COMPLIMENTS: 'compliments',
  EMOTIONS: 'emotions',
  FOOD: 'food',
  MONEY: 'money',
  PARTY: 'party',
  DATING: 'dating',
  INTERNET: 'internet',
  WORK: 'work',
  EXPRESSIONS: 'expressions',
};

export const FORMALITY_LEVELS = {
  CASUAL: 'casual',       // Friends, peers
  STREET: 'street',       // Very informal, urban
  PLAYFUL: 'playful',     // Joking, teasing
  CRUDE: 'crude',         // Vulgar but common (marked for adult learners)
};

export {
  persianSlang,
  japaneseSlang,
  koreanSlang,
  spanishSlang,
  russianSlang,
  italianSlang,
  frenchSlang,
  germanSlang,
  portugueseSlang,
  arabicSlang,
  mandarinSlang,
  polishSlang,
};
