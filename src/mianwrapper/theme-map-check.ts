import fs from "node:fs";
import path from "path";
import logger from "../lib/config/log_config";
import  {
    MINIMALISTIC_TEMPLATE,//移动端主题
    REGULAR_TEMPLATE, //移动端主题
    NEW_TEMPLATE,
    DESKTOP_TEMPLATE, //桌面模板
} from "../lib/preview/preview-maker.js";
import render from '../lib/preview/render-pool.js';
let log = logger.getLogger(`${__filename}`);
const basePath = "public/myserver-bot-public";
const androidPath = path.join(basePath, "attheme");
const desktopPath = path.join(basePath, "desk");
const androidSourcePath = path.join(basePath, "source", "attheme");
const desktopSourcePath = path.join(basePath, "source", "desk");

const dArr = [];
const aArr = [];
const sourceDArr = [];
const sourceAArr = [];
const exportD=[]
const exportA=[]
function readDirectory(dirPath, arr, isSource = false, maxLength = 32) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) return log.error(`不能阅读目录: ${dirPath}`);
            files.forEach(file => {
                const filePath = path.join(dirPath, file);
                const stat = fs.statSync(filePath);
                let strings = file.split(".");
                //源文件
                //检查文件名长度
                if (isSource && strings[0].length > 36) {
                    // 若文件名长度大于32 新文件名为0，32 字符
                    let newName= crypto.randomUUID()
                    let newFileName= newName+"."+strings[1];
                    fs.renameSync(filePath,path.join(dirPath, newFileName));
                    arr.push(newName)
                }else {
                    arr.push(strings[0]);
                }
            });
            resolve(null)
        });

})
}

function compareAndProduce(sourceDir:string[], destinationDir:string[]) {
     return  sourceDir.filter(i=>!destinationDir.includes(i));
}
//生产目标
async function generateTarget(themeArr:string[],type:boolean) {
    if(type){//true为 安卓主题
        let template=MINIMALISTIC_TEMPLATE;
        for (const string of themeArr) {
            //拼接 路径
        let sourcePath = path.join(basePath,"source","attheme", string+".attheme");
        let targetPath = path.join(basePath,"attheme",string+".png");
        let buffer = fs.readFileSync(sourcePath);
        await render({
                theme:buffer,
                name:string,
                template,
        }).then((e)=>{
            fs.writeFileSync(targetPath, e);
        }).catch(err=>{
            console.log(err)
        })

        }
    }
    else {
       let template=DESKTOP_TEMPLATE;
            //desktop theme
        for (const string of themeArr) {
            //拼接 路径
            let sourcePath = path.join(basePath,"source","desk", string+".tdesktop-theme");
            let targetPath = path.join(basePath,"desk",string+".png");
            let buffer = fs.readFileSync(sourcePath);
            await render({
                theme:buffer,
                name:string,
                template,
            }).then((e)=>{
                fs.writeFileSync(targetPath, e);
            }).catch(err=>{
                console.log(err)
            })

        }

    }
}

// Initialize directories (for Android and Desktop)
function initArr() {
   Promise.all( [readDirectory(desktopPath, dArr), // Desktop directories
                       readDirectory(androidPath, aArr),  // Android directories
                       readDirectory(desktopSourcePath, sourceDArr, true),  // Desktop source files
                       readDirectory(androidSourcePath, sourceAArr, true)   // Android source files
        ]).then(()=>{
       let dTheme = compareAndProduce(sourceDArr,dArr);
       let aTheme = compareAndProduce(sourceAArr,aArr);
       if (aTheme.length > 0) {
           log.info(`安卓主题不同步,个数${aTheme.length}，正在生成预览`)
           //开始创建安卓主题预览
           generateTarget(aTheme,true)
       }
       else {
           log.info("安卓主题预览完整")
       }
       if (dTheme.length > 0) {
           log.info(`桌面主题不同步,个数${dTheme.length}，正在生成预览`)
           //开始创建桌面主题预览
           generateTarget(dTheme,false)
       }else {
           log.info("桌面主题预览完整")
       }
   }).then(()=>{
       exportA.push( ...sourceAArr.map(e=>[e+'.attheme',e+'.png']))
       exportD.push( ...sourceDArr.map(e=>[e+'.tdesktop-theme',e+'.png']))
   })
}
//获取
initArr()
export {exportA,exportD};
