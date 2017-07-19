"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_util_is_1 = require("ts-util-is");
/**
 * Regex to test if a string is a valid array index key.
 */
var indexer = /[0-9]+/;
/**
 * Get object property value.
 *
 * @param obj Object to get value from.
 * @param path Dot notation string.
 * @param value Optional default value to return if path is not found.
 */
function get(obj, path, value) {
    var defaultValue = (ts_util_is_1.isDefined(value) ? value : undefined);
    if (!ts_util_is_1.isObject(obj) || !ts_util_is_1.isString(path)) {
        return defaultValue;
    }
    var parts = getParts(path);
    var _loop_1 = function (key) {
        if (ts_util_is_1.isArray(obj) && !indexer.test(key)) {
            obj = obj.map(function (item) { return ts_util_is_1.isUndefined(item) || ts_util_is_1.isNull(obj) ? item : item[key]; });
        }
        else {
            obj = obj[key];
        }
        if (ts_util_is_1.isUndefined(obj) || ts_util_is_1.isNull(obj)) {
            return "break";
        }
    };
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var key = parts_1[_i];
        var state_1 = _loop_1(key);
        if (state_1 === "break")
            break;
    }
    return ts_util_is_1.isUndefined(obj) ? defaultValue : obj;
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
    var parts = getParts(path);
    var last = parts[parts.length - 1];
    for (var _i = 0, parts_2 = parts; _i < parts_2.length; _i++) {
        var key = parts_2[_i];
        if (key === last) {
            obj[key] = value;
            return;
        }
        if (ts_util_is_1.isUndefined(obj[key])) {
            obj[key] = {};
        }
        obj = obj[key];
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
    var parts = getParts(path);
    var last = parts[parts.length - 1];
    for (var _i = 0, parts_3 = parts; _i < parts_3.length; _i++) {
        var key = parts_3[_i];
        if (key === last) {
            return delete obj[key];
        }
        obj = obj[key];
        if (!ts_util_is_1.isObject(obj)) {
            return false;
        }
    }
}
exports.remove = remove;
/**
 * Get all dot notations paths from an object.
 *
 * @param obj Object to get paths for.
 */
function paths(obj) {
    return _paths(obj, []);
}
exports.paths = paths;
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
function getParts(path) {
    return path.split(/[\.]|(?:\[(\d|\*)\])/).filter(function (item) { return !!item && item !== '*'; });
}
/**
 * Internal recursive method to navigate assemble possible paths.
 *
 * @param obj Object to get paths for.
 * @param lead Array of leading parts for the current iteration.
 */
function _paths(obj, lead) {
    var output = [];
    if (!ts_util_is_1.isPlainObject(obj)) {
        // non-plain (like arrays) objects not supported
        return [];
    }
    for (var key in obj) {
        if (ts_util_is_1.isUndefined(obj[key])) {
            continue;
        }
        else if (ts_util_is_1.isPlainObject(obj[key])) {
            // recurse to child object
            lead.push(key);
            output = output.concat(_paths(obj[key], lead));
            // reset path lead for next object
            lead = [];
        }
        else {
            var path = (lead.length ? lead.join('.') + "." + key : key);
            output.push(path);
        }
    }
    return output;
}
//# sourceMappingURL=index.js.map