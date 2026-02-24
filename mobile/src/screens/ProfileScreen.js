import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import colors from '../constants/colors';
import { Mascot, ProgressBar, LevelBadge, XPBadge, StreakCounter, HeartDisplay } from '../components';
import { levelProgress } from '../utils/dateUtils';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { progress, getCompletedLessonsCount, getTotalAccuracy } = useProgress();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const xpProgress = levelProgress(user?.xp || 0);
  const completedLessons = getCompletedLessonsCount();
  const accuracy = getTotalAccuracy();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Mascot size={100} expression="happy" />
          <Text style={styles.userName}>{user?.name || 'Learner'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          
          <View style={styles.levelContainer}>
            <LevelBadge level={user?.level || 1} size={18} />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <StreakCounter streak={user?.streak?.currentStreak || 0} size={28} animated />
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <HeartDisplay hearts={user?.hearts || 5} size={28} />
            <Text style={styles.statLabel}>Hearts</Text>
          </View>
          <View style={styles.statCard}>
            <XPBadge xp={user?.xp || 0} size={20} compact />
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Level Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLevel}>Level {user?.level || 1}</Text>
              <Text style={styles.progressPercent}>{Math.round(xpProgress)}%</Text>
            </View>
            <ProgressBar progress={xpProgress / 100} height={12} />
            <Text style={styles.progressHint}>
              {100 - Math.round(xpProgress)}% to Level {(user?.level || 1) + 1}
            </Text>
          </View>
        </View>

        {/* Learning Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Statistics</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="book" size={24} color={colors.primary} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{completedLessons}</Text>
                <Text style={styles.statName}>Lessons Completed</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="text" size={24} color={colors.secondary} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{user?.stats?.wordsLearned || 0}</Text>
                <Text style={styles.statName}>Words Learned</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="analytics" size={24} color={colors.success} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{accuracy}%</Text>
                <Text style={styles.statName}>Accuracy</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Ionicons name="time" size={24} color={colors.warning} />
              </View>
              <View style={styles.statInfo}>
                <Text style={styles.statValue}>{user?.stats?.studyMinutes || 0}</Text>
                <Text style={styles.statName}>Minutes Studied</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Achievements Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            <View style={[styles.achievement, completedLessons >= 1 && styles.achievementUnlocked]}>
              <Ionicons name="ribbon" size={32} color={completedLessons >= 1 ? colors.xp : colors.textLight} />
              <Text style={styles.achievementText}>First Lesson</Text>
            </View>
            <View style={[styles.achievement, (user?.streak?.currentStreak || 0) >= 7 && styles.achievementUnlocked]}>
              <Ionicons name="flame" size={32} color={(user?.streak?.currentStreak || 0) >= 7 ? colors.streak : colors.textLight} />
              <Text style={styles.achievementText}>7 Day Streak</Text>
            </View>
            <View style={[styles.achievement, (user?.xp || 0) >= 1000 && styles.achievementUnlocked]}>
              <Ionicons name="star" size={32} color={(user?.xp || 0) >= 1000 ? colors.xp : colors.textLight} />
              <Text style={styles.achievementText}>1000 XP</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <Text style={styles.settingsText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="volume-high-outline" size={24} color={colors.text} />
            <Text style={styles.settingsText}>Sound Effects</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <Ionicons name="help-circle-outline" size={24} color={colors.text} />
            <Text style={styles.settingsText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  profileCard: {
    alignItems: 'center',
    padding: 24,
    marginHorizontal: 16,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 20,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  levelContainer: {
    marginTop: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
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
  progressCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    borderRadius: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  progressPercent: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  progressHint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statInfo: {
    marginLeft: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  statName: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  achievementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievement: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    opacity: 0.5,
  },
  achievementUnlocked: {
    opacity: 1,
  },
  achievementText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  bottomPadding: {
    height: 40,
  },
});

export default ProfileScreen;
