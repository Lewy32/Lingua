/**
 * StoryMode Exercise
 * Interactive story with vocabulary highlights and comprehension
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { playTTS } from '../services/tts';

const StoryMode = ({
  story, // { title, titleNative, paragraphs: [{ text, translation, vocabulary: [{word, meaning, type}] }] }
  language,
  questions = [], // Comprehension questions
  onComplete,
  onError,
}) => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [learnedWords, setLearnedWords] = useState(new Set());
  const [showQuestions, setShowQuestions] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentParagraph]);

  const current = story.paragraphs[currentParagraph];

  const handlePlayParagraph = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await playTTS(current.text, language);
    } catch (e) {
      console.error('TTS error:', e);
    }
    setIsPlaying(false);
  };

  const handleWordPress = (word) => {
    const vocabItem = current.vocabulary?.find(v => 
      current.text.toLowerCase().includes(v.word.toLowerCase()) &&
      v.word.toLowerCase() === word.toLowerCase()
    );
    if (vocabItem) {
      setSelectedWord(vocabItem);
      setLearnedWords(prev => new Set([...prev, vocabItem.word]));
    }
  };

  const handleNext = () => {
    if (currentParagraph < story.paragraphs.length - 1) {
      fadeAnim.setValue(0);
      setCurrentParagraph(currentParagraph + 1);
      setShowTranslation(false);
    } else if (questions.length > 0) {
      setShowQuestions(true);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentParagraph > 0) {
      fadeAnim.setValue(0);
      setCurrentParagraph(currentParagraph - 1);
      setShowTranslation(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[questionIndex].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      onError?.({
        correct: false,
        question: questions[questionIndex].question,
        userAnswer: answer,
        correctAnswer: questions[questionIndex].correct,
      });
    }

    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setSelectedAnswer(null);
      } else {
        handleComplete();
      }
    }, 1500);
  };

  const handleComplete = () => {
    onComplete?.({
      correct: true,
      paragraphsRead: story.paragraphs.length,
      wordsLearned: Array.from(learnedWords),
      questionsCorrect: score,
      questionsTotal: questions.length,
    });
  };

  const renderTextWithVocabulary = (text) => {
    if (!current.vocabulary?.length) {
      return <Text style={styles.storyText}>{text}</Text>;
    }

    // Simple word-by-word rendering with vocabulary highlights
    const words = text.split(/(\s+)/);
    
    return (
      <Text style={styles.storyText}>
        {words.map((word, index) => {
          const cleanWord = word.replace(/[.,!?;:'"]/g, '');
          const isVocab = current.vocabulary?.some(v => 
            v.word.toLowerCase() === cleanWord.toLowerCase()
          );
          const isLearned = learnedWords.has(cleanWord);

          if (isVocab) {
            return (
              <Text
                key={index}
                style={[
                  styles.vocabWord,
                  isLearned && styles.vocabWordLearned,
                ]}
                onPress={() => handleWordPress(cleanWord)}
              >
                {word}
              </Text>
            );
          }
          return word;
        })}
      </Text>
    );
  };

  const progress = ((currentParagraph + 1) / story.paragraphs.length) * 100;

  if (showQuestions && questions.length > 0) {
    const currentQ = questions[questionIndex];
    
    return (
      <View style={styles.container}>
        <View style={styles.questionHeader}>
          <Ionicons name="help-circle" size={24} color={colors.primary} />
          <Text style={styles.questionHeaderText}>Comprehension Check</Text>
          <Text style={styles.questionCount}>
            {questionIndex + 1}/{questions.length}
          </Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQ.question}</Text>
        </View>

        <View style={styles.answersContainer}>
          {currentQ.options.map((option, index) => {
            let optionStyle = styles.answerOption;
            if (selectedAnswer !== null) {
              if (option === currentQ.correct) {
                optionStyle = [styles.answerOption, styles.answerCorrect];
              } else if (option === selectedAnswer) {
                optionStyle = [styles.answerOption, styles.answerWrong];
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.answerText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Story title */}
      <View style={styles.titleSection}>
        <Text style={styles.titleNative}>{story.titleNative}</Text>
        <Text style={styles.title}>{story.title}</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentParagraph + 1} / {story.paragraphs.length}
        </Text>
      </View>

      {/* Story content */}
      <ScrollView style={styles.storyContainer}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.paragraphCard}>
            {renderTextWithVocabulary(current.text)}
            
            <TouchableOpacity
              style={styles.audioButton}
              onPress={handlePlayParagraph}
            >
              <Ionicons 
                name={isPlaying ? "volume-high" : "volume-medium"} 
                size={20} 
                color={colors.primary} 
              />
            </TouchableOpacity>
          </View>

          {/* Translation toggle */}
          <TouchableOpacity
            style={styles.translationToggle}
            onPress={() => setShowTranslation(!showTranslation)}
          >
            <Ionicons 
              name={showTranslation ? "eye-off" : "eye"} 
              size={18} 
              color={colors.primary} 
            />
            <Text style={styles.translationToggleText}>
              {showTranslation ? 'Hide' : 'Show'} translation
            </Text>
          </TouchableOpacity>

          {showTranslation && (
            <View style={styles.translationBox}>
              <Text style={styles.translationText}>{current.translation}</Text>
            </View>
          )}

          {/* Vocabulary section */}
          {current.vocabulary?.length > 0 && (
            <View style={styles.vocabSection}>
              <Text style={styles.vocabTitle}>
                <Ionicons name="book" size={16} color={colors.textSecondary} />
                {' '}Vocabulary ({learnedWords.size}/{current.vocabulary.length})
              </Text>
              <View style={styles.vocabList}>
                {current.vocabulary.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.vocabPill,
                      learnedWords.has(item.word) && styles.vocabPillLearned,
                    ]}
                    onPress={() => setSelectedWord(item)}
                  >
                    <Text style={styles.vocabPillText}>{item.word}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentParagraph === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentParagraph === 0}
        >
          <Ionicons name="arrow-back" size={24} color={currentParagraph === 0 ? colors.border : colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleNext}
        >
          <Text style={styles.continueButtonText}>
            {currentParagraph < story.paragraphs.length - 1 ? 'Continue' : 
             questions.length > 0 ? 'Quiz Time!' : 'Finish'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Word detail modal */}
      <Modal
        visible={selectedWord !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedWord(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedWord(null)}
        >
          <View style={styles.wordModal}>
            <Text style={styles.wordModalTitle}>{selectedWord?.word}</Text>
            <Text style={styles.wordModalMeaning}>{selectedWord?.meaning}</Text>
            <View style={styles.wordModalType}>
              <Text style={styles.wordModalTypeText}>{selectedWord?.type}</Text>
            </View>
            <TouchableOpacity
              style={styles.wordModalPlayButton}
              onPress={() => playTTS(selectedWord?.word, language)}
            >
              <Ionicons name="volume-medium" size={20} color="#fff" />
              <Text style={styles.wordModalPlayText}>Listen</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleSection: {
    padding: 20,
    paddingBottom: 12,
    backgroundColor: colors.surface,
  },
  titleNative: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  storyContainer: {
    flex: 1,
    padding: 20,
  },
  paragraphCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    position: 'relative',
  },
  storyText: {
    fontSize: 20,
    lineHeight: 32,
    color: colors.text,
  },
  vocabWord: {
    color: colors.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  vocabWordLearned: {
    color: colors.success,
    textDecorationColor: colors.success,
  },
  audioButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
  },
  translationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  translationToggleText: {
    color: colors.primary,
    fontSize: 14,
  },
  translationBox: {
    backgroundColor: colors.infoLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  translationText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  vocabSection: {
    marginTop: 16,
  },
  vocabTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  vocabList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vocabPill: {
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  vocabPillLearned: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  vocabPillText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  navigation: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  continueButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  wordModal: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  wordModalTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  wordModalMeaning: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  wordModalType: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  wordModalTypeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  wordModalPlayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  wordModalPlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 8,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  questionHeaderText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  questionCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  questionCard: {
    margin: 20,
    padding: 24,
    backgroundColor: colors.surface,
    borderRadius: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  answersContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  answerOption: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  answerCorrect: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  answerWrong: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  answerText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
});

export default StoryMode;
