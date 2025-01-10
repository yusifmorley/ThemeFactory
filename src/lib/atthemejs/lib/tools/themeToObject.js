"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMAGE_KEY = Symbol.for(`image`);
/**
 * Converts the new Attheme instance into the old one compatible with the old
 * versions of attheme-js.
 * @param theme The new Attheme instance.
 * @returns An object compatible with the old versions of attheme-js.
 */
const themeToObject = (theme) => {
    let object = {};
    for (const [variable, value] of theme) {
        if (variable === `__proto__`) {
            continue;
        }
        object[variable] = value;
    }
    if (theme.hasWallpaper()) {
        object[IMAGE_KEY] = theme.getWallpaper();
    }
    return object;
};
exports.default = themeToObject;
//# sourceMappingURL=themeToObject.js.map