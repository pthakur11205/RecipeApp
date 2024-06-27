// A page that displays the recipe in a more organized manner
import React from 'react';
import { Recipe } from './recipe';
import './ViewRecipe.css'

type ViewRecipeProps = {
  recipe: Recipe;
  onBackClick: () => void;
};


export const ViewRecipe: React.FC<ViewRecipeProps> = ({ recipe, onBackClick }) => {
    return (
      <div className="view-recipe-container">
        <h2>{recipe.name}</h2>
        <p><strong>Food Type:</strong> {recipe.foodType}</p>
        <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
        <h4>Ingredients:</h4>
        <ul>
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>
              {ingredient.name}: {ingredient.quantity}
            </li>
          ))}
        </ul>
        <h4>Instructions:</h4>
        <ol>
          {recipe.instructions.map((instruction, idx) => (
            <li key={idx}>{instruction}</li>
          ))}
        </ol>
        <button onClick={onBackClick}>Back to List</button>
      </div>
    );
  };
