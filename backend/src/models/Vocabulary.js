const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  farsi: {
    type: String,
    required: true
  },
  pronunciation: {
    type: String,
    required: true
  },
  partOfSpeech: {
    type: String,
    enum: ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'phrase'],
    required: true
  },
  definition: {
    type: String,
    required: true
  },
  example: {
    type: String
  },
  exampleFarsi: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  culturalNote: {
    type: String
  },
  tags: [String]
}, {
  timestamps: true
});

vocabularySchema.index({ word: 1 });
vocabularySchema.index({ farsi: 1 });
vocabularySchema.index({ level: 1 });
vocabularySchema.index({ category: 1 });

module.exports = mongoose.model('Vocabulary', vocabularySchema);
