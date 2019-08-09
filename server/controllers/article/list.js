const { ArticleMolel} = require('../../models');

module.exports = async (ctx) => {
  let list = await ArticleMolel.find();
  try{
    ctx.body = {
      code: 0,
      data: {
        list,
        msg:''
      }
    };
  }catch (e) {
    ctx.state = {
      code: -1,
      data: {
        errorInfo: e,
        msg: '失败'
      },
    };
  }
};