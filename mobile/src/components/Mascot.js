import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import colors from '../constants/colors';

const Mascot = ({ 
  size = 100, 
  style, 
  animated = false,
  expression = 'happy' // happy, sad, thinking, excited
}) => {
  const [bounceAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animated]);

  const getEyeStyle = () => {
    switch (expression) {
      case 'sad':
        return { transform: [{ scaleY: 0.7 }], top: size * 0.32 };
      case 'thinking':
        return { transform: [{ scaleY: 0.5 }], top: size * 0.3 };
      case 'excited':
        return { transform: [{ scaleY: 1.2 }], top: size * 0.28 };
      default:
        return { top: size * 0.3 };
    }
  };

  const eyeWidth = size * 0.12;
  const eyeHeight = size * 0.18;
  const eyeGap = size * 0.15;

  const Container = animated ? Animated.View : View;
  const containerStyle = animated 
    ? [styles.container, { width: size, height: size }, style, { transform: [{ translateY: bounceAnim }] }]
    : [styles.container, { width: size, height: size }, style];

  return (
    <Container style={containerStyle}>
      {/* Main circle body */}
      <View style={[styles.body, { width: size, height: size, borderRadius: size / 2 }]} />
      
      {/* Left eye */}
      <View 
        style={[
          styles.eye, 
          { 
            width: eyeWidth, 
            height: eyeHeight, 
            borderRadius: eyeWidth / 2,
            left: size / 2 - eyeGap - eyeWidth / 2,
            ...getEyeStyle()
          }
        ]} 
      />
      
      {/* Right eye */}
      <View 
        style={[
          styles.eye, 
          { 
            width: eyeWidth, 
            height: eyeHeight, 
            borderRadius: eyeWidth / 2,
            left: size / 2 + eyeGap - eyeWidth / 2,
            ...getEyeStyle()
          }
        ]} 
      />

      {/* Expression mouth (small curve for happy) */}
      {expression === 'happy' && (
        <View 
          style={[
            styles.mouth, 
            { 
              width: size * 0.2,
              height: size * 0.1,
              bottom: size * 0.22,
              left: size / 2 - size * 0.1,
              borderRadius: size * 0.1,
            }
          ]} 
        />
      )}

      {expression === 'excited' && (
        <View 
          style={[
            styles.mouthOpen, 
            { 
              width: size * 0.15,
              height: size * 0.15,
              bottom: size * 0.18,
              left: size / 2 - size * 0.075,
              borderRadius: size * 0.15,
            }
          ]} 
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  body: {
    backgroundColor: colors.mascot,
  },
  eye: {
    position: 'absolute',
    backgroundColor: colors.mascotEyes,
  },
  mouth: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderBottomColor: '#1a1a2e',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  mouthOpen: {
    position: 'absolute',
    backgroundColor: '#1a1a2e',
  },
});

export default Mascot;
