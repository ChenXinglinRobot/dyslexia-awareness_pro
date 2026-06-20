// scripts/convert-images-to-webp.mjs
//
// 将 client/public/ 下所有 .jpg / .jpeg / .png 原地转成 .webp（q80），
// 同时把原图镜像到 client/public-originals/，保留目录结构，便于回溯。
//
// 用法：  node scripts/convert-images-to-webp.mjs
// 依赖：  sharp（已在 devDependencies）

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'client', 'public');
const ARCHIVE_DIR = path.join(ROOT, 'client', 'public-originals');

const SUPPORTED_EXT = new Set(['.jpg', '.jpeg', '.png']);
const WEBP_QUALITY = 80;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip archive folder itself if it ever lands inside public
      if (path.resolve(full) === ARCHIVE_DIR) continue;
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

function fmtKB(bytes) {
  return (bytes / 1024).toFixed(1).padStart(8) + ' KB';
}

function fmtPct(ratio) {
  const sign = ratio >= 0 ? '+' : '';
  return sign + (ratio * 100).toFixed(1) + '%';
}

async function main() {
  await fs.mkdir(ARCHIVE_DIR, { recursive: true });

  const tasks = [];
  for await (const file of walk(PUBLIC_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (!SUPPORTED_EXT.has(ext)) continue;
    tasks.push(file);
  }

  if (tasks.length === 0) {
    console.log('No .jpg/.jpeg/.png files found under client/public/.');
    return;
  }

  console.log(`Found ${tasks.length} raster files to convert.\n`);

  const rows = [];
  let totalBefore = 0;
  let totalAfter = 0;
  let failed = 0;

  for (const absPath of tasks) {
    const rel = path.relative(PUBLIC_DIR, absPath);
    const archivePath = path.join(ARCHIVE_DIR, rel);
    const webpPath = absPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    try {
      const before = (await fs.stat(absPath)).size;
      await fs.mkdir(path.dirname(archivePath), { recursive: true });
      await fs.copyFile(absPath, archivePath);
      const after = await sharp(absPath)
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(webpPath);
      const afterSize = after.size;
      await fs.unlink(absPath);

      totalBefore += before;
      totalAfter += afterSize;
      rows.push({ rel, before, after: afterSize });
      process.stdout.write(`  ✓ ${rel}\n`);
    } catch (err) {
      failed += 1;
      process.stdout.write(`  ✗ ${rel}  —  ${err.message}\n`);
    }
  }

  console.log('\n' + '─'.repeat(78));
  console.log(
    'file'.padEnd(56) +
      'before'.padStart(10) +
      'after'.padStart(10) +
      'change'.padStart(10),
  );
  console.log('─'.repeat(78));

  rows
    .sort((a, b) => b.before - a.before)
    .forEach(({ rel, before, after }) => {
      const ratio = after / before - 1;
      console.log(
        rel.padEnd(56) +
          fmtKB(before).padStart(10) +
          fmtKB(after).padStart(10) +
          fmtPct(ratio).padStart(10),
      );
    });

  console.log('─'.repeat(78));
  const totalRatio = totalAfter / totalBefore - 1;
  console.log(
    'TOTAL'.padEnd(56) +
      fmtKB(totalBefore).padStart(10) +
      fmtKB(totalAfter).padStart(10) +
      fmtPct(totalRatio).padStart(10),
  );
  console.log('─'.repeat(78));

  console.log(
    `\nDone. ${rows.length} converted, ${failed} failed. ` +
      `Archive at ${path.relative(ROOT, ARCHIVE_DIR) || 'client/public-originals/'}.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
