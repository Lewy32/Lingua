import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Keyboard,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { FarsiText, Button } from '../components';
import { comparePersian, isRTL } from '../utils/farsiUtils';

const FillInBlanks = ({ 
  exercise, 
  onComplete,
  onCorrect,
  onIncorrect,
}) => {
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const sentence = exercise.questionFarsi || exercise.question || '';
  const hint = exercise.question || '';
  const expectedAnswer = exercise.correctAnswer || '';
  const isExpectingFarsi = isRTL(expectedAnswer);

  // Split sentence by blank indicator
  const renderSentence = () => {
    const parts = sentence.split('___');
    if (parts.length < 2) {
      // Try other blank formats
      const altParts = sentence.split('_');
      if (altParts.length >= 2) {
        return { before: altParts[0], after: altParts.slice(1).join('_') };
      }
      return { before: sentence, after: '' };
    }
    return { before: parts[0], after: parts[1] };
  };

  const { before, after } = renderSentence();

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    
    Keyboard.dismiss();
    setIsAnswered(true);

    let correct;
    if (isExpectingFarsi) {
      correct = comparePersian(userInput, expectedAnswer);
    } else {
      correct = userInput.trim().toLowerCase() === expectedAnswer.toLowerCase();
    }

    setIsCorrect(correct);

    if (correct) {
      onCorrect?.();
    } else {
      onIncorrect?.();
      // Shake animation
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }

    setTimeout(() => {
      onComplete?.(correct);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>Complete the sentence</Text>
      
      {hint && (
        <Text style={styles.hint}>({hint})</Text>
      )}

      <Animated.View 
        style={[
          styles.sentenceContainer,
          { transform: [{ translateX: shakeAnim }] }
        ]}
      >
        {isExpectingFarsi ? (
          // RTL layout for Farsi sentences
          <View style={styles.sentenceRow}>
            {after && (
              <FarsiText size="large" style={styles.sentencePart}>
                {after}
              </FarsiText>
            )}
            
            <View style={[
              styles.inputWrapper,
              isAnswered && (isCorrect ? styles.inputCorrect : styles.inputIncorrect),
            ]}>
              <TextInput
                ref={inputRef}
                style={[styles.blankInput, styles.farsiInput]}
                value={userInput}
                onChangeText={setUserInput}
                placeholder="___"
                placeholderTextColor={colors.textLight}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isAnswered}
                textAlign="center"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              {isAnswered && (
                <Ionicons 
                  name={isCorrect ? "checkmark-circle" : "close-circle"} 
                  size={20} 
                  color={isCorrect ? colors.success : colors.error}
                  style={styles.resultIcon}
                />
              )}
            </View>

            {before && (
              <FarsiText size="large" style={styles.sentencePart}>
                {before}
              </FarsiText>
            )}
          </View>
        ) : (
          // LTR layout for English
          <View style={styles.sentenceRow}>
            {before && (
              <Text style={styles.sentencePartLTR}>{before}</Text>
            )}
            
            <View style={[
              styles.inputWrapper,
              isAnswered && (isCorrect ? styles.inputCorrect : styles.inputIncorrect),
            ]}>
              <TextInput
                ref={inputRef}
                style={styles.blankInput}
                value={userInput}
                onChangeText={setUserInput}
                placeholder="___"
                placeholderTextColor={colors.textLight}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isAnswered}
                textAlign="center"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              {isAnswered && (
                <Ionicons 
                  name={isCorrect ? "checkmark-circle" : "close-circle"} 
                  size={20} 
                  color={isCorrect ? colors.success : colors.error}
                  style={styles.resultIcon}
                />
              )}
            </View>

            {after && (
              <Text style={styles.sentencePartLTR}>{after}</Text>
            )}
          </View>
        )}
      </Animated.View>

      {isAnswered && !isCorrect && (
        <View style={styles.correctAnswerContainer}>
          <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
          {isExpectingFarsi ? (
            <FarsiText size="large" style={styles.correctAnswerText}>
              {expectedAnswer}
            </FarsiText>
          ) : (
            <Text style={styles.correctAnswerTextLTR}>{expectedAnswer}</Text>
          )}
        </View>
      )}

      {isAnswered && isCorrect && (
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={48} color={colors.success} />
          <Text style={styles.successText}>Correct!</Text>
        </View>
      )}

      {!isAnswered && (
        <Button
          title="Check"
          onPress={handleSubmit}
          disabled={!userInput.trim()}
          style={styles.checkButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  instruction: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  sentenceContainer: {
    backgroundColor: colors.backgroundSecondary,
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  sentenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentencePart: {
    marginHorizontal: 4,
  },
  sentencePartLTR: {
    fontSize: 20,
    color: colors.text,
    marginHorizontal: 4,
  },
  inputWrapper: {
    position: 'relative',
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
    marginHorizontal: 8,
    paddingBottom: 4,
  },
  inputCorrect: {
    borderBottomColor: colors.success,
  },
  inputIncorrect: {
    borderBottomColor: colors.error,
  },
  blankInput: {
    fontSize: 20,
    color: colors.primary,
    minWidth: 100,
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  farsiInput: {
    fontFamily: 'System',
    writingDirection: 'rtl',
  },
  resultIcon: {
    position: 'absolute',
    right: -24,
    top: '50%',
    marginTop: -10,
  },
  correctAnswerContainer: {
    backgroundColor: colors.backgroundTertiary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  correctAnswerText: {
    color: colors.success,
  },
  correctAnswerTextLTR: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.success,
  },
  successContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.success,
    marginTop: 12,
  },
  checkButton: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});

export default FillInBlanks;
