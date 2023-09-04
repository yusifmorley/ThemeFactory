"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheme = exports.getThemeName = void 0;
const attheme_js_1 = __importDefault(require("attheme-js"));
const attheme_1 = __importDefault(require("../variables/attheme"));
const tgios_theme_1 = __importDefault(require("../variables/tgios-theme"));
const tgx_theme_1 = __importDefault(require("../variables/tgx-theme"));
const colors_1 = require("./colors");
const getThemeName = (background, primary) => `${colors_1.getColorName(primary)} on ${colors_1.getColorName(background)}`;
exports.getThemeName = getThemeName;
const createTheme = ({ username, image, name, colors, type, }) => {
    switch (type) {
        case 'attheme': {
            const variables = attheme_1.default(colors);
            const theme = new attheme_js_1.default(variables);
            theme.setWallpaper(image.toString('binary'));
            return theme.toString('int');
        }
        case 'tgios-theme': {
            return tgios_theme_1.default(name, colors);
        }
        case 'tgx-theme': {
            return tgx_theme_1.default(name, colors, username);
        }
        default:
            throw new TypeError(`Unknown theme type: ${type}`);
    }
};
exports.createTheme = createTheme;
