//维护 一个镶套map
import {NAttheme} from "../../lib/wapper/NAttheme"
import {Tdesktop} from "../../lib/wapper/NTdesktop"
import fs from "node:fs"
import path from "path";

export class TeClassCollection {
 kindMap=new Map<string, Map<string,string>>();

 constructor() {
     this.init()
 }


 init(){
     let prx="public/tempelete/tohuemodle"
     let readdirSync = fs.readdirSync(prx,{recursive:true});
     //TODO 初始化 desktop map
     let desktop=new Map<string,string>()
     //TODO 初始化 android map
     let android=new Map<string,string>()

     for (let element of readdirSync) {
        if (element.includes(".attheme")){
            element=<string>element
            let flag= element.split("\\")[2]
            let butem=path.join(prx,element)
            android.set(flag,butem)
        }

        if (element.includes("tdesktop-theme")){
            element=<string>element
            let flag= element.split("\\")[2]
            let butem=path.join(prx,element)
            desktop.set(flag,butem)
        }
     }

     //合并
     this.kindMap.set("desktop",desktop)
     this.kindMap.set("android",android)
 }

    getKindMap(){
     return this.kindMap;
    }

}
