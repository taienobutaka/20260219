const fs = require("fs-extra");
const path = require("node:path");
const sharp = require("sharp");

// 画像が置かれているベースディレクトリ
const BASE_DIR = path.resolve("public/images");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const OUTPUT_FORMATS = [
  { extension: ".webp", convert: (image) => image.webp({ quality: 80 }) },
  { extension: ".avif", convert: (image) => image.avif({ quality: 50 }) },
];

let convertedCount = 0;
let skippedCount = 0;

// 指定ディレクトリ以下の画像ファイル一覧を再帰的に収集
async function collectImageFiles(dir) {
  const files = [];
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    console.error(`[error] Failed to read directory: ${dir}`);
    console.error(error);
    return files;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath)));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

// 単一ファイルを各フォーマットへ変換
async function processImage(filePath) {
  const tasks = [];

  for (const { extension, convert } of OUTPUT_FORMATS) {
    const targetPath = replaceExtension(filePath, extension);
    const alreadyExists = await fs.pathExists(targetPath);
    if (alreadyExists) {
      console.log(`[skip]  already exists: ${path.relative(BASE_DIR, targetPath)}`);
      skippedCount += 1;
      continue;
    }

    tasks.push(
      (async () => {
        try {
          const image = sharp(filePath);
          await fs.ensureDir(path.dirname(targetPath));
          await convert(image).toFile(targetPath);
          console.log(
            `[image] Converted ${path.basename(filePath)} → ${path.basename(targetPath)}`,
          );
          convertedCount += 1;
        } catch (error) {
          console.error(`[error] Failed to convert: ${path.relative(BASE_DIR, filePath)}`);
          console.error(error);
        }
      })(),
    );
  }

  if (tasks.length > 0) {
    await Promise.all(tasks);
  }
}

function replaceExtension(filePath, newExt) {
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  return path.join(dir, `${baseName}${newExt}`);
}

async function main() {
  const exists = await fs.pathExists(BASE_DIR);
  if (!exists) {
    console.log(`[skip]  base directory not found: ${BASE_DIR}`);
    console.log(`Done. Converted: ${convertedCount} images (skipped: ${skippedCount})`);
    return;
  }

  const imageFiles = await collectImageFiles(BASE_DIR);
  for (const filePath of imageFiles) {
    await processImage(filePath);
  }

  console.log(`Done. Converted: ${convertedCount} images (skipped: ${skippedCount})`);
}

main().catch((error) => {
  console.error("[error] optimize-images encountered a fatal error");
  console.error(error);
  process.exitCode = 1;
});
