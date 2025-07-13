import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import aiModelsService from '../../services/aiModels';

const AISuggestions = () => {
  const [activeTab, setActiveTab] = useState('consumption');
  const [loading, setLoading] = useState(false);
  const [consumptionData, setConsumptionData] = useState([]);
  const [preferencesData, setPreferencesData] = useState([]);
  const [recommendationsData, setRecommendationsData] = useState([]);
  const [discoveryData, setDiscoveryData] = useState([]);
  const { user } = useAuth();

  // Load AI data from aiModels service (which contains comprehensive mock data)
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const familyId = user?.familyId || user?.id || 'demo-family';
        console.log('Loading AI data for family:', familyId);
        
        // The aiModels service will try API first, then return comprehensive mock data
        const [consumption, preferences, recommendations, discovery] = await Promise.all([
          aiModelsService.getConsumptionPredictions(familyId),
          aiModelsService.getFamilyPreferences(familyId),
          aiModelsService.getProductRecommendations(familyId),
          aiModelsService.getDiscoveryEngine(familyId)
        ]);

        console.log('AI data loaded successfully:', { consumption, preferences, recommendations, discovery });
        
        // Extract data with multiple fallback strategies
        const consumptionItems = consumption?.predictions || consumption || [];
        const preferencesItems = preferences?.preferences || preferences || [];
        const recommendationsItems = recommendations?.recommendations || recommendations || [];
        const discoveryItems = discovery?.discoveries || discovery || [];
        
        setConsumptionData(consumptionItems);
        setPreferencesData(preferencesItems);
        setRecommendationsData(recommendationsItems);
        setDiscoveryData(discoveryItems);
        
        console.log('Data set successfully. Counts:', {
          consumption: consumptionItems.length,
          preferences: preferencesItems.length, 
          recommendations: recommendationsItems.length,
          discovery: discoveryItems.length
        });
        
      } catch (error) {
        console.error('Failed to load AI data:', error);
        // Load fallback data even if API fails
        loadFallbackData();
      } finally {
        setLoading(false);
      }
    };

    const loadFallbackData = () => {
      // Fallback data in case API fails
      setConsumptionData([
        {
          productId: '1',
          productName: 'Whole Milk (2% Fat)',
          daysUntilEmpty: 1,
          urgencyScore: 0.98,
          confidenceLevel: 97,
          avgConsumptionRate: '1.4L/day',
          lastPurchaseDate: '2025-01-06',
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
          category: 'Bakery',
          familySize: 4,
          trend: 'stable',
          seasonalFactor: 1.0,
          stockLevel: 'low'
        }
      ]);
      
      setPreferencesData([
        {
          productCategory: 'Milk & Dairy',
          preferredBrand: 'Organic Valley',
          preferredVariant: 'Organic Whole Milk',
          confidence: 87,
          familyVotes: [
            { userId: '1', userName: 'Sarah (Mom)', preference: 'Organic Valley', weight: 0.35, role: 'primary_shopper' },
            { userId: '2', userName: 'John (Dad)', preference: 'Organic Valley', weight: 0.30, role: 'secondary_shopper' }
          ],
          consensus: 'organic_preferred',
          priceRange: '$4.50-$6.00',
          loyaltyScore: 0.82,
          healthScore: 0.95,
          additionalItems: [
            { name: 'Greek Yogurt (Vanilla)', brand: 'Chobani', preference: 'High protein, low sugar' },
            { name: 'Cheddar Cheese (Sharp)', brand: 'Tillamook', preference: 'Natural aging process' }
          ]
        },
        {
          productCategory: 'Breakfast Cereals',
          preferredBrand: 'Kashi',
          preferredVariant: 'Heart to Heart Whole Grain',
          confidence: 94,
          familyVotes: [
            { userId: '1', userName: 'Sarah (Mom)', preference: 'Kashi', weight: 0.35, role: 'primary_shopper' },
            { userId: '2', userName: 'John (Dad)', preference: 'Kashi', weight: 0.30, role: 'secondary_shopper' }
          ],
          consensus: 'health_conscious',
          priceRange: '$4.99-$5.99',
          loyaltyScore: 0.91,
          healthScore: 0.88
        }
      ]);

      setRecommendationsData([
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
        }
      ]);

      setDiscoveryData([
        {
          productId: '201',
          productName: 'Winter Squash & Ginger Soup',
          discoveryType: 'seasonal',
          seasonScore: 0.95,
          noveltyScore: 0.72,
          category: 'Seasonal Soups',
          categoryExploration: 'unexplored',
          adventurinessMatch: 'medium',
          reason: 'Perfect warming soup for winter season',
          diversityBoost: true,
          brand: 'Pacific Foods',
          ingredients: ['Butternut Squash', 'Ginger', 'Coconut Milk', 'Spices'],
          cuisineType: 'Comfort Food',
          priceRange: '$4.99-$6.49',
          nutritionalBenefits: ['Vitamin A', 'Fiber', 'Anti-inflammatory'],
          banditScore: 0.79,
          explorationWeight: 0.5
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
      ]);
    };
    
    loadData();
  }, [user]);

  const handleAddToList = async (suggestion, modelType) => {
    try {
      // In a real app, you'd get the current shopping list ID
      // For now, we'll just show a success message
      await aiModelsService.submitFeedback(modelType, suggestion, 'add_to_list', 'positive');
      alert(`${suggestion.productName || suggestion.product} added to your shopping list!`);
    } catch (error) {
      console.error('Failed to add to list:', error);
      alert('Failed to add item to list. Please try again.');
    }
  };

  const tabs = [
    { id: 'consumption', name: 'Consumption Prediction', icon: '🔄', model: 'LSTM' },
    { id: 'preferences', name: 'Family Preferences', icon: '👥', model: 'Clustering' },
    { id: 'recommendations', name: 'Recommendations', icon: '💡', model: 'Content Filter' },
    { id: 'discovery', name: 'Discovery & Variety', icon: '🎯', model: 'Multi-Armed Bandit' }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'from-red-50 to-red-100 border-red-200';
      case 'medium': return 'from-orange-50 to-orange-100 border-orange-200';
      case 'low': return 'from-yellow-50 to-yellow-100 border-yellow-200';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-200 text-red-800';
      case 'medium': return 'bg-orange-200 text-orange-800';
      case 'low': return 'bg-yellow-200 text-yellow-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const renderConsumptionSuggestions = () => {
    if (loading) {
      return <div className="text-center py-8">Loading consumption predictions...</div>;
    }

    return (
      <div className="space-y-4">
        {consumptionData.map((item, index) => {
          const urgency = item.urgencyScore > 0.8 ? 'high' : item.urgencyScore > 0.5 ? 'medium' : 'low';
          const getStockIcon = (level) => {
            switch(level) {
              case 'critical': return '🚨';
              case 'low': return '⚠️';
              case 'medium': return '📊';
              case 'good': return '✅';
              default: return '📦';
            }
          };
          
          return (
            <div key={item.productId || index} className={`bg-gradient-to-r ${getUrgencyColor(urgency)} border rounded-xl p-4 hover:shadow-md transition-all duration-200`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-white text-lg">{getStockIcon(item.stockLevel)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-semibold text-gray-800">{item.productName}</p>
                      <span className={`px-2 py-1 ${getUrgencyBadge(urgency)} text-xs rounded-full`}>
                        {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Urgency
                      </span>
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Predicted to run out in <strong>{item.daysUntilEmpty} days</strong> • LSTM Model ({item.confidenceLevel}% confidence)
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-2">
                      <span>📊 Consumption: {item.avgConsumptionRate}</span>
                      <span>📅 Last purchase: {item.lastPurchaseDate}</span>
                      <span>👥 Family size: {item.familySize} members</span>
                      <span>📈 Trend: {item.trend}</span>
                    </div>
                    {item.seasonalFactor !== 1.0 && (
                      <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        🌤️ Seasonal factor: {item.seasonalFactor > 1 ? 'Higher' : 'Lower'} consumption expected
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => handleAddToList(item, 'consumption')}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Add to List
                  </button>
                  <button className="btn-outline text-sm px-3 py-1">Details</button>
                </div>
              </div>
            </div>
          );
        })}
        {consumptionData.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">No consumption predictions available</div>
        )}
      </div>
    );
  };

  const renderPreferenceSuggestions = () => {
    if (loading) {
      return <div className="text-center py-8">Loading family preferences...</div>;
    }

    return (
      <div className="space-y-4">
        {preferencesData.map((item, index) => (
          <div key={item.productCategory || index} className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="text-white text-lg">👥</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="font-semibold text-gray-800">{item.productCategory}</p>
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
                      {item.confidence}% Agreement
                    </span>
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                      Health Score: {Math.round(item.healthScore * 100)}%
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Preferred: <span className="text-blue-600">{item.preferredBrand}</span> - {item.preferredVariant}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">{item.consensus} • Weighted preference analysis</p>
                  
                  {/* Family Votes Detail */}
                  <div className="bg-white rounded-lg p-3 mb-2">
                    <h5 className="text-xs font-semibold text-gray-700 mb-2">Family Voting Breakdown:</h5>
                    <div className="space-y-1">
                      {item.familyVotes?.map((vote, vIndex) => (
                        <div key={vIndex} className="flex justify-between items-center text-xs">
                          <span className="text-gray-600">{vote.userName}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500">{vote.preference}</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full" 
                                style={{width: `${vote.weight * 100}%`}}
                              ></div>
                            </div>
                            <span className="text-gray-400 text-xs">{Math.round(vote.weight * 100)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>💰 {item.priceRange}</span>
                    <span>⭐ Loyalty: {Math.round(item.loyaltyScore * 100)}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => handleAddToList(item, 'preferences')}
                  className="btn-primary text-sm px-3 py-1"
                >
                  Use Preference
                </button>
                <button className="btn-outline text-sm px-3 py-1">View All</button>
              </div>
            </div>
          </div>
        ))}
        {preferencesData.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">No family preferences available</div>
        )}
      </div>
    );
  };

  const renderRecommendationSuggestions = () => {
    if (loading) {
      return <div className="text-center py-8">Loading recommendations...</div>;
    }

    return (
      <div className="space-y-4">
        {recommendationsData.map((item, index) => (
          <div key={item.productId || index} className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="text-white text-lg">💡</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="font-semibold text-gray-800">{item.productName}</p>
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                      {item.similarity}% Match
                    </span>
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                      ⭐ {item.userRating}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    <span className="text-green-600">{item.brand}</span> • {item.recommendationType}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">{item.nutritionalMatch}</p>
                  
                  {/* Categories & Ingredients */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.categories?.map((cat, catIndex) => (
                        <span key={catIndex} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                    {item.ingredientMatch && (
                      <div className="flex flex-wrap gap-1">
                        {item.ingredientMatch.map((ingredient, ingIndex) => (
                          <span key={ingIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            ✓ {ingredient}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>💰 {item.priceRange}</span>
                    <span>🎯 Similarity: {Math.round(item.cosineSimilarity * 100)}%</span>
                    <span>� Health: {Math.round(item.healthScore * 100)}%</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => handleAddToList(item, 'recommendations')}
                  className="btn-primary text-sm px-3 py-1"
                >
                  Add to List
                </button>
                <button className="btn-outline text-sm px-3 py-1">Why This?</button>
              </div>
            </div>
          </div>
        ))}
        {recommendationsData.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">No recommendations available</div>
        )}
      </div>
    );
  };

  const renderDiscoverySuggestions = () => {
    if (loading) {
      return <div className="text-center py-8">Loading discovery recommendations...</div>;
    }

    return (
      <div className="space-y-4">
        {discoveryData.map((item, index) => {
          const getDiscoveryIcon = (type) => {
            switch(type) {
              case 'seasonal': return '🌿';
              case 'variety': return '🎨';
              case 'wellness': return '🧘';
              case 'cultural': return '🌍';
              case 'health_alternative': return '🥗';
              default: return '🎯';
            }
          };
          
          return (
            <div key={item.productId || index} className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-white text-lg">{getDiscoveryIcon(item.discoveryType)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="font-semibold text-gray-800">{item.productName}</p>
                      <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded-full">
                        {item.discoveryType === 'seasonal' ? 'Seasonal Discovery' : 
                         item.discoveryType === 'variety' ? 'Variety Boost' :
                         item.discoveryType === 'wellness' ? 'Wellness Trend' :
                         item.discoveryType === 'cultural' ? 'Cultural Exploration' :
                         'Health Alternative'}
                      </span>
                      {item.diversityBoost && (
                        <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full">
                          🚀 Diversity Boost
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      <span className="text-purple-600">{item.brand}</span> • {item.cuisineType}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">{item.reason} • Multi-armed bandit recommendation</p>
                    
                    {/* Ingredients */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Key Ingredients:</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.ingredients?.map((ingredient, ingIndex) => (
                          <span key={ingIndex} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Nutritional Benefits */}
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Health Benefits:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.nutritionalBenefits?.map((benefit, benIndex) => (
                          <span key={benIndex} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            + {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <span>🌟 Adventure: {item.adventurinessMatch}</span>
                      <span>📊 Category: {item.categoryExploration}</span>
                      <span>💰 {item.priceRange}</span>
                      <span>🎯 Bandit Score: {Math.round(item.banditScore * 100)}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => handleAddToList(item, 'discovery')}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Try It
                  </button>
                  <button className="btn-outline text-sm px-3 py-1">More Ideas</button>
                </div>
              </div>
            </div>
          );
        })}
        {discoveryData.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">No discovery recommendations available</div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'consumption': return renderConsumptionSuggestions();
      case 'preferences': return renderPreferenceSuggestions();
      case 'recommendations': return renderRecommendationSuggestions();
      case 'discovery': return renderDiscoverySuggestions();
      default: return renderConsumptionSuggestions();
    }
  };

  return (
    <div className="card-modern">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">🤖 AI-Powered Insights</h2>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Smart Predictions</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">ML Enabled</span>
        </div>
      </div>

      {/* Model Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}

      {/* AI Models Status */}
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">AI Models Status</h4>
            <p className="text-sm text-gray-600">All prediction models are active and learning from your behavior</p>
          </div>
          <div className="flex space-x-4 text-sm">
            {tabs.map((tab) => (
              <div key={tab.id} className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                <span className="text-gray-600">{tab.model}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;
