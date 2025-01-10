//TDesktop 主题对象 同时也可以 优化侧边栏

import JSZip from "jszip";
import {Color, TdesktopTheme, Value} from "tdesktop-theme/node";
import * as fs from "node:fs";

export class Tdesktop {
    private _backbit: Buffer | undefined;

    private _tdesktheme:TdesktopTheme

    private _variables:string[]

    get backbit(): Buffer {
        // @ts-ignore
        return this._backbit;
    }

    set backbit(value: Buffer) {
        this._backbit = value;
    }
    //str 主题 键值对
    //backbit 主题背景 buffer
    constructor(buffer:Buffer) {
        this._tdesktheme = new TdesktopTheme(buffer);
        this._variables=this._tdesktheme.variables()
        // @ts-ignore
        this.backbit=Buffer.from(this._tdesktheme.wallpaper.bytes)

    }
     resolveVariable(s:string){
       return  this._tdesktheme.resolveVariable(s)
     }
    entries(){
        return this._tdesktheme.entries()
    }
    setVariable(variable: string, color: Color){
        return this._tdesktheme.setVariable(variable,color)
    }
    //初始化
    // //加入 侧边栏优化
    // public  optimistic(){
    //     //侧边栏 背景为聊天列表 背景
    //     this._v_map.set("sideBarBg","dialogsBg")
    //     //侧边栏 活动背景 聊天列表 激活活动背景
    //     this._v_map.set("sideBarBgActive","dialogsBgActive")
    //     //侧边字体 为聊天列表 群组名称
    //     this._v_map.set("sideBarTextFg","dialogsNameFg")
    //     //侧边活动字体 为聊天列表 群组名称 激活时字体
    //     this._v_map.set("sideBarTextFgActive","dialogsNameFgActive")
    //     //侧边栏小圆圈背景
    //     this._v_map.set("sideBarBadgeBg","dialogsUnreadBg")
    //     //侧边栏小圆圈字体
    //     this._v_map.set("sideBarBadgeFg","dialogsUnreadFg")
    //     //dialogsUnreadFgActive
    //     //侧边栏 图标背景 为聊天列表 群组名称
    //     this._v_map.set("sideBarIconFg","dialogsNameFg")
    //     //侧边栏 活动图标背景 为聊天列表 群组名称 激活
    //     this._v_map.set("sideBarIconFgActive","dialogsNameFgActive")
    // }
    // //静态方法 分解 zip
    // public static async parseZip(theme:Buffer){
    //     let _background: JSZip.JSZipObject;
    //     let _values: JSZip.JSZipObject;
    //     return  new Promise<Buffer>(async (resolve, reject)=>{
    //         await JSZip.loadAsync(theme).then((zip)=>{
    //             zip.forEach((e,f)=>{
    //                 if (e.includes("background") ||e.includes("png")||e.includes("jpg")){
    //                     _background=f
    //                 }else {
    //                     _values=f
    //                 }
    //             })
    //         }).then(()=>{
    //             _background?.async("nodebuffer").then(b=>{
    //                 _values?.async("string").then(async e=>{
    //                     if (!e.includes("sideBarBg")){
    //                         let td= new Tdesktop(e,b)
    //                         //侧边栏 背景
    //                         td.optimistic(); //优化侧边栏
    //                         td.toZip().then(e=>{
    //                             return resolve(e);
    //                         })
    //                     }
    //                 })
    //             })
    //         })
    //     })
    //
    // }


    public async toZip(){
        let str:string='';
        this._variables.forEach((v)=>{
            //@ts-ignore
            let color = this._tdesktheme.resolveVariable(v);
            if(color!==null){
                let { red, green, blue, alpha }= color
                //console.log({ red, green, blue, alpha })
                str+=`${v}:#${Buffer.from([ red, green, blue, alpha ]).toString("hex")};\n`;
            }
         })
        let  zip = new JSZip();
        zip.file("colors.tdesktop-theme", str);
        if (this._backbit) {
            zip.file("background.png",this._backbit, {
                binary:true
            });
        }

        return  await  zip.generateAsync({type: "nodebuffer"})
    }



}

// let buff = fs.readFileSync('awesome.tdesktop-theme');
// let tO =new Tdesktop(buff);
//
// let img=fs.readFileSync('img.png');
// // 获取 wallpaper 数据
// tO.backbit=img
// tO.toZip().then(e=>{
//     fs.writeFileSync('yusif.tdesktop-theme',e );
//
// })
// // 保存 wallpaper 到文件
