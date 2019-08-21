const fs = require('fs');
const path = require('path');
const { ImageMolel } = require('../../models');
const { common } = require('../../utils');
const findCollectionData = common.findCollectionData;

module.exports = async (ctx) => {
  const uuid = ctx.params.uuid;

  try {
    if (uuid) {
      const list = await findCollectionData(ImageMolel, { uuid });
      if (list.length) {

        // 删除数据库数据(目前只实现了删除数据库数据, 没删除cache/images文件夹中文件)
        await ImageMolel.remove({ uuid });
        ctx.state = {
          code: 0,
          data: {
            msg: '删除成功'
          },
        };
      } else {
        ctx.state = {
          code: -4,
          data: {
            msg: '删除失败, 数据不存在'
          },
        };
      }
    } else {
      ctx.state = {
        code: -2,
        data: {
          msg: '删除失败,参数不正确'
        },
      };
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: e
      },
    };
  }
};