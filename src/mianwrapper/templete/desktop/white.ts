import {DeBaseThemeOperation} from "../base-theme-operation";
import Buffer from "node:buffer";
import path from "path";
import fs from "fs";

export namespace DesktopWhite {
    class WhiteThemeBase extends DeBaseThemeOperation{
        type: string="white";
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

    // 创建不同的主题实例
    const whiteThemes = [
        new WhiteThemeBase("white1", "awesome.tdesktop-theme", "捕获.PNG", "windowSubTextFg"),
        new WhiteThemeBase("white2", "awesome01.tdesktop-theme", "捕获.PNG", "sideBarTextFgActive"),
        new WhiteThemeBase("white3", "awesome.tdesktop-theme", "捕获.PNG", "sideBarTextFgActive"),
    ];

    // 初始化 Map 并设置数据
    export const desktopWhiteMap = new Map<string, WhiteThemeBase>(
        whiteThemes.map(theme => [theme.id, theme])
    );
}
