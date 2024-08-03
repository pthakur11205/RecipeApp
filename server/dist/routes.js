"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetForTesting = exports.recipeInfos = exports.deleteRecipe = exports.save = void 0;
const map_1 = require("./map");
const recipes = (0, map_1.makeMutableMap)();
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
/**
 * Saves the name and contents of the request to the files
 * @param req request to respond to
 * @param res object to send response with
 */
const save = (req, res) => {
    const name = req.body.name;
    if (name === undefined || typeof name !== 'string') {
        res.status(400).send('required argument "name" was missing');
        return;
    }
    const content = req.body.content;
    if (content === undefined) {
        res.status(400).send('required argument "content" was missing');
        return;
    }
    res.send({ saved: recipes.setVal(name, content) });
};
exports.save = save;
/**
 * Deletes a recipe by name
 * @param req request to respond to
 * @param res object to send response with
 */
const deleteRecipe = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined || typeof name !== 'string') {
        res.status(400).send('required argument "name" was missing');
        return;
    }
    const deleted = recipes.deleteVal(name);
    if (deleted) {
        res.send({ deleted: true });
    }
    else {
        res.status(404).send('recipe not found');
    }
};
exports.deleteRecipe = deleteRecipe;
/**
 * Lists the info of all recipes currently saved
 * @param req request to respond to
 * @param res object to send response with
 */
const recipeInfos = (_req, res) => {
    res.send({ recipeInfos: recipes.getValues() });
};
exports.recipeInfos = recipeInfos;
/**Reset for testing purposes */
const resetForTesting = () => {
    recipes.clearMap();
};
exports.resetForTesting = resetForTesting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrQkFBcUQ7QUFNckQsTUFBTSxPQUFPLEdBQWlCLElBQUEsb0JBQWMsR0FBRSxDQUFDO0FBRy9DLHdFQUF3RTtBQUN4RSw0RUFBNEU7QUFDNUUsbURBQW1EO0FBQ25ELE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBYyxFQUFvQixFQUFFO0lBQ2pELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN4QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QjtTQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQ3BDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTTtRQUNMLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNJLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDaEUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFHM0IsSUFBRyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNqRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzdELE9BQU87S0FDUjtJQUVELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2pDLElBQUcsT0FBTyxLQUFLLFNBQVMsRUFBRTtRQUN4QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU87S0FDUjtJQUVDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBRXJELENBQUMsQ0FBQTtBQWpCWSxRQUFBLElBQUksUUFpQmhCO0FBRUQ7Ozs7R0FJRztBQUNJLE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDeEUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzdELE9BQU87S0FDUjtJQUVELE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsSUFBSSxPQUFPLEVBQUU7UUFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FDM0I7U0FBTTtRQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDMUM7QUFDSCxDQUFDLENBQUM7QUFiVyxRQUFBLFlBQVksZ0JBYXZCO0FBR0Y7Ozs7R0FJRztBQUNJLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBaUIsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDeEUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQTtBQUZZLFFBQUEsV0FBVyxlQUV2QjtBQUVELGdDQUFnQztBQUN6QixNQUFNLGVBQWUsR0FBRyxHQUFTLEVBQUU7SUFDeEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3JCLENBQUMsQ0FBQTtBQUZZLFFBQUEsZUFBZSxtQkFFM0IifQ==