import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import colors from '../constants/colors';
import { FarsiText, Button } from '../components';

const SpeakingExercise = ({ 
  exercise, 
  onComplete,
  onCorrect,
  onIncorrect,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordedUri, setRecordedUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [sound, setSound] = useState(null);
  const [pulseAnim] = useState(new Animated.Value(1));

  const targetWord = exercise.correctAnswer || exercise.questionFarsi || '';
  const pronunciation = exercise.pronunciation || '';

  useEffect(() => {
    return () => {
      // Cleanup
      if (recording) {
        recording.stopAndUnloadAsync();
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording) {
      // Pulse animation while recording
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      // Request permissions
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Please allow microphone access to practice speaking.');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecordedUri(uri);
      setRecording(null);
      setHasAttempted(true);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const playRecording = async () => {
    if (!recordedUri) return;

    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recordedUri },
        { shouldPlay: true }
      );
      
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Failed to play recording:', error);
    }
  };

  const handleSelfAssessment = (correct) => {
    if (correct) {
      onCorrect?.();
    } else {
      onIncorrect?.();
    }
    onComplete?.(correct);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>
        {exercise.question || 'Say this word in Farsi:'}
      </Text>

      <View style={styles.targetContainer}>
        <FarsiText size="xlarge" style={styles.targetWord}>
          {targetWord}
        </FarsiText>
        {pronunciation && (
          <Text style={styles.pronunciation}>/{pronunciation}/</Text>
        )}
      </View>

      <View style={styles.recordSection}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={[
              styles.recordButton,
              isRecording && styles.recordingActive,
            ]}
            onPress={isRecording ? stopRecording : startRecording}
            activeOpacity={0.8}
          >
            <Ionicons 
              name={isRecording ? "stop" : "mic"} 
              size={48} 
              color={colors.textWhite} 
            />
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.recordHint}>
          {isRecording 
            ? 'Recording... Tap to stop' 
            : 'Tap to record your pronunciation'}
        </Text>
      </View>

      {recordedUri && (
        <View style={styles.playbackSection}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={playRecording}
            disabled={isPlaying}
          >
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={24} 
              color={colors.primary} 
            />
            <Text style={styles.playButtonText}>
              {isPlaying ? 'Playing...' : 'Listen to your recording'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {hasAttempted && (
        <View style={styles.assessmentSection}>
          <Text style={styles.assessmentTitle}>How did you do?</Text>
          <Text style={styles.assessmentSubtitle}>
            Compare your pronunciation to: "{pronunciation}"
          </Text>

          <View style={styles.assessmentButtons}>
            <TouchableOpacity
              style={[styles.assessButton, styles.tryAgainButton]}
              onPress={() => handleSelfAssessment(false)}
            >
              <Ionicons name="refresh" size={24} color={colors.textWhite} />
              <Text style={styles.assessButtonText}>Need Practice</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.assessButton, styles.gotItButton]}
              onPress={() => handleSelfAssessment(true)}
            >
              <Ionicons name="checkmark" size={24} color={colors.textWhite} />
              <Text style={styles.assessButtonText}>Got It!</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!hasAttempted && (
        <View style={styles.tipContainer}>
          <Ionicons name="bulb" size={20} color={colors.warning} />
          <Text style={styles.tipText}>
            Tip: Try to match the pronunciation guide above
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  targetContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  targetWord: {
    marginBottom: 8,
  },
  pronunciation: {
    fontSize: 18,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  recordSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  recordingActive: {
    backgroundColor: colors.error,
  },
  recordHint: {
    marginTop: 16,
    fontSize: 14,
    color: colors.textSecondary,
  },
  playbackSection: {
    width: '100%',
    marginBottom: 24,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
  },
  playButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  assessmentSection: {
    width: '100%',
    alignItems: 'center',
  },
  assessmentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  assessmentSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  assessmentButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  assessButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  tryAgainButton: {
    backgroundColor: colors.warning,
  },
  gotItButton: {
    backgroundColor: colors.success,
  },
  assessButtonText: {
    color: colors.textWhite,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warning + '20',
    padding: 16,
    borderRadius: 12,
    marginTop: 'auto',
  },
  tipText: {
    color: colors.warning,
    marginLeft: 8,
    flex: 1,
  },
});

export default SpeakingExercise;
