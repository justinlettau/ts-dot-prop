import {
    isArray,
    isDefined,
    isNull,
    isObject,
    isPlainObject,
    isString,
    isUndefined
} from 'ts-util-is';

/**
 * Regex to test if a string is a valid array index key.
 */
const indexer: RegExp = /[0-9]+/;

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

    const parts: string[] = getParts(path);

    for (let key of parts) {
        if (isArray(obj) && !indexer.test(key)) {
            obj = obj.map(item => isUndefined(item) || isNull(obj) ? item : item[key]);
        } else {
            obj = obj[key];
        }

        if (isUndefined(obj) || isNull(obj)) {
            break;
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

    const parts: string[] = getParts(path);
    const last: string = parts[parts.length - 1];

    for (let key of parts) {
        if (key === last) {
            obj[key] = value;
            return;
        }

        if (isUndefined(obj[key])) {
            obj[key] = {};
        }

        obj = obj[key];
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

    const parts: string[] = getParts(path);
    const last: string = parts[parts.length - 1];

    for (let key of parts) {
        if (key === last) {
            return delete obj[key];
        }

        obj = obj[key];

        if (!isObject(obj)) {
            return false;
        }
    }
}

/**
 * Get all dot notations paths from an object.
 *
 * @param obj Object to get paths for.
 */
export function paths(obj: Object): string[] {
    return _paths(obj, []);
}

/**
 * Split a dot notation string into parts.
 *
 * Examples:
 * - `obj.value` => `['obj', 'value']`
 * - `obj.ary[0].value` => `['obj', 'ary', '0', 'value']`
 * - `obj.ary[*].value` => `['obj', 'ary', 'value']`
 *
 * @param path Dot notation string.
 */
function getParts(path: string): string[] {
    return path.split(/[\.]|(?:\[(\d|\*)\])/).filter(item => !!item && item !== '*');
}

/**
 * Internal recursive method to navigate assemble possible paths.
 *
 * @param obj Object to get paths for.
 * @param lead Array of leading parts for the current iteration.
 */
function _paths(obj: Object, lead: string[]): string[] {
    let output: string[] = [];

    if (!isPlainObject(obj)) {
        // non-plain (like arrays) objects not supported
        return [];
    }

    for (let key in obj) {
        if (isUndefined(obj[key])) {
            continue;
        } else if (isPlainObject(obj[key])) {

            // recurse to child object
            lead.push(key);
            output = output.concat(_paths(obj[key], lead));

            // reset path lead for next object
            lead = [];
        } else {
            const path: string = (lead.length ? `${lead.join('.')}.${key}` : key);
            output.push(path);
        }
    }

    return output;
}
