import { isDefined, isObject } from 'ts-util-is';

/**
 * Get object property value.
 *
 * @param obj Object to get value from.
 * @param path Dot notation string.
 * @param value Optional default value to return if path is not found.
 */
export function get(obj: Object, path: string, value?: any): any {
    let parts: string[] = path.split('.');

    try {
        return parts.reduce((prev: any, curr: any) => prev[curr], obj);
    } catch (error) {
        return (isDefined(value) ? value : undefined);
    }
}

/**
 * Set object property value.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 * @param value Value to set at path.
 */
export function set(obj: Object, path: string, value: any): void {
    let parts: string[] = path.split('.');

    for (let i = 0; i < parts.length; i++) {
        let t: string = parts[i];

        if (!obj[t]) {
            obj[t] = {};
        }

        if (i === (parts.length - 1)) {
            obj[t] = value;
        } else {
            obj = obj[t];
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
    let value: any = get(obj, path);
    return isDefined(value);
}

/**
 * Delete a property from an object.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 */
export function remove(obj: Object, path: string): boolean {
    let parts: string[] = path.split('.');

    for (let i = 0; i < parts.length; i++) {
        let t: string = parts[i];

        if (i === (parts.length - 1)) {
            return delete obj[t];
        } else {
            obj = obj[t];
        }

        if (!isObject(obj[t])) {
            return false;
        }
    }
}
