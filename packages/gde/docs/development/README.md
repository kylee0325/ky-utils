# 开发说明

## 准备开始

```bash
yarn

// 开发
yarn dev

// 构建
yarn build

// 单元测试
yarn test
```

## 开发流程

- 在对应的包中，`packages` 目录中加入组件或方法，在同级目录内的 `index` 文件中对外暴露引用；
- 在对应的包中，`__tests__` 目录中加入单元测试；
- 在 `docs/.vuepress/components` 内编写示例组件；
- 在 `docs` 内对应的目录中编写 markdown 文档；
- 在文档中查看效果

## 发包规范

各个包独立发版

```bash
# 进入对应的包内
cd packages/*

# 发包
npm publish
```

## 注意事项

- 因 `webpack` 默认不编译 `node_modules` 内的 esm 包，导致`@vue/composition-api` 加载顺序异常问题，所以项目内的 `build.config.js` 需要加上以下设置

```js
module.exports = {
    // 编译 node_modules 中的模块
    transpileDependencies: [/vue-request-compatible/],
};
```
