import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLesson } from '../context/LessonContext';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import colors from '../constants/colors';
import { FarsiText, Button, Mascot, TopBar } from '../components';

const LessonScreen = ({ route, navigation }) => {
  const { lessonId } = route.params;
  const { getLessonById } = useLesson();
  const { getLessonProgress } = useProgress();
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    setIsLoading(true);
    const lessonData = await getLessonById(lessonId);
    setLesson(lessonData);
    setIsLoading(false);
  };

  const startExercises = () => {
    if (lesson && lesson.exercises) {
      navigation.navigate('Exercise', {
        lessonId: lesson._id,
        exercises: lesson.exercises,
      });
    }
  };

  const progress = getLessonProgress(lessonId);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading lesson...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={64} color={colors.error} />
          <Text style={styles.errorText}>Lesson not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lesson {lesson.chapterNumber}</Text>
        <View style={styles.headerRight}>
          {progress?.status === 'completed' && (
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Lesson Hero */}
        <View style={styles.heroSection}>
          <Mascot size={80} expression="happy" />
          <Text style={styles.title}>{lesson.title}</Text>
          <FarsiText size="large" style={styles.titleFarsi}>
            {lesson.titleFarsi}
          </FarsiText>
        </View>

        <Text style={styles.description}>{lesson.description}</Text>

        {/* XP Reward */}
        <View style={styles.rewardCard}>
          <Ionicons name="star" size={24} color={colors.xp} />
          <Text style={styles.rewardText}>
            Earn <Text style={styles.rewardAmount}>{lesson.xpReward} XP</Text> for completing this lesson
          </Text>
        </View>

        {/* Cultural Content */}
        {lesson.culturalContent && (
          <View style={styles.culturalCard}>
            <View style={styles.culturalHeader}>
              <Ionicons name="book" size={24} color={colors.secondary} />
              <Text style={styles.culturalTitle}>{lesson.culturalContent.title}</Text>
            </View>
            <Text style={styles.culturalContent}>{lesson.culturalContent.content}</Text>
            
            {lesson.culturalContent.facts && lesson.culturalContent.facts.length > 0 && (
              <View style={styles.factsContainer}>
                {lesson.culturalContent.facts.map((fact, index) => (
                  <View key={index} style={styles.factItem}>
                    <Ionicons name="bulb" size={16} color={colors.warning} />
                    <Text style={styles.factText}>{fact}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Vocabulary Preview */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="text" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>
                Vocabulary ({lesson.vocabulary.length} words)
              </Text>
            </View>
            
            {lesson.vocabulary.slice(0, 4).map((word, index) => (
              <View key={index} style={styles.vocabCard}>
                <View style={styles.vocabMain}>
                  <FarsiText size="large">{word.farsi}</FarsiText>
                  <Text style={styles.vocabWord}>{word.word}</Text>
                </View>
                <Text style={styles.vocabPronunciation}>/{word.pronunciation}/</Text>
              </View>
            ))}
            
            {lesson.vocabulary.length > 4 && (
              <Text style={styles.moreText}>
                + {lesson.vocabulary.length - 4} more words in the lesson
              </Text>
            )}
          </View>
        )}

        {/* Exercises Info */}
        {lesson.exercises && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="game-controller" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>
                {lesson.exercises.length} Exercises
              </Text>
            </View>
            
            <View style={styles.exerciseTypes}>
              {getExerciseTypes(lesson.exercises).map((type, index) => (
                <View key={index} style={styles.exerciseType}>
                  <Ionicons name={getExerciseIcon(type)} size={20} color={colors.textSecondary} />
                  <Text style={styles.exerciseTypeName}>{formatExerciseType(type)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Previous Score */}
        {progress?.score && (
          <View style={styles.previousScore}>
            <Text style={styles.previousScoreLabel}>Previous Score</Text>
            <View style={styles.scoreDisplay}>
              <Ionicons name="trophy" size={24} color={colors.xp} />
              <Text style={styles.scoreValue}>{progress.score}%</Text>
            </View>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={progress?.status === 'completed' ? 'Practice Again' : 'Start Lesson'}
          onPress={startExercises}
          icon={<Ionicons name="play" size={20} color={colors.textWhite} style={{ marginRight: 8 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

const getExerciseTypes = (exercises) => {
  const types = [...new Set(exercises.map(e => e.type))];
  return types;
};

const getExerciseIcon = (type) => {
  const icons = {
    vocabularyMatch: 'swap-horizontal',
    flashCard: 'copy',
    multipleChoice: 'list',
    reading: 'book',
    writing: 'create',
    speaking: 'mic',
    fillInBlanks: 'ellipsis-horizontal',
  };
  return icons[type] || 'help-circle';
};

const formatExerciseType = (type) => {
  const names = {
    vocabularyMatch: 'Matching',
    flashCard: 'Flash Cards',
    multipleChoice: 'Multiple Choice',
    reading: 'Reading',
    writing: 'Writing',
    speaking: 'Speaking',
    fillInBlanks: 'Fill Blanks',
  };
  return names[type] || type;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: colors.textSecondary,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerRight: {
    width: 32,
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  titleFarsi: {
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.xp + '20',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  rewardText: {
    marginLeft: 12,
    fontSize: 14,
    color: colors.text,
  },
  rewardAmount: {
    fontWeight: 'bold',
    color: colors.xp,
  },
  culturalCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  culturalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  culturalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  culturalContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  factsContainer: {
    marginTop: 16,
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  factText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  vocabCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  vocabMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  vocabWord: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  vocabPronunciation: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  moreText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  exerciseTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exerciseType: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  exerciseTypeName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  previousScore: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  previousScoreLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.xp,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default LessonScreen;
