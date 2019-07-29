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

module.exports = router;