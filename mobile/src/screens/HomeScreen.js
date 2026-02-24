import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useLesson } from '../context/LessonContext';
import { useProgress } from '../context/ProgressContext';
import colors from '../constants/colors';
import { 
  Mascot, 
  StreakCounter, 
  HeartDisplay, 
  LevelBadge, 
  ProgressBar,
  XPBadge,
} from '../components';
import { getGreeting, levelProgress } from '../utils/dateUtils';

const HomeScreen = ({ navigation }) => {
  const { user, refreshUser } = useAuth();
  const { lessons, fetchLessons, isLoading: lessonsLoading } = useLesson();
  const { progress, fetchProgress, isLoading: progressLoading } = useProgress();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([fetchLessons(), fetchProgress(), refreshUser()]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const beginnerLessons = lessons.filter(l => l.level === 'beginner');
  const completedCount = progress.filter(p => p.status === 'completed').length;
  const levelProgressPercent = user ? levelProgress(user.xp) : 0;

  const getNextLesson = () => {
    // Find the first incomplete lesson
    for (const lesson of beginnerLessons) {
      const lessonProgress = progress.find(p => p.lessonId === lesson._id);
      if (!lessonProgress || lessonProgress.status !== 'completed') {
        return lesson;
      }
    }
    return beginnerLessons[0];
  };

  const nextLesson = getNextLesson();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Top Stats Bar - No hearts! Learning should never be limited */}
        <View style={styles.topBar}>
          <StreakCounter streak={user?.streak?.currentStreak || 0} size={18} />
          <XPBadge xp={user?.xp || 0} size={16} showIcon />
          <LevelBadge level={user?.level || 1} size={14} showLabel={false} />
        </View>

        {/* Start Session Card */}
        <TouchableOpacity 
          style={styles.sessionCard}
          onPress={() => nextLesson && navigation.navigate('Lesson', { lessonId: nextLesson._id })}
          activeOpacity={0.9}
        >
          <View style={styles.sessionContent}>
            <Mascot size={80} expression="happy" />
            <View style={styles.sessionText}>
              <Text style={styles.sessionTitle}>Start your session</Text>
              <View style={styles.xpGoal}>
                <XPBadge xp={user?.xp || 0} size={14} showIcon />
                <Text style={styles.xpGoalText}> / 100 XP today</Text>
              </View>
            </View>
          </View>
          <View style={styles.sessionProgress}>
            <ProgressBar 
              progress={Math.min((user?.xp || 0) / 100, 1)} 
              height={6}
            />
          </View>
        </TouchableOpacity>

        {/* Level Progress Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <LevelBadge level={user?.level || 1} size={16} />
            <Text style={styles.xpText}>{user?.xp || 0} XP total</Text>
          </View>
          <ProgressBar 
            progress={levelProgressPercent / 100} 
            height={8}
            style={styles.levelProgress}
          />
          <Text style={styles.progressText}>
            {Math.round(levelProgressPercent)}% to Level {(user?.level || 1) + 1}
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Ionicons name="book" size={24} color={colors.primary} />
            <Text style={styles.statsNumber}>{user?.stats?.wordsLearned || 0}</Text>
            <Text style={styles.statsLabel}>Words</Text>
          </View>
          <View style={styles.statsCard}>
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            <Text style={styles.statsNumber}>{completedCount}</Text>
            <Text style={styles.statsLabel}>Lessons</Text>
          </View>
          <View style={styles.statsCard}>
            <Ionicons name="analytics" size={24} color={colors.info} />
            <Text style={styles.statsNumber}>{user?.stats?.accuracy || 0}%</Text>
            <Text style={styles.statsLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Learning</Text>

          {lessonsLoading ? (
            <Text style={styles.loadingText}>Loading lessons...</Text>
          ) : beginnerLessons.length > 0 ? (
            beginnerLessons.slice(0, 6).map((lesson, index) => {
              const lessonProgress = progress.find(p => p.lessonId === lesson._id);
              const isCompleted = lessonProgress?.status === 'completed';
              const isInProgress = lessonProgress?.status === 'in_progress';
              const isLocked = index > 0 && !progress.find(
                p => p.lessonId === beginnerLessons[index - 1]._id && p.status === 'completed'
              );

              return (
                <TouchableOpacity
                  key={lesson._id}
                  style={[
                    styles.lessonCard,
                    isLocked && styles.lessonCardLocked,
                  ]}
                  onPress={() => !isLocked && navigation.navigate('Lesson', { lessonId: lesson._id })}
                  disabled={isLocked}
                >
                  <View style={[
                    styles.lessonIcon,
                    isCompleted && styles.lessonIconCompleted,
                    isLocked && styles.lessonIconLocked,
                  ]}>
                    {isCompleted ? (
                      <Ionicons name="checkmark" size={24} color={colors.textWhite} />
                    ) : isLocked ? (
                      <Ionicons name="lock-closed" size={20} color={colors.textSecondary} />
                    ) : (
                      <Text style={styles.lessonNumber}>{lesson.chapterNumber}</Text>
                    )}
                  </View>
                  
                  <View style={styles.lessonContent}>
                    <Text style={[
                      styles.lessonTitle,
                      isLocked && styles.lessonTitleLocked,
                    ]}>
                      {lesson.title}
                    </Text>
                    <Text style={[
                      styles.lessonFarsi,
                      isLocked && styles.lessonFarsiLocked,
                    ]}>
                      {lesson.titleFarsi}
                    </Text>
                    {lessonProgress?.score && (
                      <View style={styles.lessonScore}>
                        <Ionicons name="star" size={12} color={colors.xp} />
                        <Text style={styles.lessonScoreText}>{lessonProgress.score}%</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.lessonArrow}>
                    {!isLocked && (
                      <Ionicons 
                        name="chevron-forward" 
                        size={24} 
                        color={isCompleted ? colors.success : colors.primary} 
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.emptyText}>No lessons available yet</Text>
          )}

          {beginnerLessons.length > 6 && (
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all lessons</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="repeat" size={28} color={colors.primary} />
              </View>
              <Text style={styles.actionText}>Review</Text>
              <Text style={styles.actionSubtext}>SRS cards</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <View style={[styles.actionIcon, { backgroundColor: colors.warning + '20' }]}>
                <Ionicons name="flash" size={28} color={colors.warning} />
              </View>
              <Text style={styles.actionText}>Quick</Text>
              <Text style={styles.actionSubtext}>5 min drill</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Culture')}
            >
              <View style={[styles.actionIcon, { backgroundColor: colors.secondary + '20' }]}>
                <Ionicons name="book" size={28} color={colors.secondary} />
              </View>
              <Text style={styles.actionText}>Culture</Text>
              <Text style={styles.actionSubtext}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 20,
  },
  sessionCard: {
    backgroundColor: colors.backgroundSecondary,
    margin: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  sessionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionText: {
    marginLeft: 16,
    flex: 1,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  xpGoal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpGoalText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  sessionProgress: {
    marginTop: 16,
  },
  levelCard: {
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  levelProgress: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statsCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  statsLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  lessonCard: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  lessonCardLocked: {
    opacity: 0.5,
  },
  lessonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonIconCompleted: {
    backgroundColor: colors.success,
  },
  lessonIconLocked: {
    backgroundColor: colors.neutral,
  },
  lessonNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  lessonContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  lessonTitleLocked: {
    color: colors.textSecondary,
  },
  lessonFarsi: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 2,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  lessonFarsiLocked: {
    color: colors.textSecondary,
  },
  lessonScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  lessonScoreText: {
    fontSize: 12,
    color: colors.xp,
    marginLeft: 4,
  },
  lessonArrow: {
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  viewAllText: {
    color: colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  actionSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  loadingText: {
    textAlign: 'center',
    color: colors.textSecondary,
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    padding: 20,
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;
