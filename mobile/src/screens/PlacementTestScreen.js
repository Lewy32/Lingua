/**
 * PlacementTestScreen
 * Adaptive placement test to determine user's CEFR level
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { CEFR_LEVELS, PLACEMENT_TEST, getCertificationForLanguage } from '../data/standards';

const PlacementTestScreen = ({ navigation, route }) => {
  const { language, languageName } = route.params;
  
  const [phase, setPhase] = useState('intro'); // intro, testing, results
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState('A2'); // Start at A2, adapt from there
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Sample adaptive questions (in production, fetch from API)
  const getQuestionForDifficulty = (level, section) => {
    const questions = {
      A1: {
        grammar: [
          {
            question: 'I ___ a student.',
            options: ['am', 'is', 'are', 'be'],
            correct: 'am',
            skill: 'grammar',
          },
          {
            question: 'She ___ to school every day.',
            options: ['go', 'goes', 'going', 'gone'],
            correct: 'goes',
            skill: 'grammar',
          },
        ],
        reading: [
          {
            passage: 'My name is Maria. I am from Spain. I like coffee.',
            question: 'Where is Maria from?',
            options: ['Italy', 'Spain', 'France', 'Portugal'],
            correct: 'Spain',
            skill: 'reading',
          },
        ],
      },
      A2: {
        grammar: [
          {
            question: 'I ___ my homework yesterday.',
            options: ['do', 'did', 'done', 'doing'],
            correct: 'did',
            skill: 'grammar',
          },
          {
            question: 'She is ___ than her brother.',
            options: ['tall', 'taller', 'tallest', 'more tall'],
            correct: 'taller',
            skill: 'grammar',
          },
        ],
        reading: [
          {
            passage: 'Last summer, we went to Italy. We visited Rome and Florence. The food was delicious and the weather was perfect.',
            question: 'What was the weather like?',
            options: ['Rainy', 'Perfect', 'Cold', 'Hot'],
            correct: 'Perfect',
            skill: 'reading',
          },
        ],
      },
      B1: {
        grammar: [
          {
            question: 'If I ___ more time, I would learn another language.',
            options: ['have', 'had', 'would have', 'having'],
            correct: 'had',
            skill: 'grammar',
          },
          {
            question: 'The book ___ by millions of people.',
            options: ['has read', 'has been read', 'have read', 'is reading'],
            correct: 'has been read',
            skill: 'grammar',
          },
        ],
        reading: [
          {
            passage: 'Climate change is affecting weather patterns worldwide. Scientists predict more extreme weather events in the coming decades. Governments are being urged to take action.',
            question: 'What do scientists predict?',
            options: ['Better weather', 'More extreme weather', 'Less rain', 'Colder winters'],
            correct: 'More extreme weather',
            skill: 'reading',
          },
        ],
      },
      B2: {
        grammar: [
          {
            question: 'Had I known about the traffic, I ___ earlier.',
            options: ['would leave', 'would have left', 'will leave', 'left'],
            correct: 'would have left',
            skill: 'grammar',
          },
          {
            question: 'The project, ___ was completed last month, received positive reviews.',
            options: ['that', 'which', 'what', 'who'],
            correct: 'which',
            skill: 'grammar',
          },
        ],
        reading: [
          {
            passage: 'The proliferation of artificial intelligence in everyday applications has sparked debates about privacy, employment, and the nature of human creativity. While some view AI as a transformative force for good, others remain skeptical about its long-term implications.',
            question: 'What is the main topic of this passage?',
            options: ['Job markets', 'AI debates', 'Privacy laws', 'Human creativity'],
            correct: 'AI debates',
            skill: 'reading',
          },
        ],
      },
      C1: {
        grammar: [
          {
            question: 'Not only ___ the project on time, but she also exceeded expectations.',
            options: ['she completed', 'did she complete', 'she did complete', 'completed she'],
            correct: 'did she complete',
            skill: 'grammar',
          },
        ],
        reading: [
          {
            passage: 'The epistemological foundations of scientific inquiry have been subject to rigorous philosophical scrutiny since the Enlightenment. Popper\'s falsificationism challenged the prevailing inductivist paradigm, asserting that scientific theories can never be verified, only potentially falsified.',
            question: 'According to Popper, scientific theories:',
            options: ['Can be verified', 'Can only be falsified', 'Are always true', 'Need no testing'],
            correct: 'Can only be falsified',
            skill: 'reading',
          },
        ],
      },
    };

    const sectionType = currentSection === 0 ? 'grammar' : 'reading';
    const levelQuestions = questions[level]?.[sectionType] || questions.A2[sectionType];
    return levelQuestions[currentQuestion % levelQuestions.length];
  };

  const currentQuestionData = getQuestionForDifficulty(difficulty, currentSection);

  useEffect(() => {
    if (phase === 'testing') {
      // Start timer for section
      const sectionTime = PLACEMENT_TEST.sections[currentSection].timeMinutes * 60;
      setTimeRemaining(sectionTime);

      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextSection();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [phase, currentSection]);

  const handleStartTest = () => {
    setPhase('testing');
    animateProgress();
  };

  const animateProgress = () => {
    const totalQuestions = PLACEMENT_TEST.sections.reduce((sum, s) => sum + s.questions, 0);
    const completedQuestions = answers.length;
    const progress = completedQuestions / totalQuestions;

    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentQuestionData.correct;
    const newAnswer = {
      question: currentQuestionData.question,
      userAnswer: answer,
      correct: isCorrect,
      difficulty,
      section: currentSection,
    };

    // Adaptive difficulty
    const recentAnswers = [...answers.slice(-3), newAnswer];
    const recentCorrect = recentAnswers.filter(a => a.correct).length;
    
    if (recentCorrect >= 3) {
      // Increase difficulty
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const currentIdx = levels.indexOf(difficulty);
      if (currentIdx < levels.length - 1) {
        setDifficulty(levels[currentIdx + 1]);
      }
    } else if (recentCorrect <= 1 && recentAnswers.length >= 3) {
      // Decrease difficulty
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const currentIdx = levels.indexOf(difficulty);
      if (currentIdx > 0) {
        setDifficulty(levels[currentIdx - 1]);
      }
    }

    setTimeout(() => {
      setAnswers([...answers, newAnswer]);
      setSelectedAnswer(null);
      
      // Check if section complete
      const sectionQuestions = PLACEMENT_TEST.sections[currentSection].questions;
      if (currentQuestion + 1 >= sectionQuestions) {
        handleNextSection();
      } else {
        setCurrentQuestion(currentQuestion + 1);
        animateProgress();
        fadeInQuestion();
      }
    }, 500);
  };

  const fadeInQuestion = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleNextSection = () => {
    if (currentSection + 1 >= PLACEMENT_TEST.sections.length) {
      // Test complete
      calculateResults();
    } else {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
      animateProgress();
      fadeInQuestion();
    }
  };

  const calculateResults = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const correctCount = answers.filter(a => a.correct).length;
      const totalQuestions = answers.length;
      const percentage = Math.round((correctCount / totalQuestions) * 100);

      // Calculate level based on highest difficulty answered correctly
      const correctByLevel = {};
      answers.forEach(a => {
        if (a.correct) {
          correctByLevel[a.difficulty] = (correctByLevel[a.difficulty] || 0) + 1;
        }
      });

      let estimatedLevel = 'A1';
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      for (const level of levels) {
        if (correctByLevel[level] >= 2) {
          estimatedLevel = level;
        }
      }

      // Skill breakdown
      const skillScores = {
        grammar: 0,
        reading: 0,
        listening: 0,
        writing: 0,
      };
      
      answers.forEach(a => {
        const skill = a.section === 0 ? 'grammar' : 'reading';
        if (a.correct) skillScores[skill]++;
      });

      const certification = getCertificationForLanguage(language);

      setResults({
        level: estimatedLevel,
        levelInfo: CEFR_LEVELS[estimatedLevel],
        percentage,
        correctCount,
        totalQuestions,
        skillScores,
        certification,
        recommendations: getRecommendations(estimatedLevel),
      });

      setPhase('results');
      setIsLoading(false);
    }, 2000);
  };

  const getRecommendations = (level) => {
    const recommendations = {
      A1: [
        'Focus on basic vocabulary (500 words)',
        'Learn present tense conjugations',
        'Practice simple greetings and introductions',
        'Start with picture-based exercises',
      ],
      A2: [
        'Expand vocabulary to 1000 words',
        'Learn past and future tenses',
        'Practice describing people and places',
        'Start reading simple texts',
      ],
      B1: [
        'Build vocabulary to 2000 words',
        'Master all verb tenses',
        'Practice expressing opinions',
        'Read news articles and short stories',
      ],
      B2: [
        'Expand to 4000 words including idioms',
        'Learn complex grammar structures',
        'Practice debate and discussion',
        'Read literature and academic texts',
      ],
      C1: [
        'Focus on nuance and register',
        'Master advanced grammar patterns',
        'Practice professional communication',
        'Engage with native content',
      ],
      C2: [
        'Refine stylistic expression',
        'Study literary and poetic language',
        'Practice simultaneous translation',
        'Immerse in specialized content',
      ],
    };
    return recommendations[level] || recommendations.A1;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Intro screen
  if (phase === 'intro') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.introContent}>
        <View style={styles.introHeader}>
          <Ionicons name="school" size={64} color={colors.primary} />
          <Text style={styles.introTitle}>Placement Test</Text>
          <Text style={styles.introSubtitle}>{languageName}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>What to expect:</Text>
          <View style={styles.infoList}>
            {PLACEMENT_TEST.sections.map((section, index) => (
              <View key={index} style={styles.infoItem}>
                <View style={styles.infoBullet}>
                  <Text style={styles.infoBulletText}>{index + 1}</Text>
                </View>
                <View style={styles.infoItemContent}>
                  <Text style={styles.infoItemTitle}>{section.name}</Text>
                  <Text style={styles.infoItemDetail}>
                    {section.questions} questions • {section.timeMinutes} min
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.standardsCard}>
          <Ionicons name="ribbon" size={24} color={colors.warning} />
          <View style={styles.standardsContent}>
            <Text style={styles.standardsTitle}>CEFR Aligned</Text>
            <Text style={styles.standardsText}>
              This test follows the Common European Framework of Reference, 
              the international standard for language proficiency.
            </Text>
          </View>
        </View>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Tips:</Text>
          <Text style={styles.tipItem}>• Answer honestly - don't guess randomly</Text>
          <Text style={styles.tipItem}>• The test adapts to your level</Text>
          <Text style={styles.tipItem}>• Take your time on each question</Text>
          <Text style={styles.tipItem}>• You can retake the test later</Text>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
          <Text style={styles.startButtonText}>Begin Test</Text>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Loading screen
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Analyzing your results...</Text>
      </View>
    );
  }

  // Results screen
  if (phase === 'results' && results) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.resultsContent}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Your Level</Text>
          <View style={[styles.levelBadge, { backgroundColor: results.levelInfo.color }]}>
            <Text style={styles.levelBadgeText}>{results.level}</Text>
          </View>
          <Text style={styles.levelName}>{results.levelInfo.name}</Text>
          <Text style={styles.levelDescription}>{results.levelInfo.description}</Text>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>{results.percentage}%</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scoreItem}>
            <Text style={styles.scoreValue}>{results.correctCount}/{results.totalQuestions}</Text>
            <Text style={styles.scoreLabel}>Correct</Text>
          </View>
        </View>

        <View style={styles.canDoCard}>
          <Text style={styles.canDoTitle}>At {results.level} level, you can:</Text>
          {results.levelInfo.canDo.map((item, index) => (
            <View key={index} style={styles.canDoItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.canDoText}>{item}</Text>
            </View>
          ))}
        </View>

        {results.certification && (
          <View style={styles.certCard}>
            <Ionicons name="trophy" size={24} color={colors.warning} />
            <View style={styles.certContent}>
              <Text style={styles.certTitle}>Certification Path</Text>
              <Text style={styles.certName}>{results.certification.name}</Text>
              <Text style={styles.certText}>
                Your current level aligns with official certification standards.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.recommendCard}>
          <Text style={styles.recommendTitle}>Recommended Focus Areas:</Text>
          {results.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendItem}>
              <Text style={styles.recommendBullet}>•</Text>
              <Text style={styles.recommendText}>{rec}</Text>
            </View>
          ))}
        </View>

        <View style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>Next Steps</Text>
          <Text style={styles.nextStepsText}>
            Study ~{results.levelInfo.hours} hours to solidify your {results.level} skills, 
            then aim for {['A1', 'A2', 'B1', 'B2', 'C1'].includes(results.level) 
              ? ['A2', 'B1', 'B2', 'C1', 'C2'][['A1', 'A2', 'B1', 'B2', 'C1'].indexOf(results.level)]
              : 'mastery'
            }.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('Home', { 
            cefrLevel: results.level,
            language,
          })}
        >
          <Text style={styles.continueButtonText}>Start Learning at {results.level}</Text>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Testing screen
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.testHeader}>
        <View style={styles.testHeaderLeft}>
          <Text style={styles.sectionName}>
            {PLACEMENT_TEST.sections[currentSection].name}
          </Text>
          <Text style={styles.questionCount}>
            Question {currentQuestion + 1} of {PLACEMENT_TEST.sections[currentSection].questions}
          </Text>
        </View>
        <View style={styles.timerBox}>
          <Ionicons name="time" size={18} color={timeRemaining < 60 ? colors.error : colors.text} />
          <Text style={[
            styles.timerText,
            timeRemaining < 60 && styles.timerWarning
          ]}>
            {formatTime(timeRemaining)}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressFill,
            { 
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              })
            }
          ]} 
        />
      </View>

      {/* Question */}
      <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
        {currentQuestionData.passage && (
          <View style={styles.passageBox}>
            <Text style={styles.passageText}>{currentQuestionData.passage}</Text>
          </View>
        )}
        
        <Text style={styles.questionText}>{currentQuestionData.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestionData.options.map((option, index) => {
            let optionStyle = styles.optionButton;
            if (selectedAnswer === option) {
              optionStyle = option === currentQuestionData.correct 
                ? [styles.optionButton, styles.optionCorrect]
                : [styles.optionButton, styles.optionWrong];
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* Difficulty indicator (subtle) */}
      <View style={styles.difficultyIndicator}>
        <Text style={styles.difficultyText}>Level: {difficulty}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  introContent: {
    padding: 20,
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  introTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
  },
  introSubtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBulletText: {
    color: '#fff',
    fontWeight: '600',
  },
  infoItemContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  infoItemDetail: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  standardsCard: {
    flexDirection: 'row',
    backgroundColor: colors.warningLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  standardsContent: {
    flex: 1,
  },
  standardsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  standardsText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tipsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  startButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textSecondary,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
  },
  testHeaderLeft: {},
  sectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  questionCount: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  timerWarning: {
    color: colors.error,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.border,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  questionContainer: {
    flex: 1,
    padding: 20,
  },
  passageBox: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  passageText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 24,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionCorrect: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  optionWrong: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  difficultyIndicator: {
    padding: 12,
    alignItems: 'center',
  },
  difficultyText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  resultsContent: {
    padding: 20,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  levelBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  levelName: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
  },
  levelDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  scoreLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  scoreDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginHorizontal: 20,
  },
  canDoCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  canDoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  canDoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  canDoText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
  certCard: {
    flexDirection: 'row',
    backgroundColor: colors.warningLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  certContent: {
    flex: 1,
  },
  certTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  certName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  certText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  recommendCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  recommendItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  recommendBullet: {
    color: colors.primary,
    fontWeight: '600',
  },
  recommendText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },
  nextStepsCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  nextStepsText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PlacementTestScreen;
