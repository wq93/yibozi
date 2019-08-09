const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { createuuid } = require('../utils');

// article 会自动加s去找数据库的集合 忽略大写
module.exports = mongoose.model('article',
  new Schema({
    'uuid': { type: String, default: createuuid(8,16) }, // id
    'title': { type: String }, // 文章标题
    'type': { type: String }, // 文章类别
    'createTime': { type: Number }, // 创建时间
    'updateTime': { type: Number }, // 修改时间
    'description': { type: String }, // 文章内容
    'content': { type: String }, // 名称
  })
);