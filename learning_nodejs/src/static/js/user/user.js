// 验证点：这个文件不会被单独输出为入口文件，
// 它的内容应该被内联进 app-<hash>.js 中。

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

// 验证点：整个文件没有被任何入口 import，
// esbuild 不会把它当作入口打包（因为它不在 entryPoints 的 glob 结果里吗？
// 注意：它确实匹配 src/static/**/*.js，所以会被当作独立入口打包！
// 如果想验证“未引用文件不被打包”，应把它移出 src/static，
// 或改用精确 glob。这里保留它，用于验证“glob 会把它当作独立入口”。）

export const orphan = 'I am a standalone entry';
console.log(orphan);