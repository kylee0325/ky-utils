import { Context } from 'koa';
import { router } from '../router';

router.get('/login', async function login(ctx: Context) {
    await ctx.render('login');
});
