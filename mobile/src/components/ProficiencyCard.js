/**
 * ProficiencyCard Component
 * Displays CEFR level progress and skill breakdown
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { CEFR_LEVELS, SKILL_DOMAINS, getCertificationForLanguage } from '../data/standards';

const ProficiencyCard = ({
  currentLevel = 'A1',
  targetLevel,
  languageCode,
  skillScores = {},
  xp = 0,
  onTakeTest,
  onViewDetails,
  compact = false,
}) => {
  const levelInfo = CEFR_LEVELS[currentLevel];
  const certification = getCertificationForLanguage(languageCode);
  
  // Calculate progress to next level
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentIdx = levels.indexOf(currentLevel);
  const nextLevel = currentIdx < levels.length - 1 ? levels[currentIdx + 1] : null;
  const nextLevelInfo = nextLevel ? CEFR_LEVELS[nextLevel] : null;
  
  // XP progress (simplified)
  const xpForCurrentLevel = currentIdx > 0 
    ? [0, 1000, 3500, 8500, 18500, 38500][currentIdx] 
    : 0;
  const xpForNextLevel = nextLevel 
    ? [1000, 3500, 8500, 18500, 38500, 78500][currentIdx]
    : xpForCurrentLevel;
  const levelProgress = nextLevel 
    ? Math.min(((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100, 100)
    : 100;

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactCard} onPress={onViewDetails}>
        <View style={[styles.levelBadgeSmall, { backgroundColor: levelInfo.color }]}>
          <Text style={styles.levelBadgeTextSmall}>{currentLevel}</Text>
        </View>
        <View style={styles.compactInfo}>
          <Text style={styles.compactTitle}>{levelInfo.name}</Text>
          <View style={styles.compactProgress}>
            <View style={styles.compactProgressBar}>
              <View style={[styles.compactProgressFill, { width: `${levelProgress}%` }]} />
            </View>
            {nextLevel && (
              <Text style={styles.compactNextLevel}>→ {nextLevel}</Text>
            )}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.levelSection}>
          <View style={[styles.levelBadge, { backgroundColor: levelInfo.color }]}>
            <Text style={styles.levelBadgeText}>{currentLevel}</Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelName}>{levelInfo.name}</Text>
            <Text style={styles.levelDescription}>{levelInfo.description}</Text>
          </View>
        </View>
        
        {certification && (
          <View style={styles.certBadge}>
            <Ionicons name="ribbon" size={14} color={colors.warning} />
            <Text style={styles.certText}>{certification.key}</Text>
          </View>
        )}
      </View>

      {/* Progress to next level */}
      {nextLevel && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress to {nextLevel}</Text>
            <Text style={styles.progressPercent}>{Math.round(levelProgress)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${levelProgress}%`, backgroundColor: nextLevelInfo.color }
              ]} 
            />
          </View>
          <View style={styles.progressStats}>
            <Text style={styles.progressStat}>
              <Ionicons name="flash" size={12} color={colors.warning} /> {xp.toLocaleString()} XP
            </Text>
            <Text style={styles.progressStat}>
              ~{Math.round(nextLevelInfo.hours - levelInfo.hours)} hrs to go
            </Text>
          </View>
        </View>
      )}

      {/* Skill breakdown */}
      <View style={styles.skillsSection}>
        <Text style={styles.skillsTitle}>Skill Breakdown</Text>
        <View style={styles.skillsGrid}>
          {Object.entries(SKILL_DOMAINS).map(([key, domain]) => {
            const score = skillScores[domain.id] || 0;
            return (
              <View key={key} style={styles.skillItem}>
                <View style={styles.skillHeader}>
                  <Ionicons name={domain.icon} size={16} color={colors.primary} />
                  <Text style={styles.skillName}>{domain.name}</Text>
                </View>
                <View style={styles.skillBar}>
                  <View style={[styles.skillFill, { width: `${score}%` }]} />
                </View>
                <Text style={styles.skillScore}>{score}%</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Can-do statements preview */}
      <View style={styles.canDoSection}>
        <Text style={styles.canDoTitle}>At this level you can:</Text>
        <Text style={styles.canDoItem}>• {levelInfo.canDo[0]}</Text>
        {levelInfo.canDo.length > 1 && (
          <TouchableOpacity onPress={onViewDetails}>
            <Text style={styles.canDoMore}>+{levelInfo.canDo.length - 1} more abilities</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.testButton} onPress={onTakeTest}>
          <Ionicons name="clipboard" size={18} color={colors.primary} />
          <Text style={styles.testButtonText}>Retake Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton} onPress={onViewDetails}>
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    margin: 16,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  levelSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  levelBadgeSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeTextSmall: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  levelInfo: {},
  levelName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  levelDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  certBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  certText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.warning,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  compactProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  compactProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  compactProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  compactNextLevel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressStat: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  skillsSection: {
    marginBottom: 20,
  },
  skillsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  skillsGrid: {
    gap: 12,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 90,
  },
  skillName: {
    fontSize: 13,
    color: colors.text,
  },
  skillBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  skillScore: {
    width: 36,
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  canDoSection: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  canDoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  canDoItem: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  canDoMore: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  testButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  testButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ProficiencyCard;
