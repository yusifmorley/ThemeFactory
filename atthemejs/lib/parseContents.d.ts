import { Color } from "./types";
interface ParseThemeResult {
    variables: Map<string, Color>;
    wallpaper?: string;
}
/**
 * Parses the .attheme contents.
 * @param contents The .attheme contents to parse.
 * @returns The parsed contents.
 */
declare const parseContents: (contents: string) => ParseThemeResult;
export default parseContents;
