module.exports = async (ctx) => {
  console.log('test');
  ctx.body = {
    code: 0,
    data: {
     msg:'test success'
    }
  }
}