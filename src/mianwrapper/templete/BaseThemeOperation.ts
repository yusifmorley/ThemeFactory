//@ts-nocheck

import {translteHueAn} from "../../lib/wapper/analyseColor-a";
import {translateHueDe} from "../../lib/wapper/analyseColor-d";
import fs from "fs";

// 基本安卓抽象类
export  abstract class AnBaseThemeOperation {
    abstract type: string;
    public prx = "public/tempelete/tohuemodle/android/";
    public pP: string = "捕获.PNG";  // 默认值
    public id: string;
    public tP: string;
    public mainColorSelect: string

    translateHue(...args:[Buffer,number,number,number,string,Buffer,number]){
      return translteHueAn(...args)
    }
    abstract getPath(): string;
    //基本 buffer 获取
    getBuffer(){
        return  fs.readFileSync(this.getPath())
    }
}

// 基本桌面抽象类
export abstract class DeBaseThemeOperation {
    abstract type: string;
    public prx = "public/tempelete/tohuemodle/desktop/";
    public pP: string = "捕获.PNG";  // 默认值
    public id: string;
    public tP: string;
    public mainColorSelect: string
    translateHue(...args:[Buffer,number,number,number,string,Buffer,number]){
        return translateHueDe(...args)
    }

    abstract  getPath():string
    //基本 buffer 获取
    getBuffer(path:string){
        return  fs.readFileSync(this.getPath())
    }

}
