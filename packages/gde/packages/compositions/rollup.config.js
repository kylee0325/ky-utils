import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import typescript2 from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'packages/index.ts', // 打包入口
        output: [
            {
                file: 'lib/index.js',
                format: 'esm',
            },
        ],
        plugins: [
            // 打包插件
            resolve(), // 查找和打包node_modules中的第三方模块
            commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
            typescript2(), // 解析TypeScript
            babel({
                exclude: 'node_modules/**',
            }),
        ],
        external: ['vue', 'vue-request-compatible', 'vuex', 'vue-router', '@vue/composition-api'],
    },
    {
        // 生成 .d.ts 类型声明文件
        input: 'packages/index.ts',
        output: {
            file: 'lib/index.d.ts',
            format: 'es',
        },
        plugins: [dts()],
    },
];
