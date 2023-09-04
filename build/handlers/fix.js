"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attheme_js_1 = __importDefault(require("attheme-js"));
const grammy_1 = require("grammy");
const color_1 = __importDefault(require("color"));
const download_1 = require("../utils/download");
const themes_1 = require("../utils/themes");
const composer = new grammy_1.Composer();
const isThemeFileRegex = /\.attheme$/;
composer.filter((ctx) => ctx.chat?.type === 'private' &&
    isThemeFileRegex.test(ctx.msg?.document?.file_name ?? ''), async (ctx) => {
    const file = await download_1.downloadFile(ctx, true);
    const fileName = ctx.msg.document.file_name;
    const oldTheme = new attheme_js_1.default(file.toString('binary'));
    const colors = [
        oldTheme.get('actionBarActionModeDefault'),
        oldTheme.get('actionBarActionModeDefaultIcon'),
        oldTheme.get('chat_outVoiceSeekbar'),
    ];
    if (colors.some(color => color === null)) {
        await ctx.reply(ctx.i18n('cannot_fix'));
        return;
    }
    const hexColors = colors.map(color => color_1.default({
        r: color?.red,
        g: color?.green,
        b: color?.blue,
    }).hex());
    const theme = themes_1.createTheme({
        username: ctx.me.username,
        image: Buffer.from(oldTheme.getWallpaper() ?? '', 'binary'),
        name: fileName,
        colors: hexColors,
        type: fileName.split('.').pop(),
    });
    await ctx.replyWithDocument(new grammy_1.InputFile(Buffer.from(theme, 'binary'), fileName), {
        caption: `#theme ${hexColors.join(' ')}`,
        reply_to_message_id: ctx.msg.message_id,
    });
});
exports.default = composer;
