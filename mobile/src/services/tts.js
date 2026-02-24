import * as Speech from 'expo-speech';

// Text-to-Speech service for Farsi pronunciation

const FARSI_LANGUAGE = 'fa-IR'; // Persian (Iran)
const DEFAULT_OPTIONS = {
  language: FARSI_LANGUAGE,
  pitch: 1.0,
  rate: 0.75, // Slightly slower for learning
};

export const speak = async (text, options = {}) => {
  try {
    const speechOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    await Speech.speak(text, speechOptions);
  } catch (error) {
    console.error('Error speaking text:', error);
  }
};

export const speakSlow = async (text, options = {}) => {
  try {
    const speechOptions = {
      ...DEFAULT_OPTIONS,
      rate: 0.5, // Very slow for pronunciation practice
      ...options,
    };

    await Speech.speak(text, speechOptions);
  } catch (error) {
    console.error('Error speaking text slowly:', error);
  }
};

export const stop = async () => {
  try {
    await Speech.stop();
  } catch (error) {
    console.error('Error stopping speech:', error);
  }
};

export const isSpeaking = async () => {
  try {
    return await Speech.isSpeakingAsync();
  } catch (error) {
    console.error('Error checking if speaking:', error);
    return false;
  }
};

export const getAvailableVoices = async () => {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    // Filter for Farsi voices
    return voices.filter(voice =>
      voice.language.startsWith('fa') ||
      voice.language.includes('Persian')
    );
  } catch (error) {
    console.error('Error getting available voices:', error);
    return [];
  }
};

export default {
  speak,
  speakSlow,
  stop,
  isSpeaking,
  getAvailableVoices,
};
