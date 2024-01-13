//TDesktop 主题
import * as Buffer from "buffer";
import JSZip from "jszip";
import fs from "fs";

export class Tdesktop {
    private _str: string;
    public _v_map:Map<string, string>;
    private _backbit:Buffer;

    get backbit(): Buffer {
        return this._backbit;
    }

    set backbit(value: Buffer) {
        this._backbit = value;
    }
    //str 主题 键值对
    //backbit 主题背景 buffer
    constructor(str: string, backbit:Buffer) {
        this._str = str
        this._v_map = new Map<string, string>()
        this._backbit=backbit
        this.inti()
    }
    //初始化
   private inti(){
        let split = this._str.split("\n");
        split.forEach((v,k)=>{
            if (!v.includes(":"))
                return
            const colonIndex = v.indexOf(":");
            const semicolonIndex = v.indexOf(";");
            if (colonIndex !== -1 && semicolonIndex !== -1 && colonIndex < semicolonIndex) {
                const beFore=v.substring(0,colonIndex).trim()
                const betweenColonAndSemicolon =v.substring(colonIndex + 1, semicolonIndex).trim();
                this._v_map.set(beFore,betweenColonAndSemicolon)
            }
        })
    }

    //加入 侧边栏优化
    public  optimistic(){
        this._v_map.set("sideBarBg",<string>this._v_map.get("windowBg"))

        //侧边栏 活动背景
        this._v_map.set("sideBarBgActive",<string>this._v_map.get("dialogsBgActive"))

        //侧边字体
        this._v_map.set("sideBarTextFg",<string>this._v_map.get("dialogsTextFg"))
        //侧边活动字体
        this._v_map.set("sideBarTextFgActive",<string>this._v_map.get("windowBg"))

        //侧边栏小圆圈背景
        this._v_map.set("sideBarBadgeBg",<string>this._v_map.get("dialogsTextFgService"))

        //侧边栏小圆圈字体
        this._v_map.set("sideBarBadgeFg",<string>this._v_map.get("windowBg"))

        //侧边栏 图标背景
        this._v_map.set("sideBarIconFg",<string>this._v_map.get("dialogsBgActive"))
        //侧边栏 活动图标背景
        this._v_map.set("sideBarIconFgActive",<string>this._v_map.get("windowBg"))
    }
    //静态方法 分解 zip
   public static async parseZip(theme:Buffer){
        let _background: JSZip.JSZipObject;
        let _values: JSZip.JSZipObject;
        return  new Promise<Buffer>(async (resolve, reject)=>{
           await JSZip.loadAsync(theme).then((zip)=>{
               zip.forEach((e,f)=>{
                   if (e.includes("background") ||e.includes("png")||e.includes("jpg")){
                       _background=f
                   }else {
                       _values=f
                   }
               })
           }).then(()=>{
               _background?.async("nodebuffer").then(b=>{
                   _values?.async("string").then(async e=>{
                       if (!e.includes("sideBarBg")){
                           let td= new Tdesktop(e,b)
                           //侧边栏 背景
                           td.optimistic(); //优化侧边栏
                           td.toZip().then(e=>{
                              return resolve(e);
                         })
                       }
                   })
               })
           })
       })

   }


  public async toZip(){
        let str:string='';
        this._v_map.forEach((v,k)=>{
            str+=`${k}:${v};\n`;
        })
      let  zip = new JSZip();
      zip.file("colors.tdesktop-theme", str);
      if (this._backbit) {
          zip.file("background.png",this._backbit, {
              binary:true
          });
      }

   return  await  zip.generateAsync({type: "nodebuffer"})}

}
