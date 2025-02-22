import {translteHueAn, translteHueAnS, translteHueAnSPBigH, translteHueAnSPE} from "../../../lib/wapper/analyseColor-a";
import {AnBaseThemeOperation} from "../base-theme-operation";

import * as Buffer from "node:buffer";
import path from "path";
import fs from "fs";

export namespace AndroidWhite {
    // 创建一个通用的白色主题基类
    class WhiteThemeBase extends AnBaseThemeOperation{
        type: string="white";
        constructor(
            public id: string,
            public tP: string,
            public pP: string = "捕获.PNG",  // 默认值
            public mainColorSelect: string
        ) {super();}

        translateHue(...args:[Buffer,number,number,number,string,Buffer,number]){
            return translteHueAn(...args)
        }

        getPath(){
           return  path.join(this.prx,this.type,this.id,this.tP)
        }

       public getBuffer() {
           return  fs.readFileSync(this.getPath())
        }
    }

    class SpeTheme2 extends WhiteThemeBase{
        constructor(
            id: string,
            tP: string,
            pP: string = "捕获.PNG",  // 默认值
            mainColorSelect: string
        ) {super(id,tP,pP,mainColorSelect);}

        translateHue(...args:[Buffer,number,number,number,string,Buffer,number]){
            return translteHueAnSPE(...args)
        }

    }

    class SpeTheme3 extends WhiteThemeBase{
        constructor(
            id: string,
            tP: string,
            pP: string = "捕获.PNG",  // 默认值
            mainColorSelect: string
        ) {super(id,tP,pP,mainColorSelect);}

        translateHue(...args:[Buffer,number,number,number,string,Buffer,number]){
            return translteHueAnS(...args)
        }

    }
    class SpeTheme4 extends WhiteThemeBase{
        constructor(
            id: string,
            tP: string,
            pP: string = "捕获.PNG",  // 默认值
            mainColorSelect: string
        ) {super(id,tP,pP,mainColorSelect);}

        translateHue(...args:[Buffer,number,number,number,string,Buffer,number]){
            return translteHueAnSPBigH(...args)
        }

    }
    // 创建不同的主题实例
    const whiteThemes = [
        new SpeTheme2("white1", "yusif.attheme", "捕获.PNG", "actionBarDefaultTitle"),
        new SpeTheme2("white2", "Orange Flower @AloneSnowflake.attheme", "捕获.PNG", "actionBarTabLine"),
        new SpeTheme3("white3", "Day.attheme", "捕获.PNG", "actionBarTabLine"),
        new SpeTheme3("white4", "@Gumiho_tem1.attheme", "捕获.PNG", "actionBarDefault"),
        new SpeTheme4("white5", "Chestnut Chiffon.attheme", "捕获.PNG", "actionBarTabLine"),

        // new WhiteThemeBase("white4", "Ghost.attheme", "捕获.PNG", "actionBarTabLine")
    ];

    // 初始化 Map 并设置数据
    export const androidWhiteMap = new Map<string, WhiteThemeBase>(
        whiteThemes.map(theme => [theme.id, theme])
    );
}
