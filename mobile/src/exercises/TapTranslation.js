/**
 * TapTranslation Exercise
 * Tap words in correct order to form a sentence
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors } from '../constants/colors';

const TapTranslation = ({
  sourceText,
  sourceLanguage,
  targetLanguage,
  wordBank,
  correctOrder,
  onComplete,
  onError,
}) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [shakeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Shuffle word bank
    const shuffled = [...wordBank].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled.map((word, idx) => ({ word, id: idx, used: false })));
    setSelectedWords([]);
  }, [wordBank]);

  const handleWordTap = (wordObj) => {
    if (wordObj.used) return;

    // Add to selected
    setSelectedWords([...selectedWords, wordObj]);
    
    // Mark as used
    setAvailableWords(availableWords.map(w => 
      w.id === wordObj.id ? { ...w, used: true } : w
    ));
  };

  const handleSelectedTap = (wordObj, index) => {
    // Remove from selected
    const newSelected = selectedWords.filter((_, i) => i !== index);
    setSelectedWords(newSelected);

    // Mark as available again
    setAvailableWords(availableWords.map(w =>
      w.id === wordObj.id ? { ...w, used: false } : w
    ));
  };

  const checkAnswer = () => {
    const userAnswer = selectedWords.map(w => w.word);
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctOrder);

    if (isCorrect) {
      onComplete?.({
        correct: true,
        userAnswer,
        correctAnswer: correctOrder,
      });
    } else {
      // Shake animation
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();

      onError?.({
        correct: false,
        userAnswer,
        correctAnswer: correctOrder,
        explanation: `The correct order is: "${correctOrder.join(' ')}"`,
      });
    }
  };

  const isComplete = selectedWords.length === correctOrder.length;

  return (
    <View style={styles.container}>
      {/* Source text */}
      <View style={styles.sourceContainer}>
        <Text style={styles.sourceLabel}>{sourceLanguage}</Text>
        <Text style={styles.sourceText}>{sourceText}</Text>
      </View>

      {/* Target label */}
      <Text style={styles.targetLabel}>Translate to {targetLanguage}</Text>

      {/* Selected words area */}
      <Animated.View 
        style={[
          styles.selectedArea,
          { transform: [{ translateX: shakeAnim }] }
        ]}
      >
        {selectedWords.length === 0 ? (
          <Text style={styles.placeholder}>Tap words below to build the sentence</Text>
        ) : (
          <View style={styles.selectedWords}>
            {selectedWords.map((wordObj, index) => (
              <TouchableOpacity
                key={`selected-${wordObj.id}-${index}`}
                style={styles.selectedWord}
                onPress={() => handleSelectedTap(wordObj, index)}
              >
                <Text style={styles.selectedWordText}>{wordObj.word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Animated.View>

      {/* Word bank */}
      <View style={styles.wordBank}>
        {availableWords.map((wordObj) => (
          <TouchableOpacity
            key={`bank-${wordObj.id}`}
            style={[
              styles.wordButton,
              wordObj.used && styles.wordButtonUsed,
            ]}
            onPress={() => handleWordTap(wordObj)}
            disabled={wordObj.used}
          >
            <Text style={[
              styles.wordText,
              wordObj.used && styles.wordTextUsed,
            ]}>
              {wordObj.word}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Check button */}
      <TouchableOpacity
        style={[styles.checkButton, !isComplete && styles.checkButtonDisabled]}
        onPress={checkAnswer}
        disabled={!isComplete}
      >
        <Text style={styles.checkButtonText}>Check Answer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sourceContainer: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  sourceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sourceText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  targetLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  selectedArea: {
    minHeight: 100,
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: 16,
    marginBottom: 24,
    justifyContent: 'center',
  },
  placeholder: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
  },
  selectedWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedWord: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  selectedWordText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  wordBank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 32,
  },
  wordButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  wordButtonUsed: {
    backgroundColor: colors.background,
    borderColor: colors.background,
  },
  wordText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  wordTextUsed: {
    color: colors.background,
  },
  checkButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkButtonDisabled: {
    backgroundColor: colors.border,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TapTranslation;
