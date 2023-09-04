"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = exports.saveTheme = void 0;
const env_1 = __importDefault(require("../env"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const util_1 = require("util");
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient({
    host: env_1.default.REDIS_HOST,
    port: env_1.default.REDIS_PORT,
});
if (!env_1.default.LOCAL_API_ROOT) {
    mkdirp_1.default.sync(env_1.default.IMAGES_PATH);
}
client.on('error', error => {
    console.error(error);
});
const get = util_1.promisify(client.get).bind(client);
const set = util_1.promisify(client.set).bind(client);
const del = util_1.promisify(client.del).bind(client);
const getKey = (ctx, messageId) => `themerbot_${ctx.chat?.id}_${ctx.from?.id}_${messageId}`;
const saveTheme = async (ctx, messageId, theme) => {
    const key = getKey(ctx, messageId);
    if (theme === null) {
        if (!env_1.default.LOCAL_API_ROOT) {
            const _theme = await exports.getTheme(ctx, messageId);
            if (_theme !== null) {
                await promises_1.default.unlink(_theme.photo);
            }
        }
        // @ts-expect-error the types seem to be broken when using `util.promisify`
        await del(key);
    }
    else {
        const _theme = { ...theme };
        if (!env_1.default.LOCAL_API_ROOT && typeof theme.photo !== 'string') {
            _theme.photo = path_1.default.join(env_1.default.IMAGES_PATH, key);
            await promises_1.default.writeFile(_theme.photo, theme.photo);
        }
        await set(key, JSON.stringify(_theme));
    }
};
exports.saveTheme = saveTheme;
const getTheme = async (ctx, messageId) => {
    const key = getKey(ctx, messageId);
    const theme = await get(key);
    return theme ? JSON.parse(theme) : null;
};
exports.getTheme = getTheme;
