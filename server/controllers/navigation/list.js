module.exports = async (ctx) => {
  // 临时数据
  let list = [
    {
      id: 1,
      parent_id: 0,
      name: '首页',
      path: '/home',
      child: []
    },
    {
      id: 2,
      parent_id: 0,
      name: '文章',
      path: '/article',
      child: [
        { id: 2,
          parent_id: 21,
          name: '日常',
          path: '/article/normal',
        }
      ]
    },
    {
      id: 3,
      parent_id: 0,
      name: '首页',
      path: '/home',
      child: []
    },
  ];

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