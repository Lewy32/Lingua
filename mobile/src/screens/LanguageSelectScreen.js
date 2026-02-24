import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { languages, getActiveLanguages, getComingSoonLanguages } from '../data/languages';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48 - 12) / 2; // 2 columns with padding

const LanguageCard = ({ language, onPress, disabled }) => (
  <TouchableOpacity
    style={[
      styles.languageCard,
      { borderColor: language.color },
      disabled && styles.languageCardDisabled,
    ]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
  >
    <Text style={styles.flag}>{language.flag}</Text>
    <Text style={styles.nativeName}>{language.nameNative}</Text>
    <Text style={styles.englishName}>{language.nameEnglish}</Text>
    {language.comingSoon ? (
      <View style={styles.comingSoonBadge}>
        <Text style={styles.comingSoonText}>Coming Soon</Text>
      </View>
    ) : (
      <View style={styles.recipeCount}>
        <Ionicons name="restaurant" size={12} color={colors.textSecondary} />
        <Text style={styles.recipeCountText}>{language.recipeCount} recipes</Text>
      </View>
    )}
  </TouchableOpacity>
);

const LanguageSelectScreen = ({ navigation }) => {
  const activeLanguages = getActiveLanguages();
  const comingSoonLanguages = getComingSoonLanguages();

  const handleSelectLanguage = (language) => {
    // Navigate to language-specific home or set language in context
    navigation.navigate('MainTabs', { language: language.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🌍 Lingua</Text>
          <Text style={styles.tagline}>Learn the language. Cook the food.</Text>
        </View>

        {/* Description */}
        <View style={styles.descriptionCard}>
          <Text style={styles.descriptionTitle}>Choose Your Language</Text>
          <Text style={styles.descriptionText}>
            Each language comes with lessons, vocabulary, and authentic recipes 
            from the culture. Learn to speak AND cook!
          </Text>
        </View>

        {/* Active Languages */}
        <Text style={styles.sectionTitle}>Available Languages</Text>
        <View style={styles.languageGrid}>
          {activeLanguages.map((language) => (
            <LanguageCard
              key={language.id}
              language={language}
              onPress={() => handleSelectLanguage(language)}
            />
          ))}
        </View>

        {/* Coming Soon */}
        {comingSoonLanguages.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Coming Soon</Text>
            <View style={styles.languageGrid}>
              {comingSoonLanguages.slice(0, 4).map((language) => (
                <LanguageCard
                  key={language.id}
                  language={language}
                  disabled
                />
              ))}
            </View>
            {comingSoonLanguages.length > 4 && (
              <Text style={styles.moreLanguages}>
                + {comingSoonLanguages.length - 4} more languages coming...
              </Text>
            )}
          </>
        )}

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What You Get</Text>
          
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#3498db20' }]}>
              <Ionicons name="book" size={24} color="#3498db" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Language Lessons</Text>
              <Text style={styles.featureText}>
                30+ lessons per language with vocabulary, grammar, and pronunciation
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#e74c3c20' }]}>
              <Ionicons name="restaurant" size={24} color="#e74c3c" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Authentic Recipes</Text>
              <Text style={styles.featureText}>
                Step-by-step cooking guides with native language ingredients
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#2ecc7120' }]}>
              <Ionicons name="volume-high" size={24} color="#2ecc71" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Audio Pronunciation</Text>
              <Text style={styles.featureText}>
                Learn correct pronunciation for dishes, ingredients, and cooking terms
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#f39c1220' }]}>
              <Ionicons name="trophy" size={24} color="#f39c12" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Track Progress</Text>
              <Text style={styles.featureText}>
                Earn XP, maintain streaks, and compete with friends
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  descriptionCard: {
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  languageCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 12,
  },
  languageCardDisabled: {
    opacity: 0.5,
  },
  flag: {
    fontSize: 48,
    marginBottom: 12,
  },
  nativeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  englishName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  recipeCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recipeCountText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  comingSoonBadge: {
    backgroundColor: colors.neutral,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  comingSoonText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  moreLanguages: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 24,
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
});

export default LanguageSelectScreen;
