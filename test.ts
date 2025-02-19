import fs from "node:fs";
import path from "path";
import logger from "./src/lib/config/log_config";
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
function readDirectory(dirPath, arr, isFile = false, maxLength = 32) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) return log.error(`不能阅读目录: ${dirPath}`);
            files.forEach(file => {
                const filePath = path.join(dirPath, file);
                const stat = fs.statSync(filePath);
                if (isFile ? stat.isFile() : stat.isDirectory()) {
                    if (isFile) {
                        //源文件
                        //检查文件名长度

                        let strings = file.split(".");
                        if (strings[0].length > 32) {
                           let newFileName= crypto.randomUUID()+"."+strings[1];
                            fs.renameSync(filePath,path.join(dirPath, newFileName));
                            //TODO 流程图
                            arr.push()
                        }else {
                            arr.push(file);
                        }

                    } else {
                        //目标文件
                        arr.push(file);
                    }
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
function generateTarget() {

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
           //开始创建安卓主题预览

       }
       if (dTheme.length > 0) {
           //开始创建桌面主题预览

       }
   })
}

initArr()

// export {dArr, aArr};
