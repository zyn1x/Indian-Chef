import React from 'react';
import { X, Clock, ChefHat, Flame } from 'lucide-react';
import './RecipeModal.css';

const RecipeModal = ({ recipe, onClose }) => {
    if (!recipe) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <img src={recipe.image} alt={recipe.name} />
                    <div className="modal-title-overlay">
                        <h2>{recipe.name}</h2>
                        <div className="modal-meta">
                            <span><Clock size={16} /> {recipe.time}</span>
                            <span><Flame size={16} /> {recipe.difficulty}</span>
                            <span><ChefHat size={16} /> {recipe.tags.join(", ")}</span>
                        </div>
                        {recipe.youtubeUrl && (
                            <a
                                href={recipe.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="youtube-btn"
                            >
                                Watch Tutorial
                            </a>
                        )}
                    </div>
                </div>

                <div className="modal-body">
                    <div className="ingredients-section">
                        <h3>Ingredients</h3>
                        <ul>
                            {recipe.ingredients.map((ing, idx) => (
                                <li key={idx}>{ing}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="steps-section">
                        <h3>Instructions</h3>
                        <div className="steps-list">
                            {recipe.steps.map((step, idx) => (
                                <div key={idx} className="step-item">
                                    <span className="step-number">{idx + 1}</span>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
