const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { createuuid } = require('../utils');

// goods 会自动加s去找数据库的集合 忽略大写
module.exports = mongoose.model('good',
  new Schema({
    'uuid': { type: String, default: () => createuuid(8,16) }, // id
    'displayName': { type: String }, // 名称
  })
);