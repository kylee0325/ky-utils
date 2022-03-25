module.exports = {
    // 相对路径的目标目录
    input: 'packages',
    // // 相对路径输出目录
    output: 'lib',
    loaders: {
        esbuild: {
            // 生成 '.d.ts' 声明文件, 会影响编译速度
            declaration: true,
        },
    },
};
