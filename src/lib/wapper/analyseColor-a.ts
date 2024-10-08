import * as fs from 'node:fs';
import {TdesktopTheme} from "tdesktop-theme/node";
import  tinycolor from "tinycolor2";
import HSLA = tinycolor.ColorFormats.HSLA;
import {NAttheme as Attheme} from "./NAttheme";
import loge from "../config/log_config";

let log = loge.getLogger(__filename);

const chatBg="chat_inBubble"
const chatBgOut="chat_outBubble"
//原模板
export function translteHueAn(buff:Buffer,toHueColor:number,targetS:number,targetL:number,mianColorSelect:string,background:Buffer,alphaT:number=1){
    let ta=new Attheme(buff)

    // 目标hue
    // sideBarBgActive 为主要改变颜色 标准
    // @ts-ignore
    let {red:r,green:g,blue:b,alpha:a} = ta.get(mianColorSelect)
    let instance = tinycolor({ r,g,b,a});
    let {h:mianH,s:mianS}=instance.toHsl()

    let en=ta.getVariablesList()
    for (const e of en) {
        let kp:HSLA;
        let po= ta.get(e)
        // @ts-ignore
        let {red:r,green:g,blue:b,alpha:a} = ta.get(e)

        kp=  tinycolor({ r,g,b,a}).toHsl()
        let minH=kp.h-mianH
        let minS=(kp.s-mianS)*100
        // hue 上下 15
        if(minH<15 && minH>-15){
            kp.h=toHueColor
            if(minS<30 && minS>-30){
                kp.l=targetL/100
            }
            let {r:red,g:green,b:blue,a:alpha}= tinycolor(kp).toRgb()
            ta.set(e,{red,green,blue,alpha:a})
        }
    }
   // console.log(alphaT)
    if (alphaT<1){
       // log.info(`${alphaT}`)
        // @ts-ignore
        let {red:r,green:g,blue:b} = ta.get(chatBg)
        ta.set(chatBg,{red:r,green:g,blue:b,alpha:Math.floor(alphaT*255)})
    }
    //@ts-ignore
    ta.set(chatBgOut,ta.get(chatBg))
    ta.setWallpaper(background)
    return ta.toFile()
}

