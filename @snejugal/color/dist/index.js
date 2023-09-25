"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const padStart = (string, maxLength, fillString) => {
    const stringLength = string.length;
    const truncatedStringFiller = repeat(fillString, Math.ceil(maxLength / stringLength + 1))
        .slice(0, maxLength - stringLength);
    return truncatedStringFiller + string;
};
const repeat = (string, count) => {
    let T = ``;
    for (let i = 0; i < count; i++) {
        T += string;
    }
    return T;
};
exports.createHex = ({ red, green, blue, alpha = 255 }) => {
    const redHex = padStart(red.toString(16), 2, `0`);
    const greenHex = padStart(green.toString(16), 2, `0`);
    const blueHex = padStart(blue.toString(16), 2, `0`);
    const alphaHex = padStart(alpha.toString(16), 2, `0`);
    return `#${alphaHex}${redHex}${greenHex}${blueHex}`;
};
exports.createCssRgb = ({ red, green, blue, alpha = 255, }) => {
    return `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
};
exports.brightness = ({ red, green, blue }) => {
    const redPart = 0.2126 * (red / 255);
    const greenPart = 0.7152 * (green / 255);
    const bluePart = 0.0722 * (blue / 255);
    return redPart + greenPart + bluePart;
};
exports.overlay = (...colors) => {
    const finalColor = {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 255,
    };
    for (const color of colors) {
        if (color.alpha === 0) {
            continue;
        }
        if (color.alpha === 255) {
            finalColor.red = color.red;
            finalColor.green = color.green;
            finalColor.blue = color.blue;
        }
        const { red, green, blue } = color;
        const alpha = color.alpha / 255;
        finalColor.red = alpha * (red - finalColor.red) + finalColor.red;
        finalColor.green = alpha * (green - finalColor.green) + finalColor.green;
        finalColor.blue = alpha * (blue - finalColor.blue) + finalColor.blue;
    }
    finalColor.red = Math.round(finalColor.red);
    finalColor.green = Math.round(finalColor.green);
    finalColor.blue = Math.round(finalColor.blue);
    return finalColor;
};
exports.parseHex = (hex) => {
    if (hex[0] !== `#`) {
        return null;
    }
    for (const char of hex.slice(1)) {
        if (!(`a` <= char && char <= `f`)
            && !(`A` <= char && char <= `F`)
            && !(`0` <= char && char <= `9`)) {
            return null;
        }
    }
    const hexLength = hex.length;
    if (hexLength === `#rgb`.length) {
        return {
            red: parseInt(repeat(hex.slice(1, 2), 2), 16),
            green: parseInt(repeat(hex.slice(2, 3), 2), 16),
            blue: parseInt(repeat(hex.slice(3, 4), 2), 16),
            alpha: 255,
        };
    }
    if (hexLength === `#argb`.length) {
        return {
            red: parseInt(repeat(hex.slice(2, 3), 2), 16),
            green: parseInt(repeat(hex.slice(3, 4), 2), 16),
            blue: parseInt(repeat(hex.slice(4, 5), 2), 16),
            alpha: parseInt(repeat(hex.slice(1, 2), 2), 16),
        };
    }
    if (hexLength === `#rrggbb`.length) {
        return {
            red: parseInt(hex.slice(1, 3), 16),
            green: parseInt(hex.slice(3, 5), 16),
            blue: parseInt(hex.slice(5, 7), 16),
            alpha: 255,
        };
    }
    if (hexLength === `#aarrggbb`.length) {
        return {
            red: parseInt(hex.slice(3, 5), 16),
            green: parseInt(hex.slice(5, 7), 16),
            blue: parseInt(hex.slice(7, 9), 16),
            alpha: parseInt(hex.slice(1, 3), 16),
        };
    }
    return null;
};
const generalRgbConversionData = (rgbColor) => {
    const red = rgbColor.red / 255;
    const green = rgbColor.green / 255;
    const blue = rgbColor.blue / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = max - min;
    let hue = 60;
    if (max === min) {
        hue = 0;
    }
    else if (max === red) {
        hue *= (green - blue) / delta;
    }
    else if (max === green) {
        hue *= 2 + (blue - red) / delta;
    }
    else if (max === blue) {
        hue *= 4 + (red - green) / delta;
    }
    if (hue < 0) {
        hue += 360;
    }
    return {
        max,
        min,
        delta,
        hue,
    };
};
const toRgb = ({ chroma, x, match, alpha, hue }) => {
    let [red, green, blue] = [0, 0, 0];
    if (0 <= hue && hue < 60) {
        [red, green, blue] = [chroma, x, 0];
    }
    else if (60 <= hue && hue < 120) {
        [red, green, blue] = [x, chroma, 0];
    }
    else if (120 <= hue && hue < 180) {
        [red, green, blue] = [0, chroma, x];
    }
    else if (180 <= hue && hue < 240) {
        [red, green, blue] = [0, x, chroma];
    }
    else if (240 <= hue && hue < 300) {
        [red, green, blue] = [x, 0, chroma];
    }
    else if (300 <= hue) {
        [red, green, blue] = [chroma, 0, x];
    }
    return {
        red: Math.round((red + match) * 255),
        green: Math.round((green + match) * 255),
        blue: Math.round((blue + match) * 255),
        alpha,
    };
};
exports.rgbToHsl = (rgbColor) => {
    const { max, min, delta, hue, } = generalRgbConversionData(rgbColor);
    let lightness = (max + min) / 2;
    let saturation = delta / (1 - Math.abs(2 * lightness - 1)) || 0;
    return {
        hue,
        saturation,
        lightness,
        alpha: rgbColor.alpha,
    };
};
exports.hslToRgb = ({ hue, saturation, lightness, alpha }) => {
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
    const match = lightness - chroma / 2;
    return toRgb({ chroma, x, match, alpha, hue });
};
exports.rgbToHsb = (rgbColor) => {
    const { max, delta, hue, } = generalRgbConversionData(rgbColor);
    let saturation = 0;
    if (max !== 0) {
        saturation = delta / max;
    }
    const brightness = max;
    return {
        hue,
        saturation,
        brightness,
        alpha: rgbColor.alpha,
    };
};
exports.hsbToRgb = ({ hue, saturation, brightness, alpha }) => {
    const chroma = brightness * saturation;
    const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
    const match = brightness - chroma;
    return toRgb({ chroma, x, match, alpha, hue });
};
exports.isLight = (color) => exports.brightness(color) > 0.6;
exports.isDark = (color) => !exports.isLight(color);
//# sourceMappingURL=index.js.map