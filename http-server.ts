
import * as http from 'http';
/*
nohup npx ts-node http-server.ts
ctrl + z
bg
disown -a
 */
import {basePicCreateColorPic} from "./main/mianwrapper/android/theme-colors-and-pic";
import {basePicCreateTheme} from './main/mianwrapper/android/theme-colors-and-pic';
import log from './lib/config/log_config'
import {createPreview} from './main/mianwrapper/preview/theme-preview';
import {basePicCreateDesktop} from "./main/mianwrapper/desktop/theme-desktop-api";
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
        log.error(e)
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}/`);
});
