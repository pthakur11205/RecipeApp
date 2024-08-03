import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { MapInterface, makeMutableMap } from "./map";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

const recipes: MapInterface = makeMutableMap();


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/** 
 * Saves the name and contents of the request to the files
 * @param req request to respond to
 * @param res object to send response with
 */
export const save = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
 

  if(name === undefined || typeof name !== 'string') {
    res.status(400).send('required argument "name" was missing');
    return;
  }
  
  const content = req.body.content;
  if(content === undefined) {
    res.status(400).send('required argument "content" was missing');
    return;
  } 

    res.send({saved: recipes.setVal(name, content)});
  
}

/** 
 * Deletes a recipe by name
 * @param req request to respond to
 * @param res object to send response with
 */
export const deleteRecipe = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined || typeof name !== 'string') {
    res.status(400).send('required argument "name" was missing');
    return;
  }
  
  const deleted = recipes.deleteVal(name);
  if (deleted) {
    res.send({deleted: true});
  } else {
    res.status(404).send('recipe not found');
  }
};


/** 
 * Lists the info of all recipes currently saved
 * @param req request to respond to
 * @param res object to send response with
 */
export const recipeInfos = (_req: SafeRequest, res: SafeResponse): void => { 
  res.send({ recipeInfos: recipes.getValues()});
}

/**Reset for testing purposes */
export const resetForTesting = (): void => {
  recipes.clearMap();
}