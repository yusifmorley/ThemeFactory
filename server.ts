/*
nohup npx ts-node server.ts
ctrl + z
bg
disown -a
 */
import {basePicCreateColorPic, basePicCreateTheme} from './src/mianwrapper/android/OriginImpletement/theme-colors-and-pic-api';
import {createPreview} from './src/mianwrapper/preview/theme-preview-api';
import {basePicCreateDesktop} from "./src/mianwrapper/desktop/OriginImpletement/theme-desktop-api";
import logger from "./src/lib/config/log_config";
import express from "express"
import cors from "cors"
import fs from "fs";
import { dataUriToBuffer } from 'data-uri-to-buffer';
import {AndroidBlack} from "./src/mianwrapper/templete/android/black";
import {AndroidWhite} from "./src/mianwrapper/templete/android/white";
import {DesktopBlack} from "./src/mianwrapper/templete/desktop/black";
import {DesktopWhite} from "./src/mianwrapper/templete/desktop/white";
import BodyParser from "body-parser";
import checkDirectoriesAn from "./src/mianwrapper/desktop-check";
import checkDireDe from "./src/mianwrapper/android-check";
import * as https from "node:https";
import http from "http";
import * as process from "node:process";
import { Telegraf } from 'telegraf'
import {devObject,proObject} from "./config";
import HttpsProxyAgent  from 'https-proxy-agent'
import {exportA, exportD} from "./src/mianwrapper/theme-map-check";
import path from "path";

let log=logger.getLogger(`${__filename}`);
//目录对应模板集合
const targetAnb = 'public/tempelete/tohuemodle/android/black'; // 替换为你的目录路径
const targetAnw = 'public/tempelete/tohuemodle/android/white'; // 替换为你的目录路径
checkDirectoriesAn(targetAnb);
checkDirectoriesAn(targetAnw);

const targetBl = 'public/tempelete/tohuemodle/desktop/black'; // 替换为你的目录路径
const targetWh='public/tempelete/tohuemodle/desktop/white'
checkDireDe(targetBl);
checkDireDe(targetWh);
const port=3000;

let  app = express()
const staticPath="public/tempelete/tohuemodle"
app.use(cors({
    origin: '*' // 允许的来源
}))

let statics=["public/tempelete/tohuemodle",
    "public/myserver-bot-public/attheme",
    "public/myserver-bot-public/desk",
    "public/myserver-bot-public/source/attheme",
    "public/myserver-bot-public/desk",
    ]
statics.forEach(s=>{
        app.use(express.static(s,{
            cacheControl:true,
            maxAge: 604800
        }))
})


app.use(BodyParser.json({limit: '210000kb'}))
app.get('/attheme', (req, res) => {
    res.send(exportA)
})
app.get('/desk', (req, res) => {
    res.send(exportD)
})

app.get('/test', (req, res) => {
    res.send('Hello World!')
})
//获取图片的 颜色图片
app.post("/colorlist",async (req,res)=>{
    await basePicCreateColorPic(req,res);
})
//安卓预览创建
app.post("/android*",async(req,res)=>{
   await createPreview(req,res);
})
//桌面预览创建
app.post("/desktop*",async(req,res)=>{
  await  createPreview(req,res);
})

//创建 不透明安卓主题
app.post("/attheme-create",async(req,res)=>{
  await  basePicCreateTheme(req,res);
})
//创建 透明安卓主题
app.post("/attheme-create/tran",async(req,res)=>{
   await basePicCreateTheme(req,res);
})
//创建桌面主题
app.post("/tdesktop-create",async (req,res)=>{
   await basePicCreateDesktop(req,res);
})

//模板信息类
app.get("/templete-info",async (req,res)=>{
    let tree={
       android_black:[...AndroidBlack.androidBlackMap.keys()],
       android_white:[...AndroidWhite.androidWhiteMap.keys()],
       desktop_black:[...DesktopBlack.desktopBlackMap.keys()],
       desktop_white:[...DesktopWhite.desktopWhiteMap.keys()],
   }
    res.end(JSON.stringify(tree));
})


