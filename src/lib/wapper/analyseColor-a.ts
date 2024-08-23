import * as fs from 'node:fs';
import {TdesktopTheme} from "tdesktop-theme/node";
import  tinycolor from "tinycolor2";
import HSVA = tinycolor.ColorFormats.HSVA;
import {NAttheme as Attheme} from "./NAttheme";
//原模板
export function translteHueAn(buff:Buffer,toHueColor:number,mianColorSelect:string,background:Buffer){
    let ta=new Attheme(buff)
    // 目标hue
    // sideBarBgActive 为主要改变颜色 标准
    // @ts-ignore
    let {red:r,green:g,blue:b,alpha:a} = ta.get(mianColorSelect)
    let instance = tinycolor({ r,g,b,a});
    let mianH=instance.toHsv().h

    let en=ta.getVariablesList()
    for (const e of en) {
        let kp:HSVA;
        let po= ta.get(e)
        // @ts-ignore
        let {red:r,green:g,blue:b,alpha:a} = ta.get(e)
        //console.log(po)
        kp=  tinycolor({ r,g,b,a}).toHsv()
        let min=kp.h-mianH
        // hue 上下 15
        if(min<15 || min>-15){
            kp.h=toHueColor
            let {r:red,g:green,b:blue,a:alpha}= tinycolor(kp).toRgb()
            ta.set(e,{red,green,blue,alpha:a})
        }
    }
    ta.setWallpaper(background)
    return ta.toFile()
}

