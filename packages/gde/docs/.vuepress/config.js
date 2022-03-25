const path = require('path');
const { fs } = require('@vuepress/shared-utils');

function genComponentsDir(dirObj) {
    const dir = fs.readdirSync(path.join(__dirname, '..', dirObj.path));

    const arr = dir
        .sort((a, b) => {
            // 保证README.md在第一位
            if (a.includes('README.md')) return -1;
            if (b.includes('README.md')) return 1;
            // 获取当前文件在sort中的排序
            const aIndex = dirObj.sort.indexOf(a.replace('.md', ''));
            const bIndex = dirObj.sort.indexOf(b.replace('.md', ''));
            // 处理文件不在sort中，即index为-1的情况
            if (aIndex === bIndex) return 0;
            if (aIndex < 0) return 1;
            if (bIndex < 0) return -1;
            // 按照sort的index值进行对比排序
            return aIndex - bIndex;
        })
        .filter((name) => name.endsWith('.md'))
        .map((name) => name.replace('README.md', ''));

    console.log('arr', arr);

    return arr;
}

const sidebar = [
    {
        path: '/ui/',
        sort: ['icons', 'avatar', 'collapsed-select', 'color-select', 'tag'],
    },
    {
        path: '/utils/',
        sort: ['array-to-tree', 'get-selected-list', 'traverse-tree', 'format-tree'],
    },
    {
        path: '/compositions/',
        sort: [
            'use-request',
            'use-custom-pagination',
            'use-route-query',
            'use-permission',
            'use-route',
            'use-router',
        ],
    },
    {
        path: '/development/',
        sort: [],
    },
];

function renderSidebar() {
    const obj = {};
    sidebar.forEach((item) => {
        obj[item.path] = [
            {
                collapsable: false,
                children: genComponentsDir(item),
            },
        ];
    });
    return obj;
}

module.exports = {
    base: '/gde/',
    // 站点配置
    lang: 'zh-CN',
    title: 'GDE',
    description: '稿定设计企业解决方案通用能力库',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: 'https://st-gdx.dancf.com/gaodingx/152/configs/system/20200805-153421-81d9.svg',
        repo: 'https://git.gaoding.com/gde/gde-packages',
        repoLabel: '仓库地址',
        nav: [
            {
                text: '@gde/ui',
                link: '/ui/',
            },
            {
                text: '@gde/utils',
                link: '/utils/',
            },
            {
                text: '@gde/compositions',
                link: '/compositions/',
            },
            {
                text: '开发指南',
                link: '/development/',
            },
        ],
        sidebar: renderSidebar(),
    },
    plugins: [
        [
            '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            },
        ],
    ],
    chainWebpack: (config) => {
        // alias
        config.resolve
            .set('symlinks', true)
            .alias.set('@gde/ui', path.resolve(__dirname, '../../packages/ui/lib'))
            .set('@gde/utils', path.resolve(__dirname, '../../packages/utils/lib'))
            .set('@gde/compositions', path.resolve(__dirname, '../../packages/compositions/lib'))
            .set('vue-demi', require.resolve('@vue/composition-api/dist/vue-composition-api.mjs'));

        // style-resources-loader
        ['normal', 'normal-modules'].forEach((type) => {
            config.module
                .rule('less')
                .oneOf(type)
                .use('less-loader')
                .loader('less-loader')
                .options({ lessOptions: { javascriptEnabled: true } });
        });

        // config.module
        //     .rule('ts')
        //     .use('ts-loader')
        //     .tap((options) => {
        //         return {
        //             ...options,
        //             // context: path.resolve('../../'),
        //             configFile: path.resolve(__dirname, '../../tsconfig.json'),
        //         };
        //     });
    },
};
