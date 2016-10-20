import os from 'os'
import StcLog from 'stc-log'
const logger = new StcLog()

export function sleep(s) {
  return new Promise(resolve => {
    setTimeout(resolve, s * 1000)
  })
}

export function isFunction(func) {
  return typeof func === 'function'
}

export function isArray(arr) {
  return Array.isArray(arr)
}

export function isWindows() {
  return os.platform() === 'win32'
}

export function isSudo() {
  return !isWindows && process.env.USER === 'root'
}

export function clone(obj) {
  let ret = {}
  try {
    if (typeof obj !== 'object') {
      throw new Error(obj + 'is not obj')
    }

    ret = JSON.parse(JSON.stringify(obj))
  } catch (e) {
    logger.error('clone fail: ' + obj)
  }

  return ret
}

export function upperCaseHead(head) {
  head = String(head).toLowerCase()

  const special = {
    'dnt' : 'DNT'
  }

  if(special[head]) return special[head]

  return head.split('-').map(item => item.replace(/^./, $0 => $0.toUpperCase())).join('-')
}
