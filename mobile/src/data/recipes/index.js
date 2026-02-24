/**
 * Recipe Index - Lingua
 * Central export for all cuisine recipes
 * 
 * 9 cuisines × 12 recipes each = 108 recipes
 */

import { persianRecipes } from './persian';
import { japaneseRecipes } from './japanese';
import { italianRecipes } from './italian';
import { koreanRecipes } from './korean';
import { mexicanRecipes } from './mexican';
import { nigerianRecipes } from './nigerian';
import { polishRecipes } from './polish';
import { quebecRecipes } from './quebec';
import { russianRecipes } from './russian';

// Recipe collections by language/culture
export const recipesByLanguage = {
  persian: persianRecipes,
  japanese: japaneseRecipes,
  italian: italianRecipes,
  korean: koreanRecipes,
  spanish: mexicanRecipes,      // Mexican Spanish
  mexican: mexicanRecipes,
  yoruba: nigerianRecipes,      // Nigerian languages
  igbo: nigerianRecipes,
  hausa: nigerianRecipes,
  nigerian: nigerianRecipes,
  polish: polishRecipes,
  french_quebec: quebecRecipes, // Quebec French
  quebec: quebecRecipes,
  russian: russianRecipes,
};

// Get recipes for a specific language
export const getRecipesForLanguage = (languageId) => {
  const normalizedId = languageId?.toLowerCase().replace(/[-_\s]/g, '_');
  
  // Direct match
  if (recipesByLanguage[normalizedId]) {
    return recipesByLanguage[normalizedId];
  }
  
  // Partial matches
  const partialMatches = {
    'farsi': 'persian',
    'fa': 'persian',
    'ja': 'japanese',
    'jp': 'japanese',
    'it': 'italian',
    'ko': 'korean',
    'es': 'mexican',
    'spanish': 'mexican',
    'es_mx': 'mexican',
    'yo': 'nigerian',
    'ig': 'nigerian',
    'ha': 'nigerian',
    'pl': 'polish',
    'fr_ca': 'quebec',
    'fr_quebec': 'quebec',
    'canadian_french': 'quebec',
    'ru': 'russian',
  };
  
  if (partialMatches[normalizedId]) {
    return recipesByLanguage[partialMatches[normalizedId]];
  }
  
  return [];
};

// Get a specific recipe by ID across all cuisines
export const getRecipeById = (recipeId) => {
  for (const cuisine of Object.values(recipesByLanguage)) {
    const recipe = cuisine.find(r => r.id === recipeId);
    if (recipe) return recipe;
  }
  return null;
};

// Get all recipes as flat array
export const getAllRecipes = () => {
  const seen = new Set();
  const allRecipes = [];
  
  for (const recipes of Object.values(recipesByLanguage)) {
    for (const recipe of recipes) {
      if (!seen.has(recipe.id)) {
        seen.add(recipe.id);
        allRecipes.push(recipe);
      }
    }
  }
  
  return allRecipes;
};

// Search recipes by name or tag
export const searchRecipes = (query, languageId = null) => {
  const normalizedQuery = query.toLowerCase();
  let recipes = languageId 
    ? getRecipesForLanguage(languageId) 
    : getAllRecipes();
  
  return recipes.filter(recipe => 
    recipe.nameEnglish.toLowerCase().includes(normalizedQuery) ||
    recipe.nameNative.toLowerCase().includes(normalizedQuery) ||
    recipe.description.toLowerCase().includes(normalizedQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
  );
};

// Get recipes by difficulty
export const getRecipesByDifficulty = (difficulty, languageId = null) => {
  let recipes = languageId 
    ? getRecipesForLanguage(languageId) 
    : getAllRecipes();
  
  return recipes.filter(recipe => recipe.difficulty === difficulty);
};

// Get recipes by tag
export const getRecipesByTag = (tag, languageId = null) => {
  const normalizedTag = tag.toLowerCase();
  let recipes = languageId 
    ? getRecipesForLanguage(languageId) 
    : getAllRecipes();
  
  return recipes.filter(recipe => 
    recipe.tags.some(t => t.toLowerCase() === normalizedTag)
  );
};

// Get featured recipes (mix of cuisines, various difficulties)
export const getFeaturedRecipes = (count = 6) => {
  const allRecipes = getAllRecipes();
  const shuffled = [...allRecipes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get vocabulary from a recipe
export const getRecipeVocabulary = (recipeId) => {
  const recipe = getRecipeById(recipeId);
  if (!recipe) return [];
  
  const vocab = [];
  
  // Add ingredients vocabulary
  recipe.ingredients.forEach(ing => {
    vocab.push({
      term: ing.nameNative,
      translation: ing.nameEnglish,
      type: 'ingredient',
    });
  });
  
  // Add step vocabulary
  recipe.steps.forEach(step => {
    step.keyTerms?.forEach(term => {
      vocab.push(term);
    });
  });
  
  return vocab;
};

// Stats
export const getRecipeStats = () => {
  const allRecipes = getAllRecipes();
  
  return {
    totalRecipes: allRecipes.length,
    cuisines: Object.keys(recipesByLanguage).filter(k => 
      !['spanish', 'yoruba', 'igbo', 'hausa', 'mexican', 'quebec', 'nigerian'].includes(k)
    ).length,
    byDifficulty: {
      beginner: allRecipes.filter(r => r.difficulty === 'beginner').length,
      intermediate: allRecipes.filter(r => r.difficulty === 'intermediate').length,
      advanced: allRecipes.filter(r => r.difficulty === 'advanced').length,
    },
  };
};

// Export individual recipe collections
export {
  persianRecipes,
  japaneseRecipes,
  italianRecipes,
  koreanRecipes,
  mexicanRecipes,
  nigerianRecipes,
  polishRecipes,
  quebecRecipes,
  russianRecipes,
};

export default recipesByLanguage;
