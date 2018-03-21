import { default as resolveUrl } from 'resolve-url';

const splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/
const urlRe = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/

// https://github.com/jinder/path/blob/master/path.js#L567
export function extname(path) {
  return splitPathRe.exec(path).slice(1)[3]
}

// https://www.npmjs.com/package/is-url
export function valid(path) {
  return urlRe.test(path)
}

export function resolve(root, path) {
  if (Object.prototype.toString.call(root) === '[object Array]') {
    root = root[0]
  }
  if (root && root.charAt(root.length - 1) !== '/') {
    root += '/'
  }
  return resolveUrl(root, path)
}
