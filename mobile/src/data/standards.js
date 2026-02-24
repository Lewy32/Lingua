/**
 * International Language Testing Standards
 * CEFR (Common European Framework), ACTFL, and regional certifications
 */

/**
 * CEFR Levels - The Global Standard
 * Used by: EU, UN, most international language certifications
 */
export const CEFR_LEVELS = {
  A1: {
    code: 'A1',
    name: 'Beginner',
    description: 'Breakthrough',
    color: '#4CAF50',
    hours: 80, // Approximate study hours to achieve
    vocabulary: 500,
    canDo: [
      'Understand and use familiar everyday expressions',
      'Introduce yourself and others',
      'Ask and answer simple questions about personal details',
      'Interact in a simple way if the other person speaks slowly',
    ],
    grammar: [
      'Present tense (basic)',
      'Articles and determiners',
      'Basic pronouns',
      'Simple sentence structure',
      'Common prepositions',
    ],
    topics: [
      'Personal information',
      'Greetings',
      'Numbers 1-100',
      'Time and dates',
      'Family',
      'Food and drinks',
      'Daily routines',
    ],
  },
  A2: {
    code: 'A2',
    name: 'Elementary',
    description: 'Waystage',
    color: '#8BC34A',
    hours: 180,
    vocabulary: 1000,
    canDo: [
      'Understand sentences about areas of immediate relevance',
      'Communicate in simple, routine tasks',
      'Describe aspects of your background and immediate environment',
      'Handle short social exchanges',
    ],
    grammar: [
      'Past tense (simple)',
      'Future tense (basic)',
      'Comparatives and superlatives',
      'Modal verbs (can, must, should)',
      'Possessives',
      'Frequency adverbs',
    ],
    topics: [
      'Shopping',
      'Travel and directions',
      'Weather',
      'Hobbies and interests',
      'Work and education',
      'Health',
      'Describing people and places',
    ],
  },
  B1: {
    code: 'B1',
    name: 'Intermediate',
    description: 'Threshold',
    color: '#FFC107',
    hours: 350,
    vocabulary: 2000,
    canDo: [
      'Understand main points of clear standard input on familiar matters',
      'Deal with most travel situations',
      'Produce simple connected text on familiar topics',
      'Describe experiences, events, dreams, and ambitions',
      'Give reasons and explanations for opinions and plans',
    ],
    grammar: [
      'All past tenses',
      'Future forms (will, going to)',
      'Conditionals (1st, 2nd)',
      'Passive voice (basic)',
      'Relative clauses',
      'Reported speech (basic)',
    ],
    topics: [
      'Entertainment and media',
      'Technology',
      'Environment',
      'Relationships',
      'Life experiences',
      'Current events',
      'Cultural topics',
    ],
  },
  B2: {
    code: 'B2',
    name: 'Upper Intermediate',
    description: 'Vantage',
    color: '#FF9800',
    hours: 500,
    vocabulary: 4000,
    canDo: [
      'Understand main ideas of complex text on concrete and abstract topics',
      'Interact with native speakers with fluency and spontaneity',
      'Produce clear, detailed text on a wide range of subjects',
      'Explain viewpoints on topical issues with pros and cons',
    ],
    grammar: [
      'All conditionals',
      'Advanced passive constructions',
      'Subjunctive (if applicable)',
      'Complex sentence structures',
      'Discourse markers',
      'Emphasis and inversion',
    ],
    topics: [
      'Politics and society',
      'Science and research',
      'Business and economics',
      'Arts and literature',
      'Philosophy and ethics',
      'Global issues',
    ],
  },
  C1: {
    code: 'C1',
    name: 'Advanced',
    description: 'Effective Operational Proficiency',
    color: '#F44336',
    hours: 700,
    vocabulary: 8000,
    canDo: [
      'Understand a wide range of demanding, longer texts',
      'Express yourself fluently and spontaneously without searching for expressions',
      'Use language flexibly for social, academic, and professional purposes',
      'Produce clear, well-structured, detailed text on complex subjects',
    ],
    grammar: [
      'Nuanced tense usage',
      'Idiomatic expressions',
      'Register variation',
      'Complex cohesion devices',
      'Subtle modal distinctions',
    ],
    topics: [
      'Academic discourse',
      'Professional communication',
      'Abstract concepts',
      'Specialized fields',
      'Rhetorical strategies',
    ],
  },
  C2: {
    code: 'C2',
    name: 'Proficient',
    description: 'Mastery',
    color: '#9C27B0',
    hours: 1000,
    vocabulary: 16000,
    canDo: [
      'Understand virtually everything heard or read',
      'Summarize information from different sources',
      'Express yourself spontaneously, very fluently, and precisely',
      'Differentiate finer shades of meaning in complex situations',
    ],
    grammar: [
      'Complete mastery of grammar',
      'Native-like accuracy',
      'Stylistic flexibility',
      'Subtle humor and irony',
    ],
    topics: [
      'Any topic with precision',
      'Specialized terminology',
      'Cultural nuances',
      'Literary and poetic language',
    ],
  },
};

