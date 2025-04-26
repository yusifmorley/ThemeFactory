//@ts-nocheck
import {AnBaseThemeOperation, ThemeType} from "../base-theme-operation";
import tinycolor from "tinycolor2";


export namespace AndroidWhite {
    // 创建一个通用的白色主题基类

    class WhiteThemeBase extends AnBaseThemeOperation{
        constructor(
            public id: string,
            public tP: string,
            public pP: string = "捕获.PNG",  // 默认值
            public mainColorSelect: string,
            public colorType:ThemeType=ThemeType.Simple
        ) {  super("white",id,tP,pP,mainColorSelect,colorType);}
    }

    class SpeTheme2 extends WhiteThemeBase{

        constructor(
            id: string,
            tP: string,
            pP: string = "捕获.PNG",  // 默认值
            mainColorSelect: string) {
            super(id,tP,pP,mainColorSelect);
        }

        addTaOperation() {
            super.addTaOperation();
            let {r:red,g:green,b:blue}= tinycolor({h:super.toHueColor,s:this.targetS,l:this.targetL}).toRgb()
            this.ta.set("chats_pinnedOverlay",{red,green,blue,alpha:21})
            //@ts-ignore
            this.ta.set(super.chatFilInfo,this.ta.get(super.chatFilNameText))
        }
    }

    class SpeTheme3 extends WhiteThemeBase{
        private chatFilInfo="chat_outFileInfoText"
        private chatFilNameText="chat_outFileNameText"

        constructor(
            id: string,
            tP: string,
            pP: string = "捕获.PNG",  // 默认值
            mainColorSelect: string
        ) {super(id,tP,pP,mainColorSelect);}
        addTaOperation() {
            super.addTaOperation();
            this.ta.set(this.chatFilInfo,this.ta.get(this.chatFilNameText))
        }
    }
    class SpeTheme4 extends WhiteThemeBase{
        private chatFilInfo="chat_outFileInfoText"
        private chatFilNameText="chat_outFileNameText"

        constructor(
            id: string,
            tP: string,
            pP: string = "捕获.PNG",  // 默认值
            mainColorSelect: string,
            themeType:ThemeType
        ) {super(id,tP,pP,mainColorSelect,themeType);}
           isAngleInRange(x, y, z) {
            let start = (x - y + 360) % 360;
            let end = (x + y) % 360;

            if (start < end) {
                return z >= start && z <= end;
            } else {
                return z >= start || z <= end;
            }
        }
        translateHue(toHueColor: number, targetS: number, targetL: number, background: Buffer, alphaT: number = 1): Buffer {
            // 目标hue
            // sideBarBgActive 为主要改变颜色 标准
            // @ts-ignore

            let {h:mainH,s:mainS}=this.mainHSL

            let en=this.ta.getVariablesList()
            for (const e of en) {
                let kp;
                let po= this.ta.get(e)
                // @ts-ignore
                let {red:r,green:g,blue:b,alpha:a} = this.ta.get(e)
                kp=  tinycolor({ r,g,b,a}).toHsl()
                // hue 上下 15
                if(this.isAngleInRange(mainH,25,kp.h)){
                    kp.h=toHueColor
                    //TODO s不能变
                    //TODO l可以适当增减
                    let {r:red,g:green,b:blue,a:alpha}= tinycolor(kp).toRgb()
                    this.ta.set(e,{red,green,blue,alpha:a})
                }
            }
            // console.log(alphaT)
            if (alphaT<1){
                // log.info(`${alphaT}`)
                // @ts-ignore
                let {red:r,green:g,blue:b} = this.ta.get(this.chatBg)
                this.ta.set(this.chatBg,{red:r,green:g,blue:b,alpha:Math.floor(alphaT*255)})
            }

            let {r:red,g:green,b:blue}= tinycolor({h:toHueColor,s:targetS,l:targetL}).toRgb()
            this.ta.set("chats_pinnedOverlay",{red,green,blue,alpha:21})

            //@ts-ignore
            this.ta.set(this.chatFilInfo,this.ta.get(this.chatFilNameText))
            this.ta.setWallpaper(background)
            return this.ta.toFile()
    }
    }
    // 创建不同的主题实例
    const whiteThemes = [
        new SpeTheme2("white1", "yusif.attheme", "捕获.PNG", "actionBarDefaultTitle"),
        new SpeTheme2("white2", "Orange Flower @AloneSnowflake.attheme", "捕获.PNG", "actionBarTabLine"),
        new SpeTheme3("white3", "Day.attheme", "捕获.PNG", "actionBarTabLine"),
        new SpeTheme3("white4", "@Gumiho_tem1.attheme", "捕获.PNG", "actionBarDefault"),
        new SpeTheme4("white5", "Chestnut Chiffon.attheme", "捕获.PNG", "actionBarTabLine",ThemeType.SimpleDifference),
        // new WhiteThemeBase("white4", "Ghost.attheme", "捕获.PNG", "actionBarTabLine")
    ];

    // 初始化 Map 并设置数据
    export const androidWhiteMap = new Map<string, WhiteThemeBase>(
        whiteThemes.map(theme => [theme.id, theme])
    );
}
