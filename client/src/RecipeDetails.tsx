// For the recipe details page where users can add instructions and ingredients
import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { Recipe } from './recipe';
import './RecipeDetails.css'

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
    handleSave = (_evt: MouseEvent<HTMLButtonElement>): void => {
        const { ingredients, instructions } = this.state;

        if (ingredients.some(ingredient => ingredient.name.trim() === '' || ingredient.quantity.trim() === '')) {
            this.setState({ error: 'All ingredients must have a name and quantity.' });
            return;
        }
        
        if (instructions.some(instruction => instruction.trim() === '')) {
            this.setState({ error: 'All instructions must be filled out.' });
            return;
        }

        const updatedRecipe: Recipe = {
            ...this.props.recipe,
            ingredients,
            instructions
        };

        // Save the updated recipe
        const body = { name: updatedRecipe.name, content: updatedRecipe };
        fetch("/api/save", {
            method: "POST", 
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        })
        .then(this.doSaveResp)
        .catch(() => this.doSaveError("Failed to connect to server"));
    };

    // Checks response from the server when data is saved
    doSaveResp = (resp: Response): void => {
        if (resp.status === 200) {
            resp.json().then(this.doSaveJson)
                .catch(() => this.doSaveError("200 response is not JSON"));
        } else if (resp.status === 400) {
            resp.text().then(this.doSaveError)
                .catch(() => this.doSaveError("400 response is not text"));
        } else {
            this.doSaveError(`Bad status code from /api/save: ${resp.status}`);
        }
    };

    // Calls the save function with the updated recipe information
    doSaveJson = (): void => {
        // Perform any necessary actions after successful save
        this.props.onUpdateRecipe({
            ...this.props.recipe,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions
        });
        this.props.onBackClick();
    };

    // Sets error message
    doSaveError = (msg: string): void => {
        this.setState({ error: msg });
    };


    // Renders the recipe details page
    render(): JSX.Element {
        const { ingredients, instructions, newIngredientName, newIngredientQuantity, newInstruction, error } = this.state;

        return (
            <div className="recipe-details-container">
                <h2 className="recipe-details-title">Recipe Details</h2>
                <div className="section-container">
                    <h3 className="section-title">Ingredients</h3>
                    <h4 className="section-subtitle">Type out your ingredient and its quantity, and hit the button below to add it!</h4>
                    <h4 className="section-subtitle">If you wish to change an ingredient or its quantity, simply click and edit the textbox.</h4>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Ingredient Name"
                                value={ingredient.name}
                                onChange={(event) => this.handleIngredientNameChange(event, index)}
                            />
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChange={(event) => this.handleIngredientQuantityChange(event, index)}
                            />
                        </div>
                    ))}
                    <div>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="New Ingredient Name"
                            value={newIngredientName}
                            onChange={this.handleNewIngredientNameChange}
                        />
                        <input
                            type="text"
                            className="input-field"
                            placeholder="New Ingredient Quantity"
                            value={newIngredientQuantity}
                            onChange={this.handleNewIngredientQuantityChange}
                        />
                        <button onClick={this.handleAddIngredient} className="form-button">Add New Ingredient</button>
                    </div>
                </div>
                <div className="section-container">
                    <h3 className="section-title">Instructions</h3>
                    <h4 className="section-subtitle">Type out your instructions in order, they will automatically be numbered.</h4>
                    {instructions.map((instruction, index) => (
                        <div key={index}>
                            {index + 1}. {instruction}
                        </div>
                    ))}
                    <div>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="New Instruction"
                            value={newInstruction}
                            onChange={this.handleNewInstructionChange}
                        />
                        <button onClick={this.handleAddInstruction} className="form-button">Add New Instruction</button>
                    </div>
                </div>
                <br />
                {error && <p className="error-message">{error}</p>}
                <button onClick={this.handleSave} className="form-button">Save</button>
                <button onClick={this.props.onBackClick} className="form-button">Back to Recipe List</button>
            </div>
        );
    }
}
