"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMutableMap = void 0;
class MutableMap {
    constructor() {
        /**
         * Determines if the given key is within the map
         * @param key to determine if map contains it
         * @returns true if there is a key in the map
         */
        this.hasKey = (key) => {
            return this.map.has(key);
        };
        /**
         * Gets the value paired with the first instance of the given key
         * in the given map
         * @param key to find the corresponding value for
         * @returns the value associated with the given key in the map or undefined
         * if it does not exist
         */
        this.getVal = (key) => {
            return this.map.get(key);
        };
        /**
         * Set a value for a given key in the map, replacing the current value if a pair with the given key already
            exists. Returns true if a key was replaced
            @modifies this.map
            @effects this.map - replaces the given key with the given new value if it exists
            @returns true if a key was replaced, false otherwise
         */
        this.setVal = (key, val) => {
            if (this.map.has(key)) {
                this.map.set(key, val);
                return true;
            }
            this.map.set(key, val);
            return false;
        };
        /**
         * Clears the map
         * @modifies this.map
         * @effects this.map - removes all elements of the map
         */
        this.clearMap = () => {
            this.map.clear();
        };
        /**
         * Returns all the keys from the map
         * @returns an array containing all the keys from the map */
        this.getKeys = () => {
            return Array.from(this.map.keys());
        };
        /**
         * Returns all the keys from the map
         * @returns an array containing all the keys from the map */
        this.getValues = () => {
            return Array.from(this.map.values());
        };
        this.map = new Map();
    }
}
const map = new MutableMap;
/**
 * Returns a MutableMap
 * @returns a MutableMap
 */
const makeMutableMap = () => {
    return map;
};
exports.makeMutableMap = makeMutableMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUF3QkEsTUFBTSxVQUFVO0lBSVo7UUFJQTs7OztXQUlHO1FBQ0gsV0FBTSxHQUFHLENBQUMsR0FBVyxFQUFXLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUE7UUFFRDs7Ozs7O1dBTUc7UUFDSCxXQUFNLEdBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQTtRQUVEOzs7Ozs7V0FNRztRQUNILFdBQU0sR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFZLEVBQVcsRUFBRTtZQUM1QyxJQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFBO1FBRUQ7Ozs7V0FJRztRQUNILGFBQVEsR0FBRyxHQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUE7UUFHRDs7b0VBRTREO1FBQzVELFlBQU8sR0FBRyxHQUFhLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUE7UUFFRDs7b0VBRTREO1FBQzVELGNBQVMsR0FBRyxHQUFjLEVBQUU7WUFDeEIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUE7UUE3REcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBbUIsQ0FBQztJQUMxQyxDQUFDO0NBK0RKO0FBR0QsTUFBTSxHQUFHLEdBQWUsSUFBSSxVQUFVLENBQUM7QUFDdkM7OztHQUdHO0FBQ0ksTUFBTSxjQUFjLEdBQUcsR0FBZSxFQUFFO0lBQzNDLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyxDQUFBO0FBRlksUUFBQSxjQUFjLGtCQUUxQiJ9