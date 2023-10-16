import JSZip from "jszip";
import fs from "fs"
import {TDesktop} from "./TDesktop"
// 优化桌面主题类
class DeskUtil{

     _theme: string | number[] | Uint8Array | ArrayBuffer | Blob | NodeJS.ReadableStream | Promise<string | number[] | Uint8Array | ArrayBuffer | Blob | NodeJS.ReadableStream>;
     _background: JSZip.JSZipObject | undefined;
     _values: JSZip.JSZipObject | undefined;
     _file_name:string;
    constructor(path:string,theme: string) {
     this._theme=fs.readFileSync(path+"/"+theme)
     this._file_name=theme
        this.init()
    }

  async  init(){

    }
}


// fs.readdir("source",(err, files)=>{
//     files.forEach(e=>{
//         //console.log(e)
//         new Tdesk("source",e)
//     })
// })
