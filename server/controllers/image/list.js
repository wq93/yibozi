const { ImageMolel } = require('../../models');

module.exports = async (ctx) => {
  let list = await ImageMolel.find();

  const host = ctx.request.header.host;
  console.log(host);
  try {
    ctx.body = {
      code: 0,
      data: {
        list: list.map(item => Object.assign(item, host)),
        msg: ''
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
};