import render from './src/lib/preview/render-pool.js';
import  {
    MINIMALISTIC_TEMPLATE,//移动端主题
    REGULAR_TEMPLATE, //移动端主题
    NEW_TEMPLATE,
    DESKTOP_TEMPLATE, //桌面模板
} from "./src/lib/preview/preview-maker.js";

import fs from "node:fs";
let buffer=fs.readFileSync("TwilightEbony.attheme")
render({
    theme:buffer,
    name:"",
    template:MINIMALISTIC_TEMPLATE,
}).then((preview: any)=>{
    fs.writeFileSync("TwilightEbony.png",preview)
    console.log("完成!")
})
