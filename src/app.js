import Koa from 'koa'
import path from 'path'
import {isFunction, isArray} from './util'
import StcLog from 'stc-log'
import serveStatic from './plugin/static'
import proxy from './plugin/proxy'

const defaultOptions = {

}

class App {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options)
    this.app = new Koa()
    this.log = new StcLog()
    this.middlewares = []
    this.root = path.resolve(process.cwd(), options.root)

    // this.app.use(require('koa-serve-index')(process.cwd()));

    // proxy(this)
    // serveStatic(this)
    this.use(proxy(this))
  }

  use(middleware) {
    if(isArray(middleware)) {
      for(let item of middleware) {
        this.use(item)
      }
      return
    }

    isFunction(middleware) && this.middlewares.push(middleware)
    return this
  }

  async listen(httpPort = 80, httpsPort = 443) {
    for (let middleware of this.middlewares) {
      await this.app.use(middleware)
    }

    this.app.listen(httpPort)
    this.log.display(`http://127.0.0.1:${httpPort}`)
    return this
  }
}

export default (...rest) => {
  return new App(...rest)
}
