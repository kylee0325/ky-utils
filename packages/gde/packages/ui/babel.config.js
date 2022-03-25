module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
    plugins: [
        // [
        //     '@babel/plugin-transform-runtime',
        //     {
        //         regenerator: true,
        //     },
        // ],
        [
            'import',
            {
                libraryName: '@gaoding/gd-antd',
                libraryDirectory: 'es',
                style: true,
            },
            '@gaoding/gd-antd',
        ],
    ],
};