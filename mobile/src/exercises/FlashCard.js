import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { FarsiText, Button } from '../components';

const { width } = Dimensions.get('window');

const FlashCard = ({ 
  exercise, 
  onComplete,
  onCorrect,
  onIncorrect,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
    
    if (!isFlipped) {
      setShowRating(true);
    }
  };

  const handleRating = (quality) => {
    // Quality: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy
    if (quality >= 3) {
      onCorrect?.();
    } else {
      onIncorrect?.();
    }
    onComplete?.(quality >= 3, quality);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>{exercise.question}</Text>

      <TouchableOpacity 
        onPress={flipCard} 
        activeOpacity={0.9}
        style={styles.cardContainer}
      >
        {/* Front of card - Farsi */}
        <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle]}>
          <FarsiText size="xlarge" style={styles.farsiText}>
            {exercise.questionFarsi}
          </FarsiText>
          <View style={styles.tapHint}>
            <Ionicons name="hand-left-outline" size={20} color={colors.textSecondary} />
            <Text style={styles.hintText}>Tap to reveal</Text>
          </View>
        </Animated.View>

        {/* Back of card - English */}
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
          <Text style={styles.englishText}>{exercise.correctAnswer}</Text>
          <View style={styles.divider} />
          <FarsiText size="large" style={styles.farsiSmall}>
            {exercise.questionFarsi}
          </FarsiText>
        </Animated.View>
      </TouchableOpacity>

      {showRating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>How well did you know this?</Text>
          <View style={styles.ratingButtons}>
            <TouchableOpacity 
              style={[styles.ratingButton, styles.ratingAgain]}
              onPress={() => handleRating(1)}
            >
              <Ionicons name="refresh" size={24} color={colors.textWhite} />
              <Text style={styles.ratingButtonText}>Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.ratingButton, styles.ratingHard]}
              onPress={() => handleRating(2)}
            >
              <Ionicons name="alert-circle" size={24} color={colors.textWhite} />
              <Text style={styles.ratingButtonText}>Hard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.ratingButton, styles.ratingGood]}
              onPress={() => handleRating(3)}
            >
              <Ionicons name="checkmark-circle" size={24} color={colors.textWhite} />
              <Text style={styles.ratingButtonText}>Good</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.ratingButton, styles.ratingEasy]}
              onPress={() => handleRating(4)}
            >
              <Ionicons name="star" size={24} color={colors.textWhite} />
              <Text style={styles.ratingButtonText}>Easy</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  cardContainer: {
    width: width - 60,
    height: 250,
    marginVertical: 20,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardFront: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  cardBack: {
    backgroundColor: colors.primary,
  },
  farsiText: {
    color: colors.primary,
    textAlign: 'center',
  },
  englishText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textWhite,
    textAlign: 'center',
  },
  farsiSmall: {
    color: colors.textWhite,
    opacity: 0.8,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: colors.textWhite,
    opacity: 0.3,
    marginVertical: 16,
  },
  tapHint: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintText: {
    color: colors.textSecondary,
    marginLeft: 8,
    fontSize: 14,
  },
  ratingContainer: {
    width: '100%',
    marginTop: 20,
  },
  ratingTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  ratingAgain: {
    backgroundColor: colors.error,
  },
  ratingHard: {
    backgroundColor: colors.warning,
  },
  ratingGood: {
    backgroundColor: colors.success,
  },
  ratingEasy: {
    backgroundColor: colors.info,
  },
  ratingButtonText: {
    color: colors.textWhite,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
  },
});

export default FlashCard;
