"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const __1 = require("../../index");
const fromFile = (path) => new Promise((resolve, reject) => {
    fs.readFile(path, `binary`, (error, contents) => {
        if (error) {
            reject(error);
        }
        else {
            resolve(new __1.default(contents));
        }
    });
});
exports.default = fromFile;
//# sourceMappingURL=fromFile.js.map
