import http from "http";
import url from "url";
import makeThemeDesktop from "./make-desktop-theme-util";
import {TdesktopTheme} from "tdesktop-theme/node";
import overRefine from "./override";
import loge from "../../../lib/config/log_config";

let log=loge.getLogger(`${__filename}`);

export async function basePicCreateDesktop(req:http.IncomingMessage, res:http.ServerResponse){
    // @ts-ignore
    let body= req.body; //base64 格式
    log.info(`正在进行桌面主题创建 url 为${req.url}`)
    try {
        // @ts-ignore
        const urlObject = url.parse(req.url);
        const { pathname,query } = urlObject;
        const method = req.method;
        if (method==='POST'&&pathname==='/tdesktop-create'){
                // log.info(body)
                const picObj=body;
                let buffer = Buffer.from(picObj?.picb,'base64');
                await makeThemeDesktop(picObj?.colors,buffer,picObj?.flag).then(e=>{
                        let tdesktop = new TdesktopTheme(e)
                        //overRefine(tdesktop)
                        let uint8Array = tdesktop.toZipBytes();
                        res.end(Buffer.from(uint8Array))
                });
                 //返回的时二进制 最后默认响应的是二进制

        }else {
            return;
        }
    }catch (e){
        log.error(e)
        res.end("fail")
    }
}
