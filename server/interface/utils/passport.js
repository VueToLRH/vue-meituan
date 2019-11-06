// passport 是 Node 的认证中间件，它的存在只有一个单一的目的，就是认证请求。
import passport from 'koa-passport'
// 网络中最常用的方式是通过用户名和密码进行认证，提供这种认证的策略是 passport-local（本地权限认证)
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

// 用户名密码验证策略
// > username: 用户输入的用户名
// > password: 用户输入的密码
// > done: 验证完成后的回调函数，由 passport 调用
passport.use(new LocalStrategy(async function(username, password, done) {
  const where = {
    username
  }
  const result = await UserModel.findOne(where) // 在 mongodb 数据库中查找文件数据
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

// 通过 passport.serializeUser 函数定义序列化操作
// serializeUser 用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function(user, done) {
  done(null, user)
})

// 通过 passport.deserializeUser 函数定义反序列化操作
// deserializeUser 每次请求的时将从 session 中读取用户对象，并将其封装到 req.user
passport.deserializeUser(function(user, done) {
  return done(null, user)
})

export default passport
