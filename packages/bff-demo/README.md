# 前端 render

该 Nodejs 服务的职责类似于 Nginx ，提供前端静态资源的输出。

前端静态资源同步在 Apollo 配置中心。

## 技术栈

- TypeScript
- Koa

## 私有仓库

项目依赖了私有包， 开发前需要先登录私有 NPM 仓库 [私有 NPM 包使用指南](http://doc.fe.gaoding.com/gaodingx/development/publish-npm.html)

```shell
yarn login
```

## 开发

```shell
yarn
yarn run dev
```

## 部署

[Node.js 部署配置流程](https://doc.huanleguang.com/display/SRE/Node.Js)

[项目部署工单](https://doc.huanleguang.com/pages/viewpage.action?pageId=95420115)

## Apollo 配置

- APOLLO_FRONTEND_NAMESPAVE --> APOLLO_FRONTEND_NAMESPACE

以下配置项未从 king-bff 复制且未配置

- APOLLO_ADMIN_FRONTEND_NAMESPAVE
- ADMIN_HOST
- IS_PRIVATE 可用 DIND_RUNTIME_ENV_NAME=private 推导
- PRIVATE_DIDI_HOST

启屏相关路由已删除

- QIPING_HOST
- QIPING_BASE_URL
- QIPING_HOST_TEMP