/**
 * ACTFL Levels (American Council on Teaching Foreign Languages)
 * Used primarily in USA
 */
export const ACTFL_LEVELS = {
  NOVICE_LOW: { name: 'Novice Low', cefr: 'A1', description: 'Isolated words and phrases' },
  NOVICE_MID: { name: 'Novice Mid', cefr: 'A1', description: 'Simple sentences' },
  NOVICE_HIGH: { name: 'Novice High', cefr: 'A1-A2', description: 'Sentence-level' },
  INTERMEDIATE_LOW: { name: 'Intermediate Low', cefr: 'A2', description: 'Creating with language' },
  INTERMEDIATE_MID: { name: 'Intermediate Mid', cefr: 'A2-B1', description: 'Paragraph-level' },
  INTERMEDIATE_HIGH: { name: 'Intermediate High', cefr: 'B1', description: 'Narration and description' },
  ADVANCED_LOW: { name: 'Advanced Low', cefr: 'B2', description: 'Full paragraphs' },
  ADVANCED_MID: { name: 'Advanced Mid', cefr: 'B2-C1', description: 'Extended discourse' },
  ADVANCED_HIGH: { name: 'Advanced High', cefr: 'C1', description: 'Sophisticated language' },
  SUPERIOR: { name: 'Superior', cefr: 'C1-C2', description: 'Abstract topics' },
  DISTINGUISHED: { name: 'Distinguished', cefr: 'C2', description: 'Educated native' },
};

/**
 * Language-Specific Certifications
 * Maps official tests to CEFR levels
 */
export const CERTIFICATIONS = {
  // Japanese
  JLPT: {
    name: 'Japanese Language Proficiency Test',
    levels: {
      N5: { cefr: 'A1', description: 'Basic Japanese' },
      N4: { cefr: 'A2', description: 'Basic Japanese' },
      N3: { cefr: 'B1', description: 'Everyday Japanese' },
      N2: { cefr: 'B2', description: 'Business Japanese' },
      N1: { cefr: 'C1', description: 'Advanced Japanese' },
    },
  },
  // Chinese
  HSK: {
    name: 'Hanyu Shuiping Kaoshi',
    levels: {
      HSK1: { cefr: 'A1', vocabulary: 150 },
      HSK2: { cefr: 'A2', vocabulary: 300 },
      HSK3: { cefr: 'B1', vocabulary: 600 },
      HSK4: { cefr: 'B2', vocabulary: 1200 },
      HSK5: { cefr: 'C1', vocabulary: 2500 },
      HSK6: { cefr: 'C2', vocabulary: 5000 },
    },
  },
  // Korean
  TOPIK: {
    name: 'Test of Proficiency in Korean',
    levels: {
      TOPIK1: { cefr: 'A1-A2', description: 'Basic' },
      TOPIK2: { cefr: 'A2', description: 'Basic' },
      TOPIK3: { cefr: 'B1', description: 'Intermediate' },
      TOPIK4: { cefr: 'B2', description: 'Intermediate' },
      TOPIK5: { cefr: 'C1', description: 'Advanced' },
      TOPIK6: { cefr: 'C2', description: 'Advanced' },
    },
  },
  // Spanish
  DELE: {
    name: 'Diplomas de Español como Lengua Extranjera',
    levels: {
      A1: { cefr: 'A1' },
      A2: { cefr: 'A2' },
      B1: { cefr: 'B1' },
      B2: { cefr: 'B2' },
      C1: { cefr: 'C1' },
      C2: { cefr: 'C2' },
    },
  },
  // French
  DELF_DALF: {
    name: 'DELF/DALF (Diplôme d\'Études en Langue Française)',
    levels: {
      DELF_A1: { cefr: 'A1' },
      DELF_A2: { cefr: 'A2' },
      DELF_B1: { cefr: 'B1' },
      DELF_B2: { cefr: 'B2' },
      DALF_C1: { cefr: 'C1' },
      DALF_C2: { cefr: 'C2' },
    },
  },
  // German
  GOETHE: {
    name: 'Goethe-Zertifikat',
    levels: {
      A1: { cefr: 'A1', name: 'Start Deutsch 1' },
      A2: { cefr: 'A2', name: 'Start Deutsch 2' },
      B1: { cefr: 'B1', name: 'Zertifikat Deutsch' },
      B2: { cefr: 'B2', name: 'Goethe-Zertifikat B2' },
      C1: { cefr: 'C1', name: 'Goethe-Zertifikat C1' },
      C2: { cefr: 'C2', name: 'Großes Deutsches Sprachdiplom' },
    },
  },
  // Italian
  CILS: {
    name: 'Certificazione di Italiano come Lingua Straniera',
    levels: {
      A1: { cefr: 'A1' },
      A2: { cefr: 'A2' },
      UNO_B1: { cefr: 'B1' },
      DUE_B2: { cefr: 'B2' },
      TRE_C1: { cefr: 'C1' },
      QUATTRO_C2: { cefr: 'C2' },
    },
  },
  // Portuguese
  CELPE_BRAS: {
    name: 'Certificado de Proficiência em Língua Portuguesa',
    levels: {
      INTERMEDIARIO: { cefr: 'B1' },
      INTERMEDIARIO_SUPERIOR: { cefr: 'B2' },
      AVANCADO: { cefr: 'C1' },
      AVANCADO_SUPERIOR: { cefr: 'C2' },
    },
  },
  // Russian
  TRKI: {
    name: 'Test of Russian as a Foreign Language',
    levels: {
      TEU: { cefr: 'A1', name: 'Elementary' },
      TBU: { cefr: 'A2', name: 'Basic' },
      TRKI1: { cefr: 'B1', name: 'First Level' },
      TRKI2: { cefr: 'B2', name: 'Second Level' },
      TRKI3: { cefr: 'C1', name: 'Third Level' },
      TRKI4: { cefr: 'C2', name: 'Fourth Level' },
    },
  },
  // Arabic
  ALPT: {
    name: 'Arabic Language Proficiency Test',
    levels: {
      LEVEL1: { cefr: 'A1' },
      LEVEL2: { cefr: 'A2' },
      LEVEL3: { cefr: 'B1' },
      LEVEL4: { cefr: 'B2' },
      LEVEL5: { cefr: 'C1' },
      LEVEL6: { cefr: 'C2' },
    },
  },
  // Persian
  AZFA: {
    name: 'Amuzesh Zaban Farsi (Persian Language Certification)',
    levels: {
      PAYEH: { cefr: 'A1-A2', name: 'Foundation' },
      MOTEVASET: { cefr: 'B1-B2', name: 'Intermediate' },
      PISHRAFTE: { cefr: 'C1-C2', name: 'Advanced' },
    },
  },
};

