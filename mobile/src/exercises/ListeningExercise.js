/**
 * ListeningExercise
 * Listen to audio and answer questions or transcribe
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { playTTS } from '../services/tts';

const ListeningExercise = ({
  audioText,
  language,
  exerciseType = 'transcribe', // 'transcribe' | 'multipleChoice'
  options = [],
  correctAnswer,
  hint,
  onComplete,
  onError,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const handlePlay = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      await playTTS(audioText, language);
      setPlayCount(prev => prev + 1);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleSlowPlay = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    try {
      await playTTS(audioText, language, { rate: 0.7 });
      setPlayCount(prev => prev + 1);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:'"]/g, '')
      .replace(/\s+/g, ' ');
  };

  const checkAnswer = () => {
    let isCorrect = false;
    let userAnswer = '';

    if (exerciseType === 'transcribe') {
      userAnswer = userInput;
      isCorrect = normalizeText(userInput) === normalizeText(correctAnswer);
    } else {
      userAnswer = selectedOption;
      isCorrect = selectedOption === correctAnswer;
    }

    if (isCorrect) {
      onComplete?.({
        correct: true,
        userAnswer,
        correctAnswer,
      });
    } else {
      onError?.({
        correct: false,
        userAnswer,
        correctAnswer,
        explanation: `The correct answer is: "${correctAnswer}"`,
      });
    }
  };

  const canSubmit = exerciseType === 'transcribe' 
    ? userInput.trim().length > 0 
    : selectedOption !== null;

  return (
    <View style={styles.container}>
      {/* Audio player */}
      <View style={styles.audioSection}>
        <Text style={styles.instruction}>Listen and {exerciseType === 'transcribe' ? 'type what you hear' : 'answer'}</Text>
        
        <View style={styles.audioControls}>
          <TouchableOpacity
            style={[styles.playButton, isPlaying && styles.playButtonActive]}
            onPress={handlePlay}
            disabled={isPlaying}
          >
            {isPlaying ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Ionicons name="play" size={40} color="#fff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.slowButton}
            onPress={handleSlowPlay}
            disabled={isPlaying}
          >
            <Ionicons name="speedometer-outline" size={24} color={colors.primary} />
            <Text style={styles.slowButtonText}>Slow</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.playCount}>
          Played {playCount} time{playCount !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Answer section */}
      {exerciseType === 'transcribe' ? (
        <View style={styles.transcribeSection}>
          <TextInput
            style={styles.textInput}
            value={userInput}
            onChangeText={setUserInput}
            placeholder="Type what you hear..."
            placeholderTextColor={colors.textSecondary}
            multiline
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      ) : (
        <View style={styles.optionsSection}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === option && styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedOption(option)}
            >
              <Text style={[
                styles.optionText,
                selectedOption === option && styles.optionTextSelected,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Hint */}
      {hint && (
        <TouchableOpacity
          style={styles.hintButton}
          onPress={() => setShowHint(!showHint)}
        >
          <Ionicons name="bulb-outline" size={20} color={colors.warning} />
          <Text style={styles.hintButtonText}>
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </Text>
        </TouchableOpacity>
      )}
      {showHint && hint && (
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>{hint}</Text>
        </View>
      )}

      {/* Submit button */}
      <TouchableOpacity
        style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
        onPress={checkAnswer}
        disabled={!canSubmit}
      >
        <Text style={styles.submitButtonText}>Check Answer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  audioSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  instruction: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonActive: {
    backgroundColor: colors.primaryDark,
  },
  slowButton: {
    alignItems: 'center',
    padding: 12,
  },
  slowButtonText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
  },
  playCount: {
    marginTop: 16,
    fontSize: 14,
    color: colors.textSecondary,
  },
  transcribeSection: {
    marginBottom: 24,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: colors.text,
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionsSection: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  hintButtonText: {
    color: colors.warning,
    fontSize: 14,
  },
  hintBox: {
    backgroundColor: colors.warningLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  hintText: {
    color: colors.warningDark,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.border,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ListeningExercise;
