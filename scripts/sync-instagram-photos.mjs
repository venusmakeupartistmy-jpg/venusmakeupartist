import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const username = "venusss_makeupartist";
const profileUrl = `https://www.instagram.com/${username}/`;
const outputDir = path.join(process.cwd(), "public", "portfolio");
const postCount = 6;

const useSystemChrome = process.argv.includes("--use-system-chrome");
const loginMode = process.argv.includes("--login");
const cdpArg = process.argv.find((arg) => arg.startsWith("--cdp="));
const cdpUrl = cdpArg?.slice("--cdp=".length) ?? process.env.CHROME_CDP_URL ?? "";

const labels = [
  "Bridal glow",
  "Soft glam",
  "Editorial",
  "Creative paint",
  "Photoshoot",
  "Event look",
];

function maxResolutionUrl(url) {
  if (!url) return url;

  return url
    .replace(/\/s\d+x\d+\//g, "/")
    .replace(/\/p\d+x\d+\//g, "/")
    .replace(/([?&])width=\d+/g, "$1width=1080")
    .replace(/([?&])height=\d+/g, "$1height=1080")
    .replace(/stp=[^&]*/g, "stp=dst-jpg_e35")
    .replace(/s\d+x\d+/g, "s1080x1080");
}

function profileDir() {
  if (useSystemChrome) {
    return path.join(process.env.LOCALAPPDATA ?? "", "Google", "Chrome", "User Data");
  }

  return path.join(process.cwd(), ".ig-browser-profile");
}

function collectMediaFromJson(value, urls, links) {
  if (!value || typeof value !== "object") return;

  if (typeof value.display_url === "string") {
    urls.push(value.display_url);
  }

  if (typeof value.shortcode === "string") {
    links.push(`https://www.instagram.com/p/${value.shortcode}/`);
  }

  if (Array.isArray(value.display_resources)) {
    const largest = value.display_resources.at(-1);
    if (largest?.src) urls.push(largest.src);
  }

  for (const nested of Object.values(value)) {
    if (Array.isArray(nested)) {
      for (const item of nested) collectMediaFromJson(item, urls, links);
    } else if (nested && typeof nested === "object") {
      collectMediaFromJson(nested, urls, links);
    }
  }
}

async function waitForEnter(message) {
  console.log(message);
  await new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.once("data", resolve);
  });
}

async function createContext() {
  if (cdpUrl) {
    const browser = await chromium.connectOverCDP(cdpUrl);
    const context = browser.contexts()[0];
    if (!context) {
      throw new Error("No browser context found over CDP. Open Instagram in Chrome first.");
    }
    return { context, close: async () => {} };
  }

  const userDataDir = profileDir();
  const launchOptions = {
    channel: "chrome",
    headless: !loginMode,
    viewport: { width: 1280, height: 900 },
    args: useSystemChrome ? ["--profile-directory=Default"] : [],
  };

  try {
    const context = await chromium.launchPersistentContext(userDataDir, launchOptions);
    return { context, close: () => context.close() };
  } catch (error) {
    if (useSystemChrome) {
      console.error(`
Could not open your Chrome profile (Chrome may still be running).

Option A — close Chrome, then run:
  npm run sync:instagram:chrome

Option B — restart Chrome with remote debugging, then run:
  npm run sync:instagram:cdp
`);
    }
    throw error;
  }
}

function attachNetworkCollector(page) {
  const mediaUrls = [];
  const postLinks = [];

  page.on("response", async (response) => {
    const url = response.url();
    if (!url.includes("graphql") && !url.includes("/api/v1/")) return;

    try {
      const json = await response.json();
      collectMediaFromJson(json, mediaUrls, postLinks);
    } catch {
      // ignore non-json responses
    }
  });

  return { mediaUrls, postLinks };
}

async function waitForProfile(page) {
  const onProfile = page.url().includes(`instagram.com/${username}`);

  if (!onProfile) {
    await page.goto(profileUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
  }

  const waitForPosts = async (timeoutMs) => {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
      const hasPosts = await page.evaluate(
        () => document.querySelector('a[href*="/p/"], a[href*="/reel/"]') !== null,
      );
      if (hasPosts) return true;

      await page.waitForTimeout(3000);
      if (Date.now() - started > 10000) {
        await page.reload({ waitUntil: "domcontentloaded", timeout: 90000 });
      }
    }
    return false;
  };

  if (await waitForPosts(25000)) return;

  if (loginMode || cdpUrl) {
    console.log(
      "\nWaiting up to 2 minutes — log into Instagram in Chrome and open the profile if needed...\n",
    );
    if (await waitForPosts(120000)) return;
  }

  throw new Error("Could not load Instagram posts. Log in and run: npm run sync:instagram:cdp");
}

