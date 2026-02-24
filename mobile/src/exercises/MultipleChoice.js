import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { FarsiText, Button } from '../components';
import { isRTL } from '../utils/farsiUtils';

const MultipleChoice = ({ 
  exercise, 
  onComplete,
  onCorrect,
  onIncorrect,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [animations] = useState(
    exercise.options?.map(() => new Animated.Value(0)) || []
  );

  useEffect(() => {
    // Shuffle options on mount
    setShuffledOptions(shuffleArray([...(exercise.options || [])]));
    setSelectedOption(null);
    setIsAnswered(false);
    
    // Animate options in
    animations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    });
  }, [exercise]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setIsAnswered(true);
    const isCorrect = selectedOption === exercise.correctAnswer;
    
    if (isCorrect) {
      onCorrect?.();
    } else {
      onIncorrect?.();
    }

    // Delay before moving to next
    setTimeout(() => {
      onComplete?.(isCorrect);
    }, 1500);
  };

  const getOptionStyle = (option) => {
    if (!isAnswered) {
      return selectedOption === option ? styles.selectedOption : {};
    }
    
    if (option === exercise.correctAnswer) {
      return styles.correctOption;
    }
    
    if (option === selectedOption && option !== exercise.correctAnswer) {
      return styles.incorrectOption;
    }
    
    return {};
  };

  const renderOptionText = (option) => {
    const isFarsi = isRTL(option);
    if (isFarsi) {
      return <FarsiText size="medium">{option}</FarsiText>;
    }
    return <Text style={styles.optionText}>{option}</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{exercise.question}</Text>
        {exercise.questionFarsi && (
          <FarsiText size="large" style={styles.questionFarsi}>
            {exercise.questionFarsi}
          </FarsiText>
        )}
      </View>

      <View style={styles.optionsContainer}>
        {shuffledOptions.map((option, index) => (
          <Animated.View
            key={index}
            style={[
              {
                opacity: animations[index] || 1,
                transform: [
                  {
                    translateY: (animations[index] || new Animated.Value(1)).interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.option,
                getOptionStyle(option),
              ]}
              onPress={() => handleSelect(option)}
              disabled={isAnswered}
            >
              <View style={styles.optionContent}>
                {renderOptionText(option)}
              </View>
              
              {isAnswered && option === exercise.correctAnswer && (
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              )}
              {isAnswered && option === selectedOption && option !== exercise.correctAnswer && (
                <Ionicons name="close-circle" size={24} color={colors.error} />
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {!isAnswered && (
        <Button
          title="Check"
          onPress={handleSubmit}
          disabled={!selectedOption}
          style={styles.checkButton}
        />
      )}

      {isAnswered && (
        <View style={[
          styles.feedback,
          selectedOption === exercise.correctAnswer ? styles.feedbackCorrect : styles.feedbackIncorrect
        ]}>
          <Ionicons 
            name={selectedOption === exercise.correctAnswer ? "checkmark-circle" : "close-circle"} 
            size={28} 
            color={colors.textWhite} 
          />
          <Text style={styles.feedbackText}>
            {selectedOption === exercise.correctAnswer ? 'Correct!' : `Correct answer: ${exercise.correctAnswer}`}
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
  questionContainer: {
    marginBottom: 32,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  questionFarsi: {
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
  },
  option: {
    backgroundColor: colors.backgroundSecondary,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionContent: {
    flex: 1,
  },
  optionText: {
    fontSize: 18,
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
    marginBottom: 20,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 'auto',
    marginBottom: 20,
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
    flex: 1,
  },
});

export default MultipleChoice;
