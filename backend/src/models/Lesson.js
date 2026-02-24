const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  chapterNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  titleFarsi: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  culturalContent: {
    title: String,
    content: String,
    facts: [String]
  },
  vocabulary: [{
    word: String,
    farsi: String,
    pronunciation: String,
    partOfSpeech: String,
    example: String,
    exampleFarsi: String
  }],
  exercises: [{
    type: {
      type: String,
      enum: ['vocabularyMatch', 'flashCard', 'multipleChoice', 'reading', 'writing', 'speaking', 'fillInBlanks'],
      required: true
    },
    question: String,
    questionFarsi: String,
    options: [String],
    correctAnswer: mongoose.Schema.Types.Mixed,
    audioUrl: String
  }],
  grammarPoints: [{
    title: String,
    explanation: String,
    examples: [String]
  }],
  xpReward: {
    type: Number,
    default: 100
  },
  requiredLevel: {
    type: Number,
    default: 1
  },
  order: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);
