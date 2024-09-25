/*
nohup npx ts-node server.ts
ctrl + z
bg
disown -a
 */
import {basePicCreateColorPic, basePicCreateTheme} from './src/mianwrapper/android/OriginImpletement/theme-colors-and-pic-api';
import {createPreview} from './src/mianwrapper/preview/theme-preview-api';
import {basePicCreateDesktop} from "./src/mianwrapper/desktop/OriginImpletement/theme-desktop-api";
import log from "./src/lib/config/log_config";
import express from "express"
import cors from "cors"
import fs from "fs";
import { dataUriToBuffer } from 'data-uri-to-buffer';
import {AndroidBlack} from "./src/mianwrapper/templete/android/black";
import {AndroidWhite} from "./src/mianwrapper/templete/android/white";
import {DesktopBlack} from "./src/mianwrapper/templete/desktop/black";
import {DesktopWhite} from "./src/mianwrapper/templete/desktop/white";
import path from "path";
import {translteHueAn} from "./src/lib/wapper/analyseColor-a";
import {translateHueDe} from "./src/lib/wapper/analyseColor-d";
import BodyParser from "body-parser";
import checkDirectoriesAn from "./src/mianwrapper/DesktopCheck";
import checkDireDe from "./src/mianwrapper/AndroidCheck";
import * as https from "node:https";
import http from "http";

//目录对应模板集合
const targetAnb = 'public/tempelete/tohuemodle/android/black'; // 替换为你的目录路径
const targetAnw = 'public/tempelete/tohuemodle/android/white'; // 替换为你的目录路径
checkDirectoriesAn(targetAnb);
checkDirectoriesAn(targetAnw);

const targetBl = 'public/tempelete/tohuemodle/desktop/black'; // 替换为你的目录路径
const targetWh='public/tempelete/tohuemodle/desktop/white'
checkDireDe(targetBl);
checkDireDe(targetWh);



let ip
const port=3000;
let  app = express()

const staticPath="public/tempelete/tohuemodle"
app.use(cors({
    origin: '*' // 允许的来源
}))
app.use(express.static(staticPath))
app.use(BodyParser.json({limit: '210000kb'}))

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
       desktop_black:[...DesktopBlack.desktopBalckMap.keys()],
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
            newVar= DesktopWhite.desktopWhiteMap.get(moudle);
        }
        else {
             newVar = DesktopBlack.desktopBalckMap.get(moudle);
        }
    }
   // console.log(newVar)
    let buffer = fs.readFileSync(path.join(staticPath,kind,type,moudle,newVar.tP));
    if (kind=="android"){
       let bu= translteHueAn(buffer,targetHue,newVar.mianColorSelect,picBuffer)
        res.end(bu,"binary");
    }
    else{
      translateHueDe(buffer, targetHue, newVar.mianColorSelect, picBuffer).then(e=>{
          res.end(e,"binary")
      })
    }
})

if(1){
    // ip=="167.179.118.142"
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/privkey.pem','utf8'),
        cert: fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/fullchain.pem','utf8'),
        ca :fs.readFileSync('/etc/letsencrypt/live/www.yusme.link/chain.pem', 'utf8')
    };
    let httpsServer = https.createServer(options, app);
    httpsServer.listen(port, () => {
        log.info(`https : app  已经运行 端口: ${port}`)
    })

    let httpsServerS = http.createServer(app);
    httpsServerS.listen(5000, () => {
        log.info(`app 已经运行 端口: ${5000}`)
    })

}else {
    // ip="127.0.0.1"
    let httpsServer = http.createServer(app);
    httpsServer.listen(5000,() => {
        log.info(`app 已经运行 端口: ${port}`)
    })

}

