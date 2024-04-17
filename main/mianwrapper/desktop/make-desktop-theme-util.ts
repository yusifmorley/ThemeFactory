//主题创建的核心逻辑
//提供两种颜色 主次颜色 和背景 图片生成桌面主题
// 主颜色 为windowbg
// 次颜色 为字体颜色
//我们把主题分为亮色 和暗色 两套 模板
// @ts-ignore
import JSZip from "jszip";
import bt from "./black-tm"
import lt from "./light-tm"
import log from '../../../lib/config/log_config.js'
export default async function makeThemeDesktop(colorArray:string[],bgbase64,str0="",str2="") {
    let BGColor:string="", customColor:string="";
    if (colorArray !== null) {
        BGColor = colorArray[1] //黑或者白色
        customColor = colorArray[0] //来自图片里的强调色
    }
    log.info(`背景色为${BGColor}  强调色为${customColor}}`)
    if (BGColor === "#000000") {
        str0="theme-Amoled"
    } else {
        str0="theme-Light"
    }
    return await lt(colorArray,bgbase64,str0)
}
