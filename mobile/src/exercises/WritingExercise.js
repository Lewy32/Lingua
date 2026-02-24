import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Keyboard,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { FarsiText, Button } from '../components';
import { normalizePersian, comparePersian, isRTL } from '../utils/farsiUtils';

const WritingExercise = ({ 
  exercise, 
  onComplete,
  onCorrect,
  onIncorrect,
}) => {
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const expectedAnswer = exercise.correctAnswer || '';
  const isExpectingFarsi = isRTL(expectedAnswer);

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    
    Keyboard.dismiss();
    setIsAnswered(true);

    // Compare using Persian normalization if expecting Farsi
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
      // Shake animation for incorrect
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

  const handleTryAgain = () => {
    setUserInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    inputRef.current?.focus();
  };

  const getHint = () => {
    if (!expectedAnswer) return '';
    // Show first and last character
    if (expectedAnswer.length <= 2) return expectedAnswer[0] + '...';
    return expectedAnswer[0] + '...' + expectedAnswer[expectedAnswer.length - 1];
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.instruction}>{exercise.question}</Text>
        
        {exercise.questionFarsi && !isExpectingFarsi && (
          <FarsiText size="xlarge" style={styles.questionFarsi}>
            {exercise.questionFarsi}
          </FarsiText>
        )}

        {exercise.englishPrompt && isExpectingFarsi && (
          <Text style={styles.englishPrompt}>{exercise.englishPrompt}</Text>
        )}
      </View>

      <Animated.View 
        style={[
          styles.inputContainer,
          isAnswered && (isCorrect ? styles.inputCorrect : styles.inputIncorrect),
          { transform: [{ translateX: shakeAnim }] }
        ]}
      >
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            isExpectingFarsi && styles.farsiInput,
          ]}
          value={userInput}
          onChangeText={setUserInput}
          placeholder={isExpectingFarsi ? 'Type in Farsi...' : 'Type your answer...'}
          placeholderTextColor={colors.textLight}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isAnswered}
          textAlign={isExpectingFarsi ? 'right' : 'left'}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        
        {isAnswered && (
          <View style={styles.resultIcon}>
            <Ionicons 
              name={isCorrect ? "checkmark-circle" : "close-circle"} 
              size={28} 
              color={isCorrect ? colors.success : colors.error} 
            />
          </View>
        )}
      </Animated.View>

      {!isAnswered && (
        <TouchableOpacity 
          style={styles.hintButton}
          onPress={() => setShowHint(!showHint)}
        >
          <Ionicons name="bulb-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.hintButtonText}>
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </Text>
        </TouchableOpacity>
      )}

      {showHint && !isAnswered && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Hint: {getHint()}</Text>
        </View>
      )}

      {isAnswered && !isCorrect && (
        <View style={styles.correctAnswerContainer}>
          <Text style={styles.correctAnswerLabel}>Correct answer:</Text>
          {isExpectingFarsi ? (
            <FarsiText size="large" style={styles.correctAnswerFarsi}>
              {expectedAnswer}
            </FarsiText>
          ) : (
            <Text style={styles.correctAnswer}>{expectedAnswer}</Text>
          )}
        </View>
      )}

      {isAnswered && isCorrect && (
        <View style={styles.successContainer}>
          <Ionicons name="star" size={32} color={colors.xp} />
          <Text style={styles.successText}>Perfect!</Text>
        </View>
      )}

      {!isAnswered ? (
        <Button
          title="Check"
          onPress={handleSubmit}
          disabled={!userInput.trim()}
          style={styles.checkButton}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  questionFarsi: {
    marginTop: 8,
  },
  englishPrompt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  inputCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '20',
  },
  inputIncorrect: {
    borderColor: colors.error,
    backgroundColor: colors.error + '20',
  },
  input: {
    flex: 1,
    padding: 20,
    fontSize: 20,
    color: colors.text,
  },
  farsiInput: {
    fontFamily: 'System',
    writingDirection: 'rtl',
  },
  resultIcon: {
    marginLeft: 8,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 8,
  },
  hintButtonText: {
    color: colors.textSecondary,
    marginLeft: 6,
    fontSize: 14,
  },
  hintContainer: {
    backgroundColor: colors.backgroundTertiary,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  hintText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  correctAnswerContainer: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  correctAnswerLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  correctAnswer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.success,
  },
  correctAnswerFarsi: {
    color: colors.success,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.success,
    marginTop: 8,
  },
  checkButton: {
    marginTop: 'auto',
    marginBottom: 20,
  },
});

export default WritingExercise;
