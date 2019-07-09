const {GoodsMolel} = require('../../models');
const {common} = require('../../utils');
const findCollectionData = common.findCollectionData;

module.exports = async (ctx) => {
  const {displayName} = ctx.request.body;
  const uuid = `good_${Date.now()}`;
  try {
    if (displayName) {
      // 避免重复添加
      const listByUuid = await findCollectionData(GoodsMolel, {displayName})
      if (listByUuid.length) {
        ctx.state = {
          code: -3,
          data: {
            msg: '已存在'
          }
        };
        return false;
      } else {
        // 创建新数据
        let good = new GoodsMolel({displayName, uuid});
        await good.save();
        ctx.state = {
          code: 0,
          data: {
            good,
            msg: 'success',
          }
        };
      }
    } else {
      ctx.state = {
        code: -2,
        data: {msg: '参数不正确'},
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