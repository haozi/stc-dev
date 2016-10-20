import requestLib from 'request'
import StcLog from 'stc-log'
import {extend} from 'stc-helper'
import {upperCaseHead} from '../../util'

const logger = new StcLog
require('request-debug')(requestLib);

export default class Http {
  constructor() {
    return Http
  }

  static request(url, host, method, req) {
    host = host || ''
    let originHeaders = {}
    Object.keys(req.headers).forEach(head => {
      originHeaders[upperCaseHead(head)] = req.headers[head]
    })

    const opts = extend({}, {headers: originHeaders}, {
      method: String(method).toUpperCase() || 'GET',
      url,
      headers: {
        Host: host
      }
    })

    return new Promise((resolve, reject) => {
      requestLib(opts, (error, response, body) => {
        if (error) {
          reject(error)
          logger.error('error GET', error.stack)
          return
        }
        resolve(response)
      })
    })
  }

  static get(url, host, req) {
    return Http.request(url, host, 'GET', req)
  }
}


function isRemoteUrl(url) {
  return url.slice(0, 8) === 'https://' || url.slice(0, 7) === 'http://' || url.slice(0, 2) === '//'
}

function normalizeUrl(url) {
  if (isRemoteUrl(url)) {
    if (url.slice(0, 2) === '//') {
      url = 'http:' + url
    }
  }
  return url
}
