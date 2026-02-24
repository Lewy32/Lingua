import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import colors from '../constants/colors';

const FarsiText = ({ 
  children, 
  style, 
  size = 'medium', // small, medium, large, xlarge
  color,
  ...props 
}) => {
  const getFontSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 24;
      case 'xlarge': return 32;
      default: return 18;
    }
  };

  return (
    <Text
      style={[
        styles.farsiText,
        { fontSize: getFontSize() },
        color && { color },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  farsiText: {
    fontFamily: Platform.select({
      ios: 'System', // iOS has good Arabic/Persian support
      android: 'sans-serif', // Will be replaced with Vazir
    }),
    writingDirection: 'rtl',
    textAlign: 'right',
    color: colors.primary,
    lineHeight: Platform.select({
      ios: undefined,
      android: 40, // Better line height for Persian on Android
    }),
  },
});

export default FarsiText;
