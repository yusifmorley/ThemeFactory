"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorName = exports.getImageColors = exports.labelColors = void 0;
const get_image_colors_1 = __importDefault(require("get-image-colors"));
const ntcjs_1 = __importDefault(require("@youtwitface/ntcjs"));
const labelColors = (colors, includeLabel = true) => {
    return colors.map(x => {
        const color = x.color.toUpperCase();
        return includeLabel && x.label ? `${x.label} (${color})` : color;
    });
};
exports.labelColors = labelColors;
const getImageColors = async (buffer, type) => {
    let colors;
    if (typeof buffer === 'string') {
        colors = await get_image_colors_1.default(buffer);
    }
    else {
        colors = await get_image_colors_1.default(buffer, type ?? 'image/jpeg');
    }
    return colors.map(color => color.hex());
};
exports.getImageColors = getImageColors;
const getColorName = (color) => {
    return ntcjs_1.default(color)[1];
};
exports.getColorName = getColorName;
