export default {
  // 连接 MongoDB 数据库，27017是默认端口。
  // 启动：cmd中输入 `mongod --dbpath C:\MongoDB\data` 进行启动
  // 注：--dbpath是指定数据库存放目录，要注意dbpath前有两个"-"。
  // 其他方法可参考：https://www.cnblogs.com/cangqinglang/p/10839486.html
  dbs: 'mongodb://127.0.0.1:27017/student',
  // 连接 redis，6379是默认端口
  // 启动：可通过在cmd中输入 redis-server 启动服务
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  // SMTP是一种提供可靠且有效的电子邮件传输的协议
  // SMTP是建立在FTP文件传输服务上的一种邮件服务，主要用于系统之间的邮件信息传递，并提供有关来信的通知。
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '837233792@qq.com'
    },
    get pass() {
      return '' // 授权码
    },
    // 获取随机码
    get code() {
      return () => {
        // Math.random() 输出0到1(包括0，不包含1)的随机数。
        // toString(16) 将随机数转换为16进制的字符串。
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    // 获取时间：60s
    get expire() {
      return () => {
        return parseInt(new Date().getTime()) + (60 * 1000)
      }
    }
  },
  sign: 'a3c9fe0782107295ee9f1709edd15218',
  requestUrl: 'http://cp-tools.cn'
}
