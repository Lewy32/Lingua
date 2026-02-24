import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const LevelBadge = ({ 
  level = 1, 
  size = 16,
  showLabel = true,
  style,
}) => {
  const getLevelName = (lvl) => {
    if (lvl <= 3) return 'Beginner';
    if (lvl <= 7) return 'Elementary';
    if (lvl <= 15) return 'Intermediate';
    if (lvl <= 25) return 'Advanced';
    return 'Expert';
  };

  const getLevelColor = (lvl) => {
    if (lvl <= 3) return '#58CC02'; // Green
    if (lvl <= 7) return '#1CB0F6'; // Blue
    if (lvl <= 15) return '#9B59B6'; // Purple
    if (lvl <= 25) return '#FF6B35'; // Orange
    return '#FFD700'; // Gold
  };

  return (
    <View style={[styles.container, style]}>
      <Ionicons 
        name="star" 
        size={size} 
        color={getLevelColor(level)} 
      />
      <Text style={[styles.level, { fontSize: size }]}>Lv.{level}</Text>
      {showLabel && (
        <Text style={[styles.label, { color: getLevelColor(level) }]}>
          {getLevelName(level)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  level: {
    color: colors.text,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  label: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default LevelBadge;
