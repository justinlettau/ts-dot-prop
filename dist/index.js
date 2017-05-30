"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_util_is_1 = require("ts-util-is");
/**
 * Get object property value.
 *
 * @param obj Object to get value from.
 * @param path Dot notation string.
 * @param value Optional default value to return if path is not found.
 */
function get(obj, path, value) {
    if (!ts_util_is_1.isObject(obj) || !ts_util_is_1.isString(path)) {
        return (ts_util_is_1.isDefined(value) ? value : undefined);
    }
    var parts = path.split('.');
    try {
        return parts.reduce(function (prev, curr) { return prev[curr]; }, obj);
    }
    catch (error) {
        return (ts_util_is_1.isDefined(value) ? value : undefined);
    }
}
exports.get = get;
/**
 * Set object property value.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 * @param value Value to set at path.
 */
function set(obj, path, value) {
    if (!ts_util_is_1.isObject(obj) || !ts_util_is_1.isString(path)) {
        return;
    }
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
        var t = parts[i];
        if (!obj[t]) {
            obj[t] = {};
        }
        if (i === (parts.length - 1)) {
            obj[t] = value;
        }
        else {
            obj = obj[t];
        }
    }
}
exports.set = set;
/**
 * Check if object has property value.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 */
function has(obj, path) {
    var value = get(obj, path);
    return ts_util_is_1.isDefined(value);
}
exports.has = has;
/**
 * Delete a property from an object.
 *
 * @param obj Object to set value for.
 * @param path Dot notation string.
 */
function remove(obj, path) {
    if (!ts_util_is_1.isObject(obj) || !ts_util_is_1.isString(path)) {
        return;
    }
    var parts = path.split('.');
    for (var i = 0; i < parts.length; i++) {
        var t = parts[i];
        if (i === (parts.length - 1)) {
            return delete obj[t];
        }
        else {
            obj = obj[t];
        }
        if (!ts_util_is_1.isObject(obj[t])) {
            return false;
        }
    }
}
exports.remove = remove;
