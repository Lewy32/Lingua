import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const RANK_CONFIG = {
  Bronze: { icon: '🥉', color: colors.rankBronze },
  Silver: { icon: '🥈', color: colors.rankSilver },
  Gold: { icon: '🥇', color: colors.rankGold },
  Platinum: { icon: '💎', color: colors.rankPlatinum },
  Diamond: { icon: '💠', color: colors.rankDiamond },
  Master: { icon: '👑', color: colors.rankMaster },
};

/**
 * RankBadge - Displays user's rank with icon and color
 * @param {string} rank - User's rank (Bronze, Silver, Gold, Platinum, Diamond, Master)
 * @param {string} size - 'small', 'medium', or 'large'
 * @param {boolean} showLabel - Whether to show rank name
 * @param {object} style - Additional styles
 */
const RankBadge = ({ rank = 'Bronze', size = 'medium', showLabel = false, style }) => {
  const config = RANK_CONFIG[rank] || RANK_CONFIG.Bronze;
  
  const sizes = {
    small: { badge: 24, icon: 14, text: 10 },
    medium: { badge: 36, icon: 20, text: 12 },
    large: { badge: 48, icon: 28, text: 14 },
  };
  
  const sizeConfig = sizes[size];

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.badge,
          {
            width: sizeConfig.badge,
            height: sizeConfig.badge,
            borderRadius: sizeConfig.badge / 2,
            borderColor: config.color,
          },
        ]}
      >
        <Text style={{ fontSize: sizeConfig.icon }}>{config.icon}</Text>
      </View>
      {showLabel && (
        <Text style={[styles.label, { fontSize: sizeConfig.text, color: config.color }]}>
          {rank}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 4,
    fontWeight: '600',
  },
});

export default RankBadge;
