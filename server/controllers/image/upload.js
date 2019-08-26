const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const { createuuid } = require('../../utils');
const { ImageMolel } = require('../../models');

// 上传文件
module.exports = async ctx => {
  const file = ctx.request.files.file;
  const { type, title, description, width, height, pictureScale } = ctx.request.body;

  const uuid = createuuid(8, 16); // 唯一id

  if (file) {
    const reader = fs.createReadStream(file.path);    // 创建可读流
    const ext = file.name.split('.').pop();        // 获取上传文件扩展名
    // 创建文件夹(根目录的static/cache路径下)
    const uploadPath = path.join(__dirname, '../../../static/cache/images');
    const flag = fs.existsSync(uploadPath); // 判断文件夹是否存在
    // 同步创建多级文件夹
    if (!flag) mkdirp.sync(uploadPath);

    const saveFilename = `${ uuid }.${ ext }`;
    const upStream = fs.createWriteStream(`${ uploadPath }/${ saveFilename }`); // 创建可写流

    const createTime = Date.now();
    const updateTime = null;
    const imagePath = `/static/cache/images/${ saveFilename }`;
    // 创建新数据
    /**
     * 创建新数据
     * 包括:
     *  title: 标题, type: 类型, description: 描述, uuid: id,
     *  createTime: 创建时间, updateTime: 修改时间, filename: 文件名称
     */
    const Image =
      new ImageMolel({
        title,
        type,
        description,
        uuid,
        createTime,
        updateTime,
        width,
        height,
        pictureScale,
        path: imagePath,
        filename: saveFilename
      });

    try {
      // 可读流通过管道写入可写流
      await Promise.all([ Image.save(), reader.pipe(upStream) ]);
      ctx.state = {
        code: 0,
        data: {
          Image,
          msg: 'success',
        }
      };
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          errorInfo: e,
          msg: '失败'
        },
      };
    }
  } else {
    ctx.state = {
      code: -2,
      data: { msg: '参数不正确' },
    };
  }
};
