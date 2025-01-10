import Attheme from ".";
import { ColorSignature } from "./types";
/**
 * Serializes the theme.
 * @param theme The theme to serialize.
 * @param colorSignature The way the colors should be encoded, "hex" for
 * #aarrggbb and "int" for Java int color.
 * @returns The serialized theme.
 */
declare const serializeTheme: (theme: Attheme, colorSignature?: ColorSignature) => string;
export default serializeTheme;
