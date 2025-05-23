import logger from "../lib/config/log_config";
import checkDirectoriesAn from "../mianwrapper/desktop-check";
import checkDireDe from "../mianwrapper/android-check";
import express from "express";
import cors from "cors";
import BodyParser from "body-parser";
import {exportA, exportD} from "../mianwrapper/theme-map-check";
import {
    basePicCreateColorPic,
    basePicCreateTheme
} from "../mianwrapper/android/OriginImpletement/theme-colors-and-pic-api";
import {createPreview} from "../mianwrapper/preview/theme-preview-api";
import {basePicCreateDesktop} from "../mianwrapper/desktop/OriginImpletement/theme-desktop-api";
import {AndroidBlack} from "../mianwrapper/templete/android/black";
import {AndroidWhite} from "../mianwrapper/templete/android/white";
import {DesktopBlack} from "../mianwrapper/templete/desktop/black";
import {DesktopWhite} from "../mianwrapper/templete/desktop/white";
import {dataUriToBuffer} from "data-uri-to-buffer";
import process from "node:process";
import * as fs from "node:fs";
import https from "node:https";
import http from "http";
import db from "../db/mysql-use"
import {theme_editor_logAttributes} from "../db/models/theme_editor_log";
import themeInfo from "../mianwrapper/templete/base-theme-info"
import tmp from 'tmp'
import map from "../restore/pubmap";
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

app.use((err, req, res, next) => {
    // logic
    log.error(err.toString());
})


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
// app.post("/android*",async(req,res)=>{
//     await createPreview(req,res);
// })
// //桌面预览创建
// app.post("/desktop*",async(req,res)=>{
//     await  createPreview(req,res);
// })

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
    res.end(JSON.stringify(themeInfo));
})


// 桌面模板应用类
app.post("/templete-editor/",async(req,res)=>{
    let kind=req.body.kind;
    let type=req.body.type;
    let model=req.body.model;
    let targetHue=parseInt(req.body.hue);
    let targetS=parseInt(req.body.sat);
    let targetL=parseInt(req.body.lig);
    let alpha= parseFloat(req.body.alpha);
    let tName=`${kind}-${model}-${targetHue}-${targetS}-${targetL}-${alpha}`;
    //记录 使用情况
    let mysqlLog:theme_editor_logAttributes={
        kind:kind=="android"?0:1,
        ip:req.ip,
        date:new Date()
    }
    await db.theme_editor_log.create(mysqlLog)
    // log.info(`alpha的值为${alpha}`)
    let picBuffer = Buffer.from(dataUriToBuffer(req.body.pic).buffer);
    let newVar:any;
    res.set({
        'content-type': 'text/plain',
    })

    if (kind=="android"){
        if (type=="white"){
            newVar = AndroidWhite.androidWhiteMap.get(model);
        }
        else {
            newVar = AndroidBlack.androidBlackMap.get(model);
        }
    }else {
        if (type=="white"){
            newVar = DesktopWhite.desktopWhiteMap.get(model);
        }
        else {
            newVar = DesktopBlack.desktopBlackMap.get(model);
        }
    }
    // console.log(newVar)
    //读取模板
    //@ts-ignore
    let tf=tmp.fileSync();
    let newName= crypto.randomUUID()
    if (kind=="android"){
        newName=newName+"L";
        let bu= newVar.translateHue(targetHue,targetS,targetL, picBuffer,alpha)
        fs.writeFileSync(tf.fd,bu);
        fs.closeSync(tf.fd)
        map.set(newName,{tempName:tf.name,themeName:tName});
        res.end(newName);
    }
    else{
        newVar.translateHue(targetHue,targetS,targetL, picBuffer,alpha).then(e=>{
            newName=newName+"M";
            fs.writeFileSync(tf.fd,e);
            map.set(newName,{tempName:tf.name,themeName:tName});
            res.end(newName)
            fs.closeSync(tf.fd)

        })
    }
    log.info(`收到模板制作主题请求，种类 :${kind}, type:${type}, moudle:${model},图片大小: ${picBuffer.length}KB`);
})

let httpsServer:any
if(process.env.NODE_ENV!=="dev"){
    log.info("生产环境启用")
    // ip=="167.179.118.142"
    const options = {
        key:  fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/privkey.pem','utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/fullchain.pem','utf8'),
        ca:   fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/chain.pem', 'utf8')
    };
     httpsServer = https.createServer(options, app);
}else {
     log.info("开发环境启用")
     httpsServer = http.createServer(app);
}

function initHttp() {
    httpsServer.listen(port, () => {
        log.info(`https: app  已经运行 端口: ${port}`)
    })
}
export {initHttp}
