import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Cart = new Schema({
  id: {
    type: String,
    require: true
  },
  detail: { // 详情
    type: Array,
    require: true
  },
  cartNo: { // 购物车Id
    type: String,
    require: true
  },
  user: { // 用户
    type: String,
    require: true
  },
  time: { // 时间：数据库存储时间，会存在时区的概念
    type: String,
    require: true
  }
})

export default mongoose.model('Cart', Cart)
