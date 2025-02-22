import {Sequelize} from "sequelize";
import {dbConfig,dbConfigPro,DBConfig} from "../../config";
import process from "node:process";
import {initModels, theme_editor_logAttributes} from "./models/init-models";

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

 export default initModels(sequelize) ;
