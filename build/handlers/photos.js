"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const env_1 = __importDefault(require("../env"));
const colors_1 = require("../utils/colors");
const download_1 = require("../utils/download");
const keyboard_1 = require("../utils/keyboard");
const storage_1 = require("../utils/storage");
const composer = new grammy_1.Composer();
const allowedMimeTypes = ['image/png', 'image/jpeg'];
const mediaGroupIds = new Map(); // chatId => lastGroupId
composer.on('message', async (ctx, next) => {
    if (!ctx.msg.media_group_id) {
        mediaGroupIds.delete(ctx.msg.chat.id);
    }
    await next();
});
composer.on([':photo', ':document'], async (ctx, next) => {
    const { forward_from, media_group_id } = ctx.msg;
    if (forward_from?.id === ctx.me.id) {
        await next();
        return;
    }
    if (ctx.senderChat) {
        await ctx.reply(ctx.i18n('anonymous_admins'));
        return;
    }
    let mimeType = 'image/jpeg';
    if (ctx.msg.document) {
        mimeType = ctx.msg.document.mime_type ?? mimeType;
        const { file_size } = ctx.msg.document;
        if (!allowedMimeTypes.includes(mimeType)) {
            await next();
            return;
        }
        else if (file_size && file_size > 1000000) {
            await ctx.reply(ctx.i18n('image_too_big'));
            return;
        }
    }
    if (media_group_id) {
        if (mediaGroupIds.has(ctx.chat.id) &&
            mediaGroupIds.get(ctx.chat.id) === media_group_id) {
            await next();
            return;
        }
        mediaGroupIds.set(ctx.chat.id, media_group_id);
    }
    try {
        let photo;
        if (ctx.msg.document) {
            photo = await download_1.downloadFile(ctx, true);
        }
        else {
            photo = await download_1.downloadPhoto(ctx, true);
        }
        const colors = await colors_1.getImageColors(photo, mimeType);
        const keyboard = keyboard_1.getKeyboard(ctx);
        const { message_id } = await ctx.replyWithPhoto(`${env_1.default.SVG_RENDERER_URL}/render/${colors
            .map(color => color.slice(1))
            .join('/')}`, {
            reply_markup: keyboard,
            caption: ctx.i18n('choose_color_1'),
            reply_to_message_id: ctx.msg.message_id,
        });
        await storage_1.saveTheme(ctx, message_id, {
            photo,
            colors,
            using: [],
        });
    }
    catch (error) {
        console.error(error);
        await ctx.reply(ctx.i18n('error'), {
            reply_to_message_id: ctx.msg.message_id,
        });
    }
});
exports.default = composer;
