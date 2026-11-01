import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = import.meta.dirname;
const SRC_DIR = path.join(__dirname, 'src/static');
const OUT_DIR = path.join(__dirname, 'dist/static');
const MANIFEST_PATH = path.join(__dirname, 'manifest.json');
const FILES_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.html']);
const PUBLIC_PREFIX = '/static/';

function formatVersion(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    date.getFullYear() + '-' +
    pad(date.getMonth() + 1) + '-' +
    pad(date.getDate()) + ' ' +
    pad(date.getHours()) + ':' + 
    pad(date.getMinutes()) + ':' + 
    pad(date.getSeconds())
  );
}

function createLogger(totalSteps) {
  const start = Date.now();
  let current = 0;
  return {
    step: (msg) => {
      current++;
      console.log(`\n🔹 阶段 ${current}/${totalSteps}  ${msg}`);
    },
    info: (msg) => console.log(`   ${msg}`),
    ok: (msg) => console.log(`   ✅ ${msg}`),
    warn: (msg) => console.log(`   ⚠️  ${msg}`),
    done: () => console.log(`\n🎉 构建完成，总耗时 ${Date.now() - start}ms\n`),
  };
}


function clearDirSafely(dir, log) {
  const absDir = path.resolve(dir);
  const projectRoot = path.resolve(__dirname);
  const fsRoot = path.parse(absDir).root;

  if (absDir === fsRoot) throw new Error(`拒绝清空文件系统根目录：${absDir}`);
  if (absDir === projectRoot) throw new Error(`拒绝清空项目根目录：${absDir}`);
  if (projectRoot.startsWith(absDir + path.sep)) throw new Error(`拒绝清空项目根目录的上级路径：${absDir}`);
  if (absDir.split(path.sep).filter(Boolean).length < 2) throw new Error(`输出目录层级过浅，拒绝清空：${absDir}`);

  if (fs.existsSync(absDir)) {
    const count = fs.readdirSync(absDir).length;
    fs.rmSync(absDir, { recursive: true, force: true });
    log.info(`已删除：${absDir}`);
    log.info(`删除条目数：${count}`);
  } else {
    log.info(`目录不存在，无需删除：${absDir}`);
  }

  fs.mkdirSync(absDir, { recursive: true });
  log.ok(`已重建空目录：${absDir}`);
}

function copyFiles(srcDir, destDir, relBase = '', collected = []) {
  if (!fs.existsSync(srcDir)) return collected;

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const relPath = path.join(relBase, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyFiles(srcPath, destPath, relPath, collected);
    } else if (FILES_EXTS.has(path.extname(entry.name).toLowerCase())) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
      collected.push(relPath.split(path.sep).join('/'));
    }
  }
  return collected;
}

async function main() {
  const log = createLogger(6);

  // ---------- 阶段 1：确认入口目录 ----------
  log.step('检查入口目录');
  if (!fs.existsSync(SRC_DIR)) {
    log.warn(`入口目录不存在：${path.relative(__dirname, SRC_DIR)}`);
    process.exit(1);
  }
  log.ok(`入口目录：${path.relative(__dirname, SRC_DIR)}`);

  // ---------- 阶段 2：清空输出目录 ----------
  log.step('清空输出目录');
  try {
    clearDirSafely(OUT_DIR, log);
  } catch (err) {
    log.warn(err.message);
    process.exit(1);
  }

  // ---------- 阶段 3：esbuild 构建 ----------
  log.step('执行 esbuild 生产构建');
  const buildStart = Date.now();

  const result = await build({
    entryPoints: [
      'src/static/**/*.js',
      'src/static/**/*.css',
    ],
    external: [
      '*.png', '*.jpg', '*.jpeg', '*.gif', '*.svg', '*.webp', '*.avif',
    ],
    // loader: {
    //   '.png': 'file', '.jpg': 'file', '.jpeg': 'file',
    //   '.gif': 'file', '.svg': 'file', '.webp': 'file', '.avif': 'file',
    // },
    // publicPath: PUBLIC_PREFIX,
    outbase: SRC_DIR,
    entryNames: '[dir]/[name]-[hash]',
    chunkNames: '[dir]/[name]-[hash]',
    assetNames: '[dir]/[name]-[hash]',
    minify: true,
    bundle: true,
    treeShaking: false,
    format: 'esm',
    outdir: OUT_DIR,
    metafile: true,
    platform: 'browser',
    target: ['es2020'],
    sourcemap: false,  
    logLevel: 'warning',
  });

  log.ok(`esbuild 构建完成，耗时 ${Date.now() - buildStart}ms`);

  // ---------- 阶段 4：用 fs 复制文件 ----------
  log.step('复制文件到 dist/static');
  const copiedFiless = copyFiles(SRC_DIR, OUT_DIR);
  log.ok(`共复制 ${copiedFiless.length} 个文件`);
  for (const file of copiedFiless) {
    log.info(`${file}  →  ${PUBLIC_PREFIX}${file}`);
  }

  // ---------- 阶段 5：生成 manifest ----------
  log.step('生成 manifest.json');

  const version = formatVersion();
  const manifest = { version, entryPoints: {} };
  let fileCount = 0;

  for (const [outputPath, info] of Object.entries(result.metafile.outputs)) {
    if (!info.entryPoint) continue;

    const relativeEntry = path
      .relative(path.join(__dirname, 'src'), info.entryPoint)
      .split(path.sep)
      .join('/');
    const urlPath = '/' + outputPath.replace(/^dist\//, '');

    manifest.entryPoints[relativeEntry] = urlPath;
    fileCount++;
    log.info(`${relativeEntry}  →  ${urlPath}`);
  }

  if (fileCount === 0) {
    log.warn('metafile 中未找到入口输出，请检查 glob 是否匹配到文件');
    process.exit(1);
  }

  log.ok(`manifest 已生成，版本 ${version}，共 ${fileCount} 条映射`);

  // ---------- 阶段 5：写入 manifest ----------
  log.step('写入 manifest 文件');
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  log.ok(`写入：${path.relative(__dirname, MANIFEST_PATH)}`);

  log.done();
}

main().catch((err) => {
  console.error('\n❌ 构建失败：', err);
  process.exit(1);
});