// 桌面模板应用类
app.post("/templete-editor/",async(req,res)=>{
    let kind=req.body.kind;
    let type=req.body.type;
    let moudle=req.body.moudle;
    let targetHue=parseInt(req.body.hue);
    let targetS=parseInt(req.body.sat);
    let targetL=parseInt(req.body.lig);
    let alpha= parseFloat(req.body.alpha);
    // log.info(`alpha的值为${alpha}`)
    let picBuffer = Buffer.from(dataUriToBuffer(req.body.pic).buffer);
    let newVar:any;
    let filename=kind=="android"?"yusif.attheme":"yusif.tdesktop-theme"
    res.set({
        'content-type': 'application/octet-stream',
        'content-disposition': 'attachment;filename=' + encodeURI(filename)
    })

    if (kind=="android"){
        if (type=="white"){
            newVar = AndroidWhite.androidWhiteMap.get(moudle);
        }
        else {
            newVar = AndroidBlack.androidBlackMap.get(moudle);
        }
    }else {
        if (type=="white"){
            newVar = DesktopWhite.desktopWhiteMap.get(moudle);
        }
        else {
             newVar = DesktopBlack.desktopBlackMap.get(moudle);
        }
    }
    // console.log(newVar)
    //读取模板
    if (kind=="android"){
       let bu= newVar.translateHue(newVar.getBuffer(),targetHue,targetS,targetL,newVar.mainColorSelect,picBuffer,alpha)
       res.end(bu,"binary");
    }
    else{
        newVar.translateHue(newVar.getBuffer(), targetHue,targetS,targetL, newVar.mainColorSelect, picBuffer,alpha).then(e=>{
          res.end(e,"binary")
      })
    }
    log.info(`收到模板制作主题请求，种类 :${kind}, type:${type}, moudle:${moudle},图片大小: ${picBuffer.length}KB`);
})
let botApi:string
let httpAgent
if(process.env.NODE_ENV!=="dev"){
    botApi=proObject.botApi

    log.info("生产环境启用")
    // ip=="167.179.118.142"
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/privkey.pem','utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/fullchain.pem','utf8'),
        ca :fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/chain.pem', 'utf8')
    };
    let httpsServer = https.createServer(options, app);
    httpsServer.listen(port, () => {
        log.info(`https: app  已经运行 端口: ${port}`)
    })
}else {
    botApi=devObject.botApi
    httpAgent= HttpsProxyAgent("http://127.0.0.1:10810");
    log.info("开发环境启用")
    let httpsServer = http.createServer(app);
    httpsServer.listen(port,() => {
        log.info(`app 已经运行 端口: ${port}`)
    })
}

let bot = new Telegraf(botApi,{
    telegram:{agent:httpAgent}
});
bot.command("start",(ctx)=>{
    try {
        let basePath="public/myserver-bot-public/source"
        if(ctx.args.length==0)
            return;
        let arStr=ctx.args[0]
        let  fileName=arStr.substring(0,arStr.length-1)
        if (arStr.endsWith("A")) {
            fileName=fileName+".attheme"
            //发送文件
            let filePath=path.join(basePath,"attheme",fileName)
            ctx.telegram.sendDocument(ctx.from.id, {
                source: fs.readFileSync(filePath),
                filename: path.join("attheme",fileName)})
        }
        //处理安卓
        if (ctx.args[0].endsWith("D")){
            //处理桌面
            fileName=fileName+".tdesktop-theme"
            //发送文件
            let filePath=path.join(basePath,"desk",fileName)
            ctx.telegram.sendDocument(ctx.from.id, {
                source: fs.readFileSync(filePath),
                filename: path.join("desk",fileName)})
        }
    }catch (e){
        log.error(e)
    }
})

bot.launch().then(()=>{
    log.info("bot启动成功")
})
