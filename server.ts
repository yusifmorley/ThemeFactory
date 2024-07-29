
import * as http from 'http';
/*
nohup npx ts-node server.ts
ctrl + z
bg
disown -a
 */
import {basePicCreateColorPic} from "./src/mianwrapper/android/theme-colors-and-pic-api";
import {basePicCreateTheme} from './src/mianwrapper/android/theme-colors-and-pic-api';
import {createPreview} from './src/mianwrapper/preview/theme-preview-api';
import {basePicCreateDesktop} from "./src/mianwrapper/desktop/theme-desktop-api";
import log from "./src/lib/config/log_config";
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
