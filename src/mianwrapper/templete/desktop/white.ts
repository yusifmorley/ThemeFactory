import {DeBaseThemeOperation, ThemeType} from "../base-theme-operation";
import Buffer from "node:buffer";
import path from "path";
import fs from "fs";

export namespace DesktopWhite {
    class WhiteThemeBase extends DeBaseThemeOperation{
        constructor(
            public id: string,
            public tP: string,
            public pP: string = "捕获.PNG",  // 默认值
            public mainColorSelect: string,
            public colorType:ThemeType=ThemeType.Simple
        )
         {super("white",id,tP,pP,mainColorSelect,colorType);}
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
