import * as fs from 'node:fs';
import {Tdesktop as TdesktopTheme} from "./NTdesktop";
import * as tinycolor from "tinycolor2";
import HSVA = tinycolor.ColorFormats.HSVA;

async function  translateHueDe(templete:Buffer,toHueColor:number,mianColorSelect:string,background:Buffer){
    let tO=new TdesktopTheme(templete)
    // 目标hue
    // sideBarBgActive 为主要改变颜色 标准
    //const mianColorSelect="sideBarBgActive"
    // @ts-ignore
    let {red:r,green:g,blue:b,alpha:a} = tO.resolveVariable(mianColorSelect)
    let instance = tinycolor({ r,g,b,a});
    let mianH=instance.toHsv().h
    let en=tO.entries()
    for (const e of en) {
        let kp:HSVA;
        let ap;
        if(typeof e[1]=="string") {
            // @ts-ignore
            let {red:r,green:g,blue:b,alpha:a} = tO.resolveVariable(e[1]);
            // console.log(`${e[0]}}`);
            // console.log(JSON.stringify();
            kp=  tinycolor({ r,g,b,a}).toHsv()
            ap=a
        }else {
            let {red:r,green:g,blue:b,alpha:a} = e[1];
            // console.log(`${e[0]}`)
            // console.log(JSON.stringify(tinycolor({ r,g,b,a}).toHsv()));
            kp=tinycolor({ r,g,b,a}).toHsv()
            ap=a
        }
        let min=kp.h-mianH
        // hue 上下 15
        if(min<15 || min>-15){
            kp.h=toHueColor
            let {r:red,g:green,b:blue,a:alpha}= tinycolor(kp).toRgb()
            tO.setVariable(e[0],{red,green,blue,alpha:ap})
        }
    }
    // tO.wallpaper.free()
    tO.backbit=background
    return await tO.toZip()
}

