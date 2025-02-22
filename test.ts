import {Sequelize} from "sequelize";
import process from "node:process";
import {initModels, theme_editor_logAttributes} from "./src/db/models/init-models";

const sequelize = new Sequelize('theme_factory',
    "root",
    "root",
    {
        host: 'localhost',
        dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    });

let initModels1 = initModels(sequelize);
let value:theme_editor_logAttributes={
    kind:0,ip:"",date:new Date()
}

initModels1.theme_editor_log.removeAttribute('id');
initModels1.theme_editor_log.create(value)
