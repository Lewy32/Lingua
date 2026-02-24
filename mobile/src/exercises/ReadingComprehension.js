import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { FarsiText, Button } from '../components';

const ReadingComprehension = ({ 
  exercise, 
  onComplete,
  onCorrect,
  onIncorrect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const passage = exercise.passage || exercise.questionFarsi || '';
  const translation = exercise.translation || exercise.question || '';
  const questions = exercise.questions || [
    {
      question: exercise.question,
      options: exercise.options,
      correctAnswer: exercise.correctAnswer,
    }
  ];

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    setIsAnswered(true);
    const isCorrect = selectedAnswer === questions[0].correctAnswer;
    
    if (isCorrect) {
      onCorrect?.();
    } else {
      onIncorrect?.();
    }

    setTimeout(() => {
      onComplete?.(isCorrect);
    }, 1500);
  };

  const getOptionStyle = (option) => {
    if (!isAnswered) {
      return selectedAnswer === option ? styles.selectedOption : {};
    }
    
    if (option === questions[0].correctAnswer) {
      return styles.correctOption;
    }
    
    if (option === selectedAnswer && option !== questions[0].correctAnswer) {
      return styles.incorrectOption;
    }
    
    return {};
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Passage */}
        <View style={styles.passageContainer}>
          <View style={styles.passageHeader}>
            <Ionicons name="book" size={20} color={colors.primary} />
            <Text style={styles.passageLabel}>Read this passage:</Text>
          </View>
          
          <View style={styles.passageCard}>
            <FarsiText size="large" style={styles.passageText}>
              {passage}
            </FarsiText>
          </View>

          <TouchableOpacity 
            style={styles.translationToggle}
            onPress={() => setShowTranslation(!showTranslation)}
          >
            <Ionicons 
              name={showTranslation ? "eye-off" : "eye"} 
              size={18} 
              color={colors.textSecondary} 
            />
            <Text style={styles.translationToggleText}>
              {showTranslation ? 'Hide translation' : 'Show translation'}
            </Text>
          </TouchableOpacity>

          {showTranslation && (
            <View style={styles.translationCard}>
              <Text style={styles.translationText}>{translation}</Text>
            </View>
          )}
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionLabel}>Answer this question:</Text>
          <Text style={styles.question}>{questions[0].question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {questions[0].options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, getOptionStyle(option)]}
              onPress={() => !isAnswered && setSelectedAnswer(option)}
              disabled={isAnswered}
            >
              <View style={styles.optionNumber}>
                <Text style={styles.optionNumberText}>{String.fromCharCode(65 + index)}</Text>
              </View>
              <Text style={styles.optionText}>{option}</Text>
              
              {isAnswered && option === questions[0].correctAnswer && (
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              )}
              {isAnswered && option === selectedAnswer && option !== questions[0].correctAnswer && (
                <Ionicons name="close-circle" size={24} color={colors.error} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {!isAnswered && (
        <Button
          title="Check Answer"
          onPress={handleSubmit}
          disabled={!selectedAnswer}
          style={styles.checkButton}
        />
      )}

      {isAnswered && (
        <View style={[
          styles.feedback,
          selectedAnswer === questions[0].correctAnswer ? styles.feedbackCorrect : styles.feedbackIncorrect
        ]}>
          <Ionicons 
            name={selectedAnswer === questions[0].correctAnswer ? "checkmark-circle" : "close-circle"} 
            size={28} 
            color={colors.textWhite} 
          />
          <Text style={styles.feedbackText}>
            {selectedAnswer === questions[0].correctAnswer ? 'Correct!' : 'Keep practicing!'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  passageContainer: {
    marginBottom: 24,
  },
  passageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  passageLabel: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  passageCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  passageText: {
    lineHeight: 36,
  },
  translationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  translationToggleText: {
    color: colors.textSecondary,
    marginLeft: 6,
    fontSize: 14,
  },
  translationCard: {
    backgroundColor: colors.backgroundTertiary,
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  translationText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionNumberText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  correctOption: {
    borderColor: colors.success,
    backgroundColor: colors.success + '20',
  },
  incorrectOption: {
    borderColor: colors.error,
    backgroundColor: colors.error + '20',
  },
  checkButton: {
    marginTop: 'auto',
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },
  feedbackCorrect: {
    backgroundColor: colors.success,
  },
  feedbackIncorrect: {
    backgroundColor: colors.error,
  },
  feedbackText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default ReadingComprehension;
