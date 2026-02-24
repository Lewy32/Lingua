import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import OnlineIndicator from './OnlineIndicator';
import RankBadge from './RankBadge';

/**
 * FriendCard - Displays friend info with status and actions
 * @param {object} friend - Friend data object
 * @param {function} onPress - Called when card is pressed
 * @param {function} onRemove - Called when remove button is pressed
 * @param {boolean} showRemove - Whether to show remove button
 */
const FriendCard = ({ friend, onPress, onRemove, showRemove = false }) => {
  const {
    name,
    level,
    xp,
    streak,
    rank,
    isOnline,
  } = friend;

  // Generate initials for avatar
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Avatar with online indicator */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        <OnlineIndicator
          isOnline={isOnline}
          size={14}
          style={styles.onlineIndicator}
        />
      </View>

      {/* Friend info */}
      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <RankBadge rank={rank} size="small" />
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Ionicons name="star" size={14} color={colors.xp} />
            <Text style={styles.statText}>{xp?.toLocaleString() || 0} XP</Text>
          </View>
          
          <View style={styles.stat}>
            <Ionicons name="trending-up" size={14} color={colors.level} />
            <Text style={styles.statText}>Lvl {level || 1}</Text>
          </View>
          
          <View style={styles.stat}>
            <Ionicons name="flame" size={14} color={colors.streak} />
            <Text style={styles.statText}>{streak || 0}</Text>
          </View>
        </View>
      </View>

      {/* Remove button */}
      {showRemove && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove?.(friend)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close-circle" size={24} color={colors.error} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
    marginVertical: 6,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
  removeButton: {
    padding: 4,
  },
});

export default FriendCard;
