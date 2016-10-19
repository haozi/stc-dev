import Static from 'koa-static'
import serveIndex from 'koa-serve-index'

export default function (instance) {
  instance.use(serveIndex(instance.root))
  instance.use(Static(instance.root, {
    index: false
  }))
}