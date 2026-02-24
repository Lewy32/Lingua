/**
 * Exercise Components Index
 * 15 exercise types for Lingua language learning
 */

// Core exercises
export { default as MultipleChoice } from './MultipleChoice';
export { default as FillInBlanks } from './FillInBlanks';
export { default as FlashCard } from './FlashCard';
export { default as WritingExercise } from './WritingExercise';

// Translation exercises
export { default as TapTranslation } from './TapTranslation';
export { default as VocabularyMatch } from './VocabularyMatch';
export { default as MatchPairs } from './MatchPairs';

// Listening & Speaking
export { default as ListeningExercise } from './ListeningExercise';
export { default as SpeakingExercise } from './SpeakingExercise';
export { default as DictationExercise } from './DictationExercise';

// Reading & Comprehension
export { default as ReadingComprehension } from './ReadingComprehension';
export { default as StoryMode } from './StoryMode';

// Interactive
export { default as ConversationExercise } from './ConversationExercise';
export { default as CultureQuiz } from './CultureQuiz';

/**
 * Exercise type definitions for dynamic rendering
 */
export const EXERCISE_TYPES = {
  MULTIPLE_CHOICE: 'multipleChoice',
  FILL_BLANKS: 'fillBlanks',
  FLASH_CARD: 'flashCard',
  WRITING: 'writing',
  TAP_TRANSLATION: 'tapTranslation',
  VOCABULARY_MATCH: 'vocabularyMatch',
  MATCH_PAIRS: 'matchPairs',
  LISTENING: 'listening',
  SPEAKING: 'speaking',
  DICTATION: 'dictation',
  READING: 'reading',
  STORY: 'story',
  CONVERSATION: 'conversation',
  CULTURE_QUIZ: 'cultureQuiz',
};

/**
 * Get component for exercise type
 */
export const getExerciseComponent = (type) => {
  const componentMap = {
    [EXERCISE_TYPES.MULTIPLE_CHOICE]: require('./MultipleChoice').default,
    [EXERCISE_TYPES.FILL_BLANKS]: require('./FillInBlanks').default,
    [EXERCISE_TYPES.FLASH_CARD]: require('./FlashCard').default,
    [EXERCISE_TYPES.WRITING]: require('./WritingExercise').default,
    [EXERCISE_TYPES.TAP_TRANSLATION]: require('./TapTranslation').default,
    [EXERCISE_TYPES.VOCABULARY_MATCH]: require('./VocabularyMatch').default,
    [EXERCISE_TYPES.MATCH_PAIRS]: require('./MatchPairs').default,
    [EXERCISE_TYPES.LISTENING]: require('./ListeningExercise').default,
    [EXERCISE_TYPES.SPEAKING]: require('./SpeakingExercise').default,
    [EXERCISE_TYPES.DICTATION]: require('./DictationExercise').default,
    [EXERCISE_TYPES.READING]: require('./ReadingComprehension').default,
    [EXERCISE_TYPES.STORY]: require('./StoryMode').default,
    [EXERCISE_TYPES.CONVERSATION]: require('./ConversationExercise').default,
    [EXERCISE_TYPES.CULTURE_QUIZ]: require('./CultureQuiz').default,
  };
  
  return componentMap[type] || null;
};

/**
 * Exercise metadata for UI
 */
export const EXERCISE_META = {
  [EXERCISE_TYPES.MULTIPLE_CHOICE]: {
    name: 'Multiple Choice',
    icon: 'list',
    description: 'Select the correct answer',
    difficulty: 'beginner',
  },
  [EXERCISE_TYPES.FILL_BLANKS]: {
    name: 'Fill in the Blanks',
    icon: 'create',
    description: 'Complete the sentence',
    difficulty: 'beginner',
  },
  [EXERCISE_TYPES.FLASH_CARD]: {
    name: 'Flash Cards',
    icon: 'albums',
    description: 'Learn vocabulary with cards',
    difficulty: 'beginner',
  },
  [EXERCISE_TYPES.WRITING]: {
    name: 'Writing',
    icon: 'pencil',
    description: 'Practice writing sentences',
    difficulty: 'intermediate',
  },
  [EXERCISE_TYPES.TAP_TRANSLATION]: {
    name: 'Tap to Translate',
    icon: 'hand-left',
    description: 'Build sentences by tapping words',
    difficulty: 'beginner',
  },
  [EXERCISE_TYPES.VOCABULARY_MATCH]: {
    name: 'Vocabulary Match',
    icon: 'swap-horizontal',
    description: 'Match words to meanings',
    difficulty: 'beginner',
  },
  [EXERCISE_TYPES.MATCH_PAIRS]: {
    name: 'Match Pairs',
    icon: 'git-compare',
    description: 'Connect matching items',
    difficulty: 'beginner',
  },
  [EXERCISE_TYPES.LISTENING]: {
    name: 'Listening',
    icon: 'headset',
    description: 'Listen and answer',
    difficulty: 'intermediate',
  },
  [EXERCISE_TYPES.SPEAKING]: {
    name: 'Speaking',
    icon: 'mic',
    description: 'Practice pronunciation',
    difficulty: 'intermediate',
  },
  [EXERCISE_TYPES.DICTATION]: {
    name: 'Dictation',
    icon: 'ear',
    description: 'Write what you hear',
    difficulty: 'advanced',
  },
  [EXERCISE_TYPES.READING]: {
    name: 'Reading',
    icon: 'book',
    description: 'Read and comprehend',
    difficulty: 'intermediate',
  },
  [EXERCISE_TYPES.STORY]: {
    name: 'Story Mode',
    icon: 'reader',
    description: 'Interactive stories',
    difficulty: 'intermediate',
  },
  [EXERCISE_TYPES.CONVERSATION]: {
    name: 'Conversation',
    icon: 'chatbubbles',
    description: 'Chat with AI partner',
    difficulty: 'advanced',
  },
  [EXERCISE_TYPES.CULTURE_QUIZ]: {
    name: 'Culture Quiz',
    icon: 'globe',
    description: 'Learn cultural facts',
    difficulty: 'beginner',
  },
};

/**
 * Generate a balanced lesson with mixed exercise types
 */
export const generateLessonExercises = (vocabulary, options = {}) => {
  const {
    count = 10,
    difficulty = 'mixed',
    includeTypes = Object.values(EXERCISE_TYPES),
  } = options;

  const exercises = [];
  const types = includeTypes.filter(type => {
    if (difficulty === 'mixed') return true;
    return EXERCISE_META[type]?.difficulty === difficulty;
  });

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    exercises.push({
      type,
      ...EXERCISE_META[type],
    });
  }

  return exercises.sort(() => Math.random() - 0.5);
};
