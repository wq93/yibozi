module.exports = async (ctx) => {
  // 临时数据
  let list = [
    {
      id: 1,
      parent_id: 0,
      name: '首页',
      key:'home',
      path: '/',
      asPath:'/home',
      child: []
    },
    {
      id: 2,
      parent_id: 0,
      name: '文章',
      child: [
        { id: 2,
          parent_id: 21,
          key:'normal',
          name: '生活',
          path: '/article/live',
          asPath:'/article/live',
          child: []
        }
      ]
    },
    {
      id: 3,
      parent_id: 0,
      name: '图片',
      key:'picture',
      path: '/picture',
      asPath:'/picture',
      child: []
    },
    {
      id: 4,
      parent_id: 0,
      name: '小视频',
      key:'video',
      path: '/video',
      asPath:'/video',
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