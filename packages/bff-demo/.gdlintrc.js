// @ts-check
const { defineConfig } = require('@gaoding/gdlint');

// 详细配置见：http://doc.fe.gaoding.com/spec/guide/config.html
module.exports = defineConfig({
    /**
     * 是否开启stylelint
     */
    enableStylelint: false,

    /**
     * commit-lint配置
     * 用于校验git commit 提交信息
     */
    commitLint: {
        /**
         * 自定义项目的scope
         * @example ['component']
         */
        scopes: [],
    },

    /**
     * file-lint文件名校验
     */
    filenameLint: {},

    /**
     * lint-staged配置
     * 用于增量对代码进行lint及修复
     */
    lintStaged: {},

    /**
     * 通用忽略文件
     * 作用于 prettier、eslint、stylelint、markdownlint
     */
    ignore: ['public/**'],
});
