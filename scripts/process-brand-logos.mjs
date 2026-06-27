import sharp from "sharp";
import path from "path";
import { mkdir, rename, unlink } from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandsDir = path.join(__dirname, "..", "public", "brands");
const sourcesDir = path.join(brandsDir, "sources");

const ESPRESSO = { r: 26, g: 20, b: 16 };

const JOBS = [
  { output: "nars.png", source: "nars-source.png", scale: 4, crisp: false },
  { output: "mac.png", source: "mac-source.png", scale: 4, crisp: true },
];

async function processLogo({ output, source, scale, crisp = false }) {
  const input = path.join(sourcesDir, source);
  const outPath = path.join(brandsDir, output);
  const temp = path.join(brandsDir, `${output}.processed.png`);

  const { width = 1, height = 1 } = await sharp(input).metadata();

  const { data, info } = await sharp(input)
    .resize({
      width: Math.round(width * scale),
      height: Math.round(height * scale),
      kernel: sharp.kernel.lanczos3,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const threshold = crisp ? 92 : 48;

    if (lum < threshold) {
      data[i + 3] = 0;
      continue;
    }

    data[i] = ESPRESSO.r;
    data[i + 1] = ESPRESSO.g;
    data[i + 2] = ESPRESSO.b;
    data[i + 3] = crisp ? 255 : Math.min(255, Math.round(((lum - 48) / (255 - 48)) * 255));
  }

  let pipeline = sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).trim({ threshold: 1 });

  if (crisp) {
    pipeline = pipeline.sharpen({ sigma: 0.5, m1: 0.4, m2: 0.2 });
  }

  await pipeline
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(temp);

  await unlink(outPath).catch(() => undefined);
  await rename(temp, outPath);

  const meta = await sharp(outPath).metadata();
  console.log(`Processed ${output}: ${meta.width}x${meta.height}`);
  return meta;
}

await mkdir(sourcesDir, { recursive: true });

const results = {};
for (const job of JOBS) {
  results[job.output] = await processLogo(job);
}

console.log(JSON.stringify(results));
