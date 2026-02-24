import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', // primary, secondary, outline, success, error, disabled
  size = 'medium', // small, medium, large
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.neutral;
    switch (variant) {
      case 'secondary': return colors.backgroundSecondary;
      case 'outline': return 'transparent';
      case 'success': return colors.success;
      case 'error': return colors.error;
      default: return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    switch (variant) {
      case 'secondary': return colors.text;
      case 'outline': return colors.primary;
      default: return colors.textWhite;
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') return colors.primary;
    return 'transparent';
  };

  const getPadding = () => {
    switch (size) {
      case 'small': return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'large': return { paddingVertical: 18, paddingHorizontal: 32 };
      default: return { paddingVertical: 14, paddingHorizontal: 24 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          ...getPadding(),
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text 
            style={[
              styles.text, 
              { color: getTextColor(), fontSize: getFontSize() },
              textStyle
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Button;
