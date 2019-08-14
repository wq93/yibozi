const Koa = require('koa');
const next = require('next');

const serve = require('koa-static');
const koaBody = require('koa-body');

const router = require('./server/routes');
const response = require('./server/middlewares/reponse');
const db = require('./server/utils/db');

const port = parseInt(process.env.PORT, 10) || 8000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// 连接线上MongoDB数据库
db.connect();

app.prepare().then(() => {
  const server = new Koa();

  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

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
    .use(koaBody({ multipart: true }))
    .use(response)
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(port, () => {
      console.log(`> app running at PORT:${ port }`);
    });

});