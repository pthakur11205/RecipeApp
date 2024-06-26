// A page that displays the recipe in a more organized manner
import React from 'react';
import { Recipe } from './recipe';

type ViewRecipeProps = {
  recipe: Recipe;
  onBackClick: () => void;
};


export const ViewRecipe: React.FC<ViewRecipeProps> = ({ recipe, onBackClick }) => {
  return (
    <div>
      <h2>{recipe.name}</h2>
      <p><strong>Food Type:</strong> {recipe.foodType}</p>
      <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, idx) => (
          <li key={idx}>
            {ingredient.name}: {ingredient.quantity}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol>
        {recipe.instructions.map((instruction, idx) => (
          <li key={idx}>{instruction}</li>
        ))}
      </ol>
      <button onClick={onBackClick}>Back to List</button>
    </div>
  );
};
