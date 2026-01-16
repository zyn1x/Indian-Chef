import React, { useState, useMemo } from 'react';
import IngredientSelector from './components/IngredientSelector';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import { findMatchingRecipes } from './utils/recommendationEngine';
import { recipes } from './data/recipes';
import { Utensils, Search } from 'lucide-react';
import './App.css';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeTab, setActiveTab] = useState('find'); // 'find' or 'all'
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleIngredient = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const matchingRecipes = useMemo(() => {
    return findMatchingRecipes(selectedIngredients);
  }, [selectedIngredients]);

  const allRecipes = useMemo(() => {
    if (!searchQuery.trim()) return recipes;
    const query = searchQuery.toLowerCase();
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="app">
      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <Utensils size={48} className="hero-icon" />
            <h1>Indian Chef AI</h1>
            <p>Tell us what you have, and we'll tell you what to cook.</p>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'find' ? 'active' : ''}`}
            onClick={() => setActiveTab('find')}
          >
            Find Recipes
          </button>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Dishes
          </button>
        </div>

        {activeTab === 'find' && (
          <section className="selection-section">
            <IngredientSelector
              selectedIngredients={selectedIngredients}
              onToggle={handleToggleIngredient}
            />
          </section>
        )}

        {activeTab === 'all' && (
          <section className="search-section">
            <div className="search-bar-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search for a dish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </section>
        )}

        <section className="results-section">
          <RecipeList
            recipes={activeTab === 'find' ? matchingRecipes : allRecipes}
            onSelectRecipe={setSelectedRecipe}
            title={activeTab === 'find' ? "Recommended Dishes" : "All Available Dishes"}
          />
        </section>
      </main>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      <footer className="footer">
        <div className="container">
          <p>Made by Dikshant Sharma.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
