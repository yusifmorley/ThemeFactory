"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const transformer_throttler_1 = require("@grammyjs/transformer-throttler");
const runner_1 = require("@grammyjs/runner");
const env_1 = __importDefault(require("./env"));
const fs_1 = __importDefault(require("fs"));
const handlers_1 = __importDefault(require("./handlers"));
const path_1 = __importDefault(require("path"));
const i18n_1 = require("./utils/i18n");
const download_i18n_1 = __importDefault(require("./scripts/download-i18n"));
const main = async () => {
    if (!fs_1.default.existsSync(path_1.default.join(__dirname, 'i18n'))) {
        await download_i18n_1.default();
    }
    const bot = new grammy_1.Bot(env_1.default.BOT_TOKEN, {
        client: {
            apiRoot: env_1.default.API_ROOT,
        },
    });
    bot.catch(err => {
        console.error(`Error while handling update ${err.ctx.update.update_id}:`);
        console.error(err.error);
    });
    bot.command('status', ctx => {
        // Ignore the message if it's older than 2 seconds
        if (Date.now() / 1000 - ctx.msg.date < 2) {
            ctx.reply('The bot is up.');
        }
    });
    bot.api.config.use(transformer_throttler_1.apiThrottler());
    bot.use(i18n_1.middleware());
    bot.use(handlers_1.default);
    runner_1.run(bot);
    console.log('Bot started');
};
main();
