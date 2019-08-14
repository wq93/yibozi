const { ArticleMolel } = require('../../models');
const { common } = require('../../utils');
const findCollectionData = common.findCollectionData;

module.exports = async (ctx) => {
  const { title, type, description, content } = ctx.request.body;
  try {
    if (title && type && content) {
      // 避免重复添加
      const listByUuid = await findCollectionData(ArticleMolel, { title });
      if (listByUuid.length) {
        ctx.state = {
          code: -3,
          data: {
            msg: '已存在'
          }
        };
        return false;
      } else {
        const createTime = Date.now();
        const updateTime = null;
        // 创建新数据
        const article = new ArticleMolel(
          { title, type, createTime, updateTime, description, content }
        );
        await article.save();
        ctx.state = {
          code: 0,
          data: {
            article,
            msg: 'success',
          }
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