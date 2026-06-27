import sharp from "sharp";
import path from "path";
import { rename, unlink } from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..", "app");

async function makeRoundIcon(filename, size = 512) {
  const input = path.join(appDir, filename);
  const temp = path.join(appDir, `.${filename}.round.png`);

  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`,
  );

  await sharp(input)
    .resize(size, size, { fit: "cover" })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(temp);

  await unlink(input).catch(() => undefined);
  await rename(temp, input);

  console.log(`Updated ${filename} (${size}x${size}, round)`);
}

await makeRoundIcon("icon.png");
await makeRoundIcon("apple-icon.png");
