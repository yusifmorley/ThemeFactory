"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * Writes the theme into a file.
 * @param theme The theme to write.
 * @param path The file to write in.
 * @param colorSignature Either `hex` or `int`.
 * @returns Promised resolved when the file is written
 */
const toFile = (theme, path, colorSignature) => new Promise((resolve, reject) => {
    fs.writeFile(path, theme.toString(colorSignature), `binary`, error => {
        if (error) {
            reject(error);
        }
        else {
            resolve();
        }
    });
});
exports.default = toFile;
//# sourceMappingURL=toFile.js.map