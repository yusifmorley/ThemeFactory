"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const fs_1 = require("fs");
const new_i18n_1 = __importDefault(require("new-i18n"));
const path_1 = __importDefault(require("path"));
const folder = path_1.default.join(__dirname, '../../i18n');
const middleware = () => {
    const i18n = new new_i18n_1.default({
        folder,
        languages: fs_1.readdirSync(folder)
            .filter(file => file.endsWith('.json'))
            .map(file => file.slice(0, -5)),
        fallback: 'en',
    });
    return async (ctx, next) => {
        ctx.i18n = (keyword, variables) => i18n.translate(ctx.from?.language_code ?? '', keyword, variables) ??
            '';
        await next();
    };
};
exports.middleware = middleware;
