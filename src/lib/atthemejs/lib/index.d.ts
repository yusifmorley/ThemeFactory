import { Color, VariableIterator, ColorSignature } from "./types";
export default class Attheme {
    private _variables;
    private _wallpaper?;
    /**
     * Constructs a new theme.
     * @param contents The .attheme contents to parse.
     */
    constructor(contents?: string | VariableIterator | null);
    /**
     * Gets the theme's wallpaper.
     * @returns The theme's wallpaper.
     */
    getWallpaper(): string | null;
    /**
     * Sets the new wallpaper.
     * @param newWallpaper The new wallpaper.
     */
    setWallpaper(newWallpaper: string): void;
    /**
     * Checks whether the theme has a wallpaper.
     * @returns Whether the theme has a wallpaper.
     */
    hasWallpaper(): boolean;
    /**
     * Deletes the wallpaper.
     */
    deleteWallpaper(): void;
    /**
     * Checks whether the theme has the specified variables.
     * @param variable The varialbe to check existence of.
     * @returns Whehter the theme has the variable.
     */
    has(variable: string): boolean;
    /**
     * Deletes the variable.
     * @param variable The variable to delete.
     */
    delete(variable: string): void;
    /**
     * Gets the value of the specified variable.
     * @param variable The variable to get value of.
     * @returns The value of the variable.
     */
    get(variable: string): {
        red: number;
        green: number;
        blue: number;
        alpha: number;
    } | null;
    /**
     * Sets the variable to the specified value.
     * @param variable The variable to set.
     * @param value The value of the variable.
     */
    set(variable: string, value: Color): void;
    /**
     * Gets the amount of variables in the theme.
     * @returns The amount of variable in the theme.
     */
    getVariablesAmount(): number;
    /**
     * Gets an array of all variables in the theme.
     * @returns An array of varialbes.
     */
    getVariablesList(): string[];
    /**
     * Sorts the theme's variables by their names in place.
     */
    sort(): void;
    /**
     * Fallbacks this theme to another theme:
     *
     * - Every variable which is present in `other` but not in `this`, is copied
     *   to `this`.
     * - If `this` doesn't have a wallpaper, the wallpaper is copied from `other`.
     *
     * @param other The other theme to fallback to.
     */
    fallbackToOther(other: Attheme): void;
    /**
     * Fallbacks variables to other existing variabled according to the map.
     * @param fallbackMap Defines variable mapping.
     */
    fallbackToSelf(fallbackMap: Map<string, string>): void;
    [Symbol.iterator](): Generator<[string, import("@snejugal/color").RgbColor], void, unknown>;
    /**
     * Serializes the theme.
     * @param colorSignature The way the colors should be serialized. "hex" for
     * #aarrggbb and "int" for Java int color.
     * @returns The serialized theme.
     */
    toString(colorSignature?: ColorSignature): string;
}
