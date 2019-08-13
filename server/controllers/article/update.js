const { ArticleMolel } = require('../../models');
const { common } = require('../../utils');
const findCollectionData = common.findCollectionData;

module.exports = async (ctx) => {
  const { title, type, description, content } = ctx.request.body;
  const uuid = ctx.params.uuid;

  try {
    if (title && type && content) {
      const listByUuid = await findCollectionData(ArticleMolel, { uuid });
      // 不得重名 且区别不是当前条数据
      if (listByUuid.length > 0 && uuid !== listByUuid[ 0 ].uuid) {
        ctx.state = {
          code: -3,
          data: {
            msg: '修改失败,数据重复'
          },
        };
      } else {
        let conditions = { uuid };
        let updates = { $set: { title, type, description, content, updateTime: Date.now() } };
        await ArticleMolel.update(conditions, updates); // 保存修改
        ctx.state = {
          code: 0,
          data: {
            msg: '修改成功'
          },
        };
      }
    } else {
      ctx.state = {
        code: -2,
        data: { msg: '参数不正确' },
      };
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        errorInfo: e,
        msg: '失败'
      },
    };
  }
};