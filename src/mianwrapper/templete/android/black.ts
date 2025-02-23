import {AnBaseThemeOperation, ThemeType} from "../base-theme-operation";
import Buffer from "node:buffer";
import {translteHueAn} from "../../../lib/wapper/analyseColor-a";
import path from "path";
import fs from "fs";

export namespace AndroidBlack {
    class BlackThemeBase extends AnBaseThemeOperation{
        type: string="black";
        constructor(
            public id: string,
            public tP: string,
            public pP: string = "捕获.PNG",  // 默认值
            public mainColorSelect: string,
            public colorType:ThemeType=ThemeType.Simple
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

    const blackThemes = [
        new BlackThemeBase("black1", "TwilightEbony.attheme", "捕获.PNG", "actionBarDefaultTitle"),
        new BlackThemeBase("black2", "@Gumiho_tem2.attheme", "捕获.PNG", "actionBarDefaultTitle"),
        new BlackThemeBase("black3", "Gojo Purple Theme @aestheticpicsuwu.attheme", "捕获.PNG", "actionBarTabLine"),
        new BlackThemeBase("black4", "@Gumiho_tem2.attheme", "捕获.PNG", "actionBarDefaultTitle"),

    ];

    // 初始化 Map 并设置数据
    export const androidBlackMap = new Map<string, BlackThemeBase>(
        blackThemes.map(theme => [theme.id, theme])
    );
}

