/**
 * Database Seed Script
 * Populates initial data for development/testing
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Achievements
  const achievements = [
    { code: 'first_lesson', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', type: 'LESSONS_COMPLETED', requirement: 1, xpReward: 50 },
    { code: 'streak_7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', type: 'STREAK', requirement: 7, xpReward: 100 },
    { code: 'streak_30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '💪', type: 'STREAK', requirement: 30, xpReward: 500 },
    { code: 'streak_100', name: 'Century Club', description: 'Maintain a 100-day streak', icon: '🏆', type: 'STREAK', requirement: 100, xpReward: 1000 },
    { code: 'streak_365', name: 'Year of Dedication', description: 'Maintain a 365-day streak', icon: '👑', type: 'STREAK', requirement: 365, xpReward: 5000 },
    { code: 'words_100', name: 'Vocabulary Builder', description: 'Learn 100 words', icon: '📚', type: 'WORDS_LEARNED', requirement: 100, xpReward: 100 },
    { code: 'words_500', name: 'Word Collector', description: 'Learn 500 words', icon: '📖', type: 'WORDS_LEARNED', requirement: 500, xpReward: 500 },
    { code: 'words_1000', name: 'Lexicon Legend', description: 'Learn 1000 words', icon: '🎓', type: 'WORDS_LEARNED', requirement: 1000, xpReward: 1000 },
    { code: 'lessons_10', name: 'Getting Started', description: 'Complete 10 lessons', icon: '📝', type: 'LESSONS_COMPLETED', requirement: 10, xpReward: 100 },
    { code: 'lessons_50', name: 'Dedicated Learner', description: 'Complete 50 lessons', icon: '⭐', type: 'LESSONS_COMPLETED', requirement: 50, xpReward: 500 },
    { code: 'lessons_100', name: 'Century Learner', description: 'Complete 100 lessons', icon: '🌟', type: 'LESSONS_COMPLETED', requirement: 100, xpReward: 1000 },
    { code: 'perfect_10', name: 'Perfectionist', description: 'Get 10 perfect lesson scores', icon: '💯', type: 'PERFECT_LESSON', requirement: 10, xpReward: 200 },
    { code: 'xp_1000', name: 'XP Hunter', description: 'Earn 1000 XP', icon: '⚡', type: 'XP_EARNED', requirement: 1000, xpReward: 100 },
    { code: 'xp_10000', name: 'XP Master', description: 'Earn 10000 XP', icon: '🔋', type: 'XP_EARNED', requirement: 10000, xpReward: 500 },
    { code: 'level_a2', name: 'Elementary', description: 'Reach A2 level', icon: '🥉', type: 'LEVEL_REACHED', requirement: 2, xpReward: 200 },
    { code: 'level_b1', name: 'Intermediate', description: 'Reach B1 level', icon: '🥈', type: 'LEVEL_REACHED', requirement: 3, xpReward: 500 },
    { code: 'level_b2', name: 'Upper Intermediate', description: 'Reach B2 level', icon: '🥇', type: 'LEVEL_REACHED', requirement: 4, xpReward: 1000 },
    { code: 'level_c1', name: 'Advanced', description: 'Reach C1 level', icon: '🏅', type: 'LEVEL_REACHED', requirement: 5, xpReward: 2000 },
    { code: 'friends_5', name: 'Social Learner', description: 'Add 5 friends', icon: '👥', type: 'SOCIAL', requirement: 5, xpReward: 100 },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { code: achievement.code },
      update: achievement,
      create: achievement,
    });
  }
  console.log(`✓ Seeded ${achievements.length} achievements`);

  // Seed sample lessons (Japanese A1)
  const japaneseLessons = [
    {
      languageCode: 'ja',
      unitNumber: 1,
      lessonNumber: 1,
      title: 'Greetings',
      titleNative: '挨拶',
      description: 'Learn basic Japanese greetings',
      cefrLevel: 'A1',
      estimatedMinutes: 5,
      xpReward: 10,
      exercises: [
        { type: 'multipleChoice', question: 'How do you say "Hello" in Japanese?', options: ['こんにちは', 'さようなら', 'ありがとう', 'すみません'], correct: 'こんにちは' },
        { type: 'multipleChoice', question: 'What does "ありがとう" mean?', options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'], correct: 'Thank you' },
      ],
      vocabulary: [
        { word: 'こんにちは', reading: 'konnichiwa', meaning: 'Hello' },
        { word: 'さようなら', reading: 'sayounara', meaning: 'Goodbye' },
        { word: 'ありがとう', reading: 'arigatou', meaning: 'Thank you' },
      ],
      grammar: { point: 'Basic greetings are set phrases', explanation: 'Japanese greetings are typically fixed expressions.' },
    },
    {
      languageCode: 'ja',
      unitNumber: 1,
      lessonNumber: 2,
      title: 'Self Introduction',
      titleNative: '自己紹介',
      description: 'Introduce yourself in Japanese',
      cefrLevel: 'A1',
      estimatedMinutes: 7,
      xpReward: 15,
      exercises: [],
      vocabulary: [
        { word: '私', reading: 'watashi', meaning: 'I/me' },
        { word: '名前', reading: 'namae', meaning: 'name' },
        { word: 'です', reading: 'desu', meaning: 'is/am/are' },
      ],
      grammar: { point: 'X は Y です', explanation: 'Basic sentence structure: X is Y' },
    },
  ];

  for (const lesson of japaneseLessons) {
    await prisma.lesson.upsert({
      where: {
        languageCode_unitNumber_lessonNumber: {
          languageCode: lesson.languageCode,
          unitNumber: lesson.unitNumber,
          lessonNumber: lesson.lessonNumber,
        },
      },
      update: lesson,
      create: lesson,
    });
  }
  console.log(`✓ Seeded ${japaneseLessons.length} sample lessons`);

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
