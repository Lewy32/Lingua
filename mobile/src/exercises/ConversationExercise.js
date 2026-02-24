/**
 * ConversationExercise
 * AI-powered conversation practice
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { playTTS } from '../services/tts';

const ConversationExercise = ({
  scenario,
  language,
  aiPersona,
  targetPhrases = [],
  suggestedResponses = [],
  onComplete,
  maxTurns = 6,
}) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usedPhrases, setUsedPhrases] = useState(new Set());
  const [turnCount, setTurnCount] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Start conversation with AI greeting
    const greeting = getAIGreeting();
    setMessages([{
      role: 'ai',
      text: greeting.native,
      translation: greeting.english,
    }]);
  }, []);

  const getAIGreeting = () => {
    // Scenario-based greetings
    const greetings = {
      restaurant: {
        native: 'いらっしゃいませ！何名様ですか？',
        english: 'Welcome! How many in your party?',
      },
      shopping: {
        native: 'こんにちは！何かお探しですか？',
        english: 'Hello! Are you looking for something?',
      },
      directions: {
        native: 'すみません、道に迷いましたか？',
        english: 'Excuse me, are you lost?',
      },
      default: {
        native: 'こんにちは！お元気ですか？',
        english: 'Hello! How are you?',
      },
    };
    return greetings[scenario] || greetings.default;
  };

  const handleSend = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = userInput.trim();
    setUserInput('');
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      text: userMessage,
    }]);

    // Check for target phrases used
    const newUsedPhrases = new Set(usedPhrases);
    targetPhrases.forEach(phrase => {
      if (userMessage.toLowerCase().includes(phrase.toLowerCase())) {
        newUsedPhrases.add(phrase);
      }
    });
    setUsedPhrases(newUsedPhrases);

    setIsLoading(true);
    setTurnCount(prev => prev + 1);

    // Simulate AI response (in production, call actual AI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage, turnCount + 1);
      setMessages(prev => [...prev, {
        role: 'ai',
        text: aiResponse.native,
        translation: aiResponse.english,
      }]);
      setIsLoading(false);

      // Check completion
      if (turnCount + 1 >= maxTurns) {
        setTimeout(() => {
          onComplete?.({
            correct: true,
            turnCount: turnCount + 1,
            phrasesUsed: Array.from(newUsedPhrases),
            targetPhrases,
          });
        }, 1500);
      }
    }, 1000);
  };

  const generateAIResponse = (userMessage, turn) => {
    // Simplified response generation - in production use actual AI
    const responses = [
      { native: 'なるほど、わかりました。', english: 'I see, I understand.' },
      { native: 'それは良いですね！', english: 'That\'s good!' },
      { native: 'もう一度言ってください。', english: 'Please say that again.' },
      { native: 'はい、そうです。', english: 'Yes, that\'s right.' },
      { native: '他に何かありますか？', english: 'Is there anything else?' },
    ];
    return responses[turn % responses.length];
  };

  const handleSuggestion = (suggestion) => {
    setUserInput(suggestion);
  };

  const handlePlayAudio = async (text) => {
    await playTTS(text, language);
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      {/* Scenario header */}
      <View style={styles.header}>
        <View style={styles.scenarioInfo}>
          <Ionicons name="chatbubbles" size={24} color={colors.primary} />
          <View>
            <Text style={styles.scenarioTitle}>{scenario || 'Conversation Practice'}</Text>
            <Text style={styles.personaText}>{aiPersona || 'AI Partner'}</Text>
          </View>
        </View>
        <View style={styles.turnCounter}>
          <Text style={styles.turnText}>{turnCount}/{maxTurns}</Text>
        </View>
      </View>

      {/* Target phrases */}
      {targetPhrases.length > 0 && (
        <View style={styles.targetSection}>
          <Text style={styles.targetLabel}>Try to use:</Text>
          <View style={styles.targetPhrases}>
            {targetPhrases.map((phrase, i) => (
              <View 
                key={i} 
                style={[
                  styles.targetPill,
                  usedPhrases.has(phrase) && styles.targetPillUsed,
                ]}
              >
                <Text style={[
                  styles.targetPillText,
                  usedPhrases.has(phrase) && styles.targetPillTextUsed,
                ]}>
                  {phrase}
                </Text>
                {usedPhrases.has(phrase) && (
                  <Ionicons name="checkmark" size={14} color={colors.success} />
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Messages */}
      <ScrollView 
        ref={scrollRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((msg, index) => (
          <View 
            key={index}
            style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.role === 'user' && styles.userMessageText,
            ]}>
              {msg.text}
            </Text>
            {msg.translation && (
              <Text style={styles.translationText}>{msg.translation}</Text>
            )}
            {msg.role === 'ai' && (
              <TouchableOpacity 
                style={styles.audioButton}
                onPress={() => handlePlayAudio(msg.text)}
              >
                <Ionicons name="volume-medium" size={18} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        ))}
        {isLoading && (
          <View style={[styles.messageBubble, styles.aiBubble]}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </ScrollView>

      {/* Suggestions */}
      {suggestedResponses.length > 0 && (
        <ScrollView 
          horizontal 
          style={styles.suggestionsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {suggestedResponses.map((suggestion, i) => (
            <TouchableOpacity
              key={i}
              style={styles.suggestionPill}
              onPress={() => handleSuggestion(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your response..."
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={200}
        />
        <TouchableOpacity
          style={[styles.sendButton, !userInput.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!userInput.trim() || isLoading}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scenarioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
  personaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  turnCounter: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  turnText: {
    color: colors.primary,
    fontWeight: '600',
  },
  targetSection: {
    padding: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  targetLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  targetPhrases: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  targetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  targetPillUsed: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  targetPillText: {
    fontSize: 13,
    color: colors.text,
  },
  targetPillTextUsed: {
    color: colors.success,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: colors.text,
  },
  userMessageText: {
    color: '#fff',
  },
  translationText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    fontStyle: 'italic',
  },
  audioButton: {
    position: 'absolute',
    right: -30,
    top: 10,
    padding: 4,
  },
  suggestionsContainer: {
    maxHeight: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  suggestionPill: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
  },
});

export default ConversationExercise;
