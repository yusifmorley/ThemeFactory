/// <reference lib="dom" />
import Attheme from "../..";
/**
 * Creates a Blob to download the theme.
 * @param theme The theme to download.
 * @param name The theme's name.
 * @param colorSignature Either `hex` or `int`.
 * @returns The created blob the theme can be downloaded through.
 */
declare const toBlob: (theme: Attheme, name: string, colorSignature?: "hex" | "int" | undefined) => string;
export default toBlob;