/**
 * Four Skills Assessment Framework
 * Based on CEFR's holistic approach
 */
export const SKILL_DOMAINS = {
  READING: {
    id: 'reading',
    name: 'Reading',
    icon: 'book',
    weight: 0.25,
    subSkills: [
      'Comprehension of written text',
      'Vocabulary recognition',
      'Grammar in context',
      'Inference and deduction',
      'Speed and fluency',
    ],
    assessmentTypes: [
      'Multiple choice comprehension',
      'True/false statements',
      'Gap filling',
      'Matching',
      'Short answer questions',
    ],
  },
  WRITING: {
    id: 'writing',
    name: 'Writing',
    icon: 'create',
    weight: 0.25,
    subSkills: [
      'Spelling and orthography',
      'Grammar accuracy',
      'Vocabulary range',
      'Coherence and cohesion',
      'Task achievement',
    ],
    assessmentTypes: [
      'Sentence completion',
      'Short message writing',
      'Essay writing',
      'Email/letter writing',
      'Summary writing',
    ],
  },
  LISTENING: {
    id: 'listening',
    name: 'Listening',
    icon: 'headset',
    weight: 0.25,
    subSkills: [
      'Understanding main ideas',
      'Understanding details',
      'Understanding speaker attitude',
      'Following extended speech',
      'Understanding varied accents',
    ],
    assessmentTypes: [
      'Multiple choice',
      'Gap filling from audio',
      'Matching speakers to topics',
      'Note completion',
      'Dictation',
    ],
  },
  SPEAKING: {
    id: 'speaking',
    name: 'Speaking',
    icon: 'mic',
    weight: 0.25,
    subSkills: [
      'Pronunciation',
      'Fluency',
      'Grammatical range and accuracy',
      'Lexical resource',
      'Coherence',
      'Interaction',
    ],
    assessmentTypes: [
      'Read aloud',
      'Picture description',
      'Role play',
      'Discussion',
      'Presentation',
    ],
  },
};

/**
 * Placement Test Structure
 * Adaptive testing to determine user's starting level
 */
