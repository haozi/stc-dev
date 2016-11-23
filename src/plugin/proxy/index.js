import http from './http'

export default function (instance) {
  return async (ctx, next) => {
    let {body} = await http.get('http://m.so.com/a/b/c', '', ctx.request.headers)
    console.log(body)
    next()
  }
}