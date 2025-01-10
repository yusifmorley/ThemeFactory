//主题创建的核心逻辑
//提供两种颜色 主次颜色 和背景 图片生成桌面主题
// 主颜色 为windowbg
// 次颜色 为字体颜色
//我们把主题分为亮色 和暗色 两套 模板
// @ts-ignore
import JSZip from "jszip";
import bt from "./black-tm"
import lt from "./light-tm"
import loge from "../../../lib/config/log_config";
import is_light from "../../../lib/util/light-darkdem";

let log=loge.getLogger(`${__filename}`);
export default async function makeThemeDesktop(colorArray:string[],bgbase64,flag=false) {
    log.info(`背景色为${colorArray[0]},强调色为${colorArray[1]}, 辅助色 ${colorArray[2]} 透明为 ${flag} }`)
    if (is_light(colorArray[0])){
        //亮色
        return await lt(colorArray,bgbase64,flag)
    }else {
        //暗色
        return await bt(colorArray,bgbase64,flag)
    }
}
