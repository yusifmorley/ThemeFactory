const token = process.env.TOKEN;

const Telegraf = require(`telegraf`);
const bot = new Telegraf(token);
const request = require(`request-promise`);
const atthemeEditorApi = require(`attheme-editor-api`);
const render = require(`./render-pool`);
const path = require(`path`);
const {
  MINIMALISTIC_TEMPLATE,//移动端主题
  REGULAR_TEMPLATE, //移动端主题
  NEW_TEMPLATE,
  DESKTOP_TEMPLATE, //桌面模板
} = require(`./preview-maker`);
const RESEND_ON_ERRORS = [`RequestError`, `FetchError`];

const handleRenderError = async (context, error) => {
  console.error(error);
  if (
    context.updateType == `callback_query` ||
    context.message.chat.type === `private`
  ) {
    await context.reply(
      `An error happened while making the preview. It may be a problem with your theme, or a bug in the bot. If you think it's the latter, please forward this message to @snejugal.

<pre>${error}</pre>`,
      { parse_mode: `HTML` }
    );
  }
};

bot.context.downloadFile = async function (fileId) {
  if (!fileId) {
    fileId = this.callbackQuery.message.reply_to_message.document.file_id;
  }

  const file = await bot.telegram.getFile(fileId);
  const fileContent = await request({
    encoding: null,
    uri: `http://api.telegram.org/file/bot${token}/${file.file_path}`,
  });

  return fileContent;
};

const handleStart = async (context) => {
  const id = context.message.text.slice(`/start `.length).trim();

  if (id.length === 0) {
    try {
      await context.reply(
        `Send me an .attheme or a .tdesktop-theme file to create its preview`
      );
      return;
    } catch (err) {
      console.error(err);
      return;
    }
  }
  const { name, theme } = await atthemeEditorApi.downloadTheme(id);
  let preview;
  try {
    preview = await render({
      theme,
      name,
      template: NEW_TEMPLATE,
    });
  } catch (error) {
    handleRenderError(context, error);
    return;
  }

  const sendPreview = async () => {
    try {
      await context.replyWithPhoto(
        { source: preview },
        {
          reply_to_message_id: context.message.message_id,
          caption: `${name}\nCreated by @ThemePreviewBot`,
        }
      );
    } catch (error) {
      if (RESEND_ON_ERRORS.includes(error)) {
        process.nextTick(sendPreview);
      } else {
        console.error(error);
      }
    }
  };

  sendPreview();
};
const choose = async (context) => {
  const fileName = context.message.document.file_name;
  if (!fileName) {
    return;
  }
  const extenstion = path.extname(fileName);
  const name = path.basename(fileName, extenstion);

  if (![`.attheme`, `.tdesktop-theme`].includes(extenstion)) {
    return;
  }
  const isAttheme = extenstion === `.attheme`;
  if (
    isAttheme &&    //如果是移动主题就提供选择 Ordinary 和 Minimalistic
    ![`group`, `supergroup`].includes(context.message.chat.type)
  ) {
    try {
      await context.reply(`Select the style`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: `Ordinary`, callback_data: `ordinary` },
              { text: `Minimalistic`, callback_data: `minimalistic` },
            ],
          ],
        },
        reply_to_message_id: context.message.message_id,
      });
      return;
    } catch (err) {
      console.error(err);
      return;
    }
  }
//  不是移动端主题就 直接发送 桌面主题
  bot.telegram.sendChatAction(context.message.chat.id, `upload_photo`);
  let template = DESKTOP_TEMPLATE;
  let reply_markup = {};
  if (isAttheme) {  //移动端主题
    template = REGULAR_TEMPLATE;
    reply_markup = {
      inline_keyboard: [
        [{ text: `Minimalistic`, callback_data: `minimalistic` }],
      ],
    };
  }
  const theme = await context.downloadFile(context.message.document.file_id);

  let preview;
  try {
    preview = await render({
      theme,
      name,
      template,
    });
  } catch (error) {
    handleRenderError(context, error);
    return;
  }

  const sendPreview = async () => {
    try {
      await context.replyWithPhoto(
        { source: preview },
        {
          // eslint-disable-next-line camelcase
          reply_to_message_id: context.message.message_id,
          reply_markup,
          caption: isAttheme
            ? `Created by @ThemePreviewBot`
            : `Design by @voidrainbow`,
        }
      );
    } catch (error) {
      if (RESEND_ON_ERRORS.includes(error.name)) {
        process.nextTick(sendPreview);
      } else {
        console.error(error);
      }
    }
  };
  sendPreview();
};

const handleDocument = async (context) => {
  const callbackQuery = context.callbackQuery;
  const callbackMessage = callbackQuery.message;
  try {
    if (callbackMessage.text == `Select the style`) {
      await context.deleteMessage(callbackMessage.message_id);
    } else {
      await bot.telegram.editMessageCaption(
        callbackMessage.chat.id,
        callbackMessage.message_id,
        callbackMessage.message_id,
        `Updating the preview...`
      );
    }
  } catch (err) {
    console.error(err);
    return;
  }
  if (!callbackMessage.reply_to_message) return;
  try {
    await bot.telegram.sendChatAction(callbackMessage.chat.id, `upload_photo`);
  } catch (err) {
    console.error(err);
    return;
  }
  const fileName = callbackMessage.reply_to_message.document.file_name;
  const theme = await context.downloadFile();

  let preview;
  try {
    preview = await render({
      theme,
      name: fileName.replace(`.attheme`, ``),
      template:
        callbackQuery.data == `ordinary`
          ? REGULAR_TEMPLATE
          : MINIMALISTIC_TEMPLATE,
    });
  } catch (error) {
    handleRenderError(context, error);
    return;
  }

  const sendPreview = async () => {
    const reply_markup = {
      inline_keyboard: [
        [
          {
            text:
              callbackQuery.data === `ordinary` ? `Minimalistic` : `Ordinary`,
            callback_data:
              callbackQuery.data === `ordinary` ? `minimalistic` : `ordinary`,
          },
        ],
      ],
    };
    const caption =
      callbackQuery.data === `minimalistic`
        ? `Design by @voidrainbow`
        : `Created by @ThemePreviewBot`;
    try {
      if (callbackMessage.text === `Select the style`) {
        await context.replyWithPhoto(
          { source: preview },
          {
            reply_to_message_id: callbackMessage.reply_to_message.message_id,
            reply_markup,
            caption,
          }
        );
      } else {
        await context.editMessageMedia(
          { type: `photo`, media: { source: preview }, caption },
          { reply_markup }
        );
      }
    } catch (error) {
      if (RESEND_ON_ERRORS.includes(error.name)) {
        process.nextTick(sendPreview);
      } else {
        console.error(error);
      }
    }
  };
  sendPreview();
};

bot.start((context) => {
  handleStart(context);
});

bot.help((context) => {
  context.reply(`Send me an .attheme file to create its preview`);
});

bot.on(`document`, (context) => {
  choose(context);
});

bot.action([`ordinary`, `minimalistic`], (context) => {
  handleDocument(context);
});

bot.polling.offset = -100;
bot.startPolling();
