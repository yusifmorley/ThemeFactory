//获取所有模板
import {ThemeType} from "./base-theme-operation";
import {AndroidBlack} from "./android/black";
import {AndroidWhite} from "./android/white";
import {DesktopBlack} from "./desktop/black";
import {DesktopWhite} from "./desktop/white";

function getTemplateInfo() {
    let tree={
        android_black:[...AndroidBlack.androidBlackMap.keys()],
        android_white:[...AndroidWhite.androidWhiteMap.keys()],
        desktop_black:[...DesktopBlack.desktopBlackMap.keys()],
        desktop_white:[...DesktopWhite.desktopWhiteMap.keys()],
    }
    return tree;
}

function getDeskThemeTypeInfo() {
    let themeMap=new Map<string,number>();
    AndroidBlack.androidBlackMap.forEach((android)=>{
        themeMap.set(android.id,android.colorType)
    })
    AndroidWhite.androidWhiteMap.forEach((android)=>{
        themeMap.set(android.id,android.colorType)
    })
    DesktopBlack.desktopBlackMap.forEach((desk)=>{
        themeMap.set("D"+desk.id,desk.colorType)
    })
    DesktopWhite.desktopWhiteMap.forEach((desk)=>{
        themeMap.set("D"+desk.id,desk.colorType)
    })
    return themeMap;
}

function getThemeInfo(){
    let deskThemeTypeInfo = getDeskThemeTypeInfo();
    let templateInfo = getTemplateInfo();
     Object.assign(templateInfo,{map:JSON.stringify(Array.from(deskThemeTypeInfo.entries()))});
     return templateInfo;
}

console.log(getThemeInfo())
export default getThemeInfo();


