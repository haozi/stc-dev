import http from './http'

export default function (instance) {
  return async (ctx, next) => {
    let {body} = await http.get('http://m.so.com', '', ctx.request)
    next()
  }
}