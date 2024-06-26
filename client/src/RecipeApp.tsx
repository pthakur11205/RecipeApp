// The Recipe app that handles the actions between the different pages and the overall app state
import React, { Component} from "react";
import { isRecord } from './record';
import { Recipe } from "./recipe";
import { RecipeList } from "./RecipeList";
import { NewRecipe } from "./NewRecipe";
import { RecipeDetails } from "./RecipeDetails";
import { parseRecipe } from "./recipe";
import { ViewRecipe } from "./ViewRecipe";


// Page type for switching between pages
type Page = "RecipeList" | "newRecipe" | {kind: "recipeDetails", index: number} | {kind: "viewRecipe", index: number}

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
        <RecipeList
        recipes={this.state.recipes}
        onOpenClick={this.doOpenClick}
        onAddClick={this.doAddClick}
        onViewClick={this.doViewClick}
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
    } else if(typeof show === "object" && show.kind === "viewRecipe"){
      return<div>
        <ViewRecipe
          recipe={recipes[show.index]}
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
  handleAddRecipe = (): void => {
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
  handleUpdateRecipe = (): void => {
    this.doRecipeListFetch();
  };

  // For viewing the recipe
  doViewClick = (index: number): void => {
    console.log('View Recipe clicked for index:', index);
    this.setState({ show: { kind: "viewRecipe", index: index } });
  };

  


}
