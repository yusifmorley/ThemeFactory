/*
nohup npx ts-node server.ts
ctrl + z
bg
disown -a
 */
import {initBot} from "./src/bot/bot";
import {initHttp} from "./src/express/http-config";
//启动http服务
initHttp()
//启动bot
initBot()
