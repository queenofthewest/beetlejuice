import sharp from "sharp";
import { readdir, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const BASE = "./public/assets/images";

const FOLDER_MAP = {
  "Las Vegas": "las-vegas",
  "Phoenix": "phoenix",
  "Thailand": "thailand",
};

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

function sanitizeName(name) {
  return name
    .replace(/\s+/g, "_")
    .replace(/[()]/g, "")
    .replace(/__+/g, "_");
}

async function convertFolder(srcFolder, destFolder) {
  if (!existsSync(destFolder)) {
    await mkdir(destFolder, { recursive: true });
  }

  const files = await readdir(srcFolder);

  for (const file of files) {
    const ext = path.extname(file);
    if (!IMAGE_EXTS.has(ext)) continue;

    const srcPath = path.join(srcFolder, file);
    const baseName = sanitizeName(path.basename(file, ext));
    const destPath = path.join(destFolder, `${baseName}.webp`);

    try {
      await sharp(srcPath)
        .webp({ quality: 82 })
        .toFile(destPath);
      console.log(`✓ ${file} → ${baseName}.webp`);
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }
}

for (const [srcName, destName] of Object.entries(FOLDER_MAP)) {
  const src = path.join(BASE, srcName);
  const dest = path.join(BASE, destName);
  if (existsSync(src)) {
    console.log(`\nConverting ${srcName} → ${destName}/`);
    await convertFolder(src, dest);
  } else {
    console.warn(`Skipping ${srcName} — folder not found`);
  }
}

console.log("\nDone. Review output, then delete original folders if happy.");
