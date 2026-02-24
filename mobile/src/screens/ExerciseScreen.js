import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated,
  BackHandler,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { TopBar, ProgressBar, Mascot, Button, XPBadge } from '../components';
import {
  VocabularyMatch,
  FlashCard,
  MultipleChoice,
  ReadingComprehension,
  WritingExercise,
  SpeakingExercise,
  FillInBlanks,
  TapTranslation,
  Listening,
  MatchPairs,
} from '../exercises';

/**
 * ExerciseScreen - The core learning experience
 * 
 * Philosophy: NO HEARTS! Mistakes are learning opportunities.
 * Every wrong answer includes an explanation of WHY.
 */
const ExerciseScreen = ({ route, navigation }) => {
  const { lessonId, exercises: initialExercises = [], lessonTitle = '' } = route.params || {};
  const { user } = useAuth();
  const { updateLessonProgress } = useProgress();

  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [mistakesToReview, setMistakesToReview] = useState([]);

  useEffect(() => {
    // Initialize exercises
    if (initialExercises.length > 0) {
      setExercises(shuffleArray([...initialExercises]));
    }
  }, [initialExercises]);

  useEffect(() => {
    // Handle back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleClose();
      return true;
    });

    return () => backHandler.remove();
  }, [currentIndex]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleClose = () => {
    if (currentIndex > 0 && !isComplete) {
      Alert.alert(
        'End Lesson?',
        "Your progress will be saved. You can continue later!",
        [
          { text: 'Keep Learning', style: 'cancel' },
          { text: 'End Lesson', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleAnswer = useCallback((isCorrect, userAnswer, correctAnswer, explanation) => {
    // Show feedback panel
    setFeedbackData({
      isCorrect,
      userAnswer,
      correctAnswer,
      explanation: explanation || getDefaultExplanation(exercises[currentIndex]),
      grammarTip: exercises[currentIndex]?.grammarTip || null,
    });
    setShowFeedback(true);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
      // Add to mistakes for review at end
      setMistakesToReview(prev => [...prev, {
        ...exercises[currentIndex],
        userAnswer,
        correctAnswer,
      }]);
    }
  }, [currentIndex, exercises]);

  const getDefaultExplanation = (exercise) => {
    // Generate helpful explanation based on exercise type
    const explanations = {
      vocabularyMatch: "Match words by their meaning. Look for context clues!",
      multipleChoice: "Read all options carefully before selecting.",
      fillInBlanks: "Consider the grammar and context of the sentence.",
      listening: "Listen for key sounds and syllables.",
      speaking: "Focus on pronunciation and rhythm.",
    };
    return explanations[exercise?.type] || "Keep practicing!";
  };

  const handleContinue = useCallback(() => {
    setShowFeedback(false);
    setFeedbackData(null);

    // Fade out current exercise
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Move to next exercise or finish
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        // Fade in next exercise
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        // Check if we need to review mistakes
        if (mistakesToReview.length > 0 && mistakesToReview.length <= 3) {
          // Add mistakes back for review
          setExercises(prev => [...prev, ...shuffleArray(mistakesToReview)]);
          setMistakesToReview([]);
          setCurrentIndex(prev => prev + 1);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else {
          finishLesson();
        }
      }
    });
  }, [currentIndex, exercises.length, fadeAnim, mistakesToReview]);

  const finishLesson = async () => {
    setIsComplete(true);
    
    // Calculate XP (no penalty for mistakes - learning is learning!)
    const baseXP = 100;
    const bonusXP = correctCount * 10;
    const accuracyBonus = Math.round((correctCount / exercises.length) * 50);
    const streakBonus = (user?.streak?.currentStreak || 0) >= 7 ? 25 : 0;
    const totalXP = baseXP + bonusXP + accuracyBonus + streakBonus;
    setEarnedXP(totalXP);

    // Calculate score
    const score = Math.round((correctCount / exercises.length) * 100);

    // Update progress on backend
    try {
      await updateLessonProgress(lessonId, {
        status: 'completed',
        score,
        xpEarned: totalXP,
        exercisesCompleted: exercises.length,
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        // Track mistakes for future SRS review
        mistakes: mistakesToReview.map(m => ({
          exerciseId: m.id,
          type: m.type,
        })),
      });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const renderExercise = () => {
    if (exercises.length === 0 || currentIndex >= exercises.length) {
      return null;
    }

    const exercise = exercises[currentIndex];
    const props = {
      exercise,
      onAnswer: handleAnswer,
    };

    switch (exercise.type) {
      case 'vocabularyMatch':
        return <VocabularyMatch {...props} />;
      case 'flashCard':
        return <FlashCard {...props} />;
      case 'multipleChoice':
        return <MultipleChoice {...props} />;
      case 'reading':
        return <ReadingComprehension {...props} />;
      case 'writing':
        return <WritingExercise {...props} />;
      case 'speaking':
        return <SpeakingExercise {...props} />;
      case 'fillInBlanks':
        return <FillInBlanks {...props} />;
      case 'tapTranslation':
        return <TapTranslation {...props} />;
      case 'listening':
        return <Listening {...props} />;
      case 'matchPairs':
        return <MatchPairs {...props} />;
      default:
        return <MultipleChoice {...props} />;
    }
  };

  const renderFeedback = () => {
    if (!showFeedback || !feedbackData) return null;

    const { isCorrect, userAnswer, correctAnswer, explanation, grammarTip } = feedbackData;

    return (
      <View style={[
        styles.feedbackContainer,
        isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
      ]}>
        <View style={styles.feedbackHeader}>
          {isCorrect ? (
            <>
              <Ionicons name="checkmark-circle" size={32} color={colors.success} />
              <Text style={[styles.feedbackTitle, styles.feedbackTitleCorrect]}>
                {getCorrectMessage()}
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="bulb" size={32} color={colors.warning} />
              <Text style={[styles.feedbackTitle, styles.feedbackTitleIncorrect]}>
                Let's learn from this!
              </Text>
            </>
          )}
        </View>

        {!isCorrect && (
          <View style={styles.feedbackComparison}>
            <View style={styles.feedbackRow}>
              <Text style={styles.feedbackLabel}>You said:</Text>
              <Text style={styles.feedbackUserAnswer}>{userAnswer}</Text>
            </View>
            <View style={styles.feedbackRow}>
              <Text style={styles.feedbackLabel}>Correct:</Text>
              <Text style={styles.feedbackCorrectAnswer}>{correctAnswer}</Text>
            </View>
          </View>
        )}

        {/* Grammar/Explanation Tip */}
        {(grammarTip || (!isCorrect && explanation)) && (
          <View style={styles.grammarTipBox}>
            <View style={styles.grammarTipHeader}>
              <Ionicons name="school" size={20} color={colors.primary} />
              <Text style={styles.grammarTipTitle}>
                {isCorrect ? 'Pro Tip' : 'Grammar Tip'}
              </Text>
            </View>
            <Text style={styles.grammarTipText}>
              {grammarTip || explanation}
            </Text>
          </View>
        )}

        <Button
          title={isCorrect ? "Continue →" : "Got it →"}
          onPress={handleContinue}
          style={styles.continueButton}
          textStyle={styles.continueButtonText}
        />
      </View>
    );
  };

  const getCorrectMessage = () => {
    const messages = [
      "Correct!",
      "Perfect!",
      "Great job!",
      "You got it!",
      "Excellent!",
      "Nice work!",
      "Well done!",
      "Nailed it!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const renderCompletionScreen = () => {
    const accuracy = Math.round((correctCount / exercises.length) * 100);
    const isPerfect = accuracy === 100;
    const isGreat = accuracy >= 80;

    return (
      <ScrollView 
        style={styles.completionScroll}
        contentContainerStyle={styles.completionContainer}
      >
        <Mascot 
          size={120} 
          expression={isPerfect ? 'excited' : isGreat ? 'happy' : 'encouraging'} 
          animated 
        />
        
        <Text style={styles.completionTitle}>
          {isPerfect ? '🎉 Perfect!' : isGreat ? '💪 Great job!' : '👍 Lesson Complete!'}
        </Text>

        <Text style={styles.completionSubtitle}>
          {isPerfect 
            ? "You're on fire! Keep up the amazing work!"
            : isGreat 
              ? "Excellent progress! You're learning fast!"
              : "Every lesson makes you stronger. Keep going!"}
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="checkmark-circle" size={32} color={colors.success} />
            <Text style={styles.statNumber}>{correctCount}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Ionicons name="refresh-circle" size={32} color={colors.warning} />
            <Text style={styles.statNumber}>{incorrectCount}</Text>
            <Text style={styles.statLabel}>Learning</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Ionicons name="trophy" size={32} color={colors.xp} />
            <Text style={[styles.statNumber, { color: colors.xp }]}>{accuracy}%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        <View style={styles.xpEarnedContainer}>
          <XPBadge xp={earnedXP} size={28} />
          <Text style={styles.xpEarnedText}>earned!</Text>
        </View>

        {/* Show what was learned */}
        {exercises.length > 0 && (
          <View style={styles.learnedSection}>
            <Text style={styles.learnedTitle}>Words Practiced</Text>
            <View style={styles.learnedTags}>
              {exercises.slice(0, 8).map((ex, i) => (
                <View key={i} style={styles.learnedTag}>
                  <Text style={styles.learnedTagText}>
                    {ex.word || ex.targetWord || ex.question?.slice(0, 15)}
                  </Text>
                </View>
              ))}
              {exercises.length > 8 && (
                <View style={[styles.learnedTag, styles.learnedTagMore]}>
                  <Text style={styles.learnedTagText}>+{exercises.length - 8}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={styles.completionButtons}>
          <Button
            title="Continue Learning"
            onPress={() => navigation.goBack()}
            style={styles.primaryButton}
          />
          <Button
            title="Review Mistakes"
            onPress={() => {
              // Navigate to review mode with mistakes
              if (mistakesToReview.length > 0) {
                navigation.replace('Exercise', {
                  lessonId,
                  exercises: mistakesToReview,
                  lessonTitle: `${lessonTitle} - Review`,
                });
              } else {
                navigation.goBack();
              }
            }}
            variant="outline"
            style={styles.secondaryButton}
            disabled={mistakesToReview.length === 0}
          />
        </View>
      </ScrollView>
    );
  };

  const progress = exercises.length > 0 
    ? (currentIndex + 1) / exercises.length 
    : 0;

  if (isComplete) {
    return (
      <SafeAreaView style={styles.container}>
        {renderCompletionScreen()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Clean top bar - NO HEARTS! */}
      <View style={styles.topBar}>
        <Button
          variant="ghost"
          onPress={handleClose}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={28} color={colors.textSecondary} />
        </Button>
        
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={progress} 
            height={10}
            style={styles.progressBar}
          />
        </View>

        <View style={styles.progressCounter}>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{exercises.length}
          </Text>
        </View>
      </View>

      {lessonTitle && (
        <Text style={styles.lessonTitle}>{lessonTitle}</Text>
      )}

      <Animated.View 
        style={[styles.exerciseContainer, { opacity: fadeAnim }]}
      >
        {renderExercise()}
      </Animated.View>

      {renderFeedback()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeButton: {
    padding: 4,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  progressBar: {
    borderRadius: 5,
  },
  progressCounter: {
    minWidth: 40,
    alignItems: 'flex-end',
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  lessonTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  exerciseContainer: {
    flex: 1,
  },
  
  // Feedback Panel
  feedbackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  feedbackCorrect: {
    backgroundColor: colors.success + '15',
    borderTopWidth: 3,
    borderTopColor: colors.success,
  },
  feedbackIncorrect: {
    backgroundColor: colors.warning + '15',
    borderTopWidth: 3,
    borderTopColor: colors.warning,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  feedbackTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  feedbackTitleCorrect: {
    color: colors.success,
  },
  feedbackTitleIncorrect: {
    color: colors.text,
  },
  feedbackComparison: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  feedbackRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  feedbackLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    width: 80,
  },
  feedbackUserAnswer: {
    color: colors.error,
    fontSize: 14,
    flex: 1,
    textDecorationLine: 'line-through',
  },
  feedbackCorrectAnswer: {
    color: colors.success,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  grammarTipBox: {
    backgroundColor: colors.primary + '15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  grammarTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  grammarTipTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  grammarTipText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: colors.primary,
  },
  continueButtonText: {
    color: colors.textWhite,
    fontWeight: 'bold',
  },

  // Completion Screen
  completionScroll: {
    flex: 1,
  },
  completionContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  completionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  completionSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  xpEarnedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.xp + '20',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginBottom: 24,
  },
  xpEarnedText: {
    color: colors.xp,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  learnedSection: {
    width: '100%',
    marginBottom: 24,
  },
  learnedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  learnedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  learnedTag: {
    backgroundColor: colors.primary + '20',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
  },
  learnedTagMore: {
    backgroundColor: colors.textSecondary + '20',
  },
  learnedTagText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  completionButtons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
});

export default ExerciseScreen;
