import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const XPBadge = ({ 
  xp = 0, 
  size = 16,
  showIcon = true,
  compact = false,
  style,
  animated = false,
  gain = 0, // Show XP gain animation
}) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const [gainAnim] = React.useState(new Animated.Value(0));
  const [gainOpacity] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (animated && gain > 0) {
      // Pulse animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Float up animation for gain
      gainOpacity.setValue(1);
      gainAnim.setValue(0);
      Animated.parallel([
        Animated.timing(gainAnim, {
          toValue: -30,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(gainOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [gain]);

  const formatXP = (value) => {
    if (compact && value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <View style={[styles.wrapper, style]}>
      <Animated.View 
        style={[
          styles.container, 
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        {showIcon && (
          <Ionicons 
            name="star" 
            size={size} 
            color={colors.xp} 
          />
        )}
        <Text style={[styles.text, { fontSize: size }]}>{formatXP(xp)} XP</Text>
      </Animated.View>

      {/* XP Gain floating text */}
      {gain > 0 && (
        <Animated.Text 
          style={[
            styles.gainText,
            {
              transform: [{ translateY: gainAnim }],
              opacity: gainOpacity,
            }
          ]}
        >
          +{gain}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.xp,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  gainText: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: colors.success,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default XPBadge;
