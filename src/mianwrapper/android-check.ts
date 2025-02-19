import render from '../lib/preview/render-pool.js';
import  {
    MINIMALISTIC_TEMPLATE,//移动端主题
    REGULAR_TEMPLATE, //移动端主题
    NEW_TEMPLATE,
    DESKTOP_TEMPLATE, //桌面模板
} from "../lib/preview/preview-maker.js";
import fs from "fs";
import path from "path";
import loge from "../lib/config/log_config";

let log=loge.getLogger(`${__filename}`);

// 检查目录
const checkDireDe = (dir) => {
    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
        if (err) {
            log.error(`无法读取目录: ${err}`);
            return;
        }

        entries.forEach(entry => {
            if (entry.isDirectory()) {
                const folderPath = path.join(dir, entry.name);
                checkPngInFolder(folderPath);
            }
        });
    });
};

// 检查文件夹中是否包含 PNG 文件
const checkPngInFolder = (folderPath) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            log.error(`无法读取文件夹: ${err}`);
            return;
        }
       let dP=''
        const hasPng = files.some(
            file => {
                if(path.extname(file).toLowerCase()===".tdesktop-theme") {
                    dP=path.join(folderPath,file);
                }
               return  path.extname(file).toLowerCase() === '.png'}
        );

        if (!hasPng) {
            createPngFromTdesktopTheme(folderPath,dP);
        }
    });
};

// 根据 tdesktop-theme 文件创建 PNG 文件
const createPngFromTdesktopTheme = (folderPath,dP) => {
    log.log(`目录${folderPath}没有png `)
    log.log(`开始创建PNG`)
    let buffer=fs.readFileSync(dP)
    render({
        theme:buffer,
        name:"",
        template:DESKTOP_TEMPLATE,
    }).then((preview: any)=>{
        fs.writeFileSync(path.join(folderPath,"捕获.png"),preview)
    }).then(()=>{
        log.log(`创建PNG结束`)
    })

};

// 指定要检查的目录

export default checkDireDe
