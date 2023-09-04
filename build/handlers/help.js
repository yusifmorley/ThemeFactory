"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const composer = new grammy_1.Composer();
const filter = composer.filter(ctx => ctx.chat?.type === 'private');
filter.command('start', async (ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const name = `${ctx.from.first_name} ${ctx.from.last_name || ''}`.trim();
    await ctx.reply(ctx.i18n('start', { name }));
});
// TODO:
// filter.command('help', async ctx => {});
filter.command('credits', ctx => ctx.reply(ctx.i18n('credits')));
filter.command('privacy', ctx => ctx.reply(ctx.i18n('privacy'), {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
}));
exports.default = composer;
