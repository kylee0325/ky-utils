import 'reflect-metadata';
import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import proxy from 'koa-proxies';
import views from 'koa-views';
import { errorHandle } from '@gaoding/koa-service-utils';
import { router } from './router';
import logger from './services/logger';
import './controllers';

const app = new Koa();

app.use(
    errorHandle({
        logger,
    }),
);
app.use(serve(path.resolve(__dirname, '..', 'public')));
app.use(views(path.resolve(__dirname, '../views'), { extension: 'ejs' }));
app.use(router.routes());

// 本地调试使用，所有转发后端接口
app.use(
    proxy('/api', {
        logs: true,
        target: 'http://qiye-dev.gaoding.com',
        changeOrigin: true,
        rewrite: (path) => {
            return path.replace(/^\/api\//, '/');
        },
    }),
);

app.listen(process.env.SERVER_PORT || 5050, () => {
    if (process.send) {
        process.send('ready');
    }
    console.info(`Server Start...\n host: http://localhost:${process.env.SERVER_PORT}`);
});
