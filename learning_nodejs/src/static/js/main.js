// 验证点：这个文件不会被单独输出为入口文件，
// 它的内容应该被内联进 app-<hash>.js 中。
import logo from '../images/users/123.jpg'
import logo2 from '../images/avatar/123.jpg'
import logo3 from '../images/123.jpg'

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// 这个导出在 app.js 中没有被 import，
// 验证 tree-shaking 是否把它从产物中移除。
export function unusedHelper() {
  return 'this should be tree-shaken away';
}

export default { logo, logo2, logo3}