import {DeBaseThemeOperation, ThemeType} from "../base-theme-operation";

export namespace DesktopBlack{
    class BlackThemeBase extends DeBaseThemeOperation{
        constructor(
            public id: string,
            public tP: string,
            public pP: string = "捕获.PNG",  // 默认值
            public mainColorSelect: string,
            public colorType:ThemeType=ThemeType.Simple
        ) {super("black",id,tP,pP,mainColorSelect,colorType);}
    }
    // TODO black2 black3 无效
    const blackThemes = [
        new BlackThemeBase("black1", "yusif.tdesktop-theme", "捕获.PNG", "dialogsTextFg"),
        new BlackThemeBase("black2", "awesome.tdesktop-theme", "捕获.PNG", "sideBarIconFg"),
        new BlackThemeBase("black3", "awesome02.tdesktop-theme", "捕获.PNG", "sideBarIconFg"),
        new BlackThemeBase("black4", "awesome.tdesktop-theme", "捕获.PNG", "sideBarIconFgActive"),
        new BlackThemeBase("black5", "awesome.tdesktop-theme", "捕获.PNG", "uiAccent"),
        new BlackThemeBase("black6", "awesome.tdesktop-theme", "捕获.PNG", "windowBgActive")
    ];
    // 初始化 Map 并设置数据
    export const desktopBlackMap = new Map<string, BlackThemeBase>(
        blackThemes.map(theme => [theme.id, theme])
    );
}


