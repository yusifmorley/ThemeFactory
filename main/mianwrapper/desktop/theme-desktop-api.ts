import http from "http";
import url from "url";
import makeThemeDesktop from "./make-desktop-theme-util";
import log from '../../../lib/config/log_config'
import {TdesktopTheme} from "tdesktop-theme/node";
export async function basePicCreateDesktop(req:http.IncomingMessage, res:http.ServerResponse){
    // @ts-ignore
    let body:string= ''; //base64 格式
    log.info(`正在进行桌面主题创建 url 为${req.url}`)
    try {
        // @ts-ignore
        const urlObject = url.parse(req.url);
        const { pathname,query } = urlObject;
        const method = req.method;
        if (method==='POST'&&pathname==='/tdesktop-create'){
            req.on('data', chunk => {
                // @ts-ignore
                body+=chunk;
            });
            req.on('end' ,async ()=>{
                const picObj=JSON.parse(body);
                let buffer = Buffer.from(picObj?.picb,'base64');
                await makeThemeDesktop(picObj?.colors,buffer).then(e=>{
                        let tdesktop = new TdesktopTheme(e)
                        let uint8Array = tdesktop.toZipBytes();
                        res.end(Buffer.from(uint8Array))
                });
                 //返回的时二进制 最后默认响应的是二进制
            })
        }else {
            return;
        }
    }catch (e){
        res.end("fail")
    }
}
