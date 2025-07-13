import { api } from './api';

// AI Models Service
export const aiModelsService = {
  // Model 1: Consumption Prediction (LSTM)
  getConsumptionPredictions: async (familyId) => {
    try {
      const response = await api.get(`/ai/consumption-predictions/${familyId}`);
      return response.data;
    } catch (error) {
      // Return mock data for development
      console.log('Using mock consumption predictions data:', error.message);
      // Always return mock data for demo
      return {
        predictions: [
          {
            productId: '1',
            productName: 'Whole Milk (2% Fat)',
            daysUntilEmpty: 1,
            urgencyScore: 0.98,
            confidenceLevel: 97,
            avgConsumptionRate: '1.4L/day',
            lastPurchaseDate: '2025-01-06',
            recommendation: 'immediate_purchase',
            category: 'Dairy',
            familySize: 4,
            trend: 'increasing',
            seasonalFactor: 1.2,
            stockLevel: 'critical'
          },
          {
            productId: '2',
            productName: 'Whole Wheat Bread',
            daysUntilEmpty: 3,
            urgencyScore: 0.82,
            confidenceLevel: 91,
            avgConsumptionRate: '0.6 loaves/day',
            lastPurchaseDate: '2025-01-09',
            recommendation: 'add_to_list',
            category: 'Bakery',
            familySize: 4,
            trend: 'stable',
            seasonalFactor: 1.0,
            stockLevel: 'low'
          },
          {
            productId: '3',
            productName: 'Free Range Eggs (Large)',
            daysUntilEmpty: 5,
            urgencyScore: 0.65,
            confidenceLevel: 84,
            avgConsumptionRate: '3.2 eggs/day',
            lastPurchaseDate: '2025-01-11',
            recommendation: 'add_to_list',
            category: 'Dairy & Eggs',
            familySize: 4,
            trend: 'stable',
            seasonalFactor: 0.9,
            stockLevel: 'medium'
          },
          {
            productId: '4',
            productName: 'Greek Yogurt (Vanilla)',
            daysUntilEmpty: 8,
            urgencyScore: 0.42,
            confidenceLevel: 78,
            avgConsumptionRate: '2.1 cups/week',
            lastPurchaseDate: '2025-01-10',
            recommendation: 'monitor',
            category: 'Dairy',
            familySize: 4,
            trend: 'decreasing',
            seasonalFactor: 1.1,
            stockLevel: 'adequate'
          },
          {
            productId: '5',
            productName: 'Bananas (Organic)',
            daysUntilEmpty: 6,
            urgencyScore: 0.58,
            confidenceLevel: 82,
            avgConsumptionRate: '1.8 lbs/week',
            lastPurchaseDate: '2025-01-08',
            recommendation: 'add_to_list',
            category: 'Fresh Produce',
            familySize: 4,
            trend: 'stable',
            seasonalFactor: 0.8,
            stockLevel: 'medium'
          },
          {
            productId: '6',
            productName: 'Ground Coffee (Dark Roast)',
            daysUntilEmpty: 12,
            urgencyScore: 0.25,
            confidenceLevel: 89,
            avgConsumptionRate: '250g/week',
            lastPurchaseDate: '2025-01-05',
            recommendation: 'monitor',
            category: 'Beverages',
            familySize: 4,
            trend: 'stable',
            seasonalFactor: 1.3,
            stockLevel: 'good'
          },
          {
            productId: '7',
            productName: 'Chicken Breast (Boneless)',
            daysUntilEmpty: 2,
            urgencyScore: 0.91,
            confidenceLevel: 94,
            avgConsumptionRate: '1.2 lbs/day',
            lastPurchaseDate: '2025-01-10',
            recommendation: 'immediate_purchase',
            category: 'Meat & Poultry',
            familySize: 4,
            trend: 'increasing',
            seasonalFactor: 1.1,
            stockLevel: 'critical'
          },
          {
            productId: '8',
            productName: 'White Rice (Basmati)',
            daysUntilEmpty: 4,
            urgencyScore: 0.73,
            confidenceLevel: 87,
            avgConsumptionRate: '0.8 cups/day',
            lastPurchaseDate: '2025-01-07',
            recommendation: 'add_to_list',
            category: 'Pantry Staples',
            familySize: 4,
            trend: 'stable',
            seasonalFactor: 0.9,
            stockLevel: 'low'
          }
        ]
      };
    }
  },

  // Model 2: Family Preference Aggregation
  getFamilyPreferences: async (familyId) => {
    try {
      const response = await api.get(`/ai/family-preferences/${familyId}`);
      return response.data;
    } catch (error) {
      console.log('Using mock family preferences data:', error.message);
      return {
        preferences: [
          {
            productCategory: 'Milk & Dairy',
            preferredBrand: 'Organic Valley',
            preferredVariant: 'Organic Whole Milk',
            confidence: 87,
            familyVotes: [
              { userId: '1', userName: 'Sarah (Mom)', preference: 'Organic Valley', weight: 0.35, role: 'primary_shopper' },
              { userId: '2', userName: 'John (Dad)', preference: 'Organic Valley', weight: 0.30, role: 'secondary_shopper' },
              { userId: '3', userName: 'Emma (Teen)', preference: 'Horizon Organic', weight: 0.20, role: 'family_member' },
              { userId: '4', userName: 'Max (Child)', preference: 'Any Organic', weight: 0.15, role: 'family_member' }
            ],
            consensus: 'organic_preferred',
            priceRange: '$4.50-$6.00',
            loyaltyScore: 0.82,
            healthScore: 0.95,
            additionalItems: [
              { name: 'Greek Yogurt (Vanilla)', brand: 'Chobani', preference: 'High protein, low sugar' },
              { name: 'Cheddar Cheese (Sharp)', brand: 'Tillamook', preference: 'Natural aging process' },
              { name: 'Heavy Cream', brand: 'Organic Valley', preference: 'For coffee and cooking' }
            ]
          },
          {
            productCategory: 'Breakfast Cereals',
            preferredBrand: 'Kashi',
            preferredVariant: 'Heart to Heart Whole Grain',
            confidence: 94,
            familyVotes: [
              { userId: '1', userName: 'Sarah (Mom)', preference: 'Kashi', weight: 0.35, role: 'primary_shopper' },
              { userId: '2', userName: 'John (Dad)', preference: 'Kashi', weight: 0.30, role: 'secondary_shopper' },
              { userId: '3', userName: 'Emma (Teen)', preference: 'Cheerios', weight: 0.20, role: 'family_member' },
              { userId: '4', userName: 'Max (Child)', preference: 'Kashi', weight: 0.15, role: 'family_member' }
            ],
            consensus: 'health_conscious',
            priceRange: '$4.99-$5.99',
            loyaltyScore: 0.91,
            healthScore: 0.88
          },
          {
            productCategory: 'Fresh Produce',
            preferredBrand: 'Local Organic Farms',
            preferredVariant: 'Organic Seasonal Vegetables',
            confidence: 76,
            familyVotes: [
              { userId: '1', userName: 'Sarah (Mom)', preference: 'Organic', weight: 0.35, role: 'primary_shopper' },
              { userId: '2', userName: 'John (Dad)', preference: 'Local/Organic', weight: 0.30, role: 'secondary_shopper' },
              { userId: '3', userName: 'Emma (Teen)', preference: 'Conventional', weight: 0.20, role: 'family_member' },
              { userId: '4', userName: 'Max (Child)', preference: 'No preference', weight: 0.15, role: 'family_member' }
            ],
            consensus: 'sustainability_focused',
            priceRange: 'Variable',
            loyaltyScore: 0.69,
            healthScore: 0.92
          },
          {
            productCategory: 'Snacks',
            preferredBrand: 'Annie\'s',
            preferredVariant: 'Organic Crackers & Fruit Snacks',
            confidence: 83,
            familyVotes: [
              { userId: '1', userName: 'Sarah (Mom)', preference: 'Annie\'s', weight: 0.35, role: 'primary_shopper' },
              { userId: '2', userName: 'John (Dad)', preference: 'Healthy options', weight: 0.30, role: 'secondary_shopper' },
              { userId: '3', userName: 'Emma (Teen)', preference: 'Tasty brands', weight: 0.20, role: 'family_member' },
              { userId: '4', userName: 'Max (Child)', preference: 'Annie\'s', weight: 0.15, role: 'family_member' }
            ],
            consensus: 'natural_ingredients',
            priceRange: '$3.50-$5.00',
            loyaltyScore: 0.78,
            healthScore: 0.85
          }
        ]
      };
    }
  },

  // Model 3: Product Recommendation Engine
  getProductRecommendations: async (familyId) => {
    try {
      const response = await api.get(`/ai/product-recommendations/${familyId}`);
      return response.data;
    } catch (error) {
      console.log('Using mock product recommendations data:', error.message);
      return {
        recommendations: [
          {
            productId: '101',
            productName: 'Greek Yogurt (Honey Vanilla)',
            similarity: 94,
            reason: 'Matches your dairy and healthy protein preferences',
            categories: ['Dairy', 'High Protein', 'Organic', 'Low Sugar'],
            priceRange: '$4.99-$6.49',
            nutritionalMatch: 'High protein content similar to your usual Greek yogurt choices',
            recommendationType: 'content_based',
            brand: 'Fage',
            cosineSimilarity: 0.94,
            userRating: 4.6,
            healthScore: 0.89,
            ingredientMatch: ['Organic', 'Probiotics', 'No Artificial Flavors']
          },
          {
            productId: '102',
            productName: 'Almond Butter (Crunchy)',
            similarity: 89,
            reason: 'Alternative protein source matching your nut preferences',
            categories: ['Spreads', 'Nuts', 'Protein', 'Natural'],
            priceRange: '$7.99-$9.49',
            nutritionalMatch: 'Similar healthy fat profile to your peanut butter purchases',
            recommendationType: 'collaborative',
            brand: 'Justin\'s',
            cosineSimilarity: 0.89,
            userRating: 4.4,
            healthScore: 0.92,
            ingredientMatch: ['No Sugar Added', 'Organic', 'Single Ingredient']
          },
          {
            productId: '103',
            productName: 'Quinoa Pasta (Gluten-Free)',
            similarity: 86,
            reason: 'Healthier alternative to regular pasta in your cart',
            categories: ['Pasta', 'Gluten-Free', 'High Protein', 'Ancient Grains'],
            priceRange: '$3.99-$5.49',
            nutritionalMatch: 'Higher protein and fiber than regular pasta',
            recommendationType: 'content_based',
            brand: 'Ancient Harvest',
            cosineSimilarity: 0.86,
            userRating: 4.2,
            healthScore: 0.87,
            ingredientMatch: ['Whole Grain', 'High Fiber', 'Complete Protein']
          },
          {
            productId: '104',
            productName: 'Coconut Water (Unsweetened)',
            similarity: 82,
            reason: 'Natural hydration matching your health-conscious beverage choices',
            categories: ['Beverages', 'Natural', 'Electrolytes', 'No Added Sugar'],
            priceRange: '$2.99-$4.49',
            nutritionalMatch: 'Natural electrolytes without artificial additives',
            recommendationType: 'collaborative',
            brand: 'Vita Coco',
            cosineSimilarity: 0.82,
            userRating: 4.3,
            healthScore: 0.85,
            ingredientMatch: ['No Sugar Added', 'Natural Electrolytes', 'Pure Coconut Water']
          },
          {
            productId: '105',
            productName: 'Organic Baby Spinach',
            similarity: 91,
            reason: 'Fresh leafy greens to complement your healthy eating habits',
            categories: ['Fresh Produce', 'Organic', 'Leafy Greens', 'High Iron'],
            priceRange: '$3.49-$4.99',
            nutritionalMatch: 'High in vitamins and minerals, perfect for salads',
            recommendationType: 'content_based',
            brand: 'Earthbound Farm',
            cosineSimilarity: 0.91,
            userRating: 4.5,
            healthScore: 0.96,
            ingredientMatch: ['Organic', 'Fresh', 'Nutrient Dense']
          },
          {
            productId: '106',
            productName: 'Overnight Oats Mix (Variety Pack)',
            similarity: 88,
            reason: 'Convenient breakfast option matching your quick meal preferences',
            categories: ['Breakfast', 'Quick Prep', 'Whole Grains', 'High Fiber'],
            priceRange: '$8.99-$12.49',
            nutritionalMatch: 'High fiber and protein for sustained energy',
            recommendationType: 'hybrid',
            brand: 'Quaker',
            cosineSimilarity: 0.88,
            userRating: 4.4,
            healthScore: 0.83,
            ingredientMatch: ['Whole Grains', 'Added Protein', 'Real Fruit']
          }
        ]
      };
    }
  },

  // Model 4: Discovery & Variety Engine
  getDiscoveryEngine: async (familyId) => {
    try {
      const response = await api.get(`/ai/discovery-recommendations/${familyId}`);
      return response.data;
    } catch (error) {
      console.log('Using mock discovery recommendations data:', error.message);
      return {
        discoveries: [
          {
            productId: '201',
            productName: 'Winter Squash & Ginger Soup',
            discoveryType: 'seasonal',
            seasonScore: 0.95,
            noveltyScore: 0.83,
            category: 'Soups & Broths',
            categoryExploration: 'unexplored',
            adventurinessMatch: 'high',
            reason: 'Perfect warming soup for winter season',
            diversityBoost: true,
            brand: 'Amy\'s Organic',
            ingredients: ['Butternut Squash', 'Ginger', 'Coconut Milk'],
            cuisineType: 'Comfort Food',
            priceRange: '$3.49-$4.99',
            nutritionalBenefits: ['Vitamin A', 'Anti-inflammatory', 'Fiber'],
            banditScore: 0.87,
            explorationWeight: 0.6
          },
          {
            productId: '202',
            productName: 'Quinoa & Black Bean Salad Kit',
            discoveryType: 'variety',
            seasonScore: 0.7,
            noveltyScore: 0.91,
            category: 'Prepared Salads',
            categoryExploration: 'low_coverage',
            adventurinessMatch: 'medium',
            reason: 'Expand protein-rich lunch options variety',
            diversityBoost: true,
            brand: 'Earthbound Farm',
            ingredients: ['Quinoa', 'Black Beans', 'Peppers', 'Lime Dressing'],
            cuisineType: 'Southwestern',
            priceRange: '$4.99-$6.49',
            nutritionalBenefits: ['Complete Protein', 'Fiber', 'Iron'],
            banditScore: 0.79,
            explorationWeight: 0.5
          },
          {
            productId: '203',
            productName: 'Turmeric Golden Milk Latte Mix',
            discoveryType: 'wellness',
            seasonScore: 0.85,
            noveltyScore: 0.88,
            category: 'Specialty Beverages',
            categoryExploration: 'unexplored',
            adventurinessMatch: 'high',
            reason: 'Trendy wellness beverage for winter immunity',
            diversityBoost: true,
            brand: 'Four Sigmatic',
            ingredients: ['Turmeric', 'Ginger', 'Cinnamon', 'Coconut Milk'],
            cuisineType: 'Wellness',
            priceRange: '$12.99-$15.99',
            nutritionalBenefits: ['Anti-inflammatory', 'Antioxidants', 'Immune Support'],
            banditScore: 0.82,
            explorationWeight: 0.7
          },
          {
            productId: '204',
            productName: 'Korean Kimchi (Traditional)',
            discoveryType: 'cultural',
            seasonScore: 0.6,
            noveltyScore: 0.94,
            category: 'International Foods',
            categoryExploration: 'unexplored',
            adventurinessMatch: 'very_high',
            reason: 'Introduce probiotic-rich fermented foods',
            diversityBoost: true,
            brand: 'Mother in Law\'s',
            ingredients: ['Napa Cabbage', 'Korean Chili', 'Garlic', 'Ginger'],
            cuisineType: 'Korean',
            priceRange: '$5.99-$7.99',
            nutritionalBenefits: ['Probiotics', 'Vitamin C', 'Low Calorie'],
            banditScore: 0.85,
            explorationWeight: 0.8
          },
          {
            productId: '205',
            productName: 'Cauliflower Pizza Crust',
            discoveryType: 'health_alternative',
            seasonScore: 0.5,
            noveltyScore: 0.76,
            category: 'Alternative Foods',
            categoryExploration: 'low_coverage',
            adventurinessMatch: 'medium',
            reason: 'Low-carb alternative to regular pizza',
            diversityBoost: false,
            brand: 'Caulipower',
            ingredients: ['Cauliflower', 'Mozzarella', 'Egg', 'Rice Flour'],
            cuisineType: 'Health Alternative',
            priceRange: '$6.99-$8.99',
            nutritionalBenefits: ['Lower Carbs', 'Vegetables', 'Gluten-Free Option'],
            banditScore: 0.73,
            explorationWeight: 0.4
          },
          {
            productId: '206',
            productName: 'Dragon Fruit (Fresh)',
            discoveryType: 'exotic_fruit',
            seasonScore: 0.7,
            noveltyScore: 0.92,
            category: 'Exotic Fruits',
            categoryExploration: 'unexplored',
            adventurinessMatch: 'high',
            reason: 'Introduce exotic superfruit with unique flavor',
            diversityBoost: true,
            brand: 'Melissa\'s Produce',
            ingredients: ['Fresh Dragon Fruit'],
            cuisineType: 'Tropical',
            priceRange: '$4.99-$6.99',
            nutritionalBenefits: ['Vitamin C', 'Antioxidants', 'Low Calorie', 'Fiber'],
            banditScore: 0.81,
            explorationWeight: 0.6
          },
          {
            productId: '207',
            productName: 'Jackfruit Tacos (Plant-Based)',
            discoveryType: 'meat_alternative',
            seasonScore: 0.8,
            noveltyScore: 0.89,
            category: 'Plant-Based Meat',
            categoryExploration: 'low_coverage',
            adventurinessMatch: 'very_high',
            reason: 'Innovative plant-based protein with unique texture',
            diversityBoost: true,
            brand: 'Upton\'s Naturals',
            ingredients: ['Young Jackfruit', 'Spices', 'Tomato', 'Bell Peppers'],
            cuisineType: 'Mexican/Plant-Based',
            priceRange: '$3.99-$5.49',
            nutritionalBenefits: ['Plant Protein', 'Fiber', 'Low Fat', 'Sustainable'],
            banditScore: 0.86,
            explorationWeight: 0.75
          },
          {
            productId: '208',
            productName: 'Matcha Green Tea Ice Cream',
            discoveryType: 'dessert_innovation',
            seasonScore: 0.6,
            noveltyScore: 0.83,
            category: 'Premium Desserts',
            categoryExploration: 'medium',
            adventurinessMatch: 'medium',
            reason: 'Sophisticated dessert with health benefits',
            diversityBoost: true,
            brand: 'Häagen-Dazs',
            ingredients: ['Matcha Powder', 'Green Tea', 'Cream', 'Sugar'],
            cuisineType: 'Japanese-Inspired',
            priceRange: '$5.99-$7.49',
            nutritionalBenefits: ['Antioxidants', 'L-Theanine', 'Natural Flavors'],
            banditScore: 0.77,
            explorationWeight: 0.5
          }
        ]
      };
    }
  },

  // Get AI models status
  getModelsStatus: async () => {
    try {
      const response = await api.get('/ai/models-status');
      return response.data;
    } catch (error) {
      console.log('Using mock models status data:', error.message);
      return {
        models: [
          { name: 'LSTM Consumption Predictor', status: 'active', accuracy: 0.89, lastTrained: '2025-01-10' },
          { name: 'Family Preference Aggregator', status: 'active', accuracy: 0.92, lastTrained: '2025-01-12' },
          { name: 'Content-Based Recommender', status: 'active', accuracy: 0.85, lastTrained: '2025-01-11' },
          { name: 'Multi-Armed Bandit Discovery', status: 'active', accuracy: 0.78, lastTrained: '2025-01-12' }
        ]
      };
    }
  },

  // Submit feedback for model improvement
  submitFeedback: async (modelType, suggestion, userAction, feedback) => {
    try {
      const response = await api.post('/ai/feedback', {
        modelType,
        suggestion,
        userAction,
        feedback,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Failed to submit AI feedback:', error);
      return { success: false };
    }
  },

  // Add suggested item to shopping list
  addSuggestionToList: async (listId, suggestion) => {
    try {
      const response = await api.post(`/shopping-lists/${listId}/items`, {
        productId: suggestion.productId || suggestion.id,
        productName: suggestion.productName || suggestion.product,
        quantity: suggestion.recommendedQuantity || 1,
        source: 'ai_suggestion',
        modelType: suggestion.modelType || 'unknown'
      });
      return response.data;
    } catch (error) {
      console.error('Failed to add suggestion to list:', error);
      throw error;
    }
  }
};

export default aiModelsService;
