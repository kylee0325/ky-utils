import { Context } from 'koa';
import { router } from '../router';
import qiyeBffConfig from '../configs/qiye-bff';

router.get('/maintain', async function maintain(ctx: Context) {
    const maintainConfig: any = qiyeBffConfig.get('MAINTAIN_TIME_RANGE');
    await ctx.render('maintain', { ...maintainConfig });
});
