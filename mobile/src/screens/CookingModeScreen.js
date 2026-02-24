import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { getRecipeById } from '../data/recipes';

const { width, height } = Dimensions.get('window');

const CookingModeScreen = ({ navigation, route }) => {
  const { recipeId } = route.params;
  const recipe = getRecipeById(recipeId);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  const step = recipe?.steps[currentStep];
  const totalSteps = recipe?.steps.length || 0;
  const progress = (currentStep + 1) / totalSteps;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Recipe not found</Text>
      </SafeAreaView>
    );
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      resetTimer();
    }
  };

  const handleNextStep = () => {
    setCompletedSteps(prev => ({ ...prev, [currentStep]: true }));
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      resetTimer();
    } else {
      // Recipe completed
      Alert.alert(
        '🎉 Congratulations!',
        `You've completed ${recipe.nameEnglish}! How was it?`,
        [
          { text: 'Great!', onPress: () => navigation.goBack() },
          { text: 'Continue', style: 'cancel' },
        ]
      );
    }
  };

  const handleExit = () => {
    Alert.alert(
      'Exit Cooking Mode?',
      'Your progress will not be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const startTimer = (minutes) => {
    const seconds = minutes * 60;
    setTimerSeconds(seconds);
    setTimerRunning(true);
    
    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimerRunning(false);
          // Play sound or vibrate
          Alert.alert('⏰ Timer Done!', 'Time to move to the next step.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <Text style={styles.stepIndicator}>
            Step {currentStep + 1} of {totalSteps}
          </Text>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]} 
            />
          </View>
        </View>

        <View style={styles.placeholder} />
      </SafeAreaView>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Step Image (if available) */}
        {step?.image && (
          <Image source={{ uri: step.image }} style={styles.stepImage} />
        )}

        {/* Step Content */}
        <View style={styles.stepContent}>
          <Text style={styles.stepTitle}>
            {step?.technique ? step.technique.charAt(0).toUpperCase() + step.technique.slice(1) : `Step ${currentStep + 1}`}
          </Text>
          
          <Text style={styles.stepInstruction}>{step?.instruction}</Text>
          
          {step?.instructionNative && (
            <Text style={styles.stepNative}>{step.instructionNative}</Text>
          )}

          {/* Timer Section */}
          {step?.duration && (
            <View style={styles.timerSection}>
              {timerRunning ? (
                <View style={styles.timerActive}>
                  <Ionicons name="time" size={32} color={colors.primary} />
                  <Text style={styles.timerText}>{formatTime(timerSeconds)}</Text>
                  <TouchableOpacity 
                    style={styles.timerButton}
                    onPress={resetTimer}
                  >
                    <Text style={styles.timerButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.startTimerButton}
                  onPress={() => startTimer(step.duration)}
                >
                  <Ionicons name="timer-outline" size={24} color={colors.text} />
                  <Text style={styles.startTimerText}>
                    Start {step.duration} min timer
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Tip Box */}
          {step?.tip && (
            <View style={styles.tipBox}>
              <Ionicons name="bulb" size={20} color="#f39c12" />
              <Text style={styles.tipText}>{step.tip}</Text>
            </View>
          )}

          {/* Key Terms */}
          {step?.keyTerms && step.keyTerms.length > 0 && (
            <View style={styles.keyTermsBox}>
              <Text style={styles.keyTermsTitle}>New Words</Text>
              {step.keyTerms.map((term, index) => (
                <View key={index} style={styles.keyTerm}>
                  <Text style={styles.termNative}>{term.native}</Text>
                  <Text style={styles.termPhonetic}>({term.phonetic})</Text>
                  <Text style={styles.termEnglish}>= {term.english}</Text>
                  <TouchableOpacity style={styles.audioIcon}>
                    <Ionicons name="volume-medium" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity 
          style={[styles.navButton, currentStep === 0 && styles.navButtonDisabled]}
          onPress={handlePrevStep}
          disabled={currentStep === 0}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={currentStep === 0 ? colors.textSecondary : colors.text} 
          />
          <Text style={[styles.navButtonText, currentStep === 0 && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNextStep}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === totalSteps - 1 ? 'Finish!' : 'Next Step'}
          </Text>
          <Ionicons 
            name={currentStep === totalSteps - 1 ? "checkmark-circle" : "arrow-forward"} 
            size={24} 
            color={colors.background} 
          />
        </TouchableOpacity>
      </View>

      {/* Step Dots */}
      <View style={styles.stepsDotsContainer}>
        {recipe.steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepDot,
              index === currentStep && styles.stepDotActive,
              completedSteps[index] && styles.stepDotCompleted,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.text,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  exitButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  stepIndicator: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  stepImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  stepInstruction: {
    fontSize: 20,
    color: colors.text,
    lineHeight: 30,
    marginBottom: 16,
  },
  stepNative: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 24,
    padding: 12,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
  },
  timerSection: {
    marginBottom: 24,
  },
  startTimerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  startTimerText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  timerActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    fontVariant: ['tabular-nums'],
  },
  timerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
  },
  timerButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(243, 156, 18, 0.1)',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 16,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#f39c12',
    lineHeight: 22,
  },
  keyTermsBox: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
  },
  keyTermsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  keyTerm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  termNative: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  termPhonetic: {
    fontSize: 12,
    color: colors.primary,
    fontStyle: 'italic',
  },
  termEnglish: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
  audioIcon: {
    padding: 4,
  },
  navigation: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundSecondary,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  navButtonTextDisabled: {
    color: colors.textSecondary,
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  nextButtonText: {
    fontSize: 16,
    color: colors.background,
    fontWeight: 'bold',
  },
  stepsDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 32,
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.backgroundSecondary,
  },
  stepDotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  stepDotCompleted: {
    backgroundColor: '#2ecc71',
  },
});

export default CookingModeScreen;
