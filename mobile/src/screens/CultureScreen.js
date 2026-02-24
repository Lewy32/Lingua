import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';

const CultureScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Persian Culture</Text>
        <Text style={styles.subtitle}>Explore the rich culture of Iran</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅 Nowruz (Persian New Year)</Text>
          <Text style={styles.cardContent}>
            Nowruz marks the first day of spring and the beginning of the year in the Persian calendar.
            It has been celebrated for over 3,000 years and is recognized by UNESCO as an Intangible
            Cultural Heritage of Humanity.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍵 Tea Culture (Chai)</Text>
          <Text style={styles.cardContent}>
            Tea is an integral part of Persian culture. It's traditionally served in small glass cups
            and often accompanied by dates, sweets, or rock candy (nabaat). Iranians typically drink
            tea after meals and throughout the day.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Persian Poetry</Text>
          <Text style={styles.cardContent}>
            Persian literature is famous for its beautiful poetry. Renowned poets like Rumi, Hafez,
            Saadi, and Ferdowsi have shaped not just Persian culture but world literature. Many
            Iranians can recite poetry from memory.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🤝 Tarof (تعارف)</Text>
          <Text style={styles.cardContent}>
            Tarof is a complex system of Persian etiquette that involves elaborate politeness,
            courtesy, and humility. It includes offering and refusing multiple times before
            accepting, and showing respect through self-deprecation.
          </Text>
        </View>

        <Text style={styles.note}>
          TODO: Add more cultural content, images, and interactive elements
        </Text>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.backgroundSecondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  cardContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  note: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default CultureScreen;
