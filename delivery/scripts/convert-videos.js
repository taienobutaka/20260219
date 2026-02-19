const fs = require("fs-extra");
const path = require("node:path");
const { spawn } = require("node:child_process");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

// 動画が置かれているベースディレクトリ
const BASE_DIR = path.resolve("public/videos");

let convertedCount = 0;
let skippedCount = 0;

const ffmpegPath = ffmpegInstaller.path;

// ffmpeg が利用可能か確認
async function hasFfmpeg() {
  return new Promise((resolve) => {
    const probe = spawn(ffmpegPath, ["-version"]);
    probe.on("error", () => resolve(false));
    probe.on("exit", (code) => resolve(code === 0));
  });
}

// ディレクトリ以下の mp4 ファイルを再帰的に収集
async function collectVideoFiles(dir) {
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
      files.push(...(await collectVideoFiles(fullPath)));
    } else if (path.extname(entry.name).toLowerCase() === ".mp4") {
      files.push(fullPath);
    }
  }

  return files;
}

// ffmpeg を実行して WebM へ変換
function convertToWebm(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const args = [
      "-i",
      inputPath,
      "-c:v",
      "libvpx-vp9",
      "-b:v",
      "1M",
      "-c:a",
      "libopus",
      outputPath,
    ];

    const ffmpeg = spawn(ffmpegPath, args, {
      stdio: ["ignore", "inherit", "inherit"],
    });

    ffmpeg.on("error", (error) => reject(error));
    ffmpeg.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });
  });
}

async function processVideo(filePath) {
  const targetPath = replaceExtension(filePath, ".webm");
  const alreadyExists = await fs.pathExists(targetPath);

  if (alreadyExists) {
    console.log(`[skip]  already exists: ${path.relative(BASE_DIR, targetPath)}`);
    skippedCount += 1;
    return;
  }

  try {
    await fs.ensureDir(path.dirname(targetPath));
    await convertToWebm(filePath, targetPath);
    console.log(`[video] Converted ${path.basename(filePath)} → ${path.basename(targetPath)}`);
    convertedCount += 1;
  } catch (error) {
    console.error(`[error] Failed to convert: ${path.relative(BASE_DIR, filePath)}`);
    console.error(error);
  }
}

function replaceExtension(filePath, newExt) {
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  return path.join(dir, `${baseName}${newExt}`);
}

async function main() {
  if (!(await hasFfmpeg())) {
    console.warn("[warning] ffmpeg is not installed or not found in PATH. Conversion skipped.");
    console.log(`Done. Converted: ${convertedCount} videos (skipped: ${skippedCount})`);
    return;
  }

  const exists = await fs.pathExists(BASE_DIR);
  if (!exists) {
    console.log(`[skip]  base directory not found: ${BASE_DIR}`);
    console.log(`Done. Converted: ${convertedCount} videos (skipped: ${skippedCount})`);
    return;
  }

  const videoFiles = await collectVideoFiles(BASE_DIR);
  for (const filePath of videoFiles) {
    await processVideo(filePath);
  }

  console.log(`Done. Converted: ${convertedCount} videos (skipped: ${skippedCount})`);
}

main().catch((error) => {
  console.error("[error] convert-videos encountered a fatal error");
  console.error(error);
  process.exitCode = 1;
});
