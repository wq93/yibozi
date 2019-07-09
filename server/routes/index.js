const router = require('koa-router')({prefix: '/rest'});
const controllers = require('../controllers');


// router.get('/users', controllers.users)

/* 查找商品 */
router.get('/goods', controllers.goods.list);

/* 添加商品 */
router.post('/goods', controllers.goods.add);

/* 修改商品 */
router.put('/goods/:uuid', controllers.goods.update);

/* 删除商品 */
router.delete('/goods/:uuid', controllers.goods.delete);

module.exports = router;