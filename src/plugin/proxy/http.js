import requestLib from 'request'
import StcLog from 'stc-log'
const logger = new StcLog

require('request-debug')(requestLib);

export default class Http {
  constructor() {
    return Http
  }

  static request(url, host, method) {
    return new Promise((resolve, reject) => {
      requestLib({
        method: String(method).toUpperCase() || 'GET',
        url,
        headers: {
          Host: host
        }
      }, (error, response, body) => {
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
    console.log(req)
    return Http.request(url, host,'GET')
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
