import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const username = "venusss_makeupartist";
const profileUrl = `https://www.instagram.com/${username}/`;
const outputDir = path.join(process.cwd(), "public", "portfolio");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
});

await page.goto(profileUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(5000);
await page.mouse.wheel(0, 1200);
await page.waitForTimeout(2000);

const scraped = await page.evaluate(() =>
  Array.from(document.querySelectorAll("img"))
    .map((img) => ({
      src: img.getAttribute("src") ?? "",
      alt: img.getAttribute("alt") ?? "",
    }))
    .filter((item) => item.src.includes("cdninstagram.com")),
);

await browser.close();
await mkdir(outputDir, { recursive: true });

const profile = scraped.find((item) =>
  item.alt.toLowerCase().includes("profile"),
);
const posts = scraped
  .filter(
    (item) =>
      !item.alt.toLowerCase().includes("profile") &&
      !item.src.includes("static.cdninstagram.com"),
  )
  .slice(0, 6);

const saved = [];

async function downloadImage(url, filename, label) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!response.ok) return null;

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 500) return null;

  await writeFile(path.join(outputDir, filename), buffer);
  return { filename, label, src: `/portfolio/${filename}` };
}

if (profile) {
  const result = await downloadImage(
    profile.src,
    "profile.jpg",
    "Venus Makeup Artist",
  );
  if (result) saved.push(result);
}

const labels = [
  "Bridal glow",
  "Soft glam",
  "Editorial",
  "Creative paint",
  "Photoshoot",
  "Event look",
];

for (let index = 0; index < posts.length; index += 1) {
  const result = await downloadImage(
    posts[index].src,
    `ig-${index + 1}.jpg`,
    labels[index] ?? `Look ${index + 1}`,
  );
  if (result) saved.push(result);
}

const portfolioModule = `export const portfolioImages = ${JSON.stringify(saved, null, 2)} as const;\n`;

await writeFile(path.join(process.cwd(), "lib", "portfolio.ts"), portfolioModule);
await writeFile(
  path.join(outputDir, "manifest.json"),
  JSON.stringify({ savedAt: new Date().toISOString(), images: saved }, null, 2),
);

console.log(JSON.stringify(saved, null, 2));
