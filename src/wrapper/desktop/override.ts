import {Color, TdesktopTheme} from "tdesktop-theme/node";
import * as fs from "fs";
import log from '../../config/log_config.js'

let path="static/model/asakuravin.tdesktop-theme"

function getColor(tdesktopTheme1Element:any,tdesktopTheme1:TdesktopTheme){
    let variable = tdesktopTheme1.getVariable(tdesktopTheme1Element);
    if (typeof variable==='string'){
        return getColor(variable,tdesktopTheme1)
    }
    else {
        return variable
    }
}
export  default  function overRefine(vatheme:TdesktopTheme){
    let modelBuffer =fs.readFileSync(path)
    let model=new TdesktopTheme(modelBuffer);
    log.info(`默认模板为${path}`)
    for (const tdesktopTheme1Element of vatheme.variables()) {

        let variable= getColor(tdesktopTheme1Element,vatheme)

        model.setVariable(tdesktopTheme1Element, <Color>variable)

    }
    model.wallpaper=vatheme.wallpaper
    return model
}


