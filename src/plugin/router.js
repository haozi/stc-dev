var router = require('koa-router')();

export default function (instance) {
  router.get('/', function (ctx, next) {
    console.log(1232111)
  })

  instance.app
    .use(router.routes())
    .use(router.allowedMethods())
}