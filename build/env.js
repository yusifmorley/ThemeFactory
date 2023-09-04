"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = envalid_1.cleanEnv(process.env, {
    BOT_TOKEN: envalid_1.str({ desc: 'The Telegram bot API token' }),
    SVG_RENDERER_URL: envalid_1.str(),
    IMAGES_PATH: envalid_1.str({
        desc: 'The path where images are stored (this is ignored if LOCAL_API_ROOT is true)',
        default: '/tmp/ThemerBot',
    }),
    API_ROOT: envalid_1.url({ default: 'https://api.telegram.org' }),
    LOCAL_API_ROOT: envalid_1.bool({ default: false }),
    REDIS_HOST: envalid_1.host({ default: '127.0.0.1' }),
    REDIS_PORT: envalid_1.port({ default: 6379 }),
    STRIPE_TOKEN: envalid_1.str({ default: undefined }),
});
