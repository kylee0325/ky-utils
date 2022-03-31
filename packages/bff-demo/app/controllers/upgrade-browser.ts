import { Context } from 'koa';
import { router } from '../router';

router.get('/upgrade-browser', async function upgradeBrowser(ctx: Context) {
    await ctx.render('upgrade-browser');
});
