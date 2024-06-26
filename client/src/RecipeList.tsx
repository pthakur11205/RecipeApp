// The Recipe List page displays list of the current recipes, the default page

import React, { Component, MouseEvent} from 'react';
import { Recipe } from './recipe';
import './RecipeList.css'

type RecipeListProps = {
    readonly recipes: Recipe[]; 
    onOpenClick: (index: number) => void;
    onAddClick: () => void;
}


export class RecipeList extends Component<RecipeListProps> {

    constructor(props: RecipeListProps) {
        super(props);

    }

    // Renders the recipe list with the food type and prep time listed along with it, with an "Edit Recipes" link to add details
    render = (): JSX.Element => {
        const { recipes } = this.props;


        return (
            <div className="recipe-list-container">
                <h2 className="title">Recipe List</h2>
                <h4 className="title"> To add instructions and ingredients to a recipe, please click "Edit Recipe" next to the recipe you would like to change.</h4>
                <ul className="recipe-list">
                    {recipes.map((recipe, index) => (
                        <li key={index} className="recipe-item">
                            <div className="recipe-content">
                                <strong>{recipe.name} </strong>
                                <a href="#" onClick={(evt) => this.doOpenClick(evt, index)} className="edit-link"> Edit Recipe</a>
                                <p>Food Type: {recipe.foodType}</p>
                                <p>Prep Time: {recipe.prepTime} minutes</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={this.doAddRecipeClick} className="add-recipe-button">Add New Recipe</button>
            </div>
        );


    }

    // Button click for add to navigate to new recipe page
    doAddRecipeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        this.props.onAddClick();
    };

    // Handles click on "Edit Recipe"
    doOpenClick = (_evt: MouseEvent<HTMLAnchorElement>, index: number): void => {
        this.props.onOpenClick(index);
    }


}