# vue-meituan

## 1. 项目描述

本项目为仿美团网PC端页面，功能包括：城市服务、地图服务、定位服务、注册登录实现、邮箱验证、服务端缓存、推荐搜索服务等。

本项目采用技术点有：

+ Vue + Vue Router + Vuex
+ 使用 Koa 进行服务端程序开发
+ 使用 Nuxt.js 进行服务端渲染（SSR）
+ 使用 MongoDB数据库 进行数据存储，Redis数据库 进行数据缓存
+ 使用 Mongoose 数据库对象模型工具
+ 使用 element-ui 框架构建页面

## 2. 如何运行

+ 克隆代码： `git clone https://gitee.com/VueToLRH/vue-imoocmall.git`
+ 安装相关依赖：`npm install` (或使用淘宝镜像：`cnpm install`)
+ 运行项目：`npm run dev`

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
