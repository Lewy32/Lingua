import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { Button, Mascot } from '../components';
import { useLanguage } from '../context/LanguageContext';
import languages from '../data/languages';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * OnboardingScreen - Zero-friction start
 * 
 * Flow:
 * 1. Welcome (emotional hook)
 * 2. Language selection
 * 3. Experience level
 * 4. Daily goal
 * 5. First mini-lesson (BEFORE signup!)
 * 6. Signup prompt (after they're hooked)
 */
const OnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [experienceLevel, setExperienceLevel] = useState(null);
  const [dailyGoal, setDailyGoal] = useState('regular');
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const { setCurrentLanguage } = useLanguage();

  const totalSteps = 5;

  const animateTransition = (callback) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    setTimeout(callback, 150);
  };

  const goToStep = (newStep) => {
    animateTransition(() => setStep(newStep));
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentLanguage(language.id);
    goToStep(2);
  };

  const handleExperienceSelect = (level) => {
    setExperienceLevel(level);
    goToStep(3);
  };

  const handleGoalSelect = (goal) => {
    setDailyGoal(goal);
    goToStep(4);
  };

  const handleStartLearning = () => {
    // Go to first mini-lesson
    navigation.replace('FirstLesson', {
      languageId: selectedLanguage?.id,
      experienceLevel,
      dailyGoal,
    });
  };

  const popularLanguages = [
    languages.find(l => l.id === 'spanish'),
    languages.find(l => l.id === 'french'),
    languages.find(l => l.id === 'japanese'),
    languages.find(l => l.id === 'korean'),
    languages.find(l => l.id === 'german'),
    languages.find(l => l.id === 'italian'),
    languages.find(l => l.id === 'persian'),
    languages.find(l => l.id === 'portuguese'),
  ].filter(Boolean);

  const renderWelcome = () => (
    <View style={styles.stepContainer}>
      <Mascot size={140} expression="excited" animated />
      
      <Text style={styles.welcomeTitle}>Welcome to Lingua! 🌍</Text>
      <Text style={styles.welcomeSubtitle}>
        Learn languages through culture, food, and real conversations.
      </Text>

      <View style={styles.features}>
        <View style={styles.featureRow}>
          <Ionicons name="infinite" size={24} color={colors.success} />
          <Text style={styles.featureText}>Unlimited learning — no hearts!</Text>
        </View>
        <View style={styles.featureRow}>
          <Ionicons name="restaurant" size={24} color={colors.warning} />
          <Text style={styles.featureText}>Learn while cooking real recipes</Text>
        </View>
        <View style={styles.featureRow}>
          <Ionicons name="chatbubbles" size={24} color={colors.primary} />
          <Text style={styles.featureText}>Real conversations, not "the elephant drinks wine"</Text>
        </View>
      </View>

      <Button
        title="Get Started — It's Free"
        onPress={() => goToStep(1)}
        style={styles.primaryButton}
        icon={<Ionicons name="arrow-forward" size={20} color={colors.textWhite} />}
        iconPosition="right"
      />

      <TouchableOpacity 
        style={styles.signInLink}
        onPress={() => navigation.navigate('Auth', { mode: 'signin' })}
      >
        <Text style={styles.signInText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLanguageSelect = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>What do you want to learn?</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <Text style={styles.searchPlaceholder}>Search 60+ languages...</Text>
      </View>

      <Text style={styles.sectionLabel}>🔥 Popular</Text>
      
      <View style={styles.languageGrid}>
        {popularLanguages.map((lang) => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.languageCard,
              selectedLanguage?.id === lang.id && styles.languageCardSelected,
            ]}
            onPress={() => handleLanguageSelect(lang)}
          >
            <Text style={styles.languageFlag}>{lang.flag}</Text>
            <Text style={styles.languageName}>{lang.name}</Text>
            <Text style={styles.languageNative}>{lang.nativeName}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.allLanguagesLink}>
        <Text style={styles.allLanguagesText}>View all 60+ languages</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderExperienceLevel = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>
        How much {selectedLanguage?.name || 'this language'} do you know?
      </Text>

      <View style={styles.optionsContainer}>
        {[
          { id: 'beginner', icon: '🌱', title: "I'm a complete beginner", desc: "Start from scratch" },
          { id: 'basic', icon: '📚', title: "I know some basics", desc: "Greetings, simple phrases" },
          { id: 'intermediate', icon: '💬', title: "I can have conversations", desc: "Comfortable with basics" },
          { id: 'test', icon: '🎯', title: "Test my level", desc: "Take a quick placement quiz" },
        ].map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              experienceLevel === option.id && styles.optionCardSelected,
            ]}
            onPress={() => handleExperienceSelect(option.id)}
          >
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDesc}>{option.desc}</Text>
            </View>
            <Ionicons 
              name={experienceLevel === option.id ? "checkmark-circle" : "chevron-forward"} 
              size={24} 
              color={experienceLevel === option.id ? colors.success : colors.textSecondary} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDailyGoal = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>How much time can you commit daily?</Text>
      <Text style={styles.stepSubtitle}>
        You can always change this later. We'll personalize your experience.
      </Text>

      <View style={styles.goalOptions}>
        {[
          { id: 'casual', time: '5 min', emoji: '⚡', label: 'Casual', desc: 'Perfect for busy days' },
          { id: 'regular', time: '10 min', emoji: '📖', label: 'Regular', desc: 'Recommended', recommended: true },
          { id: 'serious', time: '20 min', emoji: '💪', label: 'Serious', desc: 'Faster progress' },
          { id: 'intense', time: '30+ min', emoji: '🔥', label: 'Intense', desc: 'For dedicated learners' },
        ].map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalCard,
              dailyGoal === goal.id && styles.goalCardSelected,
              goal.recommended && styles.goalCardRecommended,
            ]}
            onPress={() => handleGoalSelect(goal.id)}
          >
            {goal.recommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>Recommended</Text>
              </View>
            )}
            <Text style={styles.goalEmoji}>{goal.emoji}</Text>
            <Text style={styles.goalLabel}>{goal.label}</Text>
            <Text style={styles.goalTime}>{goal.time}/day</Text>
            <Text style={styles.goalDesc}>{goal.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderReady = () => (
    <View style={styles.stepContainer}>
      <Mascot size={120} expression="happy" animated />
      
      <Text style={styles.readyTitle}>You're all set! 🎉</Text>
      
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Learning</Text>
          <View style={styles.summaryValue}>
            <Text style={styles.summaryFlag}>{selectedLanguage?.flag}</Text>
            <Text style={styles.summaryText}>{selectedLanguage?.name}</Text>
          </View>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Daily Goal</Text>
          <Text style={styles.summaryText}>
            {dailyGoal === 'casual' ? '5 min' : 
             dailyGoal === 'regular' ? '10 min' : 
             dailyGoal === 'serious' ? '20 min' : '30+ min'}
          </Text>
        </View>
      </View>

      <Text style={styles.readySubtitle}>
        Let's learn your first words in {selectedLanguage?.name}!
      </Text>

      <Button
        title="Start My First Lesson →"
        onPress={handleStartLearning}
        style={styles.primaryButton}
      />

      <Text style={styles.noSignupNote}>
        No signup required to start learning!
      </Text>
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case 0: return renderWelcome();
      case 1: return renderLanguageSelect();
      case 2: return renderExperienceLevel();
      case 3: return renderDailyGoal();
      case 4: return renderReady();
      default: return renderWelcome();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress dots */}
      {step > 0 && step < totalSteps && (
        <View style={styles.progressDots}>
          {[1, 2, 3, 4].map((i) => (
            <View 
              key={i} 
              style={[
                styles.dot,
                step >= i && styles.dotActive,
              ]} 
            />
          ))}
        </View>
      )}

      {/* Back button */}
      {step > 0 && (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => goToStep(step - 1)}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      )}

      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {renderStep()}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },

  // Welcome
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
    lineHeight: 26,
  },
  features: {
    width: '100%',
    marginBottom: 40,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 16,
  },
  signInLink: {
    marginTop: 20,
    padding: 12,
  },
  signInText: {
    color: colors.primary,
    fontSize: 16,
  },

  // Language Select
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  stepSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  searchPlaceholder: {
    color: colors.textSecondary,
    marginLeft: 12,
    fontSize: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  languageCard: {
    width: (SCREEN_WIDTH - 72) / 2,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  languageCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  languageFlag: {
    fontSize: 40,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  languageNative: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  allLanguagesLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  allLanguagesText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },

  // Experience Level
  optionsContainer: {
    width: '100%',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  optionDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Daily Goal
  goalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  goalCard: {
    width: (SCREEN_WIDTH - 72) / 2,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  goalCardRecommended: {
    borderColor: colors.success + '50',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  recommendedText: {
    color: colors.textWhite,
    fontSize: 11,
    fontWeight: '600',
  },
  goalEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  goalLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  goalTime: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginTop: 4,
  },
  goalDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },

  // Ready
  readyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 24,
    marginBottom: 24,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  summaryValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryFlag: {
    fontSize: 20,
    marginRight: 8,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  readySubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  noSignupNote: {
    marginTop: 16,
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default OnboardingScreen;
