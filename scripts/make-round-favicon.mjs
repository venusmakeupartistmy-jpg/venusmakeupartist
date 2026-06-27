import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public", "portfolio", "profile.jpg");
const appDir = path.join(root, "app");

async function makeRoundIcon(outputFilename, size = 512) {
  const output = path.join(appDir, outputFilename);

  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`,
  );

  await sharp(source)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(output);

  console.log(`Updated ${outputFilename} (${size}x${size}, round)`);
}

await makeRoundIcon("icon.png");
await makeRoundIcon("apple-icon.png");
