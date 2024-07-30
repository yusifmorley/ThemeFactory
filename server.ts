/*
nohup npx ts-node server.ts
ctrl + z
bg
disown -a
 */
import {basePicCreateColorPic, basePicCreateTheme} from './src/mianwrapper/android/theme-colors-and-pic-api';
import {createPreview} from './src/mianwrapper/preview/theme-preview-api';
import {basePicCreateDesktop} from "./src/mianwrapper/desktop/theme-desktop-api";
import log from "./src/lib/config/log_config";
import {app} from "./src/lib/store/expree";
const port=3000;
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
// 安卓模板应用类
app.post("/attheme/templete/:type/:id",async(req,res)=>{

})
// 桌面模板应用类
app.post("/desktop/templete/:type/:id",async(req,res)=>{

})

app.listen(port, () => {
    log.info(`app 已经运行 端口: ${port}`)
})
