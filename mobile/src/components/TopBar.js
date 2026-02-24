import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import StreakCounter from './StreakCounter';
import HeartDisplay from './HeartDisplay';
import LevelBadge from './LevelBadge';
import ProgressBar from './ProgressBar';

const TopBar = ({ 
  streak = 0, 
  hearts = 5, 
  level = 1,
  showProgress = false,
  progress = 0,
  onClose,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        {onClose ? (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={colors.textSecondary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}

        <View style={styles.stats}>
          <StreakCounter streak={streak} size={18} />
          <View style={styles.divider} />
          <HeartDisplay hearts={hearts} size={18} />
          <View style={styles.divider} />
          <LevelBadge level={level} size={14} showLabel={false} />
        </View>
      </View>

      {showProgress && (
        <ProgressBar 
          progress={progress} 
          height={6} 
          style={styles.progressBar}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    padding: 4,
  },
  spacer: {
    width: 36,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginHorizontal: 12,
  },
  progressBar: {
    marginTop: 12,
  },
});

export default TopBar;
