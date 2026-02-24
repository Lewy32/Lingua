/**
 * CultureQuiz Exercise
 * Learn cultural facts through quiz format
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const CultureQuiz = ({
  questions, // [{ question, options, correct, explanation, image?, funFact? }]
  culture,
  onComplete,
  onError,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const current = questions[currentIndex];

  const handleSelect = (option) => {
    if (showResult) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    const isCorrect = selectedOption === current.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      onError?.({
        correct: false,
        question: current.question,
        userAnswer: selectedOption,
        correctAnswer: current.correct,
        explanation: current.explanation,
      });
    }

    setAnswers([...answers, {
      question: current.question,
      userAnswer: selectedOption,
      correct: isCorrect,
    }]);
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Quiz complete
      onComplete?.({
        correct: true,
        score,
        total: questions.length,
        answers,
        percentage: Math.round((score / questions.length) * 100),
      });
    }
  };

  const getOptionStyle = (option) => {
    if (!showResult) {
      return selectedOption === option ? styles.optionSelected : null;
    }
    if (option === current.correct) {
      return styles.optionCorrect;
    }
    if (option === selectedOption && option !== current.correct) {
      return styles.optionWrong;
    }
    return styles.optionDisabled;
  };

  const progress = ((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.cultureTag}>
          <Ionicons name="globe" size={16} color={colors.primary} />
          <Text style={styles.cultureText}>{culture} Culture</Text>
        </View>
        <View style={styles.scoreBox}>
          <Ionicons name="star" size={16} color={colors.warning} />
          <Text style={styles.scoreText}>{score}/{questions.length}</Text>
        </View>
      </View>

      {/* Progress */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Question card */}
      <View style={styles.questionCard}>
        {current.image && (
          <Image source={{ uri: current.image }} style={styles.questionImage} />
        )}
        
        <Text style={styles.questionNumber}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
        
        <Text style={styles.questionText}>{current.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {current.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, getOptionStyle(option)]}
            onPress={() => handleSelect(option)}
            disabled={showResult}
          >
            <View style={styles.optionContent}>
              <View style={[
                styles.optionIndicator,
                selectedOption === option && styles.optionIndicatorSelected,
                showResult && option === current.correct && styles.optionIndicatorCorrect,
                showResult && option === selectedOption && option !== current.correct && styles.optionIndicatorWrong,
              ]}>
                {showResult && option === current.correct && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
                {showResult && option === selectedOption && option !== current.correct && (
                  <Ionicons name="close" size={16} color="#fff" />
                )}
              </View>
              <Text style={[
                styles.optionText,
                showResult && option === current.correct && styles.optionTextCorrect,
              ]}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Result/Explanation */}
      {showResult && (
        <View style={[
          styles.resultBox,
          selectedOption === current.correct ? styles.resultCorrect : styles.resultWrong,
        ]}>
          <View style={styles.resultHeader}>
            <Ionicons
              name={selectedOption === current.correct ? "checkmark-circle" : "information-circle"}
              size={24}
              color={selectedOption === current.correct ? colors.success : colors.info}
            />
            <Text style={[
              styles.resultTitle,
              { color: selectedOption === current.correct ? colors.success : colors.info }
            ]}>
              {selectedOption === current.correct ? 'Correct!' : 'Good to know!'}
            </Text>
          </View>
          
          <Text style={styles.explanationText}>{current.explanation}</Text>
          
          {current.funFact && (
            <View style={styles.funFactBox}>
              <Ionicons name="bulb" size={16} color={colors.warning} />
              <Text style={styles.funFactText}>{current.funFact}</Text>
            </View>
          )}
        </View>
      )}

      {/* Action button */}
      {!showResult ? (
        <TouchableOpacity
          style={[styles.actionButton, !selectedOption && styles.buttonDisabled]}
          onPress={handleCheck}
          disabled={!selectedOption}
        >
          <Text style={styles.buttonText}>Check Answer</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.actionButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cultureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cultureText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  questionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  questionImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 16,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  optionDisabled: {
    opacity: 0.6,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIndicatorSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  optionIndicatorCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  optionIndicatorWrong: {
    borderColor: colors.error,
    backgroundColor: colors.error,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  optionTextCorrect: {
    fontWeight: '600',
    color: colors.success,
  },
  resultBox: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultCorrect: {
    backgroundColor: colors.successLight,
  },
  resultWrong: {
    backgroundColor: colors.infoLight,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  explanationText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  funFactBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 8,
  },
  funFactText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: colors.success,
    flexDirection: 'row',
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

export default CultureQuiz;
