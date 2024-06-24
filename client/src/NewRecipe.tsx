// The page for the new recipe page where users can add new recipes to the list

import React, { Component, MouseEvent, ChangeEvent} from 'react';
import { Recipe } from './recipe';

type NewRecipeProps = {
    onAddRecipeClick: (recipe: Recipe) => void;
    onBackClick: () => void;
}

// Accounts for the state of the new recipe page
type NewRecipeState = {
    name: string,
    foodType: 'Non-veg' | 'Veg' | null,
    prepTime: string,
    error: string
}


export class NewRecipe extends Component<NewRecipeProps, NewRecipeState> {
    constructor(props: NewRecipeProps) {
        super(props);
        this.state = {name: '', foodType: null, prepTime: '', error: ''};
    }

    // For rendering the page for the adding recipes
    render = (): JSX.Element => {
        return (
            <div>
                <h2>Add New Recipe</h2>
                <div>
                    <label>Recipe Name: </label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </div>
                <div>
                    <br/> <br/> 
                    <label>Food Type: </label>
                    <select value={this.state.foodType ?? ''} onChange={this.handleFoodTypeChange}>
                        <option value="">Select Food Type</option>
                        <option value="Veg">Veg</option>
                        <option value="Non-veg">Non-veg</option>
                    </select>
                </div>
                <div>
                    <br/> <br/> 
                    <label>Prep Time (minutes): </label>
                    <input type="text" value={this.state.prepTime} onChange={this.handlePrepTimeChange} />
                    <br/> <br/> 
                </div>
                {this.state.error && <p style={{ color: 'red' }}>{this.state.error}</p>}
                <button onClick={this.handleAddClick}>Add Recipe</button>
                <button onClick={this.props.onBackClick}>Back to Recipe List</button>
            </div>
        );
    }

    // Handles the new name of a recipe
    handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ name: event.target.value });
    };

    // Handles the new food type of the recipe
    handleFoodTypeChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        this.setState({ foodType: event.target.value as 'Non-veg' | 'Veg' });
    };

    // Handles the prep time of the new recipe
    handlePrepTimeChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ prepTime: event.target.value });
    };

    /**
     * Handles adding the recipe to the recipe list
     * Sets error message to be thrown if fields are empty or invalid
     * @returns void
     */
    handleAddClick = (): void => {
        const { name, foodType, prepTime } = this.state;

        const parsedPrepTime = parseInt(prepTime);

        if (name.trim() === '' || foodType === null || isNaN(parsedPrepTime) || parsedPrepTime <= 0) {
            this.setState({ error: 'All fields are required and prep time must be a valid number greater than 0' });
            return;
        }

        const newRecipe: Recipe = {
            name: name.trim(),
            foodType: foodType,
            prepTime: parsedPrepTime,
            ingredients: [],
            instructions: [],
        };


        this.props.onAddRecipeClick(newRecipe);
    };

}


