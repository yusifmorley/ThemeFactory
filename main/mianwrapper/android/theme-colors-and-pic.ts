import fs from 'fs';
import {getImageColors} from '../../../lib/utils/colors';
import setColor from '../../../lib/picserver/svgps';
import sharp from 'sharp';
import {createTheme} from '../../../lib/utils/themes';
import {ThemeType} from "../../../lib/types";
import http from "http";
import url from "url";
import log from '../../../lib/config/log_config'
import {stringify} from "querystring";
import {getTextColor} from "../../../lib/util/text-color.js"
import fun from "imageinfo"

//产生颜色数组 和颜色预览图片
//第一次 请求
export async function basePicCreateColorPic(req:http.IncomingMessage, res:http.ServerResponse){
    // @ts-ignore
    const body: any[] | readonly Uint8Array[]= [];
    let pic:Buffer;
    log.info(`创建颜色预览 url 为 ${req.url}`)
    try {
        // @ts-ignore
        const urlObject = url.parse(req.url);
        const {pathname, query} = urlObject;
        const method = req.method;
        if (method == 'POST' && pathname === '/attheme') {
            req.on('data', chunk => {
                // @ts-ignore
                body.push(chunk);
            });
            req.on('end', async () => {
                let arrs
                pic = Buffer.concat(body);
                let info= fun(pic)
                try {
                    arrs= await getImageColors(pic, info.mimeType)
                }catch (e){
                   log.error(`getImageColors生成颜色数组异常 : ${e}`)
                   res.end("fail")
                    return;
                }

                let str=setColor(arrs) //获取svg字符串
                if (str===null){
                    log.error("svg 字符串为空! ")
                    res.end("fail")
                    return ;
                }
                // @ts-ignore
                const data = await sharp(Buffer.from(str))
                                                .toBuffer();
                let objs = {
                    arr: arrs, photo: data.toString('base64')
                };
                res.end(JSON.stringify(objs));
            });
        } else {
            return;
        }
    }catch (e){
        log.error(`未知异常,调用栈:${e}`)
        res.end("fail")
    }

}
//第二次请求
//请求体为 三个颜色参数 一张图片 返回 attheme
export async function basePicCreateTheme(req:http.IncomingMessage, res:http.ServerResponse){
    // @ts-ignore
    log.info(`正在创建attheme url 为 ${req.url}`)
    let body:string= ''; //base64 格式
    try {
        // @ts-ignore
    const urlObject = url.parse(req.url);
    const { pathname,query } = urlObject;
    const method = req.method;

    if (method==='POST'&&(pathname==='/attheme-create'||pathname==='/attheme-create/tran')){
        req.on('data', chunk => {
            // @ts-ignore
            body+=chunk;
        });

        req.on('end' ,async ()=>{
           const picObj=JSON.parse(body);
            let buffer = Buffer.from(picObj?.picb,'base64');
            const type = pathname === '/attheme-create' ? 'attheme' : 'attheme-tran';
            let coarr=Array(3)
            coarr[0]=picObj?.colors[0]
            coarr[1]=picObj?.colors[1]
            coarr[2]=picObj?.colors[2]

           //  let text_color= getTextColor(picObj?.colors[1])
           //  if (text_color!==null){
           //      coarr[1]=text_color
           //      console.log(text_color)
           // }
           //  console.log(text_color)
           //  console.log(coarr)
            let theme= createTheme({
                username:'',
                image:buffer,
                name:'',
                colors:coarr,
                type:type,
            });

            res.end(Buffer.from(theme, 'binary')) //返回的时二进制 最后默认响应的是二进制
        })
    }else {
        return;
    }
    }catch (e){
        res.end("fail")
    }
}


/**
//获取buffer
const fp=fs.readFileSync('../pic/FugA0ydXwAAAdRH.jpg');
// eslint-disable-next-line @typescript-eslint/no-empty-function
(async ()=> {
    //获取图片颜色数组
    const arr= await getImageColors(fp,'image/jpeg');
    let str=setColor(arr); //返回 色彩列表图片 buffer
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = await sharp(Buffer.from(str))
        .toBuffer();
    // fs.writeFileSync('output.png',data);


    //根据 列表颜色创建主题
    let username='mki';
    let name='opo';
    let theme= createTheme({
        username:username,
        image:fp,
        name:name,
        colors:arr.slice(0,3),
        type:'attheme',
    });

    fs.writeFileSync('output.attheme',Buffer.from(theme, 'binary'));

})();
*/

/**
    1.首先 python端接受 /create attheme base on pic 命令
    2.python 向用户 去请求 一张图片  并且验证图片大小
    3.不符合大小 请求修改 重传
    4.进入准备阶段  依据此图片 生成 色彩图片  // 封装为一个服务方法
    5.python端依据此图片 发送调查报告 供用户填写
    6.将此报批稿发送给 node 端 生成主题    // 封装为一个服务方法
    7.python端将此主题发送给用户 并考虑做后续处理 如保存主题至 主机
 */
