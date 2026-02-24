import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { FarsiText } from '../components';

const VocabularyMatch = ({ 
  exercise, 
  onComplete,
  onCorrect,
  onIncorrect,
}) => {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [incorrectPair, setIncorrectPair] = useState(null);
  const [shakeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    initializeGame();
  }, [exercise]);

  const initializeGame = () => {
    const correctAnswer = exercise.correctAnswer || {};
    const farsiWords = Object.keys(correctAnswer);
    const englishWords = Object.values(correctAnswer);

    // Shuffle both arrays
    setLeftItems(shuffleArray([...farsiWords]));
    setRightItems(shuffleArray([...englishWords]));
    setMatchedPairs([]);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleLeftSelect = (item) => {
    if (matchedPairs.includes(item)) return;
    setSelectedLeft(item);
    
    if (selectedRight) {
      checkMatch(item, selectedRight);
    }
  };

  const handleRightSelect = (item) => {
    if (matchedPairs.some(pair => pair.english === item)) return;
    setSelectedRight(item);
    
    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    }
  };

  const checkMatch = (farsi, english) => {
    const correctAnswer = exercise.correctAnswer || {};
    const isCorrect = correctAnswer[farsi] === english;

    if (isCorrect) {
      const newMatched = [...matchedPairs, { farsi, english }];
      setMatchedPairs(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);
      onCorrect?.();

      // Check if all matched
      if (newMatched.length === Object.keys(correctAnswer).length) {
        setTimeout(() => {
          onComplete?.(true);
        }, 500);
      }
    } else {
      setIncorrectPair({ farsi, english });
      onIncorrect?.();
      
      // Shake animation
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        setIncorrectPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  const isLeftMatched = (item) => matchedPairs.some(pair => pair.farsi === item);
  const isRightMatched = (item) => matchedPairs.some(pair => pair.english === item);
  const isLeftIncorrect = (item) => incorrectPair?.farsi === item;
  const isRightIncorrect = (item) => incorrectPair?.english === item;

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>{exercise.question}</Text>
      
      <View style={styles.matchArea}>
        {/* Left column - Farsi */}
        <View style={styles.column}>
          {leftItems.map((item, index) => {
            const matched = isLeftMatched(item);
            const selected = selectedLeft === item;
            const incorrect = isLeftIncorrect(item);
            
            return (
              <Animated.View
                key={`left-${index}`}
                style={[
                  incorrect && { transform: [{ translateX: shakeAnim }] }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.matchItem,
                    styles.farsiItem,
                    matched && styles.matchedItem,
                    selected && styles.selectedItem,
                    incorrect && styles.incorrectItem,
                  ]}
                  onPress={() => handleLeftSelect(item)}
                  disabled={matched}
                >
                  <FarsiText 
                    size="large" 
                    style={[
                      matched && styles.matchedText,
                    ]}
                  >
                    {item}
                  </FarsiText>
                  {matched && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.success} style={styles.checkmark} />
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Right column - English */}
        <View style={styles.column}>
          {rightItems.map((item, index) => {
            const matched = isRightMatched(item);
            const selected = selectedRight === item;
            const incorrect = isRightIncorrect(item);
            
            return (
              <Animated.View
                key={`right-${index}`}
                style={[
                  incorrect && { transform: [{ translateX: shakeAnim }] }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.matchItem,
                    matched && styles.matchedItem,
                    selected && styles.selectedItem,
                    incorrect && styles.incorrectItem,
                  ]}
                  onPress={() => handleRightSelect(item)}
                  disabled={matched}
                >
                  <Text 
                    style={[
                      styles.englishText,
                      matched && styles.matchedText,
                    ]}
                  >
                    {item}
                  </Text>
                  {matched && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.success} style={styles.checkmark} />
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </View>

      <Text style={styles.hint}>
        {matchedPairs.length} of {leftItems.length} matched
      </Text>
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
    marginBottom: 24,
  },
  matchArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  matchItem: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 60,
  },
  farsiItem: {
    justifyContent: 'flex-end',
  },
  selectedItem: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundTertiary,
  },
  matchedItem: {
    backgroundColor: colors.success + '20',
    borderColor: colors.success,
  },
  incorrectItem: {
    backgroundColor: colors.error + '20',
    borderColor: colors.error,
  },
  englishText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  matchedText: {
    opacity: 0.6,
  },
  checkmark: {
    marginLeft: 8,
    position: 'absolute',
    right: 12,
  },
  hint: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 16,
  },
});

export default VocabularyMatch;
