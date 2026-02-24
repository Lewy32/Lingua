import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import RankBadge from './RankBadge';

/**
 * LeaderboardRow - Displays a single leaderboard entry
 * @param {number} position - User's position (1-based)
 * @param {object} user - User data
 * @param {boolean} isCurrentUser - Whether this is the current user
 * @param {string} xpType - 'total' or 'weekly' to display appropriate XP
 */
const LeaderboardRow = ({ position, user, isCurrentUser = false, xpType = 'total' }) => {
  const { name, level, xp, weeklyXP, streak, rank } = user;
  
  // Determine XP to display
  const displayXP = xpType === 'weekly' ? weeklyXP : xp;

  // Generate initials for avatar
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Get position styling
  const getPositionStyle = () => {
    switch (position) {
      case 1:
        return { color: colors.podiumFirst, emoji: '🥇' };
      case 2:
        return { color: colors.podiumSecond, emoji: '🥈' };
      case 3:
        return { color: colors.podiumThird, emoji: '🥉' };
      default:
        return { color: colors.textSecondary, emoji: null };
    }
  };

  const positionStyle = getPositionStyle();

  return (
    <View
      style={[
        styles.container,
        isCurrentUser && styles.currentUserContainer,
      ]}
    >
      {/* Position */}
      <View style={styles.positionContainer}>
        {positionStyle.emoji ? (
          <Text style={styles.positionEmoji}>{positionStyle.emoji}</Text>
        ) : (
          <Text style={[styles.position, { color: positionStyle.color }]}>
            {position}
          </Text>
        )}
      </View>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.initials}>{initials}</Text>
      </View>

      {/* User info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text
            style={[styles.name, isCurrentUser && styles.currentUserName]}
            numberOfLines={1}
          >
            {name}
            {isCurrentUser && ' (You)'}
          </Text>
          <RankBadge rank={rank} size="small" />
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="trending-up" size={12} color={colors.level} />
            <Text style={styles.statText}>Lvl {level || 1}</Text>
          </View>
          
          <View style={styles.stat}>
            <Ionicons name="flame" size={12} color={colors.streak} />
            <Text style={styles.statText}>{streak || 0}</Text>
          </View>
        </View>
      </View>

      {/* XP */}
      <View style={styles.xpContainer}>
        <Text style={[styles.xp, isCurrentUser && styles.currentUserXP]}>
          {displayXP?.toLocaleString() || 0}
        </Text>
        <Text style={styles.xpLabel}>XP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  currentUserContainer: {
    backgroundColor: colors.primaryDark,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  positionContainer: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positionEmoji: {
    fontSize: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  initials: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  name: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  currentUserName: {
    color: colors.textWhite,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  statText: {
    color: colors.textSecondary,
    fontSize: 11,
    marginLeft: 3,
  },
  xpContainer: {
    alignItems: 'flex-end',
  },
  xp: {
    color: colors.xp,
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentUserXP: {
    color: colors.textWhite,
  },
  xpLabel: {
    color: colors.textSecondary,
    fontSize: 10,
  },
});

export default LeaderboardRow;
