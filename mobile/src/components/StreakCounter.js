import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const StreakCounter = ({ 
  streak = 0, 
  size = 20,
  showLabel = false,
  style,
  animated = false,
}) => {
  const [flameAnim] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    if (animated && streak > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(flameAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(flameAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [streak, animated]);

  const isActive = streak > 0;

  return (
    <Animated.View 
      style={[
        styles.container, 
        style,
        animated && isActive ? { transform: [{ scale: flameAnim }] } : null,
      ]}
    >
      <Ionicons 
        name="flame" 
        size={size} 
        color={isActive ? colors.streak : colors.textSecondary} 
      />
      <Text style={[styles.count, { fontSize: size * 0.8 }]}>{streak}</Text>
      {showLabel && (
        <Text style={styles.label}>Streak</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    color: colors.text,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 4,
  },
});

export default StreakCounter;