export const PLACEMENT_TEST = {
  sections: [
    {
      name: 'Grammar & Vocabulary',
      questions: 25,
      timeMinutes: 15,
      adaptive: true,
    },
    {
      name: 'Reading Comprehension',
      questions: 15,
      timeMinutes: 20,
      adaptive: true,
    },
    {
      name: 'Listening Comprehension',
      questions: 15,
      timeMinutes: 15,
      adaptive: true,
    },
    {
      name: 'Writing Sample',
      questions: 2,
      timeMinutes: 15,
      adaptive: false,
    },
  ],
  scoringRubric: {
    A1: { min: 0, max: 20 },
    A2: { min: 21, max: 40 },
    B1: { min: 41, max: 60 },
    B2: { min: 61, max: 80 },
    C1: { min: 81, max: 95 },
    C2: { min: 96, max: 100 },
  },
};

/**
 * Progress Tracking Structure
 */
export const PROGRESS_METRICS = {
  xpPerLevel: {
    A1: 1000,
    A2: 2500,
    B1: 5000,
    B2: 10000,
    C1: 20000,
    C2: 40000,
  },
  skillWeights: {
    vocabulary: 0.2,
    grammar: 0.2,
    reading: 0.15,
    writing: 0.15,
    listening: 0.15,
    speaking: 0.15,
  },
  streakBonuses: {
    7: 1.1,   // 10% bonus at 7 days
    30: 1.2,  // 20% bonus at 30 days
    90: 1.3,  // 30% bonus at 90 days
    365: 1.5, // 50% bonus at 1 year
  },
};

/**
 * Get certification info for a language
 */
export const getCertificationForLanguage = (languageCode) => {
  const certMap = {
    ja: 'JLPT',
    zh: 'HSK',
    ko: 'TOPIK',
    es: 'DELE',
    fr: 'DELF_DALF',
    de: 'GOETHE',
    it: 'CILS',
    pt: 'CELPE_BRAS',
    ru: 'TRKI',
    ar: 'ALPT',
    fa: 'AZFA',
  };
  
  const certKey = certMap[languageCode];
  return certKey ? { key: certKey, ...CERTIFICATIONS[certKey] } : null;
};

/**
 * Calculate estimated CEFR level from user progress
 */
export const estimateCEFRLevel = (userProgress) => {
  const { 
    vocabularyKnown = 0,
    grammarTopicsCompleted = 0,
    hoursStudied = 0,
    averageQuizScore = 0,
  } = userProgress;

  // Weighted scoring
  const vocabScore = Math.min(vocabularyKnown / 16000, 1) * 30;
  const grammarScore = Math.min(grammarTopicsCompleted / 100, 1) * 25;
  const hoursScore = Math.min(hoursStudied / 1000, 1) * 25;
  const quizScore = (averageQuizScore / 100) * 20;

  const totalScore = vocabScore + grammarScore + hoursScore + quizScore;

  // Map to CEFR
  if (totalScore >= 95) return 'C2';
  if (totalScore >= 80) return 'C1';
  if (totalScore >= 60) return 'B2';
  if (totalScore >= 40) return 'B1';
  if (totalScore >= 20) return 'A2';
  return 'A1';
};

/**
 * Get study recommendations for target level
 */
export const getStudyRecommendations = (currentLevel, targetLevel) => {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentIdx = levels.indexOf(currentLevel);
  const targetIdx = levels.indexOf(targetLevel);
  
  if (targetIdx <= currentIdx) {
    return { message: 'You\'ve already reached or surpassed this level!' };
  }

  const levelsToGo = levels.slice(currentIdx + 1, targetIdx + 1);
  const totalHours = levelsToGo.reduce((sum, lvl) => 
    sum + CEFR_LEVELS[lvl].hours - (CEFR_LEVELS[levels[levels.indexOf(lvl) - 1]]?.hours || 0), 0
  );
  const totalVocab = CEFR_LEVELS[targetLevel].vocabulary - CEFR_LEVELS[currentLevel].vocabulary;

  return {
    currentLevel,
    targetLevel,
    estimatedHours: totalHours,
    vocabularyToLearn: totalVocab,
    grammarTopics: CEFR_LEVELS[targetLevel].grammar,
    topicsToStudy: CEFR_LEVELS[targetLevel].topics,
    weeksAtPace: {
      casual: Math.ceil(totalHours / 3),    // 3 hrs/week
      regular: Math.ceil(totalHours / 7),   // 1 hr/day
      intensive: Math.ceil(totalHours / 14), // 2 hrs/day
    },
  };
};

export default {
  CEFR_LEVELS,
  ACTFL_LEVELS,
  CERTIFICATIONS,
  SKILL_DOMAINS,
  PLACEMENT_TEST,
  PROGRESS_METRICS,
  getCertificationForLanguage,
  estimateCEFRLevel,
  getStudyRecommendations,
};
