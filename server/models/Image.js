const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// image 会自动加s去找数据库的集合 忽略大写
module.exports = mongoose.model('image',
  new Schema({
    'uuid': { type: String }, // id
    'type': { type: String }, // 类别
    'title': { type: String }, // 标题
    'filename': { type: String }, // 标题
    'description': { type: String }, // 描述
    'pictureScale': { type: String }, // 图片宽度
    'width': { type: String }, // 图片高度
    'height': { type: String }, // 图片宽高比
    'path': { type: String }, // 链接
    'createTime': { type: Number }, // 创建时间
    'updateTime': { type: Number }, // 修改时间
  })
);