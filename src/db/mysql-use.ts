import {Sequelize} from "sequelize";
import {dbConfig,dbConfigPro,DBConfig} from "../../config";
import process from "node:process";
import {initModels, theme_editor_logAttributes} from "./models/init-models";
import logger from "../lib/config/log_config";
let log=logger.getLogger(`${__filename}`);
let db:DBConfig = dbConfig;
if(process.env.NODE_ENV!=="dev"){
    db=dbConfigPro
}
const sequelize = new Sequelize('theme_factory',
    db.username,
    db.password,
    {
        host: 'localhost',
        dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
sequelize.authenticate().then(()=>{
    log.info("数据库连接成功")
});
 export default initModels(sequelize) ;
