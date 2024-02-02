
import * as http from 'http';
/*
nohup npx ts-node http-server.ts
ctrl + z
bg
disown -a
 */
import {basePicCreateColorPic} from "./src/wrapper/android/theme-colors-and-pic";
import {basePicCreateTheme} from './src/wrapper/android/theme-colors-and-pic';
import log from './src/config/log_config.js'
import {createPreview} from './src/wrapper/preview/theme-preview';
import {basePicCreateDesktop} from "./src/wrapper/desktop/theme-desktop-api";
const port=3000;
const server = http.createServer(async (req, res) => {
    try {
        // 主题预览
        await createPreview(req,res);
        //创建attheme主题
        await basePicCreateTheme(req,res);
        //创建桌面主题
        await basePicCreateDesktop(req,res);
        //主题预览图片
        await basePicCreateColorPic(req,res);
    }catch (e){
        log.info(e)
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}/`);
});
