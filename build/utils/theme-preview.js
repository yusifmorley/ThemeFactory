"use strict";
/**
 * https://gitlab.com/AlexStrNik/attheme-preview
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const attheme_js_1 = __importDefault(require("attheme-js"));
const color_1 = require("@snejugal/color");
const fallbacks_1 = __importDefault(require("attheme-js/lib/fallbacks"));
const sharp_1 = __importDefault(require("sharp"));
const image_size_1 = require("image-size");
const xmldom_1 = require("xmldom");
const { serializeToString: serialize } = new xmldom_1.XMLSerializer();
const templatePath = path_1.default.join(__dirname, '../../assets/theme-preview.svg');
const template = fs_1.default.readFileSync(templatePath, 'utf8');
const parser = new xmldom_1.DOMParser();
const get = (node, className, tag) => Array.from(node.getElementsByTagName(tag)).filter(element => element.getAttribute && element.getAttribute('class') === className);
const getElementsByClassName = (node, className) => [
    ...get(node, className, 'rect'),
    ...get(node, className, 'circle'),
    ...get(node, className, 'path'),
    ...get(node, className, 'g'),
    ...get(node, className, 'polygon'),
    ...get(node, className, 'image'),
    ...get(node, className, 'tspan'),
    ...get(node, className, 'stop'),
];
const fill = (node, color) => {
    const { red, green, blue, alpha } = color;
    const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
    if (node.tagName === 'stop') {
        node.setAttribute('stop-color', rgba);
    }
    else {
        node.setAttribute('fill', rgba);
    }
    if (node.childNodes) {
        for (const child of Array.from(node.childNodes)) {
            // @ts-expect-error explain
            if (child.setAttribute) {
                // @ts-expect-error explain
                fill(child, color);
            }
        }
    }
};
const createThemePreview = async ({ name, type, theme, }) => {
    if (!['attheme'].includes(type)) {
        return null;
    }
    const attheme = new attheme_js_1.default(theme);
    attheme.fallbackToSelf(fallbacks_1.default);
    const preview = parser.parseFromString(template);
    const inBubble = attheme.get('chat_inBubble');
    const outBubble = attheme.get('chat_outBubble');
    if (inBubble && outBubble && color_1.brightness(inBubble) > color_1.brightness(outBubble)) {
        attheme.set('chat_{in/out}Bubble__darkest', inBubble);
    }
    else if (outBubble) {
        attheme.set('chat_{in/out}Bubble__darkest', outBubble);
    }
    for (const [variable, color] of attheme) {
        const elements = getElementsByClassName(preview, variable);
        for (const element of elements) {
            fill(element, color);
        }
    }
    const elements = getElementsByClassName(preview, 'IMG');
    await Promise.all(elements.map(async (element) => {
        const chatWidth = Number(element.getAttribute('width'));
        const chatHeight = Number(element.getAttribute('height'));
        const ratio = chatHeight / chatWidth;
        if (attheme.hasWallpaper()) {
            const imageBuffer = Buffer.from(attheme.getWallpaper(), 'binary');
            const { width, height } = image_size_1.imageSize(imageBuffer);
            const imageRatio = (height ?? 0) / (width ?? 0);
            let finalHeight;
            let finalWidth;
            if (ratio > imageRatio) {
                finalHeight = chatHeight;
                finalWidth = Math.round(chatHeight / imageRatio);
            }
            else {
                finalWidth = chatWidth;
                finalHeight = Math.round(chatWidth * imageRatio);
            }
            const resizedImage = await sharp_1.default(imageBuffer)
                .resize(finalWidth, finalHeight)
                .png()
                .toBuffer();
            const croppedImage = await sharp_1.default(resizedImage)
                .resize(chatWidth, chatHeight)
                .png()
                .toBuffer();
            element.setAttribute('xlink:href', `data:image/png;base64,${croppedImage.toString('base64')}`);
        }
    }));
    for (const element of getElementsByClassName(preview, 'theme_name')) {
        element.textContent = name;
    }
    for (const element of getElementsByClassName(preview, 'theme_author')) {
        element.textContent = 'by @ThemerBot';
    }
    const templateBuffer = Buffer.from(serialize(preview), 'binary');
    return sharp_1.default(templateBuffer, { density: 150 }).png().toBuffer();
};
exports.default = createThemePreview;
