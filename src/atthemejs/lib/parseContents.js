"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parses the color from a string.
 * @param trimmedValue The value with the color.
 * @throws {SyntaxError} The color is invalid.
 * @returns The parsed color.
 */
const parseValue = (value) => {
    const trimmedValue = value.trim();
    if (!/#[\da-f]{6}|#[\da-f]{8}|-{0,1}[\d]+/i.test(trimmedValue)) {
        throw new SyntaxError(`The color is invalid: ${trimmedValue}`);
    }
    let hex;
    if (trimmedValue.startsWith(`#`)) {
        hex = trimmedValue.slice(1).padStart(8, `f`);
    }
    else {
        const unfoledValue = Number.parseInt(trimmedValue, 10) >>> 0;
        hex = unfoledValue.toString(16).padStart(8, `0`);
    }
    return {
        alpha: Number.parseInt(hex.slice(0, 2), 16),
        red: Number.parseInt(hex.slice(2, 4), 16),
        green: Number.parseInt(hex.slice(4, 6), 16),
        blue: Number.parseInt(hex.slice(6, 8), 16),
    };
};
/**
 * Parses the .attheme contents.
 * @param contents The .attheme contents to parse.
 * @returns The parsed contents.
 */
const parseContents = (contents) => {
    const result = {
        variables: new Map(),
    };
    const lines = contents.split(`\n`);
    for (const rawLine of lines) {
        if (`wallpaper` in result) {
            if (rawLine.startsWith(`WPE`)) {
                // Cutting off the last \n
                result.wallpaper = result.wallpaper.slice(0, -1);
                break;
            }
            result.wallpaper += `${rawLine}\n`;
            continue;
        }
        if (rawLine.startsWith(`WPS`)) {
            result.wallpaper = ``;
            continue;
        }
        const [noCommentsLine] = rawLine.split(`//`);
        const assignOperatorIndex = noCommentsLine.indexOf(`=`);
        if (assignOperatorIndex !== -1) {
            const variable = noCommentsLine.slice(0, assignOperatorIndex);
            if (variable === `wallpaperFileOffset`) {
                // wallpaperFileOffset is just a leaked internal integer value.
                // Skipping it.
                continue;
            }
            const rawValue = noCommentsLine.slice(assignOperatorIndex + 1);
            try {
                const value = parseValue(rawValue);
                result.variables.set(variable, value);
            }
            catch (_a) {
                // Ignore, just like Telegram does
            }
        }
    }
    return result;
};
exports.default = parseContents;
//# sourceMappingURL=parseContents.js.map