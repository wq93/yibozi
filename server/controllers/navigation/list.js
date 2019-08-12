module.exports = async (ctx) => {
  // 临时数据
  let list = [
    {
      id: 1,
      parent_id: 0,
      name: '首页',
      key:'home',
      path: '/home',
      asPath:'/',
      child: []
    },
    {
      id: 2,
      parent_id: 0,
      name: '博文',
      key:'article',
      path: '/article',
      asPath:'/article',
      child: [
        // { id: 2001,
        //   parent_id: 2,
        //   key:'article/live',
        //   name: '生活',
        //   path: '/article/live',
        //   asPath:'/article/live',
        //   child: []
        // },
        // { id: 2002,
        //   parent_id: 2,
        //   key:'article/skill',
        //   name: '技术',
        //   path: '/article/skill',
        //   asPath:'/article/skill',
        //   child: []
        // },
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
    { id: 5,
      parent_id: 0,
      key:'timeline',
      name: '时间轴',
      path: '/timeline',
      asPath:'/timeline',
      child: []
    }
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