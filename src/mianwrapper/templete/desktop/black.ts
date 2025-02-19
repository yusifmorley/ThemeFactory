import {AnBaseThemeOperation, DeBaseThemeOperation} from "../base-theme-operation";
import Buffer from "node:buffer";
import {translteHueAn} from "../../../lib/wapper/analyseColor-a";
import path from "path";
import fs from "fs";

export namespace DesktopBlack{
    class BlackThemeBase extends DeBaseThemeOperation{
        type: string="black";
        constructor(
            public id: string,
            public tP: string,
            public pP: string = "捕获.PNG",  // 默认值
            public mainColorSelect: string
        ) {super();}

        getPath(){
            return  path.join(this.prx,this.type,this.id,this.tP)
        }

        public getBuffer() {
            return  fs.readFileSync(this.getPath())
        }
    }

    const blackThemes = [
        new BlackThemeBase("black1", "yusif.tdesktop-theme", "捕获.PNG", "dialogsTextFg"),
        new BlackThemeBase("black2", "awesome.tdesktop-theme", "捕获.PNG", "sideBarIconFg"),
        new BlackThemeBase("black3", "awesome02.tdesktop-theme", "捕获.PNG", "sideBarIconFg"),
        new BlackThemeBase("black4", "awesome.tdesktop-theme", "捕获.PNG", "sideBarIconFgActive"),
        new BlackThemeBase("black5", "awesome.tdesktop-theme", "捕获.PNG", "uiAccent")

    ];
    // 初始化 Map 并设置数据
    export const desktopBlackMap = new Map<string, BlackThemeBase>(
        blackThemes.map(theme => [theme.id, theme])
    );
}


