/**
 * DictationExercise
 * Listen and write down exactly what you hear
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { playTTS } from '../services/tts';

const DictationExercise = ({
  sentences, // Array of { text, translation }
  language,
  onComplete,
  onError,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null);
  const [playCount, setPlayCount] = useState(0);

  const current = sentences[currentIndex];

  const handlePlay = async (slow = false) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await playTTS(current.text, language, { rate: slow ? 0.6 : 1.0 });
      setPlayCount(prev => prev + 1);
    } catch (e) {
      console.error('TTS error:', e);
    } finally {
      setIsPlaying(false);
    }
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:'"،؛]/g, '')
      .replace(/\s+/g, ' ');
  };

  const calculateAccuracy = (user, correct) => {
    const userWords = normalizeText(user).split(' ');
    const correctWords = normalizeText(correct).split(' ');
    
    let matchCount = 0;
    correctWords.forEach((word, i) => {
      if (userWords[i] === word) matchCount++;
    });
    
    return Math.round((matchCount / correctWords.length) * 100);
  };

  const handleCheck = () => {
    const accuracy = calculateAccuracy(userInput, current.text);
    const isCorrect = accuracy >= 80; // 80% threshold

    const attempt = {
      sentence: current.text,
      userAnswer: userInput,
      accuracy,
      correct: isCorrect,
    };
    
    setAttempts([...attempts, attempt]);
    setShowFeedback({ isCorrect, accuracy });

    if (!isCorrect) {
      onError?.({
        correct: false,
        userAnswer: userInput,
        correctAnswer: current.text,
        accuracy,
        explanation: `Your accuracy: ${accuracy}%. The correct text is: "${current.text}"`,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setShowFeedback(null);
      setPlayCount(0);
    } else {
      // All done
      const correctCount = attempts.filter(a => a.correct).length + (showFeedback?.isCorrect ? 1 : 0);
      onComplete?.({
        correct: true,
        totalSentences: sentences.length,
        correctSentences: correctCount,
        attempts: [...attempts, { ...attempts[attempts.length - 1], ...showFeedback }],
      });
    }
  };

  const progress = ((currentIndex + (showFeedback ? 1 : 0)) / sentences.length) * 100;

  return (
    <View style={styles.container}>
      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {sentences.length}
        </Text>
      </View>

      {/* Instructions */}
      <Text style={styles.instruction}>
        Listen carefully and write exactly what you hear
      </Text>

      {/* Audio controls */}
      <View style={styles.audioSection}>
        <TouchableOpacity
          style={[styles.playButton, isPlaying && styles.playButtonActive]}
          onPress={() => handlePlay(false)}
          disabled={isPlaying || showFeedback !== null}
        >
          {isPlaying ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <Ionicons name="play" size={36} color="#fff" />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.slowButton}
          onPress={() => handlePlay(true)}
          disabled={isPlaying || showFeedback !== null}
        >
          <Ionicons name="speedometer-outline" size={20} color={colors.primary} />
          <Text style={styles.slowText}>Slower</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.playCountText}>
        Played {playCount} time{playCount !== 1 ? 's' : ''}
      </Text>

      {/* Translation hint */}
      {current.translation && (
        <View style={styles.hintBox}>
          <Ionicons name="language" size={16} color={colors.textSecondary} />
          <Text style={styles.hintText}>Meaning: {current.translation}</Text>
        </View>
      )}

      {/* Input area */}
      <TextInput
        style={[
          styles.textInput,
          showFeedback && (showFeedback.isCorrect ? styles.inputCorrect : styles.inputWrong),
        ]}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type what you hear..."
        placeholderTextColor={colors.textSecondary}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        editable={!showFeedback}
      />

      {/* Feedback */}
      {showFeedback && (
        <View style={[
          styles.feedbackBox,
          showFeedback.isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
        ]}>
          <View style={styles.feedbackHeader}>
            <Ionicons 
              name={showFeedback.isCorrect ? "checkmark-circle" : "close-circle"} 
              size={24} 
              color={showFeedback.isCorrect ? colors.success : colors.error} 
            />
            <Text style={[
              styles.feedbackTitle,
              { color: showFeedback.isCorrect ? colors.success : colors.error }
            ]}>
              {showFeedback.isCorrect ? 'Great job!' : 'Not quite right'}
            </Text>
            <Text style={styles.accuracyBadge}>{showFeedback.accuracy}%</Text>
          </View>
          
          {!showFeedback.isCorrect && (
            <View style={styles.correctionBox}>
              <Text style={styles.correctionLabel}>Correct answer:</Text>
              <Text style={styles.correctionText}>{current.text}</Text>
            </View>
          )}
        </View>
      )}

      {/* Action button */}
      {!showFeedback ? (
        <TouchableOpacity
          style={[styles.checkButton, !userInput.trim() && styles.buttonDisabled]}
          onPress={handleCheck}
          disabled={!userInput.trim()}
        >
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex < sentences.length - 1 ? 'Next' : 'Finish'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
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
    fontWeight: '600',
  },
  instruction: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  audioSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 12,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonActive: {
    backgroundColor: colors.primaryDark,
  },
  slowButton: {
    alignItems: 'center',
    padding: 8,
  },
  slowText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  playCountText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 16,
  },
  hintBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  hintText: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: 16,
  },
  inputCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  inputWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  feedbackBox: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  feedbackCorrect: {
    backgroundColor: colors.successLight,
  },
  feedbackWrong: {
    backgroundColor: colors.errorLight,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  accuracyBadge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  correctionBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 8,
  },
  correctionLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  correctionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  checkButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: colors.success,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DictationExercise;
