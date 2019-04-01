const {GoodsMolel} = require('../models')
const {common} = require('../utils')
const findCollectionData = common.findCollectionData;

module.exports = async (ctx, next) => {
  const {uuid} = ctx.request.query

  try {
    if (uuid) {
      const list = await findCollectionData(GoodsMolel, {uuid})
      if (list.length) {
        await GoodsMolel.remove({uuid})
        ctx.state = {
          code: 0,
          data: {
            msg: '删除成功'
          },
        }
      } else {
        ctx.state = {
          code: -4,
          data: {
            msg: '删除失败'
          },
        }
      }
    } else {
      ctx.state = {
        code: -2,
        data: {
          msg: '删除失败,参数不正确'
        },
      }
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: e
      },
    }
  }
}