// The Recipe app that handles the actions between the different pages and the overall app state
import React, { Component, ChangeEvent, MouseEvent } from "react";
import { isRecord } from './record';
import { Recipe } from "./recipe";
import { RecipeList } from "./RecipeList";
import { NewRecipe } from "./NewRecipe";
import { RecipeDetails } from "./RecipeDetails";
import { parseRecipe } from "./recipe";


// Page type for switching between pages
type Page = "RecipeList" | "newRecipe" | {kind: "recipeDetails", index: number}

// Handles the app state
type RecipeAppState = {
  recipes: Recipe[],
  show: Page
}


/** Displays the UI of the Recipe application. */
export class RecipeApp extends Component<{}, RecipeAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {recipes: [], 
      show: "RecipeList"};
  }

  componentDidMount = (): void => {
    this.doRecipeListFetch();
  } 

  // Fetch call recipe list
  doRecipeListFetch = (): void => {
    fetch("/api/recipeInfos")
    .then((res) => this.doListResp(res))
    .catch(() => this.doListError("failed to connect to server"));
  }

  // Checks the status of response from the server when recipes are listed
  doListResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then((val) => this.doListJson(val))
        .catch(() => this.doListError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doListError)
        .catch(() => this.doListError("400 response is not text"));
    } else {
      this.doListError(`bad status code: ${res.status}`);
    }
  };

   // Updates list of recipes once recipe info is validated
   doListJson = (val: unknown): void => {
    if (!isRecord(val) || !Array.isArray(val.recipeInfos)) {
      console.error('Invalid JSON from /api/recipeInfos', val);
      return;
    }

    const recipeInfos: Recipe[] = [];
    for (const recipeInfo of val.recipeInfos) {
      if (parseRecipe(recipeInfo) !== undefined) {
        recipeInfos.push(recipeInfo);
      } else {
        console.error('Invalid name from /api/recipeInfos', recipeInfo);
        return;
      }
    }

    this.setState({recipes: recipeInfos, show: "RecipeList"})
  }

  // Sets the error message
  doListError = (msg: string): void => {
    console.error(`Error fetching /api/recipeInfos: ${msg}`);
  };

  render = (): JSX.Element => {
    const { show, recipes } = this.state;
    // Renders recipe list page
    if(this.state.show === "RecipeList") {
      return <div>
        <h4> To add a new recipe, click the "Add New Recipe" button</h4>
        <h4> To add instructions and ingredients to a recipe, please click "Edit Recipe" next to the recipe you would like to change.</h4>
        <RecipeList
        recipes={this.state.recipes}
        onOpenClick={this.doOpenClick}
        onAddClick={this.doAddClick}
        />
      </div>;
    // Renders new recipe page
    } else if(this.state.show === "newRecipe") {
      return<div>
        <NewRecipe 
          onAddRecipeClick={this.handleAddRecipe}
          onBackClick={this.handleBackToList}
        />
      </div>
    // Renders the recipe details page
    } else if(typeof show === "object" && show.kind === "recipeDetails"){
      return<div>
        <RecipeDetails
            recipe={recipes[show.index]}
            onUpdateRecipe={this.handleUpdateRecipe}
            onBackClick={this.handleBackToList}
        />

      </div>
    }

    // To satisfy the compiler
    return<div>
      Something went wrong!
    </div>
    
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

  // Handles adding the recipe to the recipe list
  handleAddRecipe = (newRecipe: Recipe): void => {
    // const updatedRecipes = [...this.state.recipes, newRecipe];
    // this.setState({ recipes: updatedRecipes, show: "RecipeList" });
    this.doRecipeListFetch();
  };

  // For opening the recipe details
  handleOpenRecipe = (index: number): void => {
      this.setState({ show: { kind: "recipeDetails", index: index } });
  };

  // Handles the back click
  handleBackToList = (): void => {
      this.doRecipeListFetch();
  };

  // Handles updating the recipe with new information
  handleUpdateRecipe = (updatedRecipe: Recipe): void => {
    // const updatedRecipes = this.state.recipes.map((recipe, index) =>
    //     index === (this.state.show as { kind: "recipeDetails"; index: number }).index ? updatedRecipe : recipe
    // );
    // this.setState({ recipes: updatedRecipes, show: "RecipeList" });

    this.doRecipeListFetch();
  };



}
