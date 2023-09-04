"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const platform_1 = require("grammy/out/platform");
const download_1 = require("../utils/download");
const composer = new grammy_1.Composer();
const isThemeFileRegex = /\.(?:at|tgx-)theme$/;
composer
    .filter((ctx) => {
    return !!(ctx.chat?.type === 'private' &&
        ctx.msg?.reply_to_message?.from?.id === ctx.me.id &&
        isThemeFileRegex.test(ctx.msg?.reply_to_message?.document?.file_name ?? ''));
})
    .on(':text', async (ctx) => {
    const { text, reply_to_message: reply } = ctx.msg;
    const { document } = reply;
    const file = await download_1.downloadFile(ctx, true);
    const fileExt = document.file_name.split('.').pop();
    await ctx.replyWithDocument(new platform_1.InputFile(file, `${text} by @${ctx.me.username}.${fileExt}`), {
        caption: reply.caption,
        caption_entities: reply.caption_entities,
        reply_to_message_id: reply.message_id,
    });
});
exports.default = composer;
