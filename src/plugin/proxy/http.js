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

  static request(uri, ip, originHeaders, _method) {
    ip = ip || ''
    originHeaders = normalizeHeaders(originHeaders)

    const opts = extend({}, {headers: originHeaders}, {
      method: String(_method).toUpperCase() || 'GET',
      uri: uri,
      headers: {
        Host: ''
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

  static get(uri, ip, originHeaders) {
    return Http.request(uri, ip, originHeaders, 'GET')
  }
}


function isRemoteUrl(uri) {
  return uri.slice(0, 8) === 'https://' || uri.slice(0, 7) === 'http://' || uri.slice(0, 2) === '//'
}

function normalizeUrl(url) {
  if (isRemoteUrl(url)) {
    if (url.slice(0, 2) === '//') {
      url = 'http:' + url
    }
  }
  return url
}


function normalizeHeaders(headers) {
  headers = headers || {}
  let newHeaders = {}
  Object.keys(headers).forEach(head => {
    newHeaders[upperCaseHead(head)] = headers[head]
  })
  return newHeaders
}