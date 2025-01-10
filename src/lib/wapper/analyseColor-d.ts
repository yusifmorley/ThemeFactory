import * as fs from 'node:fs';
import {Tdesktop as TdesktopTheme} from "./NTdesktop";
import  tinycolor from "tinycolor2";
import HSLA = tinycolor.ColorFormats.HSLA;

const chatBg="msgInBg"

export async function  translateHueDe(templete:Buffer,toHueColor:number,targetS:number,targetL:number,mianColorSelect:string,background:Buffer,alphaT=1){

    // sideBarBgActive
    let tO=new TdesktopTheme(templete)


    // 目标hue 为主要改变颜色 标准
    //const mianColorSelect="sideBarBgActive"
    // @ts-ignore
    let {red:r,green:g,blue:b,alpha:a} = tO.resolveVariable(mianColorSelect)
    let instance = tinycolor({ r,g,b,a});
    let {h:mianH,s:mianS}=instance.toHsl()

    let en=tO.entries()
    for (const e of en) {

        let kp:HSLA;
        let ap;
        if(typeof e[1]=="string") {
            let resolveVariable = tO.resolveVariable(e[1]);
            if (resolveVariable==null)
                continue
//@ts-ignore
            let {red:r,green:g,blue:b,alpha:a} = tO.resolveVariable(e[1]);
                // console.log(`${e[0]}}`);
                // console.log(JSON.stringify();
            kp= tinycolor({ r,g,b,a}).toHsl()
            ap=a
            // @ts-ignore
        }else {
            let {red:r,green:g,blue:b,alpha:a} = e[1];
            // console.log(`${e[0]}`)
            // console.log(JSON.stringify(tinycolor({ r,g,b,a}).toHsv()));
            kp=tinycolor({ r,g,b,a}).toHsl()
            ap=a
        }
        let minH=kp.h-mianH
        let minS=(kp.s-mianS)*100
        // console.log(e[0])
        // console.log(`${kp.s} ${mianS} ${minS} ${targetS}`)
        // let minL=(kp.l-mianL)*100
        // hue 上下 15
        if(minH<15 && minH>-15){
            kp.h=toHueColor
            if(minS<30 && minS>-30){
                kp.l=targetL/100
            }
            // console.log(kp)
            let {r:red,g:green,b:blue,a:alpha}= tinycolor(kp).toRgb()
            // console.log({red,green,blue,alpha:ap})
            tO.setVariable(e[0],{red,green,blue,alpha:ap})
        }
        // 目标变量
        // 当 H 和目标变量的H相等 并且S接近 差值为30 则修改S=targetS
        // L同理
    }
    if (alphaT<1){
        // @ts-ignore
        let {red:r,green:g,blue:b} = tO.resolveVariable(chatBg)

        tO.setVariable(chatBg,{red:r,green:g,blue:b,alpha:Math.floor(alphaT*255)})
    }
    // tO.wallpaper.free()
    tO.backbit=background
    //fs.writeFileSync("j.jpg",tO.backbit)

    return await tO.toZip()
}

