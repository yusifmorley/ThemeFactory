"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeData = exports.getForegroundColor = exports.adjustBrightness = exports.isLight = void 0;
const color_1 = __importDefault(require("color"));
const isLight = (color) => color_1.default(color).isLight();
exports.isLight = isLight;
const adjustBrightness = (color, ratio, invert = false) => {
    const object = color_1.default(color);
    return object
        .lightness(object.lightness() + (invert ? -ratio : ratio))
        .hex();
};
exports.adjustBrightness = adjustBrightness;
const getForegroundColor = (background) => exports.isLight(background) ? exports.adjustBrightness(background, -45) : '#ffffff';
exports.getForegroundColor = getForegroundColor;
const themeData = ([filling, text, primary]) => {
    const themeIsLight = exports.isLight(filling);
    const textOnPrimary = exports.getForegroundColor(primary);
    const background = exports.adjustBrightness(filling, -6.5);
    const secondaryText = color_1.default(filling).mix(color_1.default(text), 0.4).hex();
    const backgroundText = exports.adjustBrightness(secondaryText, -10, themeIsLight);
    const bubbleOutColor = exports.adjustBrightness(themeIsLight ? primary : filling, themeIsLight ? 41 : -3);
    return {
        background,
        filling,
        text,
        backgroundText,
        secondaryText,
        primary,
        textOnPrimary,
        themeIsLight,
        bubbleOutColor,
    };
};
exports.themeData = themeData;
