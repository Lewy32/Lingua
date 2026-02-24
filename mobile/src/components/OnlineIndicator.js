import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

/**
 * OnlineIndicator - Shows online/offline status with a colored dot
 * @param {boolean} isOnline - Whether the user is online
 * @param {number} size - Size of the indicator (default: 12)
 * @param {object} style - Additional styles
 */
const OnlineIndicator = ({ isOnline, size = 12, style }) => {
  return (
    <View
      style={[
        styles.indicator,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isOnline ? colors.online : colors.offline,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderWidth: 2,
    borderColor: colors.background,
  },
});

export default OnlineIndicator;