async function collectPostLinks(page, networkLinks) {
  for (let i = 0; i < 5; i += 1) {
    await page.mouse.wheel(0, 1600);
    await page.waitForTimeout(1000);
  }

  const domLinks = await page.evaluate(({ limit, handle }) => {
    const links = [];
    const seen = new Set();

    for (const anchor of document.querySelectorAll("a[href]")) {
      const href = anchor.getAttribute("href") ?? "";
      const match = href.match(/\/(p|reel)\/([^/?#]+)/);
      if (!match || seen.has(match[2])) continue;

      seen.add(match[2]);
      const normalized = href.startsWith("http")
        ? href.split("?")[0]
        : `https://www.instagram.com${href.startsWith("/") ? href : `/${handle}/${href}`}`.split("?")[0];
      links.push(normalized);
      if (links.length >= limit) break;
    }

    return links;
  }, { limit: postCount, handle: username });

  const merged = [...new Set([...domLinks, ...networkLinks])];
  return merged.slice(0, postCount);
}

async function extractProfileImage(page) {
  return page.evaluate((handle) => {
    const profileImg = Array.from(document.querySelectorAll("img")).find((img) => {
      const alt = (img.getAttribute("alt") ?? "").toLowerCase();
      return alt.includes(`${handle}'s profile picture`) || alt.includes("profile picture");
    });

    if (profileImg) {
      const srcset = profileImg.getAttribute("srcset");
      if (srcset) {
        const parts = srcset
          .split(",")
          .map((part) => part.trim().split(/\s+/))
          .filter((part) => part[0]);
        return parts.at(-1)?.[0] ?? profileImg.getAttribute("src") ?? "";
      }
      return profileImg.getAttribute("src") ?? "";
    }

    return document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "";
  }, username);
}

async function extractPostImage(page) {
  await page.waitForTimeout(2000);

  const imageUrl = await page.evaluate(() => {
    const og = document.querySelector('meta[property="og:image"]');
    if (og?.content) return og.content;

    const candidates = Array.from(
      document.querySelectorAll('article img[src*="cdninstagram.com"], img[src*="cdninstagram.com"]'),
    )
      .map((img) => {
        const srcset = img.getAttribute("srcset");
        if (srcset) {
          const parts = srcset
            .split(",")
            .map((part) => part.trim().split(/\s+/))
            .filter((part) => part[0]);
          return parts.at(-1)?.[0] ?? img.getAttribute("src") ?? "";
        }
        return img.getAttribute("src") ?? "";
      })
      .filter(Boolean);

    return candidates.sort((a, b) => b.length - a.length)[0] ?? "";
  });

  return maxResolutionUrl(imageUrl);
}

async function downloadImage(page, url, filename, label) {
  const candidates = [url, maxResolutionUrl(url)].filter(
    (value, index, array) => value && array.indexOf(value) === index,
  );

  const cookies = await page.context().cookies("https://www.instagram.com");
  const cookieHeader = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, {
        headers: {
          Cookie: cookieHeader,
          Referer: "https://www.instagram.com/",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (!response.ok) {
        console.warn(`Failed ${filename}: HTTP ${response.status}`);
        continue;
      }

      const fileBuffer = Buffer.from(await response.arrayBuffer());
      if (fileBuffer.length < 8000) {
        console.warn(`Skipped ${filename}: file too small (${fileBuffer.length} bytes)`);
        continue;
      }

      await writeFile(path.join(outputDir, filename), fileBuffer);
      console.log(`Saved ${filename} (${Math.round(fileBuffer.length / 1024)} KB)`);
      return { filename, label, src: `/portfolio/${filename}` };
    } catch (error) {
      console.warn(`Failed ${filename}: ${error.message}`);
    }
  }

  return null;
}

async function screenshotPostImage(page, filename, label) {
  const image = page.locator('article img[src*="cdninstagram.com"], img[src*="cdninstagram.com"]').first();

  try {
    await image.waitFor({ state: "visible", timeout: 10000 });
    const filePath = path.join(outputDir, filename);
    await image.screenshot({ path: filePath, type: "jpeg", quality: 92 });

    const { stat } = await import("fs/promises");
    const fileStat = await stat(filePath);
    if (fileStat.size < 8000) return null;

    console.log(`Saved ${filename} via screenshot (${Math.round(fileStat.size / 1024)} KB)`);
    return { filename, label, src: `/portfolio/${filename}` };
  } catch {
    return null;
  }
}

async function screenshotProfileImage(page, filename, label) {
  const image = page.locator(`img[alt*="${username}'s profile picture" i]`).first();

  try {
    await image.waitFor({ state: "visible", timeout: 10000 });
    const filePath = path.join(outputDir, filename);
    await image.screenshot({ path: filePath, type: "jpeg", quality: 92 });

    const { stat } = await import("fs/promises");
    const fileStat = await stat(filePath);
    if (fileStat.size < 3000) return null;

    console.log(`Saved ${filename} via screenshot (${Math.round(fileStat.size / 1024)} KB)`);
    return { filename, label, src: `/portfolio/${filename}` };
  } catch {
    return null;
  }
}

async function screenshotModalImage(page, filename, label) {
  const image = page
    .locator('div[role="dialog"] img[src*="cdninstagram.com"], div[role="dialog"] img[src*="fbcdn.net"]')
    .first();

  try {
    await image.waitFor({ state: "visible", timeout: 15000 });
    const box = await image.boundingBox();
    if (!box || box.width < 120 || box.height < 120) return null;

    const filePath = path.join(outputDir, filename);
    await page.screenshot({
      path: filePath,
      type: "jpeg",
      quality: 95,
      clip: box,
    });

    const { stat } = await import("fs/promises");
    const fileStat = await stat(filePath);
    if (fileStat.size < 8000) return null;

    console.log(`Saved ${filename} via modal screenshot (${Math.round(fileStat.size / 1024)} KB)`);
    return { filename, label, src: `/portfolio/${filename}` };
  } catch {
    return null;
  }
}

async function pickInstagramPage(context) {
  const existing = context
    .pages()
    .find((tab) => tab.url().includes(`instagram.com/${username}`));

  if (existing) {
    await existing.bringToFront();
    return existing;
  }

  const anyInstagram = context.pages().find((tab) => tab.url().includes("instagram.com"));
  if (anyInstagram) {
    await anyInstagram.bringToFront();
    await anyInstagram.goto(profileUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
    return anyInstagram;
  }

  const page = await context.newPage();
  await page.goto(profileUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
  return page;
}

const { context, close } = await createContext();
const page = await pickInstagramPage(context);
const { mediaUrls, postLinks: networkLinks } = attachNetworkCollector(page);

try {
  await waitForProfile(page);
  await mkdir(outputDir, { recursive: true });

  const saved = [];

  const profileUrlRaw = await extractProfileImage(page);
  const profile =
    (profileUrlRaw
      ? await downloadImage(page, profileUrlRaw, "profile.jpg", "Venus Makeup Artist")
      : null) ?? (await screenshotProfileImage(page, "profile.jpg", "Venus Makeup Artist"));
  if (profile) saved.push(profile);

  const postLinks = await collectPostLinks(page, networkLinks);
  console.log(`Found ${postLinks.length} posts`);

  await page.goto(profileUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(2000);

  for (let index = 0; index < postLinks.length; index += 1) {
    const postUrl = postLinks[index];
    console.log(`Fetching post ${index + 1}: ${postUrl}`);

    let result = null;

    try {
      const postTile = page.locator('a[href*="/p/"], a[href*="/reel/"]').nth(index);
      await postTile.scrollIntoViewIfNeeded();
      await postTile.click({ timeout: 10000 });
      await page.waitForTimeout(2000);
      result = await screenshotModalImage(
        page,
        `ig-${index + 1}.jpg`,
        labels[index] ?? `Look ${index + 1}`,
      );
      await page.keyboard.press("Escape");
      await page.waitForTimeout(700);
    } catch (error) {
      console.warn(`Modal capture failed for post ${index + 1}: ${error.message}`);
    }

    if (!result) {
      await page.goto(postUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
      let imageUrl = await extractPostImage(page);

      if (!imageUrl && mediaUrls[index]) {
        imageUrl = mediaUrls[index];
      }

      result =
        (imageUrl
          ? await downloadImage(
              page,
              imageUrl,
              `ig-${index + 1}.jpg`,
              labels[index] ?? `Look ${index + 1}`,
            )
          : null) ??
        (await screenshotPostImage(
          page,
          `ig-${index + 1}.jpg`,
          labels[index] ?? `Look ${index + 1}`,
        ));
    }

    if (result) saved.push(result);
    else console.warn(`No image saved for post ${index + 1}`);
  }

  if (saved.length === 0) {
    throw new Error(
      "No images downloaded. Log into Instagram in Chrome, open the profile, then run npm run sync:instagram:cdp again.",
    );
  }

  const portfolioModule = `export const portfolioImages = ${JSON.stringify(saved, null, 2)} as const;\n`;

  await writeFile(path.join(process.cwd(), "lib", "portfolio.ts"), portfolioModule);
  await writeFile(
    path.join(outputDir, "manifest.json"),
    JSON.stringify({ savedAt: new Date().toISOString(), images: saved }, null, 2),
  );

  console.log("\nDone:", saved.map((item) => item.filename).join(", "));
} finally {
  await close();
}
