import App from './app'

App({
  root: './'
}).use(function (ctx, next) {
  console.log(22222)
})
  .listen(80)