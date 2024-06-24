// The Recipe List page displays list of the current recipes, the default page

import React, { Component, MouseEvent} from 'react';
import { Recipe } from './recipe';

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
        const { recipes, onOpenClick, onAddClick } = this.props;


        return (
            <div>
                <h2>Recipe List</h2>
                <ul>
                    {recipes.map((recipe, index) => (
                        <li key={index}>
                            <div>
                                <strong>{recipe.name}: </strong>
                                <a href="#" onClick={(evt) => this.doOpenClick(evt, index)}>  Edit Recipe</a>
                                <p>Food Type: {recipe.foodType}</p>
                                <p>Prep Time: {recipe.prepTime} minutes</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={this.doAddRecipeClick}>Add New Recipe</button>
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