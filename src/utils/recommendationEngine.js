import { recipes } from '../data/recipes';

/**
 * Normalizes an ingredient string for comparison (lowercase, trim).
 * @param {string} ingredient 
 * @returns {string}
 */
const normalize = (ingredient) => ingredient.toLowerCase().trim();

/**
 * Finds recipes that match the user's ingredients.
 * @param {string[]} userIngredients - List of ingredients the user has.
 * @returns {Array} - List of recipes with match details, sorted by match score.
 */
export const findMatchingRecipes = (userIngredients) => {
    if (!userIngredients || userIngredients.length === 0) return [];

    const normalizedUserIngredients = new Set(userIngredients.map(normalize));

    const scoredRecipes = recipes.map(recipe => {
        const recipeIngredients = recipe.ingredients;
        let matchCount = 0;
        const missingIngredients = [];

        recipeIngredients.forEach(ing => {
            // Check if the recipe ingredient is in the user's list
            // We do a partial match check to be more forgiving (e.g. "Chicken" matches "Chicken Breast")
            // But here our data is clean, so exact normalized match is best.
            // However, let's do a simple includes check to be safe.
            const normIng = normalize(ing);
            if (normalizedUserIngredients.has(normIng)) {
                matchCount++;
            } else {
                missingIngredients.push(ing);
            }
        });

        const matchPercentage = (matchCount / recipeIngredients.length) * 100;

        return {
            ...recipe,
            matchCount,
            missingIngredients,
            matchPercentage
        };
    });

    // Filter out recipes with 0 matches? Maybe keep them but sort them last.
    // Let's filter to show only recipes with at least 1 match or just sort.
    // The user wants "possible indian dishes that could be made".
    // Usually this means high match. Let's return all but sorted.

    return scoredRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);
};
