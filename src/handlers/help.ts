import { Composer } from 'grammy';
import { I18nContext } from '../types';

const composer = new Composer<I18nContext>();

const filter = composer.filter(ctx => ctx.chat?.type === 'private');

filter.command('start', async ctx => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const name = `${ctx.from!.first_name} ${ctx.from!.last_name || ''}`.trim();

    await ctx.reply(ctx.i18n('start', { name }));
});

// TODO:
// filter.command('help', async ctx => {});

filter.command('credits', ctx => ctx.reply(ctx.i18n('credits')));

filter.command('privacy', ctx =>
    ctx.reply(ctx.i18n('privacy'), {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
    }),
);

export default composer;
