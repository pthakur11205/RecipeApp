
/**Represents a map */ 
export interface MapInterface {

    /**@returns true if there is a key in the map */
    hasKey: (key: string) => boolean;

    /**@returns the value associated with the given key in the map*/
    getVal: (key: string) => unknown;

    /**@returns true if the value of the given key was replaced*/
    setVal: (key: string, val: unknown) => boolean;

    /**Clears the map */
    clearMap: () => void;

    /**@returns an array containing all the keys from the map */
    getKeys: () => string[];

    /**@returns an array containing all the values from the map */
    getValues: () => unknown[];

    /**Deletes the value associated with the given key in the map */
    deleteVal: (key: string) => boolean;

}

class MutableMap implements MapInterface {
    // AF: object = this.map
    private map: Map<string, unknown>;

    constructor() {
        this.map = new Map<string, unknown>();
    }

    /**
     * Determines if the given key is within the map
     * @param key to determine if map contains it
     * @returns true if there is a key in the map
     */
    hasKey = (key: string): boolean => {
        return this.map.has(key);
    }

    /**
     * Gets the value paired with the first instance of the given key 
     * in the given map
     * @param key to find the corresponding value for
     * @returns the value associated with the given key in the map or undefined
     * if it does not exist
     */
    getVal = (key: string): unknown => {
        return this.map.get(key);
    }

    /**
     * Set a value for a given key in the map, replacing the current value if a pair with the given key already
        exists. Returns true if a key was replaced
        @modifies this.map
        @effects this.map - replaces the given key with the given new value if it exists
        @returns true if a key was replaced, false otherwise
     */
    setVal = (key: string, val: unknown): boolean => {
        if(this.map.has(key)) {
            this.map.set(key, val);
            return true;
        }
        this.map.set(key, val);
        return false;
    }

    /**
     * Clears the map
     * @modifies this.map
     * @effects this.map - removes all elements of the map
     */
    clearMap = (): void => {
        this.map.clear();
    }

    
    /**
     * Returns all the keys from the map
     * @returns an array containing all the keys from the map */
    getKeys = (): string[] => {
        return Array.from(this.map.keys());
    }

    /**
     * Returns all the keys from the map
     * @returns an array containing all the keys from the map */
    getValues = (): unknown[] => {
        return Array.from(this.map.values());
    }

    /**
     * Deletes the value paired with the given key in the map
     * @param key to delete the corresponding value for
     * @returns true if the value was deleted, false otherwise
     */
    deleteVal = (key: string): boolean => {
        return this.map.delete(key);
    }
    

}


const map: MutableMap = new MutableMap;
/**
 * Returns a MutableMap
 * @returns a MutableMap
 */
export const makeMutableMap = (): MutableMap => {
    return map;
}