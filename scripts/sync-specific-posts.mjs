import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const posts = [
  { url: "https://www.instagram.com/p/DWQ-PU_Cb9R/" },
  { url: "https://www.instagram.com/p/DDkEvd8zfjM/?img_index=1" },
  { url: "https://www.instagram.com/p/DCwLjhcJlM6/" },
  { url: "https://www.instagram.com/p/DB6ZSmdT9TZ/?img_index=1" },
  { url: "https://www.instagram.com/p/DEuqt_Dhw-R/" },
  { url: "https://www.instagram.com/p/DFLJaFxTibZ/?img_index=1" },
];

const labels = [
  "Bridal glow",
  "Soft glam",
  "Editorial",
  "Creative paint",
  "Photoshoot",
  "Event look",
];

const outputDir = path.join(process.cwd(), "public", "portfolio");
const cdpUrl =
  process.argv.find((arg) => arg.startsWith("--cdp="))?.slice("--cdp=".length) ??
  "http://127.0.0.1:9222";

const browser = await chromium.connectOverCDP(cdpUrl);
const context = browser.contexts()[0];
let page = context.pages().find((tab) => tab.url().includes("instagram.com"));
if (!page) page = await context.newPage();

await mkdir(outputDir, { recursive: true });
const saved = [];

for (let index = 0; index < posts.length; index += 1) {
  const { url } = posts[index];
  const filename = `ig-${index + 1}.jpg`;
  const label = labels[index] ?? `Look ${index + 1}`;

  console.log(`Fetching ${index + 1}/${posts.length}: ${url}`);
  await page.bringToFront();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(5000);

  const imageUrl = await page.evaluate(
    () => document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "",
  );

  if (!imageUrl) {
    console.warn(`No image URL for ${filename}`);
    continue;
  }

  let body = null;

  try {
    const response = await page.request.get(imageUrl, { timeout: 120_000 });
    if (response.ok()) {
      body = await response.body();
    }
  } catch (error) {
    console.warn(`Direct download failed for ${filename}: ${error.message}`);
  }

  if (!body || body.length < 8000) {
    try {
      const base64 = await page.evaluate(async (url) => {
        const response = await fetch(url);
        if (!response.ok) return "";
        const blob = await response.blob();
        return await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(String(reader.result).split(",")[1] ?? "");
          reader.readAsDataURL(blob);
        });
      }, imageUrl);

      if (base64) {
        body = Buffer.from(base64, "base64");
      }
    } catch (error) {
      console.warn(`Browser fetch failed for ${filename}: ${error.message}`);
    }
  }

  if (!body || body.length < 8000) {
    console.warn(`Download too small for ${filename}`);
    continue;
  }

  await writeFile(path.join(outputDir, filename), body);
  console.log(`Saved ${filename} (${Math.round(body.length / 1024)} KB)`);
  saved.push({ filename, label, src: `/portfolio/${filename}` });
}

if (saved.length === 0) {
  throw new Error("No images downloaded.");
}

const portfolioImages = [
  {
    filename: "profile.jpg",
    label: "Venus Makeup Artist",
    src: "/portfolio/profile.jpg",
  },
  ...saved,
];

await writeFile(
  path.join(process.cwd(), "lib", "portfolio.ts"),
  `export const portfolioImages = ${JSON.stringify(portfolioImages, null, 2)} as const;\n`,
);
await writeFile(
  path.join(outputDir, "manifest.json"),
  JSON.stringify({ savedAt: new Date().toISOString(), posts, images: portfolioImages }, null, 2),
);

console.log("\nDone:", saved.map((item) => item.filename).join(", "));
