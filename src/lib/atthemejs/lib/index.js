"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseContents_1 = require("./parseContents");
const serializeTheme_1 = require("./serializeTheme");
class Attheme {
    /**
     * Constructs a new theme.
     * @param contents The .attheme contents to parse.
     */
    constructor(contents) {
        this._variables = new Map();
        this._wallpaper = null;
        if (typeof contents === `string`) {
            const { variables, wallpaper } = parseContents_1.default(contents);
            this._variables = variables;
            this._wallpaper = wallpaper;
        }
        else if (contents) {
            const iterator = contents[Symbol.iterator]();
            while (true) {
                const result = iterator.next();
                if (result.done) {
                    break;
                }
                else {
                    const [variable, color] = result.value;
                    this._variables.set(variable, Object.assign({}, color));
                }
            }
        }
    }
    /**
     * Gets the theme's wallpaper.
     * @returns The theme's wallpaper.
     */
    getWallpaper() {
        return this._wallpaper ? this._wallpaper : null;
    }
    /**
     * Sets the new wallpaper.
     * @param newWallpaper The new wallpaper.
     */
    setWallpaper(newWallpaper) {
        this._wallpaper = newWallpaper;
    }
    /**
     * Checks whether the theme has a wallpaper.
     * @returns Whether the theme has a wallpaper.
     */
    hasWallpaper() {
        return typeof this._wallpaper === `string`;
    }
    /**
     * Deletes the wallpaper.
     */
    deleteWallpaper() {
        delete this._wallpaper;
    }
    /**
     * Checks whether the theme has the specified variables.
     * @param variable The varialbe to check existence of.
     * @returns Whehter the theme has the variable.
     */
    has(variable) {
        return this._variables.has(variable);
    }
    /**
     * Deletes the variable.
     * @param variable The variable to delete.
     */
    delete(variable) {
        this._variables.delete(variable);
    }
    /**
     * Gets the value of the specified variable.
     * @param variable The variable to get value of.
     * @returns The value of the variable.
     */
    get(variable) {
        const value = this._variables.get(variable);
        return value === undefined ? null : Object.assign({}, value);
    }
    /**
     * Sets the variable to the specified value.
     * @param variable The variable to set.
     * @param value The value of the variable.
     */
    set(variable, value) {
        this._variables.set(variable, Object.assign({}, value));
    }
    /**
     * Gets the amount of variables in the theme.
     * @returns The amount of variable in the theme.
     */
    getVariablesAmount() {
        return this._variables.size;
    }
    /**
     * Gets an array of all variables in the theme.
     * @returns An array of varialbes.
     */
    getVariablesList() {
        return [...this._variables.keys()];
    }
    /**
     * Sorts the theme's variables by their names in place.
     */
    sort() {
        this._variables = new Map([...this._variables].sort(([a], [b]) => a.localeCompare(b)));
    }
    /**
     * Fallbacks this theme to another theme:
     *
     * - Every variable which is present in `other` but not in `this`, is copied
     *   to `this`.
     * - If `this` doesn't have a wallpaper, the wallpaper is copied from `other`.
     *
     * @param other The other theme to fallback to.
     */
    fallbackToOther(other) {
        for (const [variable, color] of other._variables) {
            if (!this._variables.has(variable)) {
                this._variables.set(variable, Object.assign({}, color));
            }
        }
        if (typeof this._wallpaper !== `string`) {
            this._wallpaper = other._wallpaper;
        }
    }
    /**
     * Fallbacks variables to other existing variabled according to the map.
     * @param fallbackMap Defines variable mapping.
     */
    fallbackToSelf(fallbackMap) {
        for (const [variable, fallback] of fallbackMap) {
            if (!this._variables.has(variable) && this._variables.has(fallback)) {
                this._variables.set(variable, Object.assign({}, this._variables.get(fallback)));
            }
        }
    }
    *[Symbol.iterator]() {
        for (const [variable, value] of this._variables) {
            const entry = [variable, Object.assign({}, value)];
            yield entry;
        }
    }
    /**
     * Serializes the theme.
     * @param colorSignature The way the colors should be serialized. "hex" for
     * #aarrggbb and "int" for Java int color.
     * @returns The serialized theme.
     */
    toString(colorSignature) {
        return serializeTheme_1.default(this, colorSignature);
    }
}
exports.default = Attheme;
//# sourceMappingURL=index.js.map