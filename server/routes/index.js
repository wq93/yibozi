const Router = require('koa-router');
const controllers = require('../controllers');
const router = new Router();

/* 查找商品 */
router.get('/api/goods', controllers.goods.list);

/* 添加商品 */
router.post('/api/goods', controllers.goods.add);

/* 修改商品 */
router.put('/api/goods/:uuid', controllers.goods.update);

/* 删除商品 */
router.delete('/api/goods/:uuid', controllers.goods.delete);

/* navigation */
router.get('/api/navigation', controllers.navigation.list );

/* 查找文章列表 */
router.get('/api/article', controllers.article.list );

/* 查找单个文章(通过id) */
router.get('/api/article/:uuid', controllers.article.check );

/* 添加文章 */
router.post('/api/article', controllers.article.add );

/* 编辑文章 */
router.put('/api/article/:uuid', controllers.article.update );

/* 删除文章 */
router.delete('/api/article/:uuid', controllers.article.delete );

module.exports = router;