import React from 'react';
import { Clock, ChefHat, AlertCircle } from 'lucide-react';
import './RecipeList.css';

const RecipeList = ({ recipes, onSelectRecipe, title = "Recommended Dishes" }) => {
    if (recipes.length === 0) {
        return (
            <div className="empty-state">
                <ChefHat size={48} className="empty-icon" />
                <h3>Start Cooking!</h3>
                <p>Select ingredients from your pantry to see what you can make.</p>
            </div>
        );
    }

    return (
        <div className="recipe-list">
            <h2>{title} ({recipes.length})</h2>
            <div className="recipe-grid">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card" onClick={() => onSelectRecipe(recipe)}>
                        <div className="recipe-image-container">
                            <img src={recipe.image} alt={recipe.name} loading="lazy" />
                            {recipe.matchPercentage !== undefined && (
                                <div className="match-badge" style={{
                                    backgroundColor: recipe.matchPercentage === 100 ? 'var(--secondary)' :
                                        recipe.matchPercentage >= 70 ? '#F59E0B' : '#EF4444'
                                }}>
                                    {Math.round(recipe.matchPercentage)}% Match
                                </div>
                            )}
                        </div>
                        <div className="recipe-content">
                            <div className="recipe-header">
                                <h3>{recipe.name}</h3>
                                <span className="recipe-time">
                                    <Clock size={14} /> {recipe.time}
                                </span>
                            </div>
                            <p className="recipe-desc">{recipe.description}</p>

                            <div className="recipe-footer">
                                <div className="missing-info">
                                    {recipe.missingIngredients && recipe.missingIngredients.length > 0 ? (
                                        <span className="missing-text">
                                            Missing: {recipe.missingIngredients.slice(0, 2).join(", ")}
                                            {recipe.missingIngredients.length > 2 && ` +${recipe.missingIngredients.length - 2} more`}
                                        </span>
                                    ) : recipe.matchPercentage !== undefined ? (
                                        <span className="all-set-text">You have everything!</span>
                                    ) : null}
                                </div>
                                <button className="view-btn">View Recipe</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
