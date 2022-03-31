import { router } from '../router';
import { checkLogin } from './login';
import frontendConfig from '../configs/frontend';
import adminFrontendConfig from '../configs/admin-frontend';
import editorFrontendConfig from '../configs/editor-frontend';
import qiyeBffConfig from '../configs/qiye-bff';
import marketConfig from '../configs/market-frontend';
import bot from '../utils/bot';
import UAParser from 'ua-parser-js';
import axios from 'axios';

const { isBot } = bot;
const marketQueuePaths = ['/queue/editor', '/queue/display'];

export function isMobile(ctx) {
    const ua = new UAParser(ctx.get('User-Agent'));
    const device = ua.getDevice();
    return device.type === 'mobile';
}

function callEditor(ctx, preHtml = '') {
    const editorRoutes = qiyeBffConfig.get('EDITOR_SASS_ROUTES');

    return Object.keys(editorRoutes).some((routeName) => {
        const routeConfig = editorRoutes[routeName];
        const { htmlKey, prefix = true } = routeConfig;

        routeName = prefix ? '/design' + routeName : routeName;

        if (ctx.path !== routeName && ctx.path + '/' !== routeName) return false;

        const htmlResult = editorFrontendConfig.get(preHtml + htmlKey);

        if (htmlResult) {
            ctx.body = htmlResult;
            return true;
        }
        return false;
    });
}

function callMarket(ctx) {
    if (marketQueuePaths.includes(ctx.path)) {
        ctx.body = marketConfig.get('entry');
        return true;
    }
    return false;
}

// 企业版预渲染资源
async function handleSaasPrerender(ctx) {
    try {
        // 从apollo拉取预渲染资源清单
        const list: any = frontendConfig.get('saas-prerender');
        if (list) {
            const { source } = list.find((v) => v.path === ctx.path);
            if (source) {
                const { data } = await axios.get(source);
                return data;
            }
        }
    } catch (e) {
        console.log(e);
    }
    return frontendConfig.get('saas');
}

router.all('/health', async (ctx) => {
    ctx.status = 200;
    ctx.body = '';
});

// 临时满足视频的路由转发需求
router.get('/clipper', async function render(ctx) {
    if (ctx.body) return;

    ctx.body = editorFrontendConfig.get('enterpriseClipperHtml');
});

router.get('/:name.(txt|html)', async function render(ctx) {
    if (ctx.body) return;
    const valideTexts = qiyeBffConfig.get('MICRO_APP_VALID_TEXT');
    if (valideTexts && ctx.params.name) {
        const content = valideTexts[ctx.params.name];
        ctx.body = content || '';
    } else {
        ctx.body = '';
    }
});

// 获取apollo application配置
router.get('/apollo/config/:key', async function render(ctx) {
    const params = {
        timestamp: Date.now(),
    };
    if (ctx.body) return;

    const body = qiyeBffConfig.get(ctx.params.key) || {};
    ctx.body = {
        ...body,
        ...params,
    };
});

router.get('*', async function render(ctx) {
    if (ctx.body) return;
    if (ctx.hostname === process.env.ADMIN_HOST) {
        ctx.body = adminFrontendConfig.get('html');
    } else if (ctx.hostname === process.env.PRIVATE_DIDI_HOST) {
        if (!callEditor(ctx, 'private-didi-')) {
            ctx.body = frontendConfig.get('private-didi-html');
        }
    } else if (!callEditor(ctx) && !callMarket(ctx)) {
        await checkLogin(ctx);
        if (ctx.hostname.includes(process.env.SAAS_WAP_HOST) && ctx.path !== '/mobile') {
            ctx.body = frontendConfig.get('saas-wap');
        } else {
            // 移动端访问pc链接重定向
            const noRedirect = marketQueuePaths.concat('/mobile');
            if (isMobile(ctx) && !noRedirect.includes(ctx.path)) {
                ctx.redirect(`https://${process.env.SAAS_WAP_HOST}/solution`);
            } else {
                // 企业版针对爬虫做处理
                if (isBot(ctx.request.headers['user-agent'])) {
                    ctx.body = await handleSaasPrerender(ctx);
                } else {
                    ctx.body = frontendConfig.get('saas');
                }
            }
        }
    }
});
