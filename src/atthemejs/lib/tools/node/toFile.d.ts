import Attheme from "../..";
/**
 * Writes the theme into a file.
 * @param theme The theme to write.
 * @param path The file to write in.
 * @param colorSignature Either `hex` or `int`.
 * @returns Promised resolved when the file is written
 */
declare const toFile: (theme: Attheme, path: string, colorSignature?: "hex" | "int" | undefined) => Promise<void>;
export default toFile;
