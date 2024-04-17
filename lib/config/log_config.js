const log4js = require('log4js');

const logConfig = {
    appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'log/app.log' }
    },
    categories: {
        default: { appenders: ['console', 'file'], level: 'info' }
    }
};

const log=log4js.configure(logConfig).getLogger();

module.exports=log;
