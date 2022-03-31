import qs from 'qs';

export async function checkLogin(ctx) {
    if (ctx.search.includes('?')) {
        const params = qs.parse(ctx.search.substr(1));
        const code = params.authorization_code;

        delete params.authorization_code;

        if (code) {
            ctx.status = 301;
            ctx.redirect(
                `//${ctx.hostname}/login?` +
                    qs.stringify({
                        code,
                        state: qs.stringify({
                            redirect: `//${ctx.hostname}${ctx.path}?${qs.stringify(params)}`,
                        }),
                    }),
            );
        }
    }
}
