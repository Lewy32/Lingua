/**
 * Quebec Recipes - Cuisine Québécoise
 * 12 authentic recipes with Québécois French vocabulary
 */

export const quebecRecipes = [
  {
    id: 'poutine',
    nameEnglish: 'Poutine',
    nameNative: 'Poutine',
    namePhonetic: 'poo-TEEN',
    description: 'The iconic Quebec dish - fries, cheese curds, and gravy',
    difficulty: 'intermediate',
    prepTime: 30,
    cookTime: 30,
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1579065560489-989b3b0d0908',
    culturalContext: 'Poutine was invented in rural Quebec in the 1950s. It\'s now a symbol of Québécois identity and has achieved international fame.',
    ingredients: [
      { nameEnglish: 'russet potatoes', nameNative: 'patates Russet', amount: '1', unit: 'kg' },
      { nameEnglish: 'cheese curds', nameNative: 'fromage en grains', amount: '400', unit: 'g' },
      { nameEnglish: 'beef broth', nameNative: 'bouillon de bœuf', amount: '500', unit: 'ml' },
      { nameEnglish: 'butter', nameNative: 'beurre', amount: '3', unit: 'tbsp' },
      { nameEnglish: 'flour', nameNative: 'farine', amount: '3', unit: 'tbsp' },
      { nameEnglish: 'vegetable oil', nameNative: 'huile végétale', amount: '', unit: 'for frying' },
      { nameEnglish: 'salt', nameNative: 'sel', amount: '', unit: 'to taste' },
    ],
    steps: [
      {
        instruction: 'Cut potatoes into thick fries',
        instructionNative: 'Couper les patates en grosses frites',
        duration: 300,
        keyTerms: [
          { term: 'patates', translation: 'potatoes', type: 'noun' },
          { term: 'couper', translation: 'to cut', type: 'verb' },
          { term: 'frites', translation: 'fries', type: 'noun' },
          { term: 'grosses', translation: 'thick/large', type: 'adjective' },
        ],
      },
      {
        instruction: 'Soak fries in cold water 30 minutes',
        instructionNative: 'Tremper les frites dans l\'eau froide pendant 30 minutes',
        duration: 1800,
        keyTerms: [
          { term: 'tremper', translation: 'to soak', type: 'verb' },
          { term: 'eau froide', translation: 'cold water', type: 'phrase' },
          { term: 'pendant', translation: 'for/during', type: 'preposition' },
        ],
      },
      {
        instruction: 'Make gravy: melt butter, whisk in flour',
        instructionNative: 'Faire la sauce: fondre le beurre, incorporer la farine',
        duration: 180,
        keyTerms: [
          { term: 'sauce', translation: 'gravy/sauce', type: 'noun' },
          { term: 'fondre', translation: 'to melt', type: 'verb' },
          { term: 'beurre', translation: 'butter', type: 'noun' },
          { term: 'farine', translation: 'flour', type: 'noun' },
        ],
      },
      {
        instruction: 'Gradually add broth, simmer until thick',
        instructionNative: 'Ajouter le bouillon graduellement, mijoter jusqu\'à épaississement',
        duration: 600,
        keyTerms: [
          { term: 'bouillon', translation: 'broth', type: 'noun' },
          { term: 'ajouter', translation: 'to add', type: 'verb' },
          { term: 'mijoter', translation: 'to simmer', type: 'verb' },
          { term: 'épaississement', translation: 'thickening', type: 'noun' },
        ],
      },
      {
        instruction: 'Dry fries and fry at 300°F until soft',
        instructionNative: 'Sécher les frites et frire à 150°C jusqu\'à tendreté',
        duration: 600,
        keyTerms: [
          { term: 'sécher', translation: 'to dry', type: 'verb' },
          { term: 'frire', translation: 'to fry', type: 'verb' },
        ],
      },
      {
        instruction: 'Second fry at 375°F until golden and crispy',
        instructionNative: 'Deuxième friture à 190°C jusqu\'à doré et croustillant',
        duration: 300,
        keyTerms: [
          { term: 'friture', translation: 'frying', type: 'noun' },
          { term: 'doré', translation: 'golden', type: 'adjective' },
          { term: 'croustillant', translation: 'crispy', type: 'adjective' },
        ],
      },
      {
        instruction: 'Let cheese curds come to room temperature',
        instructionNative: 'Laisser le fromage en grains atteindre la température ambiante',
        duration: 60,
        keyTerms: [
          { term: 'fromage en grains', translation: 'cheese curds', type: 'noun' },
          { term: 'température', translation: 'temperature', type: 'noun' },
        ],
      },
      {
        instruction: 'Layer: fries, curds, hot gravy',
        instructionNative: 'Superposer: frites, fromage, sauce chaude',
        duration: 60,
        keyTerms: [
          { term: 'superposer', translation: 'to layer', type: 'verb' },
          { term: 'chaude', translation: 'hot', type: 'adjective' },
        ],
      },
    ],
    vocabulary: ['poutine', 'frites', 'fromage en grains', 'sauce', 'patates', 'frire', 'croustillant'],
    tags: ['fries', 'cheese', 'comfort food', 'iconic'],
  },
  {
    id: 'tourtiere',
    nameEnglish: 'Meat Pie',
    nameNative: 'Tourtière',
    namePhonetic: 'toor-TYEHR',
    description: 'Traditional Quebec meat pie served at Christmas',
    difficulty: 'intermediate',
    prepTime: 45,
    cookTime: 60,
    servings: 8,
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
    culturalContext: 'Tourtière is essential at Christmas Eve réveillon (feast). Every family has their own recipe passed down through generations.',
    ingredients: [
      { nameEnglish: 'ground pork', nameNative: 'porc haché', amount: '500', unit: 'g' },
      { nameEnglish: 'ground beef', nameNative: 'bœuf haché', amount: '250', unit: 'g' },
      { nameEnglish: 'potatoes', nameNative: 'patates', amount: '2', unit: 'medium' },
      { nameEnglish: 'onion', nameNative: 'oignon', amount: '1', unit: 'large' },
      { nameEnglish: 'cloves', nameNative: 'clous de girofle', amount: '1/4', unit: 'tsp' },
      { nameEnglish: 'cinnamon', nameNative: 'cannelle', amount: '1/4', unit: 'tsp' },
      { nameEnglish: 'pie dough', nameNative: 'pâte à tarte', amount: '2', unit: 'crusts' },
      { nameEnglish: 'celery salt', nameNative: 'sel de céleri', amount: '1/2', unit: 'tsp' },
    ],
    steps: [
      {
        instruction: 'Boil and mash potatoes',
        instructionNative: 'Bouillir et piler les patates',
        duration: 1200,
        keyTerms: [
          { term: 'bouillir', translation: 'to boil', type: 'verb' },
          { term: 'piler', translation: 'to mash', type: 'verb' },
        ],
      },
      {
        instruction: 'Dice onion finely',
        instructionNative: 'Couper l\'oignon finement',
        duration: 180,
        keyTerms: [
          { term: 'oignon', translation: 'onion', type: 'noun' },
          { term: 'finement', translation: 'finely', type: 'adverb' },
        ],
      },
      {
        instruction: 'Brown meat with onion in large pan',
        instructionNative: 'Faire revenir la viande avec l\'oignon dans une grande poêle',
        duration: 600,
        keyTerms: [
          { term: 'viande', translation: 'meat', type: 'noun' },
          { term: 'faire revenir', translation: 'to brown', type: 'verb' },
          { term: 'poêle', translation: 'pan', type: 'noun' },
        ],
      },
      {
        instruction: 'Add spices: cloves, cinnamon, celery salt',
        instructionNative: 'Ajouter les épices: clous de girofle, cannelle, sel de céleri',
        duration: 60,
        keyTerms: [
          { term: 'épices', translation: 'spices', type: 'noun' },
          { term: 'cannelle', translation: 'cinnamon', type: 'noun' },
        ],
      },
      {
        instruction: 'Add water and simmer 20 minutes',
        instructionNative: 'Ajouter de l\'eau et mijoter 20 minutes',
        duration: 1200,
        keyTerms: [
          { term: 'eau', translation: 'water', type: 'noun' },
        ],
      },
      {
        instruction: 'Mix in mashed potatoes',
        instructionNative: 'Incorporer les patates pilées',
        duration: 120,
        keyTerms: [
          { term: 'incorporer', translation: 'to mix in', type: 'verb' },
        ],
      },
      {
        instruction: 'Line pie plate with bottom crust, add filling',
        instructionNative: 'Foncer l\'assiette à tarte, ajouter la garniture',
        duration: 300,
        keyTerms: [
          { term: 'foncer', translation: 'to line', type: 'verb' },
          { term: 'assiette à tarte', translation: 'pie plate', type: 'noun' },
          { term: 'garniture', translation: 'filling', type: 'noun' },
        ],
      },
      {
        instruction: 'Cover with top crust, crimp edges, cut vents',
        instructionNative: 'Couvrir de la pâte du dessus, pincer les bords, faire des trous',
        duration: 180,
        keyTerms: [
          { term: 'couvrir', translation: 'to cover', type: 'verb' },
          { term: 'pâte', translation: 'dough/pastry', type: 'noun' },
          { term: 'bords', translation: 'edges', type: 'noun' },
        ],
      },
      {
        instruction: 'Bake at 400°F for 45-50 minutes',
        instructionNative: 'Cuire au four à 200°C pendant 45-50 minutes',
        duration: 3000,
        keyTerms: [
          { term: 'cuire au four', translation: 'to bake', type: 'verb' },
          { term: 'four', translation: 'oven', type: 'noun' },
        ],
      },
    ],
    vocabulary: ['tourtière', 'viande', 'pâte', 'patates', 'épices', 'four', 'cuire', 'garniture'],
    tags: ['pie', 'Christmas', 'meat', 'traditional'],
  },
  {
    id: 'soupe-aux-pois',
    nameEnglish: 'Split Pea Soup',
    nameNative: 'Soupe aux Pois',
    namePhonetic: 'soop oh PWAH',
    description: 'Hearty habitant pea soup with ham',
    difficulty: 'beginner',
    prepTime: 15,
    cookTime: 120,
    servings: 10,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    culturalContext: 'Soupe aux pois sustained Quebec\'s habitants (farmers) through long winters. It\'s simple, nutritious, and deeply comforting.',
    ingredients: [
      { nameEnglish: 'dried yellow peas', nameNative: 'pois jaunes séchés', amount: '500', unit: 'g' },
      { nameEnglish: 'ham bone or hock', nameNative: 'os de jambon', amount: '1', unit: '' },
      { nameEnglish: 'onion', nameNative: 'oignon', amount: '1', unit: 'large' },
      { nameEnglish: 'carrots', nameNative: 'carottes', amount: '2', unit: '' },
      { nameEnglish: 'celery', nameNative: 'céleri', amount: '2', unit: 'stalks' },
      { nameEnglish: 'bay leaf', nameNative: 'feuille de laurier', amount: '1', unit: '' },
      { nameEnglish: 'savory', nameNative: 'sarriette', amount: '1', unit: 'tsp' },
      { nameEnglish: 'salt & pepper', nameNative: 'sel et poivre', amount: '', unit: 'to taste' },
    ],
    steps: [
      {
        instruction: 'Rinse peas and place in large pot',
        instructionNative: 'Rincer les pois et mettre dans une grande marmite',
        duration: 180,
        keyTerms: [
          { term: 'pois', translation: 'peas', type: 'noun' },
          { term: 'rincer', translation: 'to rinse', type: 'verb' },
          { term: 'marmite', translation: 'pot', type: 'noun' },
        ],
      },
      {
        instruction: 'Add ham bone and cover with cold water',
        instructionNative: 'Ajouter l\'os de jambon et couvrir d\'eau froide',
        duration: 60,
        keyTerms: [
          { term: 'os', translation: 'bone', type: 'noun' },
          { term: 'jambon', translation: 'ham', type: 'noun' },
        ],
      },
      {
        instruction: 'Dice onion, carrots, and celery',
        instructionNative: 'Couper l\'oignon, les carottes et le céleri en dés',
        duration: 300,
        keyTerms: [
          { term: 'carottes', translation: 'carrots', type: 'noun' },
          { term: 'céleri', translation: 'celery', type: 'noun' },
          { term: 'en dés', translation: 'diced', type: 'phrase' },
        ],
      },
      {
        instruction: 'Add vegetables, bay leaf, and savory',
        instructionNative: 'Ajouter les légumes, la feuille de laurier et la sarriette',
        duration: 60,
        keyTerms: [
          { term: 'légumes', translation: 'vegetables', type: 'noun' },
          { term: 'sarriette', translation: 'savory (herb)', type: 'noun' },
        ],
      },
      {
        instruction: 'Bring to boil, then simmer 2 hours',
        instructionNative: 'Porter à ébullition, puis mijoter 2 heures',
        duration: 7200,
        keyTerms: [
          { term: 'porter à ébullition', translation: 'to bring to boil', type: 'phrase' },
          { term: 'heures', translation: 'hours', type: 'noun' },
        ],
      },
      {
        instruction: 'Remove ham bone, shred meat',
        instructionNative: 'Retirer l\'os de jambon, effilocher la viande',
        duration: 300,
        keyTerms: [
          { term: 'retirer', translation: 'to remove', type: 'verb' },
          { term: 'effilocher', translation: 'to shred', type: 'verb' },
        ],
      },
      {
        instruction: 'Return meat to soup',
        instructionNative: 'Remettre la viande dans la soupe',
        duration: 60,
        keyTerms: [
          { term: 'soupe', translation: 'soup', type: 'noun' },
          { term: 'remettre', translation: 'to put back', type: 'verb' },
        ],
      },
      {
        instruction: 'Season and serve with bread',
        instructionNative: 'Assaisonner et servir avec du pain',
        duration: 60,
        keyTerms: [
          { term: 'assaisonner', translation: 'to season', type: 'verb' },
          { term: 'pain', translation: 'bread', type: 'noun' },
        ],
      },
    ],
    vocabulary: ['soupe', 'pois', 'jambon', 'légumes', 'mijoter', 'marmite', 'pain'],
    tags: ['soup', 'winter', 'ham', 'traditional'],
  },
  {
    id: 'cretons',
    nameEnglish: 'Pork Spread',
    nameNative: 'Cretons',
    namePhonetic: 'kreh-TOHN',
    description: 'Spiced pork pâté spread on toast',
    difficulty: 'beginner',
    prepTime: 15,
    cookTime: 90,
    servings: 12,
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
    culturalContext: 'Cretons are a Quebec breakfast staple, spread on toast. Every family guards their recipe, varying with spice levels.',
    ingredients: [
      { nameEnglish: 'ground pork', nameNative: 'porc haché', amount: '500', unit: 'g' },
      { nameEnglish: 'onion', nameNative: 'oignon', amount: '1', unit: 'medium' },
      { nameEnglish: 'milk', nameNative: 'lait', amount: '250', unit: 'ml' },
      { nameEnglish: 'breadcrumbs', nameNative: 'chapelure', amount: '60', unit: 'g' },
      { nameEnglish: 'cloves', nameNative: 'clous de girofle', amount: '1/4', unit: 'tsp' },
      { nameEnglish: 'cinnamon', nameNative: 'cannelle', amount: '1/4', unit: 'tsp' },
      { nameEnglish: 'salt', nameNative: 'sel', amount: '1', unit: 'tsp' },
    ],
    steps: [
      {
        instruction: 'Finely chop onion',
        instructionNative: 'Hacher finement l\'oignon',
        duration: 120,
        keyTerms: [
          { term: 'hacher', translation: 'to chop', type: 'verb' },
        ],
      },
      {
        instruction: 'Combine all ingredients in saucepan',
        instructionNative: 'Combiner tous les ingrédients dans une casserole',
        duration: 120,
        keyTerms: [
          { term: 'combiner', translation: 'to combine', type: 'verb' },
          { term: 'ingrédients', translation: 'ingredients', type: 'noun' },
          { term: 'casserole', translation: 'saucepan', type: 'noun' },
        ],
      },
      {
        instruction: 'Bring to boil, stirring',
        instructionNative: 'Porter à ébullition en remuant',
        duration: 300,
        keyTerms: [
          { term: 'remuer', translation: 'to stir', type: 'verb' },
        ],
      },
      {
        instruction: 'Reduce heat and simmer 90 minutes',
        instructionNative: 'Réduire le feu et mijoter 90 minutes',
        duration: 5400,
        keyTerms: [
          { term: 'réduire', translation: 'to reduce', type: 'verb' },
          { term: 'feu', translation: 'heat/fire', type: 'noun' },
        ],
      },
      {
        instruction: 'Stir frequently to prevent sticking',
        instructionNative: 'Remuer souvent pour éviter que ça colle',
        duration: 60,
        keyTerms: [
          { term: 'souvent', translation: 'often', type: 'adverb' },
          { term: 'coller', translation: 'to stick', type: 'verb' },
        ],
      },
      {
        instruction: 'Mash or blend to desired texture',
        instructionNative: 'Écraser ou mélanger à la texture désirée',
        duration: 180,
        keyTerms: [
          { term: 'écraser', translation: 'to mash', type: 'verb' },
          { term: 'texture', translation: 'texture', type: 'noun' },
        ],
      },
      {
        instruction: 'Pour into container and refrigerate',
        instructionNative: 'Verser dans un contenant et réfrigérer',
        duration: 60,
        keyTerms: [
          { term: 'verser', translation: 'to pour', type: 'verb' },
          { term: 'réfrigérer', translation: 'to refrigerate', type: 'verb' },
        ],
      },
      {
        instruction: 'Serve cold on toast',
        instructionNative: 'Servir froid sur du pain grillé',
        duration: 60,
        keyTerms: [
          { term: 'froid', translation: 'cold', type: 'adjective' },
          { term: 'pain grillé', translation: 'toast', type: 'noun' },
        ],
      },
    ],
    vocabulary: ['cretons', 'porc', 'hacher', 'mijoter', 'casserole', 'pain grillé', 'froid'],
    tags: ['breakfast', 'spread', 'pork', 'traditional'],
  },
  {
    id: 'feves-au-lard',
    nameEnglish: 'Baked Beans with Bacon',
    nameNative: 'Fèves au Lard',
    namePhonetic: 'fehv oh LAR',
    description: 'Quebec-style baked beans, sweeter and richer',
    difficulty: 'beginner',
    prepTime: 30,
    cookTime: 360,
    servings: 10,
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e',
    culturalContext: 'Fèves au lard were traditionally baked in a wood-fired oven overnight. They\'re perfect with tourtière at Christmas.',
    ingredients: [
      { nameEnglish: 'white navy beans', nameNative: 'haricots blancs', amount: '500', unit: 'g' },
      { nameEnglish: 'salt pork', nameNative: 'lard salé', amount: '200', unit: 'g' },
      { nameEnglish: 'maple syrup', nameNative: 'sirop d\'érable', amount: '125', unit: 'ml' },
      { nameEnglish: 'molasses', nameNative: 'mélasse', amount: '60', unit: 'ml' },
      { nameEnglish: 'onion', nameNative: 'oignon', amount: '1', unit: '' },
      { nameEnglish: 'dry mustard', nameNative: 'moutarde sèche', amount: '1', unit: 'tsp' },
      { nameEnglish: 'salt', nameNative: 'sel', amount: '1', unit: 'tsp' },
    ],
    steps: [
      {
        instruction: 'Soak beans overnight in cold water',
        instructionNative: 'Faire tremper les haricots toute la nuit dans l\'eau froide',
        duration: 28800,
        keyTerms: [
          { term: 'haricots', translation: 'beans', type: 'noun' },
          { term: 'toute la nuit', translation: 'overnight', type: 'phrase' },
        ],
      },
      {
        instruction: 'Drain beans and place in bean pot',
        instructionNative: 'Égoutter les haricots et mettre dans un pot en grès',
        duration: 120,
        keyTerms: [
          { term: 'égoutter', translation: 'to drain', type: 'verb' },
          { term: 'pot en grès', translation: 'bean pot', type: 'noun' },
        ],
      },
      {
        instruction: 'Score salt pork and nestle into beans',
        instructionNative: 'Inciser le lard salé et l\'enfouir dans les haricots',
        duration: 120,
        keyTerms: [
          { term: 'inciser', translation: 'to score', type: 'verb' },
          { term: 'lard salé', translation: 'salt pork', type: 'noun' },
          { term: 'enfouir', translation: 'to bury/nestle', type: 'verb' },
        ],
      },
      {
        instruction: 'Add whole onion',
        instructionNative: 'Ajouter l\'oignon entier',
        duration: 30,
        keyTerms: [
          { term: 'entier', translation: 'whole', type: 'adjective' },
        ],
      },
      {
        instruction: 'Mix maple syrup, molasses, mustard, salt with hot water',
        instructionNative: 'Mélanger le sirop d\'érable, la mélasse, la moutarde, le sel avec de l\'eau chaude',
        duration: 180,
        keyTerms: [
          { term: 'sirop d\'érable', translation: 'maple syrup', type: 'noun' },
          { term: 'mélasse', translation: 'molasses', type: 'noun' },
          { term: 'mélanger', translation: 'to mix', type: 'verb' },
        ],
      },
      {
        instruction: 'Pour mixture over beans',
        instructionNative: 'Verser le mélange sur les haricots',
        duration: 60,
        keyTerms: [
          { term: 'mélange', translation: 'mixture', type: 'noun' },
        ],
      },
      {
        instruction: 'Bake covered at 300°F for 6 hours',
        instructionNative: 'Cuire couvert au four à 150°C pendant 6 heures',
        duration: 21600,
        keyTerms: [
          { term: 'couvert', translation: 'covered', type: 'adjective' },
        ],
      },
      {
        instruction: 'Uncover last hour to brown top',
        instructionNative: 'Découvrir la dernière heure pour dorer le dessus',
        duration: 60,
        keyTerms: [
          { term: 'découvrir', translation: 'to uncover', type: 'verb' },
          { term: 'dorer', translation: 'to brown', type: 'verb' },
        ],
      },
    ],
    vocabulary: ['fèves', 'haricots', 'sirop d\'érable', 'lard', 'cuire', 'mijoter', 'mélasse'],
    tags: ['beans', 'maple', 'slow-cooked', 'traditional'],
  },
  {
    id: 'pouding-chomeur',
    nameEnglish: 'Poor Man\'s Pudding',
    nameNative: 'Pouding Chômeur',
    namePhonetic: 'poo-DING shoh-MUHR',
    description: 'Cake baked in maple syrup sauce - a Depression-era classic',
    difficulty: 'beginner',
    prepTime: 15,
    cookTime: 35,
    servings: 9,
    imageUrl: 'https://images.unsplash.com/photo-1509365390695-33aee754301f',
    culturalContext: 'Created during the Great Depression when ingredients were scarce. "Chômeur" means unemployed - this was an affordable treat.',
    ingredients: [
      { nameEnglish: 'flour', nameNative: 'farine', amount: '250', unit: 'g' },
      { nameEnglish: 'sugar', nameNative: 'sucre', amount: '150', unit: 'g' },
      { nameEnglish: 'butter', nameNative: 'beurre', amount: '60', unit: 'g' },
      { nameEnglish: 'milk', nameNative: 'lait', amount: '175', unit: 'ml' },
      { nameEnglish: 'baking powder', nameNative: 'poudre à pâte', amount: '2', unit: 'tsp' },
      { nameEnglish: 'maple syrup', nameNative: 'sirop d\'érable', amount: '300', unit: 'ml' },
      { nameEnglish: 'heavy cream', nameNative: 'crème épaisse', amount: '200', unit: 'ml' },
      { nameEnglish: 'vanilla', nameNative: 'vanille', amount: '1', unit: 'tsp' },
    ],
    steps: [
      {
        instruction: 'Preheat oven to 350°F',
        instructionNative: 'Préchauffer le four à 180°C',
        duration: 60,
        keyTerms: [
          { term: 'préchauffer', translation: 'to preheat', type: 'verb' },
        ],
      },
      {
        instruction: 'Cream butter and sugar',
        instructionNative: 'Crémer le beurre et le sucre',
        duration: 180,
        keyTerms: [
          { term: 'crémer', translation: 'to cream', type: 'verb' },
          { term: 'sucre', translation: 'sugar', type: 'noun' },
        ],
      },
      {
        instruction: 'Mix flour and baking powder',
        instructionNative: 'Mélanger la farine et la poudre à pâte',
        duration: 60,
        keyTerms: [
          { term: 'poudre à pâte', translation: 'baking powder', type: 'noun' },
        ],
      },
      {
        instruction: 'Add dry ingredients alternating with milk',
        instructionNative: 'Ajouter les ingrédients secs en alternant avec le lait',
        duration: 180,
        keyTerms: [
          { term: 'secs', translation: 'dry', type: 'adjective' },
          { term: 'lait', translation: 'milk', type: 'noun' },
        ],
      },
      {
        instruction: 'Spread batter in greased 9x9 pan',
        instructionNative: 'Étendre la pâte dans un moule graissé de 9x9',
        duration: 120,
        keyTerms: [
          { term: 'étendre', translation: 'to spread', type: 'verb' },
          { term: 'moule', translation: 'pan/mold', type: 'noun' },
          { term: 'graissé', translation: 'greased', type: 'adjective' },
        ],
      },
      {
        instruction: 'Heat maple syrup and cream in saucepan',
        instructionNative: 'Chauffer le sirop d\'érable et la crème dans une casserole',
        duration: 300,
        keyTerms: [
          { term: 'chauffer', translation: 'to heat', type: 'verb' },
          { term: 'crème', translation: 'cream', type: 'noun' },
        ],
      },
      {
        instruction: 'Pour hot syrup mixture over batter',
        instructionNative: 'Verser le mélange de sirop chaud sur la pâte',
        duration: 60,
        keyTerms: [
          { term: 'chaud', translation: 'hot', type: 'adjective' },
        ],
      },
      {
        instruction: 'Bake 35 minutes until golden',
        instructionNative: 'Cuire 35 minutes jusqu\'à coloration dorée',
        duration: 2100,
        keyTerms: [
          { term: 'coloration', translation: 'coloring', type: 'noun' },
        ],
      },
    ],
    vocabulary: ['pouding', 'sirop d\'érable', 'crème', 'farine', 'cuire', 'four', 'sucre'],
    tags: ['dessert', 'maple', 'cake', 'Depression-era'],
  },
  {
    id: 'tarte-au-sucre',
    nameEnglish: 'Sugar Pie',
    nameNative: 'Tarte au Sucre',
    namePhonetic: 'tart oh soo-KRE',
    description: 'Simple, indulgent brown sugar and cream pie',
    difficulty: 'intermediate',
    prepTime: 20,
    cookTime: 45,
    servings: 8,
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
    culturalContext: 'A Christmas and sugar shack staple. The simplicity of ingredients reflects Quebec\'s rural heritage - brown sugar and cream from the farm.',
    ingredients: [
      { nameEnglish: 'pie crust', nameNative: 'croûte à tarte', amount: '1', unit: '' },
      { nameEnglish: 'brown sugar', nameNative: 'cassonade', amount: '250', unit: 'g' },
      { nameEnglish: 'heavy cream', nameNative: 'crème épaisse', amount: '250', unit: 'ml' },
      { nameEnglish: 'flour', nameNative: 'farine', amount: '2', unit: 'tbsp' },
      { nameEnglish: 'butter', nameNative: 'beurre', amount: '30', unit: 'g' },
      { nameEnglish: 'vanilla', nameNative: 'vanille', amount: '1', unit: 'tsp' },
    ],
    steps: [
      {
        instruction: 'Line pie plate with crust',
        instructionNative: 'Foncer l\'assiette à tarte avec la croûte',
        duration: 180,
        keyTerms: [
          { term: 'croûte', translation: 'crust', type: 'noun' },
        ],
      },
      {
        instruction: 'Mix brown sugar with flour',
        instructionNative: 'Mélanger la cassonade avec la farine',
        duration: 60,
        keyTerms: [
          { term: 'cassonade', translation: 'brown sugar', type: 'noun' },
        ],
      },
      {
        instruction: 'Pour into pie shell',
        instructionNative: 'Verser dans la croûte',
        duration: 60,
        keyTerms: [],
      },
      {
        instruction: 'Pour cream evenly over sugar',
        instructionNative: 'Verser la crème uniformément sur le sucre',
        duration: 60,
        keyTerms: [
          { term: 'uniformément', translation: 'evenly', type: 'adverb' },
        ],
      },
      {
        instruction: 'Dot with butter',
        instructionNative: 'Parsemer de noisettes de beurre',
        duration: 60,
        keyTerms: [
          { term: 'parsemer', translation: 'to dot', type: 'verb' },
          { term: 'noisettes', translation: 'small pieces', type: 'noun' },
        ],
      },
      {
        instruction: 'Do not stir - layers will blend while baking',
        instructionNative: 'Ne pas mélanger - les couches se mélangeront à la cuisson',
        duration: 30,
        keyTerms: [
          { term: 'couches', translation: 'layers', type: 'noun' },
          { term: 'cuisson', translation: 'baking', type: 'noun' },
        ],
      },
      {
        instruction: 'Bake at 350°F for 45 minutes',
        instructionNative: 'Cuire au four à 180°C pendant 45 minutes',
        duration: 2700,
        keyTerms: [],
      },
      {
        instruction: 'Cool completely before slicing',
        instructionNative: 'Refroidir complètement avant de trancher',
        duration: 60,
        keyTerms: [
          { term: 'refroidir', translation: 'to cool', type: 'verb' },
          { term: 'trancher', translation: 'to slice', type: 'verb' },
        ],
      },
    ],
    vocabulary: ['tarte', 'sucre', 'cassonade', 'crème', 'croûte', 'cuire', 'four'],
    tags: ['dessert', 'pie', 'sugar', 'Christmas'],
  },
  {
    id: 'cipaille',
    nameEnglish: 'Layered Meat Pie',
    nameNative: 'Cipaille (Cipâte/Six-Pâtes)',
    namePhonetic: 'see-PIE',
    description: 'Multi-layered meat and potato pie from the Saguenay',
    difficulty: 'advanced',
    prepTime: 90,
    cookTime: 240,
    servings: 12,
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
    culturalContext: 'Cipaille (from "six pâtes" - six pastry layers) is a Saguenay-Lac-Saint-Jean specialty. It feeds a crowd and is perfect for holidays.',
    ingredients: [
      { nameEnglish: 'assorted game/meat', nameNative: 'viandes diverses', amount: '2', unit: 'kg' },
      { nameEnglish: 'potatoes', nameNative: 'patates', amount: '1', unit: 'kg' },
      { nameEnglish: 'onions', nameNative: 'oignons', amount: '3', unit: '' },
      { nameEnglish: 'pie dough', nameNative: 'pâte à tarte', amount: '6', unit: 'layers' },
      { nameEnglish: 'chicken broth', nameNative: 'bouillon de poulet', amount: '1', unit: 'L' },
      { nameEnglish: 'savory', nameNative: 'sarriette', amount: '2', unit: 'tsp' },
      { nameEnglish: 'bay leaves', nameNative: 'feuilles de laurier', amount: '3', unit: '' },
    ],
    steps: [
      {
        instruction: 'Cut meats into cubes',
        instructionNative: 'Couper les viandes en cubes',
        duration: 600,
        keyTerms: [
          { term: 'viandes', translation: 'meats', type: 'noun' },
          { term: 'cubes', translation: 'cubes', type: 'noun' },
        ],
      },
      {
        instruction: 'Slice potatoes and onions',
        instructionNative: 'Trancher les patates et les oignons',
        duration: 600,
        keyTerms: [
          { term: 'trancher', translation: 'to slice', type: 'verb' },
        ],
      },
      {
        instruction: 'Line deep pot with pastry',
        instructionNative: 'Foncer une grande marmite avec la pâte',
        duration: 300,
        keyTerms: [],
      },
      {
        instruction: 'Layer: meat, potatoes, onions, seasonings',
        instructionNative: 'Superposer: viande, patates, oignons, assaisonnements',
        duration: 600,
        keyTerms: [
          { term: 'assaisonnements', translation: 'seasonings', type: 'noun' },
        ],
      },
      {
        instruction: 'Cover with pastry, repeat layers',
        instructionNative: 'Couvrir de pâte, répéter les couches',
        duration: 1200,
        keyTerms: [
          { term: 'répéter', translation: 'to repeat', type: 'verb' },
        ],
      },
      {
        instruction: 'Finish with pastry top, cut vent',
        instructionNative: 'Finir avec la pâte sur le dessus, faire une cheminée',
        duration: 180,
        keyTerms: [
          { term: 'cheminée', translation: 'vent/chimney', type: 'noun' },
          { term: 'dessus', translation: 'top', type: 'noun' },
        ],
      },
      {
        instruction: 'Pour hot broth through vent',
        instructionNative: 'Verser le bouillon chaud par la cheminée',
        duration: 120,
        keyTerms: [],
      },
      {
        instruction: 'Bake covered at 325°F for 4 hours',
        instructionNative: 'Cuire couvert au four à 160°C pendant 4 heures',
        duration: 14400,
        keyTerms: [],
      },
    ],
    vocabulary: ['cipaille', 'pâte', 'viandes', 'patates', 'couches', 'marmite', 'bouillon'],
    tags: ['pie', 'game', 'Saguenay', 'celebration'],
  },
  {
    id: 'tire-sur-neige',
    nameEnglish: 'Maple Taffy on Snow',
    nameNative: 'Tire sur la Neige',
    namePhonetic: 'teer soor la NEZH',
    description: 'Hot maple syrup poured on snow - sugar shack tradition',
    difficulty: 'beginner',
    prepTime: 5,
    cookTime: 15,
    servings: 8,
    imageUrl: 'https://images.unsplash.com/photo-1509365390695-33aee754301f',
    culturalContext: 'A must at sugar shacks (cabanes à sucre) during maple season (la saison des sucres). Children and adults alike roll the taffy on sticks.',
    ingredients: [
      { nameEnglish: 'maple syrup (pure)', nameNative: 'sirop d\'érable pur', amount: '500', unit: 'ml' },
      { nameEnglish: 'clean snow', nameNative: 'neige propre', amount: '', unit: 'lots' },
      { nameEnglish: 'popsicle sticks', nameNative: 'bâtons de popsicle', amount: '12', unit: '' },
    ],
    steps: [
      {
        instruction: 'Pack clean snow into a tray',
        instructionNative: 'Tasser de la neige propre dans un plateau',
        duration: 120,
        keyTerms: [
          { term: 'neige', translation: 'snow', type: 'noun' },
          { term: 'propre', translation: 'clean', type: 'adjective' },
          { term: 'tasser', translation: 'to pack', type: 'verb' },
          { term: 'plateau', translation: 'tray', type: 'noun' },
        ],
      },
      {
        instruction: 'Keep snow very cold until needed',
        instructionNative: 'Garder la neige très froide jusqu\'à utilisation',
        duration: 60,
        keyTerms: [
          { term: 'garder', translation: 'to keep', type: 'verb' },
          { term: 'froid', translation: 'cold', type: 'adjective' },
        ],
      },
      {
        instruction: 'Heat maple syrup to 235-240°F (soft ball stage)',
        instructionNative: 'Chauffer le sirop d\'érable à 112-115°C (boule molle)',
        duration: 600,
        keyTerms: [
          { term: 'boule molle', translation: 'soft ball (stage)', type: 'phrase' },
        ],
      },
      {
        instruction: 'Test: drop in cold water, should form soft ball',
        instructionNative: 'Tester: verser dans l\'eau froide, doit former une boule molle',
        duration: 60,
        keyTerms: [
          { term: 'tester', translation: 'to test', type: 'verb' },
        ],
      },
      {
        instruction: 'Pour hot syrup in lines on snow',
        instructionNative: 'Verser le sirop chaud en lignes sur la neige',
        duration: 60,
        keyTerms: [
          { term: 'lignes', translation: 'lines', type: 'noun' },
        ],
      },
      {
        instruction: 'Wait a few seconds for syrup to set',
        instructionNative: 'Attendre quelques secondes pour que le sirop durcisse',
        duration: 15,
        keyTerms: [
          { term: 'attendre', translation: 'to wait', type: 'verb' },
          { term: 'durcir', translation: 'to harden', type: 'verb' },
        ],
      },
      {
        instruction: 'Roll onto stick quickly',
        instructionNative: 'Enrouler rapidement sur un bâton',
        duration: 30,
        keyTerms: [
          { term: 'enrouler', translation: 'to roll', type: 'verb' },
          { term: 'bâton', translation: 'stick', type: 'noun' },
          { term: 'rapidement', translation: 'quickly', type: 'adverb' },
        ],
      },
      {
        instruction: 'Eat immediately while chewy!',
        instructionNative: 'Manger tout de suite pendant que c\'est moelleux!',
        duration: 30,
        keyTerms: [
          { term: 'moelleux', translation: 'chewy/soft', type: 'adjective' },
          { term: 'tout de suite', translation: 'immediately', type: 'phrase' },
        ],
      },
    ],
    vocabulary: ['tire', 'neige', 'sirop d\'érable', 'enrouler', 'bâton', 'chauffer', 'durcir'],
    tags: ['maple', 'candy', 'sugar shack', 'tradition'],
  },
  {
    id: 'oreilles-de-crisse',
    nameEnglish: 'Crispy Pork Rinds',
    nameNative: 'Oreilles de Crisse',
    namePhonetic: 'oh-RAY duh KREES',
    description: 'Deep-fried salt pork - sugar shack snack',
    difficulty: 'beginner',
    prepTime: 5,
    cookTime: 20,
    servings: 6,
    imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35',
    culturalContext: 'The name is Quebec slang, translating roughly to "Christ\'s ears" (a joual expression). These crispy treats are a sugar shack must-have.',
    ingredients: [
      { nameEnglish: 'salt pork', nameNative: 'lard salé', amount: '500', unit: 'g' },
      { nameEnglish: 'maple syrup', nameNative: 'sirop d\'érable', amount: '', unit: 'for drizzling' },
    ],
    steps: [
      {
        instruction: 'Slice salt pork into thin strips',
        instructionNative: 'Couper le lard salé en fines tranches',
        duration: 180,
        keyTerms: [
          { term: 'fines', translation: 'thin', type: 'adjective' },
          { term: 'tranches', translation: 'slices', type: 'noun' },
        ],
      },
      {
        instruction: 'Rinse to remove excess salt',
        instructionNative: 'Rincer pour enlever l\'excès de sel',
        duration: 120,
        keyTerms: [
          { term: 'enlever', translation: 'to remove', type: 'verb' },
          { term: 'excès', translation: 'excess', type: 'noun' },
        ],
      },
      {
        instruction: 'Pat very dry',
        instructionNative: 'Bien assécher',
        duration: 120,
        keyTerms: [
          { term: 'assécher', translation: 'to dry', type: 'verb' },
          { term: 'bien', translation: 'well', type: 'adverb' },
        ],
      },
      {
        instruction: 'Heat oil in deep pan',
        instructionNative: 'Chauffer l\'huile dans une poêle profonde',
        duration: 300,
        keyTerms: [
          { term: 'huile', translation: 'oil', type: 'noun' },
          { term: 'profonde', translation: 'deep', type: 'adjective' },
        ],
      },
      {
        instruction: 'Fry until golden and crispy',
        instructionNative: 'Frire jusqu\'à doré et croustillant',
        duration: 480,
        keyTerms: [],
      },
      {
        instruction: 'Drain on paper towels',
        instructionNative: 'Égoutter sur du papier absorbant',
        duration: 60,
        keyTerms: [
          { term: 'papier absorbant', translation: 'paper towels', type: 'noun' },
        ],
      },
      {
        instruction: 'Drizzle with maple syrup',
        instructionNative: 'Arroser de sirop d\'érable',
        duration: 30,
        keyTerms: [
          { term: 'arroser', translation: 'to drizzle', type: 'verb' },
        ],
      },
      {
        instruction: 'Serve hot',
        instructionNative: 'Servir chaud',
        duration: 30,
        keyTerms: [],
      },
    ],
    vocabulary: ['lard', 'frire', 'croustillant', 'sirop d\'érable', 'tranches', 'égoutter'],
    tags: ['snack', 'fried', 'sugar shack', 'pork'],
  },
  {
    id: 'ragout-boulettes',
    nameEnglish: 'Meatball Stew',
    nameNative: 'Ragoût de Boulettes',
    namePhonetic: 'ra-GOO duh boo-LET',
    description: 'Classic Quebec meatball stew with brown flour gravy',
    difficulty: 'intermediate',
    prepTime: 30,
    cookTime: 60,
    servings: 8,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
    culturalContext: 'A Christmas Eve réveillon essential. The toasted flour (farine grillée) gives the gravy its distinctive brown color and nutty flavor.',
    ingredients: [
      { nameEnglish: 'ground pork', nameNative: 'porc haché', amount: '750', unit: 'g' },
      { nameEnglish: 'onion', nameNative: 'oignon', amount: '2', unit: '' },
      { nameEnglish: 'toasted flour', nameNative: 'farine grillée', amount: '125', unit: 'g' },
      { nameEnglish: 'beef broth', nameNative: 'bouillon de bœuf', amount: '1', unit: 'L' },
      { nameEnglish: 'cloves', nameNative: 'clous de girofle', amount: '1/2', unit: 'tsp' },
      { nameEnglish: 'cinnamon', nameNative: 'cannelle', amount: '1/4', unit: 'tsp' },
      { nameEnglish: 'salt & pepper', nameNative: 'sel et poivre', amount: '', unit: 'to taste' },
    ],
    steps: [
      {
        instruction: 'Toast flour in dry pan until brown',
        instructionNative: 'Faire griller la farine dans une poêle sèche jusqu\'à brunissement',
        duration: 600,
        keyTerms: [
          { term: 'griller', translation: 'to toast/grill', type: 'verb' },
          { term: 'sèche', translation: 'dry', type: 'adjective' },
          { term: 'brunissement', translation: 'browning', type: 'noun' },
        ],
      },
      {
        instruction: 'Mix pork with diced onion and spices',
        instructionNative: 'Mélanger le porc avec l\'oignon coupé et les épices',
        duration: 180,
        keyTerms: [
          { term: 'porc', translation: 'pork', type: 'noun' },
        ],
      },
      {
        instruction: 'Form into small meatballs',
        instructionNative: 'Former en petites boulettes',
        duration: 600,
        keyTerms: [
          { term: 'former', translation: 'to form', type: 'verb' },
          { term: 'boulettes', translation: 'meatballs', type: 'noun' },
          { term: 'petites', translation: 'small', type: 'adjective' },
        ],
      },
      {
        instruction: 'Brown meatballs in batches',
        instructionNative: 'Faire dorer les boulettes par lots',
        duration: 900,
        keyTerms: [
          { term: 'faire dorer', translation: 'to brown', type: 'verb' },
          { term: 'par lots', translation: 'in batches', type: 'phrase' },
        ],
      },
      {
        instruction: 'Mix toasted flour with cold broth',
        instructionNative: 'Mélanger la farine grillée avec le bouillon froid',
        duration: 180,
        keyTerms: [
          { term: 'farine grillée', translation: 'toasted flour', type: 'noun' },
        ],
      },
      {
        instruction: 'Add to meatballs and bring to boil',
        instructionNative: 'Ajouter aux boulettes et porter à ébullition',
        duration: 300,
        keyTerms: [],
      },
      {
        instruction: 'Simmer 45 minutes until thick',
        instructionNative: 'Mijoter 45 minutes jusqu\'à épaississement',
        duration: 2700,
        keyTerms: [],
      },
      {
        instruction: 'Serve with mashed potatoes',
        instructionNative: 'Servir avec de la purée de patates',
        duration: 60,
        keyTerms: [
          { term: 'purée', translation: 'mashed', type: 'noun' },
        ],
      },
    ],
    vocabulary: ['ragoût', 'boulettes', 'farine grillée', 'porc', 'mijoter', 'bouillon'],
    tags: ['stew', 'meatballs', 'Christmas', 'comfort food'],
  },
];

export default quebecRecipes;
