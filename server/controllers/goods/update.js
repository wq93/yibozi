const {GoodsMolel} = require('../../models');
const {common} = require('../../utils');
const findCollectionData = common.findCollectionData;

module.exports = async (ctx) => {

  const { displayName } = ctx.request.body;

  const uuid = ctx.params.uuid;

  try {
    if (uuid && displayName) {
      const listByUuid = await findCollectionData(GoodsMolel, {uuid});
      // 不得重名 且区别不是当前条数据
      if (listByUuid.length > 0 && uuid !== listByUuid[0].uuid) {
        ctx.state = {
          code: -3,
          data: {
            msg: '修改失败,名重复'
          },
        };
      } else {
        let conditions = { uuid };
        let updates = {$set: {displayName}};
        await GoodsMolel.update(conditions, updates); // 修改
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