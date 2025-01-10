// @ts-ignore
import url from 'url';
import * as http from 'http';

// @ts-ignore
import render from '../../lib/preview/render-pool.js';

// @ts-ignore
import  {
    MINIMALISTIC_TEMPLATE,//移动端主题
    REGULAR_TEMPLATE, //移动端主题
    NEW_TEMPLATE,
    DESKTOP_TEMPLATE, //桌面模板
} from "../../lib/preview/preview-maker.js";
import loge from "../../lib/config/log_config";

let log=loge.getLogger(`${__filename}`);
export async function createPreview(req:http.IncomingMessage, res:http.ServerResponse) {
    // 获取url的各个部分
    // url.parse可以将req.url解析成一个对象
    // 里面包含有pathname和querystring等
    // @ts-ignore
    const urlObject = url.parse(req.url);
    log.info(`创建颜色预览 url 为 ${req.url}`)
    const { pathname,query } = urlObject;

    const method = req.method;

    let name: string;
    let theme=null;
    const body: any[] | readonly Uint8Array[]= [];
    let template:any;
    if (method === 'POST'&&pathname==='/android') {
        template=MINIMALISTIC_TEMPLATE;
        name=query.split('=')[1];

    }
    else if (method === 'POST'&&pathname==='/desktop'){
        template=DESKTOP_TEMPLATE;
        name= query.split('=')[1];
    }else
        return;

    // @ts-ignore
    name =decodeURIComponent(name).replaceAll('.attheme','');
    req.on('data', chunk => {
        // @ts-ignore
        body.push(chunk);
    });
    req.on('end' ,async ()=>{
        // @ts-ignore
        theme=Buffer.concat(body);
        await render({
            theme,
            name,
            template,
        }).then((preview: any)=>{
            res.setHeader('Content-Type', 'application/octet-stream');
            res.write(preview);
            res.end();
        }).catch((e: any)=>{
            res.end('fail');
        });
    });

}

