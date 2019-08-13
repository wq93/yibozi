const { ArticleMolel } = require('../../models');

module.exports = async (ctx) => {
  const uuid = ctx.params.uuid;
  try {
    if (uuid) {
      const data = await ArticleMolel.findOne({ uuid });
      if(data) {
        ctx.state = {
          code: 0,
          data
        };
      }else {
        ctx.state = {
          code: -3,
          data: { msg: '暂无此数据' },
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