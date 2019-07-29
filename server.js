const Koa = require('koa');
const next = require('next');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const router = require('./server/routes');
const response = require('./server/middlewares/reponse');
const db = require('./server/utils/db');

const port = parseInt(process.env.PORT, 10) || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

// 连接线上MongoDB数据库
db.connect();

app.prepare().then(() => {
  const server = new Koa();

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server
    .use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    })
    .use(serve('public'))
    .use(response)
    .use(bodyParser())// 解析请求体
    .use(router.routes())
    .listen(port, () => {
      console.log(`> app running at PORT:${port}`);
    });

});
