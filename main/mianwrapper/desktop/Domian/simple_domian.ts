import {TdesktopTheme} from "tdesktop-theme/node";
import {Color} from "../../../../lib/atthemejs/lib/types";


export default class Simple_Domian{
    tdesktop:TdesktopTheme;
    //基本优化处理
    constructor(tdesktop:TdesktopTheme) {
        this.tdesktop=tdesktop
        this.init()
    }
    init(){
        this.tdesktop.setVariable("titleBg",<Color>this.tdesktop.resolveVariable("primaryBG"))
        this.tdesktop.setVariable("topBarBg",<Color>this.tdesktop.resolveVariable("primaryBG"))
    }


}
