"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const colors_1 = require("../utils/colors");
const keyboard_1 = require("../utils/keyboard");
const storage_1 = require("../utils/storage");
const composer = new grammy_1.Composer();
composer.hears(/^#(?:[0-9a-f]{3}){1,2}$/i, async (ctx) => {
    const { reply_to_message: reply } = ctx.msg;
    if (!reply) {
        await ctx.reply(ctx.i18n('invalid_reply'));
        return;
    }
    const { message_id: themeId } = reply;
    const theme = await storage_1.getTheme(ctx, themeId);
    if (!theme) {
        await ctx.reply(ctx.i18n('no_theme_found'));
        return;
    }
    let [color] = ctx.match;
    if (color.length === 4) {
        color = `#${color
            .slice(1)
            .split('')
            .map(c => c.repeat(2))
            .join('')}`;
    }
    if (theme.using[0]?.color === color) {
        await ctx.reply(ctx.i18n('cant_reuse_bg'));
        return;
    }
    theme.using.push({
        label: colors_1.getColorName(color),
        color,
    });
    await storage_1.saveTheme(ctx, themeId, theme);
    const keyboard = keyboard_1.getKeyboard(ctx, true);
    const { length } = theme.using;
    if (length < 3) {
        await ctx.api.editMessageCaption(ctx.chat.id, themeId, {
            caption: ctx.i18n(`choose_color_${length + 1}`, {
                colors: colors_1.labelColors(theme.using).join(', '),
            }),
            reply_markup: keyboard,
        });
    }
    else {
        await ctx.api.editMessageCaption(ctx.chat.id, themeId, {
            caption: ctx.i18n('type_of_theme'),
            reply_markup: keyboard_1.getTypeKeyboard(ctx),
        });
    }
    try {
        await ctx.deleteMessage();
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = composer;
