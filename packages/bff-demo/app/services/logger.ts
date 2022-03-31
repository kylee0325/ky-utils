/**
 * 日志服务对接文档 https://doc.huanleguang.com/pages/viewpage.action?pageId=43213435
 */
import os from 'os';
import { Logger } from '@gaoding/koa-service-utils';

const logServer = process.env.LOG_SERVER;
const APP_NAME = process.env.APP_NAME;

const logger = new Logger({
    appName: APP_NAME,
    host: os.hostname(),
    logServer,
    appEnv: process.env.APP_ENV,
});

export default logger;
