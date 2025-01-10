"use strict";
/// <reference lib="DOM" />
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const fromFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
        const chars = new Uint8Array(reader.result);
        let contents = ``;
        for (const char of chars) {
            contents += String.fromCharCode(char);
        }
        resolve(new __1.default(contents));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
});
exports.default = fromFile;
//# sourceMappingURL=fromFile.js.map
