import React, { Component, ChangeEvent, MouseEvent } from "react";
import { isRecord } from './record';
import { Recipe } from "./recipe";
import { RecipeList } from "./RecipeList";




type Page = "RecipeList" | "newRecipe" | {kind: "recipeDetails", index: number}
type RecipeAppState = {
  recipes: Recipe[],
  show: Page
}


/** Displays the UI of the Wedding rsvp application. */
export class WeddingApp extends Component<{}, RecipeAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {recipes: [{
      name: "Spaghetti Carbonara",
      foodType: "Non-veg",
      ingredients: [{ name: "Spaghetti", quantity: "200g" }, { name: "Bacon", quantity: "100g" }],
      instructions: ["Boil spaghetti", "Cook bacon until crispy", "Mix spaghetti and bacon with egg and cheese mixture"],
      prepTime: 30
      },
        {
      name: "Caprese Salad",
      foodType: "Veg",
      ingredients: [{ name: "Tomatoes", quantity: "2" }, { name: "Mozzarella", quantity: "150g" }, { name: "Basil", quantity: "a handful" }],
      instructions: ["Slice tomatoes and mozzarella", "Arrange on a plate with basil leaves", "Drizzle with olive oil and balsamic vinegar"],
      prepTime: 15
    }], 
      show: "RecipeList"};
  }
  
  render = (): JSX.Element => {
    if(this.state.show === "RecipeList") {
      return <div>
        <RecipeList
        recipes={this.state.recipes}
        onOpenClick={this.doOpenClick}
        onAddClick={this.doAddClick}
        />
      </div>;
    }
    return <div>
      
    <p>poopoo</p>
    </div>;
    
  };

  // Handle the add recipe button click
  doAddClick = (): void => {
    console.log('Add Recipe button clicked');
    this.setState({show: 'newRecipe'});
  };

  // Handle the click on recipe name
  doOpenClick = (index: number): void => {
    console.log('Open Recipe clicked for index:', index);
    this.setState({show: {kind: "recipeDetails", index: index}}
    )
  };



}
