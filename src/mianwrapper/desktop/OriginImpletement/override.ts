import {Color, TdesktopTheme} from "tdesktop-theme/node";
import * as fs from "fs";

let path="public/model/asakuravin.tdesktop-theme"
function getColor(td:TdesktopTheme,str:string){
    let variable = td.getVariable(str);
    if (typeof variable==='string'){
        return getColor(td,str)
    }
    else {
        return variable
    }
}

export  default  function overRefine(vatheme:TdesktopTheme){

    vatheme.setVariable("sideBarBg",<Color>vatheme.getVariable("dialogsBg"))
    //侧边栏 活动背景 聊天列表 激活活动背景
    vatheme.setVariable("sideBarBgActive",<Color>vatheme.getVariable("dialogsBgActive"))
    //侧边字体 为聊天列表 群组名称
    vatheme.setVariable("sideBarTextFg",<Color>vatheme.getVariable("dialogsNameFg"))
    //侧边活动字体 为聊天列表 群组名称 激活时字体
    vatheme.setVariable("sideBarTextFgActive",<Color>vatheme.getVariable("dialogsNameFgActive"))
    //侧边栏小圆圈背景
    vatheme.setVariable("sideBarBadgeBg",<Color>vatheme.getVariable("dialogsUnreadBg"))
    //侧边栏小圆圈字体
    vatheme.setVariable("sideBarBadgeFg",<Color>vatheme.getVariable("dialogsUnreadFg"))
    //dialogsUnreadFgActive
    //侧边栏 图标背景 为聊天列表 群组名称
    vatheme.setVariable("sideBarIconFg",<Color>vatheme.getVariable("dialogsNameFg"))
    //侧边栏 活动图标背景 为聊天列表 群组名称 激活
    vatheme.setVariable("sideBarIconFgActive",<Color>vatheme.getVariable("dialogsNameFgActive"))

    vatheme.setVariable("historyComposeAreaBg",<Color>vatheme.getVariable("dialogsBg"))

    vatheme.setVariable("historyReplyBg",<Color>vatheme.getVariable("dialogsBg"))

    vatheme.setVariable("historyComposeButtonBg",<Color>vatheme.getVariable("historyComposeAreaBg"))


    return vatheme
}





