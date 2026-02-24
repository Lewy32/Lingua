import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { 
  getRecipesByLanguage, 
  getFeaturedRecipes,
  getCategoriesForLanguage,
} from '../data/recipes';
import { getLanguageById } from '../data/languages';

const { width } = Dimensions.get('window');

const RecipeCard = ({ recipe, onPress, featured = false }) => (
  <TouchableOpacity
    style={[styles.recipeCard, featured && styles.featuredCard]}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <Image
      source={{ uri: recipe.image }}
      style={[styles.recipeImage, featured && styles.featuredImage]}
    />
    <View style={styles.recipeContent}>
      <Text style={styles.recipeNativeName}>{recipe.nameNative}</Text>
      <Text style={styles.recipeEnglishName}>{recipe.nameEnglish}</Text>
      <View style={styles.recipeMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.metaText}>{recipe.totalTime} min</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="flame-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.metaText}>{recipe.difficulty}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="star" size={14} color="#f39c12" />
          <Text style={styles.metaText}>{recipe.rating}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const CategoryChip = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.categoryChip, selected && styles.categoryChipSelected]}
    onPress={onPress}
  >
    <Text style={[styles.categoryChipText, selected && styles.categoryChipTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const KitchenScreen = ({ navigation, route }) => {
  const languageId = route?.params?.language || 'farsi';
  const language = getLanguageById(languageId);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'stew', label: 'Stews' },
    { id: 'rice', label: 'Rice Dishes' },
    { id: 'main', label: 'Main Courses' },
    { id: 'appetizer', label: 'Appetizers' },
    { id: 'dessert', label: 'Desserts' },
  ];

  const featuredRecipes = getFeaturedRecipes(languageId);
  const allLanguageRecipes = getRecipesByLanguage(languageId);

  const filteredRecipes = useMemo(() => {
    let recipes = allLanguageRecipes;
    
    if (selectedCategory !== 'all') {
      recipes = recipes.filter(r => r.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      recipes = recipes.filter(r =>
        r.nameEnglish.toLowerCase().includes(query) ||
        r.nameNative.includes(query) ||
        r.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return recipes;
  }, [selectedCategory, searchQuery]);

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipeId: recipe.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>🍳 {language?.cuisineName || 'Kitchen'}</Text>
            <Text style={styles.headerSubtitle}>
              {language?.cuisineDescription || 'Explore authentic recipes'}
            </Text>
          </View>
          <TouchableOpacity style={styles.favoritesButton}>
            <Ionicons name="heart-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.label}
              selected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
            />
          ))}
        </ScrollView>

        {/* Featured Recipe */}
        {!searchQuery && selectedCategory === 'all' && featuredRecipes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <RecipeCard
              recipe={featuredRecipes[0]}
              featured
              onPress={() => handleRecipePress(featuredRecipes[0])}
            />
          </View>
        )}

        {/* Recipe Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `Results (${filteredRecipes.length})` : 'All Recipes'}
          </Text>
          
          {filteredRecipes.length > 0 ? (
            <View style={styles.recipeGrid}>
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onPress={() => handleRecipePress(recipe)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>No recipes found</Text>
              <Text style={styles.emptySubtext}>Try a different search term</Text>
            </View>
          )}
        </View>

        {/* Vocabulary Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔤 Cooking Vocabulary</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.vocabularyCard}>
            <View style={styles.vocabItem}>
              <Text style={styles.vocabNative}>سرخ کردن</Text>
              <Text style={styles.vocabPhonetic}>sorkh kardan</Text>
              <Text style={styles.vocabEnglish}>to fry / sauté</Text>
            </View>
            <View style={styles.vocabDivider} />
            <View style={styles.vocabItem}>
              <Text style={styles.vocabNative}>جوشاندن</Text>
              <Text style={styles.vocabPhonetic}>jushandan</Text>
              <Text style={styles.vocabEnglish}>to boil</Text>
            </View>
            <View style={styles.vocabDivider} />
            <View style={styles.vocabItem}>
              <Text style={styles.vocabNative}>خرد کردن</Text>
              <Text style={styles.vocabPhonetic}>khord kardan</Text>
              <Text style={styles.vocabEnglish}>to chop</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  favoritesButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: colors.textWhite,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  recipeGrid: {
    gap: 16,
  },
  recipeCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredCard: {
    marginBottom: 8,
  },
  recipeImage: {
    width: '100%',
    height: 150,
  },
  featuredImage: {
    height: 200,
  },
  recipeContent: {
    padding: 16,
  },
  recipeNativeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 4,
  },
  recipeEnglishName: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  recipeMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  vocabularyCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
  },
  vocabItem: {
    paddingVertical: 12,
  },
  vocabNative: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  vocabPhonetic: {
    fontSize: 14,
    color: colors.primary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  vocabEnglish: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  vocabDivider: {
    height: 1,
    backgroundColor: colors.background,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  bottomPadding: {
    height: 100,
  },
});

export default KitchenScreen;
