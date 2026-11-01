// 验证点：整个文件没有被任何入口 import，
// esbuild 不会把它当作入口打包（因为它不在 entryPoints 的 glob 结果里吗？
// 注意：它确实匹配 src/static/**/*.js，所以会被当作独立入口打包！
// 如果想验证“未引用文件不被打包”，应把它移出 src/static，
// 或改用精确 glob。这里保留它，用于验证“glob 会把它当作独立入口”。）

export const orphan = 'I am a standalone entry';
console.log(orphan);

import logoUrl from '../images/123.jpg';   // esbuild 在构建时处理

const img = document.querySelector('#logo');
if (img) img.src = logoUrl;