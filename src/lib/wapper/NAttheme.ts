//NAtttheme 是新的Attheme类
import Attheme from "../atthemejs/lib/index.js";
import {Color} from "../atthemejs/lib/types";

export class NAttheme{
    buff:Buffer
    readonly wpsHeader = Buffer.from('WPS\n');
    readonly wpeFooter = Buffer.from('\nWPE\n');
    varbs:Buffer
    wpsWPE:Buffer
    private _attheme:Attheme
    constructor(buff:Buffer) {
        this.buff = buff
        //分割
        const ai = this.buff.indexOf('WPS');
        if (ai === -1) {
            this.varbs= this.buff
            // @ts-ignore
            this.wpsWPE=null
        }
        // 从找到的位置开始读取数据
        this.varbs= this.buff.subarray(0,ai);
        this.wpsWPE=this.buff.subarray(ai);
        this._attheme=new Attheme(this.varbs.toString())
    }

    varStringInit(){
        let str=this.varbs.toString()
        let arr=str.split("\n")
    }
    //外观模式
    get(name:string){
        return this._attheme.get(name)
    }
    set(str:string,color:Color){
        this._attheme.set(str,color,)
    }
    // getBackground():Buffer {
    //      if (this.wpsWPE==null){
    //          return null;
    //      }
    //         // 读取文件内容
    //         // 从找到的位置开始读取数据
    //         let filePart = this.wpsWPE
    //         // 处理数据，去掉 'WPS\n' 和 '\nWPE\n'
    //         // 处理数据，去掉 'WPS\n' 和 '\nWPE\n'
    //         filePart = filePart.subarray(this.wpsHeader.length); // 移除 'WPS\n' 头部
    //         const wpeIndex = filePart.indexOf(this.wpeFooter);
    //         if (wpeIndex !== -1) {
    //             filePart = filePart.subarray(0, wpeIndex); // 移除 'WPE\n' 尾部
    //         }
    //         return filePart
    // }
    setWallpaper(buf:Buffer){
        this.wpsWPE= Buffer.concat([this.wpsHeader,buf,this.wpeFooter])
    }
    toFile(){
        return Buffer.concat([Buffer.from(this._attheme.toString("int"))
            ,this.wpsWPE]);
    }
    getVariablesList(){
        return this._attheme.getVariablesList()
    }

}
