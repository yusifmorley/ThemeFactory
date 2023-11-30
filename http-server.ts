
import * as http from 'http';
/*
ctrl + z
bg
disown -a
 */
import {basePicCreateColorPic} from "./wrapper/android/theme-colors-and-pic";
import {basePicCreateTheme} from './wrapper/android/theme-colors-and-pic';
import log from './config/log_config.js'
import {createPreview} from './wrapper/preview/theme-preview';
import {basePicCreateDesktop} from "./wrapper/desktop/theme-desktop-api";
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
