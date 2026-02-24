import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const HeartDisplay = ({ 
  hearts = 5, 
  maxHearts = 5,
  size = 20,
  showLabel = false,
  style,
  animated = false,
}) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    if (animated) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [hearts]);

  // Simple numeric display mode
  return (
    <Animated.View 
      style={[
        styles.container, 
        style,
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <Ionicons 
        name={hearts > 0 ? "heart" : "heart-outline"} 
        size={size} 
        color={hearts > 0 ? colors.heart : colors.textSecondary} 
      />
      <Text style={[styles.count, { fontSize: size * 0.8 }]}>{hearts}</Text>
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
});

export default HeartDisplay;
