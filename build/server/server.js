"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const svg2png_1 = require("svg2png");
const Jimp = __importStar(require("jimp"));
const port = 3000; // 修改为你希望的端口号
function parseHex(hex) {
    return parseInt(hex, 16);
}
function parseColor(color) {
    if (color.length !== 6) {
        return null;
    }
    const red = parseHex(color.substring(0, 2));
    const green = parseHex(color.substring(2, 4));
    const blue = parseHex(color.substring(4, 6));
    if (red === null || green === null || blue === null) {
        return null;
    }
    return [red, green, blue];
}
function isLight(color) {
    const yiq = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
    return yiq >= 128;
}
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/render') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { colors } = JSON.parse(body);
                if (!Array.isArray(colors) || colors.length !== 5) {
                    return res.writeHead(400).end();
                }
                const svgTemplate = await Jimp.read('colors.svg'); // 修改为你的 SVG 模板路径
                for (let i = 0; i < colors.length; i++) {
                    const color = colors[i];
                    const rgbColor = parseColor(color);
                    if (!rgbColor) {
                        return res.writeHead(400).end();
                    }
                    const textColor = isLight(rgbColor) ? [0, 0, 0] : [255, 255, 255];
                    const replaceColor = Jimp.rgbaToInt(rgbColor[0], rgbColor[1], rgbColor[2], 255);
                    const replaceTextColor = Jimp.rgbaToInt(textColor[0], textColor[1], textColor[2], 255);
                    svgTemplate.scan(0, 0, svgTemplate.bitmap.width, svgTemplate.bitmap.height, (x, y, idx) => {
                        const r = svgTemplate.bitmap.data[idx];
                        const g = svgTemplate.bitmap.data[idx + 1];
                        const b = svgTemplate.bitmap.data[idx + 2];
                        if (r === 0 && g === 0 && b === 0) {
                            svgTemplate.bitmap.data[idx] = replaceColor >> 24 & 0xff;
                            svgTemplate.bitmap.data[idx + 1] = replaceColor >> 16 & 0xff;
                            svgTemplate.bitmap.data[idx + 2] = replaceColor >> 8 & 0xff;
                            svgTemplate.bitmap.data[idx + 3] = replaceColor & 0xff;
                        }
                        else if (r === 255 && g === 255 && b === 255) {
                            svgTemplate.bitmap.data[idx] = replaceTextColor >> 24 & 0xff;
                            svgTemplate.bitmap.data[idx + 1] = replaceTextColor >> 16 & 0xff;
                            svgTemplate.bitmap.data[idx + 2] = replaceTextColor >> 8 & 0xff;
                            svgTemplate.bitmap.data[idx + 3] = replaceTextColor & 0xff;
                        }
                    });
                }
                svgTemplate.getBufferAsync(Jimp.MIME_PNG)
                    .then(async (buffer) => {
                    try {
                        const pngBuffer = await svg2png_1.convert(buffer);
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.end(pngBuffer);
                    }
                    catch (error) {
                        res.writeHead(500).end();
                    }
                })
                    .catch(() => {
                    res.writeHead(500).end();
                });
            }
            catch (error) {
                res.writeHead(400).end();
            }
        });
    }
    else {
        res.writeHead(404).end();
    }
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
