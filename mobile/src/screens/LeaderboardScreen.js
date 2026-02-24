import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import LeaderboardRow from '../components/LeaderboardRow';
import { useSocial } from '../context/SocialContext';

const TABS = [
  { key: 'friends', label: 'Friends', icon: 'people' },
  { key: 'global', label: 'Global', icon: 'globe' },
  { key: 'weekly', label: 'Weekly', icon: 'calendar' },
];

const LeaderboardScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('friends');
  const [refreshing, setRefreshing] = useState(false);

  const {
    friendsLeaderboard,
    globalLeaderboard,
    weeklyLeaderboard,
    leaderboardLoading,
    userPosition,
    nextWeeklyReset,
    fetchFriendsLeaderboard,
    fetchGlobalLeaderboard,
    fetchWeeklyLeaderboard,
  } = useSocial();

  const fetchLeaderboard = useCallback(async (tab) => {
    switch (tab) {
      case 'friends':
        await fetchFriendsLeaderboard();
        break;
      case 'global':
        await fetchGlobalLeaderboard();
        break;
      case 'weekly':
        await fetchWeeklyLeaderboard();
        break;
    }
  }, [fetchFriendsLeaderboard, fetchGlobalLeaderboard, fetchWeeklyLeaderboard]);

  useEffect(() => {
    fetchLeaderboard(activeTab);
  }, [activeTab]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchLeaderboard(activeTab);
    setRefreshing(false);
  }, [activeTab, fetchLeaderboard]);

  const getLeaderboardData = () => {
    switch (activeTab) {
      case 'friends':
        return friendsLeaderboard;
      case 'global':
        return globalLeaderboard;
      case 'weekly':
        return weeklyLeaderboard;
      default:
        return [];
    }
  };

  const formatTimeUntilReset = () => {
    if (!nextWeeklyReset) return null;
    
    const now = new Date();
    const reset = new Date(nextWeeklyReset);
    const diff = reset - now;
    
    if (diff <= 0) return 'Resetting soon...';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `Resets in ${days}d ${hours}h`;
    return `Resets in ${hours}h`;
  };

  const renderHeader = () => {
    const data = getLeaderboardData();
    const top3 = data.slice(0, 3);
    
    if (top3.length === 0) return null;

    return (
      <View style={styles.podiumContainer}>
        {/* Second place */}
        {top3[1] && (
          <View style={[styles.podiumItem, styles.podiumSecond]}>
            <View style={[styles.podiumAvatar, styles.secondAvatar]}>
              <Text style={styles.podiumEmoji}>🥈</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>
              {top3[1].name}
            </Text>
            <Text style={styles.podiumXP}>
              {(activeTab === 'weekly' ? top3[1].weeklyXP : top3[1].xp)?.toLocaleString()} XP
            </Text>
            <View style={[styles.podiumBar, styles.secondBar]} />
          </View>
        )}
        
        {/* First place */}
        {top3[0] && (
          <View style={[styles.podiumItem, styles.podiumFirst]}>
            <View style={[styles.podiumAvatar, styles.firstAvatar]}>
              <Text style={styles.podiumEmoji}>🥇</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>
              {top3[0].name}
            </Text>
            <Text style={styles.podiumXP}>
              {(activeTab === 'weekly' ? top3[0].weeklyXP : top3[0].xp)?.toLocaleString()} XP
            </Text>
            <View style={[styles.podiumBar, styles.firstBar]} />
          </View>
        )}
        
        {/* Third place */}
        {top3[2] && (
          <View style={[styles.podiumItem, styles.podiumThird]}>
            <View style={[styles.podiumAvatar, styles.thirdAvatar]}>
              <Text style={styles.podiumEmoji}>🥉</Text>
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>
              {top3[2].name}
            </Text>
            <Text style={styles.podiumXP}>
              {(activeTab === 'weekly' ? top3[2].weeklyXP : top3[2].xp)?.toLocaleString()} XP
            </Text>
            <View style={[styles.podiumBar, styles.thirdBar]} />
          </View>
        )}
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="trophy-outline" size={64} color={colors.textSecondary} />
      <Text style={styles.emptyTitle}>No data yet</Text>
      <Text style={styles.emptySubtitle}>
        {activeTab === 'friends'
          ? 'Add friends to see them on the leaderboard'
          : 'Complete lessons to earn XP and rank up'}
      </Text>
    </View>
  );

  const data = getLeaderboardData();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Leaderboard</Text>
        
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={18}
              color={activeTab === tab.key ? colors.textWhite : colors.textSecondary}
            />
            <Text
              style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Weekly reset timer */}
      {activeTab === 'weekly' && nextWeeklyReset && (
        <View style={styles.resetTimer}>
          <Ionicons name="time-outline" size={16} color={colors.warning} />
          <Text style={styles.resetText}>{formatTimeUntilReset()}</Text>
        </View>
      )}

      {/* User's position */}
      {userPosition && (
        <View style={styles.userPosition}>
          <Text style={styles.userPositionText}>
            Your Position: <Text style={styles.positionNumber}>#{userPosition}</Text>
          </Text>
        </View>
      )}

      {/* Leaderboard */}
      {leaderboardLoading && data.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={data.slice(3)} // Skip top 3 shown in podium
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <LeaderboardRow
              position={item.position}
              user={item}
              isCurrentUser={item.isCurrentUser}
              xpType={activeTab === 'weekly' ? 'weekly' : 'total'}
            />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={data.length === 0 && styles.emptyList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 4,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.textWhite,
  },
  resetTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 4,
  },
  resetText: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: '500',
  },
  userPosition: {
    alignItems: 'center',
    marginBottom: 12,
  },
  userPositionText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  positionNumber: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 12,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumFirst: {
    marginHorizontal: 8,
  },
  podiumSecond: {},
  podiumThird: {},
  podiumAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  firstAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.podiumFirst + '30',
    borderWidth: 3,
    borderColor: colors.podiumFirst,
  },
  secondAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.podiumSecond + '30',
    borderWidth: 2,
    borderColor: colors.podiumSecond,
  },
  thirdAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.podiumThird + '30',
    borderWidth: 2,
    borderColor: colors.podiumThird,
  },
  podiumEmoji: {
    fontSize: 28,
  },
  podiumName: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  podiumXP: {
    color: colors.xp,
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  podiumBar: {
    width: '80%',
    borderRadius: 4,
  },
  firstBar: {
    height: 80,
    backgroundColor: colors.podiumFirst,
  },
  secondBar: {
    height: 60,
    backgroundColor: colors.podiumSecond,
  },
  thirdBar: {
    height: 48,
    backgroundColor: colors.podiumThird,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default LeaderboardScreen;
