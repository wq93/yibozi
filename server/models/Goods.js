const mongoose = require('mongoose')
const Schema = mongoose.Schema

// goods 会自动加s去找数据库的集合 忽略大写
module.exports = mongoose.model('good',
  new Schema({
    'uuid': {type: String}, // id
    'displayName': {type: String}, // 名称
  })
)