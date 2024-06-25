// For the recipe details page where users can add instructions and ingredients
import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { Recipe } from './recipe';

type RecipeDetailsProps = {
    recipe: Recipe;
    onUpdateRecipe: (recipe: Recipe) => void;
    onBackClick: () => void;
};

// Keeps track of the state
type RecipeDetailsState = {
    ingredients: { name: string; quantity: string }[];
    instructions: string[];
    newIngredientName: string;
    newIngredientQuantity: string;
    newInstruction: string;
    error: string;
};

export class RecipeDetails extends Component<RecipeDetailsProps, RecipeDetailsState> {
    constructor(props: RecipeDetailsProps) {
        super(props);
        this.state = {
            ingredients: this.props.recipe.ingredients,
            instructions: this.props.recipe.instructions,
            newIngredientName: '',
            newIngredientQuantity: '',
            newInstruction: '',
            error: ''
        };
    }

    // Handles a name change for a current/previously saved ingredient
    handleIngredientNameChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const ingredients = [...this.state.ingredients];
        ingredients[index].name = event.target.value;
        this.setState({ ingredients });
    };

    // Handles a quantity change for a current/previously saved ingredient
    handleIngredientQuantityChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const ingredients = [...this.state.ingredients];
        ingredients[index].quantity = event.target.value;
        this.setState({ ingredients });
    };

    // Handles a name change for a new/currently unsaved ingredient
    handleNewIngredientNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ newIngredientName: event.target.value });
    };

    // Handles a quantity change for a new/currently unsaved ingredient
    handleNewIngredientQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ newIngredientQuantity: event.target.value });
    };

    
    handleNewInstructionChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ newInstruction: event.target.value });
    };

    // Handles adding a new ingredient to the recipe
    // Sets error to be thrown if invalid fields
    handleAddIngredient = (): void => {
        const { newIngredientName, newIngredientQuantity, ingredients } = this.state;
        if (newIngredientName.trim() === '' || newIngredientQuantity.trim() === '') {
            this.setState({ error: 'Ingredient name and quantity are required' });
            return;
        }

        const updatedIngredients = [...ingredients, { name: newIngredientName.trim(), quantity: newIngredientQuantity.trim() }];
        this.setState({ ingredients: updatedIngredients, newIngredientName: '', newIngredientQuantity: '', error: '' });
    };

    // Handles adding a new instruction to the recipe
    // Sets error to be thrown if invalid fields
    handleAddInstruction = (): void => {
        const { newInstruction, instructions } = this.state;
        if (newInstruction.trim() === '') {
            this.setState({ error: 'Instruction cannot be empty' });
            return;
        }

        const updatedInstructions = [...instructions, newInstruction.trim()];
        this.setState({ instructions: updatedInstructions, newInstruction: '', error: '' });
    };

    // Handles saving any new instructions/ingredients to the recipe
    handleSave = (): void => {
        const { ingredients, instructions } = this.state;

        const updatedRecipe: Recipe = {
            ...this.props.recipe,
            ingredients,
            instructions
        };

        this.props.onUpdateRecipe(updatedRecipe);
        this.props.onBackClick();
    };


    // Renders the recipe details page
    render(): JSX.Element {
        const { ingredients, instructions, newIngredientName, newIngredientQuantity, newInstruction, error } = this.state;

        return (
            <div>
                <h2>Recipe Details</h2>
                <div>
                    <h3>Ingredients</h3>
                    <h4>If you wish to change an ingredient or its quantity, simply click and edit in the table below. It will automatically save.</h4>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Ingredient Name"
                                value={ingredient.name}
                                onChange={(event) => this.handleIngredientNameChange(event, index)}
                            />
                            <input
                                type="text"
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChange={(event) => this.handleIngredientQuantityChange(event, index)}
                            />
                        </div>
                    ))}
                    <div>
                        <input
                            type="text"
                            placeholder="New Ingredient Name"
                            value={newIngredientName}
                            onChange={this.handleNewIngredientNameChange}
                        />
                        <input
                            type="text"
                            placeholder="New Ingredient Quantity"
                            value={newIngredientQuantity}
                            onChange={this.handleNewIngredientQuantityChange}
                        />
                        <button onClick={this.handleAddIngredient}>Add New Ingredient</button>
                    </div>
                </div>
                <div>
                    <h3>Instructions</h3>
                    {instructions.map((instruction, index) => (
                        <div key={index}>
                            {index + 1}. {instruction}
                        </div>
                    ))}
                    <div>
                        <input
                            type="text"
                            placeholder="New Instruction"
                            value={newInstruction}
                            onChange={this.handleNewInstructionChange}
                        />
                        <button onClick={this.handleAddInstruction}>Add New Instruction</button>
                    </div>
                </div>
                <br></br>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.props.onBackClick}>Back to Recipe List</button>
            </div>
        );
    }
}
