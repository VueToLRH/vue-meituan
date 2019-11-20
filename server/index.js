const Koa = require('koa')
const consola = require('consola') // 控制台日志输出控件
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'

// post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
// 对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
// koa-bodyparser必须在router之前被注册到app对象上
import bodyParser from 'koa-bodyparser'

import session from 'koa-generic-session' // 操作session
import Redis from 'koa-redis' // redis 用来在服务器端存放 session
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import categroy from './interface/categroy'

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.keys = ['mt', 'keyskeys'] // 设置签名cookie密钥
app.proxy = true // app.proxy 如果为 true，则解析 "Host" 的 header 域，并支持 X-Forwarded-Host
app.use(session({
  key: 'mt',
  prefix: 'mt:uid', // 前缀
  store: new Redis() // 将session存入redis 不传options 默认就是连接 127.0.0.1:6379
}))
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text'] // 设置解析类型，默认为['json', 'form']
}))
app.use(json())

// connect 用于创建数据库连接
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true // 使用新的 URL字符串解析器
})

// 在app中开启 koa-passport 对session的支持
// passport.initialzie() 只是简单为当前context添加passport字段，便于后面的使用。
app.use(passport.initialize())
// passport.session() 是passport自带的策略，用于从session中提取用户信息
app.use(passport.session())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // allowedMethods()中间件主要用于处理options请求，响应405和501状态。
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(categroy.routes()).use(categroy.allowedMethods())

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve) // 监听close事件，将请求从队列中移出
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
