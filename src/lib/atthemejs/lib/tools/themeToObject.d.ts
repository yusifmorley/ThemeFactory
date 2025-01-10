import Attheme from "..";
import { Color } from "../types";
declare const IMAGE_KEY: unique symbol;
interface ObjectTheme {
    [key: string]: Color;
    [IMAGE_KEY]?: string;
}
/**
 * Converts the new Attheme instance into the old one compatible with the old
 * versions of attheme-js.
 * @param theme The new Attheme instance.
 * @returns An object compatible with the old versions of attheme-js.
 */
declare const themeToObject: (theme: Attheme) => ObjectTheme;
export default themeToObject;
