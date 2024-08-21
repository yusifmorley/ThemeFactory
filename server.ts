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

const port=3000;
let  app = express()
const staticPath="public/tempelete/tohuemodle"
app.use(express.json())
app.use(cors())
app.use(express.static(staticPath))
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
       android_black:fs.readdirSync("public/tempelete/tohuemodle/android/black"),
       android_white:fs.readdirSync("public/tempelete/tohuemodle/android/white"),
       desktop_black:fs.readdirSync("public/tempelete/tohuemodle/desktop/black"),
       desktop_white:fs.readdirSync("public/tempelete/tohuemodle/desktop/white"),
   }
    res.end(JSON.stringify(tree));
})


// 桌面模板应用类
app.post("/templete-editor/",async(req,res)=>{
    let kind=req.body.kind;
    let type=req.body.type;
    let moudle=req.body.moudle;
    let targetHue=req.body.hue;
    let picBuffer = Buffer.from(dataUriToBuffer(req.body.pic).buffer);


})

app.listen(port, () => {
    log.info(`app 已经运行 端口: ${port}`)
})
