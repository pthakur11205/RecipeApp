import { isRecord } from "./record";


// Type recipe and all of its properties
export type Recipe = {
    readonly name: string;
    readonly foodType: 'Non-veg' | 'Veg';
    readonly ingredients: { name: string; quantity: string }[];
    readonly instructions: string[];
    readonly prepTime: number; // in minutes
}


/**
 * Parses unknown data into a Recipe object. Will log an error and return undefined
 * if it is not a valid Recipe.
 * @param val unknown data to parse into a Recipe object
 * @return Recipe if val is a valid Recipe and undefined otherwise
 */
export const parseRecipe = (val: unknown): Recipe | undefined => {
    if (!isRecord(val)) {
        console.error("Invalid recipe format:", val);
        return undefined;
    }

    // Validate required fields
    if (typeof val.name !== "string") {
        console.error("Recipe missing 'name' field:", val);
        return undefined;
    }

    if (val.foodType !== "Non-veg" && val.foodType !== "Veg") {
        console.error("Invalid 'foodType' for recipe:", val);
        return undefined;
    }

    if (!Array.isArray(val.ingredients) || val.ingredients.some(ingredient => {
        return typeof ingredient.name !== "string" || typeof ingredient.quantity !== "string";
    })) {
        console.error("Invalid 'ingredients' format for recipe:", val);
        return undefined;
    }

    if (!Array.isArray(val.instructions) || val.instructions.some(instruction => typeof instruction !== "string")) {
        console.error("Invalid 'instructions' format for recipe:", val);
        return undefined;
    }

    if (typeof val.prepTime !== "number" || val.prepTime < 0) {
        console.error("Invalid 'prepTime' for recipe:", val);
        return undefined;
    }

    // If all validations pass, return the parsed recipe object
    return {
        name: val.name,
        foodType: val.foodType,
        ingredients: val.ingredients,
        instructions: val.instructions,
        prepTime: val.prepTime,
    };
};
