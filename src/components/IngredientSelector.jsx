import React, { useState } from 'react';
import { ingredients } from '../data/ingredients';
import { Search, Check, X } from 'lucide-react';
import './IngredientSelector.css';

const IngredientSelector = ({ selectedIngredients, onToggle }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", ...ingredients.map(g => g.category)];

    const filteredIngredients = ingredients.flatMap(group => {
        if (activeCategory !== "All" && group.category !== activeCategory) return [];
        return group.items.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(item => ({ item, category: group.category }));
    });

    return (
        <div className="ingredient-selector">
            <div className="search-bar">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search ingredients (e.g., Paneer, Chicken)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="categories">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="ingredients-grid">
                {filteredIngredients.map(({ item, category }) => {
                    const isSelected = selectedIngredients.includes(item);
                    return (
                        <button
                            key={item}
                            className={`ingredient-chip ${isSelected ? 'selected' : ''}`}
                            onClick={() => onToggle(item)}
                        >
                            {item}
                            {isSelected ? <Check size={16} /> : null}
                        </button>
                    );
                })}
            </div>

            {selectedIngredients.length > 0 && (
                <div className="selected-summary">
                    <h3>Your Pantry ({selectedIngredients.length})</h3>
                    <div className="selected-list">
                        {selectedIngredients.map(ing => (
                            <span key={ing} className="selected-tag">
                                {ing}
                                <X size={14} onClick={() => onToggle(ing)} className="remove-icon" />
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default IngredientSelector;
