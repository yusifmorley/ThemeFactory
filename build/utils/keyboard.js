"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeKeyboard = exports.getKeyboard = void 0;
const grammy_1 = require("grammy");
const getKeyboard = (ctx, showBackspace = false) => {
    const keyboard = new grammy_1.InlineKeyboard()
        .text('1', '0')
        .text('2', '1')
        .text('3', '2')
        .text('4', '3')
        .text('5', '4')
        .row()
        .text(ctx.i18n('white'), 'white')
        .text(ctx.i18n('black'), 'black');
    if (showBackspace) {
        keyboard.text('⬅️', '-');
    }
    else {
        keyboard.text(ctx.i18n('auto'), 'default');
    }
    if (ctx.from) {
        keyboard.row().text(ctx.i18n('cancel'), `cancel,${ctx.from.id}`);
    }
    return keyboard;
};
exports.getKeyboard = getKeyboard;
const getTypeKeyboard = (ctx) => {
    const keyboard = new grammy_1.InlineKeyboard();
    ['attheme', 'tgx-theme', 'tgios-theme'].forEach(type => keyboard.text(`${ctx.i18n(type)} (.${type})`, type).row());
    return keyboard;
};
exports.getTypeKeyboard = getTypeKeyboard;
