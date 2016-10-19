import os from 'os'

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

