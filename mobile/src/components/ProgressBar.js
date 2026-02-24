import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import colors from '../constants/colors';

const ProgressBar = ({ 
  progress = 0, // 0 to 1
  height = 8,
  backgroundColor = colors.progressBackground,
  fillColor = colors.progressFill,
  style,
  animated = true,
}) => {
  const [animatedWidth] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(progress);
    }
  }, [progress, animated]);

  const width = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height, backgroundColor }, style]}>
      <Animated.View 
        style={[
          styles.fill, 
          { 
            width, 
            backgroundColor: fillColor,
            height: '100%',
          }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 100,
  },
});

export default ProgressBar;
