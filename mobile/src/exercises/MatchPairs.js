/**
 * MatchPairs Exercise
 * Match words/phrases between two columns
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const MatchPairs = ({
  pairs, // [{ left: 'hello', right: 'こんにちは' }, ...]
  leftLabel = 'English',
  rightLabel = 'Target',
  onComplete,
  onError,
}) => {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrongPair, setWrongPair] = useState(null);
  const [animations] = useState({});

  useEffect(() => {
    // Shuffle both columns independently
    const shuffledLeft = pairs.map((p, i) => ({ text: p.left, id: i }))
      .sort(() => Math.random() - 0.5);
    const shuffledRight = pairs.map((p, i) => ({ text: p.right, id: i }))
      .sort(() => Math.random() - 0.5);
    
    setLeftItems(shuffledLeft);
    setRightItems(shuffledRight);
    setMatched(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
  }, [pairs]);

  useEffect(() => {
    // Check if both sides selected
    if (selectedLeft !== null && selectedRight !== null) {
      checkMatch();
    }
  }, [selectedLeft, selectedRight]);

  const checkMatch = () => {
    const leftItem = leftItems.find(item => item.id === selectedLeft);
    const rightItem = rightItems.find(item => item.id === selectedRight);

    if (leftItem.id === rightItem.id) {
      // Correct match
      const newMatched = new Set(matched);
      newMatched.add(leftItem.id);
      setMatched(newMatched);

      // Check if all matched
      if (newMatched.size === pairs.length) {
        setTimeout(() => {
          onComplete?.({
            correct: true,
            matchedCount: pairs.length,
          });
        }, 500);
      }
    } else {
      // Wrong match
      setWrongPair({ left: selectedLeft, right: selectedRight });
      
      setTimeout(() => {
        setWrongPair(null);
        onError?.({
          correct: false,
          attemptedPair: {
            left: leftItem.text,
            right: rightItem.text,
          },
        });
      }, 800);
    }

    // Clear selection
    setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
    }, 300);
  };

  const handleLeftSelect = (id) => {
    if (matched.has(id)) return;
    setSelectedLeft(id);
  };

  const handleRightSelect = (id) => {
    if (matched.has(id)) return;
    setSelectedRight(id);
  };

  const getItemStyle = (id, side) => {
    if (matched.has(id)) {
      return styles.itemMatched;
    }
    if (wrongPair && ((side === 'left' && wrongPair.left === id) || 
                      (side === 'right' && wrongPair.right === id))) {
      return styles.itemWrong;
    }
    if ((side === 'left' && selectedLeft === id) ||
        (side === 'right' && selectedRight === id)) {
      return styles.itemSelected;
    }
    return null;
  };

  const progress = (matched.size / pairs.length) * 100;

  return (
    <View style={styles.container}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{matched.size} / {pairs.length}</Text>
      </View>

      {/* Column headers */}
      <View style={styles.headers}>
        <Text style={styles.headerText}>{leftLabel}</Text>
        <Text style={styles.headerText}>{rightLabel}</Text>
      </View>

      {/* Matching columns */}
      <View style={styles.columns}>
        {/* Left column */}
        <View style={styles.column}>
          {leftItems.map((item) => (
            <TouchableOpacity
              key={`left-${item.id}`}
              style={[
                styles.item,
                getItemStyle(item.id, 'left'),
              ]}
              onPress={() => handleLeftSelect(item.id)}
              disabled={matched.has(item.id)}
            >
              {matched.has(item.id) && (
                <Ionicons name="checkmark-circle" size={20} color={colors.success} style={styles.checkIcon} />
              )}
              <Text style={[
                styles.itemText,
                matched.has(item.id) && styles.itemTextMatched,
              ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right column */}
        <View style={styles.column}>
          {rightItems.map((item) => (
            <TouchableOpacity
              key={`right-${item.id}`}
              style={[
                styles.item,
                getItemStyle(item.id, 'right'),
              ]}
              onPress={() => handleRightSelect(item.id)}
              disabled={matched.has(item.id)}
            >
              {matched.has(item.id) && (
                <Ionicons name="checkmark-circle" size={20} color={colors.success} style={styles.checkIcon} />
              )}
              <Text style={[
                styles.itemText,
                matched.has(item.id) && styles.itemTextMatched,
              ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Tap items on each side to match them
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  columns: {
    flexDirection: 'row',
    gap: 16,
    flex: 1,
  },
  column: {
    flex: 1,
    gap: 10,
  },
  item: {
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  itemMatched: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
    opacity: 0.7,
  },
  itemWrong: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  checkIcon: {
    marginRight: 8,
  },
  itemText: {
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  itemTextMatched: {
    color: colors.success,
  },
  instructions: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 20,
  },
});

export default MatchPairs;
