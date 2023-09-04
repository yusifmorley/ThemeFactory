"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPhoto = exports.downloadFile = void 0;
const env_1 = __importDefault(require("../env"));
const promises_1 = __importDefault(require("fs/promises"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const getFileLink = async (ctx, fileId) => {
    const file = await ctx.api.getFile(fileId);
    if (env_1.default.LOCAL_API_ROOT && file.file_path) {
        return file.file_path;
    }
    return `${env_1.default.API_ROOT}/file/bot${env_1.default.BOT_TOKEN}/${file.file_path}`;
};
const getPhoto = async (link, forceDownload = false) => {
    if (env_1.default.LOCAL_API_ROOT) {
        if (!forceDownload) {
            return link;
        }
        return promises_1.default.readFile(link);
    }
    const response = await node_fetch_1.default(link);
    return response.buffer();
};
const downloadFile = async (ctx, forceDownload = false) => {
    if (!ctx.msg) {
        throw new Error('Missing `ctx.msg`');
    }
    const message = ctx.msg.reply_to_message ?? ctx.msg;
    if (!message.document) {
        throw new Error('Missing `message.document`');
    }
    const documentId = message.document.file_id;
    const link = await getFileLink(ctx, documentId);
    return getPhoto(link, forceDownload);
};
exports.downloadFile = downloadFile;
const downloadPhoto = async (ctx, forceDownload = false) => {
    if (!ctx.msg) {
        throw new Error('Missing `ctx.msg`');
    }
    else if (!ctx.msg.photo || ctx.msg.photo.length === 0) {
        throw new Error('Missing `ctx.msg.photo`');
    }
    const photos = ctx.msg.photo;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const photo = photos.pop().file_id;
    const link = await getFileLink(ctx, photo);
    return getPhoto(link, forceDownload);
};
exports.downloadPhoto = downloadPhoto;
