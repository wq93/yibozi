const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const port = parseInt(process.env.PORT, 10) || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
// const db = require('./server/utils/db');

// 连接线上MongoDB数据库
// db.connect();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server
    .use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    })
    .use(router.routes())
    .listen(port, () => {
      console.log(`> App running on PORT:${port}`);
    });
});
