import { Context } from 'koa';
import send from 'koa-send';
import qs from 'qs';
import { router } from '../router';

const mainURL = process.env.MAIN_URL;

async function checkLogin(ctx) {
    if (ctx.search.includes('?')) {
        const params = qs.parse(ctx.search.substr(1));
        const code = params.oauth_code;

        delete params.oauth_code;

        if (code) {
            ctx.status = 301;
            ctx.redirect(
                `${mainURL}/login?` +
                    qs.stringify({
                        code,
                        state: qs.stringify({
                            redirect: `${mainURL}${ctx.path}?${qs.stringify(params)}`,
                        }),
                    }),
            );
        }
    }
}

router.all('/health', async (ctx) => {
    ctx.status = 200;
    ctx.body = '';
});

/**
 * 模拟的页面退出地址
 */
router.get('/private/login', async function privateLogin(ctx: Context) {
    let queryParams = {
        main_url: mainURL,
        record_id: 1,
        template_id: 1,
        oauth_code: 'd63117d0c9b74b20ba2b9642d0f8bd3d',
    };
    if (ctx.search.includes('?')) {
        const params = qs.parse(ctx.search.substr(1));
        queryParams = { ...queryParams, ...params };
    }
    await ctx.render('private-login', queryParams);
});

/**
 * 编辑器路由配置
 */
router.get('/design/psd-parser', async function render(ctx) {
    if (ctx.body) return;
    await checkLogin(ctx);
    await send(ctx, './public/psd-parser/design/psd-parser.html');
    return ctx;
});

router.get('/design/mirror', async function render(ctx) {
    if (ctx.body) return;
    await checkLogin(ctx);
    await send(ctx, './public/mirror/design/mirror.html');
    return ctx;
});

router.get('/design', async function render(ctx) {
    if (ctx.body) return;
    await checkLogin(ctx);
    await send(ctx, './public/editor/enterprise-design.html');
    return ctx;
});

/**
 * 私有化的全局配置
 */
router.get('/config/saas-ui-config.js', async function render(ctx) {
    if (ctx.body) return;
    ctx.body = `window.SAAS_UI_CONFIG = ${process.env.SAAS_UI_CONFIG}; window._IS_PRIVATE_=true;`;
});

router.get('/config/editor-ui-config.js', async function render(ctx) {
    if (ctx.body) return;
    ctx.body = `window.EDITOR_UI_CONFIG = ${process.env.EDITOR_UI_CONFIG}; window._IS_PRIVATE_=true;`;
});

router.get('*', async function render(ctx) {
    if (ctx.body) return;

    if (ctx.hostname === process.env.ADMIN_HOST) {
        await send(ctx, './public/admin/index.html');
    } else {
        await checkLogin(ctx);
        await send(ctx, './public/saas/index.html');
    }
    return ctx;
});
