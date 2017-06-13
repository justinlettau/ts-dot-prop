import { isUndefined, isDefined, isObject, isString } from 'ts-util-is';

/**
 * Regex to find array index notation (example: `myArray[0]`).
 */
const indexer: RegExp = /([\w]+)\[([\d]+)\]/;

/**
 * Get object property value.
 *
 * @param obj Object to get value from.
 * @param path Dot notation string.
 * @param value Optional default value to return if path is not found.
 */
export function get(obj: Object, path: string, value?: any): any {
    const defaultValue: any = (isDefined(value) ? value : undefined);

    if (!isObject(obj) || !isString(path)) {
        return defaultValue;
    }

    const parts: string[] = path.split('.');

    for (let key of parts) {
        const match: string[] = key.match(indexer);

        if (match) {
            // array index notation
            const array: string = match[1];
            const index: string = match[2];

            obj = obj[array] && obj[array][index];
        } else {
            obj = obj[key];
        }

        if (isUndefined(obj)) {
            return defaultValue;
        }
    }

    return isUndefined(obj) ? defaultValue : obj;
}

/**
 * Set object property value.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 * @param value Value to set at path.
 */
export function set(obj: Object, path: string, value: any): void {
    if (!isObject(obj) || !isString(path)) {
        return;
    }

    const parts: string[] = path.split('.');
    const last: string  = parts[parts.length - 1];

    for (let key of parts) {
        const match: string[] = key.match(indexer);

        if (match) {
            // array index notation
            const array: string = match[1];
            const index: number = parseInt(match[2], 10);

            if (isUndefined(obj[array])) {
                obj = [];
            } else {
                obj = obj[array];
            }

            if (isUndefined(obj[index])) {
                obj = {};
            } else {
                obj = obj[index];
            }
        } else {
            if (isUndefined(obj[key])) {
                obj[key] = {};
            }

            if (key === last) {
                obj[key] = value;
            } else {
                obj = obj[key];
            }
        }
    }
}

/**
 * Check if object has property value.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 */
export function has(obj: Object, path: string): boolean {
    const value: any = get(obj, path);
    return isDefined(value);
}

/**
 * Delete a property from an object.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 */
export function remove(obj: Object, path: string): boolean {
    if (!isObject(obj) || !isString(path)) {
        return;
    }

    const parts: string[] = path.split('.');
    const last: string = parts[parts.length - 1];

    for (let key of parts) {
        if (key === last) {
            return delete obj[key];
        }

        const match: string[] = key.match(indexer);

        if (match) {
            // array index notation
            const array: string = match[1];
            const index: string = match[2];

            obj = obj[array] && obj[array][index];
        } else {
            obj = obj[key];
        }

        if (!isObject(obj)) {
            return false;
        }
    }
}
