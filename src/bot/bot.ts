//@ts-nocheck
import process from "node:process";
import {devObject, proObject} from "../../config";

import HttpsProxyAgent from "https-proxy-agent";
import {Telegraf} from "telegraf";
import path from "path";
import logger from "../lib/config/log_config";
import iMod from "../db/mysql-use";
import map from "../restore/pubmap";
import * as fs from "node:fs";

let log=logger.getLogger(`${__filename}`);
let botApi:string
let httpAgent:any

if(process.env.NODE_ENV!=="dev"){
    botApi=proObject.botApi
}else {
    botApi=devObject.botApi
    httpAgent= HttpsProxyAgent("http://127.0.0.1:10810");
}
// console.log(httpAgent);
function initBot() {
    let bot = new Telegraf(botApi,{
        telegram:{agent:httpAgent}
    });
    bot.command("start",(ctx)=>{
        try {
            let basePath="public/myserver-bot-public/source"
            if(ctx.args.length==0)
                return;
            let arStr=ctx.args[0]
            if (arStr.length==0)
                return;
            let fileName=arStr.substring(0,arStr.length-1)
            if (arStr.endsWith("A")) {
                iMod.jump_to_theme.create({
                    type:0,
                    theme_name:fileName,
                    date:new Date(),
                })
                fileName=fileName+".attheme"
                //发送文件
                let filePath=path.join(basePath,"attheme",fileName)
                ctx.telegram.sendDocument(ctx.from.id, {
                    source: fs.readFileSync(filePath),
                    filename: path.join("attheme",fileName)})
            }
            //处理安卓
            if (ctx.args[0].endsWith("D")){
                iMod.jump_to_theme.create({
                    type:1,
                    theme_name:fileName,
                    date:new Date(),
                })
                //处理桌面
                fileName=fileName+".tdesktop-theme"
                //发送文件
                let filePath=path.join(basePath,"desk",fileName)
                ctx.telegram.sendDocument(ctx.from.id, {
                    source: fs.readFileSync(filePath),
                    filename: path.join("desk",fileName)})
            }
            //安卓
            if (ctx.args[0].endsWith("L")){
                let fd = map.get(ctx.args[0]);
                let buffer =fs.readFileSync(fd.tempName)
                ctx.telegram.sendMessage(ctx.from.id, "请使用安卓版telegram打开主题文件")
                ctx.telegram.sendDocument(ctx.from.id, {
                        source: buffer,
                        filename: fd.themeName+".attheme"})
                fs.rmSync(fd.tempName);
                log.info(`已经使用Bot跳转,路径 ${fd.tempName}`)
            }
            //桌面
            if (ctx.args[0].endsWith("M")){
                let fd = map.get(ctx.args[0]);
                let buffer = fs.readFileSync(fd.tempName);
                ctx.telegram.sendMessage(ctx.from.id, "请使用桌面版telegram打开主题文件")
                ctx.telegram.sendDocument(ctx.from.id, {
                    source: buffer,
                    filename: fd.themeName+".tdesktop-theme"})
                fs.rmSync(fd.tempName);
                log.info(`已经使用Bot跳转,路径 ${fd.tempName}`)
            }
        }catch (e){
            log.error(e)
        }
    })

    bot.launch(()=>{
        log.info("bot已经启动了");
    })
}
export {initBot}
