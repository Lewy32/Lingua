import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { getRecipeById } from '../data/recipes';

const { width } = Dimensions.get('window');

const TabButton = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, selected && styles.tabButtonSelected]}
    onPress={onPress}
  >
    <Text style={[styles.tabButtonText, selected && styles.tabButtonTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const IngredientItem = ({ ingredient, checked, onToggle }) => (
  <TouchableOpacity 
    style={styles.ingredientItem}
    onPress={onToggle}
    activeOpacity={0.7}
  >
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Ionicons name="checkmark" size={14} color={colors.background} />}
    </View>
    <View style={styles.ingredientContent}>
      <View style={styles.ingredientRow}>
        <Text style={[styles.ingredientQuantity, checked && styles.checkedText]}>
          {ingredient.quantity} {ingredient.unit}
        </Text>
        <Text style={[styles.ingredientName, checked && styles.checkedText]}>
          {ingredient.nameEnglish}
        </Text>
      </View>
      {ingredient.nameNative && (
        <View style={styles.ingredientNativeRow}>
          <Text style={styles.ingredientNative}>{ingredient.nameNative}</Text>
          {ingredient.namePhonetic && (
            <Text style={styles.ingredientPhonetic}>({ingredient.namePhonetic})</Text>
          )}
          <TouchableOpacity style={styles.audioButton}>
            <Ionicons name="volume-medium" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}
      {ingredient.notes && (
        <Text style={styles.ingredientNotes}>{ingredient.notes}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const CookingStep = ({ step, isActive, onPress }) => (
  <TouchableOpacity 
    style={[styles.stepContainer, isActive && styles.stepContainerActive]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={[styles.stepNumber, isActive && styles.stepNumberActive]}>
      <Text style={[styles.stepNumberText, isActive && styles.stepNumberTextActive]}>
        {step.stepNumber}
      </Text>
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepInstruction}>{step.instruction}</Text>
      
      {step.instructionNative && (
        <Text style={styles.stepInstructionNative}>{step.instructionNative}</Text>
      )}
      
      {step.duration && (
        <View style={styles.stepMeta}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.stepMetaText}>{step.duration} min</Text>
        </View>
      )}
      
      {step.tip && (
        <View style={styles.tipBox}>
          <Ionicons name="bulb" size={16} color="#f39c12" />
          <Text style={styles.tipText}>{step.tip}</Text>
        </View>
      )}
      
      {step.keyTerms && step.keyTerms.length > 0 && (
        <View style={styles.keyTermsContainer}>
          <Text style={styles.keyTermsTitle}>New Words:</Text>
          {step.keyTerms.map((term, index) => (
            <View key={index} style={styles.keyTerm}>
              <Text style={styles.keyTermNative}>{term.native}</Text>
              <Text style={styles.keyTermPhonetic}>{term.phonetic}</Text>
              <Text style={styles.keyTermEnglish}>= {term.english}</Text>
              <TouchableOpacity>
                <Ionicons name="volume-medium" size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const RecipeDetailScreen = ({ navigation, route }) => {
  const { recipeId } = route.params;
  const recipe = getRecipeById(recipeId);
  
  const [activeTab, setActiveTab] = useState('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Recipe not found</Text>
      </SafeAreaView>
    );
  }

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${recipe.nameEnglish} recipe from Lingua!\n\n${recipe.description}`,
        title: recipe.nameEnglish,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartCooking = () => {
    navigation.navigate('CookingMode', { recipeId: recipe.id });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: recipe.image }} style={styles.heroImage} />
          <SafeAreaView style={styles.heroOverlay}>
            <View style={styles.heroHeader}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <View style={styles.heroActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => setIsSaved(!isSaved)}
                >
                  <Ionicons 
                    name={isSaved ? "heart" : "heart-outline"} 
                    size={24} 
                    color={isSaved ? "#e74c3c" : colors.text} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={handleShare}
                >
                  <Ionicons name="share-outline" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>

        {/* Recipe Info */}
        <View style={styles.infoSection}>
          <Text style={styles.recipeName}>{recipe.nameNative}</Text>
          <View style={styles.nameRow}>
            <Text style={styles.recipeEnglishName}>{recipe.nameEnglish}</Text>
            {recipe.namePhonetic && (
              <Text style={styles.recipePhonetic}>({recipe.namePhonetic})</Text>
            )}
            <TouchableOpacity style={styles.audioButtonLarge}>
              <Ionicons name="volume-high" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.metaValue}>{recipe.totalTime}</Text>
              <Text style={styles.metaLabel}>min</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.metaValue}>{recipe.servings}</Text>
              <Text style={styles.metaLabel}>servings</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.metaValue}>{recipe.difficulty}</Text>
              <Text style={styles.metaLabel}>level</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons name="star" size={20} color="#f39c12" />
              <Text style={styles.metaValue}>{recipe.rating}</Text>
              <Text style={styles.metaLabel}>({recipe.reviewCount})</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{recipe.description}</Text>

          {/* Cultural Context */}
          {recipe.culturalContext && (
            <View style={styles.culturalBox}>
              <Text style={styles.culturalTitle}>🏛️ Cultural Note</Text>
              <Text style={styles.culturalText}>{recipe.culturalContext}</Text>
            </View>
          )}

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {recipe.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TabButton
            label={`📝 Ingredients (${recipe.ingredients.length})`}
            selected={activeTab === 'ingredients'}
            onPress={() => setActiveTab('ingredients')}
          />
          <TabButton
            label={`👨‍🍳 Steps (${recipe.steps.length})`}
            selected={activeTab === 'steps'}
            onPress={() => setActiveTab('steps')}
          />
          <TabButton
            label="💡 Tips"
            selected={activeTab === 'tips'}
            onPress={() => setActiveTab('tips')}
          />
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'ingredients' && (
            <>
              {recipe.ingredients.map((ingredient, index) => (
                <IngredientItem
                  key={index}
                  ingredient={ingredient}
                  checked={checkedIngredients[index]}
                  onToggle={() => toggleIngredient(index)}
                />
              ))}
              <TouchableOpacity style={styles.shoppingListButton}>
                <Ionicons name="cart-outline" size={20} color={colors.primary} />
                <Text style={styles.shoppingListButtonText}>
                  Add to Shopping List
                </Text>
              </TouchableOpacity>
            </>
          )}

          {activeTab === 'steps' && (
            <>
              {recipe.steps.map((step, index) => (
                <CookingStep
                  key={index}
                  step={step}
                  isActive={false}
                />
              ))}
            </>
          )}

          {activeTab === 'tips' && (
            <>
              <Text style={styles.tipsTitle}>Pro Tips</Text>
              {recipe.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Ionicons name="bulb" size={18} color="#f39c12" />
                  <Text style={styles.tipItemText}>{tip}</Text>
                </View>
              ))}

              <Text style={styles.tipsTitle}>Best Practices</Text>
              {recipe.bestPractices.map((practice, index) => (
                <View key={index} style={styles.tipItem}>
                  <Ionicons name="checkmark-circle" size={18} color="#2ecc71" />
                  <Text style={styles.tipItemText}>{practice}</Text>
                </View>
              ))}
            </>
          )}
        </View>

        {/* Vocabulary Section */}
        {recipe.vocabulary && recipe.vocabulary.length > 0 && (
          <View style={styles.vocabularySection}>
            <Text style={styles.sectionTitle}>🔤 Recipe Vocabulary</Text>
            {recipe.vocabulary.map((word, index) => (
              <View key={index} style={styles.vocabRow}>
                <View style={styles.vocabMain}>
                  <Text style={styles.vocabNative}>{word.native}</Text>
                  <Text style={styles.vocabPhonetic}>{word.phonetic}</Text>
                </View>
                <Text style={styles.vocabEnglish}>{word.english}</Text>
                <TouchableOpacity>
                  <Ionicons name="volume-medium" size={18} color={colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <TouchableOpacity 
          style={styles.startCookingButton}
          onPress={handleStartCooking}
        >
          <Ionicons name="play" size={24} color={colors.background} />
          <Text style={styles.startCookingText}>Start Cooking</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  errorText: {
    color: colors.text,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  heroContainer: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    padding: 16,
  },
  recipeName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  recipeEnglishName: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  recipePhonetic: {
    fontSize: 14,
    color: colors.primary,
    fontStyle: 'italic',
    marginLeft: 8,
  },
  audioButtonLarge: {
    marginLeft: 12,
    padding: 4,
  },
  metaRow: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  metaItem: {
    flex: 1,
    alignItems: 'center',
  },
  metaValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
  },
  metaLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  metaDivider: {
    width: 1,
    backgroundColor: colors.background,
    marginHorizontal: 8,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  culturalBox: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  culturalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  culturalText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonSelected: {
    borderBottomColor: colors.primary,
  },
  tabButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tabButtonTextSelected: {
    color: colors.primary,
  },
  tabContent: {
    padding: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundSecondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  ingredientContent: {
    flex: 1,
  },
  ingredientRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ingredientQuantity: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold',
    minWidth: 80,
  },
  ingredientName: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  ingredientNativeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  ingredientNative: {
    fontSize: 14,
    color: colors.primary,
  },
  ingredientPhonetic: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  audioButton: {
    padding: 2,
  },
  ingredientNotes: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  shoppingListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  shoppingListButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepContainerActive: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: -12,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberActive: {
    backgroundColor: colors.primary,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  stepNumberTextActive: {
    color: colors.background,
  },
  stepContent: {
    flex: 1,
  },
  stepInstruction: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  stepInstructionNative: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  stepMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  stepMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(243, 156, 18, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#f39c12',
    lineHeight: 20,
  },
  keyTermsContainer: {
    backgroundColor: colors.backgroundSecondary,
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  keyTermsTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  keyTerm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  keyTermNative: {
    fontSize: 14,
    color: colors.text,
    fontWeight: 'bold',
  },
  keyTermPhonetic: {
    fontSize: 12,
    color: colors.primary,
    fontStyle: 'italic',
  },
  keyTermEnglish: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  tipItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  vocabularySection: {
    padding: 16,
    backgroundColor: colors.backgroundSecondary,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  vocabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  vocabMain: {
    flex: 1,
  },
  vocabNative: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  vocabPhonetic: {
    fontSize: 12,
    color: colors.primary,
    fontStyle: 'italic',
  },
  vocabEnglish: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 12,
  },
  bottomPadding: {
    height: 100,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.backgroundSecondary,
  },
  startCookingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
  },
  startCookingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.background,
  },
});

export default RecipeDetailScreen;
