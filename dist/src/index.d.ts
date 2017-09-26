/**
 * Get object property value.
 *
 * @param obj Object to get value from.
 * @param path Dot notation string.
 * @param value Optional default value to return if path is not found.
 */
export declare function get(obj: object, path: string, value?: any): any;
/**
 * Set object property value.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 * @param value Value to set at path.
 */
export declare function set(obj: object, path: string, value: any): void;
/**
 * Check if object has property value.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 */
export declare function has(obj: object, path: string): boolean;
/**
 * Delete a property from an object.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 */
export declare function remove(obj: object, path: string): boolean;
/**
 * Get all dot notations paths from an object.
 *
 * @param obj Object to get paths for.
 */
export declare function paths(obj: object): string[];
